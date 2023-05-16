import { searchByTags } from './search.js';
import { deleteTag } from './search.js';

//create recipe cards
export function createRecipeCards(recipes) {
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

//create taglists
export function createIngredientsList (ingredients) {
  const ingredientsResearch = document.querySelector(".ingredientsResearch");
  const ingredientsTagList = document.querySelector(".ingredientsTagList");
  if(document.querySelector(".ingredientsTagList") === null) {
    const newingredientsResearch = document.createElement("div");
    newingredientsResearch.classList.add("ingredientsTagList", "tagList", "ingredientsTagStyle");
    ingredientsResearch.appendChild(newingredientsResearch);
  }
  else {
    ingredientsResearch.removeChild(ingredientsTagList);
    const newingredientsResearch = document.createElement("div");
    newingredientsResearch.classList.add("ingredientsTagList", "tagList", "ingredientsTagStyle");
    ingredientsResearch.appendChild(newingredientsResearch);
  }
  const ingredientsContainer = document.querySelector(".ingredientsTagList");
  ingredients.forEach(ingredient => {
    const ingredientDiv = document.createElement("div");
    ingredientDiv.classList.add("ingredientTag");
    const ingredientParagraph = document.createElement("p");
    ingredientParagraph.innerText = ingredient;
    ingredientDiv.appendChild(ingredientParagraph);
    ingredientsContainer.appendChild(ingredientDiv);
  });
  ingredientsContainer.style.display = "none";
}

export function createAppliancesList (appliances) {
  const appliancesResearch = document.querySelector(".appliancesResearch");
  const appliancesTagList = document.querySelector(".appliancesTagList");
  if(appliancesTagList === null) {
    const newAppliancesResearch = document.createElement("div");
    newAppliancesResearch.classList.add("appliancesTagList", "tagList", "appliancesTagStyle");
    appliancesResearch.appendChild(newAppliancesResearch);
  }
  else {
    appliancesResearch.removeChild(appliancesTagList);
    const newAppliancesResearch = document.createElement("div");
    newAppliancesResearch.classList.add("appliancesTagList", "tagList", "appliancesTagStyle");
    appliancesResearch.appendChild(newAppliancesResearch);
  }
  const appliancesContainer = document.querySelector(".appliancesTagList");
  appliances.forEach(appliance => {
    const appliancesDiv = document.createElement("div");
    appliancesDiv.classList.add("applianceTag");
    const applianceParagraph = document.createElement("p");
    applianceParagraph.innerText = appliance;
    appliancesDiv.appendChild(applianceParagraph);
    appliancesContainer.appendChild(appliancesDiv);
    appliancesContainer.style.display = "none";
  });
}

export function createUstensilsList (ustensils) {
  const ustensilsResearch = document.querySelector(".ustensilsResearch");
  const ustensilsTagList = document.querySelector(".ustensilsTagList");
  if(ustensilsTagList === null) {
    const newUstensilsResearch = document.createElement("div");
    newUstensilsResearch.classList.add("ustensilsTagList", "tagList", "ustensilsTagStyle");
    ustensilsResearch.appendChild(newUstensilsResearch);
  }
  else {
    ustensilsResearch.removeChild(ustensilsTagList);
    const newUstensilsResearch = document.createElement("div");
    newUstensilsResearch.classList.add("ustensilsTagList", "tagList", "ustensilsTagStyle");
    ustensilsResearch.appendChild(newUstensilsResearch);
  }
  const ustensilsContainer = document.querySelector(".ustensilsTagList");
  ustensils.forEach(ustensil => {
    const ustensilDiv = document.createElement("div");
    ustensilDiv.classList.add("ustensilTag");
    const ustensilParagraph = document.createElement("p");
    ustensilParagraph.innerText = ustensil;
    ustensilDiv.appendChild(ustensilParagraph);
    ustensilsContainer.appendChild(ustensilDiv);
    ustensilsContainer.style.display = "none";
  });
}

export function getIngredients (filteredrecipes) {
  const ingredients = filteredrecipes.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient));
  return Array.from(new Set(ingredients));
}

