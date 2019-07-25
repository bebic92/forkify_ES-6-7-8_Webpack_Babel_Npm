import {elements} from './baseView';

export const getSearchInput = () => elements.searchInput.value;

export const clearSearchInput = () => {

    elements.searchInput.value = '';

};

export const clearRecipesList = () => {
    
    elements.recipeList.innerHTML = '';

};

export const clearButtons = () => {
    
    elements.recipeListBtnContainer.innerHTML = '';

};

export const highlightRecipeOnList = id => {
    
    Array.from(document.querySelectorAll('.results__link')).forEach(el => {
        el.classList.remove('results__link--active');
    });

    document.querySelector(`a[href="#${id}"]`).classList.add('results__link--active');

};

export const showRecipes = (recipes, page = 1, recPerPage = 10) => {
    
    const start = (page - 1) * recPerPage;
    const end = recPerPage * page;
    const numOfPages = Math.ceil(recipes.length / recPerPage);
    
    recipes.slice(start, end).forEach(showRecipe);
    
    let button;
    if(page === 1){
        // show next button
        button = showButton(page, 'next');
    }else if(page > 1 && page < numOfPages){
        // show both buttons
        button = `
            ${showButton(page, 'next')}
            ${showButton(page, 'prev')}
        `;
    }else if(page === numOfPages){
        // show previus button
        button = showButton(page, 'prev');
    }
    elements.recipeListBtnContainer.insertAdjacentHTML("afterbegin", button);
};

const showRecipe = recipe => {
    
    const markup = 
    ` <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li> `

    elements.recipeList.insertAdjacentHTML("beforeend", markup);
};

const limitRecipeTitle = ((title, limit = 17) => {
    if(title.length > limit){
    const newTitle = [];
        title.split(" ").reduce((acc, value) => {
            if(acc + value.length <= limit){
                newTitle.push(value);
                return acc + value.length;
            }
        }, 0)
        return `${newTitle.join(" ")}...`;
    }
    return title;
});

const showButton = (page, type) =>  {
    
    if(type === 'next'){

        return ` <button class="btn-inline results__btn--${type}" data-goto=${page + 1}>
            <span>Page ${page + 1}</span>
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
                </svg>
            </button> `

    }
    
    return ` <button class="btn-inline results__btn--${type}" data-goto=${page - 1}>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    <span>Page ${page - 1}</span>
    </button> `

}
