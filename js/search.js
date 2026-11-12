document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("product-search");
  const grid = document.getElementById("products-grid");
  const message = document.getElementById("search-message");
  if (!input || !grid) return;
  const category = document.getElementById("product-category");
  const sort = document.getElementById("product-sort");
  const count = document.getElementById("product-count");
  const clearButton = document.getElementById("clear-search");
  const normalize = (value) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("fr");
  const featuredOrder = new Map([...grid.querySelectorAll(".product-card")].map((card, index) => [card, index]));

  if (category) {
    const allCategoriesOption = category.querySelector('option[value="all"]');
    category.replaceChildren(allCategoriesOption || new Option("Toutes les catégories", "all"));
    [...new Set((window.PRODUCTS || []).map((product) => product.category))].forEach((value) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      category.append(option);
    });
  }
  const params = new URLSearchParams(window.location.search);
  input.value = params.get("q") || "";
  if (category && [...category.options].some((option) => option.value === params.get("categorie"))) {
    category.value = params.get("categorie");
  }

  function updateProducts() {
    const query = normalize(input.value.trim());
    const cards = [...grid.querySelectorAll(".product-card")];
    cards.sort((first, second) => {
      if (sort?.value === "price-asc") return Number(first.dataset.price) - Number(second.dataset.price);
      if (sort?.value === "price-desc") return Number(second.dataset.price) - Number(first.dataset.price);
      if (sort?.value === "name") return first.dataset.name.localeCompare(second.dataset.name, "fr");
      return featuredOrder.get(first) - featuredOrder.get(second);
    }).forEach((card) => grid.append(card));

    let visibleCount = 0;
    cards.forEach((card) => {
      const matches = normalize(card.textContent).includes(query)
        && (!category || category.value === "all" || card.dataset.category === category.value);
      card.hidden = !matches;
      if (matches) visibleCount += 1;
    });
    if (count) count.textContent = `${visibleCount} ${visibleCount > 1 ? "produits" : "produit"}`;
    if (message) {
      message.textContent = visibleCount === 0 ? "Aucun produit ne correspond à ces critères." : "";
    }
    if (clearButton) {
      clearButton.hidden = !query && (!category || category.value === "all") && (!sort || sort.value === "featured");
    }
  }

  clearButton?.addEventListener("click", () => {
    input.value = "";
    if (category) category.value = "all";
    if (sort) sort.value = "featured";
    window.history.replaceState(null, "", window.location.pathname);
    input.focus();
    updateProducts();
  });
  input.addEventListener("input", updateProducts);
  category?.addEventListener("change", updateProducts);
  sort?.addEventListener("change", updateProducts);
  updateProducts();
});
