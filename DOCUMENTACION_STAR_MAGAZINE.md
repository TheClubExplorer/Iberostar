# STAR MAGAZINE — Manual de Usuario y Documentación Técnica

**Nombre del proyecto:** Star Magazine  
**Nombre interno del producto:** The Club Explorer / Iberostar Destinos  
**Versión:** 1.2 (manual ampliado y reestructurado)  
**Idioma principal:** Español (es) con soporte multilenguaje (en, entre otros)  
**Enfoque operativo de este manual:** Riviera Maya (México) — Complejo Iberostar Playa Paraíso  
**Fecha de actualización del manual:** 2026-11-17

> **Nota de confidencialidad (uso interno):** Este documento incluye las APIs, endpoints, tokens y claves presentes en el código fuente del proyecto, según requerimiento para el manual interno. Parte de esta información es sensible y no debe compartirse públicamente.

---

## Índice de Contenidos

1. [Presentación](#1-presentación)
2. [Resumen del Proyecto](#2-resumen-del-proyecto)
3. [Marco Teórico](#3-marco-teórico)
4. [Marco Contextual](#4-marco-contextual)
5. [Planificación y Avance del Proyecto](#5-planificación-y-avance-del-proyecto)
6. [Desarrollo del Proyecto (fase por fase)](#6-desarrollo-del-proyecto-fase-por-fase)
7. [Arquitectura e Implementación](#7-arquitectura-e-implementación)
8. [APIs, Servicios Externos, Claves y Endpoints](#8-apis-servicios-externos-claves-y-endpoints)
9. [Herramientas Utilizadas](#9-herramientas-utilizadas)
10. [Estructura de Carpetas — Enfoque Riviera Maya](#10-estructura-de-carpetas--enfoque-riviera-maya)
11. [Guía de Edición por Componente](#11-guía-de-edición-por-componente)
12. [Identidad Visual y Diseño Gráfico](#12-identidad-visual-y-diseño-gráfico)
13. [Guía de Ejecución y Despliegue](#13-guía-de-ejecución-y-despliegue)
14. [Flujo de Publicación (Workspace)](#14-flujo-de-publicación-workspace)
15. [Consideraciones sobre Otros Países](#15-consideraciones-sobre-otros-países)
16. [Anexos, Auditorías y Seguridad](#16-anexos-auditorías-y-seguridad)

---

## 1. Presentación

**Star Magazine** es una revista digital interactiva desarrollada para **Iberostar The Club**, orientada a presentar destinos, hoteles, restaurantes, servicios y experiencias del complejo **Iberostar Playa Paraíso** en la Riviera Maya, México.

El producto combinó la narrativa y estética de una publicación editorial con capacidades interactivas de la web: navegación por secciones, fichas de hoteles, directorio gastronómico, mapas interactivos del complejo, vistas inmersivas 360° y solicitud de servicios (como el carrito de golf). Incluyó además un área administrativa (**Workspace**) para gestionar experiencias y videos sin modificar el código fuente. Su desarrollo se realizó como una versión preliminar, condicionada principalmente por los plazos disponibles.

---

## 2. Resumen del Proyecto

- **Tipo de aplicación:** Aplicación web tipo SPA (Single Page Application) construida con tecnologías web estándar.
- **Enfoque:** Riviera Maya — Complejo Iberostar Playa Paraíso.
- **Objetivo:** Centralizar información del complejo y mejorar la experiencia del huésped mediante orientación espacial, contenido inmersivo, información climática contextual y gestión editorial digital.
- **Público:** Huéspedes y usuarios finales (consulta) y equipo/editor/administrador (gestión de contenido).
- **Naturaleza del entregable:** Implementación inicial acotada por las restricciones de tiempo del proyecto.

---

## 3. Marco Teórico

Esta sección presenta los **conceptos teóricos**, una **breve reseña histórica** y la **justificación de elección** de cada tecnología, estándar o disciplina utilizada en Star Magazine. La descripción de cómo se implementaron concretamente se documenta en [Desarrollo del Proyecto](#6-desarrollo-del-proyecto-fase-por-fase) y [Arquitectura e Implementación](#7-arquitectura-e-implementación).

### 3.1. Publicación digital interactiva y diseño editorial

**Concepto:** La publicación digital interactiva adapta principios del diseño editorial impreso (retícula, jerarquía tipográfica, ritmo visual, composición y narrativa) a medios digitales, incorporando hipertexto, multimedia e interacción. Busca mantener legibilidad y valor estético al tiempo que aprovecha la navegación no lineal y la actualización dinámica.

**Breve historia:** Las revistas y periódicos digitales evolucionaron desde réplicas estáticas en PDF y sitios web informativos (década de 1990) hacia experiencias enriquecidas con la llegada de Flash, y posteriormente con HTML5, CSS3 y JavaScript moderno. La masificación de tabletas y móviles impulsó formatos responsivos y contenidos interactivos orientados a la lectura en pantalla.

**Por qué se eligió:** Star Magazine requirió una experiencia con estética premium tipo revista para representar la marca Iberostar The Club, pero con ventajas digitales (actualización de contenido, mapas, 360° y acceso desde dispositivos móviles del huésped). Este enfoque permitió unir identidad editorial y funcionalidad interactiva en un solo producto.

### 3.2. World Wide Web y tecnologías base: HTML5

**Concepto:** HTML (HyperText Markup Language) es el lenguaje de marcado estándar para estructurar contenido en la web mediante elementos y atributos (documentos, secciones, formularios, medios, etc.). HTML5 es la evolución que incorporó semántica mejorada y APIs para aplicaciones web modernas.

**Breve historia:** Tim Berners-Lee propuso la Web a finales de los años 80; HTML surgió a inicios de los 90. HTML5 se consolidó como recomendación del W3C en 2014, unificando capacidades antes dependientes de plugins y fortaleciendo la semántica, multimedia y APIs del navegador.

**Por qué se eligió:** HTML5 permitió estructurar de forma semántica las vistas de la revista (portales, fichas, secciones, controles) y soportar integración con scripts, estilos y contenido multimedia sin dependencias de tecnologías propietarias obsoletas.

### 3.3. Hojas de estilo en cascada: CSS3

**Concepto:** CSS (Cascading Style Sheets) define la presentación visual de documentos HTML (colores, tipografía, layout, animaciones y adaptación a distintos tamaños de pantalla). El modelo de cascada, especificidad y herencia determina cómo se aplican las reglas.

**Breve historia:** CSS fue propuesto por Håkon Wium Lie en 1994 y estandarizado por el W3C desde mediados de los 90. La etapa conocida como “CSS3” introdujo de forma modular capacidades como Flexbox, Grid, transiciones, animaciones, transformaciones y media queries, habilitando diseños responsivos modernos.

**Por qué se eligió:** CSS permitió reproducir la identidad visual editorial (paleta, tipografía, composición) y adaptar la experiencia a escritorio y móvil. Las capacidades de layout, animación y media queries fueron esenciales para paneles, mapas, overlays y comportamiento táctil.

### 3.4. JavaScript y ECMAScript (ES6+)

**Concepto:** JavaScript es un lenguaje de programación que permite manipular el DOM, gestionar eventos, comunicarse con servicios remotos y construir lógica de aplicación en el navegador. ECMAScript es el estándar que define su evolución (ES6/2015 introdujo `let/const`, funciones flecha, clases, promesas, etc.).

**Breve historia:** JavaScript fue creado por Brendan Eich en 1995 para Netscape. Tras periodos de fragmentación, la estandarización de ES6 en 2015 marcó un salto importante en expresividad y mantenibilidad, consolidando a JavaScript como lenguaje central del desarrollo web.

**Por qué se eligió:** Permitió implementar toda la lógica interactiva del cliente (enrutado, mapas, guías, 360°, formularios, consumo de APIs) sin introducir un framework pesado, manteniendo control directo sobre el comportamiento y el rendimiento en un sitio mayormente estático.

### 3.5. Arquitectura de Aplicación de Página Única (SPA) y enrutamiento del lado cliente

**Concepto:** Una SPA carga una base de documento y actualiza dinámicamente vistas y datos sin recargar completamente la página en cada navegación. El enrutamiento del lado cliente interpreta la URL y renderiza el estado/vista correspondiente.

**Breve historia:** Las aplicaciones web dinámicas tempranas dependían de recargas completas; técnicas como AJAX (popularizadas a mediados de los 2000) habilitaron actualizaciones parciales. Con la History API de HTML5 y librerías/frameworks posteriores se consolidó el patrón SPA.

**Por qué se eligió:** La metáfora de revista y la navegación entre secciones, hoteles, mapas y vistas 360° requirieron transiciones fluidas y conservación de estado. El enrutamiento cliente permitió una experiencia continua y compatible con despliegue estático.

### 3.6. History API y gestión de URL en el navegador

**Concepto:** La History API (`history.pushState`, `replaceState`, eventos `popstate`) permite modificar la URL y el historial de navegación sin recarga completa, manteniendo sincronía entre estado de la aplicación y barra de direcciones.

**Breve historia:** Introducida como parte de HTML5, permitió a las aplicaciones web ofrecer URLs navegables y comportamiento de atrás/adelante coherente en experiencias dinámicas.

**Por qué se eligió:** Fue necesaria para que las rutas internas de Star Magazine (portales, hoteles, complejo, 360°, carrito, etc.) fueran compartibles y coherentes con la navegación del usuario.

### 3.7. Control de versiones: Git

**Concepto:** Git es un sistema de control de versiones distribuido que registra cambios en archivos, permite ramificación/fusión y facilita la trazabilidad del trabajo colaborativo.

**Breve historia:** Git fue creado por Linus Torvalds en 2005 para el desarrollo del kernel de Linux, priorizando velocidad, integridad y modelo distribuido.

**Por qué se eligió:** El proyecto evolucionó de forma iterativa con múltiples correcciones, refactors y ajustes de contenido/datos. Git permitió gestionar ese historial, revertir estados cuando fue necesario y documentar la evolución real del desarrollo.

### 3.8. GitHub y despliegue estático (GitHub Pages)

**Concepto:** GitHub es una plataforma de alojamiento y colaboración para repositorios Git. GitHub Pages permite publicar sitios web estáticos directamente desde un repositorio.

**Breve historia:** GitHub se lanzó en 2008 y se convirtió en una de las plataformas más usadas para colaboración en software. GitHub Pages popularizó la publicación sencilla de sitios estáticos y documentación.

**Por qué se eligió:** El proyecto se benefició de un flujo simple de versionado y publicación estática, adecuado para una aplicación frontend con assets y scripts sin necesidad de un servidor de aplicación dedicado para la interfaz.

### 3.9. Backend como Servicio (BaaS) y Supabase

**Concepto:** BaaS (Backend as a Service) ofrece servicios de backend gestionados (base de datos, autenticación, almacenamiento, APIs) para reducir la necesidad de construir y operar infraestructura propia.

**Breve historia:** El enfoque BaaS ganó popularidad en la década de 2010 con plataformas como Firebase; posteriormente surgieron alternativas abiertas como Supabase, que se apoya en PostgreSQL y estándares web.

**Por qué se eligió:** Star Magazine necesitó persistencia y administración de contenido (Workspace y videos) con autenticación y almacenamiento de archivos, manteniendo una arquitectura de cliente mayormente estática.

### 3.10. Bases de datos relacionales y PostgreSQL

**Concepto:** Una base de datos relacional organiza datos en tablas con filas, columnas y relaciones, y emplea SQL para consultas y manipulación. PostgreSQL es un sistema gestor relacional de código abierto conocido por su robustez y extensibilidad.

**Breve historia:** El modelo relacional fue propuesto por Edgar F. Codd en 1970. PostgreSQL deriva del proyecto POSTGRES (Universidad de Berkeley, años 80) y evolucionó como un RDBMS avanzado y ampliamente adoptado.

**Por qué se eligió:** La gestión de experiencias del Workspace y metadatos de videos requirió almacenamiento estructurado, restricciones y consultas confiables; PostgreSQL (a través de Supabase) cubrió estas necesidades.

### 3.11. Autenticación y gestión de identidad (Supabase Auth)

**Concepto:** La autenticación verifica la identidad de un usuario para habilitar acceso a funciones restringidas. En aplicaciones web se combina con autorización para controlar qué operaciones puede realizar.

**Breve historia:** Los mecanismos de autenticación web evolucionaron desde sesiones básicas en servidor hasta esquemas basados en tokens y proveedores gestionados; los BaaS integraron estos flujos para simplificar su adopción.

**Por qué se eligió:** Se requirió restringir las funciones administrativas de publicación/edición (Workspace y videos) a usuarios autorizados, sin implementar un sistema de autenticación propio desde cero.

### 3.12. Almacenamiento de objetos (Supabase Storage)

**Concepto:** El almacenamiento de objetos gestiona archivos (imágenes, videos, documentos) como objetos en buckets/contenedores, con metadatos y políticas de acceso, accesibles mediante URLs/APIs.

**Breve historia:** La popularización de la nube impulsó este modelo por su escalabilidad y acceso vía HTTP/APIs frente a sistemas de archivos tradicionales.

**Por qué se eligió:** El contenido editorial del proyecto incluyó imágenes y videos; se necesitó un repositorio centralizado y accesible desde la aplicación para publicación y consumo.

### 3.13. Seguridad de datos y Row Level Security (RLS)

**Concepto:** RLS (Row Level Security) es un mecanismo de bases de datos que restringe el acceso a filas según políticas y contexto del usuario/sesión. Complementa la seguridad de la interfaz al aplicar control de acceso en la capa de datos.

**Breve historia:** RLS se incorporó en motores relacionales modernos; PostgreSQL lo soporta de forma nativa desde versiones posteriores a 9.5 para implementar autorización granular cercana a los datos.

**Por qué se eligió:** Al exponer operaciones desde cliente web, fue necesario asegurar que la lectura/escritura en tablas y storage respetara permisos (lectura pública y escrituras administrativas controladas).

### 3.14. APIs web, REST, JSON y Fetch

**Concepto:** Una API web expone funcionalidades o datos a través de HTTP. REST es un estilo arquitectónico basado en recursos y operaciones HTTP; JSON es un formato ligero de intercambio de datos. La Fetch API permite realizar solicitudes HTTP desde el navegador.

**Breve historia:** Las APIs web se expandieron con la Web 2.0; REST se popularizó en los 2000 como alternativa a esquemas más pesados. JSON reemplazó en muchos casos a XML por simplicidad, y Fetch modernizó el acceso a red frente a `XMLHttpRequest`.

**Por qué se eligió:** El proyecto integró múltiples servicios externos (clima, ruteo, mapas, backend) y consumió/intercambió datos en tiempo de ejecución desde el cliente.

### 3.15. Sistemas de Información Geográfica (SIG) web y cartografía digital

**Concepto:** Los SIG permiten capturar, almacenar, analizar y visualizar información geoespacial. En la web, la cartografía digital representa territorios, rutas y puntos de interés mediante mapas interactivos, capas y coordenadas geográficas.

**Breve historia:** Los SIG surgieron en la segunda mitad del siglo XX (hitos como los trabajos de Roger Tomlinson en los 60). En la web, Google Maps (2005) impulsó la masificación de mapas interactivos; posteriormente proliferaron herramientas abiertas y servicios de teselas/ruteo.

**Por qué se eligió:** El complejo Playa Paraíso cuenta con múltiples ubicaciones y recorridos; se necesitó orientar al huésped con visualización espacial, búsqueda de POIs y trazado de rutas.

### 3.16. Coordenadas geográficas y proyecciones

**Concepto:** La ubicación sobre la Tierra se representa comúnmente con latitud y longitud (coordenadas geográficas). Para visualizar mapas planos se utilizan proyecciones cartográficas que transforman la superficie terrestre a un plano con distorsiones controladas.

**Breve historia:** La cartografía matemática y las proyecciones se desarrollaron durante siglos (Mercator, siglo XVI). Los sistemas web modernos estandarizaron el uso de coordenadas WGS84 y proyecciones compatibles con teselas.

**Por qué se eligió:** Los hoteles, restaurantes y puntos de interés del complejo se modelaron con coordenadas para posicionarlos en mapas y calcular rutas.

### 3.17. Leaflet

**Concepto:** Leaflet es una biblioteca JavaScript de código abierto para mapas interactivos, enfocada en simplicidad, rendimiento y extensibilidad mediante plugins y capas.

**Breve historia:** Leaflet fue creada por Volodymyr Agafonkin y lanzada en 2011, convirtiéndose en una de las opciones más populares para mapas web ligeros.

**Por qué se eligió:** Ofreció una solución flexible y liviana para renderizar mapas 2D, marcadores, popups y capas personalizadas del complejo, con buen soporte en dispositivos móviles.

### 3.18. OpenStreetMap (OSM) y teselas de mapa

**Concepto:** OpenStreetMap es un proyecto colaborativo de cartografía abierta que proporciona datos geográficos libres. Las teselas (tiles) son fragmentos cartográficos servidos por niveles de zoom para componer mapas web.

**Breve historia:** OSM fue fundado por Steve Coast en 2004 como alternativa abierta a datos cartográficos propietarios. El modelo de teselas se popularizó con los mapas web deslizables.

**Por qué se eligió:** Permitió disponer de una base cartográfica abierta para la capa principal de mapas Leaflet del proyecto.

### 3.19. Leaflet.markercluster

**Concepto:** El clustering agrupa visualmente marcadores cercanos en conjuntos según nivel de zoom para mejorar legibilidad y rendimiento en mapas con alta densidad de puntos.

**Breve historia:** La agrupación de puntos es una técnica clásica de visualización geoespacial; en Leaflet se popularizó mediante plugins comunitarios como MarkerCluster.

**Por qué se eligió:** El complejo incluye múltiples POIs; el clustering facilitó una visualización clara y usable en diferentes escalas de zoom.

### 3.20. Leaflet-rotate

**Concepto:** La rotación de mapa permite orientar la vista cartográfica según un ángulo distinto al norte convencional, modificando la experiencia de navegación y lectura espacial.

**Breve historia:** La rotación de mapas se popularizó en aplicaciones de navegación móvil; en Leaflet se habilitó mediante extensiones/plugins que adaptan renderizado e interacción.

**Por qué se eligió:** Se requirió una orientación de mapa alineada a la disposición visual del complejo y a la experiencia de navegación del producto.

### 3.21. Mapbox GL JS y mapas vectoriales

**Concepto:** Mapbox GL JS es una biblioteca para renderizar mapas interactivos en el navegador, con soporte para estilos personalizables y datos vectoriales. Los mapas vectoriales transmiten geometrías que se dibujan en cliente, a diferencia de teselas raster pre-renderizadas.

**Breve historia:** Mapbox impulsó el uso de teselas vectoriales y renderizado en cliente durante la década de 2010, permitiendo estilos dinámicos y experiencias cartográficas más flexibles.

**Por qué se eligió:** Se incorporó una vista/guía embebida con capacidades visuales e interacción complementarias a Leaflet, incluyendo integración con servicios de Mapbox.

### 3.22. Teoría de grafos y ruteo en redes

**Concepto:** El ruteo calcula caminos entre puntos en una red (grafo de nodos y aristas) optimizando criterios como distancia o tiempo. Algoritmos como Dijkstra y A* son fundamentos clásicos para la búsqueda de rutas.

**Breve historia:** La teoría de grafos se formalizó desde el siglo XVIII (Euler) y los algoritmos de camino mínimo se desarrollaron ampliamente en el siglo XX. Su aplicación masiva llegó con los sistemas de navegación digital y mapas web.

**Por qué se eligió:** La función “Cómo llegar” y la orientación dentro/fuera del complejo exigieron calcular recorridos peatonales o vehiculares a partir de la posición del usuario y el destino seleccionado.

### 3.23. Valhalla (motor de ruteo)

**Concepto:** Valhalla es un motor de ruteo de código abierto que utiliza datos de OpenStreetMap y soporta distintos perfiles (peatonal, bicicleta, automóvil, etc.), con opciones de costo configurables.

**Breve historia:** Valhalla surgió como proyecto de ruteo abierto orientado a flexibilidad de perfiles y uso de datos OSM, con despliegues públicos y autogestionados.

**Por qué se eligió:** Proporcionó un perfil peatonal adecuado para recorridos dentro del complejo, con parámetros ajustables para caminos y desplazamiento a pie.

### 3.24. OSRM (Open Source Routing Machine)

**Concepto:** OSRM es un motor de ruteo de alto rendimiento basado en datos de OpenStreetMap, orientado a respuestas rápidas para cálculo de rutas sobre redes viales.

**Breve historia:** OSRM se desarrolló como proyecto de código abierto enfocado en rendimiento para ruteo sobre OSM y se popularizó por su velocidad en consultas.

**Por qué se eligió:** Se utilizó para ruteo vehicular y como respaldo en escenarios donde se requirió una alternativa de cálculo de ruta.

### 3.25. Mapbox Directions API

**Concepto:** Es un servicio HTTP de ruteo que calcula rutas y geometrías entre coordenadas según perfiles (caminar, conducir, etc.), devolviendo distancia, duración y forma de la ruta.

**Breve historia:** Mapbox amplió su plataforma cartográfica con APIs de navegación y direcciones para complementar sus SDKs de mapas.

**Por qué se eligió:** En la experiencia Mapbox embebida se integró este servicio para resolver rutas dentro de ese flujo y aprovechar el mismo ecosistema del mapa.

### 3.26. Geolocalización web (Geolocation API)

**Concepto:** La Geolocation API del navegador permite a una aplicación web obtener la ubicación aproximada del dispositivo (con permiso del usuario), en modo puntual o seguimiento continuo.

**Breve historia:** La geolocalización en navegador se estandarizó con APIs web a medida que los dispositivos móviles incorporaron GPS y sensores de ubicación, habilitando experiencias basadas en contexto.

**Por qué se eligió:** Para orientar al huésped dentro del complejo fue necesario ubicar su posición y usarla como origen en cálculos de ruta y visualización en mapa.

### 3.27. Visualización panorámica 360° y proyección equirectangular

**Concepto:** Una imagen panorámica 360° (frecuentemente equirectangular) captura un campo visual esférico completo. En software, se proyecta sobre una esfera o cubo virtual para simular que el usuario “mira alrededor” desde un punto.

**Breve historia:** La fotografía panorámica tiene antecedentes desde el siglo XIX; la digitalización y la realidad virtual/web impulsaron visores interactivos en navegadores. Con WebGL y bibliotecas especializadas, los recorridos 360° se volvieron accesibles sin plugins.

**Por qué se eligió:** Los recorridos inmersivos aportaron una forma intuitiva de explorar zonas y restaurantes del complejo antes o durante el desplazamiento físico.

### 3.28. Pannellum

**Concepto:** Pannellum es un visor ligero de panoramas equirectangulares para la web que permite navegación interactiva dentro de escenas 360°.

**Breve historia:** Surgió como alternativa abierta y liviana a visores panorámicos propietarios, facilitando la integración de contenido 360° en sitios web.

**Por qué se eligió:** Ofreció una solución sencilla de integrar y controlar en la aplicación para mostrar panoramas del complejo y enlazarlos con la guía y el mapa.

### 3.29. WebGL (base de experiencias inmersivas y mapas avanzados)

**Concepto:** WebGL es una API de JavaScript para renderizado gráfico 2D/3D acelerado por GPU dentro del navegador. Permite experiencias visuales avanzadas, incluyendo visores panorámicos y mapas.

**Breve historia:** WebGL fue estandarizado por el Khronos Group a comienzos de la década de 2010, llevando gráficos acelerados a la web sin plugins.

**Por qué se eligió:** Aunque no se programó WebGL de bajo nivel directamente, fue la base tecnológica que posibilitó el uso de librerías de visualización avanzadas y experiencias inmersivas en navegador.

### 3.30. OpenWeatherMap y APIs meteorológicas

**Concepto:** Las APIs meteorológicas exponen datos climáticos (actuales o pronósticos) obtenidos de modelos y estaciones, consultables mediante peticiones HTTP.

**Breve historia:** La digitalización de datos meteorológicos y la apertura de APIs permitieron integrar información del clima en aplicaciones de terceros para contexto y planificación.

**Por qué se eligió:** Se incorporó información climática como valor contextual para la experiencia del huésped, consultando un servicio externo especializado.

### 3.31. IndexedDB

**Concepto:** IndexedDB es una API de almacenamiento NoSQL del navegador para guardar datos estructurados en el cliente, con operaciones asíncronas y capacidad para volúmenes mayores que LocalStorage.

**Breve historia:** Surgió como evolución frente a mecanismos más limitados (Web SQL, abandonado, o LocalStorage) para cubrir necesidades de persistencia local más robustas en aplicaciones web.

**Por qué se eligió:** El módulo de medios 360° requirió almacenar y recuperar imágenes localmente en el navegador sin depender de un backend remoto para ese flujo específico.

### 3.32. Google Maps JavaScript API

**Concepto:** Es un SDK de Google para integrar mapas y servicios geoespaciales en aplicaciones web mediante clave de API.

**Breve historia:** Google Maps transformó la cartografía web desde 2005 y su API se convirtió en una plataforma comercial ampliamente utilizada para integración de mapas.

**Por qué se eligió:** Se contempló como opción/integración alternativa para escenarios específicos de mapas, dejando preparada la carga condicional de la librería en el código (sin clave activa en la configuración actual).

### 3.33. Optimización de rendimiento web e imágenes responsivas

**Concepto:** La optimización web busca reducir tiempos de carga y mejorar la experiencia mediante compresión, carga diferida, caché y entrega adaptada al dispositivo. Las imágenes responsivas y formatos como WebP permiten reducir peso manteniendo calidad.

**Breve historia:** Con el auge móvil, el rendimiento se volvió crítico. WebP fue introducido por Google (2010) y las técnicas de imágenes responsivas se estandarizaron en HTML5 para adaptar recursos al contexto.

**Por qué se eligió:** Star Magazine es intensivo en imágenes y componentes visuales; la optimización y entrega responsiva fueron necesarias para mejorar carga y usabilidad, especialmente en móviles.

### 3.34. Tipografía web y servicios de fuentes (Adobe Fonts/Typekit y Google Fonts)

**Concepto:** La tipografía web permite cargar y renderizar fuentes personalizadas en navegadores mediante `@font-face` o servicios de distribución, garantizando consistencia visual.

**Breve historia:** Con `@font-face` y plataformas como Typekit (adquirida por Adobe) y Google Fonts (2010) se generalizó el uso de tipografías de marca en línea.

**Por qué se eligió:** La identidad editorial de Star Magazine requirió tipografías serif y de interfaz consistentes con la imagen premium del proyecto.

### 3.35. Redes de distribución de contenido (CDN)

**Concepto:** Una CDN distribuye recursos desde servidores optimizados para mejorar disponibilidad y tiempos de entrega.

**Breve historia:** Las CDNs se popularizaron desde finales de los 90/2000 para escalar distribución web y hoy son comunes para librerías y assets estáticos.

**Por qué se eligió:** Se utilizaron CDNs para cargar librerías y recursos tipográficos externos de forma práctica (p. ej. SDK de Supabase y fuentes).

### 3.36. Internacionalización (i18n) y localización (l10n)

**Concepto:** La internacionalización es el diseño de software para soportar múltiples idiomas y regiones; la localización adapta contenidos y formatos a un idioma/cultura específicos.

**Breve historia:** Con la expansión global de la web, i18n/l10n se consolidaron como prácticas esenciales en productos digitales multirregión desde los años 2000.

**Por qué se eligió:** El público del complejo es internacional y el proyecto requirió operar en más de un idioma, con selección de idioma y traducción de interfaz/contenidos.

### 3.37. Diseño responsivo y experiencia de usuario móvil

**Concepto:** El diseño responsivo adapta la interfaz a diferentes tamaños de pantalla. La UX móvil considera interacción táctil, rendimiento, legibilidad y contexto de uso en movimiento.

**Breve historia:** Ethan Marcotte formalizó el “Responsive Web Design” en 2010. Desde entonces, el enfoque mobile-first y la optimización táctil se volvieron estándares ante el predominio de dispositivos móviles.

**Por qué se eligió:** Los huéspedes consultan la guía principalmente desde teléfonos/tablets; la usabilidad táctil en mapas, paneles y flujos de ruta fue crítica para el producto.

### 3.38. SVG (Scalable Vector Graphics)

**Concepto:** SVG es un formato de imagen vectorial basado en XML que escala sin pérdida de calidad y puede manipularse con CSS/JS.

**Breve historia:** SVG fue estandarizado por el W3C a finales de los 90 e inicios de los 2000 y se consolidó en la web moderna por su escalabilidad para iconografía y logotipos.

**Por qué se eligió:** Se empleó para logotipos e iconografía que requieren nitidez en distintas resoluciones y tamaños.

---

## 4. Marco Contextual

### 4.1. Contexto organizacional
Star Magazine respondió a la necesidad de **Iberostar The Club** de contar con un canal digital premium para informar y orientar al huésped, alineado con la identidad de marca y con procesos de digitalización de contenidos.

### 4.2. Contexto operativo
El complejo **Iberostar Playa Paraíso** integra múltiples hoteles, restaurantes, bares y servicios distribuidos en un área amplia, lo que exigió orientación espacial precisa y acceso móvil en contexto de uso real.

### 4.3. Alcance documentado
Este manual documentó principalmente el enfoque **Riviera Maya** y los componentes implementados en el repositorio para ese contexto. El trabajo realizado correspondió, en términos parciales, a un prototipo, dado que el alcance estuvo limitado sobre todo por el tiempo disponible.

### 4.4. Limitaciones
La principal restricción del proyecto fue el tiempo de ejecución, lo que acotó el nivel de madurez y cobertura de la solución. Por ello, el resultado se considera una prueba de concepto funcional sujeta a evolución y validación posterior.

---

## 5. Planificación y Avance del Proyecto

> Reconstrucción de la planificación y evolución a partir del historial de commits del repositorio.

### 5.1. Tabla de planificación y avance (cronología por fases)

| Fase | Periodo (según commits) | Objetivo planificado | Actividades realizadas (evidencia en commits) | Entregables / resultados | Estado |
|------|--------------------------|----------------------|-----------------------------------------------|--------------------------|--------|
| **F0. Inicio y levantamiento base** | 2026-09-28 a 2026-09-29 | Crear la base del producto y primera versión navegable | Primer commit, iteraciones iniciales, actualización de mapa y resolución de conflictos | Estructura inicial y primeras vistas funcionales | Completada |
| **F1. Integración de contenido y backend inicial** | 2026-10-01 a 2026-10-05 | Conectar contenido dinámico y enriquecer catálogo | Integración con Supabase, galerías e imágenes, migración de videos, mejoras responsive | Revista con backend inicial y contenido multimedia | Completada |
| **F2. Publicación y estabilización para GitHub Pages** | 2026-10-06 a 2026-10-14 | Hacer desplegable y estable la versión web | Corrección de rutas, optimización de imágenes, puntos estables, fichas de restaurantes | Sitio publicable con mejoras de carga | Completada |
| **F3. Refactor, performance y seguridad** | 2026-10-15 a 2026-10-19 | Mejorar mantenibilidad, peso y seguridad | Refactor del portal, extracción de CSS, compresión/conversión de imágenes, endurecimiento RLS | Base más mantenible, liviana y segura | Completada |
| **F4. Mapas, geolocalización y experiencia espacial** | 2026-10-20 a 2026-10-23 | Consolidar mapas y precisión de POIs | Marcador de usuario, POIs verificados, coordenadas THE CLUB, restauración de mapas/ruteo, auditorías | Mapa interactivo más preciso | Completada |
| **F5. 360°, guía interactiva y UX móvil** | 2026-10-21 a 2026-10-30 | Integrar 360° y mejorar guía/rutas en móvil | Menú de zonas 360°, rutas a restaurantes, máscara de complejo, fixes rotación/popups, guía móvil, fullscreen | Flujo integrado guía + mapa + 360° | Completada |
| **F6. Mapbox, portal y ruteo avanzado** | 2026-10-30 a 2026-11-04 | Añadir experiencia Mapbox y robustecer ruteo | Guía Mapbox, geolocalización en tiempo real, rutas Valhalla/OSRM/Mapbox Directions, mejoras de portal | Capa Mapbox operativa con ruteo | Completada |
| **F7. Internacionalización y consistencia de datos** | 2026-11-04 a 2026-11-07 | Mejorar traducciones y coherencia funcional | Traducciones UI/datos, fixes de navegación e i18n, integración 360°↔POI↔guía, ajustes de contenidos | Mayor cobertura bilingüe y coherencia | Completada |
| **F8. Refinamiento UX/UI y calidad de datos** | 2026-11-09 a 2026-11-12 | Pulir experiencia móvil y catálogo del complejo | Animaciones, estilos, coordenadas/botones 360°, menús y panel guía expandida | Interfaz más pulida y datos consistentes | Completada |
| **F9. Integración 360°-mapa y estabilización móvil** | 2026-11-13 | Resolver bloqueos táctiles y flujo 360°→mapa | Conexión 360°-mapa, limpieza de overlays/residuos, corrección de flujos y catálogos, traducciones | Navegación móvil más estable | Completada |
| **F10. Cierre de incidencias y mantenimiento** | 2026-11-13 a 2026-11-17 | Corregir regresiones y asegurar assets en despliegue | Fix de panel móvil `[hidden]`, ajuste al trazar ruta, agregado de logos a git | Despliegue consistente y mejor interacción táctil | Completada (iterativa) |

### 5.2. Resumen de avance
- **Inicio del desarrollo (git):** 2026-09-28.
- **Último hito registrado al cierre documental:** 2026-11-17 (`8f73ef8`).
- **Trayectoria:** de base de revista digital a plataforma interactiva con mapas, ruteo, 360°, backend editorial e i18n, consolidada como demostración funcional dentro de un calendario acotado.

---

## 6. Desarrollo del Proyecto (fase por fase)

### Fase 0 — Inicio y levantamiento base (2026-09-28 a 2026-09-29)
- Se creó la base inicial del repositorio y se realizaron las primeras iteraciones del producto.
- Se incorporaron y ajustaron componentes iniciales de navegación/mapa.
- Se resolvieron conflictos tempranos y se consolidó una estructura funcional de partida.

### Fase 1 — Integración de contenido y backend inicial (2026-10-01 a 2026-10-05)
- Se integró **Supabase** para soporte de contenido/datos y autenticación en módulos administrativos.
- Se agregaron galerías e imágenes de hoteles y se migraron videos al backend.
- Se aplicaron mejoras de diseño responsive.

### Fase 2 — Publicación y estabilización para GitHub Pages (2026-10-06 a 2026-10-14)
- Se corrigieron rutas y referencias para funcionamiento en **GitHub Pages**.
- Se optimizaron imágenes y se establecieron puntos de control estables.
- Se desarrollaron fichas visuales de restaurantes.

### Fase 3 — Refactor, performance y seguridad (2026-10-15 a 2026-10-19)
- Se refactorizó el portal y se retiraron elementos no vigentes.
- Se extrajo CSS inline a `style.css` y se depuraron archivos mediante `.gitignore`.
- Se redujo el peso de assets mediante compresión/conversión de imágenes.
- Se endureció la seguridad de Supabase con políticas/RLS.

### Fase 4 — Mapas, geolocalización y experiencia espacial (2026-10-20 a 2026-10-23)
- Se implementó y ajustó el marcador de ubicación del usuario y se verificaron coordenadas/POIs.
- Se incorporaron y corrigieron assets faltantes (imágenes responsivas, manifiestos, estilos).
- Se restauraron y mejoraron mapas y flujos de ruteo del complejo.
- Se generaron auditorías de coordenadas y rutas.

### Fase 5 — 360°, guía interactiva y UX móvil (2026-10-21 a 2026-10-30)
- Se desarrolló la experiencia 360° con menú de zonas e integración con restaurantes y guía.
- Se integraron flujos entre guía, mapa y 360° y se ocultaron controles administrativos al público en modo no editor.
- Se aplicaron correcciones de rotación, popups, anclajes y zoom en móvil.
- Se mejoró el ruteo peatonal y la interacción móvil (paneles, scroll, fullscreen y carrito).

### Fase 6 — Mapbox, portal y ruteo avanzado (2026-10-30 a 2026-11-04)
- Se implementó la guía/vista **Mapbox GL JS** embebida para el complejo.
- Se añadió geolocalización en tiempo real y se corrigieron capas/popups.
- Se integró ruteo por calles con recalculación automática (Valhalla/OSRM/Mapbox Directions).
- Se actualizaron configuración/token y se realizaron mejoras visuales.

### Fase 7 — Internacionalización, contenido y correcciones funcionales (2026-11-04 a 2026-11-07)
- Se ampliaron y corrigieron traducciones (UI y datos) en español e inglés.
- Se corrigieron comportamientos de navegación y accesos defensivos en i18n/rutas.
- Se sincronizaron datos entre 360°, POIs y guía (coordenadas y contenidos).

### Fase 8 — Refinamiento UX/UI y calidad de datos del complejo (2026-11-09 a 2026-11-12)
- Se refinaron animaciones, estilos, tamaños y contrastes.
- Se completaron y ajustaron coordenadas, botones 360° y menús/categorías de restaurantes.
- Se mejoró la presentación de paneles móviles y elementos de identidad visual.

### Fase 9 — Integración 360°-mapa y estabilización móvil reciente (2026-11-13)
- Se corrigió el flujo de apertura del mapa desde el visor 360° para evitar residuos/overlays bloqueantes.
- Se ajustaron renderizados y acciones móviles y se depuraron catálogos/nombres y traducciones.

### Fase 10 — Cierre de incidencias y mantenimiento de assets (2026-11-13 a 2026-11-17)
- Se corrigió el bloqueo táctil del mapa en móvil causado por `.guide-mobile-actions[hidden]` con `display:block !important` y alto `z-index`.
- Se ajustó `routeToPoi` para mantener la guía visible en tamaño reducido al trazar ruta (retirando solo el estado expandido).
- Se versionaron y publicaron los logos de marca en `src/LOGOS-IBEROSTAR/` para eliminar errores 404 en despliegue.

---

## 7. Arquitectura e Implementación

### 7.1. Estructura general y patrón modular
- La aplicación se organizó como frontend estático con `index.html`, `style.css`, `responsive.css` y múltiples scripts en `js/`.
- Los módulos se implementaron principalmente con el patrón IIFE y un namespace global `window.RevistaDigital`.
- Se compartió estado global para navegación, selección de POIs, posición del usuario y referencias de mapas/marcadores.

### 7.2. Enrutamiento y navegación
- `js/routes.js` resolvió rutas internas y sincronizó la URL con la interfaz mediante la History API.
- Se definieron rutas para portales, hoteles, complejo, restaurantes, carrito de golf y vistas 360°.
- Se aplicaron correcciones para evitar navegaciones no deseadas y robustecer accesos a utilidades de i18n.

### 7.3. Mapas y cartografía (Leaflet + OSM)
- `js/mapas.js` gestionó la inicialización de mapas Leaflet, capas base de teselas OSM (`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, líneas 1536, 1636, 1698, 1769) y controles.
- Se integraron `leaflet-rotate` para rotación y `leaflet-markercluster` para agrupación de POIs.
- `js/guia-playa-paraiso.js` definió POIs, categorías y lógica de interacción (selección, filtrado, acciones móviles y enfoque en mapa).
- Se implementaron controles y guards táctiles para interacción en móvil (activación/bloqueo, fullscreen y manejo de capas superpuestas).

### 7.4. Ruteo y geolocalización
- Se utilizó la Geolocation API para obtener/seguir la ubicación del usuario y mostrar su posición en mapa.
- Se implementó lógica de ruteo con **Valhalla** (`https://valhalla1.openstreetmap.de/route`, `js/mapas.js:1148`, `mapbox-guia-playa-paraiso.html:643`, peatonal), **OSRM** (`https://router.project-osrm.org/route/v1/driving/...`, `js/mapas.js:1182`, `mapbox-guia-playa-paraiso.html:685`, vehicular/fallback) y **Mapbox Directions** (`https://api.mapbox.com/directions/v5/mapbox/{profile}/...`, `mapbox-guia-playa-paraiso.html:768`, token en `:774`, vista Mapbox).
- Se dibujaron geometrías de ruta y se mostraron métricas de distancia/tiempo con recálculo según el flujo implementado.

### 7.5. Vista Mapbox embebida
- `mapbox-guia-playa-paraiso.html` integró **Mapbox GL JS v3.0.1** (CSS `:8`, JS `:9`), access token (`:423`, `:774`), estilo `mapbox://styles/mapbox/standard` (`:446`) y lógica propia de guía/ruta.
- Se aplicaron ajustes visuales/capas para centrar la experiencia en el complejo Playa Paraíso.
- Se implementó seguimiento de ubicación y recálculo de rutas en esa vista.

### 7.6. Experiencia 360°
- `js/pannellum-360.js` integró el visor **Pannellum** y coordinó apertura/cierre de panoramas, acciones desde la guía y navegación hacia el mapa.
- `js/media360.js` utilizó **IndexedDB** para persistencia local de imágenes/medios 360°.
- Se corrigieron animaciones, overlays y estados (`pano-360-open`, retorno al mapa) para estabilizar la experiencia en móvil.

### 7.7. Backend editorial con Supabase
- `function.js` inicializó el cliente Supabase con `SUPABASE_URL` (`:10`), `SUPABASE_KEY` (`:13`) y `window.supabase.createClient(...)` (`:17-19`); el SDK se cargó desde jsDelivr en `index.html:167`.
- Se implementaron operaciones sobre tablas `workspace` y `videos` y uso de buckets `workspace-images` y `videos`.
- `supabase/setup.sql` definió tablas, restricciones, buckets y políticas base; `supabase/security.sql` documentó endurecimiento con control administrativo.

### 7.8. Internacionalización (i18n)
- `js/i18n.js` y módulos relacionados gestionaron diccionarios, claves de traducción y resolución de textos.
- `js/language-gate.js` gestionó la selección/persistencia de idioma.
- Se realizaron correcciones iterativas de cobertura y consistencia en UI y contenidos.

### 7.9. Clima y servicios contextuales
- **Módulo y carga:** `js/weather.js` implementó la integración climática y se cargó desde `index.html:190`; el contenedor de presentación se definió como `<div id="weather-container" ...>` en `index.html:217`.
- **API y parámetros:** se consumió el endpoint `https://api.openweathermap.org/data/2.5/weather` (`js/weather.js:22,175`) mediante `fetch`, con `q={city}`, `units=metric` y `appid={WEATHER_API_KEY}`. La clave se definió en `WEATHER_API_KEY` (`js/weather.js:5`) y la ciudad por defecto en `DEFAULT_CITY = "Cancún"` (`js/weather.js:6`).
- **Funciones principales:** `getWeather(city = DEFAULT_CITY)` (`:19-45`) consultó el clima actual y devolvió `{ temperature, description, icon, city }`; `getWeatherForCity(city)` (`:154-173`) consultó una ciudad específica y devolvió `{ city, temperature, condition, description, emoji }` (con `weatherEmoji`, `:159-167`). `initWeather()` (`:175-182`) solicitó el clima de la ciudad por defecto al cargar (DOMContentLoaded/ready, `:184-189`, invocación en `:194`).
- **Presentación y estados:** `showWeather` (`:109-151`) renderizó un widget climático en `#weather-container`; ante errores se mostraron estados en el mismo contenedor (`showApiKeyError` para HTTP 401, `:49-74`; `showGeneralError`, `:76-98`).
- **API expuesta al cliente:** el módulo publicó `window.RevistaDigital.weather = { getForCity, emoji }` (`:191-195`) para reutilización desde otras vistas/scripts.
- **Actualización de badges en interfaz:** `refreshWeatherCards()` (`:198-215`) actualizó elementos `[data-weather-city]` dentro de `.country-card` y `.complex-hotel-card`; `observeWeatherCards()` (`:217-239`) usó `MutationObserver` para refrescar badges ante cambios en el DOM. Adicionalmente, `index.html:192-215` ejecutó `updateDestinationWeather()` para poblar `.weather-badge` con `data-weather-city` mediante `window.RevistaDigital.weather.getForCity`.

### 7.10. Rendimiento, assets y despliegue
- Se aplicó optimización de imágenes y entrega responsiva mediante `src/ri-manifest.js`, `js/responsive-images.js` y herramientas asociadas.
- Se ajustaron rutas y carga de assets para compatibilidad con GitHub Pages.
- Se versionaron assets requeridos (logos SVG) para evitar fallos de carga en producción.

---

## 8. APIs, Servicios Externos, Claves y Endpoints

> Inventario de APIs, endpoints, claves y tokens presentes en el código del repositorio (uso interno). Cada elemento incluye archivo y línea(s) para localizarlo rápidamente.

### 8.1. Inventario general

| # | Servicio / API | Tipo | Uso en el proyecto | Autenticación / clave | Ubicación (archivo:línea) | Estado |
|---|----------------|------|--------------------|-----------------------|---------------------------|--------|
| 1 | Supabase | BaaS (DB, Auth, Storage) | Workspace, videos, login admin, media | URL + Publishable/Anon Key | `function.js:10,13,17-19`; SDK `index.html:167` | Activo |
| 2 | OpenWeatherMap | API REST meteorológica | Widget de clima | API Key | `js/weather.js:5,6,22,175,194` | Activo |
| 3 | Mapbox GL JS | Librería + mapas | Vista/guía Mapbox embebida | Access Token | `mapbox-guia-playa-paraiso.html:8,9,423,446` | Activo |
| 4 | Mapbox Directions API | API REST de ruteo | Rutas en vista Mapbox | Access Token (mismo) | `mapbox-guia-playa-paraiso.html:768,774` | Activo |
| 5 | Valhalla (demo OSM) | API REST de ruteo | Rutas peatonales | Sin key | `js/mapas.js:1148`; `mapbox-guia-playa-paraiso.html:643` | Activo |
| 6 | OSRM (router público OSM) | API REST de ruteo | Rutas vehiculares/fallback | Sin key | `js/mapas.js:1182`; `mapbox-guia-playa-paraiso.html:685` | Activo |
| 7 | Google Maps JavaScript API | SDK de mapas (opcional) | Carga condicional | `GOOGLE_MAPS_API_KEY = ""` | `function.js:180,2539,2567`; `js/mapas.js:969,986` | Preparado, sin clave |
| 8 | OpenStreetMap Tiles | Teselas raster | Mapa base Leaflet | Sin key | `js/mapas.js:1536,1636,1698,1769` | Activo |
| 9 | apiimg.iberostar.com | CDN de imágenes | Imágenes remotas referenciadas | Sin key en cliente | `function.js:2135,2144` | Referenciado |
| 10 | jsDelivr | CDN de librerías | SDK Supabase JS | N/A | `index.html:167` | Activo |
| 11 | Adobe Typekit | CDN tipográfico | Kit tipográfico | Kit ID en URL | `index.html:41` | Activo |
| 12 | Google Fonts | CDN tipográfico | EB Garamond y preconnect | N/A | `index.html:39,40,42`; `mapbox-guia-playa-paraiso.html:13` | Activo |

### 8.2. Supabase

| Elemento | Valor | Ubicación (archivo:línea) |
|---------|-------|---------------------------|
| **Project URL** | `https://bivdwkwwlyisordzjhql.supabase.co` | `function.js:10` |
| **Publishable/Anon Key** | `sb_publishable_8ji1n1QQR7AFRAUQyGHe6g_CdRZqUho` | `function.js:13` |
| **Inicialización cliente** | `window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY)` | `function.js:17-19` |
| **SDK (@supabase/supabase-js@2)** | `https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2` | `index.html:167` |

**Tablas (definidas en `supabase/setup.sql`):** `public.workspace` (`id`, `hotel`, `title`, `text`, `product`, `image`, `created_at`), `public.videos` (`id`, `hotel`, `title`, `video`, `mime_type`, `start`, `end`, `created_at`, restricción `end > start` y `end - start <= 35`).

**Buckets de Storage (`supabase/setup.sql`):** `workspace-images` (público, 10 MB, imágenes: jpeg/png/webp/gif/avif/heic/heif), `videos` (público, 100 MB, video/mp4, webm, quicktime, x-m4v).

### 8.3. OpenWeatherMap

| Elemento | Valor | Ubicación (archivo:línea) |
|---------|-------|---------------------------|
| **Endpoint** | `https://api.openweathermap.org/data/2.5/weather` | `js/weather.js:22,175` |
| **Parámetros** | `q={city}`, `units=metric`, `appid={WEATHER_API_KEY}` | `js/weather.js:22,175` |
| **API Key** | `ddfed6e6d7dac57eea9c70419f39e71e` | `js/weather.js:5` |
| **Ciudad por defecto** | `Cancún` (`DEFAULT_CITY`) | `js/weather.js:6` |
| **Funciones** | `getWeather(city)` (clima actual para widget), `getWeatherForCity(city)` (consulta por ciudad), `weatherEmoji(condition)` | `js/weather.js:19-45,154-173,159-167` |
| **Inicialización y render** | `initWeather()` consulta ciudad por defecto y renderiza en `#weather-container`; manejo de errores 401/general | `js/weather.js:175-189,49-151`; contenedor en `index.html:217` |
| **API expuesta en cliente** | `window.RevistaDigital.weather = { getForCity, emoji }` | `js/weather.js:191-195` |
| **Uso en UI (badges)** | `refreshWeatherCards()` + `MutationObserver` para `[data-weather-city]` en `.country-card`/`.complex-hotel-card`; script inline `updateDestinationWeather()` para `.weather-badge` | `js/weather.js:198-239`; `index.html:192-215` |
| **Carga del módulo** | Inclusión del script de clima | `index.html:190` |

### 8.4. Mapbox

| Elemento | Valor | Ubicación (archivo:línea) |
|---------|-------|---------------------------|
| **GL JS CSS** | `https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.css` | `mapbox-guia-playa-paraiso.html:8` |
| **GL JS** | `https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.js` | `mapbox-guia-playa-paraiso.html:9` |
| **Access Token** | `pk.eyJ1IjoibW9vdHVuIiwiYSI6ImNtdzI2ajd3MDAwMTQyeXBwMWtwd2RhZjUifQ.xdPmfb2yTy5yzVNCeLJglQ` | `mapbox-guia-playa-paraiso.html:423` (asignación), `774` (uso en Directions) |
| **Estilo de mapa** | `mapbox://styles/mapbox/standard` | `mapbox-guia-playa-paraiso.html:446` |
| **Directions endpoint** | `https://api.mapbox.com/directions/v5/mapbox/{profile}/{coords}` | `mapbox-guia-playa-paraiso.html:768` |

### 8.5. Ruteo OSM (sin API key en cliente)

| Servicio | Endpoint | Ubicación (archivo:línea) | Uso |
|---------|----------|---------------------------|-----|
| **Valhalla** | `https://valhalla1.openstreetmap.de/route` | `js/mapas.js:1148`; `mapbox-guia-playa-paraiso.html:643` | Ruteo peatonal |
| **OSRM** | `https://router.project-osrm.org/route/v1/driving/{start};{end}?overview=full&geometries=geojson` | `js/mapas.js:1182`; `mapbox-guia-playa-paraiso.html:685` | Ruteo vehicular/fallback |

### 8.6. Google Maps (integración preparada)

| Elemento | Valor | Ubicación (archivo:línea) |
|---------|-------|---------------------------|
| **Clave** | `const GOOGLE_MAPS_API_KEY = ""` (vacía) | `function.js:180` |
| **Validación de clave** | Comprobación antes de carga | `function.js:2539`; `js/mapas.js:969` |
| **Loader SDK** | `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=${callbackName}` | `function.js:2567`; `js/mapas.js:986` |

### 8.7. Tiles y recursos externos

| Recurso | Valor | Ubicación (archivo:línea) |
|---------|-------|---------------------------|
| **OpenStreetMap tiles** | `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png` | `js/mapas.js:1536,1636,1698,1769` |
| **Iberostar image CDN** | `https://apiimg.iberostar.com/uploads/image/89213/crops/16:9/1920/image.jpeg` | `function.js:2135` |
| **Iberostar image CDN** | `https://apiimg.iberostar.com/uploads/image/89293/crops/16:9/1920/image.jpeg` | `function.js:2144` |
| **Adobe Typekit** | `https://use.typekit.net/vyw7bid.css` | `index.html:41` |
| **Google Fonts (preconnect)** | `https://fonts.googleapis.com`, `https://fonts.gstatic.com` | `index.html:39,40` |
| **Google Fonts (EB Garamond)** | `https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600;700&display=swap` | `index.html:42`; `mapbox-guia-playa-paraiso.html:13` |

### 8.8. Librerías locales (no APIs remotas en runtime)

| Librería | Ubicación | Uso |
|----------|-----------|-----|
| Leaflet | `libs/leaflet/` | Mapas 2D |
| Leaflet.markercluster | `libs/leaflet-markercluster/` | Clustering de marcadores |
| Leaflet-rotate | `libs/leaflet-rotate/` | Rotación de mapa |
| Pannellum | `libs/pannellum/` | Visor 360° |


## 9. Herramientas Utilizadas

| Categoría | Herramienta | Uso |
|-----------|-------------|-----|
| Lenguajes | HTML5, CSS3, JavaScript (ES6+) | Estructura, presentación y lógica cliente |
| Control de versiones | Git, GitHub | Versionado, trazabilidad y colaboración |
| Hosting | GitHub Pages | Despliegue estático |
| Backend BaaS | Supabase | Base de datos, autenticación y storage |
| Mapas 2D | Leaflet, MarkerCluster, Leaflet-rotate | Cartografía interactiva del complejo |
| Mapas/servicios | Mapbox GL JS, Mapbox Directions | Vista embebida y ruteo |
| Datos cartográficos/ruteo | OpenStreetMap, Valhalla, OSRM | Teselas y cálculo de rutas |
| 360° | Pannellum | Recorridos panorámicos |
| Clima | OpenWeatherMap | Datos meteorológicos |
| Tipografías | Adobe Typekit, Google Fonts | Identidad tipográfica |
| CDN | jsDelivr | Distribución de SDK/librerías |
| Optimización de medios | `responsive-images.js`, `ri-manifest.js`, herramientas de optimización | Entrega y compresión de imágenes |
| Editor | Visual Studio Code | Desarrollo |

---

## 10. Estructura de Carpetas — Enfoque Riviera Maya

| Ruta | Descripción |
|------|-------------|
| `index.html` | Punto de entrada principal |
| `style.css`, `responsive.css` | Estilos globales y responsive |
| `function.js` | Lógica base/legacy, integración Supabase y utilidades |
| `mapbox-guia-playa-paraiso.html` | Guía/mapa Mapbox embebido del complejo |
| `js/` | Módulos de aplicación (rutas, mapas, guía, hoteles, restaurantes, 360°, carrito, i18n, clima, etc.) |
| `libs/` | Librerías locales (Leaflet, plugins, Pannellum) |
| `src/` | Imágenes, logos y recursos estáticos |
| `supabase/` | Scripts SQL y documentación de backend |
| `mexico/`, `complejo-playa-paraiso/` | Rutas/vistas específicas por destino y secciones |

---

## 11. Guía de Edición por Componente

| Qué cambiar | Dónde editar | Consideraciones |
|-------------|--------------|-----------------|
| Traducciones UI/contenido | `js/i18n.js`, módulos relacionados | Mantener consistencia de claves ES/EN |
| Hoteles y medios | `js/hoteles.js`, `function.js`, `src/` | Verificar nombres/rutas y assets responsivos |
| Restaurantes/POIs/horarios | `js/restaurantes.js`, `js/guia-playa-paraiso.js`, `js/datos-complejo.js` | Mantener coherencia entre mapa, guía y 360° |
| Mapas Leaflet y ruteo | `js/mapas.js` | Validar tiles, geolocalización y proveedores de ruta |
| Vista Mapbox | `mapbox-guia-playa-paraiso.html` | Validar token, estilo y endpoints |
| Visor 360° | `js/pannellum-360.js`, `js/media360.js` | Revisar estados de apertura/cierre y overlays |
| Clima (OpenWeatherMap) | `js/weather.js`, `index.html` (`#weather-container`, scripts de badges) | Validar endpoint/key, ciudad por defecto, `window.RevistaDigital.weather` y selectores de badges (`.weather-badge`, `[data-weather-city]`) |
| Workspace/Videos | `js/workspace.js`, `js/videos.js`, `function.js`, `supabase/` | Revisar autenticación, tablas, buckets y RLS |
| Estilos | `style.css`, `responsive.css` | Probar en móvil (capas, touch, fullscreen) |

---

## 12. Identidad Visual y Diseño Gráfico

- **Paleta:** tonos crema/papel, marrones, dorados y acentos oscuros/verde definidos en `style.css` (variables en `:root`).
- **Tipografías:** Adobe Garamond Pro (Typekit), EB Garamond (Google Fonts) y tipografías de interfaz según configuración del proyecto.
- **Componentes:** portales, fichas, paneles de guía, popups de mapa, botones de acción, carruseles y visor 360° con tratamiento visual coherente.

---

## 13. Guía de Ejecución y Despliegue

### 13.1. Ejecución local
- Servir el proyecto por HTTP (p. ej. `npx serve .` o Live Server) para evitar problemas de rutas y carga de recursos.

### 13.2. Despliegue
- Publicación como sitio estático (GitHub Pages).
- Verificación de rutas relativas, assets versionados y carga de servicios externos.

### 13.3. Verificación post-despliegue
- Carga de logos/recursos en `src/`.
- Funcionamiento de mapas, ruteo y geolocalización.
- Operación de Supabase (tablas/buckets) según políticas vigentes.
- Disponibilidad de clima y token de Mapbox.

---

## 14. Flujo de Publicación (Workspace)

1. Acceso al modo administrativo/editor.
2. Autenticación mediante Supabase Auth.
3. Creación/edición de registros en `workspace` y/o `videos`.
4. Subida de media a buckets (`workspace-images`, `videos`).
5. Visualización de contenido según políticas de lectura configuradas.

---

## 15. Consideraciones sobre Otros Países

El repositorio incluyó estructura/referencias para otros destinos; este manual priorizó Riviera Maya. Como esta iteración corresponde a una versión de alcance acotado, la extensión a otros países quedó supeditada a completar catálogos, rutas, POIs, traducciones y validaciones cartográficas/multimedia específicas.

---

## 16. Anexos, Auditorías y Seguridad

### 16.1. Auditorías en repositorio
- `AUDITORIA_COORDENADAS_COMPLEJO_PLAYA_PARADISO.md`
- `AUDITORIA_COORDENADAS_COMPLEJO_PLAYA_PARADISO_2.md`
- `AUDITORIA_RESUMEN.txt`
- `AUDITORIA_ROTACION_MAPAS.md`
- `AUDITORIA_RUTAS_COMPLEJO_PLAYA_PARADISO.md`
- `SUMMARY_AUDITORIA.txt`

> Estas auditorías formaron parte de la validación realizada dentro de esta entrega inicial.

### 16.2. Recomendaciones de seguridad y gobernanza
- Tratar claves/tokens documentados como información sensible interna.
- Rotar credenciales ante exposición fuera del entorno autorizado.
- Revisar periódicamente RLS, permisos de buckets y vigencia/cuotas de APIs.
- Mantener inventario de responsables, costos y alcances por servicio.

### 16.3. Trazabilidad
- La planificación y el avance se reconstruyeron a partir del historial de Git.
- Último commit registrado al cierre de esta versión documental: `8f73ef8` (2026-11-17).

---

**Fin del documento.**
