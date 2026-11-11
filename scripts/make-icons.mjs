// Builds the favicon and Apple touch icon from the logo. Run: node scripts/make-icons.mjs
import sharp from "sharp";

const logo = "public/images/00-logo-skidpro-transparent.png";
const bg = { r: 14, g: 12, b: 10, alpha: 1 };

// Favicon: logo on transparent, squared.
await sharp(logo)
  .resize(96, 96, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile("app/icon.png");

// Apple touch icon: logo on the dark brand background with padding.
const inner = await sharp(logo).resize(150, 150, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
await sharp({ create: { width: 180, height: 180, channels: 4, background: bg } })
  .composite([{ input: inner, gravity: "center" }])
  .png()
  .toFile("app/apple-icon.png");

// Small logo copy for the OG image (keeps the edge function bundle light).
await sharp(logo).resize(420).png({ palette: true }).toFile("assets/logo-og.png");
console.log("icons done");
