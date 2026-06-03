function corrigerImage(src) {
  const isInContent = window.location.pathname.includes("/content/");
  if (!isInContent && src.startsWith("../")) {
    return src.replace("../", "");
  }
  return src;
}
function getPanier() {
  return JSON.parse(localStorage.getItem("panier")) || [];
}
function savePanier(panier) {
  localStorage.setItem("panier", JSON.stringify(panier));
}
function ajouterAuPanier(id, nom, prix, image) {
  const panier = getPanier();
  const dejaPresente = panier.find(function (v) {
    return v.id === id;
  });
  if (dejaPresente) {
    afficherNotification("Cette voiture est déjà dans votre panier !");
    return;
  }
  panier.push({ id: id, nom: nom, prix: prix, image: image });
  savePanier(panier);
  afficherNotification(nom + " ajoutée au panier ✓");
  mettreAJourCompteur();
}
function supprimerDuPanier(id) {
  let panier = getPanier();
  panier = panier.filter(function (v) {
    return v.id !== id;
  });
  savePanier(panier);
  afficherPanier();
  mettreAJourCompteur();
}
function afficherPanier() {
  const panier = getPanier();
  const panierPanel = document.getElementById("panier-panel");
  const panierContenu = document.getElementById("panier-contenu");
  panierContenu.innerHTML = "";
  if (panier.length === 0) {
    panierContenu.innerHTML =
      "<p class='panier-vide'>Votre panier est vide.</p>";
    document.getElementById("panier-total").textContent = "Total : 0 $";
    panierPanel.classList.add("ouvert");
    return;
  }
  let total = 0;
  panier.forEach(function (voiture) {
    total += Number(voiture.prix) || 0;
    const item = document.createElement("div");
    item.className = "panier-item";
    item.innerHTML = `
<img src="${corrigerImage(voiture.image)}" alt="${voiture.nom}" class="panier-img" />
      <div class="panier-info">
        <p class="panier-nom">${voiture.nom}</p>
        <p class="panier-prix">${(Number(voiture.prix) || 0).toLocaleString()} $</p>
      </div>
      <button class="panier-supprimer" onclick="supprimerDuPanier(${voiture.id})">
        <i class='bx bx-trash'></i>
      </button>
    `;
    panierContenu.appendChild(item);
  });
  document.getElementById("panier-total").textContent =
    "Total : " + total.toLocaleString() + " $";
  panierPanel.classList.add("ouvert");
}
function fermerPanier() {
  document.getElementById("panier-panel").classList.remove("ouvert");
}
function mettreAJourCompteur() {
  const panier = getPanier();
  const compteur = document.getElementById("panier-compteur");
  if (compteur) {
    compteur.textContent = panier.length;
    compteur.style.display = panier.length > 0 ? "flex" : "none";
  }
}
function afficherNotification(texte) {
  const ancienne = document.getElementById("notif-panier");
  if (ancienne) ancienne.remove();
  const notif = document.createElement("div");
  notif.id = "notif-panier";
  notif.textContent = texte;
  document.body.appendChild(notif);
  setTimeout(function () {
    notif.remove();
  }, 2500);
}
function allerAcheter(e) {
  e.preventDefault();
  const panier = getPanier();
  if (panier.length === 0) {
    afficherNotification("Votre panier est vide !");
    return;
  }
  const isInContent = window.location.pathname.includes("/content/");
  window.location.href = isInContent ? "acheter.html" : "content/acheter.html";
}
function creerPanneau() {
  if (document.getElementById("panier-panel")) return;
  const panneau = document.createElement("div");
  panneau.id = "panier-panel";
  panneau.innerHTML = `
    <div class="panier-header">
      <h2><i class='bx bx-basket'></i> Mon Panier</h2>
      <button class="panier-fermer" onclick="fermerPanier()">
        <i class='bx bx-x'></i>
      </button>
    </div>
    <div id="panier-contenu"></div>
    <div class="panier-footer">
      <p id="panier-total">Total : 0 $</p>
      <a href="#" class="panier-acheter-btn" onclick="allerAcheter(event)">
        <i class='bx bx-credit-card'></i> Acheter
      </a>
    </div>
  `;
  document.body.appendChild(panneau);
  const overlay = document.createElement("div");
  overlay.id = "panier-overlay";
  overlay.onclick = fermerPanier;
  document.body.appendChild(overlay);
}
window.addEventListener("DOMContentLoaded", function () {
  // Panier
  creerPanneau();
  mettreAJourCompteur();
  const btnBasket = document.querySelector(".basket");
  if (btnBasket) {
    btnBasket.style.position = "relative";
    const compteur = document.createElement("span");
    compteur.id = "panier-compteur";
    compteur.style.display = "none";
    btnBasket.appendChild(compteur);
    btnBasket.addEventListener("click", function (e) {
      e.preventDefault();
      afficherPanier();
    });
  }
  const menuBtn = document.querySelector(".menu");
  const navbar = document.querySelector(".navbar");
  const loginBtn = document.getElementById("account-btn");
  if (menuBtn && navbar) {
    if (loginBtn && !navbar.querySelector(".nav-login")) {
      const clone = document.createElement("a");
      clone.className = "nav-login";
      clone.href = loginBtn.href;
      clone.innerHTML =
        "<i class='bx bx-log-in'></i> " + loginBtn.textContent.trim();
      const li = document.createElement("li");
      li.className = "nav-login-item";
      li.appendChild(clone);
      navbar.appendChild(li);
    }
    menuBtn.addEventListener("click", function (e) {
      e.preventDefault();
      navbar.classList.toggle("nav-open");
      const icon = menuBtn.querySelector("i");
      if (icon) {
        icon.className = navbar.classList.contains("nav-open")
          ? "bx bx-x"
          : "bx bx-menu";
      }
    });

    navbar.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navbar.classList.remove("nav-open");
        const icon = menuBtn.querySelector("i");
        if (icon) icon.className = "bx bx-menu";
      });
    });
  }
});
