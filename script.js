// TODO#1 : read the searchbox text and show the item if found else show an messsgae
// saying " Item not found"
let apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
let searchBox = document.getElementById("searchbox");
let searchBtn = document.getElementById("searchbtn");
let recipeCardStack = document.getElementById("recepies-stack");
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
}
function notFoundMess(){
	let message = `
		<div class = "notfound">
		<h1> RECIPE NOT FOUND!</h1>
		<img src = "https://www.nicepng.com/png/detail/317-3174344_decorar-paredes-cocina-chef-chef-hat-chef-vector.png">
		</div>
	`;
	recipeCardStack.style.gridTemplateColumns =
		"1fr";
	// no need to clear the view, change the innerHTML with message
	recipeCardStack.innerHTML = message;
}
function parseData(data){
	let mealName, mealPic, mealId;
	if(data.meals == null){
		notFoundMess();
	}
	else{
		// clearing the view
		recipeCardStack.innerHTML = "";
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
		.then(data => parseData(data));
}
searchBtn.addEventListener("click", searchItem);
