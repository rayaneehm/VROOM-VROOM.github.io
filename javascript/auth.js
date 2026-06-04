const usersParDefaut = [
  {
    username: "admin",
    email: "admin@luxurycars.com",
    password: "Admin@2024!",
  },
];
let users =
  JSON.parse(localStorage.getItem("listeUtilisateurs")) || usersParDefaut;
if (!localStorage.getItem("listeUtilisateurs")) {
  localStorage.setItem("listeUtilisateurs", JSON.stringify(users));
}
function login() {
  const emailSaisi = document.getElementById("email").value.trim();
  const passwordSaisi = document.getElementById("password").value; // ✅ trim() retiré

  if (!emailSaisi || !passwordSaisi) {
    afficherMessage(
      "Veuillez remplir tous les champs.",
      "erreur",
      "login-form",
    );
    return;
  }
  const userTrouve = users.find(function (u) {
    return (
      (u.email === emailSaisi || u.username === emailSaisi) &&
      u.password === passwordSaisi
    );
  });

  if (userTrouve) {
    localStorage.setItem("utilisateurConnecte", userTrouve.username);
    afficherMessage(
      "Connexion réussie ! Bienvenue " + userTrouve.username,
      "succes",
      "login-form",
    );
    setTimeout(function () {
      window.location.href = "../index.html";
    }, 1500);
  } else {
    afficherMessage("Email ou mot de passe incorrect.", "erreur", "login-form");
  }
}
function signup() {
  const usernameSaisi = document.getElementById("username").value.trim();
  const emailSaisi = document.getElementById("reg-email").value.trim();
  const passwordSaisi = document.getElementById("reg-pass").value;
  const confirmSaisi = document.getElementById("confirm-password").value;

  if (!usernameSaisi || !emailSaisi || !passwordSaisi || !confirmSaisi) {
    afficherMessage(
      "Veuillez remplir tous les champs.",
      "erreur",
      "signup-form",
    );
    return;
  }
  if (!emailSaisi.includes("@") || !emailSaisi.includes(".")) {
    afficherMessage(
      "Veuillez entrer un email valide.",
      "erreur",
      "signup-form",
    );
    return;
  }
  if (passwordSaisi.length < 8) {
    afficherMessage(
      "Le mot de passe doit contenir au moins 8 caractères.",
      "erreur",
      "signup-form",
    );
    return;
  }
  if (!/[A-Z]/.test(passwordSaisi)) {
    afficherMessage(
      "Le mot de passe doit contenir au moins une majuscule.",
      "erreur",
      "signup-form",
    );
    return;
  }
  if (!/[0-9]/.test(passwordSaisi)) {
    afficherMessage(
      "Le mot de passe doit contenir au moins un chiffre.",
      "erreur",
      "signup-form",
    );
    return;
  }
  if (passwordSaisi !== confirmSaisi) {
    afficherMessage(
      "Les mots de passe ne correspondent pas.",
      "erreur",
      "signup-form",
    );
    return;
  }

  const emailExiste = users.find(function (u) {
    return u.email === emailSaisi;
  });
  if (emailExiste) {
    afficherMessage("Cet email est déjà utilisé.", "erreur", "signup-form");
    return;
  }
  users.push({
    username: usernameSaisi,
    email: emailSaisi,
    password: passwordSaisi,
  });
  localStorage.setItem("listeUtilisateurs", JSON.stringify(users));
  afficherMessage(
    "Compte créé ! Vous pouvez maintenant vous connecter.",
    "succes",
    "signup-form",
  );

  setTimeout(function () {
    const card = document.getElementById("card");
    if (card) {
      card.classList.remove("active");
      const faceLogin = document.getElementById("faceLogin");
      const faceRegister = document.getElementById("faceRegister");
      if (faceLogin) faceLogin.classList.replace("hide", "show");
      if (faceRegister) faceRegister.classList.replace("show", "hide");
    }
  }, 1800);
}
function logout() {
  localStorage.removeItem("utilisateurConnecte");
  const chemin = window.location.pathname;
  if (chemin.includes("/content/")) {
    window.location.href = "connexion.html";
  } else {
    window.location.href = "content/connexion.html";
  }
}

function getUtilisateurConnecte() {
  return localStorage.getItem("utilisateurConnecte");
}
function afficherMessage(texte, type, formId) {
  const ancienMessage = document.getElementById("message-auth");
  if (ancienMessage) ancienMessage.remove();
  const message = document.createElement("p");
  message.id = "message-auth";
  message.textContent = texte;
  message.style.color = type === "succes" ? "#2dc653" : "#e63946";
  message.style.textAlign = "center";
  message.style.marginTop = "10px";
  message.style.fontWeight = "bold";
  message.style.fontSize = "13px";
  const formulaire = document.getElementById(formId || "login-form");
  if (formulaire) formulaire.appendChild(message);
}
window.addEventListener("DOMContentLoaded", function () {
  const card = document.getElementById("card");
  const faceLogin = document.getElementById("faceLogin");
  const faceRegister = document.getElementById("faceRegister");
  const toRegister = document.getElementById("toRegister");
  const toLogin = document.getElementById("toLogin");
  if (toRegister) {
    toRegister.addEventListener("click", function () {
      card.classList.add("active");
      faceLogin.classList.replace("show", "hide");
      faceRegister.classList.replace("hide", "show");
    });
  }
  if (toLogin) {
    toLogin.addEventListener("click", function () {
      card.classList.remove("active");
      faceRegister.classList.replace("show", "hide");
      faceLogin.classList.replace("hide", "show");
    });
  }
  const boutonCompte = document.getElementById("account-btn");
  const utilisateur = getUtilisateurConnecte();
  if (boutonCompte && utilisateur) {
    boutonCompte.innerHTML =
      "<i class='bx bxs-user-circle'></i> " + utilisateur;
    boutonCompte.href = "#";
    boutonCompte.addEventListener("click", function () {
      logout();
    });
  }
});
