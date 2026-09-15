# Project Catalog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the 2023 practice page with a neutral, responsive editorial catalog for the eleven public projects owned by `1382308`.

**Architecture:** A semantic static page loads one local ES module. The module owns the audited project records, pure validation/filtering functions, DOM rendering, and accessible filter state; one stylesheet owns the editorial design and responsive behavior. Node's built-in test runner verifies data, filtering, markup, and CSS contracts without adding dependencies or a build step.

**Tech Stack:** HTML5, CSS3, browser-native JavaScript ES modules, Node.js built-in `node:test`, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-09-15-project-catalog-design.md`

## Global Constraints

- Include exactly the eleven audited public source repositories; exclude `1382308.github.io`.
- Keep the catalog neutral: no biography, photograph, résumé, or personal-portfolio copy.
- Use the approved editorial palette: cream, navy, orange, and yellow; no glossy treatment or generic gradient background.
- Use no framework, package manager, build step, icon library, remote font, or runtime GitHub API request.
- Support keyboard navigation, visible focus, WCAG AA text/control contrast, `aria-pressed` filter state, a live result count, and `prefers-reduced-motion`.
- Support viewports from 320 px upward without horizontal scrolling.
- Open external links in a new tab with `rel="noopener noreferrer"`.

---

### Task 1: Audited project model and filtering

**Files:**
- Create: `script.js`
- Create: `tests/catalog.test.mjs`

**Interfaces:**
- Produces: `CATEGORIES: readonly string[]`
- Produces: `PROJECTS: readonly Project[]`, where `Project` contains `id`, `title`, `description`, `category`, `tags`, `liveUrl`, `repoUrl`, `liveAvailable`, and `featured`.
- Produces: `validateProjects(projects): true`, throwing for an invalid collection.
- Produces: `filterProjects(projects, category): Project[]`.
- Consumes: the repository-content and live-link audit results.

- [ ] **Step 1: Write failing catalog tests**

Create `tests/catalog.test.mjs` with these assertions:

```js
import test from "node:test";
import assert from "node:assert/strict";
import {
  CATEGORIES,
  PROJECTS,
  filterProjects,
  validateProjects,
} from "../script.js";

test("catalog contains the eleven audited projects and excludes the index", () => {
  assert.equal(PROJECTS.length, 11);
  assert.equal(new Set(PROJECTS.map(({ id }) => id)).size, 11);
  assert.equal(PROJECTS.some(({ id }) => id === "1382308.github.io"), false);
  assert.deepEqual(CATEGORIES, [
    "Todos",
    "Matemáticas",
    "Trigonometría",
    "Geometría",
    "Herramientas",
  ]);
});

