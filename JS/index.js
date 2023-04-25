import {recipes} from '../assets/data/recipes.js';

const uniqueingredients = getIngredients();
const uniqueAppliance = getAppliances();
const uniqueUstensils = getUstensils();

init();

function init() {
    const elementTris = document.querySelectorAll(".elementTri");
    rotateArrow(elementTris);
    accessInputs(elementTris);
  }

  

  //modifier le eslint config


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


  //place into style.js later on

  //create animations for the arrows
function rotateArrow(elementTris) {
  elementTris.forEach(elementTri => {
    const arrowRotate = elementTri.querySelector('.rotate');
    elementTri.addEventListener('click', () => {
      arrowRotate.classList.add('rotate180');
    });
    document.addEventListener('click', function(event) {
      // Check if the click event occurred inside the elementTri or not
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
            // Check if the click event occurred inside the elementTri or not
            const isClickInside = elementTri.contains(event.target);
            if (!isClickInside) {
                inputField.style.display = "none";
                titreRecherche.style.display = "block";
                elementTri.style.width = "180px";
                const tagsParagraph = elementTri.nextElementSibling;
                const paragraph = tagsParagraph.firstChild;
                paragraph.textContent = "";
            }
          });
    });
  }