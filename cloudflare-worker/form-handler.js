/**
 * Alberta Corner Store — Form Handler
 *
 * Deploy this in your Cloudflare Workers dashboard.
 *
 * Environment variables to set in the Worker settings:
 *   TURNSTILE_SECRET_KEY  — from Cloudflare Turnstile dashboard
 *   RESEND_API_KEY        — from resend.com
 *   FROM_EMAIL            — e.g. form@albertacornerstore.com
 *   DESTINATION_EMAIL     — your personal inbox
 */

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    if (request.method !== "POST") {
      return respond({ error: "Method not allowed" }, 405);
    }

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

    // Pull all form fields
    const q1  = body.get("q1_feeling")    || "(not answered)";
    const q2  = body.get("q2_uses")       || "(not answered)";
    const q3  = body.get("q3_missing")    || "(not answered)";
    const q4  = body.get("q4_products")   || "(not answered)";
    const q5  = body.get("q5_avoid")      || "(not answered)";
    const q6  = body.get("q6_direction")  || "(not answered)";
    const q6c = body.get("q6_comment")    || "";
    const neighbourhood = body.get("neighbourhood") || "(not provided)";
    const name          = body.get("name")          || "(not provided)";
    const email         = body.get("email")         || "(not provided)";

    const receivedAt = new Date().toLocaleString("en-CA", {
      timeZone: "America/Edmonton",
      dateStyle: "full",
      timeStyle: "short",
    });

    const emailText = [
      `New submission — Alberta Corner Store`,
      `Received: ${receivedAt} (Mountain Time)`,
      ``,
      `─────────────────────────────────────────`,
      `Q1 — What should it feel like?`,
      q1,
      ``,
      `Q2 — What uses would you like to see?`,
      q2,
      ``,
      `Q3 — What is Ramsay missing?`,
      q3,
      ``,
      `Q4 — If corner store, what would you buy?`,
      q4,
      ``,
      `Q5 — What would you hate to see?`,
      q5,
      ``,
      `Q6 — Does the current direction feel right?`,
      q6,
      q6c ? `Comment: ${q6c}` : "",
      ``,
      `─────────────────────────────────────────`,
      `Connection to Ramsay: ${neighbourhood}`,
      `Name: ${name}`,
      `Email for updates: ${email}`,
      `─────────────────────────────────────────`,
    ].filter((line, i, arr) => !(line === "" && arr[i - 1] === "")).join("\n");

    // Send via Resend
    const sendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Alberta Corner Store <${env.FROM_EMAIL}>`,
        to: env.DESTINATION_EMAIL,
        subject: "New submission — Alberta Corner Store",
        text: emailText,
      }),
    });

    if (!sendRes.ok) {
      const err = await sendRes.text();
      console.error("Resend error:", err);
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
