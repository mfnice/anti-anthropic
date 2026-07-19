import { cpSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, "dist");
const standalone = join(dist, "standalone");
const serverDir = join(dist, "server");

if (!existsSync(join(standalone, "server.js"))) {
  throw new Error("Expected Next standalone output at dist/standalone/server.js");
}

mkdirSync(join(standalone, "public"), { recursive: true });
cpSync(join(root, "public"), join(standalone, "public"), { recursive: true });

mkdirSync(join(standalone, "dist"), { recursive: true });
cpSync(join(dist, "static"), join(standalone, "dist", "static"), { recursive: true });

mkdirSync(join(dist, ".openai"), { recursive: true });
cpSync(join(root, ".openai", "hosting.json"), join(dist, ".openai", "hosting.json"));

mkdirSync(serverDir, { recursive: true });
cpSync(standalone, join(serverDir, "standalone"), { recursive: true });
writeFileSync(
  join(serverDir, "index.js"),
  [
    'import { createRequire } from "node:module";',
    'const require = createRequire(`${process.cwd()}/dist/server/index.js`);',
    'require("./standalone/server.js");',
    "",
  ].join("\n"),
);
writeFileSync(join(serverDir, "package.json"), '{"type":"module"}\n');
