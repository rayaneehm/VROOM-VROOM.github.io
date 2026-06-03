function getPanier() {
  return JSON.parse(localStorage.getItem("panier")) || [];
}
function afficherRecap() {
  const panier = getPanier();
  const liste = document.getElementById("recap-liste");
  const totalWrapper = document.getElementById("recap-total-wrapper");
  const btn = document.getElementById("btn-confirmer");
  liste.innerHTML = "";
  if (panier.length === 0) {
    liste.innerHTML =
      '<div class="recap-vide"><i class="bx bx-basket"></i>Votre panier est vide.<br>' +
      '<a href="voitures.html" style="color:#e63946;text-decoration:none;font-weight:600;">← Voir les voitures</a></div>';
    totalWrapper.style.display = "none";
    btn.disabled = true;
    return;
  }
  let total = 0;
  panier.forEach(function (v) {
    total += Number(v.prix) || 0;
    const item = document.createElement("div");
    item.className = "recap-item";
    item.innerHTML =
      '<img src="' +
      v.image +
      '" alt="' +
      v.nom +
      '" class="recap-img" />' +
      '<div class="recap-info"><p class="recap-nom">' +
      v.nom +
      "</p>" +
      '<p class="recap-prix">' +
      (Number(v.prix) || 0).toLocaleString() +
      " $</p></div>" +
      '<button class="recap-supprimer" onclick="supprimerRecap(' +
      v.id +
      ')"><i class="bx bx-trash"></i></button>';
    liste.appendChild(item);
  });
  document.getElementById("recap-total-montant").textContent =
    total.toLocaleString();
  totalWrapper.style.display = "flex";
  btn.disabled = false;
}
function supprimerRecap(id) {
  let panier = getPanier();
  panier = panier.filter(function (v) {
    return v.id !== id;
  });
  localStorage.setItem("panier", JSON.stringify(panier));
  afficherRecap();
  if (typeof mettreAJourCompteur === "function") mettreAJourCompteur();
}
function formatCard(input) {
  var v = input.value.replace(/\D/g, "").substring(0, 16);
  input.value = v.replace(/(.{4})/g, "$1 ").trim();
}
function formatExp(input) {
  var v = input.value.replace(/\D/g, "").substring(0, 4);
  if (v.length >= 3) v = v.substring(0, 2) + "/" + v.substring(2);
  input.value = v;
}
document.addEventListener("DOMContentLoaded", function () {
  afficherRecap();
});
function confirmerAchat() {
  var panier = getPanier();
  if (panier.length === 0) return;
  var prenom = document.getElementById("prenom").value.trim();
  var nom = document.getElementById("nom").value.trim();
  var email = document.getElementById("email").value.trim();
  var telephone = document.getElementById("telephone").value.trim();
  var adresse = document.getElementById("adresse").value.trim();

  if (!prenom || !nom || !email || !telephone || !adresse) {
    alert("Veuillez remplir tous les champs personnels.");
    return;
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    alert("Adresse email invalide.");
    return;
  }
  var numero = document.getElementById("carte-numero").value.replace(/\s/g, "");
  var exp = document.getElementById("carte-exp").value;
  var cvv = document.getElementById("carte-cvv").value;
  if (numero.length < 16 || exp.length < 5 || cvv.length < 3) {
    alert("Veuillez renseigner les informations de carte correctement.");
    return;
  }
  var ref = "#LC-" + Math.floor(10000 + Math.random() * 90000);
  document.getElementById("modal-ref").textContent = ref;
  document.getElementById("modal-succes").classList.add("visible");
}
function finaliserCommande() {
  localStorage.removeItem("panier");
  if (typeof mettreAJourCompteur === "function") mettreAJourCompteur();
  window.location.href = "../index.html";
}
