const carsContainer = document.getElementById("cars-container");
const typeButtons = document.querySelectorAll(".filter-btn[data-filter]");
const brandFiltersContainer = document.getElementById("brand-filters");
const loadMoreBtn = document.getElementById("load-more-btn");

let selectedType = "all";
let selectedBrand = "all";
let visibleCars = 12;
const step = 12;

const params = new URLSearchParams(window.location.search);
const brandFromURL = params.get("brand");
const typeFromURL = params.get("type");
if (brandFromURL) {
  selectedBrand = brandFromURL;
}
if (typeFromURL) {
  selectedType = typeFromURL;
}

function formatTypes(type) {
  return Array.isArray(type) ? type.join(" / ") : type;
}

function createCarCard(car) {
  return `
    <div class="car-card">
      <img src="${car.image}" alt="${car.name}">
      <div class="car-info">
        <h3>${car.name}</h3>
        <p>${car.brand}</p>
        <p>${formatTypes(car.type)}</p>
      </div>
      <div class="car-bottom">
        <p>${car.price} $</p>
        <button class="car-btn" onclick="ajouterAuPanier(${car.id}, '${car.name}', ${car.price}, '${car.image}')">
          ajouter au panier
        </button>
      </div>
    </div>
  `;
}

function getFilteredCars() {
  return cars.filter((car) => {
    const matchType =
      selectedType === "all" ||
      (Array.isArray(car.type)
        ? car.type.includes(selectedType)
        : car.type === selectedType);

    const matchBrand = selectedBrand === "all" || car.brand === selectedBrand;

    return matchType && matchBrand;
  });
}

function displayCars() {
  const filteredCars = getFilteredCars();
  const carsToShow = filteredCars.slice(0, visibleCars);

  carsContainer.innerHTML = "";

  if (filteredCars.length === 0) {
    carsContainer.innerHTML = `<p class="no-results">Aucune voiture trouvée.</p>`;
    loadMoreBtn.style.display = "none";
    return;
  }

  carsToShow.forEach((car) => {
    carsContainer.innerHTML += createCarCard(car);
  });

  loadMoreBtn.style.display =
    visibleCars >= filteredCars.length ? "none" : "inline-block";
}

function setActiveTypeButton() {
  typeButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.filter === selectedType);
  });
}

function renderBrandFilters() {
  const brands = [...new Set(cars.map((car) => car.brand))];

  brandFiltersContainer.innerHTML = `
    <button class="filter-btn brand-btn ${selectedBrand === "all" ? "active" : ""}" data-brand="all">
      Toutes les marques
    </button>
    ${brands
      .map(
        (brand) => `
          <button class="filter-btn brand-btn ${selectedBrand === brand ? "active" : ""}" data-brand="${brand}">
            ${brand}
          </button>
        `,
      )
      .join("")}
  `;

  const brandButtons = document.querySelectorAll(".brand-btn");

  brandButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectedBrand = button.dataset.brand;
      visibleCars = 12;
      renderBrandFilters();
      displayCars();
    });
  });
}

typeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedType = button.dataset.filter;
    visibleCars = 12;
    setActiveTypeButton();
    displayCars();
  });
});

loadMoreBtn.addEventListener("click", () => {
  visibleCars += step;
  displayCars();
});

setActiveTypeButton();
renderBrandFilters();
displayCars();
