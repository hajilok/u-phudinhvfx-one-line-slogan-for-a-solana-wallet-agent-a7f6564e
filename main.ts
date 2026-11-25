import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const MAX_CHARS = 140;
const MAX_WORDS = 20;

// Generation-3 championship slogan (0.910 mean vs benchmarks, 0.925 vs rivals; 18 words, 92 bytes).
const SLOGAN =
  'A Solana wallet agent with ears and manners: say who to pay, and it checks before it clicks.';

function validateSlogan(text: string): string {
  const trimmed = text.trim();
  if (trimmed.length === 0 || trimmed.length > MAX_CHARS) {
    throw new Error(`Invalid character count: ${trimmed.length} (expected 1..${MAX_CHARS})`);
  }
  if (/[\r\n]/.test(trimmed)) {
    throw new Error('Slogan must be a single line with no line breaks');
  }
  const words = trimmed.split(/\s+/).filter(Boolean);
  if (words.length > MAX_WORDS) {
    throw new Error(`Invalid word count: ${words.length} (expected <= ${MAX_WORDS})`);
  }
  return trimmed;
}

function main(): void {
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
  const entry = validateSlogan(SLOGAN);
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, 'entry.txt'), entry, 'utf8');
}

main();
