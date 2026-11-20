// gta6-clipper-01 entry program (Node 22, standard library only).
//
// The entry is the YouTube video itself, not this program's output: the
// house reads VIDEO.json from the submitted repository, finds the video on
// YouTube, and ranks it by views. All this program does is hand that file
// to the grader by copying it into the output directory.
//
// Local test run (outside the grader's container):
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const source = join(BOT_DIR, 'VIDEO.json');
const target = join(OUTPUT_DIR, 'VIDEO.json');

// Refuse to hand in a file that is not even valid JSON with a url in it:
// a placeholder address is still refused by the gate, but a broken file
// would fail even earlier, so catch that here with a clear message.
try {
  const parsed = JSON.parse(readFileSync(source, 'utf8')) as { url?: unknown };
  if (typeof parsed.url !== 'string' || parsed.url.length === 0) {
    throw new Error('VIDEO.json has no url string');
  }
} catch (err) {
  console.error(`VIDEO.json in ${BOT_DIR} is not usable: ${(err as Error).message}`);
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(source, target);
} catch (err) {
  console.error(`VIDEO.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}

console.log(`Copied VIDEO.json to ${target}`);
