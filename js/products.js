(() => {
  const products = window.PRODUCTS || [];
  const formatPrice = (price) => `${price.toFixed(2).replace(".", ",")} €`;

  function productCard(product) {
    return `
      <article class="product-card" data-category="${product.category}" data-price="${product.price}" data-name="${product.name.toLocaleLowerCase("fr")}">
        <button class="favorite-toggle" type="button" data-favorite="${product.id}" data-favorite-name="${product.name}" aria-label="Ajouter ${product.name} aux favoris" aria-pressed="false">♡</button>
        <a class="product-visual" href="produit.html?id=${encodeURIComponent(product.id)}" aria-label="Découvrir ${product.name}">
          <img src="${product.image}" alt="${product.imageAlt}" loading="lazy" decoding="async">
          <span class="product-image-label">Photo illustrative · ${product.imageSource}</span>
        </a>
        <div class="product-info">
          <span class="product-category">${product.category}</span>
          <h3><a href="produit.html?id=${encodeURIComponent(product.id)}">${product.name}</a></h3>
          <p class="product-tagline">${product.tagline}</p>
          <p>${product.description}</p>
          <div class="product-actions">
            <span class="price">${formatPrice(product.price)}</span>
            <button class="button" type="button" data-add-to-cart="${product.id}">Ajouter au panier</button>
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
        grid.innerHTML = '<div class="empty-state"><span class="empty-state-icon" aria-hidden="true">♡</span><h2>Vos favoris apparaîtront ici</h2><p>Gardez vos trouvailles préférées à portée de main.</p><a class="button" href="produits.html">Explorer la boutique</a></div>';
      }
    }
    window.renderDualShopProducts = renderGrid;
    renderGrid();

    const detail = document.getElementById("product-detail");
    if (detail) {
      const id = new URLSearchParams(window.location.search).get("id");
      const product = products.find((item) => item.id === id);
      if (!product) {
        detail.innerHTML = '<div class="empty-state"><h1>Produit introuvable</h1><p>Ce produit n’est pas disponible dans notre sélection.</p><a class="button" href="produits.html">Retour à la boutique</a></div>';
        return;
      }
      document.title = `${product.name} — DualShop`;
      const description = document.querySelector('meta[name="description"]');
      if (description) description.content = `${product.name} : ${product.description}`;
      detail.innerHTML = `
        <div class="product-visual product-detail-visual">
          <img src="${product.image}" alt="${product.imageAlt}" fetchpriority="high">
          <span class="visual-caption">Photo illustrative via <a href="https://www.pexels.com/license/" target="_blank" rel="noreferrer">Pexels</a></span>
        </div>
        <div class="product-detail-copy">
          <p class="eyebrow">DualShop sélection</p>
          <p class="product-category">${product.category}</p>
          <h1>${product.name}</h1>
          <p class="product-tagline">${product.tagline}</p>
          <p>${product.description}</p>
          <ul class="product-highlights">${product.highlights.map((highlight) => `<li>${highlight}</li>`).join("")}</ul>
          <p class="price">${formatPrice(product.price)}</p>
          <div class="detail-actions">
            <label class="quantity-field">Quantité<input type="number" min="1" max="10" value="1" id="product-quantity" inputmode="numeric"></label>
            <button class="button" type="button" data-add-to-cart="${product.id}">Ajouter au panier</button>
            <button class="favorite-toggle detail-favorite" type="button" data-favorite="${product.id}" data-favorite-name="${product.name}" aria-label="Ajouter ${product.name} aux favoris" aria-pressed="false">♡</button>
          </div>
          <p class="detail-demo-note">Article de démonstration · aucune vente réelle</p>
        </div>`;
    }
  });
})();
