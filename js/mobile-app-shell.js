(function () {
  "use strict";

  var MQ = window.matchMedia("(max-width: 768px)");
  var HOTEL_POI_RADIUS = 200;
  var HOTEL_POI_ORIGINS = {
    "Iberostar Selection Paraíso del Mar": [
      [20.7612389, -86.9640931],
      [20.762034, -86.962601],
      [20.7615600, -86.9631079],
      [20.7608500, -86.9630000],
      [20.7614300, -86.9653800]
    ],
    "Iberostar Waves Paraíso Beach": [
      [20.7584000, -86.9585000],
      [20.7589509, -86.9583723],
      [20.7586720, -86.9590080],
      [20.7585610, -86.9596730],
      [20.7582520, -86.9577750]
    ],
    "Iberostar Waves Paraíso Lindo": [
      [20.7596096, -86.9639649],
      [20.7600720, -86.9652570],
      [20.7599330, -86.9658300],
      [20.7580290, -86.9634370],
      [20.7581760, -86.9631160],
      [20.7580560, -86.9618530]
    ],
    "Iberostar Selection Paraíso Maya": [
      [20.7578835, -86.9648766],
      [20.7574900, -86.9645230],
      [20.7574500, -86.9613520],
      [20.7578100, -86.9615200],
      [20.7568700, -86.9597400]
    ],
    "JOIA Paraíso by Iberostar": [
      [20.7563073, -86.9629786],
      [20.7561600, -86.9622900],
      [20.7560800, -86.9613300],
      [20.7547000, -86.9605000],
      [20.7551200, -86.9613700]
    ]
  };
  var HOTEL_POI_EXCLUDED_IDS = {
    "preview-gallery": true,
    "courtesy-room": true,
    "waterfall-jacuzzi": true,
    "meeting-room": true,
    "billiards-library": true
  };
  var HOTEL_POI_FORCED_IDS = {
    "Iberostar Waves Paraíso Lindo": ["pool-bar-las-olas", "la-pagoda", "lemon-spices", "starmarket", "el-tapatio", "bar-el-puente", "aqua-bar-las-rocas", "under-the-sea"],
    "Iberostar Selection Paraíso Maya": ["bar-el-puente", "aqua-bar-las-rocas", "starmarket", "under-the-sea"]
  };
  var ICONS = {
    map: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3 3 5v16l6-2 6 2 6-2V3l-6 2-6-2Z"/><path d="M9 3v16M15 5v16"/></svg>',
    explore: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m15 9-2 4-4 2 2-4 4-2Z"/></svg>',
    restaurants: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3v7a3 3 0 0 0 6 0V3M9 3v18M17 3c2 2 2 5 0 7v11"/></svg>',
    transport: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7h12a3 3 0 0 1 3 3v5H6a3 3 0 0 1-3-3V7Z"/><path d="M3 10h15"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>',
    pano: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></svg>',
    search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>',
    locate: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg>',
    recenter: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5M20 15v5h-5M20 9V4h-5M4 15v5h5"/><circle cx="12" cy="12" r="3"/></svg>',
    user: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c.8-4 3.8-6 8-6s7.2 2 8 6"/></svg>'
  };

  var TAB_DEFS = [
    { id: "map", route: "/", es: "Mapa", en: "Map" },
    { id: "explore", route: "/", es: "Explorar", en: "Explore" },
    { id: "restaurants", route: "/restaurantes", es: "Restaurantes", en: "Dining" },
    { id: "transport", route: "/carrito-golf", es: "Transporte", en: "Transportation" },
    { id: "pano", route: "/360", es: "360°", en: "360°" }
  ];

  var shell = null;
  var exploreSheet = null;
  var transportSheet = null;
  var guideOverlay = null;
  var guideCountry = null;
  var guideQuery = "";
  var shellUserMarker = null;
  var pendingLocation = null;
  var pendingGlobalPoiId = null;
  var pendingGlobalPoiNotice = "";
  var lastGlobalRoutePoiId = null;
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
  var globalPoiMode = false;
  var globalPoiHotelId = null;
  var globalPoiQuery = "";
  var nearbyRouteLine = null;
  var nearbyRouteRenderer = null;
  var nearbyRouteAbort = null;
  var nearbyRouteToken = 0;
  var nearbyRouteDetail = "";
  var nearbyRerouteAt = 0;
  var nearbyDot = null;
  var nearbyBadge = null;
  var nearbyRaf = 0;
  var nearbyKey = "";
  var nearbyItem = null;
  var nearbyPoiLayer = null;
  var nearbyPoiLabelLayer = null;
  var nearbyPoiHotelId = null;
  var nearbyPoiPreviousMap = null;
  var authState = null;
  var loginOverlay = null;
  var loginForm = null;
  var loginEmail = null;
  var loginPassword = null;
  var loginError = null;
  var loginSubmit = null;
  var loginName = null;
  var loginReveal = null;
  var loginHotel = null;
  var loginShift = null;
  var loginCode = null;
  var loginDriverCode = null;
  var loginMode = "login";
  var loginRole = "socio";
  var loginBusy = false;
  var authPanel = null;
  var accountButton = null;

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

  function escapeHtml(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (character) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character];
    });
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
    if (!header) return;

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
      header.appendChild(search);
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
      header.appendChild(language);
    }

    if (!document.getElementById("mobileAccountButton")) {
      accountButton = document.createElement("button");
      accountButton.type = "button";
      accountButton.id = "mobileAccountButton";
      accountButton.className = "mobile-header-btn mobile-account-btn";
      accountButton.innerHTML = ICONS.user;
      accountButton.hidden = true;
      accountButton.addEventListener("click", openAuthPanel);
      header.appendChild(accountButton);
    } else {
      accountButton = document.getElementById("mobileAccountButton");
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
    if (accountButton) {
      accountButton.hidden = !authState;
      accountButton.setAttribute("aria-label", lang() === "en" ? "Account and services" : "Cuenta y servicios");
    }
  }

  function setLoginRole(role) {
    loginRole = role === "chofer" ? "chofer" : "socio";
    if (!loginOverlay) return;
    Array.prototype.forEach.call(loginOverlay.querySelectorAll("[data-login-role]"), function (button) {
      button.setAttribute("aria-pressed", button.dataset.loginRole === loginRole ? "true" : "false");
    });
    updateLoginLabels();
    if (loginEmail) loginEmail.focus();
  }

  function updateLoginLabels() {
    if (!loginOverlay) return;
    var en = lang() === "en";
    var registering = loginMode === "register";
    var showingPassword = Boolean(loginPassword && loginPassword.type === "text");
    var setValue = function (selector, value) {
      var node = loginOverlay.querySelector(selector);
      if (node) node.textContent = value;
    };
    loginOverlay.dataset.loginView = loginMode;
    setValue("[data-login-mark]", registering
      ? (en ? "THE CLUB · CREATE ACCOUNT" : "THE CLUB · ALTA DE CUENTA")
      : (en ? "THE CLUB · SECURE ACCESS" : "THE CLUB · ACCESO SEGURO"));
    setValue("[data-login-title]", registering ? (en ? "Create account" : "Crear cuenta") : (en ? "Secure sign in" : "Acceso seguro"));
    setValue("[data-login-copy]", registering
      ? (en ? "Create your account in a few steps." : "Crea tu cuenta en unos pasos.")
      : (en ? "Enter your member number and password." : "Ingresa tu número de socio y contraseña."));
    setValue("[data-login-role-title]", en ? "Account type" : "Tipo de cuenta");
    setValue("[data-login-credentials-title]", registering
      ? (en ? "Your details" : "Tus datos")
      : (en ? "Member access" : "Acceso de socio"));
    setValue("[data-login-driver-title]", en ? "Driver details" : "Datos del chofer");
    setValue('[data-login-mode="login"]', en ? "Sign in" : "Entrar");
    setValue('[data-login-mode="register"]', en ? "Register" : "Registrarme");
    setValue('[data-login-role="socio"]', en ? "Member" : "Socio");
    setValue('[data-login-role="chofer"]', en ? "Driver" : "Chofer");
    setValue("[data-login-email-label]", registering ? (en ? "Email" : "Email") : (en ? "Member number" : "Número de socio"));
    setValue("[data-login-password-label]", registering ? (en ? "Password (min. 6 characters)" : "Contraseña (mín. 6 caracteres)") : (en ? "Password" : "Contraseña"));
    setValue("[data-login-reveal]", showingPassword ? (en ? "Hide" : "Ocultar") : (en ? "Show" : "Ver"));
    setValue("[data-login-name-label]", en ? "Full name" : "Nombre completo");
    setValue("[data-login-driver-code-label]", en ? "Driver number" : "Número de chofer");
    setValue("[data-login-hotel-label]", en ? "Assigned hotel" : "Hotel asignado");
    setValue("[data-login-shift-label]", en ? "Shift" : "Turno");
    setValue("[data-login-code-label]", en ? "Member number" : "Número de socio");
    setValue("[data-login-submit]", loginBusy
      ? (registering ? (en ? "Creating…" : "Creando cuenta…") : (en ? "Signing in…" : "Entrando…"))
      : (registering ? (en ? "Create account" : "Crear cuenta") : (en ? "Sign in" : "Entrar")));
    setValue("[data-login-note]", registering
      ? (en
        ? "Members need an active invitation code. Drivers register with their number."
        : "Los socios necesitan un código activo. Los choferes se registran con su número.")
      : (en
        ? "Use your member number and password."
        : "Usa tu número de socio y contraseña."));
    Array.prototype.forEach.call(loginOverlay.querySelectorAll("[data-login-mode]"), function (button) {
      button.setAttribute("aria-pressed", button.dataset.loginMode === loginMode ? "true" : "false");
    });
    Array.prototype.forEach.call(loginOverlay.querySelectorAll("[data-register-field]"), function (field) {
      field.hidden = !registering;
    });
    Array.prototype.forEach.call(loginOverlay.querySelectorAll("[data-driver-field]"), function (field) {
      field.hidden = !registering || loginRole !== "chofer";
    });
    Array.prototype.forEach.call(loginOverlay.querySelectorAll("[data-member-field]"), function (field) {
      field.hidden = !registering || loginRole !== "socio";
    });
    if (loginEmail) {
      loginEmail.setAttribute("type", registering ? "email" : "text");
      loginEmail.setAttribute("inputmode", registering ? "email" : "numeric");
      loginEmail.setAttribute("autocomplete", registering ? "email" : "username");
    }
    if (loginPassword) loginPassword.setAttribute("autocomplete", registering ? "new-password" : "current-password");
    if (loginReveal) loginReveal.setAttribute("aria-pressed", showingPassword ? "true" : "false");
    [loginSubmit, loginEmail, loginPassword, loginReveal, loginName, loginHotel, loginShift, loginCode, loginDriverCode].forEach(function (input) {
      if (input) input.disabled = loginBusy;
    });
  }

  function setLoginMode(mode) {
    loginMode = mode === "register" ? "register" : "login";
    setLoginError("");
    updateLoginLabels();
    if (loginEmail) loginEmail.focus();
  }

  function setLoginError(message) {
    if (loginError) loginError.textContent = message || "";
  }

  function setLoginBusy(busy) {
    loginBusy = !!busy;
    updateLoginLabels();
  }

  function submitLogin() {
    if (loginMode === "register") {
      submitRegister();
      return;
    }
    var auth = rd("appAuth");
    if (loginBusy) return;
    if (!auth || typeof auth.signIn !== "function") {
      setLoginError("El servicio de acceso no está disponible.");
      return;
    }
    setLoginError("");
    setLoginBusy(true);
    auth.signIn(loginEmail ? loginEmail.value : "", loginPassword ? loginPassword.value : "").then(
      function () {
        setLoginBusy(false);
        hideLogin();
        apply();
      },
      function (error) {
        setLoginBusy(false);
        setLoginError((error && error.message) || "No se pudo iniciar sesión.");
        if (loginPassword) {
          loginPassword.value = "";
          loginPassword.focus();
        }
      }
    );
  }

  function submitRegister() {
    var auth = rd("appAuth");
    if (loginBusy) return;
    if (!auth || typeof auth.signUp !== "function") {
      setLoginError("El servicio de registro no está disponible.");
      return;
    }
    var email = loginEmail ? loginEmail.value.trim() : "";
    var password = loginPassword ? loginPassword.value : "";
    if (!email) {
      setLoginError("Escribe tu email.");
      if (loginEmail) loginEmail.focus();
      return;
    }
    if (password.length < 6) {
      setLoginError("La contraseña debe tener al menos 6 caracteres.");
      if (loginPassword) loginPassword.focus();
      return;
    }
    setLoginError("");
    setLoginBusy(true);
    auth.signUp({
      email: email,
      password: password,
      role: loginRole,
      displayName: loginName ? loginName.value : "",
      assignedHotel: loginHotel ? loginHotel.value : "",
      shift: loginShift ? loginShift.value : "",
      registrationCode: loginCode ? loginCode.value : "",
      accessCode: loginDriverCode ? loginDriverCode.value : ""
    }).then(
      function (result) {
        setLoginBusy(false);
        if (result && result.needsConfirmation) {
          setLoginMode("login");
          setLoginError(lang() === "en"
            ? "Check your email to confirm the account, then sign in."
            : "Revisa tu email para confirmar la cuenta y luego entra.");
          if (loginPassword) loginPassword.value = "";
          if (loginCode) loginCode.value = "";
          if (loginDriverCode) loginDriverCode.value = "";
          return;
        }
        hideLogin();
        apply();
      },
      function (error) {
        setLoginBusy(false);
        setLoginError((error && error.message) || "No se pudo crear la cuenta.");
        if (loginPassword) loginPassword.value = "";
        if (loginPassword) loginPassword.focus();
      }
    );
  }

  function showLogin() {
    setLoginMode("login");
    if (loginOverlay) loginOverlay.hidden = false;
    document.body.dataset.mobileLogin = "1";
  }

  function hideLogin() {
    if (loginOverlay) loginOverlay.hidden = true;
    delete document.body.dataset.mobileLogin;
    setLoginError("");
    if (loginPassword) loginPassword.value = "";
    if (loginCode) loginCode.value = "";
    if (loginDriverCode) loginDriverCode.value = "";
  }

  function loginRequired() {
    return !authState;
  }

  function openAuthPanel() {
    if (!authState) return;
    updateAuthPanel();
    if (!authPanel) return;
    authPanel.hidden = false;
    document.body.dataset.mobileAuthPanel = "1";
    var close = authPanel.querySelector("[data-auth-close]");
    if (close) close.focus();
  }

  function closeAuthPanel() {
    if (authPanel) authPanel.hidden = true;
    delete document.body.dataset.mobileAuthPanel;
  }

  function updateAuthPanel() {
    if (!authPanel) return;
    var profile = authState && authState.profile;
    var email = authState && authState.session && authState.session.user ? authState.session.user.email : "";
    var en = lang() === "en";
    var setValue = function (selector, value) {
      var node = authPanel.querySelector(selector);
      if (node) node.textContent = value;
    };
    var driverOnly = profile && profile.role === "chofer";
    var memberOnly = profile && profile.role === "socio";

    setValue("[data-auth-role-label]", !profile ? "" : profile.role === "chofer" ? (en ? "Driver" : "Chofer") : (en ? "Member" : "Socio"));
    setValue("[data-auth-identity]", profile && profile.displayName ? profile.displayName : (en ? "Your account" : "Tu cuenta"));
    setValue("[data-auth-email]", email || "");
    setValue("[data-auth-code-label]", en ? "Member code" : "Código de socio");
    setValue("[data-auth-code]", profile && profile.memberCode ? profile.memberCode : "—");
    setValue("[data-auth-hotel-label]", en ? "Assigned hotel" : "Hotel asignado");
    setValue("[data-auth-hotel]", profile && profile.assignedHotel ? profile.assignedHotel : (en ? "No active assignment" : "Sin asignación activa"));
    setValue("[data-auth-shift-label]", en ? "Shift" : "Turno");
    setValue("[data-auth-shift]", profile && profile.shift ? profile.shift : "—");
    setValue("[data-auth-map]", en ? "View resort map" : "Ver mapa del complejo");
    setValue("[data-auth-logout]", en ? "Sign out" : "Cerrar sesión");

    Array.prototype.forEach.call(authPanel.querySelectorAll("[data-auth-driver-only]"), function (node) {
      node.hidden = !driverOnly;
    });
    Array.prototype.forEach.call(authPanel.querySelectorAll("[data-auth-member-only]"), function (node) {
      node.hidden = !memberOnly;
    });
    var mapButton = authPanel.querySelector("[data-auth-map]");
    if (mapButton) mapButton.hidden = !driverOnly;
  }

  function onAuthState(state) {
    authState = state && state.profile && state.session ? state : null;
    if (authState) {
      document.body.dataset.appRole = authState.profile.role;
      hideLogin();
      closeAuthPanel();
    } else {
      delete document.body.dataset.appRole;
      closeAuthPanel();
      showLogin();
    }
    updateHeaderLabels();
    updateAuthPanel();
    apply();
  }

  function buildShell() {
    if (shell) return;

    shell = document.createElement("div");
    shell.id = "mobileAppShell";
    shell.className = "mobile-app-shell";
    shell.innerHTML =
      '<div class="mobile-app-map" id="mobileHomeMap" role="application"></div>' +
      '<div class="mobile-map-fabs">' +
        '<button type="button" class="mobile-map-fab mobile-map-fab-cancel" id="mobileMapCancelRoute" aria-label="Cancelar ruta">Cancelar ruta</button>' +
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
          '<button type="button" class="mobile-explore-chip" data-explore="pano"></button>' +
        '</div>' +
        '<div class="mobile-explore-body">' +
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

    transportSheet = document.createElement("section");
    transportSheet.id = "mobileTransportSheet";
    transportSheet.className = "mobile-transport-sheet";
    transportSheet.innerHTML =
      '<div class="mobile-explore-head">' +
        '<div><p data-transport-kicker></p><h2 data-transport-title></h2></div>' +
        '<button type="button" class="mobile-explore-close" data-transport-close aria-label="Cerrar">×</button>' +
      '</div>' +
      '<div class="mobile-transport-mount cart-page"></div>';
    document.body.appendChild(transportSheet);
    transportSheet.addEventListener("click", function (event) {
      if (!event.target.closest("[data-transport-close]")) return;
      pendingMode = "map";
      pendingTab = "map";
      setSheet("map", "map");
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
    shell.querySelector("#mobileMapCancelRoute").addEventListener("click", cancelRouteFromMap);
    buildGlobalGuideSheet();
    buildLoginOverlay();
    buildAuthPanel();
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

  function buildLoginOverlay() {
    if (loginOverlay) return;

    loginOverlay = document.createElement("div");
    loginOverlay.id = "mobileLogin";
    loginOverlay.className = "mobile-login";
    loginOverlay.setAttribute("role", "dialog");
    loginOverlay.setAttribute("aria-modal", "true");
    loginOverlay.hidden = true;
    loginOverlay.innerHTML =
      '<div class="mobile-login__brand">' +
        '<picture>' +
          '<source type="image/webp" srcset="src/logo%20png-01-320.webp 320w, src/logo%20png-01-640.webp 640w, src/logo%20png-01-1280.webp 1280w, src/logo%20png-01.webp 1920w" sizes="(max-width:420px) 58vw, 176px" />' +
          '<img src="src/logo%20png-01.png" alt="Iberostar The Club" loading="eager" decoding="async" />' +
        '</picture>' +
      '</div>' +
      '<form class="mobile-login__card" id="mobileLoginForm">' +
        '<header class="mobile-login__header">' +
          '<p class="mobile-login__mark" data-login-mark></p>' +
          '<h1 class="mobile-login__title" data-login-title></h1>' +
          '<p class="mobile-login__copy" data-login-copy></p>' +
        '</header>' +
        '<section class="mobile-login__section mobile-login__section--tabs">' +
          '<div class="mobile-login__tabs" role="group" aria-label="Modo de acceso">' +
            '<button type="button" class="mobile-login__tab" data-login-mode="login" aria-pressed="true"></button>' +
            '<button type="button" class="mobile-login__tab" data-login-mode="register" aria-pressed="false"></button>' +
          '</div>' +
        '</section>' +
        '<section class="mobile-login__section" data-register-field hidden>' +
          '<p class="mobile-login__section-title" data-login-role-title></p>' +
          '<div class="mobile-login__roles" role="group" aria-label="Tipo de acceso">' +
            '<button type="button" class="mobile-login__role" data-login-role="socio" aria-pressed="true"></button>' +
            '<button type="button" class="mobile-login__role" data-login-role="chofer" aria-pressed="false"></button>' +
          '</div>' +
        '</section>' +
        '<section class="mobile-login__section" data-register-field data-member-field hidden>' +
          '<label class="mobile-login__field">' +
            '<span data-login-code-label></span>' +
            '<input id="mobileLoginCode" name="registrationCode" type="text" inputmode="numeric" autocomplete="off" />' +
          '</label>' +
        '</section>' +
        '<section class="mobile-login__section" data-register-field data-driver-field hidden>' +
          '<p class="mobile-login__section-title" data-login-driver-title></p>' +
          '<label class="mobile-login__field">' +
            '<span data-login-driver-code-label></span>' +
            '<input id="mobileLoginDriverCode" name="accessCode" type="text" inputmode="numeric" autocomplete="off" />' +
          '</label>' +
          '<div class="mobile-login__row">' +
            '<label class="mobile-login__field">' +
              '<span data-login-hotel-label></span>' +
              '<input id="mobileLoginHotel" name="assignedHotel" type="text" autocomplete="organization" />' +
            '</label>' +
            '<label class="mobile-login__field">' +
              '<span data-login-shift-label></span>' +
              '<input id="mobileLoginShift" name="shift" type="text" autocomplete="off" />' +
            '</label>' +
          '</div>' +
        '</section>' +
        '<section class="mobile-login__section">' +
          '<p class="mobile-login__section-title" data-login-credentials-title></p>' +
          '<label class="mobile-login__field">' +
            '<span data-login-email-label></span>' +
            '<input id="mobileLoginEmail" name="email" type="text" inputmode="numeric" autocomplete="username" />' +
          '</label>' +
          '<div class="mobile-login__field mobile-login__field--password">' +
            '<label for="mobileLoginPassword" data-login-password-label></label>' +
            '<div class="mobile-login__input">' +
              '<input id="mobileLoginPassword" name="password" type="password" autocomplete="current-password" />' +
              '<button type="button" class="mobile-login__reveal" data-login-reveal aria-pressed="false"></button>' +
            '</div>' +
          '</div>' +
          '<label class="mobile-login__field" data-register-field hidden>' +
            '<span data-login-name-label></span>' +
            '<input id="mobileLoginName" name="displayName" type="text" autocomplete="name" />' +
          '</label>' +
        '</section>' +
        '<div class="mobile-login__actions">' +
          '<button type="submit" class="mobile-login__submit" data-login-submit></button>' +
          '<p class="mobile-login__error" data-login-error role="alert" aria-live="polite"></p>' +
          '<p class="mobile-login__note" data-login-note></p>' +
        '</div>' +
      '</form>';
    document.body.appendChild(loginOverlay);

    loginForm = loginOverlay.querySelector("#mobileLoginForm");
    loginEmail = loginOverlay.querySelector("#mobileLoginEmail");
    loginPassword = loginOverlay.querySelector("#mobileLoginPassword");
    loginReveal = loginOverlay.querySelector("[data-login-reveal]");
    loginName = loginOverlay.querySelector("#mobileLoginName");
    loginHotel = loginOverlay.querySelector("#mobileLoginHotel");
    loginShift = loginOverlay.querySelector("#mobileLoginShift");
    loginCode = loginOverlay.querySelector("#mobileLoginCode");
    loginDriverCode = loginOverlay.querySelector("#mobileLoginDriverCode");
    loginError = loginOverlay.querySelector("[data-login-error]");
    loginSubmit = loginOverlay.querySelector("[data-login-submit]");
    [loginCode, loginDriverCode].forEach(function (input) {
      if (input) input.addEventListener("input", function () {
        input.value = input.value.toUpperCase();
      });
    });

    loginOverlay.addEventListener("click", function (event) {
      var revealTrigger = event.target.closest("[data-login-reveal]");
      if (revealTrigger) {
        if (loginPassword) {
          loginPassword.type = loginPassword.type === "password" ? "text" : "password";
          updateLoginLabels();
          loginPassword.focus();
        }
        return;
      }
      var modeTrigger = event.target.closest("[data-login-mode]");
      if (modeTrigger) {
        setLoginMode(modeTrigger.dataset.loginMode);
        return;
      }
      var roleTrigger = event.target.closest("[data-login-role]");
      if (!roleTrigger) return;
      setLoginRole(roleTrigger.dataset.loginRole);
    });
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      submitLogin();
    });

    updateLoginLabels();
  }

  function buildAuthPanel() {
    if (authPanel) return;

    authPanel = document.createElement("div");
    authPanel.id = "mobileAuthPanel";
    authPanel.className = "mobile-auth-panel";
    authPanel.setAttribute("role", "dialog");
    authPanel.setAttribute("aria-modal", "true");
    authPanel.hidden = true;
    authPanel.innerHTML =
      '<section class="mobile-auth-panel__sheet">' +
        '<div class="mobile-auth-panel__grip" aria-hidden="true"></div>' +
        '<div class="mobile-auth-panel__head">' +
          '<div>' +
            '<span class="mobile-auth-panel__role" data-auth-role-label></span>' +
            '<h2 class="mobile-auth-panel__identity" data-auth-identity></h2>' +
            '<p class="mobile-auth-panel__email" data-auth-email></p>' +
          '</div>' +
          '<button type="button" class="mobile-auth-panel__close" data-auth-close aria-label="Cerrar">×</button>' +
        '</div>' +
        '<div class="mobile-auth-panel__details">' +
          '<div class="mobile-auth-panel__row" data-auth-member-only>' +
            '<span data-auth-code-label></span><strong data-auth-code></strong>' +
          '</div>' +
          '<div class="mobile-auth-panel__row" data-auth-driver-only hidden>' +
            '<span data-auth-hotel-label></span><strong data-auth-hotel></strong>' +
          '</div>' +
          '<div class="mobile-auth-panel__row" data-auth-driver-only hidden>' +
            '<span data-auth-shift-label></span><strong data-auth-shift></strong>' +
          '</div>' +
        '</div>' +
        '<div class="mobile-auth-panel__actions">' +
          '<button type="button" class="mobile-auth-panel__primary" data-auth-map hidden></button>' +
          '<button type="button" class="mobile-auth-panel__secondary" data-auth-logout></button>' +
        '</div>' +
      '</section>';
    document.body.appendChild(authPanel);

    authPanel.addEventListener("click", function (event) {
      if (event.target === authPanel || event.target.closest("[data-auth-close]")) {
        closeAuthPanel();
        return;
      }
      if (event.target.closest("[data-auth-map]")) {
        closeAuthPanel();
        pendingMode = "map";
        pendingTab = "map";
        if (document.getElementById("appView") && !document.querySelector("#appView .portal-hero-stats")) navigate("/");
        setSheet("map", "map");
        return;
      }
      if (event.target.closest("[data-auth-logout]")) {
        var auth = rd("appAuth");
        if (!auth || typeof auth.signOut !== "function") {
          onAuthState(null);
          return;
        }
        auth.signOut().then(closeAuthPanel).catch(closeAuthPanel);
      }
    });

    updateAuthPanel();
  }

  function buildGlobalGuideSheet() {
    if (globalSheet) return;

    globalSheet = document.createElement("section");
    globalSheet.id = "mobileGlobalGuide";
    globalSheet.className = "mgs-sheet";
    globalSheet.setAttribute("role", "region");
    globalSheet.innerHTML =
      '<button type="button" class="mgs-icon-btn mgs-exit mgs-exit-corner" data-mgs-exit>×</button>' +
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
            '<button type="button" class="mgs-icon-btn" data-mgs-global>↩</button>' +
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
      if (event.target.closest("[data-mgs-global]")) {
        exitGlobalPoiMode();
        return;
      }
      var poiHotel = event.target.closest("[data-mgs-poi-hotel]");
      if (poiHotel) {
        switchGlobalPoiHotel(poiHotel.dataset.mgsPoiHotel);
        return;
      }
      var poi = event.target.closest("[data-mgs-poi]");
      if (poi) {
        selectGlobalPoi(poi.dataset.mgsPoi);
        return;
      }
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
        var expanded = !globalSheet.classList.contains("mgs-expanded");
        setGlobalGuideOpen(expanded);
        if (expanded) setTimeout(function () { globalInput.focus(); }, 240);
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
      if (globalPoiMode) {
        globalPoiQuery = event.target.value || "";
        renderGlobalGuide();
        return;
      }
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
        '<button type="button" class="mgs-card-action mgs-card-action--primary" data-mgs-card-action="route"></button>' +
      '</div>';
    globalCard.addEventListener("click", function (event) {
      var actionButton = event.target.closest("[data-mgs-card-action]");
      if (!actionButton) return;
      var action = actionButton.dataset.mgsCardAction;
      if (action === "close") {
        globalSelected = null;
        updateGlobalCard();
        renderGlobalGuide();
      } else if (action === "route" && globalSelected) {
        setGlobalGuideClosed(true);
        traceRouteToHotel(globalSelected);
      }
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

  function updateGlobalGuideToggleLabel() {
    if (!globalSheet) return;
    var english = lang() === "en";
    var expanded = globalSheet.classList.contains("mgs-expanded");
    var text = expanded ? (english ? "Minimize" : "Minimizar") : (english ? "Expand" : "Ampliar");
    globalSheet.querySelector(".mgs-search-text").textContent = text;
    globalSheet.querySelector(".mgs-open-arrow").textContent = expanded ? "⌄" : "↑";
    globalSheet.querySelector(".mgs-search").setAttribute("aria-label", text);
  }

  function updateGlobalGuideLabels() {
    if (!globalSheet || !globalCard || !globalReopen) return;
    var english = lang() === "en";
    var guideTitle = globalPoiMode
      ? (english ? "Interactive guide" : "Guía interactiva")
      : label("menuGuia", "Guía global", "Global guide");
    var searchLabel = globalPoiMode
      ? (english ? "Search points of interest…" : "Buscar puntos de interés…")
      : label("navSearch", "Buscar hoteles, destinos…", "Search hotels, destinations…");
    globalSheet.setAttribute("aria-label", guideTitle);
    globalSheet.querySelector(".mgs-title strong").textContent = guideTitle;
    globalSheet.querySelector(".mgs-title span").textContent = globalPoiMode
      ? (english ? "Points of interest at the selected hotel" : "Puntos de interés del hotel seleccionado")
      : (english ? "All countries, destinations and hotels" : "Todos los países, destinos y hoteles");
    updateGlobalGuideToggleLabel();
    globalSheet.querySelector(".mgs-search-hint").textContent = english ? "Explore" : "Explorar";
    globalInput.placeholder = searchLabel;
    globalInput.setAttribute("aria-label", searchLabel);
    globalSheet.querySelector(".mgs-filter-label span").textContent = globalPoiMode
      ? (english ? "Filter by hotel" : "Filtrar por hotel")
      : (english ? "Filter by country" : "Filtrar por país");
    var globalBack = globalSheet.querySelector("[data-mgs-global]");
    globalBack.style.display = globalPoiMode ? "" : "none";
    globalBack.setAttribute("aria-label", english ? "Back to global guide" : "Volver a la guía global");
    globalSheet.querySelector("[data-mgs-exit]").setAttribute("aria-label", english ? "Close guide" : "Cerrar guía");
    globalReopen.querySelector("[data-mgs-reopen-label]").textContent = english ? "Global guide" : "Guía global";
    globalReopen.setAttribute("aria-label", english ? "Open global guide" : "Abrir guía global");
    globalCard.querySelector(".mgs-card-kicker").textContent = english ? "Selected hotel" : "Hotel seleccionado";
    globalCard.querySelector('[data-mgs-card-action="route"]').textContent = english ? "Trace route" : "Trazar ruta";
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
    if (globalPoiMode) {
      renderGlobalPoiGuide();
      return;
    }
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

  function globalPoiHotels() {
    var gp = rd("guiapa");
    if (!gp || !Array.isArray(gp.POIS)) return Object.keys(HOTEL_POI_ORIGINS);
    return gp.POIS.filter(function (poi) { return poi && poi.category === "hotel"; })
      .map(function (poi) { return poi.hotelId || poi.name; })
      .filter(Boolean);
  }

  function shortGlobalPoiHotel(name) {
    return String(name || "")
      .replace(/^Iberostar\s+(Selection\s+|Waves\s+)?/i, "")
      .replace(/\s+by Iberostar$/i, "");
  }

  function renderGlobalPoiGuide() {
    var gp = rd("guiapa");
    var pois = poisForHotel(globalPoiHotelId);
    var hotels = globalPoiHotels();
    var english = lang() === "en";
    var countriesWrap = globalSheet.querySelector(".mgs-countries");
    countriesWrap.textContent = "";
    hotels.forEach(function (name) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "mgs-country" + (poiHotelIdForHotel({ name: name }) === globalPoiHotelId ? " is-active" : "");
      button.dataset.mgsPoiHotel = name;
      button.textContent = shortGlobalPoiHotel(name);
      countriesWrap.appendChild(button);
    });
    globalSheet.querySelector(".mgs-filter-label small").textContent = pois.length + (english ? " places" : " lugares");
    var query = (globalPoiQuery || "").trim().toLowerCase();
    var filtered = pois.filter(function (poi) {
      if (!query) return true;
      var name = gp && typeof gp.poiNameText === "function" ? gp.poiNameText(poi) : poi.name;
      var description = gp && typeof gp.poiDescriptionText === "function" ? gp.poiDescriptionText(poi) : poi.description;
      return (String(name || "") + " " + String(description || "") + " " + String(poi.category || "")).toLowerCase().indexOf(query) !== -1;
    });
    globalList.textContent = "";
    if (!filtered.length) {
      var empty = document.createElement("p");
      empty.className = "mgs-empty";
      empty.textContent = english ? "No points of interest found." : "No hay puntos de interés para esta búsqueda.";
      globalList.appendChild(empty);
      return;
    }
    filtered.forEach(function (poi) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "mgs-hotel mgs-poi";
      button.dataset.mgsPoi = poi.id;
      var name = document.createElement("strong");
      name.textContent = gp && typeof gp.poiNameText === "function" ? gp.poiNameText(poi) : poi.name;
      var meta = document.createElement("span");
      meta.textContent = (gp && typeof gp.poiDescriptionText === "function" ? gp.poiDescriptionText(poi) : poi.description) || poi.category || "";
      button.appendChild(name);
      button.appendChild(meta);
      globalList.appendChild(button);
    });
  }

  function setGlobalPoiMode(hotelId) {
    if (!hotelId) return;
    globalPoiMode = true;
    globalPoiHotelId = hotelId;
    globalPoiQuery = "";
    globalCountry = "all";
    globalSelected = null;
    if (globalInput) globalInput.value = "";
    if (globalSheet) globalSheet.classList.add("is-poi-mode");
    setGlobalGuideClosed(false);
    setGlobalGuideOpen(false);
    updateGlobalGuideLabels();
    renderGlobalGuide();
  }

  function exitGlobalPoiMode() {
    if (!globalPoiMode) return;
    globalPoiMode = false;
    globalPoiHotelId = null;
    globalPoiQuery = "";
    if (globalInput) globalInput.value = "";
    if (globalSheet) globalSheet.classList.remove("is-poi-mode");
    clearNearbyPoiLayer();
    setGlobalGuideClosed(false);
    setGlobalGuideOpen(true);
    updateGlobalGuideLabels();
    renderGlobalGuide();
  }

  function switchGlobalPoiHotel(name) {
    var hotelId = poiHotelIdForHotel({ name: name });
    if (!hotelId) return;
    globalPoiHotelId = hotelId;
    globalPoiQuery = "";
    if (globalInput) globalInput.value = "";
    clearNearbyPoiLayer();
    showNearbyPoiLayer(hotelId, true);
    renderGlobalGuide();
  }

  function selectGlobalPoi(id, notice) {
    var gp = rd("guiapa");
    if (!gp || !id || !shellMap) return;
    var poi = (gp.POIS || []).filter(function (item) { return item && item.id === id; })[0];
    if (!poi || poi.lat == null || poi.lng == null) return;
    var willBindMap = gp._map !== shellMap;
    if (typeof gp.queueRouteToPoi === "function") gp.queueRouteToPoi(id, notice || "");
    if (!willBindMap) gp._routeNotice = notice || "";
    if (willBindMap) {
      if (typeof gp.bindMap === "function") gp.bindMap(shellMap);
      else gp._map = shellMap;
    }
    if (typeof gp.selectPoi === "function") {
      gp.selectPoi(id, { noScroll: true });
    } else {
      try { shellMap.stop(); shellMap.flyTo([Number(poi.lat), Number(poi.lng)], 17, { animate: true, duration: 0.6 }); } catch (error) {}
      var marker = gp._markers && gp._markers[id];
      if (marker && typeof marker.openPopup === "function") marker.openPopup();
    }
    if (!willBindMap && typeof gp.routeToPoi === "function") gp.routeToPoi(id);
    lastGlobalRoutePoiId = id;
    setGlobalGuideOpen(false);
  }

  function flushPendingGlobalPoi() {
    if (!pendingGlobalPoiId || !active || !shellMap) return;
    if (document.body.dataset.mobileHome !== "1") return;
    var id = pendingGlobalPoiId;
    var notice = pendingGlobalPoiNotice;
    pendingGlobalPoiId = null;
    pendingGlobalPoiNotice = "";
    pendingMode = "map";
    pendingTab = "map";
    setSheet("map", "map");
    setTimeout(function () { selectGlobalPoi(id, notice); }, 120);
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
    globalSheet.classList.toggle("mgs-minimized", !expanded && !globalClosed && globalSheet.classList.contains("is-visible"));
    if (expanded) document.body.dataset.guideExpanded = "1";
    else delete document.body.dataset.guideExpanded;
    if (globalHandle) globalHandle.setAttribute("aria-expanded", expanded ? "true" : "false");
    globalSheet.style.transform = "";
    if (expanded && globalSelected) {
      globalSelected = null;
      renderGlobalGuide();
    }
    updateGlobalGuideToggleLabel();
    updateGlobalCard();
  }

  function setGlobalGuideClosed(closed) {
    globalClosed = !!closed;
    if (!globalSheet || !globalReopen) return;
    globalSheet.classList.toggle("is-visible", !globalClosed);
    globalSheet.classList.toggle("mgs-minimized", !globalClosed && globalSheet.classList.contains("is-visible") && !globalSheet.classList.contains("mgs-expanded"));
    globalReopen.classList.toggle("is-visible", globalClosed && isGlobalGuideHomeMap());
    if (globalClosed) {
      globalSheet.classList.remove("mgs-expanded");
      delete document.body.dataset.guideExpanded;
      if (globalHandle) globalHandle.setAttribute("aria-expanded", "false");
      updateGlobalCard();
    }
    updateGlobalGuideToggleLabel();
  }

  function globalPeekHeight() {
    try {
      var value = parseFloat(getComputedStyle(document.body).getPropertyValue("--mob-guide-collapsed-peek"));
      return isFinite(value) ? value : 118;
    } catch (error) { return 118; }
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
    globalPoiMode = false;
    globalPoiHotelId = null;
    globalPoiQuery = "";
    if (globalInput) globalInput.value = "";
    if (globalSheet) globalSheet.classList.remove("mgs-expanded", "mgs-minimized", "is-poi-mode");
    delete document.body.dataset.guideExpanded;
    if (globalHandle) globalHandle.setAttribute("aria-expanded", "false");
    if (globalReopen) globalReopen.classList.remove("is-visible");
    updateGlobalGuideToggleLabel();
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
    globalSheet.classList.toggle("mgs-minimized", !globalClosed && !globalSheet.classList.contains("mgs-expanded"));
    if (globalReopen) globalReopen.classList.toggle("is-visible", globalClosed);
    renderGlobalGuide();
    if (globalClosed) {
      globalSheet.classList.remove("mgs-expanded");
      delete document.body.dataset.guideExpanded;
    }
    updateGlobalGuideToggleLabel();
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
        : label(definition.id === "explore" ? "navExplore" : definition.id === "restaurants" ? "menuRestaurants" : definition.id === "transport" ? "menuTransport" : "", definition.es, definition.en);
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
      setText("[data-explore-destinations-heading]", en ? "Destinations" : "Destinos");
      setText("[data-explore-hotels-heading]", en ? "Hotels" : "Hoteles");
      Array.prototype.forEach.call(exploreSheet.querySelectorAll(".mobile-explore-chip"), function (button) {
        var action = button.dataset.explore;
        var text = action === "hotels"
          ? (en ? "Hotels" : "Hoteles")
          : action === "restaurants"
            ? label("menuRestaurants", en ? "Dining" : "Restaurantes", "Dining")
            : "360°";
        button.textContent = text;
        button.setAttribute("aria-label", text);
      });
      populateExplore();
    }
    if (transportSheet) {
      var transportEn = lang() === "en";
      var setTransportText = function (selector, text) {
        var node = transportSheet.querySelector(selector);
        if (node) node.textContent = text;
      };
      setTransportText("[data-transport-kicker]", transportEn ? "MOBILITY" : "MOVILIDAD");
      setTransportText("[data-transport-title]", label("menuTransport", transportEn ? "Transportation" : "Transporte", "Transportation"));
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
    updateLoginLabels();
    updateAuthPanel();
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
    mapas.initializeAllHotelsMap(mapElement, hotels, { touchGuard: false });
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
        flushPendingGlobalPoi();
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

  function isHomeMapVisible() {
    return active && document.body.dataset.mobileHome === "1" && document.body.dataset.mobileSheet === "map";
  }

  function clearNearbyPoiLayer() {
    var gp = rd("guiapa");
    if (nearbyPoiLayer) {
      try {
        if (typeof nearbyPoiLayer.remove === "function") nearbyPoiLayer.remove();
        else if (shellMap) shellMap.removeLayer(nearbyPoiLayer);
      } catch (error) {}
    }
    if (nearbyPoiLabelLayer) {
      try {
        if (typeof nearbyPoiLabelLayer.remove === "function") nearbyPoiLabelLayer.remove();
        else if (shellMap) shellMap.removeLayer(nearbyPoiLabelLayer);
      } catch (error) {}
    }
    if (gp && nearbyPoiLayer) {
      if (gp._poiLayer === nearbyPoiLayer) gp._poiLayer = null;
      if (gp._poiLabelLayer === nearbyPoiLabelLayer) gp._poiLabelLayer = null;
      gp._poiLayerConfig = null;
      if (gp._map === shellMap && nearbyPoiPreviousMap !== shellMap) gp._map = nearbyPoiPreviousMap || null;
    }
    nearbyPoiLayer = null;
    nearbyPoiLabelLayer = null;
    nearbyPoiHotelId = null;
    nearbyPoiPreviousMap = null;
    delete document.body.dataset.mobileNearbyPois;
  }

  function clearNearbyRouteLayers() {
    if (nearbyRaf) {
      window.cancelAnimationFrame(nearbyRaf);
      nearbyRaf = 0;
    }
    if (shellMap && window.L) {
      if (nearbyDot) {
        try { shellMap.removeLayer(nearbyDot); } catch (error) {}
      }
      if (nearbyRouteLine) {
        try { shellMap.removeLayer(nearbyRouteLine); } catch (error) {}
      }
      if (nearbyRouteRenderer) {
        try { shellMap.removeLayer(nearbyRouteRenderer); } catch (error) {}
      }
    }
    nearbyDot = null;
    nearbyRouteLine = null;
    nearbyRouteRenderer = null;
  }

  function clearNearbyMapHint() {
    clearNearbyPoiLayer();
    if (nearbyRouteAbort) {
      try { nearbyRouteAbort.abort(); } catch (error) {}
      nearbyRouteAbort = null;
    }
    nearbyRouteToken += 1;
    nearbyRouteDetail = "";
    nearbyRerouteAt = 0;
    clearNearbyRouteLayers();
    if (shellMap && window.L && nearbyBadge) {
      try { shellMap.removeLayer(nearbyBadge); } catch (error) {}
    }
    nearbyBadge = null;
    nearbyKey = "";
    nearbyItem = null;
    delete document.body.dataset.mobileNearby;
  }

  function nearbyDistanceLabel(meters) {
    var mapas = rd("mapas");
    if (mapas && typeof mapas.formatApproximateDistance === "function") {
      return mapas.formatApproximateDistance(meters);
    }
    return meters < 1000 ? Math.round(meters) + " m" : (meters / 1000).toFixed(1) + " km";
  }

  function normalizePoiHotelName(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function poiHotelIdForHotel(hotel) {
    var gp = rd("guiapa");
    if (!gp || !Array.isArray(gp.POIS) || !hotel) return null;
    var names = [hotel.name, hotel.displayName];
    if (hotel.hotel) names.push(hotel.hotel.name, hotel.hotel.displayName);
    var normalizedNames = names.map(normalizePoiHotelName).filter(Boolean);
    if (!normalizedNames.length) return null;
    var hotelPois = gp.POIS.filter(function (poi) { return poi && poi.category === "hotel"; });
    if (!hotelPois.length) return null;

    function poiIdFor(poi) {
      return poi.hotelId || poi.name || null;
    }

    for (var index = 0; index < hotelPois.length; index += 1) {
      var poi = hotelPois[index];
      var poiNames = [poi.hotelId, poi.name].map(normalizePoiHotelName).filter(Boolean);
      var exact = normalizedNames.some(function (name) { return poiNames.indexOf(name) !== -1; });
      if (exact) return poiIdFor(poi);
    }

    if (typeof gp.hotelPoiIdForName === "function") {
      for (var nameIndex = 0; nameIndex < names.length; nameIndex += 1) {
        var poiId = gp.hotelPoiIdForName(names[nameIndex]);
        if (!poiId) continue;
        var byId = hotelPois.filter(function (candidate) { return candidate.id === poiId; })[0];
        if (byId) return poiIdFor(byId);
      }
    }

    var combined = normalizedNames.join(" ");
    var aliases = [
      { id: "del-mar", tokens: ["del mar", "para del mar"] },
      { id: "beach", tokens: ["beach", "para beach"] },
      { id: "lindo", tokens: ["lindo", "para lindo"] },
      { id: "maya", tokens: ["maya", "para maya"] },
      { id: "joia", tokens: ["joia", "para joia"] }
    ];
    for (var aliasIndex = 0; aliasIndex < aliases.length; aliasIndex += 1) {
      var alias = aliases[aliasIndex];
      var matched = alias.tokens.some(function (token) { return combined.indexOf(token) !== -1; });
      if (!matched) continue;
      var aliasPoi = hotelPois.filter(function (candidate) { return candidate.id === alias.id; })[0];
      if (aliasPoi) return poiIdFor(aliasPoi);
    }
    return null;
  }

  function poiDistanceMeters(origin, destination) {
    var mapas = rd("mapas");
    if (mapas && typeof mapas.distanceBetweenCoordinates === "function") {
      var measured = mapas.distanceBetweenCoordinates(
        { latitude: origin[0], longitude: origin[1] },
        { latitude: destination[0], longitude: destination[1] }
      );
      if (Number.isFinite(measured)) return measured;
    }
    var radians = Math.PI / 180;
    var deltaLat = (destination[0] - origin[0]) * radians;
    var deltaLng = (destination[1] - origin[1]) * radians;
    var lat1 = origin[0] * radians;
    var lat2 = destination[0] * radians;
    var value = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2)
      + Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
    return 2 * 6371000 * Math.atan2(Math.sqrt(value), Math.sqrt(1 - value));
  }

  function poiOriginsFor(hotelId) {
    var normalizedId = normalizePoiHotelName(hotelId);
    var keys = Object.keys(HOTEL_POI_ORIGINS);
    for (var index = 0; index < keys.length; index += 1) {
      if (normalizePoiHotelName(keys[index]) === normalizedId) return HOTEL_POI_ORIGINS[keys[index]];
    }
    return [];
  }

  function poisForHotel(hotelId) {
    var gp = rd("guiapa");
    if (!gp || !Array.isArray(gp.POIS) || !hotelId) return [];
    var origins = poiOriginsFor(hotelId);
    if (!origins.length) return [];
    var normalizedId = normalizePoiHotelName(hotelId);
    var forced = HOTEL_POI_FORCED_IDS[hotelId] || [];
    return gp.POIS.filter(function (poi) {
      if (!poi || poi.category === "hotel" || poi.external === true || poi.lat == null || poi.lng == null) return false;
      if (HOTEL_POI_EXCLUDED_IDS[poi.id]) return false;
      if (forced.indexOf(poi.id) !== -1) return true;
      var poiHotel = normalizePoiHotelName(poi.hotelId || poi.hotel || "");
      if (poiHotel && poiHotel !== normalizedId) return false;
      return origins.some(function (origin) {
        return poiDistanceMeters(origin, [Number(poi.lat), Number(poi.lng)]) <= HOTEL_POI_RADIUS;
      });
    });
  }

  function nearbyHotelFor(latlng) {
    var mapas = rd("mapas");
    if (!mapas || typeof mapas.evaluateNearbyContext !== "function" || !latlng) return null;
    var context = mapas.evaluateNearbyContext({ latitude: latlng[0], longitude: latlng[1] });
    if (!context || context.type !== "hotel" || !context.hotel) return null;
    var state = getState();
    var coords = state && state.hotelCoordinates && state.hotelCoordinates[context.hotel.name];
    if (!Array.isArray(coords) || coords.length < 2) {
      coords = [context.hotel.latitude, context.hotel.longitude];
    }
    var latitude = Number(coords[0]);
    var longitude = Number(coords[1]);
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;
    return { context: context, latlng: [latitude, longitude] };
  }

  function nearbyBadgeText(item, distance, detail) {
    var english = lang() === "en";
    return {
      eyebrow: english ? "You're nearby" : "Estás cerca de",
      name: String(item.context.hotel.name || "").replace(/^Iberostar\s+/i, ""),
      meta: (detail || distance) + " · " + (english ? "Trace route" : "Trazar ruta") + " →"
    };
  }

  function syncNearbyPoiButton(item) {
    var element = nearbyBadge && nearbyBadge.getElement ? nearbyBadge.getElement() : null;
    var button = element && element.querySelector("[data-nearby-pois]");
    if (!button) return null;
    var hotelId = poiHotelIdForHotel(item && item.context && item.context.hotel);
    var count = hotelId ? poisForHotel(hotelId).length : 0;
    if (!count) {
      button.hidden = true;
      return null;
    }
    var active = !!nearbyPoiLayer && nearbyPoiHotelId === hotelId;
    button.hidden = false;
    button.dataset.hotelId = hotelId;
    button.setAttribute("aria-pressed", active ? "true" : "false");
    button.textContent = lang() === "en"
      ? (active ? "Hide points of interest" : "Explore points of interest")
      : (active ? "Ocultar puntos de interés" : "Explorar puntos de interés");
    return hotelId;
  }

  function createNearbyBadge(item, distance, detail) {
    if (!shellMap || !window.L) return;
    var text = nearbyBadgeText(item, distance, detail);
    var html = '<div class="shell-nearby-poi">' +
      '<span class="shell-nearby-poi__stem" aria-hidden="true"></span>' +
      '<div class="shell-nearby-poi__card" role="button" tabindex="0" data-nearby-route="' + escapeHtml(item.context.route) + '">' +
        '<span class="shell-nearby-poi__eyebrow">' + escapeHtml(text.eyebrow) + '</span>' +
        '<strong>' + escapeHtml(text.name) + '</strong>' +
        '<span class="shell-nearby-poi__meta">' + escapeHtml(text.meta) + '</span>' +
        '<button type="button" class="shell-nearby-poi__pois" data-nearby-pois hidden aria-pressed="false">' + escapeHtml(lang() === "en" ? "Explore points of interest" : "Explorar puntos de interés") + '</button>' +
      '</div>' +
    '</div>';

    nearbyBadge = window.L.marker(item.latlng, {
      icon: window.L.divIcon({
        className: "shell-nearby-poi-icon",
        html: html,
        iconSize: [1, 1],
        iconAnchor: [0, 0]
      }),
      zIndexOffset: 1300,
      keyboard: false
    }).addTo(shellMap);

    var element = nearbyBadge.getElement();
    if (!element) return;
    try {
      window.L.DomEvent.disableClickPropagation(element);
      window.L.DomEvent.disableScrollPropagation(element);
    } catch (error) {}
    var card = element.querySelector(".shell-nearby-poi__card");
    if (!card) return;
    card.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      retraceNearbyRoute();
    });
    card.addEventListener("keydown", function (event) {
      if (event.target !== card) return;
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        retraceNearbyRoute();
      }
    });
    syncNearbyPoiButton(item);
    var poisButton = element.querySelector("[data-nearby-pois]");
    if (poisButton) {
      poisButton.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        toggleNearbyPois();
      });
      poisButton.addEventListener("keydown", function (event) {
        event.stopPropagation();
      });
    }
  }

  function appendNearbyPathPoint(path, point) {
    if (!Array.isArray(point)) return;
    var latitude = Number(point[0]);
    var longitude = Number(point[1]);
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return;
    var last = path[path.length - 1];
    if (!last || Math.abs(last[0] - latitude) > 0.000001 || Math.abs(last[1] - longitude) > 0.000001) {
      path.push([latitude, longitude]);
    }
  }

  function nearbyRoutePath(userLatLng, hotelLatLng, coordinates) {
    var path = [];
    appendNearbyPathPoint(path, userLatLng);
    if (Array.isArray(coordinates)) {
      coordinates.forEach(function (point) { appendNearbyPathPoint(path, point); });
    }
    appendNearbyPathPoint(path, hotelLatLng);
    return path;
  }

  function nearbyRoutePointAt(path, progress) {
    if (!path.length) return null;
    if (path.length === 1) return path[0];
    var segments = [];
    var total = 0;
    for (var index = 1; index < path.length; index += 1) {
      var distance = poiDistanceMeters(path[index - 1], path[index]);
      segments.push(distance);
      total += distance;
    }
    if (!total) return path[0];
    var remaining = total * Math.max(0, Math.min(1, progress));
    for (var segmentIndex = 0; segmentIndex < segments.length; segmentIndex += 1) {
      var length = segments[segmentIndex];
      if (length && remaining <= length) {
        var ratio = remaining / length;
        var from = path[segmentIndex];
        var to = path[segmentIndex + 1];
        return [from[0] + (to[0] - from[0]) * ratio, from[1] + (to[1] - from[1]) * ratio];
      }
      remaining -= length;
    }
    return path[path.length - 1];
  }

  function fitNearbyBounds(points) {
    if (!shellMap || !window.L || !Array.isArray(points) || !points.length) return;
    try {
      var bounds = window.L.latLngBounds(points).pad(0.35);
      if (shellMap.flyToBounds) shellMap.flyToBounds(bounds, { maxZoom: 16, duration: 0.9 });
      else shellMap.fitBounds(bounds, { maxZoom: 16 });
    } catch (error) {}
  }

  function routeDeviationMeters(point, path) {
    if (!point || !Array.isArray(path) || path.length < 2) return Infinity;
    var radians = Math.PI / 180;
    var origin = path[0];
    function local(coordinates) {
      return [
        (coordinates[1] - origin[1]) * 111320 * Math.cos(origin[0] * radians),
        (coordinates[0] - origin[0]) * 110540
      ];
    }
    var target = local(point);
    var minimum = Infinity;
    for (var index = 1; index < path.length; index += 1) {
      var from = local(path[index - 1]);
      var to = local(path[index]);
      var dx = to[0] - from[0];
      var dy = to[1] - from[1];
      var lengthSquared = dx * dx + dy * dy;
      var ratio = lengthSquared ? ((target[0] - from[0]) * dx + (target[1] - from[1]) * dy) / lengthSquared : 0;
      ratio = Math.max(0, Math.min(1, ratio));
      var offsetX = target[0] - (from[0] + dx * ratio);
      var offsetY = target[1] - (from[1] + dy * ratio);
      minimum = Math.min(minimum, Math.sqrt(offsetX * offsetX + offsetY * offsetY));
    }
    return minimum;
  }

  function maybeRerouteNearby(latlng) {
    if (!nearbyItem || !nearbyRouteLine || !isHomeMapVisible()) return;
    var now = Date.now();
    if (now - nearbyRerouteAt < 8000) return;
    var latlngs = typeof nearbyRouteLine.getLatLngs === "function" ? nearbyRouteLine.getLatLngs() : [];
    var path = [];
    latlngs.forEach(function (position) { appendNearbyPathPoint(path, [position.lat, position.lng]); });
    if (path.length < 2 || routeDeviationMeters(latlng, path) < 25) return;
    nearbyRerouteAt = now;
    renderNearbyRoute(nearbyItem, latlng);
  }

  function animateNearbyRoute(userLatLng, hotelLatLng, coordinates) {
    if (!shellMap || !window.L || !window.L.svg) return;
    var L = window.L;
    var path = nearbyRoutePath(userLatLng, hotelLatLng, coordinates);
    nearbyRouteRenderer = L.svg({ padding: 0.5 });
    nearbyRouteRenderer.addTo(shellMap);
    nearbyRouteLine = L.polyline(path, {
      renderer: nearbyRouteRenderer,
      color: "#d4af37",
      weight: 4,
      opacity: 0.95,
      lineCap: "round",
      className: "shell-nearby-route"
    }).addTo(shellMap);

    var element = nearbyRouteLine.getElement();
    if (element && typeof element.getTotalLength === "function" && typeof element.animate === "function") {
      var length = element.getTotalLength();
      element.style.strokeDasharray = length + " " + length;
      element.style.strokeDashoffset = String(length);
      element.animate(
        [{ strokeDashoffset: String(length) }, { strokeDashoffset: "0" }],
        { duration: 1150, easing: "cubic-bezier(.22,.8,.25,1)", fill: "forwards" }
      );
    }

    nearbyDot = L.circleMarker(userLatLng, {
      renderer: nearbyRouteRenderer,
      radius: 5,
      color: "#fffdf8",
      weight: 2,
      fillColor: "#d4af37",
      fillOpacity: 1,
      className: "shell-nearby-dot"
    }).addTo(shellMap);

    var started = null;
    function step(now) {
      if (!nearbyDot || !nearbyRouteLine) return;
      if (started === null) started = now;
      var progress = Math.min(1, (now - started) / 1150);
      var eased = 1 - Math.pow(1 - progress, 3);
      var position = nearbyRoutePointAt(path, eased);
      if (position) {
        try { nearbyDot.setLatLng(position); } catch (error) {}
      }
      nearbyRaf = progress < 1 ? window.requestAnimationFrame(step) : 0;
    }
    nearbyRaf = window.requestAnimationFrame(step);
  }

  function renderNearbyRoute(item, userLatLng) {
    var sameBadge = nearbyKey === item.context.route && nearbyBadge;
    if (!sameBadge) clearNearbyMapHint();
    else if (nearbyRouteAbort) {
      try { nearbyRouteAbort.abort(); } catch (error) {}
      nearbyRouteAbort = null;
    }
    var token = ++nearbyRouteToken;
    nearbyKey = item.context.route;
    nearbyItem = item;
    nearbyRerouteAt = Date.now();
    nearbyRouteDetail = "";
    var distance = nearbyDistanceLabel(item.context.distance);
    if (sameBadge) {
      try { nearbyBadge.setLatLng(item.latlng); } catch (error) {}
      updateNearbyBadge(item, distance, "");
    } else {
      createNearbyBadge(item, distance, "");
    }
    clearNearbyRouteLayers();
    animateNearbyRoute(userLatLng, item.latlng);
    fitNearbyBounds([userLatLng, item.latlng]);
    document.body.dataset.mobileNearby = item.context.route;

    var mapas = rd("mapas");
    if (!mapas || typeof mapas.computeRoute !== "function") return;
    var controller = typeof AbortController === "function" ? new AbortController() : null;
    nearbyRouteAbort = controller;
    mapas.computeRoute({
      origin: userLatLng,
      destination: item.latlng,
      prefer: "pedestrian",
      signal: controller ? controller.signal : undefined
    }).then(function (result) {
      if (token !== nearbyRouteToken) return;
      nearbyRouteAbort = null;
      var coordinates = Array.isArray(result.coordinates) ? result.coordinates : [];
      clearNearbyRouteLayers();
      animateNearbyRoute(userLatLng, item.latlng, coordinates);
      var detail = "";
      var minutes = Number.isFinite(result.duration) ? Math.max(1, Math.round(result.duration / 60)) : null;
      if (Number.isFinite(result.distance) && minutes != null) {
        detail = nearbyDistanceLabel(result.distance) + " · " + minutes + " min";
      } else if (Number.isFinite(result.distance)) {
        detail = nearbyDistanceLabel(result.distance);
      }
      nearbyRouteDetail = detail;
      updateNearbyBadge(item, distance, detail);
      var routePoints = [];
      appendNearbyPathPoint(routePoints, userLatLng);
      coordinates.forEach(function (point) { appendNearbyPathPoint(routePoints, point); });
      appendNearbyPathPoint(routePoints, item.latlng);
      fitNearbyBounds(routePoints);
    }).catch(function (error) {
      if (token !== nearbyRouteToken || (error && error.name === "AbortError")) return;
      nearbyRouteAbort = null;
    });
  }

  function showNearbyPoiLayer(hotelId, fit) {
    var gp = rd("guiapa");
    var pois = poisForHotel(hotelId);
    if (!gp || typeof gp.addPoiLayer !== "function" || !shellMap || !window.L || !pois.length) return false;
    clearNearbyPoiLayer();
    nearbyPoiPreviousMap = gp._map || null;
    if (gp._map !== shellMap) gp._map = shellMap;
    var originalPois = gp.POIS;
    var layer = null;
    try {
      gp.POIS = pois;
      layer = gp.addPoiLayer(shellMap, null, { disableClusteringAtZoom: 15 });
    } finally {
      gp.POIS = originalPois;
    }
    if (!layer) {
      if (gp._map === shellMap) gp._map = nearbyPoiPreviousMap || null;
      nearbyPoiPreviousMap = null;
      return false;
    }
    nearbyPoiLayer = layer;
    nearbyPoiLabelLayer = gp._poiLabelLayer || null;
    nearbyPoiHotelId = hotelId;
    document.body.dataset.mobileNearbyPois = hotelId;
    syncNearbyPoiButton(nearbyItem);
    if (fit !== false) {
      try {
        var points = pois.map(function (poi) { return [Number(poi.lat), Number(poi.lng)]; });
        var bounds = window.L.latLngBounds(points).pad(0.3);
        if (shellMap.flyToBounds) {
          shellMap.flyToBounds(bounds, { maxZoom: 16, duration: 0.85, paddingTopLeft: [16, 96], paddingBottomRight: [16, 160] });
        } else {
          shellMap.fitBounds(bounds, { maxZoom: 16 });
        }
      } catch (error) {}
    }
    return true;
  }

  function toggleNearbyPois() {
    if (!nearbyItem || !isHomeMapVisible() || !shellMap) return;
    var hotelId = poiHotelIdForHotel(nearbyItem.context.hotel);
    if (!hotelId || !poisForHotel(hotelId).length) return;
    if (nearbyPoiLayer && nearbyPoiHotelId === hotelId) {
      clearNearbyPoiLayer();
      if (globalPoiMode) exitGlobalPoiMode();
      syncNearbyPoiButton(nearbyItem);
      return;
    }
    if (showNearbyPoiLayer(hotelId, true)) setGlobalPoiMode(hotelId);
  }

  function openHotelPoisByName(hotelName) {
    if (!hotelName || !shellMap) return false;
    var hotelId = poiHotelIdForHotel({ name: hotelName });
    if (!hotelId || !poisForHotel(hotelId).length) return false;
    if (nearbyPoiLayer && nearbyPoiHotelId === hotelId) clearNearbyPoiLayer();
    if (!showNearbyPoiLayer(hotelId, true)) return false;
    setGlobalPoiMode(hotelId);
    return true;
  }

  function retraceNearbyRoute() {
    if (!nearbyItem) return;
    var item = nearbyItem;
    var userLatLng = currentUserLatLng();
    if (!userLatLng) {
      var locate = document.getElementById("mobileMapLocate");
      if (locate) locate.click();
      return;
    }
    renderNearbyRoute(item, userLatLng);
  }

  function traceRouteToHotel(hotel) {
    if (!hotel || !isHomeMapVisible() || !shellMap) return false;
    var userLatLng = currentUserLatLng();
    if (!userLatLng) {
      var locate = document.getElementById("mobileMapLocate");
      if (locate) locate.click();
      return true;
    }
    var state = getState();
    var coords = state && state.hotelCoordinates && state.hotelCoordinates[hotel.name];
    if (!Array.isArray(coords) || coords.length < 2) {
      coords = [hotel.latitude, hotel.longitude];
    }
    var latitude = Number(coords[0]);
    var longitude = Number(coords[1]);
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return false;
    var mapas = rd("mapas");
    var distance = 0;
    if (mapas && typeof mapas.distanceBetweenCoordinates === "function") {
      distance = mapas.distanceBetweenCoordinates(
        { latitude: userLatLng[0], longitude: userLatLng[1] },
        { latitude: latitude, longitude: longitude }
      );
    }
    var item = {
      context: {
        hotel: hotel,
        route: hotel.route || "",
        distance: Number.isFinite(distance) ? distance : 0
      },
      latlng: [latitude, longitude]
    };
    renderNearbyRoute(item, userLatLng);
    return true;
  }

  function updateNearbyBadge(item, distance, detail) {
    var element = nearbyBadge && nearbyBadge.getElement ? nearbyBadge.getElement() : null;
    if (!element) return;
    var text = nearbyBadgeText(item, distance, detail);
    var eyebrow = element.querySelector(".shell-nearby-poi__eyebrow");
    var name = element.querySelector(".shell-nearby-poi__card strong");
    var meta = element.querySelector(".shell-nearby-poi__meta");
    if (eyebrow) eyebrow.textContent = text.eyebrow;
    if (name) name.textContent = text.name;
    if (meta) meta.textContent = text.meta;
    syncNearbyPoiButton(item);
  }

  function updateNearbyMapHint(latlng) {
    if (!isHomeMapVisible() || !shellMap || !window.L || !latlng) {
      clearNearbyMapHint();
      return;
    }
    var item = nearbyHotelFor(latlng);
    if (!item) {
      clearNearbyMapHint();
      return;
    }
    var distance = nearbyDistanceLabel(item.context.distance);
    if (nearbyKey === item.context.route && nearbyBadge) {
      try { nearbyBadge.setLatLng(item.latlng); } catch (error) {}
      if (nearbyRouteLine && typeof nearbyRouteLine.getLatLngs === "function") {
        var positions = nearbyRouteLine.getLatLngs();
        if (positions.length && typeof window.L.latLng === "function") {
          positions[0] = window.L.latLng(latlng[0], latlng[1]);
          try { nearbyRouteLine.setLatLngs(positions); } catch (error) {}
        }
      }
      updateNearbyBadge(item, distance, nearbyRouteDetail);
      maybeRerouteNearby(latlng);
      document.body.dataset.mobileNearby = item.context.route;
      return;
    }
    renderNearbyRoute(item, latlng);
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
    updateNearbyMapHint(latlng);
  }

  function onLocationDetected(event) {
    var detail = event && event.detail;
    if (!detail || typeof detail.latitude !== "number" || typeof detail.longitude !== "number") return;
    var latlng = [detail.latitude, detail.longitude];
    pendingLocation = latlng;
    if (!active || !shellMap) return;
    if (isHomeMapVisible()) {
      pendingLocation = null;
      setTimeout(function () { focusShellOnLocation(latlng, true); }, 120);
      if (lastGlobalRoutePoiId) {
        var routeId = lastGlobalRoutePoiId;
        lastGlobalRoutePoiId = null;
        setTimeout(function () {
          var gp = rd("guiapa");
          if (gp && typeof gp.routeToPoi === "function") gp.routeToPoi(routeId);
        }, 250);
      }
    }
  }

  function cancelRouteFromMap() {
    var gp = rd("guiapa");
    if (gp && typeof gp.cancelRoute === "function") gp.cancelRoute();
    else if (gp && typeof gp.clearRouteFocus === "function") gp.clearRouteFocus();
    var mapas = rd("mapas");
    if (mapas && typeof mapas.cancelRoute === "function") mapas.cancelRoute();
    if (typeof window.cancelarRuta3d === "function") window.cancelarRuta3d();
    delete document.body.dataset.routeActive;
    if (shellMap) setTimeout(function () { try { shellMap.invalidateSize(); } catch (error) {} }, 0);
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
    if (definition.id === "transport") {
      if (document.querySelector("#appView .portal-hero-stats")) setSheet("section", "transport");
      else navigate("/");
      return;
    }
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

  function mountTransportSheet() {
    if (!transportSheet) return;
    var mount = transportSheet.querySelector(".mobile-transport-mount");
    if (!mount) return;
    if (mount.dataset.cartMounted === "1") {
      var activeCart = rd("carritoGolf");
      if (activeCart && typeof activeCart._cartMapInvalidate === "function") activeCart._cartMapInvalidate(true);
      return;
    }
    var routes = rd("routes");
    if (!routes || typeof routes.mountCartSheet !== "function") return;
    if (routes.mountCartSheet(mount)) mount.dataset.cartMounted = "1";
  }

  function unmountTransportSheet() {
    if (!transportSheet) return;
    var cart = rd("carritoGolf");
    if (cart && typeof cart.teardown === "function") cart.teardown();
    var mount = transportSheet.querySelector(".mobile-transport-mount");
    if (!mount) return;
    mount.innerHTML = "";
    delete mount.dataset.cartMounted;
  }

  function setSheet(mode, tab) {
    var wasTransport = document.body.dataset.mobileTransport === "1";
    var showTransport = tab === "transport" && document.body.dataset.mobileHome !== "0";
    if (showTransport) document.body.dataset.mobileTransport = "1";
    else delete document.body.dataset.mobileTransport;
    document.body.dataset.mobileSheet = mode;
    if (mode === "map") document.body.dataset.routeBarAllowed = "1";
    if (wasTransport && !showTransport) unmountTransportSheet();
    if (showTransport) mountTransportSheet();
    if (mode !== "map") clearNearbyMapHint();
    if (handle) handle.setAttribute("aria-expanded", mode === "section" ? "true" : "false");

    if (!shell) return;
    Array.prototype.forEach.call(shell.querySelectorAll(".mobile-tab"), function (button) {
      button.setAttribute("aria-selected", button.dataset.mobileTab === tab ? "true" : "false");
    });

    if (mode === "map") {
      var state = getState();
      if (state && shellMap) state.activeMap = shellMap;
      setTimeout(function () {
        if (shellMap) {
          try { shellMap.invalidateSize(); } catch (error) { /* ignore */ }
          updateNearbyMapHint(currentUserLatLng());
        }
      }, 380);
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
    if (document.body.classList.contains("cart-map-focus-open")) {
      if (document.body.dataset.mobileTransport === "1" && document.querySelector("#mobileTransportSheet #hotel-carrito")) return false;
      return true;
    }
    return !!document.querySelector(".hotel-complex-map-wrap[data-guide-wrap], .hotel-guide-panel[data-guide-overlay]");
  }

  function inferTab(isHome) {
    if (pendingTab) return pendingTab;
    if (document.body.dataset.mobileTransport === "1") return "transport";
    if (document.querySelector(".restaurant-portal-page, .restaurant-portal")) return "restaurants";
    if (document.querySelector(".media360-spread")) return "pano";
    if (document.querySelector("#appView .cart-page, #appView .cart-portal-page")) return "transport";
    if (document.querySelector("#videosForm, .media-spread")) return "explore";
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
    clearNearbyMapHint();
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

    if (loginRequired()) {
      deactivate();
      showLogin();
      return;
    }
    hideLogin();

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
    flushPendingGlobalPoi();
    syncGlobalGuide();
    updateNearbyMapHint(currentUserLatLng());
  }

  function initialize() {
    window.addEventListener("revistadigital:locationdetected", onLocationDetected);
    ensureHeaderActions();
    buildShell();

    var auth = rd("appAuth");
    if (auth && typeof auth.subscribe === "function") {
      window.__mobileAuthUnsubscribe = auth.subscribe(onAuthState);
    }
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
    window.addEventListener("revistadigital:traceWelcomeRoute", function (event) {
      var detail = event && event.detail;
      if (!detail || !detail.hotel) return;
      if (traceRouteToHotel(detail.hotel) && event.cancelable) event.preventDefault();
    });
    window.addEventListener("revistadigital:openHotelPois", function (event) {
      var detail = event && event.detail;
      if (!detail || !detail.hotelName) return;
      if (openHotelPoisByName(detail.hotelName) && event.cancelable) event.preventDefault();
    });
    window.addEventListener("revistadigital:openGlobalPoi", function (event) {
      var detail = event && event.detail;
      var id = detail && (detail.poiId || detail.id);
      if (!id || !isMobile()) return;
      if (event.cancelable) event.preventDefault();
      pendingGlobalPoiId = id;
      pendingGlobalPoiNotice = detail.notice || "";
      pendingMode = "map";
      pendingTab = "map";
      if (!document.querySelector("#appView .portal-hero-stats")) navigate("/");
      else {
        apply();
        flushPendingGlobalPoi();
      }
    });
    window.addEventListener("revistadigital:showMapForRoute", function () {
      if (!isMobile()) return;
      pendingMode = "map";
      pendingTab = "map";
      setSheet("map", "map");
      var gp = rd("guiapa");
      if (shellMap && gp && gp._map !== shellMap && typeof gp.bindMap === "function") gp.bindMap(shellMap);
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
      if (nearbyPoiHotelId) {
        var hotelId = nearbyPoiHotelId;
        clearNearbyPoiLayer();
        showNearbyPoiLayer(hotelId, false);
      }
      updateNearbyMapHint(currentUserLatLng());
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