import type { ThemeRegistrationRaw } from "shiki";

// Custom themes tuned to the warm palette in globals.css, so highlighted code
// reads as part of the same system instead of a generic editor theme.

const rules = (colors: {
  plain: string;
  comment: string;
  keyword: string;
  string: string;
  entity: string;
  punctuation: string;
}) => [
  { scope: ["comment"], settings: { foreground: colors.comment, fontStyle: "italic" } },
  {
    scope: ["keyword", "storage.type", "storage.modifier", "keyword.control"],
    settings: { foreground: colors.keyword },
  },
  { scope: ["string", "constant.numeric", "constant.language"], settings: { foreground: colors.string } },
  {
    scope: [
      "entity.name.function",
      "entity.name.type",
      "entity.name.tag",
      "support.type",
      "support.class",
    ],
    settings: { foreground: colors.entity },
  },
  {
    scope: ["punctuation", "meta.brace", "keyword.operator"],
    settings: { foreground: colors.punctuation },
  },
];

export const darkCodeTheme: ThemeRegistrationRaw = {
  name: "relay-dark",
  type: "dark",
  fg: "#e8e6e1",
  bg: "#15171c",
  colors: {
    "editor.background": "#15171c",
    "editor.foreground": "#e8e6e1",
  },
  settings: [
    {
      settings: { foreground: "#e8e6e1", background: "#15171c" },
    },
    ...rules({
      plain: "#e8e6e1",
      comment: "#6e6a61",
      keyword: "#e8a33d",
      string: "#cb8b5c",
      entity: "#d9b36b",
      punctuation: "#97938b",
    }),
  ],
};

export const lightCodeTheme: ThemeRegistrationRaw = {
  name: "relay-light",
  type: "light",
  fg: "#1a1917",
  bg: "#f2efe8",
  colors: {
    "editor.background": "#f2efe8",
    "editor.foreground": "#1a1917",
  },
  settings: [
    {
      settings: { foreground: "#1a1917", background: "#f2efe8" },
    },
    ...rules({
      plain: "#1a1917",
      comment: "#6e6a61",
      keyword: "#b5762a",
      string: "#9c5a32",
      entity: "#96702e",
      punctuation: "#6e6a61",
    }),
  ],
};
