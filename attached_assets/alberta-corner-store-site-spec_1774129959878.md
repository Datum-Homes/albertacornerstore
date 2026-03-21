# Alberta Corner Store — Community Engagement Microsite
**922 19 Ave SE, Ramsay, Calgary · Est. 1902**

Design & Content Specification — March 2026

---

## What This Is

A 3-page microsite to engage the Ramsay community before the new ownership group decides what the Alberta Corner Store becomes. The site must feel like it belongs to the history of the space — warm, humble, neighbourhood-scale. Not a developer announcement. Not a corporate consultation.

**Three pages:**
1. Landing page — the story and the ask
2. Input page — the community form
3. Thank you page — confirmation and what happens next

---

## Visual Direction

### Palette
Pulled directly from the building's physical colours.

| Token | Hex | Use |
|---|---|---|
| `--cream` | `#F5F0E8` | Primary background |
| `--store-green` | `#2C4A2E` | Headings, nav, borders, primary text |
| `--stucco-gold` | `#C8B96B` | Accents, dividers, hover states |
| `--ink` | `#1A1A14` | Body copy |
| `--warm-white` | `#FDFAF4` | Cards, form fields |
| `--sidewalk-grey` | `#8A8478` | Captions, labels, muted UI |
| `--aged-paper` | `#E8E0CC` | Section fills |
| `--rust` | `#8B4A2A` | Error states only |

### Typography
- **Display / headlines:** Playfair Display — Bold or Black. Italic for emphasis.
- **Body copy:** Libre Baskerville — all body text, pull quotes, subheadings.
- **UI / labels:** DM Sans — nav, buttons, form labels, small caps, anything functional.

Google Fonts URL:
```
https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap
```

Never use Inter, Roboto, or system-ui as a primary face. The serif-forward approach is intentional.

### Texture & Feel
- Apply a subtle grain/noise overlay site-wide via SVG filter — ~4% opacity. This is what makes it feel analogue.
- Background is never pure white. Always `--cream` or `--warm-white`.
- Section dividers: thin 1px hairlines in `--stucco-gold`. No solid colour blocks.
- Photography should look like real documentation. No artificial warmth or filters.

### Photography
All real photos of the building. No stock imagery.

| Slot | File(s) | Notes |
|---|---|---|
| Hero | `A2278532_8.jpg` or `A2278532_9.jpg` | Aerial drone — building + Calgary skyline. Strongest single image. |
| Exterior / signage | `A2278532_3.jpg` or `A2278532_4.jpg` | Full "ALBERTA CORNER STORE · GROCERIES · DRY GOODS" band. |
| Owners photo | `1774123679794_image.png` | Two people in front of building, clear sky. |
| Interior | `1774123743145_image.png` | Original hardwood floors, wood walls, shelving. |
| Corner context | `A2278532_1.jpg` or `A2278532_2.jpg` | Full corner view, neighbourhood behind it. |
| Neighbourhood | `A2278532_10.jpg` or `A2278532_11.jpg` | Drone — surrounding Ramsay streets. |

> The "For Sale" real estate sign visible in some photos should be cropped or removed before use.

### Video
Documentary about the store's closing: `https://www.youtube.com/watch?v=FJsVo2dDYnc`

Embed on the landing page using YouTube privacy-enhanced mode (`youtube-nocookie.com`). 16:9, max-width 640px, centred. No autoplay.

---

## Page 1 — Landing Page

### Nav
Fixed top bar. `--cream` background at 96% opacity with backdrop blur. Left: "Alberta Corner Store" in Playfair Display 18px Store Green. Right: "Share Your Input" button — Store Green border, transparent fill, fills on hover.

---

### Hero
Full viewport height. Aerial drone photo as background. Dark gradient overlay — transparent at top, `rgba(26,26,20,0.85)` at bottom. Image begins at `scale(1.06)` and eases to `scale(1.0)` over 18s on load.

Top-right: large italic "1902" in Playfair Display, ~15vw, `rgba(200,185,107,0.10)`. Decorative, non-interactive.

Text sits bottom-left, fades up on load with staggered delay.

```
[eyebrow — DM Sans 11px, uppercase, letter-spacing, Stucco Gold]
Ramsay, Calgary · 922 19 Ave SE

[headline — Playfair Display Black, clamp(3rem, 8vw, 7rem), Warm White]
The Corner Store
is coming back.

[subtitle — Libre Baskerville, clamp(1rem, 2vw, 1.25rem), Warm White 85%]
We just bought it. Before we decide anything,
we want to hear from you.

[scroll prompt — DM Sans 10px uppercase, with animated vertical line below]
Read the story
```

