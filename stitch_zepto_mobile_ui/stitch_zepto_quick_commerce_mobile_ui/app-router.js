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

  function navigateToNextScreen() {
    var next = resolveNextPath();
    if (!next) {
      return;
    }
    window.location.href = next;
  }

  document.addEventListener(
    "click",
    function (event) {
      if (shouldIgnoreClick(event)) {
        return;
      }
      event.preventDefault();
      navigateToNextScreen();
    },
    true
  );
})();
