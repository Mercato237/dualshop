(() => {
  const FAVORITES_KEY = "dualshop-favorites";
  const productIds = new Set((window.PRODUCTS || []).map((product) => product.id));

  function getFavorites() {
    try {
      const saved = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
      return Array.isArray(saved) ? saved.filter((id) => productIds.has(id)) : [];
    } catch (error) {
      console.error("Impossible de lire les favoris enregistrés.", error);
      return [];
    }
  }

  function renderFavorites() {
    const favorites = getFavorites();
    document.querySelectorAll(".favorite-count").forEach((badge) => {
      badge.textContent = String(favorites.length);
    });
    document.querySelectorAll("[data-favorite]").forEach((button) => {
      const selected = favorites.includes(button.dataset.favorite);
      const name = button.dataset.favoriteName || button.dataset.favorite;
      button.setAttribute("aria-pressed", String(selected));
      button.setAttribute("aria-label", `${selected ? "Retirer" : "Ajouter"} ${name} ${selected ? "des" : "aux"} favoris`);
      button.textContent = selected ? "♥" : "♡";
    });
  }

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const button = target.closest("[data-favorite]");
    if (!button || !productIds.has(button.dataset.favorite)) return;

    const favorites = getFavorites();
    const index = favorites.indexOf(button.dataset.favorite);
    if (index >= 0) favorites.splice(index, 1);
    else favorites.push(button.dataset.favorite);

    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      window.dispatchEvent(new CustomEvent("dualshop:favorites-updated"));
    } catch (error) {
      console.error("Impossible d’enregistrer les favoris.", error);
      const message = document.getElementById("favorites-message");
      if (message) message.textContent = "Les favoris ne peuvent pas être enregistrés dans ce navigateur.";
    }
  });

  window.addEventListener("dualshop:favorites-updated", () => {
    renderFavorites();
    if (document.getElementById("products-grid")?.hasAttribute("data-favorites-only")) {
      window.renderDualShopProducts?.();
    }
  });
  window.addEventListener("storage", (event) => {
    if (event.key === FAVORITES_KEY || event.key === null) renderFavorites();
  });
  document.addEventListener("DOMContentLoaded", renderFavorites);
})();
