import fs from "fs";
import path from "path";
import sharp from "sharp";

// Source = where you put raw photos
//const srcDir = "client/gallery_src";
// Output = where optimized photos + manifest go
//const outDir = "client/public/gallery";
const srcDir = "gallery_src";          // ✅ relative to client/
const outDir = "public/gallery";       // ✅ relative to client/

const manifestFile = path.join(outDir, "manifest.json");

async function processImages() {
  let manifest = {};
  let counts = {};

  function getAllImages(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat && stat.isDirectory()) {
        results = results.concat(getAllImages(filePath));
      } else if (/\.(jpe?g|png)$/i.test(file)) {
        results.push(filePath);
      }
    });
    return results;
  }

  const allImages = getAllImages(srcDir);
  if (allImages.length === 0) {
    console.log("⚠️ No images found in gallery_src/");
    return;
  }

  fs.mkdirSync(outDir, { recursive: true });

  for (const imgPath of allImages) {
    const relPath = path.relative(srcDir, imgPath); // e.g. prewedding/img1.jpg
    const folder = path.dirname(relPath);           // e.g. prewedding
    const outFolder = path.join(outDir, folder);
    fs.mkdirSync(outFolder, { recursive: true });

    const outFile = path.join(outFolder, path.basename(imgPath));
    // Resize to max 1200px width
    await sharp(imgPath).resize(1200).toFile(outFile);

    if (!manifest[folder]) manifest[folder] = [];
    manifest[folder].push(`/gallery/${folder}/${path.basename(imgPath)}`);

    counts[folder] = (counts[folder] || 0) + 1;
  }

  fs.writeFileSync(manifestFile, JSON.stringify(manifest, null, 2));
  console.log("\n✅ Gallery build complete!");
  Object.entries(counts).forEach(([folder, count]) =>
    console.log(`📸 ${folder}: ${count} images processed`)
  );
}

processImages();
