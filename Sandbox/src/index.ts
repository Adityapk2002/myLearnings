import dotenv from "dotenv";
import { generateLivePreview } from "./preview/livePreview.js";
import { runReactAgent } from "./agent/reactAgent.js";

dotenv.config();

async function main() {
  const result = await runReactAgent(
    "Create modern glassmorphism todo app with add delete feature",
  );

  console.log("\nResult:", result);
}

main();
