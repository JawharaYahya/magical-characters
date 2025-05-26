const filterContainer = document.getElementById("filterContainer");
const cardContainer = document.getElementById("cardContainer");

const houseFilter = document.createElement("select");
houseFilter.id = "houseFilter";

const placeholderOption = document.createElement("option");
placeholderOption.textContent = "House Menu";
placeholderOption.disabled = true;
placeholderOption.selected = true;
houseFilter.appendChild(placeholderOption);

const houseMenu = ["All", "Gryffindor", "Slytherin", "Hufflepuff", "Ravenclaw"];
houseMenu.forEach(house => {
  const option = document.createElement("option");
  option.value = house;
  option.textContent = house;
  houseFilter.appendChild(option);
});

filterContainer.appendChild(houseFilter);

const loadMoreButton = document.createElement("button");
loadMoreButton.textContent = "Load More";
loadMoreButton.className="loadMoreButton"
document.body.appendChild(loadMoreButton);
loadMoreButton.style.display = "none";

let allCharacters = [];
let displayedCount = 0;
const batchSize = 16;

function fetchData() {
  fetch("https://hp-api.onrender.com/api/characters")
    .then(response => response.json())
    .then(characters => {
      allCharacters = characters;
      displayedCount = batchSize;
      renderData(allCharacters.slice(0, displayedCount));
      loadMoreButton.style.display = "block";
    })
    .catch(error => {
      console.error("Error caught here:", error);
    });
}

function renderData(characters) {
  const defaultImage = "images/not-found.png";
  cardContainer.innerHTML = "";
  characters.forEach(element => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${element.image}" onerror="this.onerror=null; this.src='${defaultImage}';" />
      <div class="cardContent">
        <p id="name">${element.name}.</p>
        <p>${element.house}.</p>
        <p>${element.dateOfBirth}.</p>
      </div>
    `;
    cardContainer.appendChild(card);
  });
}

function renderMoreData(characters) {
  const defaultImage = "images/not-found.png";
  characters.forEach(element => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${element.image}" onerror="this.onerror=null; this.src='${defaultImage}';" />
      <div class="cardContent">
        <p id="name">${element.name}.</p>
        <p>${element.house}.</p>
        <p>${element.dateOfBirth}.</p>
      </div>
    `;
    cardContainer.appendChild(card);
  });
}

function controlHouseChange() {
  const selectedHouse = houseFilter.value;
  switch (selectedHouse) {
    case "All":
      displayedCount = batchSize;
      renderData(allCharacters.slice(0, displayedCount));
      loadMoreButton.style.display = "block";
      break;
    case "Gryffindor":
      renderData(allCharacters.filter(c => c.house === "Gryffindor"));
      loadMoreButton.style.display = "none";
      break;
    case "Slytherin":
      renderData(allCharacters.filter(c => c.house === "Slytherin"));
      loadMoreButton.style.display = "none";
      break;
    case "Hufflepuff":
      renderData(allCharacters.filter(c => c.house === "Hufflepuff"));
      loadMoreButton.style.display = "none";
      break;
    case "Ravenclaw":
      renderData(allCharacters.filter(c => c.house === "Ravenclaw"));
      loadMoreButton.style.display = "none";
      break;
  }
}

houseFilter.addEventListener("change", controlHouseChange);

loadMoreButton.addEventListener("click", () => {
  const nextBatch = allCharacters.slice(displayedCount, displayedCount + batchSize);
  renderMoreData(nextBatch);
  displayedCount += nextBatch.length;
  if (displayedCount >= allCharacters.length) {
    loadMoreButton.style.display = "none";
  }
});

fetchData();
