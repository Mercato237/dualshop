(() => {
  const CART_KEY = "dualshop-cart";
  const ORDER_KEY = "dualshop-demo-order";
  const products = window.PRODUCTS || [];
  const formatPrice = (price) => `${price.toFixed(2).replace(".", ",")} €`;

  function getOrderLines() {
    try {
      const saved = JSON.parse(localStorage.getItem(CART_KEY) || "{}");
      if (!saved || typeof saved !== "object" || Array.isArray(saved)) return [];
      return Object.entries(saved)
        .map(([id, quantity]) => ({
          product: products.find((product) => product.id === id),
          quantity
        }))
        .filter((line) => line.product && Number.isSafeInteger(line.quantity) && line.quantity > 0);
    } catch (error) {
      console.error("Impossible de lire le panier pour la commande.", error);
      return [];
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("checkout-form");
    if (form) {
      const items = document.getElementById("checkout-items");
      const totalElement = document.getElementById("checkout-total");
      const lines = getOrderLines();
      const error = document.getElementById("checkout-error");
      const submit = form.querySelector('button[type="submit"]');

      if (lines.length === 0) {
        form.hidden = true;
        const notice = document.createElement("p");
        notice.className = "empty-state";
        notice.innerHTML = 'Votre panier est vide. <a href="produits.html">Retourner à la boutique</a>';
        form.before(notice);
        if (items) items.textContent = "Ajoutez des produits pour commencer.";
        if (submit) submit.disabled = true;
        return;
      }

      const subtotal = lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
      const shipping = subtotal >= 80 ? 0 : 4.9;
      if (items) {
        items.innerHTML = lines.map(({ product, quantity }) => `
          <div class="checkout-item">
            <span>${product.icon} ${product.name} <strong>× ${quantity}</strong></span>
            <span>${formatPrice(product.price * quantity)}</span>
          </div>`).join("");
      }
      if (totalElement) {
        totalElement.innerHTML = `
          <div class="summary-line"><span>Sous-total</span><span>${formatPrice(subtotal)}</span></div>
          <div class="summary-line"><span>Livraison</span><span>${shipping === 0 ? "Offerte" : formatPrice(shipping)}</span></div>
          <div class="summary-line summary-total"><span>Total estimé</span><span>${formatPrice(subtotal + shipping)}</span></div>`;
      }

      form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!form.reportValidity()) return;

        const order = {
          reference: `DS-${Date.now().toString(36).toUpperCase()}`,
          total: subtotal + shipping,
          itemCount: lines.reduce((sum, line) => sum + line.quantity, 0),
          createdAt: new Date().toISOString()
        };
        try {
          localStorage.setItem(ORDER_KEY, JSON.stringify(order));
          localStorage.removeItem(CART_KEY);
          window.location.href = "commande-confirmee.html";
        } catch (storageError) {
          console.error("Impossible d’enregistrer la commande de démonstration.", storageError);
          if (error) error.textContent = "La confirmation n’a pas pu être enregistrée dans ce navigateur. Réessayez.";
        }
      });
    }

    const confirmation = document.getElementById("confirmation-message");
    const title = document.getElementById("confirmation-title");
    if (confirmation && title) {
      try {
        const order = JSON.parse(localStorage.getItem(ORDER_KEY) || "null");
        if (!order || typeof order.reference !== "string") {
          title.textContent = "Aucune commande à confirmer";
          confirmation.innerHTML = 'Votre panier est toujours disponible. <a href="panier.html">Retourner au panier</a>';
          return;
        }
        confirmation.textContent = `Référence ${order.reference} · ${order.itemCount} article${order.itemCount > 1 ? "s" : ""} · Total simulé : ${formatPrice(order.total)}.`;
      } catch (error) {
        console.error("Impossible de lire la confirmation de commande.", error);
        title.textContent = "Confirmation indisponible";
        confirmation.textContent = "Les informations de cette commande de démonstration ne sont plus disponibles.";
      }
    }
  });
})();
