import axios from 'axios';

export default class Search {

    constructor(query) {

        this.query = query;

    }

    async getRecipes() {

        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const key = '7aeedc59fbff1bd4886d7b0484024884';
        try {
        
            const data = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.recipes = data.data.recipes;
            // console.log(this.recipes);
        
        }catch (error){
            
            console.log(error);
        
        }
    }
}


