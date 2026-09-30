"use client";

import * as React from "react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { Loader2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useWaitlist } from "@/hooks/use-waitlist";

// The actual dialog: Radix Dialog + the form + useWaitlist's zod/fetch logic.
// Loaded on demand by WaitlistDialog (see that file), which mounts this only
// after the trigger is clicked — so this cost isn't part of every page's
// initial JS just because a "Start free" button is on the page.
export function WaitlistDialogContent({
  trigger,
  defaultOpen,
}: {
  trigger: React.ReactNode;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  const [email, setEmail] = React.useState("");
  const { state, submit, reset } = useWaitlist();

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) {
      // Let the close animation finish before the form resets under it.
      window.setTimeout(() => {
        reset();
        setEmail("");
      }, 200);
    }
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={handleOpenChange}>
      <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-bg/80 backdrop-blur-sm data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
        <DialogPrimitive.Content className="fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-surface p-6 shadow-lg data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95">
          <div className="flex items-start justify-between gap-4">
            <div>
              <DialogPrimitive.Title className="font-display text-lg font-medium text-text">
                Start free
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="mt-1 text-sm text-muted">
                10k jobs a month, no card required.
              </DialogPrimitive.Description>
            </div>
            <DialogPrimitive.Close asChild>
              <Button type="button" variant="ghost" size="icon" aria-label="Close">
                <X aria-hidden="true" />
              </Button>
            </DialogPrimitive.Close>
          </div>

          {state.status === "success" ? (
            <p className="mt-6 rounded-lg border border-border bg-bg px-4 py-3 text-sm text-text">
              {state.alreadyRegistered
                ? "You're already on the list — we'll be in touch."
                : "You're in. Check your inbox for next steps."}
            </p>
          ) : (
            <form
              className="mt-6 flex flex-col gap-3"
              noValidate
              onSubmit={(event) => {
                event.preventDefault();
                void submit(email);
              }}
            >
              <label htmlFor="waitlist-email" className="sr-only">
                Work email
              </label>
              <input
                id="waitlist-email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@company.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                aria-invalid={state.status === "error"}
                className="w-full rounded-lg border border-border bg-bg px-4 py-2.5 font-mono text-sm text-text placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              />

              {state.status === "error" && (
                <p role="alert" className="text-sm text-destructive">
                  {state.message}
                </p>
              )}

              <Button type="submit" disabled={state.status === "loading"} className="w-full">
                {state.status === "loading" ? (
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                ) : (
                  "Get early access"
                )}
              </Button>
            </form>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