export function getAppliances (filteredrecipes) {
  const appliances = filteredrecipes.map(recipe => recipe.appliance);
  return Array.from(new Set(appliances));
 }

export function getUstensils(filteredrecipes) {
  const ustensils = filteredrecipes.flatMap(recipe => recipe.ustensils);
  return Array.from(new Set(ustensils));
 }

//create event to add tags to the search
export function addIngredientsTags() {
  const ingredientTags = document.querySelectorAll(".ingredientTag");
  ingredientTags.forEach(ingredientTag => {
    ingredientTag.addEventListener('click', (event) => {
      const SelectedIngredientTag = document.createElement("div");
      SelectedIngredientTag.classList.add("selectedTag");
      SelectedIngredientTag.classList.add("selectedIngredientTag");
      SelectedIngredientTag.innerText = ingredientTag.innerText;
      const closingButton = document.createElement("img");
      closingButton.alt = "boutton de retrait du tag";
      closingButton.src = "../assets/logos/close-button.svg";
      SelectedIngredientTag.append(closingButton);
      document.querySelector(".selectedTags").append(SelectedIngredientTag);

      //call research function
      const ingredientTags = document.querySelectorAll(".selectedIngredientTag");
      createRecipeCards(searchByTags(ingredientTags));

      //delete selected tag from the list
      const exclude = event.target.parentNode.innerText;
      const tagsList = document.querySelectorAll(".ingredientTag");
      const tagsListArray = Array.from(tagsList).flatMap((p) => p.textContent.trim());
      const filteredArray = tagsListArray.filter(tag => !tag.includes(exclude));
      //generate the ingredients list anew
      document.querySelector(".ingredientsTagList").innerHTML="";
      createIngredientsList(filteredArray);
      addIngredientsTags();

      //create delete event
      closingButton.addEventListener('click', () => {
        closingButton.parentNode.remove(SelectedIngredientTag);
        //add back the tag to the list
        const include = event.target.parentNode.innerText;
        const tagsList = document.querySelectorAll(".ingredientTag");
        const tagsListArray = Array.from(tagsList).flatMap((p) => p.textContent.trim());
        tagsListArray.unshift(include);
              //generate the ingredients list anew
        document.querySelector(".ingredientsTagList").innerHTML="";
        createIngredientsList(tagsListArray);
        addIngredientsTags();
        deleteTag();
      });
    });
  });
}


export function addAppliancesTags() {
  const applianceTags = document.querySelectorAll(".applianceTag");
  applianceTags.forEach(applianceTag => {
    applianceTag.addEventListener('click', (event) => {
      const SelectedApplianceTag = document.createElement("div");
      SelectedApplianceTag.classList.add("selectedTag");
      SelectedApplianceTag.classList.add("selectedApplianceTag");
      SelectedApplianceTag.innerText = applianceTag.innerText;
      const closingButton = document.createElement("img");
      closingButton.alt = "boutton de retrait du tag";
      closingButton.src = "../assets/logos/close-button.svg";
      SelectedApplianceTag.append(closingButton);
      document.querySelector(".selectedTags").append(SelectedApplianceTag);

      //call research function
      const ApplianceTags = document.querySelectorAll(".selectedApplianceTag");
      createRecipeCards(searchByTags(ApplianceTags));

      //delete selected tag from the list
      const exclude = event.target.parentNode.innerText;
      const tagsList = document.querySelectorAll(".applianceTag");
      const tagsListArray = Array.from(tagsList).flatMap((p) => p.textContent.trim());
      const filteredArray = tagsListArray.filter(tag => !tag.includes(exclude));
      //generate the appliances list anew
      document.querySelector(".appliancesTagList").innerHTML="";
      createAppliancesList(filteredArray);
      addAppliancesTags();

      //create delete event
      closingButton.addEventListener('click', () => {
        closingButton.parentNode.remove(SelectedApplianceTag);
        //add back the tag to the list
        const include = event.target.parentNode.innerText;
        const tagsList = document.querySelectorAll(".applianceTag");
        const tagsListArray = Array.from(tagsList).flatMap((p) => p.textContent.trim());
        tagsListArray.unshift(include);
              //generate the ingredients list anew
        document.querySelector(".appliancesTagList").innerHTML="";
        createAppliancesList(tagsListArray);
        addAppliancesTags();
        deleteTag();
      });
    });
  });
}

