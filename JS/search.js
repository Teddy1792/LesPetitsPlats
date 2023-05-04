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
  searchBar.addEventListener('input', (event) => {
    if(event.target.value.length >= 3){
      const input = event.target.value;
      filteredByInput = filterRecipesByInput(input);
      createRecipeCards(filteredByInput);
      createIngredientsList(filteredByInput);
      createAppliancesList(filteredByInput);
      createUstensilsList(filteredByInput);
    }
  });
}