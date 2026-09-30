import { describe, expect, it } from "vitest";

import { waitlistSchema } from "./waitlist-schema";

describe("waitlistSchema", () => {
  it("accepts a valid email", () => {
    const result = waitlistSchema.safeParse({ email: "dev@relay.sh" });
    expect(result.success).toBe(true);
  });

  it("trims surrounding whitespace", () => {
    const result = waitlistSchema.safeParse({ email: "  dev@relay.sh  " });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.email).toBe("dev@relay.sh");
  });

  it("rejects a malformed email", () => {
    const result = waitlistSchema.safeParse({ email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects an empty email", () => {
    const result = waitlistSchema.safeParse({ email: "" });
    expect(result.success).toBe(false);
  });

  it("rejects a missing email field", () => {
    const result = waitlistSchema.safeParse({});
    expect(result.success).toBe(false);
  });
});
