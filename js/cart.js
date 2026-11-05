(() => {
  const CART_KEY = "dualshop-cart";
  const products = window.PRODUCTS || [];
  const productIds = new Set(products.map((product) => product.id));

  function getCart() {
    try {
      const cart = JSON.parse(localStorage.getItem(CART_KEY) || "{}");
      if (!cart || typeof cart !== "object" || Array.isArray(cart)) return {};
      return Object.fromEntries(Object.entries(cart).filter(([id, quantity]) =>
        productIds.has(id) && Number.isSafeInteger(quantity) && quantity > 0
      ));
    } catch (error) {
      console.error("Impossible de lire le panier enregistré.", error);
      return {};
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent("dualshop:cart-updated"));
  }

  function formatPrice(price) {
    return `${price.toFixed(2).replace(".", ",")} €`;
  }

  function renderCart() {
    const cart = getCart();
    const count = Object.values(cart).reduce((total, quantity) => total + quantity, 0);
    document.querySelectorAll(".cart-count").forEach((element) => {
      element.textContent = String(count);
    });

    const list = document.getElementById("cart-items");
    const summary = document.getElementById("cart-summary");
    if (!list || !summary) return;

    const entries = Object.entries(cart)
      .map(([id, quantity]) => ({ product: products.find((item) => item.id === id), quantity }))
      .filter((entry) => entry.product && entry.quantity > 0);

    if (entries.length === 0) {
      list.innerHTML = '<p class="muted">Votre panier est vide. <a href="produits.html">Découvrir les produits</a></p>';
      summary.innerHTML = "";
      return;
    }

    list.innerHTML = entries.map(({ product, quantity }) => `
      <article class="cart-row">
        <div class="cart-product">
          <span class="cart-emoji" aria-hidden="true">${product.icon}</span>
          <div><strong>${product.name}</strong><div class="muted">${formatPrice(product.price)} l’unité</div></div>
        </div>
        <div class="cart-controls">
          <button type="button" data-cart-change="${product.id}" data-delta="-1" aria-label="Retirer un ${product.name}">−</button>
          <span aria-live="polite">${quantity}</span>
          <button type="button" data-cart-change="${product.id}" data-delta="1" aria-label="Ajouter un ${product.name}">+</button>
          <strong>${formatPrice(product.price * quantity)}</strong>
          <button class="remove-item" type="button" data-cart-remove="${product.id}">Supprimer</button>
        </div>
      </article>`).join("");

    const subtotal = entries.reduce((sum, { product, quantity }) => sum + product.price * quantity, 0);
    const shipping = subtotal >= 80 ? 0 : 4.9;
    summary.innerHTML = `
      <div class="summary-line"><span>Sous-total</span><span>${formatPrice(subtotal)}</span></div>
      <div class="summary-line"><span>Livraison</span><span>${shipping === 0 ? "Offerte" : formatPrice(shipping)}</span></div>
      <div class="summary-line summary-total"><span>Total estimé</span><span>${formatPrice(subtotal + shipping)}</span></div>
      <p class="shipping-note">${subtotal >= 80 ? "La livraison est offerte pour cette commande." : `Plus que ${formatPrice(80 - subtotal)} pour bénéficier de la livraison offerte.`}</p>
      <a class="button checkout-button" href="commande.html">Continuer vers la commande <span aria-hidden="true">→</span></a>
      <a class="continue-shopping" href="produits.html">Continuer mes achats</a>`;
  }

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const addButton = target.closest("[data-add-to-cart]");
    if (addButton) {
      const id = addButton.dataset.addToCart;
      if (!productIds.has(id)) return;
      const cart = getCart();
      const quantityInput = document.getElementById("product-quantity");
      const requestedQuantity = quantityInput ? Number(quantityInput.value) : 1;
      const quantity = Number.isSafeInteger(requestedQuantity) && requestedQuantity > 0
        ? Math.min(requestedQuantity, 10)
        : 1;
      cart[id] = (cart[id] || 0) + quantity;
      addButton.dataset.originalLabel = addButton.textContent;
      try {
        saveCart(cart);
      } catch (error) {
        console.error("Impossible d’enregistrer le panier.", error);
        addButton.textContent = "Panier indisponible";
        window.setTimeout(() => { addButton.textContent = addButton.dataset.originalLabel || "Ajouter"; }, 1600);
        return;
      }
      addButton.textContent = "Ajouté !";
      window.setTimeout(() => { addButton.textContent = addButton.dataset.originalLabel; }, 1200);
      return;
    }

    const changeButton = target.closest("[data-cart-change]");
    if (changeButton) {
      const id = changeButton.dataset.cartChange;
      if (!productIds.has(id)) return;
      const cart = getCart();
      cart[id] = (cart[id] || 0) + Number(changeButton.dataset.delta);
      if (cart[id] <= 0) delete cart[id];
      try {
        saveCart(cart);
      } catch (error) {
        console.error("Impossible d’enregistrer le panier.", error);
      }
      return;
    }

    const removeButton = target.closest("[data-cart-remove]");
    if (removeButton) {
      const id = removeButton.dataset.cartRemove;
      if (!productIds.has(id)) return;
      const cart = getCart();
      delete cart[id];
      try {
        saveCart(cart);
      } catch (error) {
        console.error("Impossible d’enregistrer le panier.", error);
      }
    }
  });

  window.addEventListener("dualshop:cart-updated", renderCart);
  window.addEventListener("storage", (event) => {
    if (event.key === CART_KEY || event.key === null) renderCart();
  });
  document.addEventListener("DOMContentLoaded", renderCart);
})();
