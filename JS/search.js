import {recipes} from '../assets/data/recipes.js';
import { createRecipeCards } from './DOMCreation.js';
import { createIngredientsList } from './DOMCreation.js';
import { createAppliancesList } from './DOMCreation.js';
import { createUstensilsList } from './DOMCreation.js';

function filteredByTitle(input) {
  return recipes.filter(recipe => recipe.name.toLowerCase().includes(input.toLowerCase()))
}

function filteredByIngredients(input) {
  return recipes.filter(recipe => {
    return recipe.ingredients.some(ingredient => {
      return ingredient.ingredient.toLowerCase().includes(input.toLowerCase());
    });
  });
}

function filteredByDescription(input) {
  return recipes.filter(recipe => recipe.description.toLowerCase().includes(input.toLowerCase()));
}

function filterRecipesByInput(input) {
  const recipesFilteredByTitle = filteredByTitle(input);
  const recipesFilteredByIngredients = filteredByIngredients(input);
  const recipesFilteredByDescription = filteredByDescription(input);
  const recipesFilteredByAll = recipesFilteredByTitle.concat(recipesFilteredByIngredients, recipesFilteredByDescription);
  let filteredByInput = Array.from(new Set(recipesFilteredByAll));
  return filteredByInput;
}

export function mainSearchBar() {
  const searchBar = document.querySelector(".inputRecherche");
  let filteredByInput = [];
  const errorMessageBox = document.createElement("div");
  errorMessageBox.classList.add("errorMessage");
  const errorMessageText = document.createElement("p");
  errorMessageText.innerText = "Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc.";
  errorMessageBox.append(errorMessageText);
  document.querySelector("main").append(errorMessageBox);
  searchBar.addEventListener('input', (event) => {
    if(event.target.value.length >= 3){
      document.querySelector(".recipeCards").style.display = "block";
      errorMessageBox.style.display = "none";
      const input = event.target.value;
      filteredByInput = filterRecipesByInput(input);
      if(filteredByInput.length >= 1){
        createRecipeCards(filteredByInput);
        createIngredientsList(filteredByInput);
        createAppliancesList(filteredByInput);
        createUstensilsList(filteredByInput);
      }
      else{
        errorMessageBox.style.display = "block";
        document.querySelector(".recipeCards").style.display = "none";
      }
    }
    else{
      errorMessageBox.style.display = "none";
      createRecipeCards(recipes);
      createIngredientsList(recipes);
      createAppliancesList(recipes);
      createUstensilsList(recipes);
    }
  });
}