test("every project has complete safe metadata", () => {
  assert.equal(validateProjects(PROJECTS), true);
  for (const project of PROJECTS) {
    assert.equal(project.repoUrl, `https://github.com/1382308/${project.id}`);
    assert.match(project.liveUrl, /^https:\/\/(1382308\.github\.io|github\.com)\//);
    assert.ok(project.description.length >= 80);
    assert.ok(project.tags.length >= 2);
  }
});

test("only trigonometric-ratios uses the repository fallback", () => {
  const unavailable = PROJECTS.filter(({ liveAvailable }) => !liveAvailable);
  assert.deepEqual(unavailable.map(({ id }) => id), ["trigonometric-ratios"]);
  assert.equal(unavailable[0].liveUrl, unavailable[0].repoUrl);
});

test("Asistencia is the single featured project", () => {
  const featured = PROJECTS.filter(({ featured }) => featured);
  assert.equal(featured.length, 1);
  assert.equal(featured[0].id, "asistencia");
});

test("filterProjects returns all projects or one category", () => {
  assert.equal(filterProjects(PROJECTS, "Todos").length, 11);
  assert.ok(filterProjects(PROJECTS, "Trigonometría").length >= 4);
  assert.ok(
    filterProjects(PROJECTS, "Geometría").every(
      ({ category }) => category === "Geometría",
    ),
  );
  assert.deepEqual(filterProjects(PROJECTS, "Categoría inexistente"), []);
});
```

- [ ] **Step 2: Run the tests and verify the missing module failure**

Run:

```bash
node --experimental-default-type=module --test tests/catalog.test.mjs
```

Expected: FAIL because `script.js` does not exist.

- [ ] **Step 3: Implement the audited catalog and pure functions**

Create `script.js` with the five exact categories and eleven records. Use these audited titles, descriptions, categories, and tags:

| id | title | description | category | tags |
|---|---|---|---|---|
| asistencia | Asistencia con códigos QR | Aplicación web instalable para tomar asistencia escaneando códigos QR, importar listas de iDoceo y conservar un historial local exportable a Excel o CSV. | Herramientas | QR, Asistencia, Excel |
| secret-code | El código secreto de las fracciones | Actividad colaborativa donde se relacionan fracciones numéricas con círculos sombreados para revelar una adivinanza y resolver su respuesta final. | Matemáticas | Fracciones, Adivinanza, Colaboración |
| signs | Signo veloz | Juego contrarreloj de multiplicación de enteros con signo, tres vidas, combos, niveles por grado y clasificación en línea por grupo. | Matemáticas | Enteros, Multiplicación, Arcade |
| cylindervolume | Volumen de cilindros paso a paso | Calculadora didáctica que obtiene el volumen de un cilindro a partir del radio y la altura, mostrando fórmula, sustitución y resultado. | Geometría | Cilindros, Volumen, Calculadora |
| Iso2Ortho | Vistas ortográficas por pieza | Examen visual para asignar mediante arrastre o toque las vistas frontal, superior y lateral izquierda correspondientes a seis piezas isométricas. | Geometría | Vistas ortográficas, Piezas 3D, Examen |
| pirates-web | Carrera pirata de trigonometría | Carrera multijugador de temática pirata con treinta preguntas de triángulos, Pitágoras y razones trigonométricas, ventajas tácticas y podio. | Trigonometría | Trigonometría, Multijugador, Gamificación |
| Mystery-Trig | Misterio trigonométrico colaborativo | Carrera colaborativa donde los equipos responden definiciones de razones trigonométricas para revelar celda a celda una imagen misteriosa compartida en tiempo real. | Trigonometría | Razones, Colaboración, Tiempo real |
| trigonometric-ratios | Constructor de razones trigonométricas | Juego de aula por equipos para construir razones trigonométricas a partir de triángulos, con vidas, doce retos, sala sincronizada y tablero docente. | Trigonometría | Triángulos, Razones, Equipos |
| carrera-trigonometrica | Carrera trigonométrica por equipos | Carrera multijugador por salas con preguntas directas e inversas de seno, coseno y tangente, cinco vidas, cronómetro y tablero docente. | Trigonometría | Funciones, Competición, Equipos |
| Isometric-Orthographic-Views | Taller de dibujo isométrico y ortográfico | Lienzo técnico para dibujar seis figuras sobre retículas isométricas y ortográficas, guardar avances localmente y exportar un PDF vectorial multipágina. | Geometría | Dibujo técnico, Isometría, PDF |
| crucigrama-trigonometria | Crucigrama de Pitágoras y trigonometría | Crucigrama interactivo e imprimible de once conceptos sobre triángulos rectángulos, Pitágoras y razones trigonométricas, con cronómetro y corrección inmediata. | Trigonometría | Pitágoras, Vocabulario, Crucigrama |

For each record set `repoUrl` to `https://github.com/1382308/<id>` and set `featured: true` only for `asistencia`. Use `https://1382308.github.io/<id>/` and `liveAvailable: true` for every project except `trigonometric-ratios`; for that record use its repository URL as `liveUrl` and set `liveAvailable: false` because the root, `index.html`, and `dashboard.html` all returned 404 during the audit. Preserve capitalization in the `Iso2Ortho`, `Mystery-Trig`, and `Isometric-Orthographic-Views` live URLs. Freeze the exported arrays. In `validateProjects`, reject duplicate IDs, unknown categories, missing text, unsafe URLs, fewer than two tags, inconsistent availability URLs, or a featured count other than one. In `filterProjects`, return a shallow copy for `Todos`, a category match for known categories, and an empty array for unknown categories.

- [ ] **Step 4: Run the catalog tests**

Run:

```bash
node --experimental-default-type=module --test tests/catalog.test.mjs
```

Expected: 5 tests PASS.

- [ ] **Step 5: Commit the catalog model**

```bash
git add script.js tests/catalog.test.mjs
git commit -m "feat: add audited project catalog data"
```

---

### Task 2: Semantic page structure and accessible rendering

**Files:**
- Replace: `index.html`
- Modify: `script.js`
- Create: `tests/markup.test.mjs`

**Interfaces:**
- Consumes: `CATEGORIES`, `PROJECTS`, `validateProjects`, and `filterProjects` from Task 1.
- Produces: `renderProjectCard(project): HTMLElement`.
- Produces: `renderCatalog(category): void`.
- Produces: DOM hooks `#project-grid`, `#filter-list`, `#result-status`, and `[data-project-count]`.

- [ ] **Step 1: Write failing markup contract tests**

Create `tests/markup.test.mjs`:

```js
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
```

- [ ] **Step 2: Run markup tests and verify they fail on the old practice page**

Run:

```bash
node --test tests/markup.test.mjs
```

Expected: FAIL because the existing page is in English, contains Bootstrap and lacks catalog hooks.

- [ ] **Step 3: Replace the practice page with semantic catalog markup**

Write `index.html` with:

- Spanish metadata, title `Proyectos interactivos`, concise description, theme color, and favicon as a small data-URI SVG.
- Skip link to `#catalogo`.
- Header with label `CATÁLOGO DIGITAL`, title `Proyectos interactivos`, neutral introductory copy, `[data-project-count]`, and GitHub profile link.
- Main content with an `Asistencia` featured region, a `nav` named `Filtrar proyectos`, empty `#filter-list`, live `#result-status`, and empty `#project-grid`.
- A `noscript` message linking to `https://github.com/1382308?tab=repositories`.
- Footer with GitHub Pages statement and public-profile link.
- Local `styles.css` and module `script.js` references.

- [ ] **Step 4: Add safe DOM rendering and filter interactions**

In `script.js`, add:

```js
export function renderProjectCard(project) {
  const article = document.createElement("article");
  article.className = "project-card";
  article.dataset.category = project.category;
  // Build every text node with textContent; do not inject project data with innerHTML.
  // Add category, title, description, tag list, live link, and repository link.
  // When liveAvailable is false, show “Publicación no disponible”, label the
  // primary action “Ver repositorio”, and do not render a duplicate link.
  return article;
}

export function renderCatalog(category = "Todos") {
  const visibleProjects = filterProjects(PROJECTS, category);
  const grid = document.querySelector("#project-grid");
  grid.replaceChildren(...visibleProjects.map(renderProjectCard));
  document.querySelector("#result-status").textContent =
    `${visibleProjects.length} ${visibleProjects.length === 1 ? "proyecto" : "proyectos"}`;
  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.filter === category));
  });
}
```

Create filter buttons from `CATEGORIES`, bind click handlers to `renderCatalog`, set all external-link attributes explicitly, validate the catalog once, update every `[data-project-count]`, and call `renderCatalog("Todos")` when `document` exists.

- [ ] **Step 5: Run data and markup tests**

Run:

```bash
node --experimental-default-type=module --test tests/catalog.test.mjs tests/markup.test.mjs
```

Expected: 8 tests PASS.

- [ ] **Step 6: Commit the semantic catalog**

```bash
git add index.html script.js tests/markup.test.mjs
git commit -m "feat: render accessible project catalog"
```

---

### Task 3: Editorial visual system and responsive behavior

**Files:**
- Create: `styles.css`
- Create: `tests/styles.test.mjs`

**Interfaces:**
- Consumes: semantic classes and IDs produced by Task 2.
- Produces: responsive editorial presentation for `.site-header`, `.featured-project`, `.filter-button`, `.project-grid`, `.project-card`, `.button-primary`, and `.button-secondary`.

- [ ] **Step 1: Write failing stylesheet contract tests**

Create `tests/styles.test.mjs`:

```js
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
```

- [ ] **Step 2: Run style tests and verify the missing file failure**

Run:

```bash
node --test tests/styles.test.mjs
```

Expected: FAIL because `styles.css` does not exist.

- [ ] **Step 3: Build the approved editorial styling**

Create `styles.css` with:

- Tokens `--color-cream`, `--color-navy`, `--color-orange`, `--color-yellow`, neutral text/surface colors, spacing, borders, shadows, and a system sans-serif stack.
- Global box sizing, body reset, skip-link behavior, readable line length, and visible `:focus-visible` outline.
- A wide editorial header with a numbered project-count block and controlled asymmetric accents.
- A featured project composed as a large orange information block beside a navy action block.
- Filter buttons with clear hover, focus, and `[aria-pressed="true"]` states.
- A responsive grid using `repeat(auto-fit, minmax(min(100%, 18rem), 1fr))`.
- Cards with consistent internal layout, category accent variants, tags, and actions anchored to the bottom.
- Short entry/hover motion using transform and opacity only.
- A `max-width: 40rem` rule that stacks the header/featured content, makes primary actions easy to tap, and reduces large typography.
- A `prefers-reduced-motion: reduce` rule that removes animation and transitions.
- `overflow-wrap: anywhere` on long labels and links, plus `min-width: 0` on grid/flex children.

- [ ] **Step 4: Run the complete test suite**

Run:

```bash
node --experimental-default-type=module --test tests/*.test.mjs
```

Expected: all 11 tests PASS.

- [ ] **Step 5: Commit the visual system**

```bash
git add styles.css tests/styles.test.mjs
git commit -m "feat: add responsive editorial design"
```

---

### Task 4: Link, runtime, and delivery verification

**Files:**
- Modify only if a verification failure requires it: `index.html`, `styles.css`, `script.js`, or matching tests.

**Interfaces:**
- Consumes: the completed static catalog.
- Produces: a verified GitHub Pages-ready repository.

- [ ] **Step 1: Run syntax and automated tests**

Run:

```bash
node --check script.js
node --experimental-default-type=module --test tests/*.test.mjs
git diff --check
```

Expected: JavaScript syntax succeeds, all 11 tests pass, and `git diff --check` prints no errors.

- [ ] **Step 2: Serve the site and verify local HTTP responses**

Run the server in one terminal:

```bash
python -m http.server 4173 --bind 127.0.0.1
```

Then request the three static assets:

```bash
curl --fail --silent --show-error http://127.0.0.1:4173/
curl --fail --silent --show-error http://127.0.0.1:4173/styles.css
curl --fail --silent --show-error http://127.0.0.1:4173/script.js
```

Expected: all requests return HTTP 200 and non-empty content.

- [ ] **Step 3: Verify every public and source URL**

For every entry in `PROJECTS`, request `liveUrl` and `repoUrl` with redirects enabled. Confirm a successful 2xx response, or update a failed `liveUrl` to its audited working entry point. Do not remove projects whose optional Firebase/CDN features require network access.

- [ ] **Step 4: Inspect responsive and accessibility contracts**

Check the rendered page at 320 px, 768 px, and 1440 px. Confirm no horizontal overflow, readable hierarchy, visible keyboard focus, working filter counts, two distinct links per card, and no console errors. Re-run the complete suite after any correction.

- [ ] **Step 5: Commit only verification-driven corrections**

If files changed:

```bash
git add index.html styles.css script.js tests
git commit -m "fix: resolve catalog verification findings"
```

If no files changed, create no empty commit.
