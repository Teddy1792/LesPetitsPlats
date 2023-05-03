import {recipes} from '../assets/data/recipes.js';
import { createRecipeCards } from './DOMCreation.js';

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

export function MainSearchBar() {
  const searchBar = document.querySelector(".inputRecherche");
  searchBar.addEventListener('input', (event) => {
    if(event.target.value.length >= 3){
      const input = event.target.value;
      const filteredByInput = filterRecipesByInput(input);
      createRecipeCards(filteredByInput);
    }
  });
}


//Le système recherche des recettes correspondant à l’entrée utilisateur dans : le titre de
//la recette, la liste des ingrédients de la recette, la description de la recette.