---

### Section 1 — Who We Are
Background: `--cream`. Max content width 720px, centred.

```
[eyebrow]
WHO WE ARE

We're a small group of Calgarians who bought this building because
we didn't want to see it become something forgettable.

We're not a big developer. We don't have a concept locked in. What
we do have is a building that has anchored this corner since 1902,
and a real question: what should it be for Ramsay now?

We're asking before we decide. That's the whole point of this page.
```

Insert owners photo here. Caption: *"922 19 Ave SE — the day we got the keys."* DM Sans 12px, Sidewalk Grey, centred.

---

### Section 2 — The Story
```
[heading — Playfair Display 32px italic, Store Green]
What this place has meant to Ramsay

The Alberta Corner Store — or as most people in Ramsay know it,
Miss Kim's — has been the kind of place that doesn't exist much
anymore. In 2024, a documentary filmmaker spent time with Miss Kim
and the neighbours who had been coming here for decades. What they
said tells you more about this building than we ever could.
```

**Pull quote 1** (large, full width, left-border treatment in Stucco Gold):
> *"She is our community. She has been the community. And she will always forever be the community."*
> — Ramsay resident

**Pull quote 2** (smaller, inset):
> *"We're so isolated in our lives. We connect a lot through screens and not face to face. So having that — somebody who knows you, who knows your name — that's irreplaceable."*
> — Ramsay resident

**Video embed** with this framing copy above it:
```
Before we decide anything about this building, watch what it's
meant to the people who live here.
```

---

### Section 3 — The History
```
[heading — Playfair Display 24px, Store Green]
A corner store since 1902

This building has been a corner store for as long as Ramsay has
existed as a neighbourhood. First under the Cooper family — two
generations — then under Miss Kim and her family, who ran it for
a third. Only two families. Over a hundred years.

It's been a place where seniors who can't walk two blocks came for
a loaf of bread. Where kids spent a dollar on a bag of candy. Where
a woman going through the worst year of her life found someone who
showed up.

The shelves are empty now. But the building is still standing on
the same corner.
```

Two photos side by side (stacked on mobile): full exterior signage shot + interior hardwood floor shot.

---

### Section 4 — The Ask
Background: `--aged-paper`, full bleed.

```
[eyebrow]
BEFORE WE DECIDE

[heading — Playfair Display Black 48px, Store Green]
What should this place be for Ramsay?

We have some ideas. But ideas from owners who don't live here are
worth less than honest input from the people who do. If you've
walked past this building, shopped here, or just noticed the lights
were off — we want to hear from you.

It takes 90 seconds. There are three questions. No wrong answers.

[CTA button — large, Store Green fill, Playfair Display italic]
Tell us what you think

[trust line below button — DM Sans 13px, Sidewalk Grey, italic]
No spam. No sales pitch. We'll send one update — what we decided,
and why — to anyone who leaves their email.
```

---

### Footer (all pages)
Dark background (`--ink`). Left: "Alberta Corner Store — 922 19 Ave SE, Ramsay, Calgary." Right: "A community project, 2026." Top: 1px Stucco Gold border at 30% opacity.

---

## Page 2 — Community Input Form

### Header
Compact (~280px tall). Exterior photo at 25% opacity behind `--cream`. Centred text:

```
[eyebrow — Stucco Gold]
YOUR TURN

[heading — Playfair Display 40px, Store Green]
Help us decide what comes next.

[subtext — Libre Baskerville italic 18px]
Three questions. 90 seconds. Your honest answer
matters more than a polished one.
```

### Trust Signals
Inline row below header, before first question:

`⏱ 90 seconds` &nbsp;&nbsp; `☰ 3 questions` &nbsp;&nbsp; `🔒 No account needed`

DM Sans 13px, Sidewalk Grey.

---

### Question 1 — Required
```
[label — DM Sans 10px uppercase, Stucco Gold]
QUESTION 1 OF 3

[question — Playfair Display 22px, Store Green]
When you picture the ideal version of this corner store,
what does it feel like?
```

Radio buttons — full row clickable. Selected state: Store Green background, Warm White text.

- A warm, grab-and-go spot — coffee, snacks, familiar faces
- A place to slow down — somewhere to sit, have a conversation, stay a while
- A reliable neighbourhood shop for everyday essentials
- Something creative or unexpected that Ramsay doesn't have yet
- I'm not sure yet — I just want to see something good happen here

---

### Question 2 — Optional
```
[label]
QUESTION 2 OF 3 (optional)

[question]
Is there something Ramsay is missing that this space could fix?
Even something small.

[placeholder]
Could be as simple as: a decent coffee without driving to 17th.
Or something bigger. Whatever comes to mind.
```

