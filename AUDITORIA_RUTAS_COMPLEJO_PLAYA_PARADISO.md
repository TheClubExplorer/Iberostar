# AUDITORÍA DE RUTAS - COMPLEJO PLAYA PARAÍSO
Fecha: 2026-10-15

## 1. POIs Verificados con coordenadas (50)
Verificados según `inventory_final.json`. Sin coordenadas verificadas: Pendiente ubicación (1), Pendiente coordenadas (40), No verificable (9).

## 2. Inspección del motor
- `mapas.isComplexDestination`: usa `complexRoutingBounds` (state.complexBounds + POIs verificados); true → perfil `pedestrian`.
- `mapas.computeRoute`: prefer `pedestrian` → `requestPedestrianRoute`; fallback a `driving` si falla (excepto abort).
- `mapas.openDirections`: limpia ruta previa (`state.routeLine.remove()`), centra destino, muestra estado con distancia/duración/proveedor.
- `guia-playa-paraiso.routeToPoi`: requiere `canMap(poi)` y posición; cancela previa (`cancelRoute(true)`), usa `AbortController`, `drawRoute` centra vista, actualiza estado.
- `routes.portalMapActions` + `.portal-directions`: permite calcular ruta al destino/hotel más cercano.

## 3. Verificación Coco Bar (corte 2026-10-15; supersedido)
**Registro actual (`id: "cocobar"`):**
- Cat: bar | Nombre: Coco Bar
- Estado: Pendiente de ubicación (verified=false, coords presentes: 20.7631,-86.9618)
- external: false | kind: null
- Fuentes: plano (source: "plano"); coordenadas no verificadas con OSM. OSM bbox complejo/ampliado no contiene "Coco Bar". Plano oficial menciona "COCO BAR".
- Punto-in-polygon: fuera del perímetro OSM oficial (way 138147423), dentro de Vidanta (way 289799188).

**Acción realizada:** No se modificaron coordenadas. Se mantuvo `verified:false`, `external:false`, `source:"plano"`. **Conclusión:** No existe evidencia suficiente para confirmar ubicación exacta dentro del complejo. No se inventan coordenadas. El marcador permanece con ubicación pendiente (no se muestra como verificado; no se dibuja como POI verificable).

## 4. Comportamiento estructural (validado)
- Cambio de destino: cancelación previa + nuevo cálculo.
- Cancelar ruta: AbortController.abort + removeRouteLine.
- Sin posición: solicita ubicación; sin coords: mensaje de error; área (kind=area): no calcula ruta.
- Perfil: pedestrian si destino dentro de límites del complejo.

## 5. Pruebas existentes
- `cdp-nav.mjs`: 20/20 PASS
- `cdp-test.mjs`: 35/35 PASS
- `cdp-listings.mjs`: 18/18 PASS
**Total:** 73/73 PASS

## 6. Estado de verificación de rutas
- **Cálculo estructural (lógica del motor):** VERIFICADO
- **Transitabilidad física real (recorridos en terreno/proveedor):** NO VERIFICADA (no se ejecutaron peticiones externas a Valhalla/OSRM en este entorno de auditoría)
- **Evidencia empírica de dibujo/flujo UI:** VERIFICADO estructuralmente

## 7. Conclusión del corte 2026-10-15 (histórica)
No se detectaron errores de código demostrados. Leaflet/OSM conservados. **Coco Bar permanece como "Pendiente de ubicación"** por falta de evidencia suficiente para corregir sus coordenadas; no se ha inventado ninguna coordenada. No se declararon rutas como transitables físicamente.

## Actualización de implementación (2026-10-22)

La auditoría anterior se basaba en `inventory_final.json` y está desactualizada respecto de la guía activa. `js/guia-playa-paraiso.js` registra actualmente Coco Bar como verificado con coordenadas de Google Maps (`20.756290,-86.959046`). También asigna coordenadas OSM a THE CLUB (`20.7598333,-86.9652778`) y lo marca verificado. Consultar la sección de actualización en `AUDITORIA_COORDENADAS_COMPLEJO_PLAYA_PARADISO_2.md` para restaurantes e instalaciones añadidas/actualizadas. No se repitieron pruebas de rutas en este corte.

