(() => {
  const products = window.PRODUCTS || [];
  const header = document.querySelector(".site-header");
  const navigation = document.getElementById("primary-navigation");
  const footerNavigation = document.querySelector(".site-footer nav");
  const categories = [...new Set(products.map((product) => product.category))];

  if (header && navigation) {
    const searchForm = document.createElement("form");
    searchForm.className = "header-search";
    searchForm.action = "produits.html";
    searchForm.method = "get";
    searchForm.setAttribute("role", "search");
    searchForm.innerHTML = '<label class="visually-hidden" for="site-search">Rechercher dans la boutique</label><input id="site-search" name="q" type="search" placeholder="Que recherchez-vous ?" autocomplete="off"><button type="submit" aria-label="Lancer la recherche">⌕</button>';
    header.insertBefore(searchForm, header.querySelector(".menu-toggle"));

    [
      ["service-client.html", "Service client"],
      ["avis.html", "Avis"]
    ].forEach(([href, label]) => {
      const link = document.createElement("a");
      link.href = href;
      link.textContent = label;
      if (window.location.pathname.endsWith(href)) link.setAttribute("aria-current", "page");
      navigation.append(link);
    });

    const categoryNavigation = document.createElement("nav");
    categoryNavigation.className = "category-nav";
    categoryNavigation.setAttribute("aria-label", "Parcourir les catégories");
    const allProducts = document.createElement("a");
    allProducts.href = "produits.html";
    allProducts.textContent = "Tous les produits";
    categoryNavigation.append(allProducts);
    categories.forEach((category) => {
      const link = document.createElement("a");
      link.href = `produits.html?categorie=${encodeURIComponent(category)}`;
      link.textContent = category;
      categoryNavigation.append(link);
    });
    header.after(categoryNavigation);
  }

  if (footerNavigation) {
    [
      ["service-client.html", "Service client"],
      ["avis.html", "Donner mon avis"]
    ].forEach(([href, label]) => {
      const link = document.createElement("a");
      link.href = href;
      link.textContent = label;
      footerNavigation.append(link);
    });
  }

  const search = document.getElementById("site-search");
  if (search) search.value = new URLSearchParams(window.location.search).get("q") || "";
  document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });
})();
