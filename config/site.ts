export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "LendmeFi",
  description: "Nfts Borrowing and Lending protocol on Scroll.",
  navItems: [
    {
      label: "Lend",
      href: "/lend",
    },
    {
      label: "Offers",
      href: "/offers",
    },
    {
      label: "Borrow",
      href: "/borrow",
    },
    {
      label: "Loans",
      href: "/loans",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Offers",
      href: "/offers",
    },
    {
      label: "Lend",
      href: "/lend",
    },
    {
      label: "Borrow",
      href: "/borrow",
    },
    {
      label: "Loans",
      href: "/loans",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/LendmeFi",
    twitter: "https://twitter.com/LendmeFi",
    discord: "https://discord.gg/vtD3Q54D",
    sponsor: "",//walletconnect linki
  },
};
