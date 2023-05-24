import {recipes} from '../assets/data/recipes.js';
import { rotateArrow } from './style.js';
import { accessInputs } from './style.js';
import { generateTagSearch } from './style.js';
//sonar cube: tool that check code for cleanliness and factorization;

let activeRecipes = recipes;

//create starting page in index.JS
function init () {
    rotateArrow();
    accessInputs();
    generateTagSearch();
    generateTagLists();
    createRecipeCards(recipes);
    mainSearch();
}

init();

//generate tag lists
function generateTagLists() {
    createTagsListInTheDOM(createTagArray(activeRecipes, "ingredients"), "ingredients");
    createTagsListInTheDOM(createTagArray(activeRecipes, "appliance"), "appliance");
    createTagsListInTheDOM(createTagArray(activeRecipes, "ustensils"), "ustensils");
}

//Get tags array
function createTagArray(activeRecipes, attribute) {
  if (attribute === "ingredients") {
    const ingredientsRaw = activeRecipes.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient));
    return [...new Set(ingredientsRaw.map(item => item.toLowerCase()))];
  } else if (attribute === "appliance") {
    const ingredientsRaw = activeRecipes.map(recipe => recipe.appliance);
    return [...new Set(ingredientsRaw.map(item => item.toLowerCase()))];
  } else if (attribute === "ustensils") {
    const ingredientsRaw = activeRecipes.flatMap(recipe => recipe.ustensils);
    return [...new Set(ingredientsRaw.map(item => item.toLowerCase()))];
  } else {
    // Invalid attribute, return an empty array or handle the error as needed
    return [];
  }
}


function createTagsListInTheDOM(tagList, attribute) {
  const researchContainer = document.querySelector(`.${attribute}Research`);
  const tagListContainer = document.querySelector(`.${attribute}TagList`);

  //checking whether or not this is a first generation or an update of the list
  if (tagListContainer === null) {
    const newTagListContainer = document.createElement("div");
    newTagListContainer.classList.add(`${attribute}TagList`, "tagList", `${attribute}TagStyle`);
    researchContainer.appendChild(newTagListContainer);
  } else {
    researchContainer.removeChild(tagListContainer);
    const newTagListContainer = document.createElement("div");
    newTagListContainer.classList.add(`${attribute}TagList`, "tagList", `${attribute}TagStyle`);
    researchContainer.appendChild(newTagListContainer);
  }
  //create tag list
  const container = document.querySelector(`.${attribute}TagList`);
  tagList.forEach(tag => {
    const tagDiv = document.createElement("div");
    tagDiv.classList.add(`${attribute}Tag`);
    const tagParagraph = document.createElement("p");
    tagParagraph.innerText = tag;
    tagDiv.appendChild(tagParagraph);
    container.appendChild(tagDiv);
    //create event listener to add tag to the active tag list
    selectTag(tagDiv, attribute);
  });
  container.style.display = "none";
}

//add the tag to the active tag list
function selectTag(tag, attribute) {
    tag.addEventListener('click', () => {
      //add the tag to the active tag list
      const selectedTag = document.createElement("div");
      selectedTag.classList.add("selectedTag");
      selectedTag.classList.add(`selected${attribute}Tag`);
      selectedTag.innerText = tag.innerText;
      const closingButton = document.createElement("img");
      closingButton.alt = "boutton de retrait du tag";
      closingButton.src = "../assets/logos/close-button.svg";
      selectedTag.append(closingButton);
      document.querySelector(".selectedTags").append(selectedTag);

      //create function to delete from active list
      closingButton.addEventListener('click', () => {
        closingButton.parentNode.remove(selectedTag);
        document.querySelector(`.${attribute}TagList`).innerHTML="";
        createRecipeCards(updateRecipesList());
        generateTagLists();
      });
      //update the recipes list
      createRecipeCards(updateRecipesList());
      console.log(activeRecipes);

      //update the taglists
      generateTagLists();
    });
  }

