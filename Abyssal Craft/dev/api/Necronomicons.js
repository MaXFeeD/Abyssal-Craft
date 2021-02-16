const Necronomicons = {
    books: {},
    /**@param {number} id @param {number} maxPE */
    setNecronomicon: function(id, maxPE){
        this.books[id] = { init: true, maxPE: maxPE };
    },
    /**@param {number} id */
    isNecronomicon: function(id){
        return this.books[id].init;
    },
    /**@param {number} id */
    getMaxPEFor: function(id){
        return this.books[id].maxPE;
    },
    /**@param {ItemInstance} itemstack */
    getPEInItem: function(itemstack){
        if(this.isNecronomicon(itemstack.id)){
            return itemstack.extra.getInt("ACPotentialEnergy");
        } else return Logger.Log("Item that was put in \'Necronomicons.getPEInItem\' method, is not a necronomicon!", "AbyssAPI ERROR");
    },
    /**@param {ItemInstance} itemstack @param {number} pe @returns {boolean} */
    increasePEInItem: function(itemstack, pe){
        if(this.isNecronomicon(itemstack.id)){
            let max = this.getMaxPEFor(itemstack.id);
            item.extra.putInt("ACPotentialEnergy", Math.min(max, itemstack.extra.getInt("ACPotentialEnergy") + pe));
            return true;
        } else {
            Logger.Log("Item that was put in \'Necronomicons.increasePEInItem\' method, is not a necronomicon!", "AbyssAPI ERROR");
            return false;
        }
    },
    /**@param {ItemInstance} itemstack @param {number} pe @returns {boolean} */
    decreasePEInItem: function(itemstack, pe){
        if(this.isNecronomicon(itemstack.id)){
            let stored = itemstack.extra.getInt("ACPotentialEnergy");
            if(stored - pe < 0) return false;
            itemstack.extra.putInt("ACPotentialEnergy", stored - pe);
            return true;
        } else {
            Logger.Log("Item that was put in \'Necronomicons.decreasePEInItem\' method, is not a necronomicon!", "AbyssAPI ERROR");
            return false;
        } 
    }
}