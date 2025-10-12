// scripts/process-photos.mjs
import fs from "fs";
import path from "path";
import sharp from "sharp";

const __dirname = path.resolve();

// 📂 source: where you put your big photos
const SRC_DIR = path.join(__dirname, "client/gallery_src");

// 📂 destination: where resized photos go (public folder for frontend)
const OUT_DIR = path.join(__dirname, "client/public/gallery");

// 📄 manifest file for React frontend
const MANIFEST_FILE = path.join(OUT_DIR, "manifest.json");

async function prepareGallery() {
  if (!fs.existsSync(SRC_DIR)) {
    console.error("❌ Source folder not found:", SRC_DIR);
    process.exit(1);
  }

  // Create output dir if missing
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  const files = fs.readdirSync(SRC_DIR).filter(f =>
    /\.(jpg|jpeg|png)$/i.test(f)
  );

  if (files.length === 0) {
    console.log("⚠️ No images found in gallery_src/");
    return;
  }

  console.log(`📸 Found ${files.length} images, processing...`);

  const manifest = [];

  for (const file of files) {
    const inPath = path.join(SRC_DIR, file);
    const outPath = path.join(OUT_DIR, file);

    // Resize and optimize image
    await sharp(inPath)
      .resize(1200) // scale to max width 1200px
      .jpeg({ quality: 80 })
      .toFile(outPath);

    console.log(`✅ Processed: ${file}`);

    manifest.push({
      file,
      url: `/gallery/${file}`
    });
  }

  // Save manifest.json
  fs.writeFileSync(MANIFEST_FILE, JSON.stringify(manifest, null, 2));
  console.log(`📄 Manifest saved at ${MANIFEST_FILE}`);
  console.log("🎉 Gallery prepared successfully!");
}

prepareGallery().catch(err => {
  console.error("❌ Error:", err);
  process.exit(1);
});
