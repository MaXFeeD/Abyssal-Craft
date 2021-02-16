const UniqueGen = {
    /**
     * @param {java.util.Random} random 
     * @param {number} chunkX 
     * @param {number} chunkZ 
     * @param {number} minHeight 
     * @param {number} maxHeight 
     * @returns {Vector}
     */
    randomCoords: function(random, chunkX, chunkZ, minHeight, maxHeight){
        minHeight = minHeight || 0;
        maxHeight = maxHeight || 128;
        return {
            x: chunkX * 16 + random.nextInt(16),
            y: random.nextInt(maxHeight - minHeight + 1) - minHeight,
            z: z = chunkZ * 16 + random.nextInt(16)
        }
    },
    /**
     * @param {number} id 
     * @param {number} data 
     * @param {number} chunkX 
     * @param {number} chunkZ 
     * @param {java.util.Random} random 
     * @param {object} params
     * @returns {void}
     */
    generateOre: function(id, data, chunkX, chunkZ, random, params){
        for(let i=0; i<params.veinCounts; i++){
            let coords = this.randomCoords(random, chunkX, chunkZ, params.minY, params.maxY);
            GenerationUtils.generateOre(coords.x, coords.y, coords.z, id, data, params.size, false, random.nextInt());
        }
    },
    /**
     * @param {number} id 
     * @param {number} data 
     * @param {number} chunkX 
     * @param {number} chunkZ 
     * @param {java.util.Random} random 
     * @param {object} params 
     * @returns {void}
     */
    generateOreInDimension: function(id, data, chunkX, chunkZ, random, params){
        for(let i=0; i<params.veinCounts; i++){
            let coords = this.randomCoords(random, chunkX, chunkZ, params.minY, params.maxY);
            GenerationUtils.generateOreCustom(coords.x, coords.y, coords.z, id, data, params.size, params.mode, params.check);
        }
    }
}