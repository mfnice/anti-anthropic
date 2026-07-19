import { cpSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, "dist");

if (!existsSync(join(dist, "server", "index.js"))) {
  throw new Error("Expected vinext output at dist/server/index.js");
}

mkdirSync(join(dist, ".openai"), { recursive: true });
cpSync(
  join(root, ".openai", "hosting.json"),
  join(dist, ".openai", "hosting.json"),
);
