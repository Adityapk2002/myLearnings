import { Sandbox } from "@e2b/code-interpreter";
import { groq } from "../config/groqClient.js";

export async function runCodingAgent(Prompt: string) {
  console.log("Starting coding agent");

  const sandbox = await Sandbox.create();
  let attempt = 0;
  let error = "";

  try {
    while (attempt < 5) {
      attempt++;
      console.log(`\nAttempt ${attempt}/5`);

      const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `You are an expert python coding agent.

Rules:
- Return ONLY raw executable python code
- NO markdown formatting whatsoever
- NO code fences (absolutely no \`\`\`python or \`\`\`)
- NO explanations, comments, or text outside the code
- If previous error exists, fix it

Example of CORRECT format:
def fibonacci(n):
    fib_series = [0, 1]
    while len(fib_series) < n:
        fib_series.append(fib_series[-1] + fib_series[-2])
    return fib_series[:n]

print(fibonacci(10))

Example of WRONG format (DO NOT DO THIS):
\`\`\`python
def fibonacci(n):
    return [0, 1]
\`\`\``,
          },
          {
            role: "user",
            content: `USER TASK:
${Prompt}

${error ? `PREVIOUS ERROR:\n${error}` : ""}`,
          },
        ],
      });

      let code = response.choices[0]?.message.content || "";

      // Safety: strip markdown code blocks if LLM still adds them
      code = code
        .replace(/^```(?:python|py)?\s*\n?/gm, "") // Remove opening ```python, ```py, or ```
        .replace(/\n?```\s*$/gm, "") // Remove closing ```
        .trim();

      console.log("Generated code:");
      console.log(code);

      const execution = await sandbox.runCode(code);

      const stdout = (execution.logs.stdout || []).join("\n");
      const stderr = (execution.logs.stderr || []).join("\n");

      console.log("\nExecution stdout:", stdout);
      console.log("Execution stderr:", stderr);

      if (stderr && stderr.trim() !== "") {
        console.log("❌ Error detected, retrying...");
        error = stderr;
        continue;
      }

      console.log("✅ Execution successful!");
      return stdout;
    }

    console.log("❌ Failed after 5 attempts");
    return "Failed after 5 attempts. Last error: " + error;
  } catch (error) {
    console.error("❌ Unexpected error:", error);
    return "Unexpected error: " + error;
  } finally {
    await sandbox.kill();
    console.log("Sandbox closed");
  }
}
