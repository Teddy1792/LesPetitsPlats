import { rotateArrow } from './style.js';
import { accessInputs } from './style.js';
import { createRecipeCards } from './DOMCreation.js';
import { createIngredientsList } from './DOMCreation.js';
import { createAppliancesList } from './DOMCreation.js';
import { createUstensilsList } from './DOMCreation.js';
import { addIngredientsTags } from './DOMCreation.js';
import { addAppliancesTags } from './DOMCreation.js';
import { addUstensilsTags } from './DOMCreation.js';
import { createTagSearch } from './DOMCreation.js';
import { mainSearchBar } from './search.js';
import {recipes} from '../assets/data/recipes.js';

const tagsContainer = document.querySelectorAll(".barreDeRechercheSecondaire");
const tagsList = document.querySelectorAll(".barreDeRechercheSecondaire");
const elementTris = document.querySelectorAll(".elementTri");

init();

function init() {
  rotateArrow(elementTris);
  accessInputs(elementTris);
  createRecipeCards(recipes);
  createIngredientsList(recipes);
  createAppliancesList(recipes);
  createUstensilsList(recipes);
  addIngredientsTags();
  addAppliancesTags();
  addUstensilsTags();
  createTagSearch(tagsContainer, tagsList);
  mainSearchBar();
}