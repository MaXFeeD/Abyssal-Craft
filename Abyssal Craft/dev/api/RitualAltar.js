const RitualAltar = {
    Crafts: [],
    AltarParticles: Particles.registerParticleType({
        texture: "AltarParticle",
        size: [.6, 1],
        lifetime: [35, 35],
        render: 2
    }),
    PillarParticles: Particles.registerParticleType({
        texture: "AltarParticle",
        size: [.4, .8],
        lifetime: [12, 12],
        render: 2
    }),
    /**
     * @param {Vector} altarCoords 
     * @param {Vector} pillarCoords 
     * @param {TileEntity} tile 
     * @param {number} particleType 
     * @param {number} interval 
     * @param {number} repeats 
     * @param {Function} endFunc 
     * @param {number} currentRepeat 
     * @param {BlockSource} region 
     */
    particles: function(altarCoords, pillarCoords, tile, particleType, interval, repeats, endFunc, currentRepeat, region){
        currentRepeat = currentRepeat || 1;
        if(region.getBlockId(pillarCoords.x, pillarCoords.y, pillarCoords.z) == 0 || 
            tile.container.getSlot("slot").id == 0 || region.getBlockId(altarCoords.x, altarCoords.y, altarCoords.z) == 0 ||
            TileEntity.getTileEntity(altarCoords.x, altarCoords.y, altarCoords.z).container.getSlot("slot").id == 0) return;
        if(currentRepeat > repeats){
            if(tile.container.getSlot("slot").count == 1){
                tile.container.setSlot("slot", 0, 0, 0);
                tile.container.sendChanges();
            } else {
                let s = tile.container.getSlot("slot");
                tile.container.setSlot("slot", s.id, s.count - 1, s.data, s.extra);
                tile.container.sendChanges();
            }
            setTimeout(function(){endFunc()}, 40);
            return;
        }
        let clientlist = new NetworkConnectedClientList(false);
        clientlist.setupAllInDimensionPolicy(region.getDimension(), 1000);
        clientlist.send("abyssal.altarParticles", {
            particleType: particleType,
            altarCoords: altarCoords,
            pillarCoords: pillarCoords
        });
        setTimeout(function(){
            RitualAltar.particles(altarCoords, pillarCoords, tile, particleType, interval, repeats, endFunc, currentRepeat + 1);
        }, interval);
    },
    /**
     * @param {[number, number][]} pillars 
     * @param {number} i 
     * @param {TileEntity} tileAltar 
     * @param {number} dimension 
     * @param {Function} endFunc 
     */
    asd: function(pillars, i, tileAltar, dimension, endFunc){
        tileAltar.data.step.i = 1;
        if(i >= pillars.length) return endFunc();
        let region = BlockSource.getDefaultForDimension(dimension);
        let tile = TileEntity.getTileEntity(pillars[i][0], tileAltar.y, pillars[i][1], region);
        if(tile && tile.container.getSlot("slot").id != 0){
            this.particles({
                x: tileAltar.x, y: tileAltar.y, z: tileAltar.z
            }, {x: pillars[i][0], y: tileAltar.y, z: pillars[i][1]}, tile, "slot", this.AltarParticles, 3, 40, function(){
                RitualAltar.asd(pillars, i + 1, tileAltar, dimension, endFunc);
            });
        } else tileAltar.data.step = null;
    },
    /**
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     * @param {BlockSource} world 
     */
    pillarParticles: function(x, y, z, world){
        let bonus_coords = [
            [1 / 4, 1 / 4],
            [13 / 16, 1 / 4],
            [1 / 4, 13 / 16],
            [3 / 4, 3 / 4]
        ];
        let clientList = new NetworkConnectedClientList(false);
        clientList.setupAllInDimensionPolicy(world.getDimension(), 1000);
        clientList.send("abyssal.pillarParticles", {
            bonus_coords: bonus_coords,
            x: x, y: y, z: z
        });
    },
    /**
     * @param {[number, number][]} items 
     * @param {[number, number]} targetItem 
     * @param {[number, number]} result 
     * @param {number[]} recipeviewer_order 
     * @param {number} requiredPE 
     */
    addCraft: function(items, targetItem, result, recipeviewer_order, requiredPE){
        if(recipeviewer_order && recipeviewer_order.length != 16) recipeviewer_order = null;
        this.Crafts.push({
            items: items, centre: targetItem,
            result: result, rv: recipeviewer_order,
            requiredPE: requiredPE
        });
    },
    /**
     * @param {[number, number]} item 
     */
    removeCraft: function(item){
        this.Crafts.splice(this.Crafts.find(function(element, index, array){
            if(element.result[0] == item[0] && element.result[1] == item[1]) return index;
        }), 1);
    },
    /**
     * @param {[number, number]} item 
     */
    getCraft: function(item){
        return this.Crafts.find(function(element, index, array){
            if(element.result[0] == item[0] && (element.result[1] == item[1] || item[1] == -1)) return element;
        });
    },
    /**
     * @param {[number, number]} item 
     */
    getCrafts: function(item){
        let listCrafts = [];
        this.Crafts.find(function(element, index, array){
            if(element.result[0] == item[0] && (element.result[1] == item[1] || item[1] == -1)) listCrafts.push(element);
        });
        return listCrafts;
    }
}

Network.addClientPacket("abyssal.altarParticles", function(packetData){
    let particleType = packetData.particleType,
        altarCoords = packetData.altarCoords,
        pillarCoords = packetData.pillarCoords;
    for(let i=0.1; i<Math.random()/2; i+=0.1){
        let emitter = new Particles.ParticleEmitter(pillarCoords.x + 0.5 + Math.random() / 5,
                                                    pillarCoords.y + 0.75 + Math.random() / 5, 
                                                    pillarCoords.z + 0.5 + Math.random() / 5);
        emitter.setEmitRelatively(true);
        emitter.emit(particleType, 0, 0, 0, 0, 0, 0, 0, 
                    (altarCoords.x - pillarCoords.x) / 40 / 20, 
                    (altarCoords.y - pillarCoords.y) / 40 / 20, 
                    (altarCoords.z - pillarCoords.z) / 40 / 20);
    }
});
Network.addClientPacket("abyssal.pillarParticles", function(packetData){
    let bonus_coords = packetData.bonus_coords,
        x = packetData.x, y = packetData.y, z = packetData.z;
    for(let i in bonus_coords){
        let coord = bonus_coords[i];
        let emitter = new Particles.ParticleEmitter(x + coord[0], y + 7 / 8, z + coord[1]);
        emitter.setEmitRelatively(true);
        emitter.emit(RitualAltar.PillarParticles, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
});