# Diseño del catálogo de proyectos

Fecha: 15 de septiembre de 2026  
Repositorio: `1382308/1382308.github.io`

## Propósito

Reemplazar la página de práctica existente por un catálogo neutral de los proyectos públicos de la cuenta `1382308`. El sitio debe permitir identificar rápidamente qué hace cada proyecto, abrir su versión publicada y consultar su código fuente.

El catálogo no incluirá biografía, fotografía, currículum ni lenguaje de portafolio personal. Los proyectos serán el contenido principal.

## Alcance

Se incluirán los once repositorios públicos de proyectos detectados al momento de diseñar el sitio:

1. `asistencia`
2. `secret-code`
3. `signs`
4. `cylindervolume`
5. `Iso2Ortho`
6. `pirates-web`
7. `Mystery-Trig`
8. `trigonometric-ratios`
9. `carrera-trigonometrica`
10. `Isometric-Orthographic-Views`
11. `crucigrama-trigonometria`

El repositorio `1382308.github.io` no se mostrará como proyecto. Los repositorios privados, archivados y bifurcaciones quedan fuera del alcance.

## Dirección visual

La interfaz seguirá una dirección editorial educativa:

- Fondo crema y superficies claras.
- Azul marino como color estructural.
- Naranja y amarillo como acentos.
- Tipografía sans serif fuerte, legible y sin dependencias externas.
- Bordes definidos, bloques de color y composición asimétrica controlada.
- Apariencia neutral: educativa y expresiva, sin marca personal.

La página evitará efectos glossy, fondos genéricos de gradiente y exceso de decoración. La jerarquía dependerá de tamaño, color, espacio y contraste.

## Estructura de la página

### Encabezado

El encabezado mostrará el título **Proyectos interactivos**, una introducción breve y el número de proyectos incluidos. Un enlace discreto llevará al perfil de GitHub.

### Proyecto destacado

`Asistencia` ocupará el bloque destacado por ser el proyecto más reciente y una herramienta funcional de uso docente. El bloque resumirá su registro mediante códigos QR, manejo de grupos y exportación de información.

### Filtros

Se mostrarán cinco controles:

- Todos
- Matemáticas
- Trigonometría
- Geometría
- Herramientas

Los filtros actuarán en el navegador, actualizarán la cuadrícula sin recargar la página y comunicarán el resultado a tecnologías de asistencia. El filtro inicial será **Todos**.

### Tarjetas de proyecto

Cada tarjeta contendrá:

- Título comprensible en español.
- Descripción breve basada en el contenido real del repositorio.
- Categoría principal y etiquetas temáticas.
- Acción principal **Abrir proyecto**.
- Acción secundaria **Ver código**.

Las tarjetas tendrán alturas visualmente consistentes. La tarjeta completa no será un enlace para evitar conflictos entre las dos acciones disponibles.

### Pie de página

El pie indicará que los proyectos están publicados con GitHub Pages e incluirá un enlace al perfil público. No añadirá información personal adicional.

## Arquitectura técnica

El sitio será estático y estará compuesto por:

- `index.html`: estructura semántica, metadatos y regiones principales.
- `styles.css`: sistema visual, diseño responsive, estados interactivos y preferencias de movimiento.
- `script.js`: catálogo local de proyectos, renderizado de tarjetas y filtrado.

No se utilizarán frameworks, gestores de paquetes, pasos de compilación, bibliotecas de iconos ni fuentes remotas. Los iconos necesarios serán SVG pequeños incluidos en el marcado.

## Datos y flujo

La información de los proyectos se almacenará como una colección local en `script.js`. Cada elemento tendrá identificador, título, descripción, categoría, etiquetas, URL publicada, URL del repositorio y estado destacado.

Al cargar la página:

1. JavaScript validará y recorrerá la colección local.
2. Se generarán las tarjetas mediante elementos del DOM y contenido de texto seguro.
3. Se mostrará el conjunto completo.
4. Al activar un filtro, se ocultarán los proyectos que no correspondan y se actualizará el contador visible.

No se consultará la API de GitHub durante la navegación. Esto evita límites de solicitudes, cambios inesperados, latencia y fallos de red. La actualización de proyectos será deliberada y se hará modificando la colección local.

## Accesibilidad y adaptación

- Marcado semántico con encabezado, navegación, contenido principal, secciones y pie.
- Orden lógico de encabezados.
- Navegación completa mediante teclado.
- Indicadores de foco visibles.
- Contraste compatible con WCAG AA en texto y controles.
- Estado activo de filtros expresado visualmente y con `aria-pressed`.
- Región de estado para anunciar cuántos proyectos se muestran.
- Diseño adaptable desde 320 px hasta pantallas amplias.
- Animaciones de entrada y elevación breves, desactivadas con `prefers-reduced-motion`.

## Manejo de errores

Como los datos son locales, el sitio no tendrá estados de carga remota. Si JavaScript no se ejecuta, `index.html` mostrará un aviso dentro de `noscript` y conservará los enlaces generales a GitHub.

Los enlaces externos abrirán en una pestaña nueva e incluirán `rel="noopener noreferrer"`. Durante la implementación se verificarán todas las URLs publicadas. Si un repositorio no tiene una página disponible, su acción principal se dirigirá al repositorio y la tarjeta lo indicará sin ocultar el proyecto.

## Verificación

La entrega se considerará correcta cuando:

- Aparezcan exactamente once proyectos y ninguno sea el repositorio del index.
- Cada título y descripción coincidan con el funcionamiento observado en su código.
- Cada botón publicado y cada enlace de código respondan correctamente.
- Los cinco filtros muestren los conjuntos esperados y puedan operarse con teclado.
- No existan errores en la consola.
- La página no produzca desplazamiento horizontal a 320 px.
- La jerarquía y los estados de foco sean legibles en tema claro.
- El sitio funcione directamente en GitHub Pages sin proceso de compilación.

## Fuera de alcance

- Panel de administración.
- Sincronización automática con la API de GitHub.
- Estadísticas de visitas, estrellas o forks.
- Autenticación.
- Inclusión de repositorios privados.
- Modificación de los proyectos catalogados.
