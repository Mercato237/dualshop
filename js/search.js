document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("product-search");
  const grid = document.getElementById("products-grid");
  const message = document.getElementById("search-message");
  if (!input || !grid) return;
  const category = document.getElementById("product-category");
  const sort = document.getElementById("product-sort");
  const count = document.getElementById("product-count");

  function updateProducts() {
    const query = input.value.trim().toLocaleLowerCase("fr");
    const cards = [...grid.querySelectorAll(".product-card")];
    cards.sort((first, second) => {
      if (sort?.value === "price-asc") return Number(first.dataset.price) - Number(second.dataset.price);
      if (sort?.value === "price-desc") return Number(second.dataset.price) - Number(first.dataset.price);
      if (sort?.value === "name") return first.dataset.name.localeCompare(second.dataset.name, "fr");
      return 0;
    }).forEach((card) => grid.append(card));

    let visibleCount = 0;
    cards.forEach((card) => {
      const matches = card.textContent.toLocaleLowerCase("fr").includes(query)
        && (!category || category.value === "all" || card.dataset.category === category.value);
      card.hidden = !matches;
      if (matches) visibleCount += 1;
    });
    if (count) count.textContent = `${visibleCount} ${visibleCount > 1 ? "produits" : "produit"}`;
    if (message) {
      message.textContent = visibleCount === 0 ? "Aucun produit ne correspond à ces critères." : "";
    }
  }

  input.addEventListener("input", updateProducts);
  category?.addEventListener("change", updateProducts);
  sort?.addEventListener("change", updateProducts);
  updateProducts();
});
