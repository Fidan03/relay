import { z } from "zod";

// Shared between the API route (server-side validation) and the client form,
// so both sides agree on what a valid submission looks like without duplicating
// the rule.
export const waitlistSchema = z.object({
  email: z.string().trim().min(1, "Enter your email.").email("Enter a valid email address."),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;

export type WaitlistResponse =
  | { ok: true; status: "added" | "already-registered" }
  | { ok: false; error: string };
