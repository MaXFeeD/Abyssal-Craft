const Crystallizer = {
    recipes: [],
    fuel: {},
    /**@param {number} id @param {number} ticks */
    addFuel: function(id, ticks){
        this.fuel[id] = ticks;
    },
    /**@param {[number, number][]} fuels */
    addFuels: function(fuels){
        for(let i in fuels){
            this.addFuel(fuels[i][0], fuels[i][1]);
        }
    },
    /**@param {number} id @returns {number} */
    isValidFuel: function(id){
        return this.fuel[id] || -1;
    },
    /**
     * @param {[number, number]} src
     * @param {[number, number, number][]} result
     * @param {number} exp
     */
    addRecipe: function(src, result, exp){
        this.recipes.push({src: src, result: result, exp: exp});
    },
    /**
     * @param {[[number, number], [number, number, number][], number][]} recipes 
     */
    addRecipes: function(recipes){
        for(let i in recipes){
            this.addRecipe(recipes[i][0], recipes[i][1], recipes[i][2]);
        }
    },
    /**
     * @param {ItemInstance | {id: number, data: number}} src
     * @returns {boolean}
     */
    isValidRecipe: function(src){
        return this.recipes.find(function(item){
            return item.src[0] == src.id && item.src[1] == src.data;
        });
    },
    /**
     * @param {ItemInstance | {id: number, data: number}} src
     * @returns {{result: [number, number, number][], exp: number} | number}
     */
    getRecipeResult: function(src){
        return this.recipes.find(function(item){
            if(item.src[0] == src.id && item.src[1] == src.data){
                return {result: item.result, exp: item.exp};
            }
        }) || -1;
    },
    /**
     * @param {ItemInstance | {id: number, data: number}} src 
     */
    deleteRecipe: function(src){
        this.recipes.splice(this.recipes.find(function(item, index){
            if(item.src[0] == src.id && item.src[1] == src.data) return index;
        }), 1);
    }
}