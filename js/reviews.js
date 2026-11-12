document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("feedback-form");
  const list = document.getElementById("feedback-list");
  const status = document.getElementById("feedback-status");
  if (!form || !list || !status) return;

  const storageKey = "dualshop-feedback";

  function readReviews() {
    const stored = localStorage.getItem(storageKey);
    if (!stored) return [];
    const reviews = JSON.parse(stored);
    if (!Array.isArray(reviews) || reviews.some((review) => (
      typeof review?.title !== "string"
      || typeof review?.comment !== "string"
      || typeof review?.author !== "string"
      || typeof review?.createdAt !== "string"
      || !Number.isInteger(review?.rating)
      || review.rating < 1
      || review.rating > 5
      || Number.isNaN(Date.parse(review?.createdAt))
    ))) {
      throw new TypeError("Le format des avis enregistrés est invalide.");
    }
    return reviews;
  }

  function renderReviews() {
    let reviews;
    try {
      reviews = readReviews();
    } catch (error) {
      console.error("Impossible de lire les avis de démonstration.", error);
      status.textContent = "Les avis enregistrés sur cet appareil ne peuvent pas être lus.";
      return;
    }

    list.replaceChildren();
    if (reviews.length === 0) {
      const empty = document.createElement("p");
      empty.className = "muted";
      empty.textContent = "Aucun avis enregistré sur cet appareil pour le moment.";
      list.append(empty);
      return;
    }

    reviews.slice().reverse().forEach((review) => {
      const article = document.createElement("article");
      article.className = "feedback-card";
      const meta = document.createElement("div");
      meta.className = "feedback-meta";
      const stars = document.createElement("span");
      stars.className = "feedback-stars";
      stars.setAttribute("role", "img");
      stars.setAttribute("aria-label", `Note : ${review.rating} sur 5`);
      stars.textContent = `${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}`;
      const author = document.createElement("span");
      author.textContent = review.author || "Visiteur";
      const date = document.createElement("time");
      date.dateTime = review.createdAt;
      date.textContent = new Date(review.createdAt).toLocaleDateString("fr-FR");
      meta.append(stars, author, date);

      const title = document.createElement("h3");
      title.textContent = review.title;
      const comment = document.createElement("p");
      comment.textContent = review.comment;
      article.append(meta, title, comment);
      list.append(article);
    });
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const fields = new FormData(form);
    const review = {
      rating: Number(fields.get("rating")),
      title: String(fields.get("title")).trim(),
      comment: String(fields.get("comment")).trim(),
      author: String(fields.get("author")).trim(),
      createdAt: new Date().toISOString()
    };
    if (!review.title || !review.comment) {
      status.textContent = "Ajoutez un titre et un commentaire avant l’enregistrement.";
      return;
    }

    try {
      const reviews = readReviews();
      reviews.push(review);
      localStorage.setItem(storageKey, JSON.stringify(reviews));
    } catch (error) {
      console.error("Impossible d’enregistrer l’avis de démonstration.", error);
      status.textContent = "L’avis n’a pas pu être enregistré dans le stockage local de ce navigateur.";
      return;
    }

    form.reset();
    status.textContent = "Votre avis est enregistré uniquement sur cet appareil.";
    renderReviews();
  });

  window.addEventListener("storage", (event) => {
    if (event.key === storageKey) renderReviews();
  });
  renderReviews();
});
