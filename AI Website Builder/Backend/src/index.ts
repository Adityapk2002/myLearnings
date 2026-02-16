import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { runReactAgent } from "./component/agent/runReact.js";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 AI React Builder Backend Running");
});

app.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt required" });
    }

    console.log("\n🧠 USER PROMPT:", prompt);

    const previewUrl = await runReactAgent(prompt);

    res.json({
      success: true,
      previewUrl,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Generation failed" });
  }
});

app.listen(3000, () => {
  console.log("Listening on 3000");
});
