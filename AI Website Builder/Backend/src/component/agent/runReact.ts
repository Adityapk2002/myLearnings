import { groq } from "../../config/groqClient.js";
import { systemPrompt } from "../../systemPrompt.js";
import { createSandbox } from "../sandbox/sandboxManager.js";

function toPublicUrl(hostOrUrl: string) {
  if (/^https?:\/\//i.test(hostOrUrl)) return hostOrUrl;
  if (/^(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/i.test(hostOrUrl)) {
    return `http://${hostOrUrl}`;
  }
  return `https://${hostOrUrl}`;
}

function extractJSON(raw: string) {
  if (!raw) throw new Error("Empty LLM response");
  let text = raw.trim();

  // remove ```json wrappers if model adds them
  if (text.startsWith("```")) {
    text = text
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```$/i, "")
      .trim();
  }

  const first = text.indexOf("{");
  const last = text.lastIndexOf("}");

  if (first === -1 || last === -1) {
    throw new Error("No JSON found in response:\n" + raw);
  }

  const jsonString = text.slice(first, last + 1);
  return JSON.parse(jsonString);
}

export async function runReactAgent(userPrompt: string) {
  console.log("🟢 Creating sandbox...");
  const sandbox = await createSandbox();

  let lastError = "";
  let attempt = 0;

  try {
    // 🔥 STEP 0: Upgrade Node.js to compatible version
    console.log("⬆️ Upgrading Node.js...");

    // Install nvm (Node Version Manager)
    await sandbox.commands.run(
      "curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash",
      { cwd: "/home/user" },
    );

    // Source nvm and install Node.js 22 (latest LTS)
    await sandbox.commands.run(
      `export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" && nvm install 22 && nvm use 22`,
      { cwd: "/home/user" },
    );

    // 🔥 STEP 1: Create base React app
    console.log("⚙️ Creating base React (Vite) app...");
    await sandbox.commands.run(
      `export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" && nvm use 22 && npm create vite@latest app -- --template react`,
      { cwd: "/home/user" },
    );

    console.log("📦 Installing base dependencies...");
    await sandbox.commands.run(
      `export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" && nvm use 22 && npm install`,
      { cwd: "/home/user/app" },
    );

    // 🔥 STEP 2: Configure Vite for E2B sandbox
    console.log("⚙️ Configuring Vite for sandbox environment...");
    await sandbox.files.write(
      "/home/user/app/vite.config.js",
      `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    allowedHosts: true
  }
})
`,
    );

    // 🔁 Agent loop
    while (attempt < 5) {
      attempt++;
      console.log(`\n🔄 Attempt ${attempt}`);

      const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: `
USER REQUEST:
${userPrompt}

${lastError ? `PREVIOUS BUILD ERROR:\n${lastError}\n\nFix the error.` : ""}

CRITICAL:
Respond with ONLY valid JSON.
No markdown. No explanation.
`,
          },
        ],
      });

      const raw = completion.choices[0]?.message.content || "";
      console.log("🧠 Raw LLM response received");
      console.log(raw);

      let parsed: any;
      try {
        parsed = extractJSON(raw);
      } catch (err) {
        console.log("❌ JSON parse failed, retrying...");
        lastError = "INVALID JSON RESPONSE";
        continue;
      }

      console.log("📄 Writing files...");
      for (const filePath in parsed.files) {
        await sandbox.files.write(
          `/home/user/app/${filePath}`,
          parsed.files[filePath],
        );
      }

      console.log("📦 Installing any new deps...");
      try {
        await sandbox.commands.run(
          `export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" && nvm use 22 && npm install`,
          { cwd: "/home/user/app" },
        );
      } catch (err: any) {
        lastError = err.stderr || err.message;
        continue;
      }

      console.log("🚀 Starting dev server...");
      const dev = await sandbox.commands.run(
        `export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" && nvm use 22 && npm run dev -- --host`,
        {
          cwd: "/home/user/app",
          background: true,
        },
      );

      // wait for build
      await new Promise((r) => setTimeout(r, 6000));

      const stderr = dev.stderr || "";

      if (stderr && stderr.trim() !== "") {
        console.log("❌ Build error detected:");
        console.log(stderr);
        lastError = stderr;
        continue;
      }

      const previewUrl = toPublicUrl(sandbox.getHost(5173));
      console.log("\n🎉 SUCCESS! LIVE PREVIEW:");
      console.log(previewUrl);
      return previewUrl;
    }

    console.log("\n❌ Failed after 5 attempts");
    return null;
  } catch (err) {
    console.error("💥 Agent crashed:", err);
    throw err;
  }
}
