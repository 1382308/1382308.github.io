import test from "node:test";
import assert from "node:assert/strict";

// Node has no document and this project intentionally has no dependencies.
// This small document adapter executes production rendering/event handlers;
// it does not emulate layout, browser keyboard defaults, or accessibility APIs.
class Element extends EventTarget {
  constructor(tagName) {
    super();
    this.tagName = tagName;
    this.children = [];
    this.dataset = {};
    this.attributes = new Map();
    this.textContent = "";
  }
  append(...elements) { this.children.push(...elements); }
  replaceChildren(...elements) { this.children = [...elements]; }
  setAttribute(name, value) { this.attributes.set(name, String(value)); }
  getAttribute(name) { return this.attributes.get(name) ?? null; }
}

const descendants = (element) => element.children.flatMap((child) => [child, ...descendants(child)]);

test("catalog initialization and filter clicks update cards, counts, and pressed states", async (t) => {
  const nodes = new Map([
    ["#project-grid", new Element("div")],
    ["#result-status", new Element("p")],
    ["#filter-list", new Element("div")],
    ["[data-project-count]", new Element("strong")],
  ]);
  const previousDocument = Object.getOwnPropertyDescriptor(globalThis, "document");
  t.after(() => {
    if (previousDocument) Object.defineProperty(globalThis, "document", previousDocument);
    else delete globalThis.document;
  });
  globalThis.document = {
    createElement: (tag) => new Element(tag),
    querySelector: (selector) => {
      assert.ok(nodes.has(selector), `unexpected selector: ${selector}`);
      return nodes.get(selector);
    },
    querySelectorAll: (selector) => {
      if (selector === "[data-filter]") return nodes.get("#filter-list").children;
      assert.equal(selector, "[data-project-count]");
      return [nodes.get(selector)];
    },
  };

  const { renderProjectCard } = await import("../script.js?rendering-verification");
  const grid = nodes.get("#project-grid");
  const buttons = nodes.get("#filter-list").children;
  assert.equal(grid.children.length, 11);
  assert.equal(nodes.get("[data-project-count]").textContent, "11");
  assert.equal(nodes.get("#result-status").textContent, "11 proyectos");
  assert.deepEqual(buttons.map((button) => button.textContent), [
    "Todos", "Matemáticas", "Trigonometría", "Geometría", "Herramientas",
  ]);
  assert.deepEqual(buttons.map((button) => button.getAttribute("aria-pressed")), [
    "true", "false", "false", "false", "false",
  ]);

  // Published cards expose distinct destinations; the unavailable one does not.
  const linksPerCard = grid.children.map((card) => {
    const links = descendants(card).filter((node) => node.tagName === "a");
    for (const link of links) {
      assert.equal(link.target, "_blank");
      assert.equal(link.rel, "noopener noreferrer");
    }
    assert.equal(new Set(links.map((link) => link.href)).size, links.length);
    return links.length;
  });
  assert.deepEqual(linksPerCard, [2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2]);
  const unavailable = descendants(grid.children[7]);
  assert.ok(unavailable.some((node) => node.textContent === "Publicación no disponible"));
  assert.equal(unavailable.find((node) => node.tagName === "a").href,
    "https://github.com/1382308/trigonometric-ratios");

  const expectedCounts = [11, 2, 5, 3, 1];
  for (const [index, button] of buttons.entries()) {
    assert.equal(button.type, "button");
    button.dispatchEvent(new Event("click"));
    assert.equal(grid.children.length, expectedCounts[index]);
    assert.equal(nodes.get("#result-status").textContent,
      `${expectedCounts[index]} ${expectedCounts[index] === 1 ? "proyecto" : "proyectos"}`);
    assert.deepEqual(buttons.map((item) => item.getAttribute("aria-pressed")),
      buttons.map((_, buttonIndex) => String(buttonIndex === index)));
    if (index > 0) {
      assert.ok(grid.children.every((card) => card.dataset.category === button.textContent));
    }
    assert.equal(nodes.get("[data-project-count]").textContent, "11");
  }
  buttons[0].dispatchEvent(new Event("click"));
  assert.equal(grid.children.length, 11, "returning to Todos replaces, rather than appends cards");

  // A markup-like title remains text rather than adding executable descendants.
  const card = renderProjectCard({
    title: "<img src=x onerror=alert(1)>", description: "<script>bad()</script>",
    category: "Herramientas", tags: ["<b>tag</b>"], liveAvailable: false,
    repoUrl: "https://github.com/1382308/asistencia",
  });
  assert.equal(card.children.find((node) => node.tagName === "h3").textContent,
    "<img src=x onerror=alert(1)>");
  assert.equal(descendants(card).some((node) => ["img", "script"].includes(node.tagName)), false);
});
