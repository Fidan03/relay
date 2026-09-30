// Vitest runs outside Next's bundler, which is what normally turns the real
// `server-only` package into a no-op on the server side and a throw on the
// client side. Tests run in a single Node/jsdom process with no such split,
// so alias the import to this no-op stub (see vitest.config.ts).
export {};
