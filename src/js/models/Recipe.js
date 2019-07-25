import axios from 'axios';
import {proxy, key} from '../../../config';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe(){

        try{
            const res = await axios(`${proxy}https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`)
            this.img = res.data.recipe.image_url;
            this.publisher = res.data.recipe.publisher;
            this.title = res.data.recipe.title;
            this.ingredients = res.data.recipe.ingredients;
            this.url = res.data.recipe.source_url;

        }catch(error){
            alert(error);
        }

    }

    calcCookingTime(){
        const numOfIngredients = this.ingredients.length;
        const preidos = Math.ceil(numOfIngredients / 3);
        this.cookingTime = preidos * 15;
    }

    calcServings() {
        this.servings = 4;
    }

    updateServings(type) {

        const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;

        this.ingredients.forEach(el => {

            el.count *= (newServings / this.servings);
        
        });
        
        this.servings = newServings;
    
    }

    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units = [...unitsShort, 'kg', 'g', 'package'];

        const newIngredients = this.ingredients.map(el => {
        
            let ingredient = el.toLowerCase();
        
            unitsLong.forEach((unit, index) => {
                ingredient = ingredient.replace(unit, unitsShort[0]);
            });

            ingredient.replace(/ *\([^)]*\) */g, ' ');
        
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el2 => units.includes(el2));

            let objIng;

            if(unitIndex > -1){
             
                const arrCount = arrIng.slice(0, unitIndex);

                let count;
                if(arrCount.length === 1){
                    count = eval(arrIng[0].replace('-', '+'));
                } else {
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }

                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                }
            }else if(parseInt(arrIng[0], 10)) {
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }
            }else if (unitIndex === -1) {
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                }
            }
            return objIng;
            
        });
        this.ingredients = newIngredients;
    }
}