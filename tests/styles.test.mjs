import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const css = await readFile(new URL("../styles.css", import.meta.url), "utf8");

test("stylesheet defines approved editorial tokens", () => {
  assert.match(css, /--color-cream:\s*#[0-9a-f]{6}/i);
  assert.match(css, /--color-navy:\s*#[0-9a-f]{6}/i);
  assert.match(css, /--color-orange:\s*#[0-9a-f]{6}/i);
  assert.match(css, /--color-yellow:\s*#[0-9a-f]{6}/i);
});

test("stylesheet includes focus, mobile, and reduced-motion handling", () => {
  assert.match(css, /:focus-visible/);
  assert.match(css, /@media\s*\(max-width:\s*40rem\)/);
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  assert.match(css, /overflow-wrap:\s*anywhere/);
});

test("stylesheet does not import external assets", () => {
  assert.doesNotMatch(css, /@import|url\(["']?https?:/i);
});
