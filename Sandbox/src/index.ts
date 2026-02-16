import dotenv from "dotenv";
import { generateLivePreview } from "./preview/livePreview.js";
import { runReactAgent } from "./agent/reactAgent.js";

dotenv.config();

async function main() {
  const result = await runReactAgent(
    "create a modern landing page for hotel carnival with vibrant colours also interactive pages",
  );

  console.log("\nResult:", result);
}

main();
