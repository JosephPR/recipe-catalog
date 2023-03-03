const mainDiv = document.querySelector("main")
const apiUrl = "https://api.edamam.com/api/recipes/v2?type=public";
const apiKey = config.MY_KEY;
const apiId = config.API_ID;
const ingredientForm = document.querySelector("#ingredient-form");
// const maxTime = 300;
// const maxIngreds = 100;
let nextPageUrl;

const fetchRecipes = async (ingredients, nextPageUrl = null) => {
    const url = new URL(apiUrl);
    url.searchParams.set("q", ingredients);
    url.searchParams.set("app_key", apiKey);
    url.searchParams.set("app_id", apiId);
  
    if(nextPageUrl){
      url.searchParams.set("from", nextPageUrl);
    }
  
    const response = await fetch(url);
    const data = await response.json();
    if(data._links && data._links.next){
      nextPageUrl = data._links.next.href;
    }
    console.log(data.hits)
      displayRecipes(data.hits,nextPageUrl);
  }

const displayRecipes = (recipes, nextPageUrl) => {
    mainDiv.innerHTML = "";


  recipes.forEach((recipe) => {
    const card = document.createElement("div");
    card.classList.add("recipe-card");
    const cardContent = document.createElement("div");
    cardContent.classList.add("recipe-card-content");
    const h1 = document.createElement("h1");
    h1.classList.add("recipe-title");
    const h3 = document.createElement("h3");
    h3.classList.add("recipe-cuisine");
    const p = document.createElement("p");
    p.classList.add("recipe-yield");
    const ul = document.createElement("ul");
    ul.classList.add("ingredient-list");
    const link = document.createElement("a");
    link.classList.add("recipe-link");
    link.setAttribute("href", recipe.recipe.url);
    link.setAttribute("target", "_blank");
    link.innerText = "Link to Recipe";

    const image = document.createElement("img");
    image.setAttribute("src", recipe.recipe.image);
   
    if (recipe.recipe.image !== null) {
      card.append(image);
    }
    h1.innerText = recipe.recipe.label;
    cardContent.append(h1);
    recipe.recipe.cuisineType.forEach(type => {
      h3.innerText = `Cuisine: ${type}`;
      cardContent.append(h3);
    });
    recipe.recipe.ingredients.forEach(ingredient => {
      const li = document.createElement("li");
      li.innerText = `- ${ingredient.text}`;
      ul.append(li);
    });
    p.innerText = `Serves: ${recipe.recipe.yield}`
    cardContent.append(ul);
    cardContent.append(link);
    cardContent.append(p);
    card.append(cardContent)
    mainDiv.append(card);
  });

  if (nextPageUrl) {
    const nextPageButton = document.createElement("button");
    nextPageButton.innerText = "Next page";
    nextPageButton.id = "next-page-button";
    nextPageButton.addEventListener("click", () => {
  
        fetch(nextPageUrl).then(
            res => res.json().then(
                data =>  displayRecipes(data.hits, data._links.next.href)

            )
        )
    });
    console.log("Next page url", nextPageUrl)
        mainDiv.appendChild(nextPageButton);
      

  }
};

ingredientForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const ingredients = document.querySelector("#ingredients").value;
    fetchRecipes(ingredients);
  });
  


// const mainDiv = document.querySelector("main")
// const apiURL = "https://api.edamam.com/search?q=";
// const apiKey = "&app_key=c11be4dc16f781bd026c970b43c3b516";
// const apiId = "&app_id=e2d149b9";
// const maxTime = "&time=30";
// const maxIngreds = `&ingr=100`;

// const fetchRecipes = async (...ingredients) => {
//   const mappedIngreds = ingredients
//     .map((ingredient, idx) => {
//       if (idx < ingredients.length - 1) {
//         return ingredient + "+";
//       } else {
//         return ingredient;
//       }
//     })
//     .join("");

//   const url = `${apiURL}${mappedIngreds}${maxIngreds}${maxTime}${apiId}${apiKey}`;
//   await fetch(url).then(
//     res => res.json().then(
// data => {
//     console.log(data.hits)
//     displayRecipes(data.hits)
// }
//     )
//   )
// };
// const displayRecipes = (recipes) => {
// recipes.forEach((recipe) => {
//     console.log("display", recipe)
//     const card = document.createElement("div")
//       const h1 = document.createElement("h1");
//       const h2 = document.createElement("h2");
//       const ul = document.createElement("ul");
//       const link = document.createElement("a");
//       link.setAttribute("href", `${recipe.recipe.url}`);
//       link.setAttribute("target", "_blank");


//       const image = document.createElement("img");
//       image.setAttribute("src", `${recipe.recipe.image}`);
//       link.innerText = "Link to Recipe";


    
//       h1.innerText = `${recipe.recipe.label}`;
//       card.append(h1);
//       if (recipe.recipe.image !== null) {
//         card.append(image);
//       }
//       recipe.recipe.cuisineType.forEach(type => {
//         h2.innerText = `Cuisine: ${type}`;
//        card.append(h2)
//       })
//       recipe.recipe.ingredients.forEach(ingredient => {
//         const li = document.createElement("li")
//         li.innerText = `${ingredient.text}`
//        ul.append(li)
//       })
//       card.append(ul)
//       card.append(link);

//       mainDiv.append(card)

// })
// }


// fetchRecipes("pork", "chiles");