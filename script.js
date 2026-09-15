export const CATEGORIES = Object.freeze([
  "Todos",
  "Matemáticas",
  "Trigonometría",
  "Geometría",
  "Herramientas",
]);

const project = (record) =>
  Object.freeze({ ...record, tags: Object.freeze([...record.tags]) });

export const PROJECTS = Object.freeze([
  project({
    id: "asistencia",
    title: "Asistencia con códigos QR",
    description:
      "Aplicación web instalable para tomar asistencia escaneando códigos QR, importar listas de iDoceo y conservar un historial local exportable a Excel o CSV.",
    category: "Herramientas",
    tags: ["QR", "Asistencia", "Excel"],
    liveUrl: "https://1382308.github.io/asistencia/",
    repoUrl: "https://github.com/1382308/asistencia",
    liveAvailable: true,
    featured: true,
  }),
  project({
    id: "secret-code",
    title: "El código secreto de las fracciones",
    description:
      "Actividad colaborativa donde se relacionan fracciones numéricas con círculos sombreados para revelar una adivinanza y resolver su respuesta final.",
    category: "Matemáticas",
    tags: ["Fracciones", "Adivinanza", "Colaboración"],
    liveUrl: "https://1382308.github.io/secret-code/",
    repoUrl: "https://github.com/1382308/secret-code",
    liveAvailable: true,
    featured: false,
  }),
  project({
    id: "signs",
    title: "Signo veloz",
    description:
      "Juego contrarreloj de multiplicación de enteros con signo, tres vidas, combos, niveles por grado y clasificación en línea por grupo.",
    category: "Matemáticas",
    tags: ["Enteros", "Multiplicación", "Arcade"],
    liveUrl: "https://1382308.github.io/signs/",
    repoUrl: "https://github.com/1382308/signs",
    liveAvailable: true,
    featured: false,
  }),
  project({
    id: "cylindervolume",
    title: "Volumen de cilindros paso a paso",
    description:
      "Calculadora didáctica que obtiene el volumen de un cilindro a partir del radio y la altura, mostrando fórmula, sustitución y resultado.",
    category: "Geometría",
    tags: ["Cilindros", "Volumen", "Calculadora"],
    liveUrl: "https://1382308.github.io/cylindervolume/",
    repoUrl: "https://github.com/1382308/cylindervolume",
    liveAvailable: true,
    featured: false,
  }),
  project({
    id: "Iso2Ortho",
    title: "Vistas ortográficas por pieza",
    description:
      "Examen visual para asignar mediante arrastre o toque las vistas frontal, superior y lateral izquierda correspondientes a seis piezas isométricas.",
    category: "Geometría",
    tags: ["Vistas ortográficas", "Piezas 3D", "Examen"],
    liveUrl: "https://1382308.github.io/Iso2Ortho/",
    repoUrl: "https://github.com/1382308/Iso2Ortho",
    liveAvailable: true,
    featured: false,
  }),
  project({
    id: "pirates-web",
    title: "Carrera pirata de trigonometría",
    description:
      "Carrera multijugador de temática pirata con treinta preguntas de triángulos, Pitágoras y razones trigonométricas, ventajas tácticas y podio.",
    category: "Trigonometría",
    tags: ["Trigonometría", "Multijugador", "Gamificación"],
    liveUrl: "https://1382308.github.io/pirates-web/",
    repoUrl: "https://github.com/1382308/pirates-web",
    liveAvailable: true,
    featured: false,
  }),
  project({
    id: "Mystery-Trig",
    title: "Misterio trigonométrico colaborativo",
    description:
      "Carrera colaborativa donde los equipos responden definiciones de razones trigonométricas para revelar celda a celda una imagen misteriosa compartida en tiempo real.",
    category: "Trigonometría",
    tags: ["Razones", "Colaboración", "Tiempo real"],
    liveUrl: "https://1382308.github.io/Mystery-Trig/",
    repoUrl: "https://github.com/1382308/Mystery-Trig",
    liveAvailable: true,
    featured: false,
  }),
  project({
    id: "trigonometric-ratios",
    title: "Constructor de razones trigonométricas",
    description:
      "Juego de aula por equipos para construir razones trigonométricas a partir de triángulos, con vidas, doce retos, sala sincronizada y tablero docente.",
    category: "Trigonometría",
    tags: ["Triángulos", "Razones", "Equipos"],
    liveUrl: "https://github.com/1382308/trigonometric-ratios",
    repoUrl: "https://github.com/1382308/trigonometric-ratios",
    liveAvailable: false,
    featured: false,
  }),
  project({
    id: "carrera-trigonometrica",
    title: "Carrera trigonométrica por equipos",
    description:
      "Carrera multijugador por salas con preguntas directas e inversas de seno, coseno y tangente, cinco vidas, cronómetro y tablero docente.",
    category: "Trigonometría",
    tags: ["Funciones", "Competición", "Equipos"],
    liveUrl: "https://1382308.github.io/carrera-trigonometrica/",
    repoUrl: "https://github.com/1382308/carrera-trigonometrica",
    liveAvailable: true,
    featured: false,
  }),
  project({
    id: "Isometric-Orthographic-Views",
    title: "Taller de dibujo isométrico y ortográfico",
    description:
      "Lienzo técnico para dibujar seis figuras sobre retículas isométricas y ortográficas, guardar avances localmente y exportar un PDF vectorial multipágina.",
    category: "Geometría",
    tags: ["Dibujo técnico", "Isometría", "PDF"],
    liveUrl: "https://1382308.github.io/Isometric-Orthographic-Views/",
    repoUrl: "https://github.com/1382308/Isometric-Orthographic-Views",
    liveAvailable: true,
    featured: false,
  }),
  project({
    id: "crucigrama-trigonometria",
    title: "Crucigrama de Pitágoras y trigonometría",
    description:
      "Crucigrama interactivo e imprimible de once conceptos sobre triángulos rectángulos, Pitágoras y razones trigonométricas, con cronómetro y corrección inmediata.",
    category: "Trigonometría",
    tags: ["Pitágoras", "Vocabulario", "Crucigrama"],
    liveUrl: "https://1382308.github.io/crucigrama-trigonometria/",
    repoUrl: "https://github.com/1382308/crucigrama-trigonometria",
    liveAvailable: true,
    featured: false,
  }),
]);

