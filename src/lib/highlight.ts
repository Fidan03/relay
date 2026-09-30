import "server-only";
import { codeToHtml } from "shiki";

import { darkCodeTheme, lightCodeTheme } from "@/lib/shiki-themes";

// Shared server-side highlighter for multi-snippet sections. Custom warm-palette
// themes, colors resolved via the --shiki-light/--shiki-dark hookup in globals.css.
export function highlight(code: string, lang: "ts" | "bash" = "ts") {
  return codeToHtml(code.trim(), {
    lang,
    themes: { light: lightCodeTheme, dark: darkCodeTheme },
    defaultColor: false,
  });
}
