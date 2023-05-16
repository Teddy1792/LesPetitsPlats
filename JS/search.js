import {recipes} from '../assets/data/recipes.js';
import { createRecipeCards } from './DOMCreation.js';
import { createIngredientsList } from './DOMCreation.js';
import { createAppliancesList } from './DOMCreation.js';
import { createUstensilsList } from './DOMCreation.js';
import { addIngredientsTags } from './DOMCreation.js';
import { addAppliancesTags } from './DOMCreation.js';
import { addUstensilsTags } from './DOMCreation.js';
import { getIngredients } from './DOMCreation.js';
import { getAppliances } from './DOMCreation.js';
import { getUstensils } from './DOMCreation.js';

let recipesList = recipes;


function filteredByTitle(input) {
  return recipes.filter(recipe => recipe.name.toLowerCase().includes(input.toLowerCase()))
}

export function filteredByIngredients(input) {
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
  //implement the search through tags here
  const recipesFilteredByTitle = filteredByTitle(input);
  const recipesFilteredByIngredients = filteredByIngredients(input);
  const recipesFilteredByDescription = filteredByDescription(input);
  const recipesFilteredByAll = recipesFilteredByTitle.concat(recipesFilteredByIngredients, recipesFilteredByDescription);
  let filteredByInput = Array.from(new Set(recipesFilteredByAll));
  return filteredByInput;
}

function checkIfTags(filteredByInput) {
  const tagLists = document.querySelectorAll(".selectedTag");
  if (tagLists.length === 0) {
    return filteredByInput;
  } else {
    const filteredResult = recipesList.filter(recipe => {
      return filteredByInput.some(filteredRecipe => filteredRecipe.id === recipe.id);
    });
    return filteredResult;
  }
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
      filteredByInput = checkIfTags(filteredByInput);
      if(filteredByInput.length >= 1){
        createRecipeCards(filteredByInput);
        createIngredientsList(getIngredients(filteredByInput));
        createAppliancesList(getAppliances(filteredByInput));
        createUstensilsList(getUstensils(filteredByInput));
        addIngredientsTags();
        addAppliancesTags();
        addUstensilsTags();
        recipesList = filteredByInput;
      }
      else{
        errorMessageBox.style.display = "block";
        document.querySelector(".recipeCards").style.display = "none";
        recipesList = [];
      }
    }
    else{
      errorMessageBox.style.display = "none";
      recipesList = checkIfTags(recipes);
      createRecipeCards(recipesList);
      createIngredientsList(getIngredients(recipesList));
      addIngredientsTags();
      createAppliancesList(getAppliances(recipesList));
      addAppliancesTags();
      createUstensilsList(getUstensils(recipesList));
      addUstensilsTags();
    }
  });
}

//search by tags + search tags by input
export function searchThroughIngredients () {
  //search through the list
  const ingredientsNodeList = document.querySelectorAll(".ingredientTag");
  const ingredientsList = Array.from(ingredientsNodeList).map((p) => p.textContent.toLocaleLowerCase());
  const searchBar = document.querySelector(".ingredientsInput");
  searchBar.addEventListener('input', (event) => {
    const input = event.target.value.toLocaleLowerCase();
    const newIngredientsList = ingredientsList.filter(tag => tag.includes(input));
    createIngredientsList(newIngredientsList);
    addIngredientsTags();
    document.querySelector(".ingredientsTagList").style.display = "block";
  });
}

export function searchThroughAppliances () {
    //search through the list
  const appliancesNodeList = document.querySelectorAll(".applianceTag");
  const appliancesList = Array.from(appliancesNodeList).map((p) => p.textContent.toLocaleLowerCase());
  const searchBar = document.querySelector(".appliancesInput");
  searchBar.addEventListener('input', (event) => {
    const input = event.target.value.toLocaleLowerCase();
    const newAppliancesList = appliancesList.filter(tag => tag.includes(input));
    createAppliancesList(newAppliancesList);
    addAppliancesTags();
    document.querySelector(".appliancesTagList").style.display = "block";
  });
}

