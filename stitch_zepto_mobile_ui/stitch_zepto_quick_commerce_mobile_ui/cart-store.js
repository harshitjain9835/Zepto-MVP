(function () {
  "use strict";

  var STORAGE_KEY = "zeptoCartStateV1";
  var catalog = {
    milk: {
      id: "milk",
      name: "Taaza Toned Milk",
      brand: "AMUL",
      subtitle: "500 ml",
      price: 27,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2CDGA4mBHoGVK6kIrXbQPk-2Pn1hFoPPVRZf8BRwoURBxJnyR65gUrgGLxfWxuS99la6287A6QoaK7irzz_xisDIpJeUQXKNnpMh4AzcL3Yn7vcgtV7P2Q40UNoYc5RwiEGmgDae1rv_lnR70PtwRA1tQZAb-NTXyYH-ft99ZJCV-9O6lfXKy3ZefdkvK_rRDnlR-Ksh067LQI8zwbL-TuxNzcUU40fEfcwmRyqKqjwdh_hDmfZxqUOqUsFgtfu_wvET9YxL0VBN9"
    },
    doritos: {
      id: "doritos",
      name: "Nacho Cheese Doritos",
      brand: "DORITOS",
      subtitle: "90 g",
      price: 54,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDUpU4XiNfPGn6WaSp8v_ZDmfCtes0MlO5poGgkGfzX8Mn6pASA2atOazqtCooHOMSjNvlA6-cGJnKov59F1Jl2RjIBwDXGm_YoV2RHcVNToB177iOZYLHea9RWR_J5nrlwz679dR9ffLCmbSc5kEIjXwnYhufM8W845wNQnw9WcpBsGp9CZqUPs0Q-wKu6z9d0mNEBlzOp50aVkK-op7fxgLMH_iI_bBjyw11Z85SHDAJCVwiO-8iyvTTaPSh1Bh4Inp_3bVRtOEpo"
    },
    redbull: {
      id: "redbull",
      name: "Red Bull Energy Cans",
      brand: "RED BULL",
      subtitle: "4 x 250 ml",
      price: 120,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8WUSNxNFJkOekgZDka1OawOcB0zbGeh0yGI4tp7H_dpewm2Ns6-SUKguiA7JHFtwzl1d8YXqEAHaLejBOzetHBPCPrt9b5HCSHSrvNZi_ADYh-3lezuN0FFN-PZTMkgthaw-tY7HpuLrFE00Lpr6LOB39pnqyDsPutVfgnUx0mbzvRYslgydxgXUcCXRlYUy1gmeQ2wmC_Ukv_rWYsB2-rZrXEMW0UNIzhnhu0_Rj87iXVFqPJqEnJ50oUKzS6Vyq0dlQOwBKeKp9"
    },
    uno: {
      id: "uno",
      name: "Uno Card Game",
      brand: "MATTEL",
      subtitle: "Mattel Original",
      price: 199,
      image: ""
    }
  };

  function initialState() {
    return { items: ["milk", "doritos", "redbull"].map(function (id) {
      return Object.assign({}, catalog[id], { qty: 1 });
    }) };
  }

  function read() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var state = JSON.parse(raw);
      return state && Array.isArray(state.items) ? state : null;
    } catch (error) {
      return null;
    }
  }

  function write(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    window.dispatchEvent(new CustomEvent("zepto:cart-change", { detail: state }));
    return state;
  }

  function getState() {
    var state = read();
    if (state) {
      state.items = state.items.map(function (item) {
        return Object.assign({}, catalog[item.id] || {}, item, { qty: Number(item.qty || 0) });
      }).filter(function (item) { return item.id && item.qty > 0; });
      return state;
    }
    return write(initialState());
  }

  function changeQuantity(id, delta) {
    var state = getState();
    var index = state.items.findIndex(function (item) { return item.id === id; });

    if (index === -1 && delta > 0 && catalog[id]) {
      state.items.push(Object.assign({}, catalog[id], { qty: 1 }));
    } else if (index !== -1) {
      var nextQuantity = Math.max(0, Math.min(99, Number(state.items[index].qty || 0) + delta));
      if (nextQuantity === 0) state.items.splice(index, 1);
      else state.items[index].qty = nextQuantity;
    }

    return write(state);
  }

  function totals(items) {
    return (items || getState().items).reduce(function (summary, item) {
      summary.count += Number(item.qty || 0);
      summary.total += Number(item.qty || 0) * Number(item.price || 0);
      return summary;
    }, { count: 0, total: 0 });
  }

  function bindQuantityControls(container, onChange) {
    container.addEventListener("click", function (event) {
      var button = event.target.closest("[data-cart-action]");
      if (!button || !container.contains(button)) return;
      event.preventDefault();
      event.stopPropagation();
      var delta = button.getAttribute("data-cart-action") === "increment" ? 1 : -1;
      changeQuantity(button.getAttribute("data-item-id"), delta);
    });
    window.addEventListener("zepto:cart-change", function (event) { onChange(event.detail); });
  }

  window.ZeptoCart = {
    catalog: catalog,
    getState: getState,
    changeQuantity: changeQuantity,
    totals: totals,
    bindQuantityControls: bindQuantityControls
  };
})();
