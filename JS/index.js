import { rotateArrow } from './style.js';
import { accessInputs } from './style.js';
import { getIngredients } from './DOMCreation.js';
import { getAppliances } from './DOMCreation.js';
import { getUstensils } from './DOMCreation.js';
import { createRecipeCards } from './DOMCreation.js';
import { createIngredientsList } from './DOMCreation.js';
import { createAppliancesList } from './DOMCreation.js';
import { createUstensilsList } from './DOMCreation.js';
import { addIngredientsTags } from './DOMCreation.js';
import { addAppliancesTags } from './DOMCreation.js';
import { addUstensilsTags } from './DOMCreation.js';
import { createTagSearch } from './DOMCreation.js';
import { mainSearchBar } from './search.js';
import { searchThroughIngredients } from './search.js';
import { searchThroughAppliances } from './search.js';
import { searchThroughUstensils } from './search.js';
import {recipes} from '../assets/data/recipes.js';

const tagsContainer = document.querySelectorAll(".barreDeRechercheSecondaire");
const tagsList = document.querySelectorAll(".barreDeRechercheSecondaire");
const elementTris = document.querySelectorAll(".elementTri");

init();

function init() {
  rotateArrow(elementTris);
  accessInputs(elementTris);
  createRecipeCards(recipes);
  createIngredientsList(getIngredients(recipes));
  createAppliancesList(getAppliances(recipes));
  createUstensilsList(getUstensils(recipes));
  addIngredientsTags();
  addAppliancesTags();
  addUstensilsTags();
  createTagSearch(tagsContainer, tagsList);
  mainSearchBar();
  searchThroughIngredients();
  searchThroughAppliances();
  searchThroughUstensils();
}

/*

left to do: 
- manage the deletion of tags
- prevent reinitialization of recipesList when at least 1 tag is active

*/