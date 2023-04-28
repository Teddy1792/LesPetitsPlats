import {recipes} from '../assets/data/recipes.js';

const uniqueIngredients = getIngredients();
const uniqueAppliances = getAppliances();
const uniqueUstensils = getUstensils();

init();

function init() {
  const elementTris = document.querySelectorAll(".elementTri");
  rotateArrow(elementTris);
  accessInputs(elementTris);
  createIngredientsList(uniqueIngredients);
  createAppliancesList(uniqueAppliances);
  createUstensilsList(uniqueUstensils);
  addIngredientsTags();
  addAppliancesTags();
  addUstensilsTags();
}

//create taglists
function createIngredientsList (uniqueIngredients) {
  const tagsContainers = document.querySelectorAll(".tagList");
  const ingredientsContainer = tagsContainers[0];
  uniqueIngredients.forEach(ingredient => {
    const ingredientDiv = document.createElement("div");
    ingredientDiv.classList.add("ingredientTag");
    const ingredientParagraph = document.createElement("p");
    ingredientParagraph.innerText = ingredient;
    ingredientDiv.appendChild(ingredientParagraph);
    ingredientsContainer.appendChild(ingredientDiv);
  });
  ingredientsContainer.style.display = "none";
}

function createAppliancesList (uniqueAppliances) {
  const tagsContainers = document.querySelectorAll(".tagList");
  const appliancesContainer = tagsContainers[1];
  uniqueAppliances.forEach(appliance => {
    const appliancesDiv = document.createElement("div");
    appliancesDiv.classList.add("applianceTag");
    const applianceParagraph = document.createElement("p");
    applianceParagraph.innerText = appliance;
    appliancesDiv.appendChild(applianceParagraph);
    appliancesContainer.appendChild(appliancesDiv);
    appliancesContainer.style.display = "none";
  });
}

function createUstensilsList (uniqueUstensils) {
  const tagsContainers = document.querySelectorAll(".tagList");
  const ustensilsContainer = tagsContainers[2];
  uniqueUstensils.forEach(ustensil => {
    const ustensilDiv = document.createElement("div");
    ustensilDiv.classList.add("ustensilTag");
    const ustensilParagraph = document.createElement("p");
    ustensilParagraph.innerText = ustensil;
    ustensilDiv.appendChild(ustensilParagraph);
    ustensilsContainer.appendChild(ustensilDiv);
    ustensilsContainer.style.display = "none";
  });
}

//create event to add tags to the search
function addIngredientsTags() {
  const ingredientTags = document.querySelectorAll(".ingredientTag");
  ingredientTags.forEach(ingredientTag => {
    ingredientTag.addEventListener('click', () => {
      const SelectedIngredientTag = document.createElement("div");
      SelectedIngredientTag.classList.add("selectedTag");
      SelectedIngredientTag.classList.add("selectedIngredientTag");
      SelectedIngredientTag.innerText = ingredientTag.innerText;
      const closingButton = document.createElement("img");
      closingButton.alt = "boutton de retrait du tag";
      closingButton.src = "../assets/logos/close-button.svg";
      SelectedIngredientTag.append(closingButton);
      document.querySelector(".selectedTags").append(SelectedIngredientTag);
      //create delete function
      closingButton.addEventListener('click', () => {
        closingButton.parentNode.remove(SelectedIngredientTag);
      });
    });
  });
}

function addAppliancesTags() {
  const applianceTags = document.querySelectorAll(".applianceTag");
  applianceTags.forEach(applianceTag => {
    applianceTag.addEventListener('click', () => {
      const SelectedApplianceTag = document.createElement("div");
      SelectedApplianceTag.classList.add("selectedTag");
      SelectedApplianceTag.classList.add("selectedApplianceTag");
      SelectedApplianceTag.innerText = applianceTag.innerText;
      const closingButton = document.createElement("img");
      closingButton.alt = "boutton de retrait du tag";
      closingButton.src = "../assets/logos/close-button.svg";
      SelectedApplianceTag.append(closingButton);
      document.querySelector(".selectedTags").append(SelectedApplianceTag);

      //create delete function
      closingButton.addEventListener('click', () => {
        closingButton.parentNode.remove(SelectedApplianceTag);
      });
    });
  });
}

