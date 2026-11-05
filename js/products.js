(() => {
  const products = window.PRODUCTS || [];
  const formatPrice = (price) => `${price.toFixed(2).replace(".", ",")} €`;

  function productCard(product) {
    return `
      <article class="product-card" data-category="${product.category}" data-price="${product.price}" data-name="${product.name.toLocaleLowerCase("fr")}">
        <button class="favorite-toggle" type="button" data-favorite="${product.id}" data-favorite-name="${product.name}" aria-label="Ajouter ${product.name} aux favoris" aria-pressed="false">♡</button>
        <a href="produit.html?id=${encodeURIComponent(product.id)}" aria-label="Voir ${product.name}">
          <div class="product-visual" aria-hidden="true">${product.icon}</div>
        </a>
        <div class="product-info">
          <span class="product-category">${product.category}</span>
          <h3><a href="produit.html?id=${encodeURIComponent(product.id)}">${product.name}</a></h3>
          <p>${product.description}</p>
          <div class="product-actions">
            <span class="price">${formatPrice(product.price)}</span>
            <button class="button" type="button" data-add-to-cart="${product.id}">Ajouter</button>
          </div>
        </div>
      </article>`;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("products-grid");
    function renderGrid() {
      if (!grid) return;
      const limit = Number(grid.dataset.limit) || products.length;
      let selectedProducts = products;
      if (grid.hasAttribute("data-favorites-only")) {
        try {
          const favorites = JSON.parse(localStorage.getItem("dualshop-favorites") || "[]");
          selectedProducts = products.filter((product) => Array.isArray(favorites) && favorites.includes(product.id));
        } catch (error) {
          console.error("Impossible de lire les favoris enregistrés.", error);
          selectedProducts = [];
        }
      }
      grid.innerHTML = selectedProducts.slice(0, limit).map(productCard).join("");
      if (selectedProducts.length === 0) {
        grid.innerHTML = '<p class="empty-state">Aucun favori pour le moment. <a href="produits.html">Explorer la boutique</a></p>';
      }
    }
    window.renderDualShopProducts = renderGrid;
    renderGrid();

    const detail = document.getElementById("product-detail");
    if (detail) {
      const id = new URLSearchParams(window.location.search).get("id");
      const product = products.find((item) => item.id === id);
      if (!product) {
        detail.innerHTML = "<p>Produit introuvable. <a href=\"produits.html\">Retour à la boutique</a></p>";
        return;
      }
      document.title = `${product.name} — DualShop`;
      detail.innerHTML = `
        <div class="product-visual" aria-hidden="true">${product.icon}</div>
        <div>
          <p class="eyebrow">DualShop sélection</p>
          <p class="product-category">${product.category}</p>
          <h1>${product.name}</h1>
          <p>${product.description}</p>
          <p class="price">${formatPrice(product.price)}</p>
          <div class="detail-actions">
            <label class="quantity-field">Quantité<input type="number" min="1" max="10" value="1" id="product-quantity"></label>
            <button class="button" type="button" data-add-to-cart="${product.id}">Ajouter au panier</button>
            <button class="favorite-toggle detail-favorite" type="button" data-favorite="${product.id}" data-favorite-name="${product.name}" aria-label="Ajouter ${product.name} aux favoris" aria-pressed="false">♡</button>
          </div>
        </div>`;
    }
  });
})();
