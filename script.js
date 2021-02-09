// TODO#1 : read the searchbox text and show the item if found else show an messsgae
// saying " Item not found"
let apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
let lookUpUrll = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
let searchBox = document.getElementById("searchbox");
let searchBtn = document.getElementById("searchbtn");
let recipeCardStack = document.getElementById("recepies-stack");
let recipeDetails = document.getElementById("recipe-details");

function appendRecipe(mealImage, strMeal){
	let recipeDiv = document.createElement("div");
	recipeDiv.className = "recipe";
	recipeDiv.innerHTML = `
			<div class = "aboutrecipeImg">
				<img src = "${mealImage}" alt= "${strMeal}">
			</div>
			<div class = "aboutRecipe">
				<h1> ${strMeal} </h1>
				<ul class = "list-ingredients">
				</ul>
			</div>
	`
	recipeDetails.append(recipeDiv);

}
function showrecipe(data){
	// parsing ingredients and each of their measurement
	recipeDetails.innerHTML = "";
	appendRecipe(data.meals[0].strMealThumb, data.meals[0].strMeal);
	for (let i = 1; i <= 20; i++){
		let measurement = data.meals[0]["strMeasure"+i];
		let ingredient = data.meals[0]["strIngredient"+i];
		if(ingredient == null || ingredient.length == 0)
			break;
		else{
			let ingredMeasure = measurement + " " + ingredient;
			let listIngredient = document.createElement("li");
			listIngredient.innerHTML = `<i class="fas fa-check-circle"></i>${ingredMeasure}`;
			document.getElementsByClassName("list-ingredients")[0].append(listIngredient);
		}
	}
}
function clickedAction(mealId){
	document.getElementById(mealId).addEventListener("click", function(){
		fetch(`${lookUpUrll}${mealId}`)
			.then(rawdata => rawdata.json())
			.then(data => showrecipe(data))
			.catch(error => notFoundMess("API ERROR!"));
	})
}
function showData(mealName, mealPic, mealId){
	recipeCardStack.style.gridTemplateColumns =
		"repeat(4, 1fr)";
	let mealCard = document.createElement("div");
	mealCard.setAttribute("id", mealId);
	mealCard.setAttribute("class", "recipe-card");
	mealCard.innerHTML = `
		<div class = "recipe-img">
			<img src = "${mealPic}" alt = "${mealName}">
		</div>
		<div class = "recipe-name">
			<h3>${mealName}</h3>
		</div>
	`;
	recipeCardStack.append(mealCard);
	clickedAction(mealId);
}
function notFoundMess(message){
	recipeDetails.innerHTML = "";
	let messageToShow = `
		<div class = "notfound">
		<h1>${message}</h1>
		<img src = "https://www.nicepng.com/png/detail/317-3174344_decorar-paredes-cocina-chef-chef-hat-chef-vector.png">
		</div>
	`;
	recipeCardStack.style.gridTemplateColumns =
		"1fr";
	// no need to clear the view, change the innerHTML with message
	recipeCardStack.innerHTML = messageToShow;
}
function parseData(data){
	let mealName, mealPic, mealId;
	if(data.meals == null){
		notFoundMess("RECIPE NOT FOUND!");
	}
	else{
		// clearing the view
		recipeCardStack.innerHTML = "";
		recipeDetails.innerHTML = "";
		data.meals.forEach(meal => {
			mealName = meal.strMeal;
			mealPic = meal.strMealThumb;
			mealId = meal.idMeal;
			showData(mealName, mealPic, mealId);
		})
	}
}
let searchItem= function(){
	let searchTerm = searchBox.value;
	fetch(`${apiUrl}${searchTerm}`)
		.then(rawdata => rawdata.json())
		.then(data => parseData(data))
		.catch(error => notFoundMess("API ERROR!"));
}
searchBtn.addEventListener("click", searchItem);