const hasText = (value) => typeof value === "string" && value.trim().length > 0;

const isSafeUrl = (value) => {
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      (url.hostname === "1382308.github.io" || url.hostname === "github.com")
    );
  } catch {
    return false;
  }
};

export function validateProjects(projects) {
  if (!Array.isArray(projects)) {
    throw new TypeError("Projects must be an array.");
  }

  const ids = new Set();
  let featuredCount = 0;

  for (const entry of projects) {
    if (!entry || typeof entry !== "object") {
      throw new TypeError("Every project must be an object.");
    }

    const { id, title, description, category, tags, liveUrl, repoUrl, liveAvailable, featured } =
      entry;
    if (![id, title, description, category, liveUrl, repoUrl].every(hasText)) {
      throw new Error("Every project must have complete text metadata.");
    }
    if (ids.has(id)) {
      throw new Error(`Duplicate project ID: ${id}`);
    }
    if (!CATEGORIES.includes(category) || category === "Todos") {
      throw new Error(`Unknown project category: ${category}`);
    }
    if (!Array.isArray(tags) || tags.length < 2 || !tags.every(hasText)) {
      throw new Error("Every project must have at least two text tags.");
    }
    if (!isSafeUrl(liveUrl) || !isSafeUrl(repoUrl)) {
      throw new Error("Project URLs must be safe HTTPS GitHub URLs.");
    }

    const expectedRepoUrl = `https://github.com/1382308/${id}`;
    const expectedLiveUrl = `https://1382308.github.io/${id}/`;
    if (repoUrl !== expectedRepoUrl || typeof liveAvailable !== "boolean") {
      throw new Error("Project availability metadata is inconsistent.");
    }
    if (
      (liveAvailable && liveUrl !== expectedLiveUrl) ||
      (!liveAvailable && liveUrl !== repoUrl)
    ) {
      throw new Error("Project live URL is inconsistent with its availability.");
    }
    if (typeof featured !== "boolean") {
      throw new Error("Project featured metadata must be boolean.");
    }

    ids.add(id);
    featuredCount += Number(featured);
  }

  if (featuredCount !== 1) {
    throw new Error("Exactly one project must be featured.");
  }
  return true;
}

export function filterProjects(projects, category) {
  if (category === "Todos") {
    return [...projects];
  }
  if (!CATEGORIES.includes(category)) {
    return [];
  }
  return projects.filter((project) => project.category === category);
}

const setExternalLinkAttributes = (link, href) => {
  link.href = href;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
};

export function renderProjectCard(project) {
  const article = document.createElement("article");
  article.className = "project-card";
  article.dataset.category = project.category;

  const category = document.createElement("p");
  category.className = "project-card__category";
  category.textContent = project.category;

  const title = document.createElement("h3");
  title.className = "project-card__title";
  title.textContent = project.title;

  const description = document.createElement("p");
  description.className = "project-card__description";
  description.textContent = project.description;

  const tags = document.createElement("ul");
  tags.className = "project-card__tags";
  tags.setAttribute("aria-label", "Etiquetas");
  for (const tag of project.tags) {
    const item = document.createElement("li");
    item.textContent = tag;
    tags.append(item);
  }

  const actions = document.createElement("div");
  actions.className = "project-card__actions";

  if (project.liveAvailable) {
    const liveLink = document.createElement("a");
    liveLink.className = "project-card__primary-action button-primary";
    liveLink.textContent = "Abrir proyecto";
    setExternalLinkAttributes(liveLink, project.liveUrl);
    actions.append(liveLink);

    const repoLink = document.createElement("a");
    repoLink.className = "project-card__repo-link button-secondary";
    repoLink.textContent = "Ver repositorio";
    setExternalLinkAttributes(repoLink, project.repoUrl);
    actions.append(repoLink);
  } else {
    const availability = document.createElement("p");
    availability.className = "project-card__availability";
    availability.textContent = "Publicación no disponible";

    const repoLink = document.createElement("a");
    repoLink.className = "project-card__primary-action button-primary";
    repoLink.textContent = "Ver repositorio";
    setExternalLinkAttributes(repoLink, project.repoUrl);

    actions.append(availability, repoLink);
  }

  article.append(category, title, description, tags, actions);
  return article;
}

export function renderCatalog(category = "Todos") {
  const visibleProjects = filterProjects(PROJECTS, category);
  const grid = document.querySelector("#project-grid");
  grid.replaceChildren(...visibleProjects.map(renderProjectCard));

  document.querySelector("#result-status").textContent =
    `${visibleProjects.length} ${visibleProjects.length === 1 ? "proyecto" : "proyectos"}`;

  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.filter === category),
    );
  });
}

validateProjects(PROJECTS);

if (typeof document !== "undefined") {
  const filterList = document.querySelector("#filter-list");

  for (const category of CATEGORIES) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "filter-button";
    button.dataset.filter = category;
    button.textContent = category;
    button.addEventListener("click", () => renderCatalog(category));
    filterList.append(button);
  }

  document.querySelectorAll("[data-project-count]").forEach((count) => {
    count.textContent = String(PROJECTS.length);
  });

  renderCatalog("Todos");
}
