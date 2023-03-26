const searchForm = document.getElementById('searchForm');
const randomBtn = document.getElementById('random-btn');
const searchInput = document.getElementById('search');
const singleMealEl = document.getElementById('single_container');
const resultMealEl = document.getElementById('result_container');
const mealsEl = document.getElementById('meals_container');
const spinnerContainer = document.getElementById('spinerContainer');
let isLoading = false;

function updateLoaderVisibility() {
    if (isLoading) {
        spinnerContainer.classList.add('show');
    } else {
        spinnerContainer.classList.remove('show');
    }
}

function getAllMeal(ev) {
    ev.preventDefault();

    isLoading = true;
    updateLoaderVisibility();

    singleMealEl.innerHTML = '';

    const tmp = searchInput.value?.trim();

    if (tmp) {
        searchInput.value = '';

        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${tmp}`)
            .then(res => res.json())
            .then(data => {
                isLoading = false;
                updateLoaderVisibility();
                resultMealEl.innerHTML = `<h2>Search results for '${tmp}':</h2>`;

                if (data.meals === null) {
                    resultMealEl.innerHTML = `<h2>There are no search results. Try again!<h2>`;
                } else {
                    mealsEl.innerHTML = data.meals
                        .map(meal => `<div class='meal'>
                                <img src='${meal.strMealThumb}' alt='${meal.strMeal}'/>
                                <div class='meal-info' data-mealID='${meal.idMeal}'>
                                    <h3>${meal.strMeal}</h3>
                                </div>
                            </div>
                        `).join('');
                }
            });
    } else {
        alert("Please enter a search term");
        isLoading = false;
        updateLoaderVisibility();
        searchInput.value = '';
    }
}

function getRandomMeal() {
    mealsEl.innerHTML = '';
    resultMealEl.innerHTML = '';

    isLoading = true;
    updateLoaderVisibility();

    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0];
            renderDOMEl(meal);
            isLoading = false;
            updateLoaderVisibility();
        })
}

function renderDOMEl(meal) {
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(
                `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
            );
        } else {
            break;
        }
    }

    singleMealEl.innerHTML = `
        <div class="single-meal">
            <h1>${meal.strMeal}</h1>
            <img src='${meal.strMealThumb}' alt='${meal.strMeal}' />
            <div class='single-meal-info'>
                ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
                ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
            </div>
            <div class='main'>
                <p>${meal.strInstructions}</p>
                <h2>Ingredients</h2>
                <ul>
                    ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
                </ul>
            </div>
        </div>
    `
}

function setUpEventListener() {
    randomBtn.addEventListener('click', getRandomMeal);
    searchForm.addEventListener('submit', getAllMeal);
}

setUpEventListener();