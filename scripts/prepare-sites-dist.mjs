import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs";
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

rmSync(serverDir, { recursive: true, force: true });
mkdirSync(serverDir, { recursive: true });

const packagedStandalone = join(serverDir, "standalone");
renameSync(standalone, packagedStandalone);
cpSync(
  join(packagedStandalone, "server.js"),
  join(packagedStandalone, "server.cjs"),
);
writeFileSync(
  join(serverDir, "index.js"),
  'import "./standalone/server.cjs";\n',
);
writeFileSync(join(serverDir, "package.json"), '{"type":"module"}\n');

for (const entry of readdirSync(dist)) {
  if (entry !== ".openai" && entry !== "server") {
    rmSync(join(dist, entry), { recursive: true, force: true });
  }
}