export function searchThroughUstensils () {
  //search through the list
  const ingredientsNodeList = document.querySelectorAll(".ustensilTag");
  const ustensilsList = Array.from(ingredientsNodeList).map((p) => p.textContent.toLocaleLowerCase());
  const searchBar = document.querySelector(".ustensilsInput");
  searchBar.addEventListener('input', (event) => {
    const input = event.target.value.toLocaleLowerCase();
    const newUstensilsList = ustensilsList.filter(tag => tag.includes(input));
    createUstensilsList(newUstensilsList);
    addUstensilsTags();
    document.querySelector(".ustensilsTagList").style.display = "block";
  });
}

//export to DOMCreation
export function searchByTags(tags) {
  if (tags[0].classList.contains("selectedIngredientTag")){
    const tagsList = Array.from(tags).map(tag => tag.textContent);
    const activeRecipes = recipesList;
    const filteredRecipes = activeRecipes.filter(recipe => {
      return tagsList.every(ingredient => {
        return recipe.ingredients.some(item => item.ingredient.toLowerCase() === ingredient.toLowerCase());
      });
    });
    recipesList = filteredRecipes;
    return filteredRecipes;
  }
  else if (tags[0].classList.contains("selectedApplianceTag")){
    const tagsList = Array.from(tags).map(tag => tag.textContent);
    const activeRecipes = recipesList
    const filteredRecipes = activeRecipes.filter(recipe => {
      return tagsList.every(appliance => {
        return recipe.appliance.toLowerCase() === appliance.toLowerCase();
      });
    });
    recipesList = filteredRecipes;
    return filteredRecipes;
  }
  else if (tags[0].classList.contains("selectedUstensilTag")){
    const tagsList = Array.from(tags).map(tag => tag.textContent);
    const activeRecipes = recipesList
    const filteredRecipes = activeRecipes.filter(recipe => {
      return tagsList.every(ustensil => {
        return recipe.ustensils.some(item => item.toLowerCase() === ustensil.toLowerCase());
      });
    });
    recipesList = filteredRecipes;
    return filteredRecipes;
  }
  }

  function returnIngredients() {
    const ingredientTags = document.querySelectorAll(".selectedIngredientTag");
    if(ingredientTags.length !== 0){
      const tagsList = Array.from(ingredientTags).map(tag => tag.textContent);
      const filteredRecipes = recipes.filter(recipe => {
        return tagsList.every(ingredient => {
          return recipe.ingredients.some(item => item.ingredient.toLowerCase() === ingredient.toLowerCase());
        });
      });
      return filteredRecipes;
    }
    else{
      return(recipes);
    }
  }

  function returnAppliances() {
    const ApplianceTags = document.querySelectorAll(".selectedApplianceTag");
    if(ApplianceTags.length !== 0) {
      const tagsList = Array.from(ApplianceTags).map(tag => tag.textContent);
      const filteredRecipes = recipes.filter(recipe => {
        return tagsList.every(appliance => {
          return recipe.appliance.toLowerCase() === appliance.toLowerCase();
        });
      });
      return filteredRecipes;
    }
    else{
      return(recipes);
    }
  }

  function returnUstensils() {
    const UstensilsTags = document.querySelectorAll(".selectedUstensilTag");
    if(UstensilsTags.length !== 0){
      const tagsList = Array.from(UstensilsTags).map(tag => tag.textContent);
      const filteredRecipes = recipes.filter(recipe => {
        return tagsList.every(ustensil => {
          return recipe.ustensils.some(item => item.toLowerCase() === ustensil.toLowerCase());
        });
      });
      return filteredRecipes;
    }
    else{
      return(recipes);
    }
  }

  export function deleteTag() {
    const selectedTags = document.querySelectorAll(".selectedTag");
    if(selectedTags.length !== 0){
      const ingredientsList = returnIngredients();
      const appliancesList = returnAppliances();
      const ustensilsList = returnUstensils();
      const inputList = determinateInput();
      const totalList = ingredientsList.filter((item) => {
        return appliancesList.includes(item) && ustensilsList.includes(item) && inputList.includes(item);
      });
      console.log(totalList);
      console.log(ingredientsList);

      recipesList = totalList;
      createRecipeCards(totalList);
    }
    else{
      createRecipeCards(determinateInput());
    }
  }

  function determinateInput() {
    const searchBar = document.querySelector(".inputRecherche");
    if(searchBar.value.length < 3){
      return recipes;
    }
    else{
      return filterRecipesByInput(searchBar.value);
    }
  }