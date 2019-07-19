
// import str from './models/Search';
// import {sum, add} from './views/searchView';
// import searchView from './views/searchView';

// console.log(`${str}, when you sum numbers 5 and 6 you get ${searchView.sum(5,6)}, and when you multiply you get ${searchView.add(5,6)} `);

/*************************************************************************************************************************************************** */
// Global app controller

// API key
// 7aeedc59fbff1bd4886d7b0484024884 
// https://www.food2fork.com/api/search

import Search from './models/Search';
import * as searchView from './views/searchView';
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