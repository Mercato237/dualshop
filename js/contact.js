document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("contact-status");
  if (!form || !status) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const fields = new FormData(form);
    const subject = `[DualShop] ${fields.get("subject")}`;
    const body = [
      `Nom : ${fields.get("name")}`,
      `E-mail : ${fields.get("email")}`,
      "",
      String(fields.get("message"))
    ].join("\n");
    const mailto = `mailto:fronten31@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    status.textContent = "Votre messagerie va s’ouvrir avec un brouillon. Relisez-le puis envoyez-le depuis votre application.";
    window.location.href = mailto;
  });
});
