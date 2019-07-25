
// import str from './models/Search';
// import {sum, add} from './views/searchView';
// import searchView from './views/searchView';

// console.log(`${str}, when you sum numbers 5 and 6 you get ${searchView.sum(5,6)}, and when you multiply you get ${searchView.add(5,6)} `);

/*************************************************************************************************************************************************** */
// Global app controller

// API key
// 7aeedc59fbff1bd4886d7b0484024884 
// https://www.food2fork.com/api/search


/**SEARCH CONTROLLER */
/**/ 

import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import {elements, addLoader, removeLoader} from './views/baseView';

const state = {};


const SearchController = async () => {

    const query = searchView.getSearchInput();

    if(query){
        
        state.search = new Search(query);

        searchView.clearSearchInput();

        addLoader(elements.recipeListContainer);
        
        await state.search.getRecipes();
        
        removeLoader();

        searchView.clearRecipesList();

        searchView.showRecipes(state.search.recipes);
    }

}

document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();
    SearchController();
});

elements.recipeListBtnContainer.addEventListener('click', event => {
    const btn = event.target.closest('.btn-inline');
    if(btn){
        let goToPage = parseInt(btn.dataset.goto);
        
        searchView.clearRecipesList();
        searchView.clearButtons();
        searchView.showRecipes(state.search.recipes, goToPage);        
    }

});


/**RECIPE CONTROLLER */
/**/ 

const RecipeController = async () => {

    const id = window.location.hash.replace('#', '');
    
    if(id) {

        state.recipe = new Recipe(id);
    
        try {
            
            addLoader(elements.recipeDetailsContainer);

            await state.recipe.getRecipe();
        
            state.recipe.parseIngredients();
            
            state.recipe.calcCookingTime();
        
            state.recipe.calcServings();
            
            removeLoader();

            recipeView.clearRecipeView();
            
            if(state.search) searchView.highlightRecipeOnList(id);

            recipeView.showRecipe(state.recipe);

        
        } catch(error) {
         
            alert('Something went wrong with geting recipe');
        
        }

    }

}

// window.addEventListener('hashchange', RecipeController);
// window.addEventListener('load', RecipeController);

['hashchange', 'load'].forEach(event => window.addEventListener(event, RecipeController));

elements.recipeDetailsContainer.addEventListener('click', e => {

    if(e.target.matches('.btn-decrease, btn-decrease *')){
    
        if(state.recipe.servings > 1){

            state.recipe.updateServings('dec');
            recipeView.updateCountAndServings(state.recipe);
        }
    
    } else if (e.target.matches('.btn-increase, btn-increase *')){
       
            state.recipe.updateServings('inc');
            recipeView.updateCountAndServings(state.recipe);
    }

});