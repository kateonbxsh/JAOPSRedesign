import { writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { geoContains } from "d3-geo";
import { feature } from "topojson-client";

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const landAtlas = require("world-atlas/land-110m.json");
const outputPath = resolve(__dirname, "../src/content/globe-dots.json");

const radius = 1.95;
const latitudeStep = 1.55;
const longitudeBaseStep = 2.1;
const minLongitudeStep = 1.45;
const landFeature = feature(landAtlas, landAtlas.objects.land);

function lerp(a, b, amount) {
  return a + (b - a) * amount;
}

function round(value) {
  return Number(value.toFixed(5));
}

const positions = [];
const colors = [];
const cyan = { r: 0.4, g: 0.851, b: 1 };
const white = { r: 1, g: 1, b: 1 };

for (let lat = -70; lat <= 82; lat += latitudeStep) {
  const rowDensity = Math.max(minLongitudeStep, longitudeBaseStep / Math.max(0.34, Math.cos((lat * Math.PI) / 180)));

  for (let lon = -180; lon < 180; lon += rowDensity) {
    if (!geoContains(landFeature, [lon, lat])) continue;

    const phi = ((90 - lat) * Math.PI) / 180;
    const theta = ((lon + 180) * Math.PI) / 180;
    const x = -radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const shade = Math.max(0.15, Math.min(1, (z + radius) / (radius * 2)));
    const highlight = shade > 0.64 ? 0.5 : 0.05;

    positions.push(round(x), round(y), round(z));
    colors.push(
      round(lerp(cyan.r, white.r, highlight)),
      round(lerp(cyan.g, white.g, highlight)),
      round(lerp(cyan.b, white.b, highlight))
    );
  }
}

await writeFile(
  outputPath,
  `${JSON.stringify(
    {
      radius,
      dotCount: positions.length / 3,
      positions,
      colors
    },
    null,
    0
  )}\n`
);

console.log(`Generated ${positions.length / 3} globe dots at ${outputPath}`);
