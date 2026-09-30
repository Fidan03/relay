"use client";

import { useState } from "react";

import { waitlistSchema, type WaitlistResponse } from "@/lib/waitlist-schema";

type WaitlistState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; alreadyRegistered: boolean }
  | { status: "error"; message: string };

export function useWaitlist() {
  const [state, setState] = useState<WaitlistState>({ status: "idle" });

  const submit = async (email: string) => {
    const parsed = waitlistSchema.safeParse({ email });
    if (!parsed.success) {
      setState({ status: "error", message: parsed.error.issues[0]?.message ?? "Invalid input." });
      return;
    }

    setState({ status: "loading" });

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = (await res.json()) as WaitlistResponse;

      if (!data.ok) {
        setState({ status: "error", message: data.error });
        return;
      }

      setState({ status: "success", alreadyRegistered: data.status === "already-registered" });
    } catch {
      setState({ status: "error", message: "Something went wrong. Try again." });
    }
  };

  const reset = () => setState({ status: "idle" });

  return { state, submit, reset };
}
