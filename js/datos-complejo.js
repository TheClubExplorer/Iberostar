// Datos operativos del complejo Playa Paraíso (Iberostar The Club)
// ------------------------------------------------------------------
// Fuente única de datos oficiales: cartas, horarios, tratamientos,
// paquetes y actividades del día. Actualizado con la información
// verificada del complejo.
//
// Claves de horario disponibles:
//   breakfast  desayuno   lunch  comida   dinner  cena   late  barra nocturna
// ------------------------------------------------------------------
(function () {
  "use strict";
  window.RevistaDigital = window.RevistaDigital || {};
  const datos = window.RevistaDigital.datosComplejo || {};

  // --- Horarios por tipo de servicio (oficiales) ----------------------------
  const HORARIOS = {
    buffet: {
      breakfast: "07:00 - 10:30",
      lunch: "12:30 - 15:30",
      dinner: "18:30 - 22:00"
    },
    buffet_marina: {
      breakfast: "07:00 - 10:30",
      lunch: "13:00 - 15:00",
      dinner: "18:30 - 22:00"
    },
    especialidad: {
      dinner: "18:30 - 22:00"
    },
    solo_cena: {
      dinner: "18:00 - 22:00"
    },
    cafeteria: {
      breakfast: "07:00 - 11:00",
      lunch: "12:00 - 16:00",
      late: "16:00 - 23:00"
    },
    bar: {
      lunch: "11:00 - 17:00",
      late: "17:00 - 01:00"
    },
    bar_cierre_temprano: {
      lunch: "10:00 - 18:00"
    },
    heladeria: {
      lunch: "11:00 - 22:00"
    },
    spa: {
      hours: "08:00 - 20:00"
    },
    golf: {
      hours: "07:00 - atardecer"
    },
    piscina: {
      hours: "07:00 - 22:00"
    }
  };

  // --- Tipo de servicio por restaurante -----------------------------------
  // tipo: buffet | especialidad | solo_cena | cafeteria
  // cocina: texto mostrado en la ficha
  // carta: menú resumido
  const RESTAURANTES = {
    "el-colonial": {
      tipo: "especialidad",
      cocina: "Gourmet / Francesa",
      cuisine: "Gourmet / French",
      carta: "Bisque de bogavante al coñac · Magret de pato con reducción de frutos rojos · Solomillo de res al vino tinto · Crème brûlée tradicional",
      menu: "Lobster bisque with cognac · Duck magret with red fruit sauce · Beef tenderloin in red wine · Traditional crème brûlée",
      horario: "18:30 - 22:00 h",
      vestimenta: "Formal elegante",
      dressCode: "Formal elegant",
      reservas: true,
      especialidades: "Bisque de bogavante al coñac, magret de pato con reducción de frutos rojos, solomillo de res al vino tinto y crème brûlée tradicional",
      specialties: "Lobster bisque with cognac, duck magret with red fruit sauce, beef tenderloin in red wine and traditional crème brûlée",
      hotel: "Iberostar Paraíso del Mar"
    },
    hashiru: {
      tipo: "solo_cena",
      cocina: "Japonesa & Teppanyaki",
      cuisine: "Japanese & Teppanyaki",
      carta: "Sushi y sashimi · Teppanyaki en vivo · Arroz yakimeshi · Helado frito en tempura",
      menu: "Sushi and sashimi · Live teppanyaki · Yakimeshi rice · Tempura fried ice cream",
      horario: "18:00 - 22:00 h",
      vestimenta: "Informal elegante",
      dressCode: "Smart casual",
      reservas: true,
      especialidades: "Selección de sushi y sashimi, mesas de teppanyaki en vivo (solomillo, pollo teriyaki y camarones), arroz yakimeshi y helado frito en tempura",
      specialties: "Sushi and sashimi selection, live teppanyaki tables (tenderloin, teriyaki chicken and shrimp), yakimeshi rice and tempura fried ice cream"
    },
    "la-dorada": {
      tipo: "especialidad",
      cocina: "Pescados y Mariscos Mediterráneos",
      cuisine: "Mediterranean Fish and Seafood",
      carta: "Lubina a la sal marina · Cazuela de mariscos al azafrán · Pulpo a la parrilla sobre puré trufado · Tarta templada de limón",
      menu: "Sea bass in sea salt · Seafood casserole with saffron · Grilled octopus on truffle purée · Warm lemon tart",
      horario: "18:30 - 22:00 h",
      vestimenta: "Informal elegante",
      dressCode: "Smart casual",
      reservas: true,
      especialidades: "Lubina a la sal marina, cazuela de mariscos al azafrán, pulpo a la parrilla sobre puré trufado y tarta tibia de limón",
      specialties: "Sea bass in sea salt, saffron seafood casserole, grilled octopus on truffle purée and warm lemon tart"
    },
    rodizio: {
      tipo: "especialidad",
      cocina: "Churrasquería Brasileña",
      cuisine: "Brazilian Steakhouse",
      carta: "Espadas de cortes selectos al carbón (picanha, vacío, entraña y costillas) · Piña asada con canela · Buffet de guarniciones frías y calientes",
      menu: "Charcoal-grilled select cuts skewers (picanha, flank, skirt and ribs) · Cinnamon-roasted pineapple · Cold and hot side buffet",
      horario: "18:30 - 22:00 h",
      vestimenta: "Informal elegante",
      dressCode: "Smart casual",
      reservas: true,
      especialidades: "Espadas de cortes selectos al carbón (picanha, vacío, entraña y costillas), piña asada con canela y buffet de guarniciones frías y calientes",
      specialties: "Charcoal-grilled select cut skewers (picanha, flank, skirt and ribs), cinnamon-roasted pineapple and cold/hot side buffet",
      hotel: "Iberostar Paraíso Beach"
    },
    "el-mercado": {
      tipo: "buffet",
      cocina: "Buffet internacional",
      cuisine: "International buffet",
      carta: "Estaciones internacionales · Barra fría · Panadería artesanal · Opciones saludables",
      menu: "International stations · Cold bar · Artisan bakery · Healthy options",
      horario: "Desayuno 07:00 - 10:30 h · Almuerzo 12:30 - 15:30 h · Cena 18:30 - 22:00 h",
      vestimenta: "Informal",
      dressCode: "Casual",
      reservas: false,
      especialidades: "Estaciones de cocina internacional, noches temáticas (española, mexicana, asiática e italiana), barra fría, panadería artesanal y opciones saludables",
      specialties: "International cuisine stations, theme nights (Spanish, Mexican, Asian and Italian), cold bar, artisan bakery and healthy options",
      hotel: "Iberostar Paraíso del Mar"
    },
    "la-plaza": {
      tipo: "buffet",
      cocina: "Buffet internacional",
      cuisine: "International buffet",
      carta: "Estaciones internacionales · Barra fría · Panadería artesanal · Opciones saludables",
      menu: "International stations · Cold bar · Artisan bakery · Healthy options",
      horario: "Desayuno 07:00 - 10:30 h · Almuerzo 12:30 - 15:30 h · Cena 18:30 - 22:00 h",
      vestimenta: "Informal",
      dressCode: "Casual",
      reservas: false,
      especialidades: "Estaciones de cocina internacional, noches temáticas (española, mexicana, asiática e italiana), barra fría, panadería artesanal y opciones saludables",
      specialties: "International cuisine stations, theme nights (Spanish, Mexican, Asian and Italian), cold bar, artisan bakery and healthy options",
      hotel: "Iberostar Paraíso Beach"
    },
    "la-hacienda": {
      tipo: "especialidad",
      cocina: "Tradicional Mexicana",
      cuisine: "Traditional Mexican",
      carta: "Sopa azteca con queso y aguacate · Cochinita pibil en hoja de plátano · Pollo en mole poblano · Churros tradicionales con cajeta",
      menu: "Aztec soup with cheese and avocado · Cochinita pibil in banana leaf · Chicken in poblano mole · Traditional churros with cajeta",
      horario: "18:30 - 22:00 h",
      vestimenta: "Informal elegante",
      dressCode: "Smart casual",
      reservas: true,
      especialidades: "Sopa azteca con queso y aguacate, cochinita pibil en hoja de plátano, pollo en mole poblano y churros tradicionales con cajeta",
      specialties: "Aztec soup with cheese and avocado, cochinita pibil in banana leaf, chicken in poblano mole and traditional churros with cajeta",
      hotel: "Iberostar Paraíso del Mar"
    },
    trattoria: {
      id: "trattoria",
      name: "Trattoria / El Fogón",
      tipo: "especialidad",
      cocina: "Italiana Tradicional & Pizzería",
      cuisine: "Traditional Italian & Pizzeria",
      carta: "Pizza artesanal al horno de piedra · Lasaña boloñesa al gratín · Linguini ai frutti di mare · Panna cotta de frutos rojos",
      menu: "Stone-oven artisan pizza · Bolognese lasagna au gratin · Linguini ai frutti di mare · Red fruit panna cotta",
      horario: "18:00 - 22:00 h",
      hours: "18:00 - 22:00 h",
      horarioTexto: "18:00 - 22:00 h",
      vestimenta: "Informal elegante",
      dressCode: "Informal elegante",
      reservas: true,
      reservation: true,
      especialidades: "Pizza artesanal al horno de piedra, Lasaña boloñesa al gratín, Linguini ai frutti di mare y Panna cotta de frutos rojos",
      specialties: "Stone-oven artisan pizza, Bolognese lasagna au gratin, Linguini ai frutti di mare and Red fruit panna cotta",
      signatureDishes: [
        "Pizza artesanal al horno de piedra",
        "Lasaña boloñesa al gratín",
        "Linguini ai frutti di mare",
        "Panna cotta de frutos rojos"
      ],
      hotel: "Iberostar Waves Paraíso Beach"
    },
    "el-puerto": {
      tipo: "especialidad",
      cocina: "Mariscos y pescados",
      cuisine: "Seafood and fish",
      dressCode: "Informal elegante",
      reservation: "Recomendada",
      hours: "18:30 - 22:00",
      horarioTexto: "18:30 - 22:00 h",
      hotel: "Iberostar Paraíso Lindo",
      carta: "Ceviche · Pulpo a la parrilla · Pescado a la veracruzana · Camarones al ajillo · Paella",
      menu: "Ceviche · Grilled octopus · Veracruz-style fish · Garlic shrimp · Paella"
    },
    "beach-grill": {
      tipo: "cafeteria",
      cocina: "Grill y snacks",
      cuisine: "Grill and snacks",
      dressCode: "Informal",
      reservation: "No requerida",
      hours: "12:00 - 16:00 · 16:00 - 23:00",
      horarioTexto: "Comida 12:00 - 16:00 h · Tarde 16:00 - 23:00 h",
      hotel: "Iberostar Paraíso Lindo",
      carta: "Hamburguesas · Hot dogs · Nachos · Ensaladas · Helados",
      menu: "Burgers · Hot dogs · Nachos · Salads · Ice cream"
    },
    burgers: {
      tipo: "cafeteria",
      cocina: "Hamburguesas gourmet",
      cuisine: "Gourmet burgers",
      dressCode: "Informal",
      reservation: "No requerida",
      hours: "11:00 - 17:00",
      horarioTexto: "11:00 - 17:00 h",
      hotel: "Iberostar Paraíso Lindo",
      carta: "Hamburguesa clásica · Hamburguesa de pollo · Hamburguesa vegetariana · Papas fritas · Malteadas",
      menu: "Classic burger · Chicken burger · Vegetarian burger · French fries · Milkshakes"
    },
    "antojitos-tacos": {
      tipo: "cafeteria",
      cocina: "Antojitos mexicanos",
      cuisine: "Mexican snacks",
      dressCode: "Informal",
      reservation: "No requerida",
      hours: "10:00 - 18:00",
      horarioTexto: "10:00 - 18:00 h",
      hotel: "Iberostar Paraíso Lindo",
      carta: "Tacos · Quesadillas · Nachos · Elotes · Churros",
      menu: "Tacos · Quesadillas · Nachos · Corn on the cob · Churros"
    },
    crepes: {
      tipo: "cafeteria",
      cocina: "Crepas dulces y saladas",
      cuisine: "Sweet and savory crepes",
      dressCode: "Informal",
      reservation: "No requerida",
      hours: "11:00 - 22:00",
      horarioTexto: "11:00 - 22:00 h",
      hotel: "Iberostar Paraíso Lindo",
      carta: "Crepa de Nutella · Crepa de fresa · Crepa de jamón y queso · Waffles · Helados",
      menu: "Nutella crepe · Strawberry crepe · Ham and cheese crepe · Waffles · Ice cream"
    },
    "el-museo": {
      tipo: "especialidad",
      cocina: "Cocina Gourmet",
      cuisine: "Gourmet cuisine",
      carta: "Carpaccio de res con parmesano y rúcula · Filete mignon a las tres pimientas · Lomo de salmón confitado · Fondente de chocolate con helado de vainilla",
      menu: "Beef carpaccio with parmesan and arugula · Peppercorn filet mignon · Confit salmon loin · Chocolate fondant with vanilla ice cream",
      horario: "18:30 - 22:00 h",
      vestimenta: "Formal elegante",
      dressCode: "Formal elegant",
      reservas: true,
      especialidades: "Carpaccio de res con parmesano y rúcula, filete mignon a las tres pimientas, lomo de salmón confitado y fondente de chocolate con helado de vainilla",
      specialties: "Beef carpaccio with parmesan and arugula, peppercorn filet mignon, confit salmon loin and chocolate fondant with vanilla ice cream",
      hotel: "Iberostar Paraíso Lindo"
    },
    jambalaya: {
      tipo: "solo_cena",
      cocina: "Criolla y Cajún",
      cuisine: "Creole and Cajun",
      carta: "Arroz jambalaya con mariscos · Costillas glaseadas estilo cajún · Gumbo tradicional · Tarta de nuez pecana",
      menu: "Seafood jambalaya rice · Cajun-style glazed ribs · Traditional gumbo · Pecan pie",
      horario: "18:00 - 22:00 h",
      vestimenta: "Informal elegante",
      dressCode: "Smart casual",
      reservas: true,
      especialidades: "Arroz jambalaya con mariscos, costillas glaseadas estilo cajún, gumbo tradicional y tarta de nuez pecana",
      specialties: "Seafood jambalaya rice, Cajun-style glazed ribs, traditional gumbo and pecan pie",
      hotel: "Iberostar Paraíso Lindo"
    },
    "la-pagoda": {
      tipo: "buffet",
      cocina: "Buffet internacional",
      cuisine: "International buffet",
      carta: "Estaciones internacionales · Barra fría · Panadería artesanal · Opciones saludables",
      menu: "International stations · Cold bar · Artisan bakery · Healthy options",
      horario: "Desayuno 07:00 - 10:30 h · Almuerzo 12:30 - 15:30 h · Cena 18:30 - 22:00 h",
      vestimenta: "Informal",
      dressCode: "Casual",
      reservas: false,
      especialidades: "Estaciones de cocina internacional, noches temáticas (española, mexicana, asiática e italiana), barra fría, panadería artesanal y opciones saludables",
      specialties: "International cuisine stations, theme nights (Spanish, Mexican, Asian and Italian), cold bar, artisan bakery and healthy options",
      hotel: "Iberostar Paraíso Maya"
    },
    "el-fogon-steak": {
      tipo: "especialidad",
      cocina: "Steakhouse",
      cuisine: "Steakhouse",
      dressCode: "Informal elegante",
      reservation: "Recomendada",
      hours: "18:30 - 22:00",
      horarioTexto: "18:30 - 22:00 h",
      hotel: "Iberostar Paraíso Maya",
      carta: "Ribeye · New York strip · Filete mignon · Costillas BBQ · Papas al horno",
      menu: "Ribeye · New York strip · Filet mignon · BBQ ribs · Oven-baked potatoes"
    },
    "el-fogon-italiano": {
      tipo: "especialidad",
      cocina: "Cocina italiana",
      cuisine: "Italian cuisine",
      dressCode: "Informal elegante",
      reservation: "Recomendada",
      hours: "18:30 - 22:00",
      horarioTexto: "18:30 - 22:00 h",
      hotel: "Iberostar Paraíso Maya",
      carta: "Pizza · Pasta · Risotto · Osso buco · Tiramisú",
      menu: "Pizza · Pasta · Risotto · Osso buco · Tiramisú"
    },
    "coco-buffet": {
      tipo: "buffet",
      cocina: "Buffet internacional",
      cuisine: "International buffet",
      dressCode: "Informal",
      reservation: "No requerida",
      hours: "07:00 - 10:30 · 12:30 - 15:30 · 18:30 - 22:00",
      horarioTexto: "Desayuno 07:00 - 10:30 h · Comida 12:30 - 15:30 h · Cena 18:30 - 22:00 h",
      hotel: "Iberostar Paraíso Maya",
      carta: "Buffet de desayuno · Comida internacional · Estación de tacos · Grill · Postres",
      menu: "Breakfast buffet · International food · Taco station · Grill · Desserts"
    },
    "el-rancho": {
      tipo: "especialidad",
      cocina: "Cocina mexicana",
      cuisine: "Mexican cuisine",
      dressCode: "Informal elegante",
      reservation: "Recomendada",
      hours: "18:30 - 22:00",
      horarioTexto: "18:30 - 22:00 h",
      hotel: "Iberostar Paraíso Maya",
      carta: "Tacos al pastor · Mole · Cochinita pibil · Quesadillas · Flan",
      menu: "Al pastor tacos · Mole · Cochinita pibil · Quesadillas · Flan"
    },
    "la-geisha": {
      tipo: "especialidad",
      cocina: "Cocina japonesa",
      cuisine: "Japanese cuisine",
      dressCode: "Informal elegante",
      reservation: "Recomendada",
      hours: "18:30 - 22:00",
      horarioTexto: "18:30 - 22:00 h",
      hotel: "Iberostar Paraíso Maya",
      carta: "Sushi · Sashimi · Teppanyaki · Ramen · Tempura",
      menu: "Sushi · Sashimi · Teppanyaki · Ramen · Tempura"
    },
    letoile: {
      tipo: "especialidad",
      cocina: "Cocina francesa",
      cuisine: "French cuisine",
      dressCode: "Formal",
      reservation: "Recomendada",
      hours: "18:30 - 22:00",
      horarioTexto: "18:30 - 22:00 h",
      hotel: "Iberostar Paraíso Maya",
      carta: "Foie gras · Magret de pato · Bouillabaisse · Crème brûlée · Vinos franceses",
      menu: "Foie gras · Duck magret · Bouillabaisse · Crème brûlée · French wines"
    },
    "la-marina": {
      tipo: "especialidad",
      cocina: "Mariscos y pescados",
      cuisine: "Seafood and fish",
      carta: "Mariscos frescos · Pescados a la plancha · Ostras · Paella de mariscos · Selección de vinos blancos",
      menu: "Fresh seafood · Grilled fish · Oysters · Seafood paella · White wine selection",
      horario: "18:30 - 22:00 h",
      vestimenta: "Elegante casual",
      dressCode: "Elegant casual",
      reservas: true,
      especialidades: "Mariscos frescos, pescados a la plancha, ostras y paella de mariscos",
      specialties: "Fresh seafood, grilled fish, oysters and seafood paella",
      hotel: "Iberostar Paraíso Maya"
    },
    "el-tapatio": {
      id: "el-tapatio",
      name: "El Tapatío",
      tipo: "especialidad",
      cocina: "Tradicional de Jalisco y el Bajío",
      cuisine: "Traditional from Jalisco and Bajío",
      carta: "Tacos de arrachera al comal · Pozole blanco tradicional con guarnición · Enchiladas potosinas artesanales · Buñuelos con miel de piloncillo",
      menu: "Skirt steak tacos on comal · Traditional white pozole with garnish · Artisan potosinas enchiladas · Piloncillo honey buñuelos",
      horario: "18:30 - 22:00 h",
      hours: "18:30 - 22:00 h",
      horarioTexto: "18:30 - 22:00 h",
      vestimenta: "Informal elegante",
      dressCode: "Informal elegante",
      reservas: true,
      reservation: true,
      especialidades: "Tacos de arrachera al comal, Pozole blanco tradicional con guarnición, Enchiladas potosinas artesanales y Buñuelos con miel de piloncillo",
      specialties: "Comal skirt steak tacos, traditional white pozole with garnish, artisan potosinas enchiladas and piloncillo honey buñuelos",
      signatureDishes: [
        "Tacos de arrachera al comal",
        "Pozole blanco tradicional con guarnición",
        "Enchiladas potosinas artesanales",
        "Buñuelos con miel de piloncillo"
      ],
      hotel: "Iberostar Selection Paraíso Maya"
    },
    venecia: {
      tipo: "especialidad",
      cocina: "Italiana Tradicional",
      cuisine: "Traditional Italian",
      carta: "Ossobuco alla milanese · Risotto con boletus y aceite de trufa blanca · Raviolis artesanales de ricotta y espinacas · Tiramisú clásico",
      menu: "Milanese ossobuco · Porcini and white truffle oil risotto · Artisan ricotta and spinach ravioli · Classic tiramisu",
      horario: "18:30 - 22:00 h",
      vestimenta: "Formal elegante",
      dressCode: "Formal elegant",
      reservas: true,
      especialidades: "Ossobuco alla milanese, risotto con boletus y aceite de trufa blanca, raviolis artesanales de ricotta y espinacas, y tiramisú clásico",
      specialties: "Milanese ossobuco, porcini and white truffle oil risotto, artisan ricotta and spinach ravioli and classic tiramisu",
      hotel: "JOIA Paraíso by Iberostar"
    },
    bellavista: {
      tipo: "buffet",
      cocina: "Buffet internacional",
      cuisine: "International buffet",
      carta: "Estaciones internacionales · Barra fría · Panadería artesanal · Opciones saludables",
      menu: "International stations · Cold bar · Artisan bakery · Healthy options",
      horario: "Desayuno 07:00 - 10:30 h · Almuerzo 12:30 - 15:30 h · Cena 18:30 - 22:00 h",
      vestimenta: "Informal",
      dressCode: "Casual",
      reservas: false,
      especialidades: "Estaciones de cocina internacional, noches temáticas (española, mexicana, asiática e italiana), barra fría, panadería artesanal y opciones saludables",
      specialties: "International cuisine stations, theme nights (Spanish, Mexican, Asian and Italian), cold bar, artisan bakery and healthy options",
      hotel: "JOIA Paraíso by Iberostar"
    },
    latelier: {
      id: "latelier",
      name: "L'Atelier",
      tipo: "especialidad",
      cocina: "Alta Cocina Francesa de Autor",
      cuisine: "Signature French Haute Cuisine",
      carta: "Foie gras mi-cuit con reducción de oporto · Lenguado Meunière tradicional · Filete Chateaubriand con papas fondant · Soufflé clásico de Grand Marnier",
      menu: "Mi-cuit foie gras with port reduction · Traditional Meunière sole · Chateaubriand fillet with fondant potatoes · Classic Grand Marnier soufflé",
      horario: "18:30 - 22:00 h",
      hours: "18:30 - 22:00 h",
      horarioTexto: "18:30 - 22:00 h",
      vestimenta: "Formal elegante",
      dressCode: "Formal elegante",
      reservas: true,
      reservation: true,
      especialidades: "Foie gras mi-cuit con reducción de oporto, Lenguado Meunière tradicional, Filete Chateaubriand con papas fondant y Soufflé clásico de Grand Marnier",
      specialties: "Mi-cuit foie gras with port reduction, traditional Meunière sole, Chateaubriand fillet with fondant potatoes and classic Grand Marnier soufflé",
      signatureDishes: [
        "Foie gras mi-cuit con reducción de oporto",
        "Lenguado Meunière tradicional",
        "Filete Chateaubriand con papas fondant",
        "Soufflé clásico de Grand Marnier"
      ],
      hotel: "JOIA Paraíso by Iberostar"
    },
    tonis: {
      tipo: "especialidad",
      cocina: "Cocina internacional",
      cuisine: "International cuisine",
      dressCode: "Informal elegante",
      reservation: "Recomendada",
      hours: "18:30 - 22:00",
      horarioTexto: "18:30 - 22:00 h",
      hotel: "JOIA Paraíso by Iberostar",
      carta: "Filete · Salmón · Pasta · Ensaladas · Postres",
      menu: "Fillet · Salmon · Pasta · Salads · Desserts"
    },
    haiku: {
      tipo: "especialidad",
      cocina: "Cocina japonesa",
      cuisine: "Japanese cuisine",
      dressCode: "Informal elegante",
      reservation: "Recomendada",
      hours: "18:30 - 22:00",
      horarioTexto: "18:30 - 22:00 h",
      hotel: "JOIA Paraíso by Iberostar",
      carta: "Sushi · Sashimi · Teppanyaki · Ramen · Tempura",
      menu: "Sushi · Sashimi · Teppanyaki · Ramen · Tempura"
    },
    "la-brisa": {
      tipo: "especialidad",
      cocina: "Cocina mediterránea",
      cuisine: "Mediterranean cuisine",
      dressCode: "Informal elegante",
      reservation: "Recomendada",
      hours: "18:30 - 22:00",
      horarioTexto: "18:30 - 22:00 h",
      hotel: "JOIA Paraíso by Iberostar",
      carta: "Salmón · Camarones · Pasta · Ensaladas · Postres",
      menu: "Salmon · Shrimp · Pasta · Salads · Desserts"
    },
    "baby-kitchen": {
      id: "baby-kitchen",
      name: "Baby Kitchen",
      tipo: "cafeteria",
      cocina: "Área de Preparación Infantil 24h",
      cuisine: "24h Infant Food Prep Area",
      carta: "Purés y papillas orgánicas para bebés · Leche entera, deslactosada y vegetal · Fruta fresca seleccionada para triturar · Esterilizadores y microondas de libre uso",
      menu: "Organic purees and porridges for babies · Whole, lactose-free and plant-based milk · Fresh selected fruit for crushing · Sterilizers and microwaves for free use",
      horario: "Abierto 24 horas",
      hours: "Open 24 hours",
      horarioTexto: "Abierto 24 horas",
      vestimenta: "Informal",
      dressCode: "Informal",
      reservas: false,
      reservation: false,
      especialidades: "Purés y papillas orgánicas para bebés, Leche entera, deslactosada y vegetal, Fruta fresca seleccionada para triturar y Esterilizadores y microondas de libre uso",
      specialties: "Organic purees and porridges for babies, whole/lactose-free/plant-based milk, fresh selected fruit for crushing and sterilizers/microwaves for free use",
      signatureDishes: [
        "Purés y papillas orgánicas para bebés",
        "Leche entera, deslactosada y vegetal",
        "Fruta fresca seleccionada para triturar",
        "Esterilizadores y microondas de libre uso"
      ],
      hotel: "Paraíso Maya & Paraíso Lindo"
    },
    "el-rancho-tonis": {
      id: "el-rancho-tonis",
      name: "El Rancho",
      tipo: "especialidad",
      cocina: "Steak House",
      cuisine: "Steak House",
      carta: "Cortes premium · Ribeye · T-Bone · Costillas · Entradas tradicionales",
      menu: "Premium cuts · Ribeye · T-Bone · Ribs · Traditional starters",
      horario: "18:30 - 22:00 h",
      hours: "18:30 - 22:00 h",
      horarioTexto: "18:30 - 22:00 h",
      vestimenta: "Informal elegante",
      dressCode: "Informal elegante",
      reservas: true,
      reservation: true,
      especialidades: "Cortes premium, Ribeye, T-Bone, costillas y entradas tradicionales",
      specialties: "Premium cuts, Ribeye, T-Bone, ribs and traditional starters",
      signatureDishes: [
        "Cortes premium",
        "Ribeye",
        "T-Bone",
        "Costillas"
      ],
      hotel: "Iberostar Selection Paraíso Lindo"
    },
    "snack-beach-grill": {
      id: "snack-beach-grill",
      name: "Beach Grill & Tacos",
      tipo: "cafeteria",
      cocina: "Snacks, Tacos al Pastor y Parrilla",
      cuisine: "Snacks, Al Pastor Tacos and Grill",
      carta: "Tacos al pastor al comal con piña asada · Hamburguesas a la parrilla con papas fritas · Ceviche fresco de pescado al cilantro · Crepas dulces y helados artesanales",
      menu: "Comal al pastor tacos with grilled pineapple · Grilled burgers with french fries · Fresh cilantro fish ceviche · Sweet crepes and artisan ice cream",
      horario: "11:30 - 17:30 h",
      hours: "11:30 - 17:30 h",
      horarioTexto: "11:30 - 17:30 h",
      vestimenta: "Playero / Informal",
      dressCode: "Playero / Informal",
      reservas: false,
      reservation: false,
      especialidades: "Tacos al pastor al comal con piña asada, Hamburguesas a la parrilla con papas fritas, Ceviche fresco de pescado al cilantro y Crepas dulces y helados artesanales",
      specialties: "Comal al pastor tacos with grilled pineapple, grilled burgers with french fries, fresh cilantro fish ceviche and sweet crepes with artisan ice cream",
      signatureDishes: [
        "Tacos al pastor al comal con piña asada",
        "Hamburguesas a la parrilla con papas fritas",
        "Ceviche fresco de pescado al cilantro",
        "Crepas dulces y helados artesanales"
      ],
      hotel: "Playa Paraíso (Área de Playa y Albercas)"
    },
  };

  // --- Bares ---------------------------------------------------------------
  const BARES = {
    "sports-bar-corner": { tipo: "bar", cocina: "Sports bar", cuisine: "Sports bar", carta: "Antojitos · Hamburguesas · Wings · Cerveza · Snacks", menu: "Mexican snacks · Burgers · Wings · Beer · Snacks" },
    // "heladeria-el-puente" consolidado: es el mismo lugar que "bar-el-puente"
    // "heladeria-el-mirador" consolidado: es el mismo lugar que "lobby-bar-el-mirador" (JOIA)
    "star-rock-cafe": { tipo: "bar_cierre_temprano", cocina: "Café y repostería", cuisine: "Coffee and pastry", carta: "Café de especialidad · Repostería · Bagels · Smoothies", menu: "Specialty coffee · Pastry · Bagels · Smoothies" },
    "pool-bar-las-olas": { tipo: "bar", cocina: "Bar de piscina", cuisine: "Pool bar", carta: "Cócteles · Bucket de cerveza · Botella de agua · Snacks", menu: "Cocktails · Beer bucket · Water bottle · Snacks" },
    "lobby-bar-kukulkan": { tipo: "bar", cocina: "Lobby bar", cuisine: "Lobby bar", carta: "Coctelería de autor · Whisky · Aperitivos", menu: "Signature cocktails · Whisky · Appetizers" },
    "music-bar-rhapsody": { tipo: "bar", cocina: "Music bar", cuisine: "Music bar", carta: "Coctelería · Cervezas de autor · Snacks · Música en vivo", menu: "Cocktails · Craft beers · Snacks · Live music" },
    "lobby-bar-el-mirador": { tipo: "bar", cocina: "Lobby bar", cuisine: "Lobby bar", carta: "Coctelería · Vinos tintos · Tabla de quesos", menu: "Cocktails · Red wines · Cheese board" },
    "aqua-bar-la-sirenita": { tipo: "bar", cocina: "Aqua bar", cuisine: "Aqua bar", carta: "Smoothies y jugos · Coctelería sin alcohol · Snacks", menu: "Smoothies and juices · Non-alcoholic cocktails · Snacks" },
    "health-bar-spa": { tipo: "bar_cierre_temprano", cocina: "Health bar", cuisine: "Health bar", carta: "Bowls · Zumos prensados · Ensaladas · Infusiones", menu: "Bowls · Cold-pressed juices · Salads · Infusions" },
    "aqua-bar-la-perla": { tipo: "bar", cocina: "Aqua bar", cuisine: "Aqua bar", carta: "Smoothies y jugos · Coctelería sin alcohol · Snacks", menu: "Smoothies and juices · Non-alcoholic cocktails · Snacks" },
    "bar-teatro": { tipo: "bar", cocina: "Bar de teatro", cuisine: "Theater bar", carta: "Aperitivos · Coctelería · Cervezas · Antes de la función", menu: "Appetizers · Cocktails · Beers · Before the show" },
    "lobby-bar-la-fuente": { tipo: "bar", cocina: "Lobby bar", cuisine: "Lobby bar", carta: "Coctelería de temporada · Aperitivos", menu: "Seasonal cocktails · Appetizers" },
    "aqua-bar-las-olas": { tipo: "bar", cocina: "Aqua bar", cuisine: "Aqua bar", carta: "Smoothies y jugos · Coctelería sin alcohol · Snacks", menu: "Smoothies and juices · Non-alcoholic cocktails · Snacks" },
    "lobby-bar-la-cula": { tipo: "bar", cocina: "Lobby bar", cuisine: "Lobby bar", carta: "Coctelería de autor · Highballs", menu: "Signature cocktails · Highballs" },
    "aqua-bar-las-rocas": { tipo: "bar", cocina: "Aqua bar", cuisine: "Aqua bar", carta: "Smoothies y jugos · Coctelería sin alcohol · Snacks", menu: "Smoothies and juices · Non-alcoholic cocktails · Snacks" },
    "lobby-bar-acuario": { tipo: "bar", cocina: "Lobby bar", cuisine: "Lobby bar", carta: "Coctelería · Vinos · Aperitivos", menu: "Cocktails · Wines · Appetizers" },
    "cigar-bar": { tipo: "bar_cierre_temprano", cocina: "Cigar bar", cuisine: "Cigar bar", carta: "Cigarros premium · Whisky y ron añejo · Quesos · Café", menu: "Premium cigars · Aged whisky and rum · Cheeses · Coffee" }
  };

  // --- Spa, golf y otros servicios ----------------------------------------
  const SERVICIOS = {
    spa: {
      name: "Spa Sensations",
      nameEn: "Spa Sensations",
      hours: "08:00 - 20:00",
      horarioTexto: "08:00 - 20:00 h",
      hydrotherapyCircuit: [
        "Piscina dinámica de relajación con cascadas, cuellos de cisne y chorros de masaje corporal subacuático",
        "Baño turco de vapor, sauna finlandesa, pozo de agua fría de contraste, pediluvio y zona de descanso con camas térmicas de cerámica"
      ],
      hydrotherapyCircuitEn: [
        "Relaxing dynamic pool with waterfalls, swan necks and underwater body massage jets",
        "Turkish steam bath, Finnish sauna, contrast cold water pool, foot bath and rest area with ceramic thermal beds"
      ],
      treatments: "Masaje Relajante Aromático (50 / 80 min) · Masaje de Tejido Profundo - Deep Tissue (50 / 80 min) · Ritual Corporal de Sales Marinas y Coco (80 min) · Facial Hidratante Iluminador Post-Solar (50 min)",
      treatmentsEn: "Aromatic Relaxing Massage (50 / 80 min) · Deep Tissue Massage (50 / 80 min) · Sea Salt and Coconut Body Ritual (80 min) · Post-Sun Hydrating Illuminating Facial (50 min)",
      treatmentsList: [
        { name: "Masaje Relajante Aromático", nameEn: "Aromatic Relaxing Massage", duration: "50 / 80 min", description: "Terapia antiestrés con aceites esenciales botánicos para liberar tensión física", descriptionEn: "Anti-stress therapy with botanical essential oils to release physical tension" },
        { name: "Masaje de Tejido Profundo - Deep Tissue", nameEn: "Deep Tissue Massage", duration: "50 / 80 min", description: "Presión moderada a intensa enfocada en contracturas y sobrecarga muscular", descriptionEn: "Moderate to intense pressure focused on contractures and muscle overload" },
        { name: "Ritual Corporal de Sales Marinas y Coco", nameEn: "Sea Salt and Coconut Body Ritual", duration: "80 min", description: "Exfoliación regeneradora con sales naturales seguida de envoltura hidratante y masaje relajante", descriptionEn: "Regenerating exfoliation with natural salts followed by hydrating wrap and relaxing massage" },
        { name: "Facial Hidratante Iluminador Post-Solar", nameEn: "Post-Sun Hydrating Illuminating Facial", duration: "50 min", description: "Limpieza suave y nutrición antioxidante profunda para pieles expuestas al sol del Caribe", descriptionEn: "Gentle cleansing and deep antioxidant nutrition for skin exposed to Caribbean sun" }
      ],
      packages: "Paquete Maya Renewal (2 h con desayuno) · Paquete Escape de medio día · Paquete Relax para dos",
      packagesEn: "Maya Renewal Package (2 h with breakfast) · Half Day Escape Package · Relax Package for two"
    },
    "massage-palapa": {
      hours: "09:00 - 18:00",
      treatments: "Masaje de pies 30 min · Masaje relajante 60 min · Masaje tailandés 90 min",
      treatmentsEn: "30 min foot massage · 60 min relaxing massage · 90 min Thai massage",
      packages: "Paquete Palapa para dos · Paquete de Spa de 60 minutos",
      packagesEn: "Palapa Package for two · 60 min Spa Package"
    },
    "golf-club-house": {
      hours: "07:00 - 18:00",
      packages: "Green fee de 18 hoyos · Alquiler de equipo · Clases privadas con profesional · Paquete golf con desayuno y asesor",
      packagesEn: "18-hole green fee · Equipment rental · Private lessons with professional · Golf package with breakfast and advisor"
    },
    golf: {
      course: "Iberostar Playa Paraíso Golf Club",
      designer: "P.B. Dye (18 hoyos, Par 72)",
      description: "Campo 18 hoyos de campeonato, Par 72, diseñado por P.B. Dye. Trazado integrado en la selva maya con desniveles naturales y greenes de césped Paspalum.",
      descriptionEn: "18-hole championship course, Par 72, designed by P.B. Dye. Layout integrated into the Mayan jungle with natural undulations and Paspalum grass greens.",
      hours: "07:00 h al atardecer",
      horarioTexto: "Primer tee time a partir de las 07:00 h hasta el atardecer",
      services: [
        "Campo de prácticas (driving range), putting green y chipping green",
        "Carrito de golf incluido en la ronda y servicio de bebidas/snacks todo incluido durante el recorrido",
        "Renta de bastones de gama alta y tienda Pro Shop con artículos deportivos y prendas oficiales"
      ],
      servicesEn: [
        "Driving range, putting green and chipping green",
        "Golf cart included in the round and all-inclusive drinks/snacks service during the course",
        "High-end club rental and Pro Shop with sports items and official garments"
      ],
      packages: "Green fee de 18 hoyos · Alquiler de equipo · Clases privadas con profesional · Paquete golf con desayuno y asesor",
      packagesEn: "18-hole green fee · Equipment rental · Private lessons with professional · Golf package with breakfast and advisor"
    },
    piscina: {
      hours: "07:00 - 22:00"
    },
    theclub: {
      hours: "08:00 - 22:00",
      horarioTexto: "08:00 - 22:00",
      amenities: "Wi-Fi de alta velocidad, áreas de descanso, terraza, prensa digital, bebidas y snacks",
      amenidades: "Wi-Fi de alta velocidad, áreas de descanso, terraza, prensa digital, bebidas y snacks",
      amenitiesEn: "High-speed Wi-Fi, rest areas, terrace, digital press, drinks and snacks",
      services: "Concierge personalizado, bebidas premium, reservas prioritarias, acceso a áreas exclusivas",
      servicios: "Concierge personalizado, bebidas premium, reservas prioritarias, acceso a áreas exclusivas",
      servicesEn: "Personalized concierge, premium drinks, priority reservations, access to exclusive areas",
      description: "Espacio exclusivo para socios donde usted disfruta de atención personalizada, ambientes cálidos y experiencias preferentes en el corazón del complejo.",
      descripcion: "Espacio exclusivo para socios donde usted disfruta de atención personalizada, ambientes cálidos y experiencias preferentes en el corazón del complejo.",
      descriptionEn: "Exclusive space for members where you enjoy personalized attention, warm environments and preferred experiences in the heart of the complex."
    },
    "star-prestige-lounge": {
      hours: "09:00 - 21:00",
      horarioTexto: "09:00 - 21:00",
      amenities: "Áreas de descanso, terraza, Wi-Fi, prensa digital, bebidas y snacks",
      amenidades: "Áreas de descanso, terraza, Wi-Fi, prensa digital, bebidas y snacks",
      amenitiesEn: "Rest areas, terrace, Wi-Fi, digital press, drinks and snacks",
      services: "Concierge personalizado, bebidas premium, reservas prioritarias, acceso a áreas exclusivas",
      servicios: "Concierge personalizado, bebidas premium, reservas prioritarias, acceso a áreas exclusivas",
      servicesEn: "Personalized concierge, premium drinks, priority reservations, access to exclusive areas",
      description: "Salón exclusivo Star Prestige donde usted descansa con calidez, disfruta de bebidas premium y recibe atención personalizada en un ambiente reservado.",
      descripcion: "Salón exclusivo Star Prestige donde usted descansa con calidez, disfruta de bebidas premium y recibe atención personalizada en un ambiente reservado.",
      descriptionEn: "Exclusive Star Prestige lounge where you rest with warmth, enjoy premium drinks and receive personalized attention in a reserved environment."
    },
    "star-prestige-beach-club": {
      hours: "09:00 - 21:00",
      horarioTexto: "09:00 - 21:00",
      amenities: "Áreas de descanso, terraza, Wi-Fi, prensa digital, bebidas y snacks",
      amenidades: "Áreas de descanso, terraza, Wi-Fi, prensa digital, bebidas y snacks",
      amenitiesEn: "Rest areas, terrace, Wi-Fi, digital press, drinks and snacks",
      services: "Concierge personalizado, bebidas premium, reservas prioritarias, acceso a áreas exclusivas",
      servicios: "Concierge personalizado, bebidas premium, reservas prioritarias, acceso a áreas exclusivas",
      servicesEn: "Personalized concierge, premium drinks, priority reservations, access to exclusive areas",
      description: "Área exclusiva frente al mar donde usted disfruta de confort, servicio atento y experiencias preferentes en un entorno cálido y distinguido.",
      descripcion: "Área exclusiva frente al mar donde usted disfruta de confort, servicio atento y experiencias preferentes en un entorno cálido y distinguido.",
      descriptionEn: "Exclusive oceanfront area where you enjoy comfort, attentive service and preferred experiences in a warm and distinguished environment."
    },
    "star-prestige-maya": {
      hours: "09:00 - 21:00",
      horarioTexto: "09:00 - 21:00",
      amenities: "Áreas de descanso, terraza, Wi-Fi, prensa digital, bebidas y snacks",
      amenidades: "Áreas de descanso, terraza, Wi-Fi, prensa digital, bebidas y snacks",
      amenitiesEn: "Rest areas, terrace, Wi-Fi, digital press, drinks and snacks",
      services: "Concierge personalizado, bebidas premium, reservas prioritarias, acceso a áreas exclusivas",
      servicios: "Concierge personalizado, bebidas premium, reservas prioritarias, acceso a áreas exclusivas",
      servicesEn: "Personalized concierge, premium drinks, priority reservations, access to exclusive areas",
      description: "Área exclusiva Star Prestige en Paraíso Maya donde usted accede a servicios preferentes, ambientes cálidos y atención personalizada durante su estancia.",
      descripcion: "Área exclusiva Star Prestige en Paraíso Maya donde usted accede a servicios preferentes, ambientes cálidos y atención personalizada durante su estancia.",
      descriptionEn: "Exclusive Star Prestige area in Paraíso Maya where you access preferred services, warm environments and personalized attention during your stay."
    },
    "star-prestige-joia": {
      hours: "09:00 - 21:00",
      horarioTexto: "09:00 - 21:00",
      amenities: "Áreas de descanso, terraza, Wi-Fi, prensa digital, bebidas y snacks",
      amenidades: "Áreas de descanso, terraza, Wi-Fi, prensa digital, bebidas y snacks",
      amenitiesEn: "Rest areas, terrace, Wi-Fi, digital press, drinks and snacks",
      services: "Concierge personalizado, bebidas premium, reservas prioritarias, acceso a áreas exclusivas",
      servicios: "Concierge personalizado, bebidas premium, reservas prioritarias, acceso a áreas exclusivas",
      servicesEn: "Personalized concierge, premium drinks, priority reservations, access to exclusive areas",
      description: "Área exclusiva Star Prestige en JOIA donde usted disfruta de lujo, servicio atento y experiencias preferentes en un entorno cálido y distinguido.",
      descripcion: "Área exclusiva Star Prestige en JOIA donde usted disfruta de lujo, servicio atento y experiencias preferentes en un entorno cálido y distinguido.",
      descriptionEn: "Exclusive Star Prestige area in JOIA where you enjoy luxury, attentive service and preferred experiences in a warm and distinguished environment."
    }
  };

  // --- Actividades del día -------------------------------------------------
  // Programa diario oficial del complejo.
  const ACTIVIDADES = [
    { hora: "08:30", nombre: "Yoga matutino frente al mar", nombreEn: "Morning yoga facing the sea", lugar: "Playa Paraíso", poiId: "playa-mar-caribe", grupo: "Fit & Fun" },
    { hora: "10:30", nombre: "Star Camp: Taller Mini Chef y Huerto", nombreEn: "Star Camp: Mini Chef Workshop and Garden", lugar: "Star Camp", poiId: "starcamp", grupo: "Star Camp · Dolphin (8 a 12 años)" },
    { hora: "11:30", nombre: "Aqua Gym y Ritmos Caribeños", nombreEn: "Aqua Gym and Caribbean Rhythms", lugar: "Piscina Principal", poiId: "activities-pool", grupo: "Fit & Fun" },
    { hora: "15:00", nombre: "Torneo de Vóley de Playa", nombreEn: "Beach Volleyball Tournament", lugar: "Playa Paraíso", poiId: "playa-mar-caribe", grupo: "Fit & Fun" },
    { hora: "16:30", nombre: "Clínica de Tiro con Arco y Tenis", nombreEn: "Archery and Tennis Clinic", lugar: "Área Deportiva", poiId: "tennis", grupo: "Fit & Fun" },
    { hora: "20:00", nombre: "Música en Vivo y Coctelería", nombreEn: "Live Music and Cocktails", lugar: "Lobby Bar Acuario", poiId: "lobby-bar-acuario", grupo: "Entretenimiento" },
    { hora: "21:30", nombre: "Espectáculo Nocturno Circense", nombreEn: "Night Circus Show", lugar: "Teatro Coliseo", poiId: "teatro-coliseo", grupo: "Espectáculos Nocturnos" }
  ];

  ACTIVIDADES.forEach(function (item) {
    item.fuente = "oficial";
    item.official = true;
  });

  datos.STAR_CAMP = [
    { rango: "Monkey (4 a 7 años)", actividades: "Manualidades sustentables, juegos en el parque acuático, búsqueda del tesoro y minidisco nocturna", actividadesEn: "Sustainable crafts, water park games, treasure hunt and night minidisco" },
    { rango: "Dolphin (8 a 12 años)", actividades: "Talleres culinarios Mini Chef, olimpiadas acuáticas y dinámicas interactivas del programa ambiental Wave of Change", actividadesEn: "Mini Chef culinary workshops, water Olympics and interactive dynamics of the Wave of Change environmental program" },
    { rango: "Eagle (13 a 17 años)", actividades: "Torneos de videojuegos, vóley de playa, futbol, billar y encuentros con música DJ", actividadesEn: "Video game tournaments, beach volleyball, soccer, billiards and DJ music meetups" }
  ];

  datos.FIT_FUN = [
    "Yoga y pilates matutino frente a la playa",
    "Aqua gym y zumba en la piscina principal",
    "Canchas de tenis, pádel y clínicas de tiro con arco",
    "Espectáculos Nocturnos: Shows diarios en el Teatro Coliseo y Teatro Music Hall a partir de las 21:30 h (producciones musicales, ballet folclórico mexicano y artes circenses)"
  ];

  datos.FIT_FUN_EN = [
    "Morning yoga and pilates on the beach",
    "Aqua gym and zumba in the main pool",
    "Tennis, padel courts and archery clinics",
    "Night Shows: Daily shows at Teatro Coliseo and Teatro Music Hall from 21:30 h (musical productions, Mexican folk ballet and circus arts)"
  ];

  datos.HORARIOS = HORARIOS;
  datos.RESTAURANTES = RESTAURANTES;
  datos.BARES = BARES;
  datos.SERVICIOS = SERVICIOS;
  datos.ACTIVIDADES = ACTIVIDADES;
  datos.ACTIVIDADES_FUENTE = "oficial";
  datos.ACTIVIDADES_OFICIAL = true;
  datos.ACTIVIDADES_NOTA = "Programa diario oficial del complejo.";
  window.RevistaDigital.datosComplejo = datos;
})();