En el cambio de trabajo actual, `js/mapas.js` crea un renderer SVG explícito para la polilínea de ruta cuando Leaflet SVG está disponible. El comentario del código documenta el motivo: evitar glitches del renderer Canvas al rotar mapas con `leaflet-rotate`. Esta actualización de auditoría registra el cambio implementado; no afirma que se haya ejecutado una prueba visual nueva.

### Cambios adicionales implementados en el corte actual

- `js/mapas.js` añade un ajuste para reposicionar popups/tooltips cuando rota un mapa con `zoomAnimation:false`, condición usada por los mapas del portal.
- `js/guia-playa-paraiso.js` compensa el desplazamiento de enfoque del mapa al girar, para que el punto seleccionado siga en el área visible junto al panel de la guía.
- En móvil, `function.js` añade/elimina la clase `mobile-nav-open`; `style.css` oculta los controles flotantes del mapa, la guía y los avisos de ubicación mientras el menú principal está abierto. También reduce sus niveles de `z-index` para evitar que pasen sobre el menú.
- `index.html` actualiza las versiones de caché de `mapas.js` y `guia-playa-paraiso.js`.

Estos son cambios inspeccionados en el código de trabajo; no se declara que hayan pasado una prueba visual o de rutas posterior a su implementación.

### Resultado del diagnóstico manual de rotación

El diagnóstico manual compartido el 2026-10-22 reporta un desfase constante de ~210 px para el marcador normal y un desfase variable para el popup; el POI dentro del cluster no se encontró en el DOM. Estos valores no se consideran evidencia válida todavía: el cálculo del diagnóstico compara `latLngToLayerPoint()` (coordenadas de capa) con `getBoundingClientRect()` (coordenadas de pantalla), aplicando `rotatedPointToMapPanePoint()` como si recibiera un punto de `rotatePane`. El API del plugin define esa conversión entre el pane rotado y el pane del mapa, por lo que la medición mezcla sistemas de coordenadas. Además, compara el centro del popup directamente con la coordenada del marcador, sin considerar el ancla/tamaño del popup. Hace falta corregir la instrumentación y repetir la medición antes de atribuir un desfase de 210 px a los marcadores o decidir un cambio de código.

### Hallazgo del trazado peatonal (revisión estática)

- `js/mapas.js` envía origen y destino a Valhalla con `costing:"pedestrian"`; si el servicio falla, `computeRoute()` intenta OSRM en perfil `driving`, incluso para destinos dentro del complejo. Los límites del complejo solo seleccionan el perfil; no contienen una red interna propia.
- El código obtiene la geometría del proveedor, pero `js/guia-playa-paraiso.js` en `drawRoute()` añade de nuevo las coordenadas GPS originales y las coordenadas exactas del POI al principio/final. `js/mapas.js` hace lo mismo al dibujar las rutas de direcciones. Si el proveedor ajusta (snaps) los puntos a la red peatonal cercana, esos segmentos añadidos por la app pueden verse como atajos rectos que cruzan patios o edificios; no representan necesariamente un paso transitable.
- Por tanto, el rodeo largo proviene probablemente de que el grafo peatonal del proveedor no tiene conectados los pasillos/entradas internas. La línea directa del otro ejemplo puede ser un conector dibujado por la app, no evidencia de que el servicio haya encontrado una ruta por dentro. Esto es un hallazgo de código; no se inspeccionó la geometría exacta de una respuesta Valhalla/OSRM en esta revisión.
- Para permitir rutas internas reales se necesita un grafo transitable verificado (caminos, accesos, restricciones y conexiones de entrada/salida) y conectarlo al ruteo del complejo. OpenStreetMap describe esos elementos como footways/corridors interiores conectados en puertas/entradas y niveles; un POI o polígono por sí solos no bastan para el ruteo.

