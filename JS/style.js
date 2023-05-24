//create animations for the arrows
export function rotateArrow() {
  const elementTris = document.querySelectorAll(".elementTri");
  elementTris.forEach(elementTri => {
    const arrowRotate = elementTri.querySelector('.rotate');
    elementTri.addEventListener('click', () => {
      arrowRotate.classList.add('rotate180');
    });
    document.addEventListener('click', function(event) {
      // Check if the click event occurred inside the search menu or not
      const isClickInside = elementTri.contains(event.target);
      if (!isClickInside) {
        arrowRotate.classList.remove('rotate180');
      }
    });
  });
}

  //make inputs available
  export function accessInputs () {
    const elementTris = document.querySelectorAll(".elementTri");
    elementTris.forEach(elementTri => {
      const inputField = elementTri.querySelector("input");
      const titreRecherche = elementTri.querySelector(".titreRecherche");
      elementTri.addEventListener('click', () => {
          inputField.style.display = "block";
          inputField.focus();
          titreRecherche.style.display = "none";
          elementTri.style.width = "220px";
      });
      document.addEventListener('click', function(event) {
          // Check if the click event occurred inside the search menu or not
          const isClickInside = elementTri.contains(event.target);
          if (!isClickInside) {
              inputField.style.display = "none";
              titreRecherche.style.display = "block";
              elementTri.style.width = "180px";
          }
      });
    });
  }

  export function generateTagSearch() {
    createTagSearch("ingredients");
    createTagSearch("appliance");
    createTagSearch("ustensils");
  }

  function createTagSearch(attribute) {
    const tagsContainer = document.querySelector(`.${attribute}Research`);
    const tagsList = document.querySelector(`.${attribute}Research`);

    tagsContainer.addEventListener('click', () => {
      document.querySelector(`.${attribute}TagList`).style.display = "block";
      tagsList.classList.add(`${attribute}TagStyle`);
    });

    document.addEventListener('click', function(event) {
      const isClickInside = tagsContainer.contains(event.target);
      if (!isClickInside) {
        document.querySelector(`.${attribute}TagList`).style.display = "none";
        tagsList.classList.remove(`${attribute}TagStyle`);
      }
    });

}