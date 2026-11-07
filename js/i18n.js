(function () {
  window.RevistaDigital = window.RevistaDigital || {};

  const translations = {
    es: {
      siteTitle: "Iberostar | Destinos y hoteles",
      brandDestinations: "Destinos",
      continue: "Continuar",
      gateNote: "Después podrá cambiarlo desde el menú.",
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
      closeSearch: "Cerrar búsqueda",
      navDestinos: "Destinos",
      navMexico: "México",
      navJamaica: "Jamaica",
      navDominican: "República Dominicana",
      navBrazil: "Brasil",
      navLocation: "Usar mi ubicación",
      navExplore: "Explorar",
      navSearch: "Buscar",

      menuWorldMap: "Mapamundi",
      menuWorldMapD3: "Planisferio Interactivo (D3)",
      menuComplexMap: "Mapa del complejo Playa Paraíso",
      menuWorkspace: "Workspace",
      menuVideos: "Videos",
      menu360: "Contenido 360°",
      menuRestaurants: "Restaurantes",
      menuComplex: "Iberostar Playa Paraíso",
      menuGuia: "Guía interactiva",
      menuTransport: "Transporte",

      prevPage: "Página anterior",
      nextPage: "Página siguiente",
      home: "Inicio",
      viewHotel: "Ver ficha",
      viewDetails: "Ver detalles",
      back: "Volver",
      close: "Cerrar",
      searchPlaceholder: "Buscar por hotel, destino, categoría...",
      allFilters: "Todos",
      resultsCount: "hoteles encontrados",
      noResults: "No se encontraron hoteles.",
      exploreSection: "Explora secciones y servicios",
      rooms: "Habitaciones",
      pools: "Piscinas",
      restaurants: "Restaurantes",
      experiences: "Experiencias",
      locationStatusInitial: 'Use "Usar mi ubicación" para encontrar el hotel cercano o calcular una ruta.',
      mapTouchActivate: "Toque para mover el mapa",
      mapTouchLock: "Bloquear mapa",
      mapFullscreen: "Pantalla completa",
      mapExitFullscreen: "Salir del mapa",
      guideExpand: "Ampliar",
      guideExitExpand: "Volver",
      d3WorldMapNotice: "Explore la distribución global de la cadena Iberostar en nuestro mapa mundial interactivo.",
      openD3WorldMap: "Abrir Planisferio Interactivo",
      searchHotelsHeading: "Explorar catálogo de hoteles",
      searchFilterBrand: "Marca:",
      searchFilterCountry: "País:",
      cancelRoute: "Cancelar ruta",
      bookTable: "Reservar mesa",
      searchClose: "Cerrar búsqueda",
      searchExit: "ESC para salir",
      hotelIndustry: "Hotelería",
      previousCountry: "Ver país anterior",
      nextCountry: "Ver siguiente país",
      carouselRegion: "Carrusel de imágenes",
      carouselSelectImage: "Seleccionar imagen",
      carouselShowImage1: "Mostrar imagen 1",
      carouselShowImage2: "Mostrar imagen 2",
      carouselShowImage3: "Mostrar imagen 3",
      carouselShowImage4: "Mostrar imagen 4",
      carouselShowImage5: "Mostrar imagen 5",
      carouselShowImage6: "Mostrar imagen 6",
      languageGateTitle: "Elija su idioma",
      languageGateCountry: "Sugerencia según el idioma de su dispositivo",
      languageGateNote: "Después podrá cambiarlo desde el menú.",
      navBackToDestinations: "Volver a destinos",
      navBackToHome: "Volver al inicio",
      sectionContenido360: "Contenido 360°",
      sectionVideos: "Videos",
      sectionWorkspace: "Workspace",
      sectionMapaHoteles: "Mapa general de hoteles",
      areaAdministrativa: "Área administrativa",
      adminEmail: "Email",
      adminPassword: "Contraseña",
      adminEntrar: "Entrar",
      adminSalir: "Salir",
      adminConectado: "Conectado: ",
      adminSesionCerrada: "Sesión cerrada",
      adminEscribaEmail: "Escriba su email y contraseña.",
      adminNoInicioSesion: "No se pudo iniciar sesión: ",
      adminIniciaSesion: "Inicia sesión como administrador para ",
      adminCuentaAdmin: "Inicie sesión con una cuenta de administrador.",
      mapUbicacionPermiso: "Active el permiso de ubicación para calcular la ruta.",
      mapActualizandoUbicacion: "Estamos actualizando la ubicación de ese destino.",
      mapCalculandoRutaPie: "Calculando ruta a pie...",
      mapCalculandoRuta: "Calculando ruta...",
      carritoBuscando: "Buscando carrito…",
      carritoCalculando: "Calculando el más cercano",
      carritoTrazando: "Trazando la ruta por las calles…",
      carritoLeLleva: "Le lleva a ",
      carritoEnUnMomento: "En un momento arranca hacia ",
      carritoYaLlegoConUsted: "Ya está con usted en ",
      carritoDejoEnDestino: "El carrito le dejó en su destino. Que disfrute su visita.",
      carritoSolicitarOtro: "Solicitar otro carrito",
      carritoEnSuUbicacion: "Carrito en su ubicación",
      carritoEliminarSolicitud: "Eliminar solicitud",
      carritoCancelarViaje: "Cancelar viaje",
      carritoTRANSPORTE_DISPONIBLE: "TRANSPORTE DISPONIBLE",
      carritoDeseaMoverse: "¿Desea moverse por el complejo?",
      carritoSoliciteCarrito: "Solicite un carrito y vea en el mapa el más cercano viniendo hacia su ubicación, con el tiempo estimado de llegada.",
      carritoSU_TRANSPORTE_SOLICITADO: "SU TRANSPORTE HA SIDO SOLICITADO",
      carritoElCarritoVaHacia: "El carrito va hacia ",
      carritoYDespuesLeLlevaA: "y después le lleva a ",
      carritoLeNotificaremos: "Le notificaremos en cuanto un carrito acepte su solicitud.",
      carritoSOLICITUD_ACEPTADA: "SOLICITUD ACEPTADA",
      carritoTrazandoRutaHacia: "Trazando la ruta por las calles del complejo hasta ",
      carritoCARRITO_EN_SU_UBICACION: "CARRITO EN SU UBICACIÓN",
      carritoEN_RUTA_A_SU_DESTINO: "EN RUTA A SU DESTINO",
      carritoLLEGO_A_SU_DESTINO: "LLEGÓ A SU DESTINO",
      carritoCarritosCerca: "Carritos cerca de usted",
      carritoPosicionesSimuladas: "Posiciones y tiempos simulados para mostrar el servicio.",
      mapboxSuUbicacionExacta: "Su ubicación exacta",
      mapboxNoSePudoCargar: "No se pudo cargar el carrito del mapa.",
      breakfast: "Desayuno",
      lunch: "Comida",
      dinner: "Cena",
      late: "Bar",
      hours: "Horario",
      spa: "Spa",
      golf: "Golf",
      piscina: "Piscina",
      cafeteria: "Cafetería",
      bar: "Bar",
      especialidad: "Especialidad",
      solo_cena: "Solo cena",
      buffet: "Buffet",
      buffet_marina: "Buffet Marina",
      vestimenta: "Código de vestimenta",
      dressCode: "Código de vestimenta",
      reservas: "Reservas",
      reservation: "Reserva",
      especialidades: "Especialidades",
      signatureDishes: "Platos estrella",
      carta: "Carta",
      menu: "Menú",
      horario: "Horario",
      horarioTexto: "Horario",
      hotel: "Hotel",
      tipo: "Tipo",
      cocina: "Cocina",
      cuisine: "Cocina",
      cartaEn: "Carta"
    },
    en: {
      siteTitle: "Iberostar | Destinations & Hotels",
      brandDestinations: "Destinations",
      continue: "Continue",
      gateNote: "You can change it later from the menu.",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      closeSearch: "Close search",
      navDestinos: "Destinations",
      navMexico: "Mexico",
      navJamaica: "Jamaica",
      navDominican: "Dominican Republic",
      navBrazil: "Brazil",
      navLocation: "Use my location",
      navExplore: "Explore",
      navSearch: "Search",

      menuWorldMap: "World Map",
      menuWorldMapD3: "Interactive World Map (D3)",
      menuComplexMap: "Playa Paraíso Complex Map",
      menuWorkspace: "Workspace",
      menuVideos: "Videos",
      menu360: "360° Tours",
      menuRestaurants: "Restaurants",
      menuComplex: "Iberostar Playa Paraíso",
      menuGuia: "Interactive guide",
      menuTransport: "Transportation",

      prevPage: "Previous page",
      nextPage: "Next page",
      home: "Home",
      viewHotel: "View hotel",
      viewDetails: "View details",
      back: "Back",
      close: "Close",
      searchPlaceholder: "Search by hotel, destination, category...",
      allFilters: "All",
      resultsCount: "hotels found",
      noResults: "No hotels found matching your search.",
      exploreSection: "Explore sections and amenities",
      rooms: "Rooms",
      pools: "Pools",
      restaurants: "Restaurants",
      experiences: "Experiences",
      locationStatusInitial: 'Use "Use my location" to find nearby hotels or calculate a route.',
      mapTouchActivate: "Tap to move the map",
      mapTouchLock: "Lock map",
      mapFullscreen: "Full screen",
      mapExitFullscreen: "Exit map",
      guideExpand: "Expand",
      guideExitExpand: "Back",
      d3WorldMapNotice: "Explore the global footprint of Iberostar Hotels on our interactive world map.",
      openD3WorldMap: "Open Interactive World Map",
      searchHotelsHeading: "Explore hotel catalog",
      searchFilterBrand: "Brand:",
      searchFilterCountry: "Country:",
      cancelRoute: "Cancel route",
      bookTable: "Book a table",
      searchClose: "Close search",
      searchExit: "Press ESC to exit",
      hotelIndustry: "Hotels",
      previousCountry: "Previous country",
      nextCountry: "Next country",
      carouselRegion: "Image carousel",
      carouselSelectImage: "Select an image",
      carouselShowImage1: "Show image 1",
      carouselShowImage2: "Show image 2",
      carouselShowImage3: "Show image 3",
      carouselShowImage4: "Show image 4",
      carouselShowImage5: "Show image 5",
      carouselShowImage6: "Show image 6",
      languageGateTitle: "Choose your language",
      languageGateCountry: "Suggestion based on your device language",
      languageGateNote: "You can change it later from the menu.",
      navBackToDestinations: "Back to destinations",
      navBackToHome: "Back to home",
      sectionContenido360: "360° Content",
      sectionVideos: "Videos",
      sectionWorkspace: "Workspace",
      sectionMapaHoteles: "General hotel map",
      areaAdministrativa: "Administrative area",
      adminEmail: "Email",
      adminPassword: "Password",
      adminEntrar: "Log in",
      adminSalir: "Log out",
      adminConectado: "Connected: ",
      adminSesionCerrada: "Session closed",
      adminEscribaEmail: "Please enter your email and password.",
      adminNoInicioSesion: "Could not log in: ",
      adminIniciaSesion: "Log in as administrator to ",
      adminCuentaAdmin: "Log in with an administrator account.",
      mapUbicacionPermiso: "Enable location permission to calculate the route.",
      mapActualizandoUbicacion: "We are updating the location of that destination.",
      mapCalculandoRutaPie: "Calculating walking route...",
      mapCalculandoRuta: "Calculating route...",
      carritoBuscando: "Looking for cart…",
      carritoCalculando: "Calculating the nearest one",
      carritoTrazando: "Mapping route through streets…",
      carritoLeLleva: "It will take you to ",
      carritoEnUnMomento: "In a moment it will head to ",
      carritoYaLlegoConUsted: "It is already with you at ",
      carritoDejoEnDestino: "The cart dropped you off at your destination. Enjoy your visit.",
      carritoSolicitarOtro: "Request another cart",
      carritoEnSuUbicacion: "Cart at your location",
      carritoEliminarSolicitud: "Cancel request",
      carritoCancelarViaje: "Cancel trip",
      carritoTRANSPORTE_DISPONIBLE: "TRANSPORT AVAILABLE",
      carritoDeseaMoverse: "Want to move around the resort?",
      carritoSoliciteCarrito: "Request a cart and see on the map the nearest one coming to your location, with estimated arrival time.",
      carritoSU_TRANSPORTE_SOLICITADO: "YOUR TRANSPORT HAS BEEN REQUESTED",
      carritoElCarritoVaHacia: "The cart is heading to ",
      carritoYDespuesLeLlevaA: "and then will take you to ",
      carritoLeNotificaremos: "We will notify you as soon as a cart accepts your request.",
      carritoSOLICITUD_ACEPTADA: "REQUEST ACCEPTED",
      carritoTrazandoRutaHacia: "Tracing the route through the resort streets to ",
      carritoCARRITO_EN_SU_UBICACION: "CART AT YOUR LOCATION",
      carritoEN_RUTA_A_SU_DESTINO: "EN ROUTE TO YOUR DESTINATION",
      carritoLLEGO_A_SU_DESTINO: "ARRIVED AT YOUR DESTINATION",
      carritoCarritosCerca: "Carts near you",
      carritoPosicionesSimuladas: "Positions and times simulated to show the service.",
      mapboxSuUbicacionExacta: "Your exact location",
      mapboxNoSePudoCargar: "Could not load the cart map.",
      breakfast: "Breakfast",
      lunch: "Lunch",
      dinner: "Dinner",
      late: "Bar",
      hours: "Hours",
      spa: "Spa",
      golf: "Golf",
      piscina: "Pool",
      cafeteria: "Cafeteria",
      bar: "Bar",
      especialidad: "Specialty",
      solo_cena: "Dinner only",
      buffet: "Buffet",
      buffet_marina: "Marina Buffet",
      vestimenta: "Dress code",
      dressCode: "Dress code",
      reservas: "Reservations",
      reservation: "Reservation",
      especialidades: "Specialties",
      signatureDishes: "Signature dishes",
      carta: "Menu",
      menu: "Menu",
      horario: "Hours",
      horarioTexto: "Hours",
      hotel: "Hotel",
      tipo: "Type",
      cocina: "Cuisine",
      cuisine: "Cuisine",
      cartaEn: "Menu"
    }
  };

  let currentLang = "es";
  try { currentLang = localStorage.getItem("revista_lang") || "es"; } catch (e) { currentLang = "es"; }
  if (!translations[currentLang]) currentLang = "es";

  function t(key, defaultVal = "") {
    return translations[currentLang]?.[key] || defaultVal || key;
  }

  function getLang() {
    return currentLang;
  }

  function applyTranslations() {
    document.documentElement.lang = currentLang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const text = t(key);
      if (text) {
        if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
          el.placeholder = text;
        } else {
          el.textContent = text;
        }
      }
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const key = el.getAttribute("data-i18n-aria");
      const text = t(key);
      if (text) el.setAttribute("aria-label", text);
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      const text = t(key);
      if (text) el.placeholder = text;
    });

    const langToggleBtn = document.getElementById("langToggleBtn");
    if (langToggleBtn) {
      langToggleBtn.textContent = currentLang === "es" ? "🌐 EN" : "🌐 ES";
      langToggleBtn.setAttribute("title", currentLang === "es" ? "Switch to English" : "Cambiar a Español");
    }

    window.dispatchEvent(new CustomEvent("languagechange", { detail: { lang: currentLang } }));
  }

  function setLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    try { localStorage.setItem("revista_lang", lang); } catch (e) { /* ignore */ }
    applyTranslations();
  }

  function toggleLanguage() {
    setLanguage(currentLang === "es" ? "en" : "es");
  }

  function wireLanguageToggle() {
    const langToggleBtn = document.getElementById("langToggleBtn");
    if (!langToggleBtn || langToggleBtn.dataset.i18nWired === "true") return;
    langToggleBtn.dataset.i18nWired = "true";
    langToggleBtn.addEventListener("click", toggleLanguage);
  }

  wireLanguageToggle();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyTranslations);
  } else {
    applyTranslations();
  }

  window.RevistaDigital.i18n = {
    t,
    getLang,
    setLanguage,
    toggleLanguage,
    applyTranslations,
    translations
  };
})();