// Converts the raw Drive photos in public/images/raw to web-ready files in public/images.
// Run: npm run images
import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";

const RAW = "public/images/raw";
const OUT = "public/images";

// Drop the "-NOTE-..." part of a file name.
const clean = (name) => name.replace(/-NOTE-[^.]*/, "").replace(/\.(jpe?g|png)$/i, "");

// The hero and logo were screenshots with a mouse cursor in them. Patch it out
// (hero: clone nearby pixels; logo: the cursor sat on transparent space, so clear it).
async function heroPipeline(file) {
  const patch = await sharp(file).extract({ left: 674, top: 388, width: 20, height: 28 }).toBuffer();
  return sharp(await sharp(file).composite([{ input: patch, left: 694, top: 388 }]).toBuffer());
}
async function logoPipeline(file) {
  // Clear gray/white cursor pixels in a small box. The logo's mountain there is brown, so it survives.
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let y = 292; y < 326; y++) {
    for (let x = 346; x < 374; x++) {
      const i = (y * info.width + x) * 4;
      const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
      if (Math.max(r, g, b) - Math.min(r, g, b) < 28) data[i + 3] = 0;
    }
  }
  return sharp(data, { raw: info }).png();
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