export function addUstensilsTags() {
  const ustensilsTags = document.querySelectorAll(".ustensilTag");
  ustensilsTags.forEach(ustensilTag => {
    ustensilTag.addEventListener('click', (event) => {
      const SelectedUstensilsTag = document.createElement("div");
      SelectedUstensilsTag.classList.add("selectedTag");
      SelectedUstensilsTag.classList.add("selectedUstensilTag");
      SelectedUstensilsTag.innerText = ustensilTag.innerText;
      const closingButton = document.createElement("img");
      closingButton.alt = "boutton de retrait du tag";
      closingButton.src = "../assets/logos/close-button.svg";
      SelectedUstensilsTag.append(closingButton);
      document.querySelector(".selectedTags").append(SelectedUstensilsTag);

      //call research function
      const UstensilsTags = document.querySelectorAll(".selectedUstensilTag");
      createRecipeCards(searchByTags(UstensilsTags));

      //delete selected tag from the list
      const exclude = event.target.parentNode.innerText;
      const tagsList = document.querySelectorAll(".ustensilTag");
      const tagsListArray = Array.from(tagsList).flatMap((p) => p.textContent.trim());
      const filteredArray = tagsListArray.filter(tag => !tag.includes(exclude));
      //generate the ustensils list anew
      document.querySelector(".ustensilsTagList").innerHTML="";
      createUstensilsList(filteredArray);
      addUstensilsTags();

      //create delete event
      closingButton.addEventListener('click', () => {
        closingButton.parentNode.remove(SelectedUstensilsTag);
        //add back the tag to the list
        const include = event.target.parentNode.innerText;
        const tagsList = document.querySelectorAll(".ustensilTag");
        const tagsListArray = Array.from(tagsList).flatMap((p) => p.textContent.trim());
        tagsListArray.unshift(include);
              //generate the ingredients list anew
        document.querySelector(".ustensilsTagList").innerHTML="";
        createUstensilsList(tagsListArray);
        addUstensilsTags();
        deleteTag();
      });
    });
  });
}


//create eventListeners to search by tag
export function createTagSearch(tagsContainer, tagsList){
tagsContainer[0].addEventListener('click', () => {
  document.querySelector(".ingredientsTagList").style.display = "block";
  tagsList[0].classList.add("ingredientsTagStyle");
});
document.addEventListener('click', function(event) {
  const isClickInside = tagsContainer[0].contains(event.target);
  if (!isClickInside) {
    document.querySelector(".ingredientsTagList").style.display = "none";
    tagsList[0].classList.remove("ingredientsTagStyle");
  }});

  tagsContainer[1].addEventListener('click', () => {
    document.querySelector(".appliancesTagList").style.display = "block";
    tagsList[1].classList.add("appliancesTagStyle");
  });
  document.addEventListener('click', function(event) {
    const isClickInside = tagsContainer[1].contains(event.target);
    if (!isClickInside) {
      document.querySelector(".appliancesTagList").style.display = "none";
      tagsList[1].classList.remove("appliancesTagStyle");
    }});

  tagsContainer[2].addEventListener('click', () => {
    document.querySelector(".ustensilsTagList").style.display = "block";
    tagsList[2].classList.add("ustensilsTagStyle");
  });
  document.addEventListener('click', function(event) {
    const isClickInside = tagsContainer[2].contains(event.target);
    if (!isClickInside) {
      document.querySelector(".ustensilsTagList").style.display = "none";
      tagsList[2].classList.remove("ustensilsTagStyle");
    }});
}