//generate TagLists
function updateRecipesList() {
    //filter recipe by tag
    const filteredRecipes = filterRecipesByTags();
    //filter recipe by input
    const input = document.querySelector(".inputRecherche").value;
    const inputRecipes = filterRecipesByInput(input);

    const finalRecipesList = filteredRecipes.filter(recipe => inputRecipes.includes(recipe));
    activeRecipes = finalRecipesList;
    console.log(activeRecipes)
    return finalRecipesList;
  }

  function filterRecipesByTags() {
    const selectedIngredients = Array.from(document.querySelectorAll(".selectedingredientsTag")).map(tag => tag.innerText);
    const selectedUstensils = Array.from(document.querySelectorAll(".selectedustensilsTag")).map(tag => tag.innerText);
    const selectedAppliances = Array.from(document.querySelectorAll(".selectedapplianceTag")).map(tag => tag.innerText);
    
    const filteredIngredients = [...new Set(selectedIngredients)].flatMap(ingredient => ingredient.split(", "));
    const filteredAppliances = [...new Set(selectedAppliances)];
    const filteredUstensils = [...new Set(selectedUstensils)];

    const filteredRecipesByIngredients = recipes.filter(recipe => {
      return filteredIngredients.every(ingredient => {
        return recipe.ingredients.some(item => item.ingredient.toLowerCase() === ingredient.toLowerCase());
      });
    });
    
    const filteredRecipesByAppliance = recipes.filter(recipe => {
      return filteredAppliances.every(appliance => {
        return recipe.appliance.toLowerCase() === appliance.toLowerCase();
      });
    });

    const filteredRecipesByUstensils = recipes.filter(recipe => {
      return filteredUstensils.every(ustensil => {
        return recipe.ustensils.some(item => item.toLowerCase() === ustensil.toLowerCase());
      });
    });

    const filteredRecipes = filteredRecipesByIngredients.filter(recipe => {
      // Check if the recipe is present in all three arrays
      return (
        filteredRecipesByAppliance.includes(recipe) &&
        filteredRecipesByUstensils.includes(recipe)
      );});
      console.log(filteredRecipes);

    return filteredRecipes;
    //console.log(filterRecipes);
  }

  function filterRecipesByInput(input) {
    const filteredRecipes = recipes.flatMap(recipe => {
      const recipeAttributes = Object.values(recipe);
      for (const attribute of recipeAttributes) {
        if (typeof attribute === 'string' && attribute.toLowerCase().includes(input.toLowerCase())) {
          return recipe;
        }
        if (Array.isArray(attribute)) {
          for (const item of attribute) {
            if (typeof item === 'string' && item.toLowerCase().includes(input.toLowerCase())) {
              return recipe;
            }
            if (item && typeof item === 'object') {
              const nestedValues = Object.values(item);
              for (const nestedValue of nestedValues) {
                if (typeof nestedValue === 'string' && nestedValue.toLowerCase().includes(input.toLowerCase())) {
                  return recipe;
                }
              }
            }
          }
        }
      }
      return [];
    });
    return filteredRecipes;
  }


  function createRecipeCards(recipes) {
    const recipeCards = document.querySelector(".recipeCards");
    const main = document.querySelector("main");
    if(recipeCards === null) {
      const newRecipeCards = document.createElement("section");
      newRecipeCards.classList.add("recipeCards");
    }
    else {
      main.removeChild(recipeCards);
    }
    const recipeGrid = document.createElement("section");
    recipeGrid.classList.add("recipeCards");
    main.appendChild(recipeGrid);
    recipes.forEach(recipe => {
      const recipeGrid = document.querySelector(".recipeCards");
      const recipeCard = document.createElement("div");
      const recipeCardImg = document.createElement("div");
      recipeCardImg.classList.add("recipeCardImg");
      const recipeCardTxt = document.createElement("div");
      recipeCardTxt.classList.add("recipeCardTxt");
      const recipeCardTextTop = document.createElement("div");
      recipeCardTextTop.classList.add("recipeCardTextTop");
      recipeCard.classList.add("recipeCard");
      const recipeName = document.createElement("div");
      recipeName.classList.add("recipeName");
      const recipeNameParagraph = document.createElement("h3");
      recipeNameParagraph.innerText = recipe.name;
      const recipteTime = document.createElement("div");
      recipteTime.classList.add("recipteTime");
      let recipeTimeDuration = document.createElement("p");
      recipeTimeDuration = `${recipe.time} min`;
      const recipeTimeImg = document.createElement("img");
      recipeTimeImg.src = "../assets/logos/timer.svg";
  
      const recipeDetails = document.createElement("div");
      recipeDetails.classList.add("recipeCardTextBottom");
  
      const ingredientsText = document.createElement("div");
      ingredientsText.classList.add("ingredientsText");
  
      //extract ingredients for correct display
      recipe.ingredients.forEach(ingredient => {
        if(ingredient.quantity && ingredient.unit){
          const ingredientsTextParagraph = document.createElement("p");
          ingredientsTextParagraph.classList.add("ingredientsList");
          ingredientsTextParagraph.innerHTML = `<strong>${ingredient.ingredient}:</strong> ${ingredient.quantity}${ingredient.unit}`;
          ingredientsText.append(ingredientsTextParagraph);
        }
        else if(ingredient.quantity){
          const ingredientsTextParagraph = document.createElement("p");
          ingredientsTextParagraph.classList.add("ingredientsList");
          ingredientsTextParagraph.innerHTML = `<strong>${ingredient.ingredient}:</strong> ${ingredient.quantity}`;
          ingredientsText.append(ingredientsTextParagraph);
        }
        else{
          const ingredientsTextParagraph = document.createElement("p");
          ingredientsTextParagraph.classList.add("ingredientsList");
          ingredientsTextParagraph.innerHTML = `<strong>${ingredient.ingredient}:</strong>`;
          ingredientsText.append(ingredientsTextParagraph);
        }
      });
  
      const instructionsBox = document.createElement("div");
      instructionsBox.classList.add("instructionsBox");
      const instructions = document.createElement("p");
      instructions.classList.add("instructions");
      instructions.innerText = `${recipe.description}`;
  
      recipeCard.append(recipeCardImg);
      recipeCard.append(recipeCardTxt);
      recipeGrid.append(recipeCard);
      recipeCardTxt.append(recipeCardTextTop);
      recipeCardTextTop.append(recipeName);
      recipeName.append(recipeNameParagraph);
      recipeCardTextTop.append(recipteTime);
      recipteTime.append(recipeTimeImg);
      recipteTime.append(recipeTimeDuration);
  
      recipeCardTxt.append(recipeDetails);
      recipeDetails.append(ingredientsText);
      recipeDetails.append(ingredientsText);
      recipeDetails.append(instructionsBox);
      instructionsBox.append(instructions);
    });
  }

