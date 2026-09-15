import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");

test("page has Spanish metadata and semantic landmarks", () => {
  assert.match(html, /<html lang="es">/);
  assert.match(html, /<title>Proyectos interactivos<\/title>/);
  assert.match(html, /<header[\s>]/);
  assert.match(html, /<main[\s>]/);
  assert.match(html, /<footer[\s>]/);
});

test("page exposes catalog accessibility hooks", () => {
  assert.match(html, /id="filter-list"/);
  assert.match(html, /id="project-grid"/);
  assert.match(html, /id="result-status"[^>]*aria-live="polite"/);
  assert.match(html, /data-project-count/);
  assert.match(html, /<noscript>/);
});

test("page loads only local stylesheet and module", () => {
  assert.match(html, /href="styles\.css"/);
  assert.match(html, /<script type="module" src="script\.js"><\/script>/);
  assert.doesNotMatch(html, /bootstrap|tailwind|fonts\.googleapis|unpkg|jsdelivr/i);
});
