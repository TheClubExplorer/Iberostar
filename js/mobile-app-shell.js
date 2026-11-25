(function () {
  "use strict";

  var MQ = window.matchMedia("(max-width: 768px)");
  var ICONS = {
    map: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3 3 5v16l6-2 6 2 6-2V3l-6 2-6-2Z"/><path d="M9 3v16M15 5v16"/></svg>',
    explore: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m15 9-2 4-4 2 2-4 4-2Z"/></svg>',
    restaurants: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3v7a3 3 0 0 0 6 0V3M9 3v18M17 3c2 2 2 5 0 7v11"/></svg>',
    pano: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></svg>',
    search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>',
    locate: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg>',
    recenter: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5M20 15v5h-5M20 9V4h-5M4 15v5h5"/><circle cx="12" cy="12" r="3"/></svg>'
  };

  var TAB_DEFS = [
    { id: "map", route: "/", es: "Mapa", en: "Map" },
    { id: "explore", route: "/", es: "Explorar", en: "Explore" },
    { id: "restaurants", route: "/restaurantes", es: "Restaurantes", en: "Dining" },
    { id: "pano", route: "/360", es: "360°", en: "360°" }
  ];

  var shell = null;
  var exploreSheet = null;
  var guideOverlay = null;
  var guideCountry = null;
  var guideQuery = "";
  var shellUserMarker = null;
  var pendingLocation = null;
  var mapElement = null;
  var handle = null;
  var mapBounds = null;
  var shellMap = null;
  var mapInitializing = false;
  var active = false;
  var pendingMode = null;
  var pendingTab = null;
  var wasHome = false;
  var syncQueued = false;
  var drag = null;
  var suppressClick = false;
  var observer = null;
  var globalObserver = null;
  var globalSheet = null;
  var globalHandle = null;
  var globalInput = null;
  var globalList = null;
  var globalCard = null;
  var globalReopen = null;
  var globalHotels = null;
  var globalCountry = "all";
  var globalQuery = "";
  var globalSelected = null;
  var globalClosed = false;
  var globalDrag = null;
  var globalGuideWasHome = false;

  function isMobile() {
    try { return MQ.matches; } catch (error) { return window.innerWidth <= 768; }
  }

  function rd(name) {
    try {
      return (window.RevistaDigital || {})[name] || null;
    } catch (error) {
      return null;
    }
  }

  function lang() {
    try { return rd("i18n").getLang() === "en" ? "en" : "es"; } catch (error) { return "es"; }
  }

  function label(key, es, en) {
    try {
      var value = rd("i18n").t(key);
      if (value && value !== key) return value;
    } catch (error) { /* ignore */ }
    return lang() === "en" ? en : es;
  }

  function getState() {
    return rd("state") || null;
  }

  function navigate(path) {
    var routes = rd("routes");
    if (routes && typeof routes.navigate === "function") {
      routes.navigate(path);
      return;
    }
    var link = document.createElement("a");
    link.href = path;
    link.dataset.appRoute = path;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  function ensureHeaderActions() {
    var header = document.getElementById("siteHeader");
    var menu = document.getElementById("mobileMenuButton");
    if (!header || !menu) return;

    if (!document.getElementById("mobileSearchShortcut")) {
      var search = document.createElement("button");
      search.type = "button";
      search.id = "mobileSearchShortcut";
      search.className = "mobile-header-btn";
      search.innerHTML = ICONS.search;
      search.addEventListener("click", function () {
        var trigger = document.getElementById("openSearchButton");
        if (trigger) trigger.click();
      });
      header.insertBefore(search, menu);
    }

    if (!document.getElementById("mobileLangShortcut")) {
      var language = document.createElement("button");
      language.type = "button";
      language.id = "mobileLangShortcut";
      language.className = "mobile-header-btn";
      language.addEventListener("click", function () {
        var trigger = document.getElementById("langToggleBtn");
        if (trigger) trigger.click();
      });
      header.insertBefore(language, menu);
    }

    updateHeaderLabels();
  }

  function updateHeaderLabels() {
    var search = document.getElementById("mobileSearchShortcut");
    var language = document.getElementById("mobileLangShortcut");
    if (search) {
      search.innerHTML = ICONS.search;
      search.setAttribute("aria-label", label("navSearch", "Buscar hoteles", "Search hotels"));
    }
    if (language) {
      language.textContent = lang() === "en" ? "ES" : "EN";
      language.setAttribute("aria-label", lang() === "en" ? "Cambiar a español" : "Switch to English");
    }
  }

  function buildShell() {
    if (shell) return;

    shell = document.createElement("div");
    shell.id = "mobileAppShell";
    shell.className = "mobile-app-shell";
    shell.innerHTML =
      '<div class="mobile-app-map" id="mobileHomeMap" role="application"></div>' +
      '<div class="mobile-map-fabs">' +
        '<button type="button" class="mobile-map-fab" id="mobileMapLocate">' + ICONS.locate + '</button>' +
        '<button type="button" class="mobile-map-fab" id="mobileMapRecenter">' + ICONS.recenter + '</button>' +
      '</div>' +
      '<button type="button" class="mobile-sheet-handle" id="mobileSheetHandle" aria-controls="appView" aria-expanded="false"><span></span></button>' +
      '<nav class="mobile-tabbar" id="mobileTabBar" role="tablist" aria-label="Navegación principal"></nav>';

    document.body.appendChild(shell);
    mapElement = shell.querySelector("#mobileHomeMap");
    handle = shell.querySelector("#mobileSheetHandle");

    exploreSheet = document.createElement("section");
    exploreSheet.id = "mobileExploreSheet";
    exploreSheet.className = "mobile-explore-sheet";
    exploreSheet.innerHTML =
      '<div class="mobile-explore-head">' +
        '<div><p data-explore-kicker></p><h2 data-explore-title></h2></div>' +
        '<button type="button" class="mobile-explore-close" data-explore="close" aria-label="Cerrar">×</button>' +
      '</div>' +
      '<button type="button" class="mobile-explore-search" data-explore="search">' + ICONS.search + '<span data-explore-search></span></button>' +
      '<div class="mobile-explore-chips">' +
        '<button type="button" class="mobile-explore-chip" data-explore="hotels"></button>' +
        '<button type="button" class="mobile-explore-chip" data-explore="restaurants"></button>' +
        '<button type="button" class="mobile-explore-chip" data-explore="guide"></button>' +
        '<button type="button" class="mobile-explore-chip" data-explore="pano"></button>' +
      '</div>' +
      '<div class="mobile-explore-body">' +
        '<section class="mobile-explore-section">' +
          '<h3 data-explore-guide-heading></h3>' +
          '<button type="button" class="mobile-explore-card mobile-explore-card--guide" data-explore="guide">' +
            '<span class="mobile-explore-guide-icon">' + ICONS.map + '</span>' +
            '<span><strong data-explore-guide-title></strong><small data-explore-guide-subtitle></small></span>' +
            '<span aria-hidden="true">→</span>' +
          '</button>' +
        '</section>' +
        '<section class="mobile-explore-section">' +
          '<h3 data-explore-destinations-heading></h3>' +
          '<div class="mobile-explore-grid" id="mobileExploreDestinations"></div>' +
        '</section>' +
        '<section class="mobile-explore-section">' +
          '<h3 data-explore-hotels-heading></h3>' +
          '<div class="mobile-explore-list" id="mobileExploreHotels"></div>' +
        '</section>' +
      '</div>';
    document.body.appendChild(exploreSheet);
    exploreSheet.addEventListener("click", function (event) {
      var trigger = event.target.closest("[data-explore]");
      if (!trigger) return;
      if (trigger.dataset.explore === "route") onExploreRoute(trigger.dataset.route);
      else onExploreAction(trigger.dataset.explore, trigger);
    });

    guideOverlay = document.createElement("div");
    guideOverlay.id = "mobileGuide";
    guideOverlay.className = "mobile-guide";
    guideOverlay.setAttribute("role", "dialog");
    guideOverlay.setAttribute("aria-modal", "true");
    guideOverlay.innerHTML =
      '<div class="mobile-guide-head">' +
        '<button type="button" class="mobile-guide-icon" data-guide-action="close" aria-label="Cerrar">←</button>' +
        '<div><p data-guide-kicker></p><h2 data-guide-title></h2></div>' +
        '<span class="mobile-guide-count" data-guide-count></span>' +
      '</div>' +
      '<label class="mobile-guide-search">' + ICONS.search +
        '<input id="mobileGuideSearch" name="mobileGuideSearch" type="search" data-guide-search autocomplete="off" aria-label="Buscar guía" />' +
      '</label>' +
      '<div class="mobile-guide-countries" id="mobileGuideCountries"></div>' +
      '<div class="mobile-guide-content" id="mobileGuideContent"></div>';
    document.body.appendChild(guideOverlay);
    guideOverlay.addEventListener("click", function (event) {
      var trigger = event.target.closest("[data-guide-action],[data-guide-country],[data-guide-hotel]");
      if (!trigger) return;
      if (trigger.dataset.guideAction === "close") closeGuide();
      else if (trigger.dataset.guideAction === "back") {
        guideCountry = null;
        guideQuery = "";
        guideOverlay.querySelector("[data-guide-search]").value = "";
        renderGuide();
      } else if (trigger.dataset.guideCountry) {
        guideCountry = trigger.dataset.guideCountry;
        guideQuery = "";
        guideOverlay.querySelector("[data-guide-search]").value = "";
        renderGuide();
        guideOverlay.querySelector(".mobile-guide-content").scrollTop = 0;
      } else if (trigger.dataset.guideHotel) {
        closeGuide();
        navigate(trigger.dataset.guideHotel);
      }
    });
    guideOverlay.querySelector("[data-guide-search]").addEventListener("input", function (event) {
      guideQuery = event.target.value || "";
      renderGuide();
    });

    var tabBar = shell.querySelector("#mobileTabBar");
    TAB_DEFS.forEach(function (definition) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "mobile-tab";
      button.dataset.mobileTab = definition.id;
      button.setAttribute("role", "tab");
      button.setAttribute("aria-selected", "false");
      button.innerHTML = ICONS[definition.id] + "<span></span>";
      button.addEventListener("click", function () {
        onTab(definition);
      });
      tabBar.appendChild(button);
    });

    shell.querySelector("#mobileMapLocate").addEventListener("click", function () {
      var state = getState();
      if (state && shellMap) {
        state.activeMap = shellMap;
        if (shellUserMarker) state.userMarker = shellUserMarker;
      }
      var trigger = document.getElementById("requestLocationButton");
      if (trigger) trigger.click();
    });

    shell.querySelector("#mobileMapRecenter").addEventListener("click", recenterMap);
    buildGlobalGuideSheet();
    handle.addEventListener("click", function () {
      if (suppressClick) {
        suppressClick = false;
        return;
      }
      toggleSheet();
    });
    handle.addEventListener("pointerdown", onDragStart);
    handle.addEventListener("pointermove", onDragMove);
    handle.addEventListener("pointerup", onDragEnd);
    handle.addEventListener("pointercancel", onDragEnd);

    updateLabels();
  }

  function buildGlobalGuideSheet() {
    if (globalSheet) return;

    globalSheet = document.createElement("section");
    globalSheet.id = "mobileGlobalGuide";
    globalSheet.className = "mgs-sheet";
    globalSheet.setAttribute("role", "region");
    globalSheet.innerHTML =
      '<div class="mgs-handle" role="button" tabindex="0">' +
        '<div class="mgs-grab"><span class="mgs-pill" aria-hidden="true"></span></div>' +
        '<button type="button" class="mgs-search" data-mgs-open>' +
          '<span class="mgs-search-icon" aria-hidden="true">⌕</span>' +
          '<span class="mgs-search-text"></span>' +
          '<span class="mgs-search-hint"></span>' +
          '<span class="mgs-open-arrow" aria-hidden="true">↑</span>' +
        '</button>' +
      '</div>' +
      '<div class="mgs-body">' +
        '<div class="mgs-panel-head">' +
          '<div class="mgs-title"><strong></strong><span></span></div>' +
          '<div class="mgs-panel-actions">' +
            '<button type="button" class="mgs-icon-btn" data-mgs-minimize>⌄</button>' +
            '<button type="button" class="mgs-icon-btn mgs-exit" data-mgs-exit>×</button>' +
          '</div>' +
        '</div>' +
        '<input class="mgs-input" type="search" autocomplete="off" />' +
        '<div class="mgs-filter-label"><span></span><small></small></div>' +
        '<div class="mgs-countries"></div>' +
        '<div class="mgs-list"></div>' +
      '</div>';
    document.body.appendChild(globalSheet);

    globalHandle = globalSheet.querySelector(".mgs-handle");
    globalInput = globalSheet.querySelector(".mgs-input");
    globalList = globalSheet.querySelector(".mgs-list");

    globalSheet.addEventListener("click", function (event) {
      var country = event.target.closest("[data-mgs-country]");
      var hotel = event.target.closest("[data-mgs-hotel]");
      if (country) {
        globalCountry = country.dataset.mgsCountry;
        globalQuery = "";
        globalInput.value = "";
        renderGlobalGuide();
        return;
      }
      if (hotel) {
        selectGlobalHotel(hotel.dataset.mgsHotel);
        return;
      }
      if (event.target.closest("[data-mgs-open]")) {
        setGlobalGuideClosed(false);
        setGlobalGuideOpen(true);
        setTimeout(function () { globalInput.focus(); }, 240);
        return;
      }
      if (event.target.closest("[data-mgs-minimize]")) {
        setGlobalGuideOpen(false);
        return;
      }
      if (event.target.closest("[data-mgs-exit]")) setGlobalGuideClosed(true);
    });

    globalHandle.addEventListener("keydown", function (event) {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      setGlobalGuideOpen(!globalSheet.classList.contains("mgs-expanded"));
    });
    globalHandle.addEventListener("touchstart", onGlobalDragStart, { passive: true });
    globalHandle.addEventListener("touchmove", onGlobalDragMove, { passive: false });
    globalHandle.addEventListener("touchend", onGlobalDragEnd);
    globalHandle.addEventListener("touchcancel", onGlobalDragEnd);
    globalInput.addEventListener("input", function (event) {
      globalQuery = event.target.value || "";
      renderGlobalGuide();
    });

    globalCard = document.createElement("div");
    globalCard.id = "mobileGlobalGuideCard";
    globalCard.className = "mgs-card";
    globalCard.hidden = true;
    globalCard.innerHTML =
      '<div class="mgs-card-top"><span class="mgs-card-kicker"></span><button type="button" class="mgs-card-close" data-mgs-card-action="close">×</button></div>' +
      '<strong class="mgs-card-title"></strong>' +
      '<span class="mgs-card-meta"></span>' +
      '<div class="mgs-card-actions">' +
        '<button type="button" class="mgs-card-action" data-mgs-card-action="center"></button>' +
        '<button type="button" class="mgs-card-action mgs-card-action--primary" data-mgs-card-action="open"></button>' +
      '</div>';
    globalCard.addEventListener("click", function (event) {
      var actionButton = event.target.closest("[data-mgs-card-action]");
      if (!actionButton) return;
      var action = actionButton.dataset.mgsCardAction;
      if (action === "close") {
        globalSelected = null;
        updateGlobalCard();
        renderGlobalGuide();
      } else if (action === "open" && globalSelected) navigate(globalSelected.route);
      else if (action === "center" && globalSelected) centerGlobalHotel(globalSelected);
    });
    document.body.appendChild(globalCard);

    globalReopen = document.createElement("button");
    globalReopen.id = "mobileGlobalGuideReopen";
    globalReopen.className = "mgs-reopen";
    globalReopen.type = "button";
    globalReopen.innerHTML = '<span aria-hidden="true">⌕</span><span data-mgs-reopen-label></span>';
    globalReopen.addEventListener("click", function () {
      setGlobalGuideClosed(false);
      setGlobalGuideOpen(true);
    });
    document.body.appendChild(globalReopen);

    updateGlobalGuideLabels();
    syncGlobalGuide();
  }

  function updateGlobalGuideLabels() {
    if (!globalSheet || !globalCard || !globalReopen) return;
    var english = lang() === "en";
    var guideTitle = label("menuGuia", "Guía global", "Global guide");
    var searchLabel = label("navSearch", "Buscar hoteles, destinos…", "Search hotels, destinations…");
    globalSheet.setAttribute("aria-label", guideTitle);
    globalSheet.querySelector(".mgs-title strong").textContent = guideTitle;
    globalSheet.querySelector(".mgs-title span").textContent = english
      ? "All countries, destinations and hotels"
      : "Todos los países, destinos y hoteles";
    globalSheet.querySelector(".mgs-search-text").textContent = english ? "Open global guide" : "Abrir guía global";
    globalSheet.querySelector(".mgs-search-hint").textContent = english ? "Explore" : "Explorar";
    globalSheet.querySelector(".mgs-search").setAttribute("aria-label", english ? "Open global guide" : "Abrir guía global");
    globalInput.placeholder = searchLabel;
    globalInput.setAttribute("aria-label", searchLabel);
    globalSheet.querySelector(".mgs-filter-label span").textContent = english ? "Filter by country" : "Filtrar por país";
    globalSheet.querySelector("[data-mgs-minimize]").setAttribute("aria-label", english ? "Minimize" : "Minimizar");
    globalSheet.querySelector("[data-mgs-exit]").setAttribute("aria-label", english ? "Close guide" : "Cerrar guía");
    globalReopen.querySelector("[data-mgs-reopen-label]").textContent = english ? "Global guide" : "Guía global";
    globalReopen.setAttribute("aria-label", english ? "Open global guide" : "Abrir guía global");
    globalCard.querySelector(".mgs-card-kicker").textContent = english ? "Selected hotel" : "Hotel seleccionado";
    globalCard.querySelector('[data-mgs-card-action="open"]').textContent = english ? "Open hotel" : "Abrir ficha";
    globalCard.querySelector('[data-mgs-card-action="center"]').textContent = english ? "Center map" : "Centrar mapa";
    globalCard.querySelector('[data-mgs-card-action="close"]').setAttribute("aria-label", english ? "Close" : "Cerrar");
    if (globalHotels) renderGlobalGuide();
  }

  function isGlobalGuideHomeMap() {
    return isMobile()
      && document.body.classList.contains("mobile-app-active")
      && document.body.dataset.mobileHome === "1"
      && document.body.dataset.mobileSheet === "map";
  }

  function collectGlobalHotels() {
    var hotels = [];
    try {
      var catalog = rd("hoteles").getDestinationCatalog();
      var state = getState();
      var coordinates = (state && state.hotelCoordinates) || {};
      Object.keys(catalog || {}).forEach(function (countrySlug) {
        var country = catalog[countrySlug];
        (country.destinations || []).forEach(function (destination) {
          (destination.hotels || []).forEach(function (hotel) {
            var position = coordinates[hotel.name] || [hotel.latitude, hotel.longitude];
            if (!Array.isArray(position) || position.length < 2) return;
            var latitude = Number(position[0]);
            var longitude = Number(position[1]);
            if (!isFinite(latitude) || !isFinite(longitude)) return;
            hotels.push({
              name: hotel.name,
              slug: hotel.slug,
              route: "/" + countrySlug + "/" + destination.slug + "/" + hotel.slug,
              countryName: country.name,
              countrySlug: countrySlug,
              destinationName: destination.name,
              destinationSlug: destination.slug,
              latitude: latitude,
              longitude: longitude
            });
          });
        });
      });
    } catch (error) { /* ignore */ }
    return hotels;
  }

  function renderGlobalGuide() {
    if (!globalSheet || !globalList) return;
    globalHotels = globalHotels || collectGlobalHotels();

    var countriesWrap = globalSheet.querySelector(".mgs-countries");
    var seenCountries = {};
    var countries = [];
    globalHotels.forEach(function (hotel) {
      if (seenCountries[hotel.countrySlug]) return;
      seenCountries[hotel.countrySlug] = true;
      countries.push(hotel);
    });

    globalSheet.querySelector(".mgs-filter-label small").textContent = lang() === "en"
      ? countries.length + " countries"
      : countries.length + " países";
    countriesWrap.textContent = "";
    addGlobalCountry("all", lang() === "en" ? "All" : "Todos");
    countries.forEach(function (hotel) {
      addGlobalCountry(hotel.countrySlug, globalCountryLabel(hotel));
    });

    var query = (globalQuery || "").trim().toLowerCase();
    var filtered = globalHotels.filter(function (hotel) {
      if (globalCountry !== "all" && hotel.countrySlug !== globalCountry) return false;
      if (!query) return true;
      var haystack = (hotel.name + " " + hotel.countryName + " " + hotel.destinationName).toLowerCase();
      return haystack.indexOf(query) !== -1;
    });

    globalList.textContent = "";
    if (!filtered.length) {
      var empty = document.createElement("p");
      empty.className = "mgs-empty";
      empty.textContent = lang() === "en" ? "No hotels found." : "No hay hoteles para esta búsqueda.";
      globalList.appendChild(empty);
      return;
    }

    var currentCountry = "";
    filtered.forEach(function (hotel) {
      if (hotel.countryName !== currentCountry) {
        currentCountry = hotel.countryName;
        var heading = document.createElement("p");
        heading.className = "mgs-country-heading";
        heading.textContent = hotel.countryName;
        globalList.appendChild(heading);
      }
      var button = document.createElement("button");
      button.type = "button";
      button.className = "mgs-hotel";
      button.dataset.mgsHotel = hotel.name;
      if (globalSelected && globalSelected.name === hotel.name) button.classList.add("is-selected");
      var name = document.createElement("strong");
      name.textContent = hotel.name;
      var place = document.createElement("span");
      place.textContent = hotel.destinationName;
      button.appendChild(name);
      button.appendChild(place);
      globalList.appendChild(button);
    });
  }

  function globalCountryLabel(hotel) {
    var shortLabels = {
      mexico: "México",
      jamaica: "Jamaica",
      "republica-dominicana": lang() === "en" ? "Dominican Rep." : "Rep. Dominicana",
      brasil: "Brasil"
    };
    return shortLabels[hotel.countrySlug] || hotel.countryName;
  }

  function addGlobalCountry(slug, text) {
    var countriesWrap = globalSheet.querySelector(".mgs-countries");
    var button = document.createElement("button");
    button.type = "button";
    button.className = "mgs-country" + (globalCountry === slug ? " is-active" : "");
    button.dataset.mgsCountry = slug;
    button.textContent = text;
    countriesWrap.appendChild(button);
  }

  function selectGlobalHotel(name) {
    var hotel = (globalHotels || []).filter(function (item) { return item.name === name; })[0];
    if (!hotel) return;
    globalSelected = hotel;
    setGlobalGuideOpen(false);
    centerGlobalHotel(hotel);
    updateGlobalCard();
    renderGlobalGuide();
  }

  function centerGlobalHotel(hotel) {
    var state = getState();
    var map = state && state.activeMap;
    if (!map || !isFinite(hotel.latitude) || !isFinite(hotel.longitude)) return;
    var container = typeof map.getContainer === "function" ? map.getContainer() : null;
    if (container && container.id !== "mobileHomeMap") return;
    try { if (typeof map.invalidateSize === "function") map.invalidateSize(); } catch (error) { /* ignore */ }
    var target = [hotel.latitude, hotel.longitude];
    if (typeof map.flyTo === "function") map.flyTo(target, 14, { animate: true, duration: 0.8 });
    else if (typeof map.setView === "function") map.setView(target, 14, { animate: true });
  }

  function globalDistanceLabel(hotel) {
    var state = getState();
    var position = state && state.currentPosition;
    if (!position || !isFinite(position.latitude) || !isFinite(position.longitude)) return "";
    var radians = Math.PI / 180;
    var latitudeDelta = (hotel.latitude - position.latitude) * radians;
    var longitudeDelta = (hotel.longitude - position.longitude) * radians;
    var a = Math.sin(latitudeDelta / 2) * Math.sin(latitudeDelta / 2)
      + Math.cos(position.latitude * radians) * Math.cos(hotel.latitude * radians)
      * Math.sin(longitudeDelta / 2) * Math.sin(longitudeDelta / 2);
    var kilometers = 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (lang() === "en" ? " · " + kilometers.toFixed(1) + " km away" : " · A " + kilometers.toFixed(1) + " km");
  }

  function updateGlobalCard() {
    if (!globalCard) return;
    var visible = !!(globalSelected && isGlobalGuideHomeMap() && !globalClosed);
    if (!visible) {
      globalCard.hidden = true;
      delete document.body.dataset.guideCard;
      return;
    }
    globalCard.querySelector(".mgs-card-title").textContent = globalSelected.name;
    globalCard.querySelector(".mgs-card-meta").textContent = globalSelected.countryName
      + " · " + globalSelected.destinationName + globalDistanceLabel(globalSelected);
    globalCard.hidden = false;
    document.body.dataset.guideCard = "1";
  }

  function setGlobalGuideOpen(expanded) {
    if (!globalSheet) return;
    globalSheet.classList.toggle("mgs-expanded", !!expanded);
    if (expanded) document.body.dataset.guideExpanded = "1";
    else delete document.body.dataset.guideExpanded;
    if (globalHandle) globalHandle.setAttribute("aria-expanded", expanded ? "true" : "false");
    globalSheet.style.transform = "";
    if (expanded && globalSelected) {
      globalSelected = null;
      renderGlobalGuide();
    }
    updateGlobalCard();
  }

  function setGlobalGuideClosed(closed) {
    globalClosed = !!closed;
    if (!globalSheet || !globalReopen) return;
    globalSheet.classList.toggle("is-visible", !globalClosed);
    globalReopen.classList.toggle("is-visible", globalClosed && isGlobalGuideHomeMap());
    if (globalClosed) {
      globalSheet.classList.remove("mgs-expanded");
      delete document.body.dataset.guideExpanded;
      if (globalHandle) globalHandle.setAttribute("aria-expanded", "false");
      updateGlobalCard();
    }
  }

  function globalPeekHeight() {
    try {
      var value = parseFloat(getComputedStyle(document.body).getPropertyValue("--mob-guide-peek"));
      return isFinite(value) ? value : 76;
    } catch (error) { return 76; }
  }

  function onGlobalDragStart(event) {
    if (!globalSheet || !globalSheet.classList.contains("is-visible")) return;
    if (!event.touches || !event.touches.length) return;
    if (event.target.closest("button, input")) return;
    var max = Math.max(0, globalSheet.offsetHeight - globalPeekHeight());
    globalDrag = {
      startY: event.touches[0].clientY,
      base: globalSheet.classList.contains("mgs-expanded") ? 0 : max,
      current: globalSheet.classList.contains("mgs-expanded") ? 0 : max,
      max: max
    };
    globalSheet.style.transition = "none";
  }

  function onGlobalDragMove(event) {
    if (!globalDrag || !event.touches || !event.touches.length) return;
    var delta = event.touches[0].clientY - globalDrag.startY;
    var offset = Math.min(globalDrag.max, Math.max(0, globalDrag.base + delta));
    globalDrag.current = offset;
    globalSheet.style.transform = "translateY(" + offset + "px)";
    if (event.cancelable) event.preventDefault();
  }

  function onGlobalDragEnd() {
    if (!globalDrag || !globalSheet) return;
    var expanded = globalDrag.current < globalDrag.max * 0.55;
    globalSheet.style.transition = "";
    globalSheet.style.transform = "";
    globalDrag = null;
    setGlobalGuideOpen(expanded);
  }

  function resetGlobalGuideState() {
    globalClosed = false;
    globalSelected = null;
    globalQuery = "";
    globalCountry = "all";
    if (globalInput) globalInput.value = "";
    if (globalSheet) globalSheet.classList.remove("mgs-expanded");
    delete document.body.dataset.guideExpanded;
    if (globalHandle) globalHandle.setAttribute("aria-expanded", "false");
    if (globalReopen) globalReopen.classList.remove("is-visible");
    updateGlobalCard();
  }

  function syncGlobalGuide() {
    if (!globalSheet) return;
    var homeMap = isGlobalGuideHomeMap();
    if (!homeMap) {
      resetGlobalGuideState();
      globalGuideWasHome = false;
      globalSheet.classList.remove("is-visible");
      return;
    }
    if (!globalGuideWasHome) {
      resetGlobalGuideState();
      globalGuideWasHome = true;
    }
    if (!globalHotels) globalHotels = collectGlobalHotels();
    globalSheet.classList.toggle("is-visible", !globalClosed);
    if (globalReopen) globalReopen.classList.toggle("is-visible", globalClosed);
    renderGlobalGuide();
    if (globalClosed) {
      globalSheet.classList.remove("mgs-expanded");
      delete document.body.dataset.guideExpanded;
    }
    updateGlobalCard();
  }

  function updateLabels() {
    if (!shell) return;
    var tabBar = shell.querySelector("#mobileTabBar");
    Array.prototype.forEach.call(tabBar.querySelectorAll(".mobile-tab"), function (button) {
      var definition = TAB_DEFS.filter(function (item) { return item.id === button.dataset.mobileTab; })[0];
      if (!definition) return;
      button.querySelector("span").textContent = definition.id === "pano"
        ? definition.en
        : label(definition.id === "explore" ? "navExplore" : definition.id === "restaurants" ? "menuRestaurants" : "", definition.es, definition.en);
      button.setAttribute("aria-label", button.querySelector("span").textContent);
    });
    if (mapElement) {
      mapElement.setAttribute("aria-label", lang() === "en" ? "General hotel map" : "Mapa general de hoteles");
    }
    if (handle) {
      handle.setAttribute("aria-label", lang() === "en" ? "Expand or collapse content" : "Ampliar o contraer contenido");
    }
    updateGlobalGuideLabels();
    if (exploreSheet) {
      var en = lang() === "en";
      var setText = function (selector, text) {
        var node = exploreSheet.querySelector(selector);
        if (node) node.textContent = text;
      };
      setText("[data-explore-kicker]", en ? "DISCOVER" : "DESCUBRE");
      setText("[data-explore-title]", en ? "What would you like to explore?" : "¿Qué quieres explorar?");
      setText("[data-explore-search]", label("navSearch", en ? "Search hotels, destinations…" : "Buscar hoteles, destinos…", "Search hotels, destinations…"));
      setText("[data-explore-guide-heading]", en ? "Interactive guide" : "Guía interactiva");
      setText("[data-explore-guide-title]", en ? "Interactive guide" : "Guía interactiva");
      setText("[data-explore-guide-subtitle]", en ? "Countries, destinations and hotel entries" : "Países, destinos y entradas a hoteles");
      setText("[data-explore-destinations-heading]", en ? "Destinations" : "Destinos");
      setText("[data-explore-hotels-heading]", en ? "Hotels" : "Hoteles");
      Array.prototype.forEach.call(exploreSheet.querySelectorAll(".mobile-explore-chip"), function (button) {
        var action = button.dataset.explore;
        var text = action === "hotels"
          ? (en ? "Hotels" : "Hoteles")
          : action === "restaurants"
            ? label("menuRestaurants", en ? "Dining" : "Restaurantes", "Dining")
            : action === "guide"
              ? label("menuGuia", en ? "Resort guide" : "Guía interactiva", "Resort guide")
              : "360°";
        button.textContent = text;
        button.setAttribute("aria-label", text);
      });
      populateExplore();
    }
    if (guideOverlay) {
      var guideEn = lang() === "en";
      var setGuideText = function (selector, text) {
        var node = guideOverlay.querySelector(selector);
        if (node) node.textContent = text;
      };
      setGuideText("[data-guide-kicker]", guideEn ? "INTERACTIVE GUIDE" : "GUÍA INTERACTIVA");
      setGuideText("[data-guide-title]", guideEn ? "Explore by country" : "Explora por país");
      guideOverlay.querySelector("[data-guide-search]").placeholder = guideEn
        ? "Search country, destination or hotel"
        : "Buscar país, destino u hotel";
      if (document.body.dataset.mobileGuide === "1") renderGuide();
    }
    updateHeaderLabels();
  }

  function populateExplore() {
    if (!exploreSheet) return;
    var catalog = null;
    try { catalog = rd("hoteles").getDestinationCatalog(); } catch (error) { /* ignore */ }
    var destinations = [];
    var hotels = [];
    Object.keys(catalog || {}).forEach(function (countrySlug) {
      var country = catalog[countrySlug];
      (country.destinations || []).forEach(function (destination) {
        destinations.push({
          name: destination.name,
          countryName: country.name,
          image: destination.image || country.image || "",
          route: "/" + countrySlug + "/" + destination.slug
        });
        (destination.hotels || []).forEach(function (hotel) {
          hotels.push({
            name: hotel.name,
            destinationName: destination.name,
            image: hotel.image || destination.image || country.image || "",
            route: "/" + countrySlug + "/" + destination.slug + "/" + hotel.slug
          });
        });
      });
    });

    var grid = exploreSheet.querySelector("#mobileExploreDestinations");
    var list = exploreSheet.querySelector("#mobileExploreHotels");
    if (grid) {
      grid.innerHTML = "";
      destinations.slice(0, 6).forEach(function (item) {
        var card = document.createElement("button");
        card.type = "button";
        card.className = "mobile-explore-destination";
        card.dataset.explore = "route";
        card.dataset.route = item.route;
        if (item.image) {
          var image = document.createElement("img");
          image.src = item.image;
          image.alt = "";
          image.loading = "lazy";
          card.appendChild(image);
        }
        var name = document.createElement("span");
        name.textContent = item.name;
        var country = document.createElement("small");
        country.textContent = item.countryName;
        card.appendChild(name);
        card.appendChild(country);
        grid.appendChild(card);
      });
    }
    if (list) {
      list.innerHTML = "";
      hotels.slice(0, 6).forEach(function (item) {
        var card = document.createElement("button");
        card.type = "button";
        card.className = "mobile-explore-hotel";
        card.dataset.explore = "route";
        card.dataset.route = item.route;
        if (item.image) {
          var image = document.createElement("img");
          image.src = item.image;
          image.alt = "";
          image.loading = "lazy";
          card.appendChild(image);
        }
        var copy = document.createElement("span");
        var name = document.createElement("strong");
        name.textContent = item.name;
        var destination = document.createElement("small");
        destination.textContent = item.destinationName;
        copy.appendChild(name);
        copy.appendChild(destination);
        card.appendChild(copy);
        var arrow = document.createElement("span");
        arrow.className = "mobile-explore-hotel-arrow";
        arrow.setAttribute("aria-hidden", "true");
        arrow.textContent = "→";
        card.appendChild(arrow);
        list.appendChild(card);
      });
    }
  }

  function guideElement(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function guideImage(src, className) {
    if (!src) return null;
    var image = document.createElement("img");
    image.src = src;
    image.alt = "";
    image.loading = "lazy";
    image.className = className;
    return image;
  }

  function getGuideCatalog() {
    var catalog = null;
    try { catalog = rd("hoteles").getDestinationCatalog(); } catch (error) { /* ignore */ }
    var countries = [];
    Object.keys(catalog || {}).forEach(function (slug) {
      var country = catalog[slug];
      var destinations = [];
      (country.destinations || []).forEach(function (destination) {
        var hotels = (destination.hotels || []).map(function (hotel) {
          return {
            name: hotel.name,
            image: hotel.image || destination.image || country.image || "",
            route: "/" + slug + "/" + destination.slug + "/" + hotel.slug
          };
        });
        destinations.push({
          slug: destination.slug,
          name: destination.name,
          image: destination.image || country.image || "",
          hotels: hotels
        });
      });
      countries.push({
        slug: slug,
        name: country.name,
        image: country.image || "",
        destinations: destinations
      });
    });
    return countries;
  }

  function guideNormalize(text) {
    return String(text || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function guideMatches(text, query) {
    return !query || guideNormalize(text).indexOf(guideNormalize(query)) !== -1;
  }

  function guideHotelButton(hotel, destinationName, countryName) {
    var button = guideElement("button", "mobile-guide-hotel");
    button.type = "button";
    button.dataset.guideHotel = hotel.route;
    var image = guideImage(hotel.image, "mobile-guide-hotel-img");
    if (image) button.appendChild(image);
    var copy = guideElement("span", "mobile-guide-hotel-copy");
    copy.appendChild(guideElement("strong", "", hotel.name));
    copy.appendChild(guideElement("small", "", [destinationName, countryName].filter(Boolean).join(" · ")));
    button.appendChild(copy);
    button.appendChild(guideElement("span", "mobile-guide-hotel-arrow", "→"));
    return button;
  }

  function renderGuide() {
    if (!guideOverlay) return;
    var countries = getGuideCatalog();
    var query = (guideQuery || "").trim().toLowerCase();
    var list = guideOverlay.querySelector("#mobileGuideCountries");
    var content = guideOverlay.querySelector("#mobileGuideContent");
    var count = guideOverlay.querySelector("[data-guide-count]");
    var en = lang() === "en";
    if (!list || !content) return;
    list.innerHTML = "";
    content.innerHTML = "";

    var total = countries.reduce(function (sum, country) {
      return sum + country.destinations.reduce(function (inner, destination) { return inner + destination.hotels.length; }, 0);
    }, 0);
    if (count) count.textContent = total + (en ? " hotels" : " hoteles");

    var visibleCountries = countries.filter(function (country) {
      if (guideMatches(country.name, query)) return true;
      return country.destinations.some(function (destination) {
        return guideMatches(destination.name, query) || destination.hotels.some(function (hotel) {
          return guideMatches(hotel.name, query);
        });
      });
    });

    if (guideCountry && !visibleCountries.some(function (country) { return country.slug === guideCountry; })) {
      guideCountry = null;
    }

    visibleCountries.forEach(function (country) {
      var card = guideElement("button", "mobile-guide-country");
      card.type = "button";
      card.dataset.guideCountry = country.slug;
      if (country.slug === guideCountry) card.classList.add("is-active");
      var image = guideImage(country.image, "mobile-guide-country-img");
      if (image) card.appendChild(image);
      var copy = guideElement("span", "mobile-guide-country-copy");
      copy.appendChild(guideElement("strong", "", country.name));
      var hotelCount = country.destinations.reduce(function (sum, destination) { return sum + destination.hotels.length; }, 0);
      copy.appendChild(guideElement("small", "", country.destinations.length + (en ? " destinations · " : " destinos · ") + hotelCount + (en ? " hotels" : " hoteles")));
      card.appendChild(copy);
      list.appendChild(card);
    });

    if (!visibleCountries.length) {
      content.appendChild(guideElement("p", "mobile-guide-empty", en ? "No results" : "Sin resultados"));
      return;
    }

    if (guideCountry) {
      var selected = visibleCountries.filter(function (country) { return country.slug === guideCountry; })[0];
      var back = guideElement("button", "mobile-guide-back", en ? "← All countries" : "← Todos los países");
      back.type = "button";
      back.dataset.guideAction = "back";
      content.appendChild(back);
      content.appendChild(guideElement("h3", "mobile-guide-content-title", selected.name));
      selected.destinations.forEach(function (destination) {
        var hotels = destination.hotels.filter(function (hotel) {
          return !query || guideMatches(destination.name, query) || guideMatches(hotel.name, query) || guideMatches(selected.name, query);
        });
        if (!hotels.length) return;
        content.appendChild(guideElement("h4", "mobile-guide-destination", destination.name));
        var grid = guideElement("div", "mobile-guide-hotels");
        hotels.forEach(function (hotel) {
          grid.appendChild(guideHotelButton(hotel, destination.name, selected.name));
        });
        content.appendChild(grid);
      });
      return;
    }

    if (query) {
      content.appendChild(guideElement("h3", "mobile-guide-content-title", en ? "Results" : "Resultados"));
      visibleCountries.forEach(function (country) {
        country.destinations.forEach(function (destination) {
          destination.hotels.forEach(function (hotel) {
            if (!guideMatches(country.name, query) && !guideMatches(destination.name, query) && !guideMatches(hotel.name, query)) return;
            content.appendChild(guideHotelButton(hotel, destination.name, country.name));
          });
        });
      });
      return;
    }

    var intro = guideElement("div", "mobile-guide-intro");
    intro.appendChild(guideElement("strong", "", en ? "Choose a country" : "Elija un país"));
    intro.appendChild(guideElement("span", "", en
      ? "Then open the destinations and hotel entries inside it."
      : "Luego abra los destinos y las entradas a sus hoteles."));
    content.appendChild(intro);
  }

  function openGuide() {
    if (!guideOverlay) return;
    guideCountry = null;
    guideQuery = "";
    var search = guideOverlay.querySelector("[data-guide-search]");
    if (search) search.value = "";
    document.body.dataset.mobileGuide = "1";
    renderGuide();
    setTimeout(function () { try { search.focus(); } catch (error) { /* ignore */ } }, 80);
  }

  function closeGuide() {
    if (!guideOverlay) return;
    delete document.body.dataset.mobileGuide;
    guideCountry = null;
    guideQuery = "";
    var search = guideOverlay.querySelector("[data-guide-search]");
    if (search) search.value = "";
  }

  function onExploreRoute(route) {
    if (route) navigate(route);
  }

  function onExploreAction(action, trigger) {
    if (action === "close") {
      pendingMode = "map";
      pendingTab = "map";
      setSheet("map", "map");
      return;
    }
    if (action === "search") {
      var search = document.getElementById("openSearchButton");
      if (search) search.click();
      return;
    }
    if (action === "hotels") {
      var hotels = exploreSheet && exploreSheet.querySelector("#mobileExploreHotels");
      if (hotels && hotels.scrollIntoView) hotels.scrollIntoView({ block: "nearest", behavior: "smooth" });
      return;
    }
    if (action === "guide") {
      onDockAction("guide");
      return;
    }
    if (action === "restaurants") {
      pendingMode = "section";
      pendingTab = "restaurants";
      navigate("/restaurantes");
      return;
    }
    if (action === "pano") {
      pendingMode = "section";
      pendingTab = "pano";
      navigate("/360");
    }
  }

  function collectHotels() {
    var hotels = [];
    try {
      var catalog = rd("hoteles").getDestinationCatalog();
      Object.keys(catalog || {}).forEach(function (countrySlug) {
        var country = catalog[countrySlug];
        (country.destinations || []).forEach(function (destination) {
          (destination.hotels || []).forEach(function (hotel) {
            hotels.push({
              name: hotel.name,
              slug: hotel.slug,
              route: "/" + countrySlug + "/" + destination.slug + "/" + hotel.slug,
              countryName: country.name,
              countrySlug: countrySlug,
              destinationName: destination.name,
              destinationSlug: destination.slug
            });
          });
        });
      });
    } catch (error) { /* ignore */ }
    return hotels;
  }

  function initHomeMap() {
    if (!mapElement) return;
    if (mapElement._leaflet_id) {
      if (!shellMap) captureMap();
      return;
    }
    if (mapInitializing) return;
    var mapas = rd("mapas");
    if (!mapas || typeof mapas.initializeAllHotelsMap !== "function") return;

    var hotels = collectHotels();
    var state = getState();
    mapBounds = null;
    if (state && state.hotelCoordinates) {
      var points = hotels.filter(function (hotel) {
        return Array.isArray(state.hotelCoordinates[hotel.name]);
      }).map(function (hotel) {
        return state.hotelCoordinates[hotel.name];
      });
      if (points.length) {
        try { mapBounds = window.L.latLngBounds(points).pad(0.12); } catch (error) { /* ignore */ }
      }
    }

    mapInitializing = true;
    mapas.initializeAllHotelsMap(mapElement, hotels, {});
    captureMap();
  }

  function captureMap() {
    var started = Date.now();
    function check() {
      var state = getState();
      if (state && state.activeMap && mapElement && state.activeMap.getContainer && state.activeMap.getContainer() === mapElement) {
        shellMap = state.activeMap;
        if (document.body.dataset.mobileSheet === "map") state.activeMap = shellMap;
        setTimeout(function () { try { shellMap.invalidateSize(); } catch (error) { /* ignore */ } }, 80);
        if (pendingLocation) {
          var location = pendingLocation;
          pendingLocation = null;
          setTimeout(function () { focusShellOnLocation(location, true); }, 120);
        }
        return;
      }
      if (Date.now() - started < 4000) setTimeout(check, 100);
    }
    setTimeout(check, 100);
  }

  function currentUserLatLng() {
    var state = getState();
    var coords = state && state.currentPosition;
    if (!coords || typeof coords.latitude !== "number" || typeof coords.longitude !== "number") return null;
    return [coords.latitude, coords.longitude];
  }

  function ensureShellUserMarker(latlng) {
    if (!shellMap || !window.L) return;
    var state = getState();
    if (state && state.userMarker && state.userMarker._map === shellMap) {
      shellUserMarker = state.userMarker;
      shellUserMarker.setLatLng(latlng);
    } else if (shellUserMarker && shellUserMarker._map === shellMap) {
      shellUserMarker.setLatLng(latlng);
    } else {
      var size = 26;
      var html = '<div class="user-marker-wrap" style="position:relative;width:' + size + 'px;height:' + size + 'px;display:flex;align-items:center;justify-content:center;">' +
        '<div class="user-marker-pulse" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:72px;height:72px;pointer-events:none;">' +
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72" width="72" height="72"><circle class="user-pulse-ring" cx="36" cy="36" r="18" fill="none" stroke="#d4af37" stroke-width="2" opacity="0.6"></circle></svg></div>' +
        '<div class="user-marker-icon" style="position:relative;z-index:1;line-height:0;">' +
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="' + size + '" height="' + size + '"><path d="M12 0 L16 5.5 L8 5.5 Z" fill="#d4af37"/><circle cx="12" cy="8" r="4" fill="#d4af37"/><path d="M12 14c-4.41 0-8 2.59-8 6h16c0-3.41-3.59-6-8-6z" fill="#d4af37"/></svg></div></div>';
      shellUserMarker = window.L.marker(latlng, {
        icon: window.L.divIcon({ className: "user-marker-div", html: html, iconSize: [size, size], iconAnchor: [size / 2, size / 2] }),
        zIndexOffset: 1200
      }).addTo(shellMap).bindTooltip(lang() === "en" ? "Your location" : "Su ubicación actual");
    }
    if (state) {
      state.userMarker = shellUserMarker;
      state.activeMap = shellMap;
    }
    var locationApi = rd("location");
    if (locationApi && typeof locationApi.applyUserHeading === "function") {
      try { locationApi.applyUserHeading(shellUserMarker, shellMap); } catch (error) { /* ignore */ }
    }
  }

  function focusShellOnLocation(latlng, animated) {
    if (!shellMap) {
      pendingLocation = latlng;
      return;
    }
    ensureShellUserMarker(latlng);
    mapBounds = null;
    try {
      if (animated && shellMap.flyTo) shellMap.flyTo(latlng, 15, { duration: 1.1 });
      else shellMap.setView(latlng, 15);
    } catch (error) {
      try { shellMap.setView(latlng, 15); } catch (ignored) { /* ignore */ }
    }
  }

  function onLocationDetected(event) {
    var detail = event && event.detail;
    if (!detail || typeof detail.latitude !== "number" || typeof detail.longitude !== "number") return;
    var latlng = [detail.latitude, detail.longitude];
    pendingLocation = latlng;
    if (!active || !shellMap) return;
    if (document.body.dataset.mobileSheet === "map" && document.body.dataset.mobileHome === "1") {
      pendingLocation = null;
      setTimeout(function () { focusShellOnLocation(latlng, true); }, 120);
    }
  }

  function recenterMap() {
    if (!shellMap) return;
    var userLatLng = currentUserLatLng();
    try {
      if (userLatLng) focusShellOnLocation(userLatLng, true);
      else if (mapBounds) shellMap.fitBounds(mapBounds, { maxZoom: 6 });
      else shellMap.fitWorld ? shellMap.fitWorld() : shellMap.setView([20, -80], 3);
    } catch (error) { /* ignore */ }
  }

  function onTab(definition) {
    pendingMode = definition.id === "map" ? "map" : "section";
    pendingTab = definition.id;
    setSheet(pendingMode, definition.id);
    navigate(definition.route);
  }

  function onDockAction(action) {
    if (action === "search") {
      var trigger = document.getElementById("openSearchButton");
      if (trigger) trigger.click();
      return;
    }
    if (action === "hotels") {
      pendingMode = "section";
      pendingTab = "explore";
      if (document.querySelector("#appView .portal-hero-stats")) setSheet("section", "explore");
      else navigate("/");
      return;
    }
    if (action === "restaurants") {
      pendingMode = "section";
      pendingTab = "restaurants";
      setSheet("section", "restaurants");
      navigate("/restaurantes");
      return;
    }
    if (action === "pano") {
      pendingMode = "section";
      pendingTab = "pano";
      setSheet("section", "pano");
      navigate("/360");
      return;
    }
    if (action === "guide") {
      pendingMode = "map";
      pendingTab = "map";
      if (document.querySelector("#appView .portal-hero-stats")) setSheet("map", "map");
      else navigate("/");
      setGlobalGuideClosed(false);
      setGlobalGuideOpen(true);
      return;
    }
  }

  function toggleSheet() {
    var next = document.body.dataset.mobileSheet === "map" ? "section" : "map";
    pendingMode = next;
    pendingTab = next === "map" ? "map" : "explore";
    if (next === "map" && document.getElementById("appView") && !document.querySelector("#appView .portal-hero-stats")) {
      navigate("/");
    }
    setSheet(next, pendingTab);
  }

  function setSheet(mode, tab) {
    document.body.dataset.mobileSheet = mode;
    if (handle) handle.setAttribute("aria-expanded", mode === "section" ? "true" : "false");

    if (!shell) return;
    Array.prototype.forEach.call(shell.querySelectorAll(".mobile-tab"), function (button) {
      button.setAttribute("aria-selected", button.dataset.mobileTab === tab ? "true" : "false");
    });

    if (mode === "map") {
      var state = getState();
      if (state && shellMap) state.activeMap = shellMap;
      setTimeout(function () {
        if (shellMap) { try { shellMap.invalidateSize(); } catch (error) { /* ignore */ } }
      }, 360);
      if (pendingLocation) {
        var location = pendingLocation;
        pendingLocation = null;
        setTimeout(function () { focusShellOnLocation(location, true); }, 380);
      }
    }
    syncGlobalGuide();
  }

  function onDragStart(event) {
    suppressClick = false;
    drag = { id: event.pointerId, y: event.clientY, mode: document.body.dataset.mobileSheet, moved: false };
    try { handle.setPointerCapture(event.pointerId); } catch (error) { /* ignore */ }
  }

  function onDragMove(event) {
    if (!drag || drag.id !== event.pointerId) return;
    var distance = event.clientY - drag.y;
    if (Math.abs(distance) > 6) drag.moved = true;
    var offset = Math.min(0, Math.max(-130, distance));
    if (drag.mode !== "map") offset = Math.max(0, Math.min(130, distance));
    document.body.style.setProperty("--mob-drag", offset + "px");
  }

  function onDragEnd(event) {
    if (!drag || drag.id !== event.pointerId) return;
    var distance = event.clientY - drag.y;
    document.body.style.setProperty("--mob-drag", "0px");
    var moved = drag.moved;
    var next = drag.mode;
    if (drag.mode === "map" && distance < -58) next = "section";
    if (drag.mode !== "map" && distance > 58) next = "map";
    drag = null;
    if (moved) suppressClick = true;
    if (next !== document.body.dataset.mobileSheet) {
      pendingMode = next;
      pendingTab = next === "map" ? "map" : "explore";
      setSheet(next, pendingTab);
    }
  }

  function isNativeRoute() {
    if (document.body.classList.contains("cart-map-focus-open")) return true;
    return !!document.querySelector(".hotel-complex-map-wrap[data-guide-wrap], .hotel-guide-panel[data-guide-overlay]");
  }

  function inferTab(isHome) {
    if (pendingTab) return pendingTab;
    if (document.querySelector(".restaurant-portal-page, .restaurant-portal")) return "restaurants";
    if (document.querySelector(".media360-spread")) return "pano";
    if (document.querySelector(".cart-page, #videosForm, .media-spread")) return "explore";
    if (isHome || document.querySelector(".portal-page")) return "explore";
    return "explore";
  }

  function syncFromDom() {
    if (!active) return;
    if (isNativeRoute()) {
      deactivate();
      return;
    }
    var appView = document.getElementById("appView");
    var stage = document.querySelector(".magazine-stage");
    var isHome = !!document.querySelector("#appView .portal-hero-stats");
    var render = appView && appView.children.length ? "app" : "stage";
    if (render === "stage" && !stage) render = "app";

    document.body.dataset.mobileRender = render;
    document.body.dataset.mobileHome = isHome ? "1" : "0";

    var mode = pendingMode;
    if (!mode) {
      if (isHome) mode = !wasHome ? "map" : (document.body.dataset.mobileSheet === "section" ? "section" : "map");
      else mode = "section";
    }

    var tab = inferTab(isHome);
    if (mode === "map") tab = "map";

    pendingMode = null;
    pendingTab = null;
    wasHome = isHome;
    setSheet(mode, tab);
  }

  function scheduleSync() {
    if (syncQueued) return;
    syncQueued = true;
    window.requestAnimationFrame(function () {
      syncQueued = false;
      if (observer) {
        observer.disconnect();
        var currentAppView = document.getElementById("appView");
        var currentBookShell = document.getElementById("bookShell");
        if (currentAppView) observer.observe(currentAppView, { childList: true, subtree: true });
        if (currentBookShell) observer.observe(currentBookShell, { childList: true, subtree: true });
        observer.observe(document.body, { childList: true });
      }
      apply();
    });
  }

  function deactivate() {
    if (!active) return;
    active = false;
    document.body.classList.remove("mobile-app-active");
    delete document.body.dataset.mobileSheet;
    delete document.body.dataset.mobileRender;
    delete document.body.dataset.mobileHome;
    document.body.style.removeProperty("--mob-drag");
    syncGlobalGuide();
  }

  function apply() {
    if (!isMobile()) {
      deactivate();
      return;
    }

    ensureHeaderActions();
    buildShell();

    if (isNativeRoute()) {
      deactivate();
      return;
    }

    if (!active) {
      active = true;
      document.body.classList.add("mobile-app-active");
      wasHome = !!document.querySelector("#appView .portal-hero-stats");
      var existingLocation = currentUserLatLng();
      if (existingLocation) pendingLocation = existingLocation;
      if (shellMap) {
        setTimeout(function () { try { shellMap.invalidateSize(); } catch (error) { /* ignore */ } }, 80);
      }
    }

    initHomeMap();
    syncFromDom();
    syncGlobalGuide();
  }

  function initialize() {
    window.addEventListener("revistadigital:locationdetected", onLocationDetected);
    apply();

    var appView = document.getElementById("appView");
    var bookShell = document.getElementById("bookShell");
    if (window.MutationObserver) {
      observer = new window.MutationObserver(scheduleSync);
      observer.observe(document.body, { childList: true });
      if (appView) observer.observe(appView, { childList: true, subtree: true });
      if (bookShell) observer.observe(bookShell, { childList: true, subtree: true });
      globalObserver = new window.MutationObserver(syncGlobalGuide);
      globalObserver.observe(document.body, { attributes: true, attributeFilter: ["class", "data-mobile-home", "data-mobile-sheet"] });
    }
    window.addEventListener("revistadigital:locationdetected", function () {
      if (globalHotels) renderGlobalGuide();
      updateGlobalCard();
    });
    window.addEventListener("popstate", scheduleSync);
    window.addEventListener("pageshow", function (event) {
      if (!event.persisted) return;
      globalGuideWasHome = false;
      resetGlobalGuideState();
      syncGlobalGuide();
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && document.body.dataset.mobileGuide === "1") closeGuide();
    });
    window.addEventListener("languagechange", function () {
      updateLabels();
    });

    function onMediaChange() {
      apply();
    }
    if (MQ.addEventListener) MQ.addEventListener("change", onMediaChange);
    else if (MQ.addListener) MQ.addListener(onMediaChange);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize);
  } else {
    initialize();
  }
})();