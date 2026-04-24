/**
 * Alberta Corner Store — Form Handler
 *
 * Deploy this in your Cloudflare Workers dashboard.
 *
 * Environment variables to set in the Worker settings:
 *   TURNSTILE_SECRET_KEY  — from Cloudflare Turnstile dashboard
 *   FROM_EMAIL            — e.g. noreply@yourdomain.com (must be on your Cloudflare domain)
 *   DESTINATION_EMAIL     — your personal inbox (must be verified in Email Routing)
 *
 * Bindings to add in the Worker settings:
 *   SEND_EMAIL            — "Send Email" binding, pointed at your destination address
 */

import { EmailMessage } from "cloudflare:email";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default {
  async fetch(request, env) {
    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    if (request.method !== "POST") {
      return respond({ error: "Method not allowed" }, 405);
    }

    // Parse URL-encoded body
    let body;
    try {
      const text = await request.text();
      body = new URLSearchParams(text);
    } catch {
      return respond({ error: "Invalid request body" }, 400);
    }

    // Verify Turnstile token
    const turnstileToken = body.get("cf-turnstile-response");
    if (!turnstileToken) {
      return respond({ error: "Missing captcha token" }, 400);
    }

    const verifyRes = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: env.TURNSTILE_SECRET_KEY,
          response: turnstileToken,
          remoteip: request.headers.get("CF-Connecting-IP"),
        }),
      }
    );

    const verify = await verifyRes.json();
    if (!verify.success) {
      return respond({ error: "Captcha verification failed" }, 400);
    }

    // Pull form fields
    const q1 = body.get("q1_feeling") || "(not answered)";
    const q2 = body.get("q2_missing") || "(not answered)";
    const q3 = body.get("q3_avoid") || "(not answered)";
    const submitterEmail = body.get("email") || "(not provided)";

    const receivedAt = new Date().toLocaleString("en-CA", {
      timeZone: "America/Edmonton",
      dateStyle: "full",
      timeStyle: "short",
    });

    // Build email body
    const emailBody = [
      `New submission — Alberta Corner Store`,
      `Received: ${receivedAt} (Mountain Time)`,
      ``,
      `─────────────────────────────────`,
      `Q1 — What should it feel like?`,
      q1,
      ``,
      `Q2 — What is Ramsay missing?`,
      q2,
      ``,
      `Q3 — What would you hate to see?`,
      q3,
      ``,
      `Email for updates: ${submitterEmail}`,
      `─────────────────────────────────`,
    ].join("\r\n");

    // Assemble raw MIME message
    const rawMime = [
      `MIME-Version: 1.0`,
      `From: Alberta Corner Store <${env.FROM_EMAIL}>`,
      `To: ${env.DESTINATION_EMAIL}`,
      `Subject: New submission — Alberta Corner Store`,
      `Content-Type: text/plain; charset=utf-8`,
      ``,
      emailBody,
    ].join("\r\n");

    // Send via Cloudflare Email Workers
    try {
      const message = new EmailMessage(env.FROM_EMAIL, env.DESTINATION_EMAIL, rawMime);
      await env.SEND_EMAIL.send(message);
    } catch (err) {
      console.error("Email send failed:", err);
      return respond({ error: "Failed to send email" }, 500);
    }

    return respond({ success: true });
  },
};

function respond(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
}
