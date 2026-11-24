// Make the AI Judge Laugh: Developer Excuses
// Entry program for make.fun competition
// u-motasimfuad-make-the-ai-judge-laugh-developer-49386be3
//
// The program writes one funny single-line excuse a developer gives
// when code breaks in production to /output/entry.txt.
// Gate: UTF-8 text, 1 to 200 characters, not only white space.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The excuse, built from its two beats so each half earns its place:
// the worn alibi, then the twist that turns it on its head.
const SETUP = "It worked on my machine";
const TWIST =
  "which is the only machine that has never once met a real user";

const EXCUSE = `${SETUP} \u2014 ${TWIST}.`;

const MAX_CHARS = 200;

function charCount(text: string): number {
  // Count Unicode code points, not UTF-16 units, so the gate's
  // character count matches even if the line ever gains an emoji.
  return [...text].length;
}

function main(): void {
  const text = EXCUSE.trim();

  if (text.length === 0) {
    throw new Error("excuse is empty");
  }
  if (charCount(text) > MAX_CHARS) {
    throw new Error(
      `excuse is ${charCount(text)} characters, over the ${MAX_CHARS} limit`,
    );
  }
  if (!/\S/.test(text)) {
    throw new Error("excuse is only white space");
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("excuse must be a single line");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, text, "utf8");

  console.log(`Wrote ${charCount(text)} characters to ${outPath}`);
  console.log(text);
}

main();
