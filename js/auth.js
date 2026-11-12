document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  const message = document.getElementById("login-message");
  if (!form || !message) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = new FormData(form).get("email");
    message.textContent = `Démonstration : aucun compte n’a été créé pour ${email}.`;
  });
});
