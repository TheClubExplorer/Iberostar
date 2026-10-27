// Datos operativos del complejo Playa Paraíso (Iberostar The Club)
// ------------------------------------------------------------------
// Horarios reales tomados de las fichas de Iberostar en IHG (ihg.com).
// Las cartas completas no están publicadas: se remite a la app de Iberostar.
// No se inventan horarios ni menús; lo no verificado queda como "consultar".
//
// Claves de horario disponibles:
//   breakfast  desayuno   lunch  comida   dinner  cena   late  barra nocturna
//   hours      horario general (servicios)
// ------------------------------------------------------------------
(function () {
  "use strict";
  window.RevistaDigital = window.RevistaDigital || {};
  const datos = window.RevistaDigital.datosComplejo || {};

  const CARTA = "Consulte la carta completa en la app de Iberostar.";
  const HORARIO_PENDIENTE = "Consultar días y horario en la app de Iberostar.";

  // --- Horarios por tipo de servicio -------------------------------------
  // Se conserva por compatibilidad; cada ficha usa su horario real.
  const HORARIOS = {};

  // --- Restaurantes del complejo -----------------------------------------
  // cocina: texto mostrado en la ficha
  // horario: desglose real por servicio (si se conoce)
  // horarioTexto: horario general cuando no hay desglose
  // carta: siempre se remite a la app (no hay cartas publicadas)
  const RESTAURANTES = {
    // --- Iberostar Selection Paraíso Maya ---
    "la-geisha": {
      cocina: "Japonesa · Teppanyaki",
      horarioTexto: HORARIO_PENDIENTE,
      carta: CARTA
    },
    letoile: {
      cocina: "Francesa · Alta cocina",
      horarioTexto: HORARIO_PENDIENTE,
      carta: CARTA
    },
    "la-marina": {
      cocina: "Marisquería",
      horarioTexto: HORARIO_PENDIENTE,
      carta: CARTA
    },
    "under-the-sea": {
      cocina: "Mariscos y pescados",
      horario: { dinner: "18:00 - 22:00 (lun, mar, jue-dom)" },
      carta: CARTA
    },
    olivetti: {
      cocina: "Italiana",
      horario: { lunch: "13:00 - 15:00 (lun, mar, jue-dom)" },
      carta: CARTA
    },
    "lemon-spices": {
      cocina: "Griega",
      horario: { dinner: "18:00 - 22:00 (mar-dom)" },
      carta: CARTA
    },
    "el-rancho": {
      cocina: "Steak house",
      horario: { dinner: "18:00 - 22:00 (mar, jue-dom)" },
      carta: CARTA
    },
    "la-pagoda": {
      cocina: "Buffet internacional",
      horario: {
        breakfast: "07:00 - 11:00",
        lunch: "13:00 - 15:00",
        dinner: "18:00 - 22:00"
      },
      carta: CARTA
    },
    "el-museo": {
      cocina: "Italiana",
      horario: { dinner: "18:00 - 22:00 (mié-sáb)" },
      carta: CARTA
    },
    "el-tapatio": {
      cocina: "Mexicana",
      horario: { dinner: "18:00 - 22:00 (lun-jue y dom)" },
      carta: CARTA
    },

    // --- Iberostar Waves Paraíso del Mar / Beach ---
    hashiru: {
      cocina: "Japonesa · Teppanyaki y sushi",
      horario: { dinner: "18:00 - 22:00 (lun, mar, jue-sáb)" },
      carta: CARTA
    },
    "la-dorada": {
      cocina: "Mediterránea · Pescados y mariscos",
      horario: { dinner: "18:30 - 22:00 (lun, mié-sáb y dom)" },
      carta: CARTA
    },
    rodizio: {
      cocina: "Brasileña · Rodizio de carnes",
      horario: { dinner: "18:00 - 22:00 (mar-dom)" },
      carta: CARTA
    },
    "el-mercado": {
      cocina: "Buffet internacional",
      horario: { breakfast: "07:00 - 10:00" },
      carta: CARTA
    },
    "la-plaza": {
      cocina: "Buffet internacional",
      horario: {
        breakfast: "07:30 - 11:00",
        dinner: "18:00 - 22:00"
      },
      carta: CARTA
    },
    "la-hacienda": {
      cocina: "Mexicana",
      horario: { dinner: "18:00 - 22:00 (mar-dom)" },
      carta: CARTA
    },
    "el-puerto": {
      cocina: "Buffet y steak house",
      horario: {
        lunch: "13:00 - 16:00",
        dinner: "18:00 - 22:00 (lun, jue, sáb, dom)"
      },
      carta: CARTA
    },
    "beach-grill": {
      cocina: "Grill de playa",
      horario: { lunch: "11:30 - 17:00" },
      carta: CARTA
    },
    "el-colonial": {
      cocina: "Francesa",
      horario: { dinner: "18:30 - 22:00 (lun, mié, vie, dom)" },
      carta: CARTA
    },
    trattoria: {
      cocina: "Italiana",
      horario: { dinner: "18:00 - 22:00 (mar, jue-dom)" },
      carta: CARTA
    },

    // --- JOIA Paraíso by Iberostar ---
    legado: {
      cocina: "Mexicana",
      horario: { dinner: "18:00 - 22:00" },
      carta: CARTA
    },
    latelier: {
      cocina: "Alta cocina de autor",
      horario: { dinner: "18:00 - 22:00" },
      carta: CARTA
    },
    venecia: {
      cocina: "Italiana · Enoteca",
      horario: { dinner: "18:00 - 22:00" },
      carta: CARTA
    },
    haiku: {
      cocina: "Japonesa · Nikkei y teppanyaki",
      horario: { dinner: "18:00 - 22:00" },
      carta: CARTA
    },
    ember: {
      cocina: "Steak house frente al mar",
      horario: { lunch: "11:00 - 17:00" },
      carta: CARTA
    },
    bellavista: {
      cocina: "Buffet internacional",
      horario: {
        breakfast: "07:00 - 11:00",
        lunch: "12:30 - 16:00",
        dinner: "18:30 - 22:00"
      },
      carta: CARTA
    },

    // --- Otros locales del complejo (horario sin confirmar) ---
    burgers: {
      cocina: "Hamburguesas",
      horarioTexto: HORARIO_PENDIENTE,
      carta: CARTA
    },
    "antojitos-tacos": {
      cocina: "Antojitos mexicanos",
      horarioTexto: HORARIO_PENDIENTE,
      carta: CARTA
    },
    crepes: {
      cocina: "Crepas y helados",
      horarioTexto: HORARIO_PENDIENTE,
      carta: CARTA
    },
    jambalaya: {
      cocina: "Cajún y criolla",
      horarioTexto: HORARIO_PENDIENTE,
      carta: CARTA
    },
    "el-fogon-steak": {
      cocina: "Steak house y parrilla",
      horarioTexto: HORARIO_PENDIENTE,
      carta: CARTA
    },
    "el-fogon-italiano": {
      cocina: "Italiana",
      horarioTexto: HORARIO_PENDIENTE,
      carta: CARTA
    },
    "coco-buffet": {
      cocina: "Snack bar de playa",
      horario: { lunch: "11:00 - 18:00" },
      carta: CARTA
    },
    "baby-kitchen": {
      cocina: "Cocina para bebés y niños",
      horarioTexto: HORARIO_PENDIENTE,
      carta: CARTA
    }
  };

  // --- Bares ---------------------------------------------------------------
  // Sin horarios publicados: se remite a la app de Iberostar.
  const BARES = {
    "sports-bar-corner": { horarioTexto: HORARIO_PENDIENTE, carta: CARTA },
    "star-rock-cafe": { horarioTexto: HORARIO_PENDIENTE, carta: CARTA },
    "pool-bar-las-olas": { horarioTexto: HORARIO_PENDIENTE, carta: CARTA },
    "lobby-bar-kukulkan": { horarioTexto: HORARIO_PENDIENTE, carta: CARTA },
    "music-bar-rhapsody": { horarioTexto: HORARIO_PENDIENTE, carta: CARTA },
    "lobby-bar-el-mirador": { horarioTexto: HORARIO_PENDIENTE, carta: CARTA },
    "aqua-bar-la-sirenita": { horarioTexto: HORARIO_PENDIENTE, carta: CARTA },
    "health-bar-spa": { horarioTexto: HORARIO_PENDIENTE, carta: CARTA },
    "aqua-bar-la-perla": { horarioTexto: HORARIO_PENDIENTE, carta: CARTA },
    "bar-teatro": { horarioTexto: HORARIO_PENDIENTE, carta: CARTA },
    "lobby-bar-la-fuente": { horarioTexto: HORARIO_PENDIENTE, carta: CARTA },
    "aqua-bar-las-olas": { horarioTexto: HORARIO_PENDIENTE, carta: CARTA },
    "lobby-bar-la-cula": { horarioTexto: HORARIO_PENDIENTE, carta: CARTA },
    "aqua-bar-las-rocas": { horarioTexto: HORARIO_PENDIENTE, carta: CARTA },
    "lobby-bar-acuario": { horarioTexto: HORARIO_PENDIENTE, carta: CARTA },
    "cigar-bar": { horarioTexto: HORARIO_PENDIENTE, carta: CARTA },
    "beach-bar": { horarioTexto: HORARIO_PENDIENTE, carta: CARTA },
    "la-brisa": { horarioTexto: HORARIO_PENDIENTE, carta: CARTA },
    "bar-el-puente": { horarioTexto: HORARIO_PENDIENTE, carta: CARTA },
    cocobar: { horarioTexto: HORARIO_PENDIENTE, carta: CARTA },
    starcafe: { horarioTexto: "05:00 - 23:00", carta: CARTA }
  };

  // --- Spa, golf y otros servicios ----------------------------------------
  const SERVICIOS = {
    spa: {
      hours: "Consultar horario en la app de Iberostar",
      treatments: "Consulte los tratamientos y paquetes disponibles en la app de Iberostar."
    },
    "massage-palapa": {
      hours: "Consultar horario en la app de Iberostar",
      treatments: "Consulte los tratamientos disponibles en la app de Iberostar."
    },
    "golf-club-house": {
      hours: "06:30 - anochecer",
      teeTimes: "06:30 (verano) / 07:30 (invierno)",
      packages: "Green fee 18 hoyos (incluye carrito compartido, alimentos y bebidas, tees y mapa) · Green fee ilimitado 7 días · Traslado desde el hotel"
    },
    golf: {
      hours: "06:30 - anochecer",
      teeTimes: "06:30 (verano) / 07:30 (invierno)",
      packages: "Green fee 18 hoyos (incluye carrito compartido, alimentos y bebidas, tees y mapa) · Green fee ilimitado 7 días · Traslado desde el hotel"
    },
    piscina: {
      hours: "Consultar horario en la app de Iberostar"
    }
  };

  // --- Actividades y servicios incluidos ----------------------------------
  // Solo lo confirmado por Iberostar; el programa diario se consulta en la app.
  const ACTIVIDADES = [
    { hora: "Incluido", nombre: "Deportes acuáticos no motorizados (kayak, snorkel, windsurf, Hobie Cat)", lugar: "Playa principal", poiId: "playa-mar-caribe" },
    { hora: "Consultar", nombre: "Programa deportivo y de entretenimiento diario", lugar: "Complejo" },
    { hora: "Consultar", nombre: "Star Camp y parque acuático infantil", lugar: "Star Camp", poiId: "starcamp" },
    { hora: "Consultar", nombre: "Música en vivo y espectáculos nocturnos", lugar: "Music Bar Rhapsody", poiId: "music-bar-rhapsody" },
    { hora: "06:30 - anochecer", nombre: "Golf en Iberostar Playa Paraíso Golf Club", lugar: "Golf Club House", poiId: "golf" },
    { hora: "Consultar", nombre: "Spa Sensations", lugar: "Spa del complejo", poiId: "spa" },
    { hora: "Consultar", nombre: "Discoteca Galaxy (+18)", lugar: "Discoteca Galaxy", poiId: "galaxy" }
  ];

  datos.HORARIOS = HORARIOS;
  datos.RESTAURANTES = RESTAURANTES;
  datos.BARES = BARES;
  datos.SERVICIOS = SERVICIOS;
  datos.ACTIVIDADES = ACTIVIDADES;
  window.RevistaDigital.datosComplejo = datos;
})();
