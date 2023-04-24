import {recipes} from '../assets/data/recipes.js';

//const uniqueIngredientNames = getIngredients();
//const randomTags = getRandomTags();
const ingredientArrow = document.querySelector("elementTri");

init();

function init() {
    const elementTris = document.querySelectorAll(".elementTri");
    rotateArrow(elementTris);
    //make input and tags available
    elementTris.forEach(elementTri => {
        const inputField = elementTri.querySelector("input");
        const titreRecherche = elementTri.querySelector(".titreRecherche");
        elementTri.addEventListener('click', () => {
            inputField.style.display = "block";
            titreRecherche.style.display = "none";
            elementTri.style.width = "220px";

                      //get the 30 random tags names
          const tag = elementTri.classList.item(1);
          const tagNames = tag === "ingredients" ?
          recipes.flatMap(recipe => {
            return recipe.ingredients.map(ingredient => ingredient.ingredient);
          }) : tag === "appareils" ?
          recipes.flatMap(recipe => {
            return recipe.appliance;
          }) :
          recipes.flatMap(recipe => {
            return recipe.ustensils;
          });
            const uniqueTagNames = Array.from(new Set(tagNames));
            const randomTagNames = getRandomTags(uniqueTagNames).join(' ');
            const tagsParagraph = elementTri.nextElementSibling;
            const paragraph = tagsParagraph.firstChild;

            paragraph.textContent = randomTagNames;
            console.log(paragraph.textContent);
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
          elementTri.style.transition = "width 0.3s ease";
    });
}

//create arrow animation
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



//get 30 random ingredients
function getRandomTags(uniqueTagNames) {
    const randomIngredients = [];
    for (let i = 0; i < 30; i++) {
    const randomIndex = Math.floor(Math.random() * uniqueTagNames.length);
    const randomIngredient = uniqueTagNames[randomIndex];
    randomIngredients.push(randomIngredient);
    }
    return(randomIngredients);
}

/*
const appareilsArrow = document.querySelector("appareils, i");
const ustensilesArrow = document.querySelector("ustensiles, i");
*/