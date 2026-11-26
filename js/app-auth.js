(function () {
  "use strict";

  var RD = window.RevistaDigital = window.RevistaDigital || {};
  var listeners = [];
  var current = null;
  var ready = false;
  var initPromise = null;
  var verifying = false;

  function client() {
    return window.supabaseClient || null;
  }

  function roleLabel(role) {
    return role === "chofer" ? "chofer" : "socio";
  }

  function errorMessage(error, fallback) {
    var message = String((error && error.message) || "");
    if ((error && error.code === "invalid_credentials") || /invalid login credentials/i.test(message)) {
      return "Email o contraseña incorrectos.";
    }
    if (/email not confirmed/i.test(message)) {
      return "Confirma tu email antes de entrar.";
    }
    if (/already registered|user already registered/i.test(message)) {
      return "Ese email ya está registrado.";
    }
    if (/password should be at least|weak password/i.test(message)) {
      return "La contraseña debe tener al menos 6 caracteres.";
    }
    if (/código de registro/i.test(message)) {
      return message;
    }
    if (/app_email_for_access_code/i.test(message)) {
      return "Falta configurar el acceso por número de socio.";
    }
    if (/relation .*app_profiles.* does not exist|relation "public.app_profiles" does not exist/i.test(message)) {
      return "Falta configurar la tabla de perfiles en Supabase.";
    }
    return message || fallback || "No se pudo iniciar sesión.";
  }

  function normalizeProfile(profile) {
    if (!profile || profile.active === false) return null;
    var role = profile.role === "chofer" ? "chofer" : profile.role === "socio" ? "socio" : null;
    if (!role) return null;
    return {
      role: role,
      displayName: String(profile.display_name || ""),
      memberCode: String(profile.member_code || ""),
      assignedHotel: String(profile.assigned_hotel || ""),
      shift: String(profile.shift || "")
    };
  }

  function emit() {
    listeners.slice().forEach(function (listener) {
      try { listener(current); } catch (error) {}
    });
    if (typeof window.CustomEvent === "function") {
      window.dispatchEvent(new window.CustomEvent("revistadigital:authStateChange", {
        detail: current
      }));
    }
  }

  function setState(next) {
    current = next || null;
    ready = true;
    emit();
  }

  function loadProfile(session) {
    var supabase = client();
    if (!supabase || !session || !session.user) return Promise.resolve(null);
    return supabase
      .from("app_profiles")
      .select("user_id,role,display_name,member_code,assigned_hotel,shift,active")
      .eq("user_id", session.user.id)
      .maybeSingle()
      .then(function (response) {
        if (response.error) throw new Error(errorMessage(response.error, "No se pudo validar el perfil."));
        return {
          session: session,
          profile: normalizeProfile(response.data)
        };
      });
  }

  function refresh() {
    var supabase = client();
    if (!supabase) {
      setState(null);
      return Promise.resolve(null);
    }
    return supabase.auth.getSession()
      .then(function (response) {
        return loadProfile(response && response.data && response.data.session);
      })
      .then(function (next) {
        setState(next);
        return next;
      })
      .catch(function () {
        setState(null);
        return null;
      });
  }

  function resolveAccessEmail(supabase, identifier) {
    if (identifier.indexOf("@") > 0) return Promise.resolve(identifier);
    return supabase.rpc("app_email_for_access_code", { p_code: identifier })
      .then(function (response) {
        if (response.error) throw new Error(errorMessage(response.error, "No se pudo validar el número de socio."));
        if (!response.data) throw new Error("Número de socio o contraseña incorrectos.");
        return String(response.data);
      });
  }

  function signIn(identifier, password, role) {
    var supabase = client();
    if (!supabase) return Promise.reject(new Error("El servicio de acceso no está disponible."));

    var normalizedIdentifier = String(identifier || "").trim();
    var normalizedPassword = String(password || "");
    var requestedRole = role === "chofer" || role === "socio" ? role : null;
    if (!normalizedIdentifier || !normalizedPassword) {
      return Promise.reject(new Error("Escribe tu número de socio y contraseña."));
    }

    verifying = true;
    return resolveAccessEmail(supabase, normalizedIdentifier)
      .then(function (email) {
        return supabase.auth.signInWithPassword({ email: email, password: normalizedPassword });
      })
      .then(function (response) {
        if (response.error) throw new Error(errorMessage(response.error, "No se pudo iniciar sesión."));
        return loadProfile(response.data && response.data.session);
      })
      .then(function (next) {
        if (!next || !next.profile) {
          return supabase.auth.signOut().then(function () {
            setState(null);
            throw new Error("Tu cuenta no tiene un perfil activo de socio o chofer.");
          });
        }
        if (requestedRole && next.profile.role !== requestedRole) {
          return supabase.auth.signOut().then(function () {
            setState(null);
            throw new Error("Esa cuenta no corresponde a " + roleLabel(requestedRole) + ".");
          });
        }
        setState(next);
        return next;
      })
      .then(
        function (next) {
          verifying = false;
          return next;
        },
        function (error) {
          verifying = false;
          throw error;
        }
      );
  }

  function signUp(options) {
    var supabase = client();
    if (!supabase) return Promise.reject(new Error("El servicio de acceso no está disponible."));

    var data = options || {};
    var email = String(data.email || "").trim();
    var password = String(data.password || "");
    var role = data.role === "chofer" ? "chofer" : "socio";
    var registrationCode = String(data.registrationCode || "").trim().toUpperCase();
    var accessCode = String(data.accessCode || "").trim().toUpperCase();
    if (!email || !password) {
      return Promise.reject(new Error("Escribe tu email y contraseña."));
    }
    if (role === "socio" && !registrationCode) {
      return Promise.reject(new Error("Necesitas tu número de socio."));
    }
    if (role === "chofer" && !accessCode) {
      return Promise.reject(new Error("Necesitas tu número de chofer."));
    }

    var metadata = {
      app_role: role,
      display_name: String(data.displayName || "").trim(),
      assigned_hotel: role === "chofer" ? String(data.assignedHotel || "").trim() : "",
      shift: role === "chofer" ? String(data.shift || "").trim() : "",
      registration_code: role === "socio" ? registrationCode : "",
      access_code: role === "chofer" ? accessCode : registrationCode
    };

    verifying = true;
    return supabase.auth.signUp({
      email: email,
      password: password,
      options: { data: metadata }
    })
      .then(function (response) {
        if (response.error) throw new Error(errorMessage(response.error, "No se pudo crear la cuenta."));
        var session = response.data && response.data.session;
        if (!session) {
          return { needsConfirmation: true, session: null, profile: null };
        }
        return loadProfile(session).then(function (next) {
          if (!next || !next.profile) {
            return supabase.auth.signOut().then(function () {
              setState(null);
              throw new Error("La cuenta se creó, pero no tiene un perfil activo.");
            });
          }
          if (next.profile.role !== role) {
            return supabase.auth.signOut().then(function () {
              setState(null);
              throw new Error("La cuenta creada no corresponde a " + roleLabel(role) + ".");
            });
          }
          setState(next);
          return { needsConfirmation: false, session: session, profile: next.profile };
        });
      })
      .then(
        function (result) {
          verifying = false;
          return result;
        },
        function (error) {
          verifying = false;
          throw error;
        }
      );
  }

  function signOut() {
    var supabase = client();
    if (!supabase) {
      setState(null);
      return Promise.resolve(null);
    }
    return supabase.auth.signOut().then(
      function () {
        setState(null);
        return null;
      },
      function () {
        setState(null);
        return null;
      }
    );
  }

  function subscribe(listener) {
    if (typeof listener !== "function") return function () {};
    listeners.push(listener);
    if (ready) {
      try { listener(current); } catch (error) {}
    }
    return function () {
      var index = listeners.indexOf(listener);
      if (index >= 0) listeners.splice(index, 1);
    };
  }

  function init() {
    if (initPromise) return initPromise;
    var supabase = client();
    if (!supabase) {
      ready = true;
      return Promise.resolve(null);
    }
    supabase.auth.onAuthStateChange(function (event, session) {
      if (verifying) return;
      if (event === "SIGNED_OUT" || !session) {
        setState(null);
        return;
      }
      loadProfile(session).then(setState).catch(function () {
        setState(null);
      });
    });
    initPromise = refresh();
    return initPromise;
  }

  RD.appAuth = {
    signIn: signIn,
    signUp: signUp,
    signOut: signOut,
    getState: function () { return current; },
    getRole: function () { return current && current.profile ? current.profile.role : null; },
    isReady: function () { return ready; },
    subscribe: subscribe,
    refresh: refresh
  };

  init();
})();
