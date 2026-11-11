// Photo map. Width and height are the native pixel sizes (never display larger).

export type Photo = { src: string; width: number; height: number; alt: string };

export const photos = {
  logo: {
    src: "/images/00-logo-skidpro-transparent.png",
    width: 711,
    height: 603,
    alt: "SkidPro Services logo: two track loaders under pine trees and an orange sunset, Est 2025",
  },
  // TODO: swap for a real drone shot of Adam's machine. This one looks like an AI render.
  hero: {
    src: "/images/01-hero-deere-333g-tree-saw.webp",
    width: 1396,
    height: 786,
    alt: "Deere 333G compact track loader with a tree saw cutting a cedar on open Oklahoma prairie",
  },
  brushBefore: {
    src: "/images/02-brush-clearing-BEFORE-pasture.webp",
    width: 608,
    height: 480,
    alt: "Before: overgrown pasture full of tall brush clumps",
  },
  brushAfter: {
    src: "/images/03-brush-clearing-AFTER-deere-329e-mulcher.webp",
    width: 610,
    height: 480,
    alt: "After: the same pasture cut flat, with a Deere 329E and its brush cutter in frame",
  },
  padWide: {
    src: "/images/04-building-pad-prep-wide-banner.webp",
    width: 1237,
    height: 295,
    alt: "Fresh red dirt building pad beside a metal shop, with an orange track loader holding a bucket of dirt",
  },
  padPortrait: {
    src: "/images/05-building-pad-skidsteer-portrait.webp",
    width: 313,
    height: 515,
    alt: "Orange compact track loader with a bucket of red dirt on a new building pad",
  },
  drivewayBefore: {
    src: "/images/06-driveway-gravel-BEFORE.webp",
    width: 335,
    height: 445,
    alt: "Before: rutted dirt ranch driveway",
  },
  drivewayAfter: {
    src: "/images/07-driveway-gravel-AFTER-cattle-guard.webp",
    width: 335,
    height: 445,
    alt: "After: the same driveway in clean white gravel with a new cattle guard and a ranch gate",
  },
  treeRingwood: {
    src: "/images/08-tree-removal-ringwood-ok-deere-329e-grapple.webp",
    width: 510,
    height: 370,
    alt: "Deere 329E lifting a whole tree out by the roots with a grapple in Ringwood, Oklahoma",
  },
  trailerSnow: {
    src: "/images/09-deere-on-trailer-shop-sunset-portrait.webp",
    width: 486,
    height: 868,
    alt: "Deere track loader on a tilt trailer under a shop awning at sunset, with snow on the ground",
  },
} satisfies Record<string, Photo>;