function mainSearch(){
    const searchBar = document.querySelector(".inputRecherche");
    const errorMessageBox = document.createElement("div");
    errorMessageBox.classList.add("errorMessage");
    const errorMessageText = document.createElement("p");
    errorMessageText.innerText = "Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc.";
    errorMessageBox.append(errorMessageText);
    document.querySelector("main").append(errorMessageBox);
    searchBar.addEventListener('input', (event) => {
        if(event.target.value.length >= 3){
            const input = event.target.value;
            const filterByInput = filterRecipesByInput(input);
            const filterByTag = filterRecipesByTags();
            const finalFilter = filterByInput.filter(recipe => filterByTag.some(taggedRecipe => taggedRecipe.id === recipe.id));
            activeRecipes = finalFilter;
            createRecipeCards(updateRecipesList());
            generateTagLists();
            if(finalFilter.length >= 1){
            document.querySelector(".recipeCards").style.display = "flex";
            errorMessageBox.style.display = "none";
            }
            else{
                errorMessageBox.style.display = "block";
                document.querySelector(".recipeCards").style.display = "none";
                activeRecipes = [];
            }
        }

        else{
            document.querySelector(".recipeCards").style.display = "flex";
            errorMessageBox.style.display = "none";
            activeRecipes = recipes;
            createRecipeCards(updateRecipesList());
            generateTagLists();
        }
    });
}