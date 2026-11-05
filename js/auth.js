document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  const message = document.getElementById("login-message");
  if (!form || !message) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = new FormData(form).get("email");
    localStorage.setItem("dualshop-user", String(email));
    message.textContent = `Connexion de démonstration réussie pour ${email}.`;
  });
});