Textarea, min-height 120px, auto-expands. Soft character count shown below field.

---

### Question 3 — Optional
```
[label]
QUESTION 3 OF 3 (optional)

[question]
Is there anything you'd hate to see this space become?

[placeholder]
Completely optional — but sometimes knowing what to avoid is as
useful as knowing what to aim for.
```

Same textarea styling as Q2.

---

### Email Capture
Separated from questions by a thin Stucco Gold divider.

```
[heading — Playfair Display 20px]
Want to hear what we decide?

Leave your email and we'll send one message — what we chose, and
why. That's it. No list, no updates, no marketing.

[field placeholder]
your@email.com

[consent note — DM Sans 11px, Sidewalk Grey]
We'll send one email. We won't share your address.
```

Optional. Never required.

---

### Submit Button
Full width of form container. Store Green fill. Playfair Display italic 20px Warm White text. 56px height.

- Default: "Send my input"
- Loading: "Sending..." with CSS spinner. Disabled to prevent double-submit.
- Q1 error (if unanswered): gentle red border on that section, scroll to it, show inline: *"Let us know how you'd want this place to feel — just pick the option closest to you."* No alert boxes.

On success: redirect to `/thank-you`.

---

### Form Technical Notes
- Build natively in HTML/CSS — do not use a Typeform or Google Forms iframe. The design must match the site.
- Use Formspree, Netlify Forms, or Supabase for submission handling. Responses must be CSV-exportable.
- Honeypot spam field. No CAPTCHA.
- On submission failure: show message above button with a fallback email address.

---

## Page 3 — Thank You

Single column, max-width 600px, centred. Background `--cream`. No hero image — text and space do the work.

```
[eyebrow — Stucco Gold]
THANK YOU

[heading — Playfair Display Black italic 56px, Store Green]
We heard you.

Your input is in. Genuinely — thank you. We know your time
matters, and the fact that you took 90 seconds to tell us what
you think means something to us.

What you've shared goes directly into the conversation the
ownership group is having about what this space becomes. No
filters, no summaries, no corporate translation.
```

---

```
[subheading — Playfair Display 26px]
What happens with this?

We're collecting input through [DATE]. After that, we'll read
everything, look for patterns, and make a decision about direction.

If you left your email, we'll send you one message when we've
decided — what we're planning, what the community told us, and
how we got there.

If you didn't leave your email — that's completely fine. Check
back here. We'll update this page when there's news.
```

> ⚠️ **[DATE] must be filled in before launch.** An empty bracket here looks unfinished and reduces trust.

---

Closing quote:

> *"The community actually got built around this community hub."*
> — Ramsay resident, from the documentary

```
[closing line — DM Sans 14px italic, Sidewalk Grey]
That's what we're trying to protect.
```

---

### Share Prompt
```
[heading — Playfair Display 20px]
Know someone else in Ramsay who should weigh in?

The more voices we hear, the better the decision.
Share this with a neighbour.

[button 1] Copy link  →  changes to "Copied!" for 2s on click
[button 2] Share on Facebook
```

No other social buttons. No "submit another response."

---

## Technical Notes

**Stack:** Plain HTML/CSS/JS or Astro/Eleventy. Not Next.js — unnecessary for a 3-page static site.

**Hosting:** Netlify or Vercel free tier.

**Analytics:** Plausible.io or none. Not Google Analytics.

**Images:** Serve as WebP with JPEG fallback. Max 400KB per image after compression. Hero uses `loading="eager"`, all others `loading="lazy"`.

**Fonts:** Load with `display=swap`.

**Grain overlay:** SVG data URI in CSS — no extra network request.

**Responsive:** Mobile-first. Breakpoints at 640px and 1024px. All touch targets minimum 44px. Video embed uses `aspect-ratio: 16/9`.

**Accessibility:** All images need alt text. Form fields need `<label>` elements — not just placeholders. Focus states: `outline: 2px solid var(--store-green)` with 2px offset. Check Stucco Gold text contrast carefully — may need darkening for body use.

---

## Open Items Before Launch

| # | Item | Blocking? |
|---|---|---|
| 1 | Input collection deadline date (fills [DATE] on thank-you page) | **Yes** |
| 2 | Domain / URL (needed for QR codes and share button) | **Yes** |
| 3 | Hosting and form backend choice | **Yes** |
| 4 | Filmmaker credit and permission confirmation | No |
| 5 | Fallback email address for form error message | No |
| 6 | Confirm high-res versions of photos available | No |
