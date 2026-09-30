import { NextResponse } from "next/server";

import { waitlistSchema, type WaitlistResponse } from "@/lib/waitlist-schema";

// In-memory for the lifetime of this process — enough to demonstrate real
// validation, dedup, and error-handling end to end. A production deploy should
// swap this for a real sink (an ESP like Resend/Loops, or a database) behind
// the same `recordSignup` call; nothing else in this route needs to change.
const registered = new Set<string>();

async function recordSignup(email: string): Promise<"added" | "already-registered"> {
  const key = email.toLowerCase();
  if (registered.has(key)) return "already-registered";
  registered.add(key);
  // Real integration call (ESP API, DB insert, etc.) goes here.
  return "added";
}

export async function POST(request: Request): Promise<NextResponse<WaitlistResponse>> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const parsed = waitlistSchema.safeParse(body);
  if (!parsed.success) {
    const message = parsed.error.issues[0]?.message ?? "Invalid input.";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }

  const status = await recordSignup(parsed.data.email);
  return NextResponse.json({ ok: true, status });
}
