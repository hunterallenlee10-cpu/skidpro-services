// Every business fact on the site lives here. Edit this file, not the components.

export const business = {
  name: "SkidPro Services LLC",
  brand: "SkidPro Services",
  owner: "Adam Anderson",
  ownerFirst: "Adam",
  established: 2025,
  city: "Enid",
  state: "OK",
  stateLong: "Oklahoma",
  region: "Northwest Oklahoma",
  provenJobTown: "Ringwood, OK",
  phoneDisplay: "(580) 747-6677",
  phoneE164: "+15807476677",
  tel: "tel:+15807476677",
  sms: "sms:+15807476677",
  email: "skidproservicesok@gmail.com",
  facebook: "https://www.facebook.com/profile.php?id=61584121487895",
  // TODO: replace with Adam's real Google Business Profile review link once it exists.
  googleReviewUrl: "#",
  siteUrl: "https://skidpro-services.vercel.app",
  tagline: "Power Built for Tough Jobs",
  lines: {
    bigEnough: "Big enough to handle it. Small enough to care.",
    dirtWork: "Dirt work. Done right. Built to last.",
    oneCompany: "One company. Endless possibilities.",
    fastReliable: "Fast. Reliable. Local.",
  },
  markets: ["Residential", "Commercial", "Agricultural"],
  claims: ["Free estimates", "Licensed and insured", "Locally owned and operated", "Modern equipment"],
  machines: ["Deere 333G", "Deere 329E"],
  attachments: ["Brush cutter", "Tree saw", "Grapple", "Bucket", "Land leveler", "Snow pusher"],
} as const;

export type ServiceId =
  | "land-clearing"
  | "tree-removal"
  | "gravel-driveways"
  | "building-pads"
  | "grading"
  | "debris-cleanup"
  | "snow-plowing"
  | "contract-work";

export type Service = {
  id: ServiceId;
  title: string;
  short: string; // chip label in the Quote Planner
  line: string;
};

export const services: Service[] = [
  {
    id: "land-clearing",
    title: "Land Clearing & Brush Hogging",
    short: "Land clearing",
    line: "Overgrown pasture, lots and fence lines cut back to open ground.",
  },
  {
    id: "tree-removal",
    title: "Tree & Cedar Removal",
    short: "Tree & cedar",
    line: "Invasive cedar and trees pulled out, roots and all.",
  },
  {
    id: "gravel-driveways",
    title: "Gravel Driveways",
    short: "Gravel driveway",
    line: "New gravel drives, plus restoring old drives and lots.",
  },
  {
    id: "building-pads",
    title: "Building Pad Prep",
    short: "Building pad",
    line: "Level, compacted pads for shops, barns, homes and metal buildings.",
  },
  {
    id: "grading",
    title: "Grading & Land Leveling",
    short: "Grading",
    line: "Grading, leveling, dirt work and hauling.",
  },
  {
    id: "debris-cleanup",
    title: "Debris & Storm Cleanup",
    short: "Debris cleanup",
    line: "Brush piles, trash and storm debris cleared out.",
  },
  {
    id: "snow-plowing",
    title: "Snow Plowing",
    short: "Snow plowing",
    line: "Lots, drives, roads and businesses. On-call or seasonal.",
  },
  {
    id: "contract-work",
    title: "Contract Work",
    short: "Contract work",
    line: "A machine and operator on your job, by the job or by the day.",
  },
];

export const serviceById = (id: ServiceId) => services.find((s) => s.id === id)!;
