// Converts the raw Drive photos in public/images/raw to web-ready files in public/images.
// Run: npm run images
import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";

const RAW = "public/images/raw";
const OUT = "public/images";

// Drop the "-NOTE-..." part of a file name.
const clean = (name) => name.replace(/-NOTE-[^.]*/, "").replace(/\.(jpe?g|png)$/i, "");

// The hero and logo were screenshots with a mouse cursor in them. Patch it out.
async function heroPipeline(file) {
  const patch = await sharp(file).extract({ left: 674, top: 388, width: 20, height: 28 }).toBuffer();
  return sharp(await sharp(file).composite([{ input: patch, left: 694, top: 388 }]).toBuffer());
}
async function logoPipeline(file) {
  const white = await sharp({
    create: { width: 18, height: 16, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 1 } },
  }).png().toBuffer();
  const tip = await sharp({
    create: { width: 7, height: 8, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 1 } },
  }).png().toBuffer();
  return sharp(
    await sharp(file)
      .composite([
        { input: white, left: 353, top: 306 },
        { input: tip, left: 352, top: 299 },
      ])
      .png()
      .toBuffer(),
  );
}

await mkdir(OUT, { recursive: true });
for (const name of await readdir(RAW)) {
  if (!/\.(jpe?g|png)$/i.test(name)) continue;
  const file = path.join(RAW, name);
  const base = clean(name);
  let img = sharp(file);
  if (base.startsWith("01-hero")) img = await heroPipeline(file);
  if (base === "00-logo-skidpro-transparent") {
    img = await logoPipeline(file);
    await img.clone().png({ compressionLevel: 9 }).toFile(path.join(OUT, `${base}.png`));
  }
  const info = await img.clone().webp({ quality: 82 }).toFile(path.join(OUT, `${base}.webp`));
  console.log(`${base}.webp  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}KB`);
}
