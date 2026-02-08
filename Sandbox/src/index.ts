import dotenv from "dotenv";
import { generateLivePreview } from "./preview/livePreview.js";

dotenv.config();

async function main() {
  const result = await generateLivePreview(
    "Generate a visually stunning, next-level, modern website that looks like a high-end professional landing page.",
  );

  console.log("\nResult:", result);
}

main();
