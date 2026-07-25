(function () {
  "use strict";

  var flow = {
    home_dashboard: "../search_explore/code.html",
    search_explore: "../shopping_cart_1/code.html",
    shopping_cart_1: "../shopping_cart_2/code.html",
    shopping_cart_2: "../checkout_with_ai_cross_sell/code.html",
    checkout_with_ai_cross_sell: "../electronics_trust_overlay/code.html",
    electronics_trust_overlay: "../final_checkout_confirmation/code.html",
    final_checkout_confirmation: "../home_dashboard/code.html"
  };

  function getCurrentScreen(pathname) {
    var normalized = (pathname || "").replace(/\\/g, "/").toLowerCase();
    var screens = Object.keys(flow);
    for (var i = 0; i < screens.length; i += 1) {
      if (normalized.indexOf("/" + screens[i] + "/") !== -1) {
        return screens[i];
      }
    }
    return null;
  }

  function resolveNextPath() {
    var currentScreen = getCurrentScreen(window.location.pathname);
    if (!currentScreen) {
      return "home_dashboard/code.html";
    }
    return flow[currentScreen];
  }

  // Returns the icon text content of a material-symbols element near the click,
  // or null if none found.
  function getNearestIconName(element) {
    if (!element) return null;
    var iconEl = element.closest(".material-symbols-outlined, .material-symbols-rounded, .material-symbols-sharp");
    if (!iconEl) {
      iconEl = element.querySelector(".material-symbols-outlined, .material-symbols-rounded, .material-symbols-sharp");
    }
    if (iconEl) return iconEl.textContent.trim().toLowerCase();
    // Also check data-icon attribute
    var withDataIcon = element.closest("[data-icon]") || element.querySelector("[data-icon]");
    if (withDataIcon) return withDataIcon.getAttribute("data-icon").toLowerCase();
    return null;
  }

  // Returns a semantic override destination, or null to fall through to linear flow.
  function resolveSemanticDestination(element) {
    if (!element) return null;

    // ── Back button: any element containing arrow_back or chevron_left ──────
    var iconName = getNearestIconName(element);
    if (iconName === "arrow_back" || iconName === "chevron_left" || iconName === "arrow_back_ios") {
      return "BACK";
    }

    // Walk up to the nearest interactive container (button / anchor)
    var interactive = element.closest("button, a");
    if (interactive) {
      var interactiveIcon = getNearestIconName(interactive);

      // ── Cart FAB / cart buttons ──────────────────────────────────────────
      if (
        interactiveIcon === "shopping_basket" ||
        interactiveIcon === "shopping_cart" ||
        interactiveIcon === "shopping_bag"
      ) {
        return "../shopping_cart_1/code.html";
      }

      // ── Zepto / Home nav tab (bolt icon) ────────────────────────────────
      if (interactiveIcon === "bolt") {
        return "../home_dashboard/code.html";
      }

      // ── Back icon inside an interactive element ─────────────────────────
      if (
        interactiveIcon === "arrow_back" ||
        interactiveIcon === "chevron_left" ||
        interactiveIcon === "arrow_back_ios"
      ) {
        return "BACK";
      }
    }

    return null;
  }

  function shouldIgnoreClick(event) {
    if (!event || event.defaultPrevented) {
      return true;
    }
    if (event.button !== 0) {
      return true;
    }
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return true;
    }

    var target = event.target;
    if (!target || !(target instanceof Element)) {
      return false;
    }

    // Allow text interactions without forced navigation.
    var editable = target.closest("input, textarea, select, [contenteditable='true']");
    if (editable) {
      return true;
    }

    return false;
  }

  document.addEventListener(
    "click",
    function (event) {
      if (shouldIgnoreClick(event)) {
        return;
      }

      var semantic = resolveSemanticDestination(event.target);

      if (semantic === "BACK") {
        event.preventDefault();
        if (window.history.length > 1) {
          window.history.back();
        } else {
          window.location.href = "../home_dashboard/code.html";
        }
        return;
      }

      if (semantic) {
        event.preventDefault();
        window.location.href = semantic;
        return;
      }

      // Default: advance to next screen in linear flow.
      event.preventDefault();
      var next = resolveNextPath();
      if (next) {
        window.location.href = next;
      }
    },
    true
  );
})();
