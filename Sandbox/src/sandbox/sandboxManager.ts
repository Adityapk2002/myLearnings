import { Sandbox } from "e2b";

export async function createSandbox() {
  console.log("🟢 Creating sandbox...");
  const sandbox = await Sandbox.create();
  return sandbox;
}

export async function destroySandbox(sandbox: Sandbox) {
  console.log("🛑 Destroying sandbox...");
  await sandbox.kill();
}
