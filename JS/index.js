import {recipes} from '../assets/data/recipes.js';

const uniqueIngredientNames = getIngredients();
const randomIngredients = getRandomIngredients();
const ingredientArrow = document.querySelector("elementTri");

tabOpening();

function tabOpening() {
    rotateArrow();
    ingredientArrow.addEventListener("click", function(){
        //make the ingredients clickable
        //open the tab : enlarge the div, add the random ingredients
    });
}

//create arrow animation
function rotateArrow() {
    const elementTris = document.querySelectorAll(".elementTri");
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

//get the ingredients
function getIngredients() {
    const ingredientNames = recipes.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient));
    const uniqueIngredientNames = Array.from(new Set(ingredientNames));
    return uniqueIngredientNames;
}

//get 30 random ingredients
function getRandomIngredients() {
    const randomIngredients = [];
    for (let i = 0; i < 30; i++) {
    const randomIndex = Math.floor(Math.random() * uniqueIngredientNames.length);
    const randomIngredient = uniqueIngredientNames[randomIndex];
    randomIngredients.push(randomIngredient);
    }
    return(randomIngredients);
}

/*
const appareilsArrow = document.querySelector("appareils, i");
const ustensilesArrow = document.querySelector("ustensiles, i");
*/