function addUstensilsTags() {
  const ustensilsTags = document.querySelectorAll(".ustensilTag");
  ustensilsTags.forEach(ustensilTag => {
    ustensilTag.addEventListener('click', () => {
      const SelectedUstensilsTag = document.createElement("div");
      SelectedUstensilsTag.classList.add("selectedTag");
      SelectedUstensilsTag.classList.add("selectedUstensilTag");
      SelectedUstensilsTag.innerText = ustensilTag.innerText;
      const closingButton = document.createElement("img");
      closingButton.alt = "boutton de retrait du tag";
      closingButton.src = "../assets/logos/close-button.svg";
      SelectedUstensilsTag.append(closingButton);
      document.querySelector(".selectedTags").append(SelectedUstensilsTag);

      //create delete function
      closingButton.addEventListener('click', () => {
        closingButton.parentNode.remove(SelectedUstensilsTag);
      });
    });
  });
}


//créer les eventListeners pour déclencher la recherche par tag
const tagsContainer = document.querySelectorAll(".barreDeRechercheSecondaire");
const tagsList = document.querySelectorAll(".barreDeRechercheSecondaire");
tagsContainer[0].addEventListener('click', () => {
  document.querySelector(".ingredientsTagList").style.display = "block";
  tagsList[0].classList.add("ingredientsTagStyle");
});
document.addEventListener('click', function(event) {
  const isClickInside = tagsContainer[0].contains(event.target);
  if (!isClickInside) {
    document.querySelector(".ingredientsTagList").style.display = "none";
    tagsList[0].classList.remove("ingredientsTagStyle");
  }});

  tagsContainer[1].addEventListener('click', () => {
    document.querySelector(".appliancesTagList").style.display = "block";
    tagsList[1].classList.add("appliancesTagStyle");
  });
  document.addEventListener('click', function(event) {
    const isClickInside = tagsContainer[1].contains(event.target);
    if (!isClickInside) {
      document.querySelector(".appliancesTagList").style.display = "none";
      tagsList[1].classList.remove("appliancesTagStyle");
    }});

tagsContainer[2].addEventListener('click', () => {
  document.querySelector(".ustensilsTagList").style.display = "block";
  tagsList[2].classList.add("ustensilsTagStyle");
});
document.addEventListener('click', function(event) {
  const isClickInside = tagsContainer[2].contains(event.target);
  if (!isClickInside) {
    document.querySelector(".ustensilsTagList").style.display = "none";
    tagsList[2].classList.remove("ustensilsTagStyle");
  }});




//place into style.js later on

function getIngredients () {
  const ingredients = recipes.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient));
  return Array.from(new Set(ingredients));
}

function getAppliances () {
  const appliances = recipes.map(recipe => recipe.appliance);
  return Array.from(new Set(appliances));
 }
function getUstensils() {
  const ustensils = recipes.flatMap(recipe => recipe.ustensils);
  return Array.from(new Set(ustensils));
 }

//create animations for the arrows
function rotateArrow(elementTris) {
  elementTris.forEach(elementTri => {
    const arrowRotate = elementTri.querySelector('.rotate');
    elementTri.addEventListener('click', () => {
      arrowRotate.classList.add('rotate180');
    });
    document.addEventListener('click', function(event) {
      // Check if the click event occurred inside the search menu or not
      const isClickInside = elementTri.contains(event.target);
      if (!isClickInside) {
        arrowRotate.classList.remove('rotate180');
      }
    });
  });
}

//make inputs available
function accessInputs (elementTris) {
  elementTris.forEach(elementTri => {
    const inputField = elementTri.querySelector("input");
    const titreRecherche = elementTri.querySelector(".titreRecherche");
    elementTri.addEventListener('click', () => {
        inputField.style.display = "block";
        inputField.focus();
        titreRecherche.style.display = "none";
        elementTri.style.width = "220px";
    });
    document.addEventListener('click', function(event) {
        // Check if the click event occurred inside the search menu or not
        const isClickInside = elementTri.contains(event.target);
        if (!isClickInside) {
            inputField.style.display = "none";
            titreRecherche.style.display = "block";
            elementTri.style.width = "180px";
        }
    });
  });
}