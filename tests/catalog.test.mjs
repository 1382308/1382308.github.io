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
