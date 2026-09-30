export interface NavLink {
  label: string;
  href: string;
  meta?: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#" },
  { label: "GitHub", href: "#", meta: "★ 3.2k" },
  { label: "Discord", href: "#" },
];
