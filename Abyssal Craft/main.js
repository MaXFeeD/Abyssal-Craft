//IMPORT("dimensions");
IMPORT("SoundAPI");
IMPORT("ToolLib");
IMPORT("TileRender");
IMPORT("BaseBlocks");
IMPORT("Structures");
IMPORT("PortalUtils");
IMPORT("GuideAPI");
IMPORT("TextureWorker");
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var elder_screams = new Sound("cthulhu_3.ogg");
var elder_boss = new Sound("sleeping_2.ogg");
var levelloaded = false;
var searchItem = function (id, data) {
    var dat = data || -1;
    var od = id || -1;
    for (var i = 9; i < 45; i++) {
        var item = Player.getInventorySlot(i);
        if ((item.id == od || (od == -1 && item.id != 0)) && (item.data == dat || dat == -1)) {
            return {
                id: item.id,
                data: item.data,
                extra: item.extra,
                count: item.count,
                slot: i
            };
        }
    }
};
var getPointed = ModAPI.requireGlobal("Player.getPointed");
var setTimeout = function (func, ticks) {
    var upd = {
        ticks: 0,
        update: function () {
            this.ticks++;
            if (this.ticks >= ticks) {
                func();
                this.remove = true;
            }
        }
    };
    Updatable.addUpdatable(upd);
};
var setInterval = function (func, ticks) {
    var upd = {
        ticks: 0,
        update: function () {
            this.ticks++;
            if (this.ticks >= ticks) {
                this.ticks = 0;
                if (func())
                    this.remove = true;
            }
        }
    };
    Updatable.addUpdatable(upd);
    return upd;
};
var clearInterval = function (upd) {
    if (upd && upd == {} && upd.remove) {
        upd.remove = true;
    }
};
Callback.addCallback("LevelLoaded", function () {
    levelloaded = true;
});
Callback.addCallback("LevelLeft", function () {
    levelloaded = false;
});
var items_vanilla = [6, 27, 28, 30, 32, 37, 38, 39, 40, 50, 69, 76, 102, 106, 111, 126, 175, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 355, 356, 357, 358, 359, 360, 361, 362, 363, 364, 365, 366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 472, 473, 474, 475, 476, 477, 478, 479, 480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 495, 496, 497, 498, 499, 500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511];
var blocks_vanilla = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255];
var items_and_blocks_vanilla = items_vanilla.concat(blocks_vanilla);
var all_items = items_vanilla;
var all_blocks = blocks_vanilla;
var all_items_and_blocks;
Callback.addCallback("ModsLoaded", function () {
    for (var i in ItemID) {
        all_items.push(ItemID[i]);
    }
    ;
    for (var i in BlockID) {
        all_blocks.push(BlockID[i]);
    }
    ;
    all_items_and_blocks = all_items.concat(all_blocks);
});
var allParams = function (json, fullParams) {
    if (typeof json != "object")
        return json;
    var params = "{\n";
    for (var key in json) {
        if (fullParams)
            params += key + " : " + allParams(json[key], true) + "\n";
        else
            params += key + " : " + json[key] + "\n";
    }
    params += "}";
    return params;
};
var JSONlength = function (json) {
    var length = 0;
    for (var i in json) {
        length++;
    }
    return length;
};
var setCharAt = function (str, index, chr) {
    if (index > str.length - 1)
        return str;
    return str.substr(0, index) + chr + str.substr(index + chr.length);
};
var Timer = java.util.Timer;
var TimerTask = java.util.TimerTask;
var jSetInterval = function (__fun, __mil) {
    var timer = new Timer();
    var task = new TimerTask({
        run: function () {
            if (__fun())
                timer.cancel();
        }
    });
    timer.scheduleAtFixedRate(task, 0, __mil);
    return timer;
};
var jSetTimeout = function (__fun, __mil) {
    var timer = new Timer();
    var task = new TimerTask({
        run: function () {
            if (__fun())
                timer.cancel();
        }
    });
    timer.schedule(task, __mil);
    return timer;
};
var jClearInterval = function (__interval) {
    if (__interval && __interval.cancel)
        __interval.cancel();
};
var sides = [
    [1, 0, 0],
    [-1, 0, 0],
    [0, 0, 1],
    [0, 0, -1],
    [0, 1, 0],
    [0, -1, 0]
];
var onCallbacks = {};
function onCallback(name, func) {
    if (!onCallbacks[name]) {
        onCallbacks[name] = [];
        Callback.addCallback(name, function (a, b, c, d, e, f, g, h) {
            for (var i in onCallbacks[name]) {
                var res = onCallbacks[name][i](a, b, c, d, e, f, g, h);
                if (res == "delete")
                    onCallbacks[name].splice(i, 1);
            }
        });
    }
    onCallbacks[name].push(func);
}
function toChemicalFormule(str) {
    str = str.split("");
    var newStr = "";
    for (var i in str) {
        var s = str[i];
        if (!isNaN(Number(s))) {
            newStr += s.sub();
        }
        else
            newStr += s;
    }
    return newStr;
}
/**@param {number} id @param {number} count @param {number} data @param {string[]} mask @param {(string | number)[]} keys */
function addShapedRecipe(id, count, data, mask, keys) {
    Recipes.addShaped({ id: id, count: count, data: data }, mask, keys);
}
/**@param {number} id @param {number} count @param {number} data @param {[number, number][]} items */
function addShapelessRecipe(id, count, data, items) {
    var ingredients = [];
    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
        var item = items_1[_i];
        ingredients.push({ id: item[0], data: item[1] });
    }
    Recipes.addShapeless({ id: id, count: count, data: data }, ingredients);
}
var UniqueGen = {
    /**
     * @param {java.util.Random} random
     * @param {number} chunkX
     * @param {number} chunkZ
     * @param {number} minHeight
     * @param {number} maxHeight
     * @returns {Vector}
     */
    randomCoords: function (random, chunkX, chunkZ, minHeight, maxHeight) {
        minHeight = minHeight || 0;
        maxHeight = maxHeight || 128;
        return {
            x: chunkX * 16 + random.nextInt(16),
            y: random.nextInt(maxHeight - minHeight + 1) - minHeight,
            z: z = chunkZ * 16 + random.nextInt(16)
        };
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
    generateOre: function (id, data, chunkX, chunkZ, random, params) {
        for (var i = 0; i < params.veinCounts; i++) {
            var coords = this.randomCoords(random, chunkX, chunkZ, params.minY, params.maxY);
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
    generateOreInDimension: function (id, data, chunkX, chunkZ, random, params) {
        for (var i = 0; i < params.veinCounts; i++) {
            var coords = this.randomCoords(random, chunkX, chunkZ, params.minY, params.maxY);
            GenerationUtils.generateOreCustom(coords.x, coords.y, coords.z, id, data, params.size, params.mode, params.check);
        }
    }
};
var Machine = {
    /**
     * @param {number} id
     * @param {TileEntity.TileEntityPrototype} Prototype
     */
    init: function (id, Prototype) {
        if (Prototype.defaultValues && Prototype.defaultValues.isActive !== undefined) {
            if (!Prototype.renderModel) {
                Prototype.renderModel = function () {
                    TileRenderer.mapAtCoords(this.x, this.y, this.z, this.blockID, this.data.meta + (this.data.isActive ? 4 : 0));
                };
            }
            Prototype.setActive = Prototype.setActive || function (isActive) {
                if (this.data.isActive != isActive) {
                    this.data.isActive = isActive;
                    if (this.data.isActive) {
                        TileRenderer.mapAtCoords(this.x, this.y, this.z, this.blockID, 0);
                    }
                    else
                        TileRenderer.unmapAtCoords(this.x, this.y, this.z);
                }
            };
            Prototype.activate = Prototype.activate || function () {
                this.setActive(true);
            };
            Prototype.deactivate = Prototype.deactivate || function () {
                this.setActive(false);
            };
            Prototype.destroy = Prototype.destroy || function () {
                TileRenderer.unmapAtCoords(this.x, this.y, this.z);
            };
        }
        if (!Prototype.init && Prototype.renderModel) {
            Prototype.init = Prototype.renderModel;
        }
        TileEntity.registerPrototype(id, Prototype);
    }
};
var Necronomicons = {
    books: {},
    /**@param {number} id @param {number} maxPE */
    setNecronomicon: function (id, maxPE) {
        this.books[id] = { init: true, maxPE: maxPE };
    },
    /**@param {number} id */
    isNecronomicon: function (id) {
        return this.books[id].init;
    },
    /**@param {number} id */
    getMaxPEFor: function (id) {
        return this.books[id].maxPE;
    },
    /**@param {ItemInstance} itemstack */
    getPEInItem: function (itemstack) {
        if (this.isNecronomicon(itemstack.id)) {
            return itemstack.extra.getInt("ACPotentialEnergy");
        }
        else
            return Logger.Log("Item that was put in \'Necronomicons.getPEInItem\' method, is not a necronomicon!", "AbyssAPI ERROR");
    },
    /**@param {ItemInstance} itemstack @param {number} pe @returns {boolean} */
    increasePEInItem: function (itemstack, pe) {
        if (this.isNecronomicon(itemstack.id)) {
            var max = this.getMaxPEFor(itemstack.id);
            item.extra.putInt("ACPotentialEnergy", Math.min(max, itemstack.extra.getInt("ACPotentialEnergy") + pe));
            return true;
        }
        else {
            Logger.Log("Item that was put in \'Necronomicons.increasePEInItem\' method, is not a necronomicon!", "AbyssAPI ERROR");
            return false;
        }
    },
    /**@param {ItemInstance} itemstack @param {number} pe @returns {boolean} */
    decreasePEInItem: function (itemstack, pe) {
        if (this.isNecronomicon(itemstack.id)) {
            var stored = itemstack.extra.getInt("ACPotentialEnergy");
            if (stored - pe < 0)
                return false;
            itemstack.extra.putInt("ACPotentialEnergy", stored - pe);
            return true;
        }
        else {
            Logger.Log("Item that was put in \'Necronomicons.decreasePEInItem\' method, is not a necronomicon!", "AbyssAPI ERROR");
            return false;
        }
    }
};
var RitualAltar = {
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
    particles: function (altarCoords, pillarCoords, tile, particleType, interval, repeats, endFunc, currentRepeat, region) {
        currentRepeat = currentRepeat || 1;
        if (region.getBlockId(pillarCoords.x, pillarCoords.y, pillarCoords.z) == 0 ||
            tile.container.getSlot("slot").id == 0 || region.getBlockId(altarCoords.x, altarCoords.y, altarCoords.z) == 0 ||
            TileEntity.getTileEntity(altarCoords.x, altarCoords.y, altarCoords.z).container.getSlot("slot").id == 0)
            return;
        if (currentRepeat > repeats) {
            if (tile.container.getSlot("slot").count == 1) {
                tile.container.setSlot("slot", 0, 0, 0);
                tile.container.sendChanges();
            }
            else {
                var s = tile.container.getSlot("slot");
                tile.container.setSlot("slot", s.id, s.count - 1, s.data, s.extra);
                tile.container.sendChanges();
            }
            setTimeout(function () { endFunc(); }, 40);
            return;
        }
        var clientlist = new NetworkConnectedClientList(false);
        clientlist.setupAllInDimensionPolicy(region.getDimension(), 1000);
        clientlist.send("abyssal.altarParticles", {
            particleType: particleType,
            altarCoords: altarCoords,
            pillarCoords: pillarCoords
        });
        setTimeout(function () {
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
    asd: function (pillars, i, tileAltar, dimension, endFunc) {
        tileAltar.data.step.i = 1;
        if (i >= pillars.length)
            return endFunc();
        var region = BlockSource.getDefaultForDimension(dimension);
        var tile = TileEntity.getTileEntity(pillars[i][0], tileAltar.y, pillars[i][1], region);
        if (tile && tile.container.getSlot("slot").id != 0) {
            this.particles({
                x: tileAltar.x, y: tileAltar.y, z: tileAltar.z
            }, { x: pillars[i][0], y: tileAltar.y, z: pillars[i][1] }, tile, "slot", this.AltarParticles, 3, 40, function () {
                RitualAltar.asd(pillars, i + 1, tileAltar, dimension, endFunc);
            });
        }
        else
            tileAltar.data.step = null;
    },
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @param {BlockSource} world
     */
    pillarParticles: function (x, y, z, world) {
        var bonus_coords = [
            [1 / 4, 1 / 4],
            [13 / 16, 1 / 4],
            [1 / 4, 13 / 16],
            [3 / 4, 3 / 4]
        ];
        var clientList = new NetworkConnectedClientList(false);
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
    addCraft: function (items, targetItem, result, recipeviewer_order, requiredPE) {
        if (recipeviewer_order && recipeviewer_order.length != 16)
            recipeviewer_order = null;
        this.Crafts.push({
            items: items, centre: targetItem,
            result: result, rv: recipeviewer_order,
            requiredPE: requiredPE
        });
    },
    /**
     * @param {[number, number]} item
     */
    removeCraft: function (item) {
        this.Crafts.splice(this.Crafts.find(function (element, index, array) {
            if (element.result[0] == item[0] && element.result[1] == item[1])
                return index;
        }), 1);
    },
    /**
     * @param {[number, number]} item
     */
    getCraft: function (item) {
        return this.Crafts.find(function (element, index, array) {
            if (element.result[0] == item[0] && (element.result[1] == item[1] || item[1] == -1))
                return element;
        });
    },
    /**
     * @param {[number, number]} item
     */
    getCrafts: function (item) {
        var listCrafts = [];
        this.Crafts.find(function (element, index, array) {
            if (element.result[0] == item[0] && (element.result[1] == item[1] || item[1] == -1))
                listCrafts.push(element);
        });
        return listCrafts;
    }
};
Network.addClientPacket("abyssal.altarParticles", function (packetData) {
    var particleType = packetData.particleType, altarCoords = packetData.altarCoords, pillarCoords = packetData.pillarCoords;
    for (var i = 0.1; i < Math.random() / 2; i += 0.1) {
        var emitter = new Particles.ParticleEmitter(pillarCoords.x + 0.5 + Math.random() / 5, pillarCoords.y + 0.75 + Math.random() / 5, pillarCoords.z + 0.5 + Math.random() / 5);
        emitter.setEmitRelatively(true);
        emitter.emit(particleType, 0, 0, 0, 0, 0, 0, 0, (altarCoords.x - pillarCoords.x) / 40 / 20, (altarCoords.y - pillarCoords.y) / 40 / 20, (altarCoords.z - pillarCoords.z) / 40 / 20);
    }
});
Network.addClientPacket("abyssal.pillarParticles", function (packetData) {
    var bonus_coords = packetData.bonus_coords, x = packetData.x, y = packetData.y, z = packetData.z;
    for (var i in bonus_coords) {
        var coord = bonus_coords[i];
        var emitter = new Particles.ParticleEmitter(x + coord[0], y + 7 / 8, z + coord[1]);
        emitter.setEmitRelatively(true);
        emitter.emit(RitualAltar.PillarParticles, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
});
var Crystallizer = {
    recipes: [],
    fuel: {},
    /**@param {number} id @param {number} ticks */
    addFuel: function (id, ticks) {
        this.fuel[id] = ticks;
    },
    /**@param {[number, number][]} fuels */
    addFuels: function (fuels) {
        for (var i in fuels) {
            this.addFuel(fuels[i][0], fuels[i][1]);
        }
    },
    /**@param {number} id @returns {number} */
    isValidFuel: function (id) {
        return this.fuel[id] || -1;
    },
    /**
     * @param {[number, number]} src
     * @param {[number, number, number][]} result
     * @param {number} exp
     */
    addRecipe: function (src, result, exp) {
        this.recipes.push({ src: src, result: result, exp: exp });
    },
    /**
     * @param {[[number, number], [number, number, number][], number][]} recipes
     */
    addRecipes: function (recipes) {
        for (var i in recipes) {
            this.addRecipe(recipes[i][0], recipes[i][1], recipes[i][2]);
        }
    },
    /**
     * @param {ItemInstance | {id: number, data: number}} src
     * @returns {boolean}
     */
    isValidRecipe: function (src) {
        return this.recipes.find(function (item) {
            return item.src[0] == src.id && item.src[1] == src.data;
        });
    },
    /**
     * @param {ItemInstance | {id: number, data: number}} src
     * @returns {{result: [number, number, number][], exp: number} | number}
     */
    getRecipeResult: function (src) {
        return this.recipes.find(function (item) {
            if (item.src[0] == src.id && item.src[1] == src.data) {
                return { result: item.result, exp: item.exp };
            }
        }) || -1;
    },
    /**
     * @param {ItemInstance | {id: number, data: number}} src
     */
    deleteRecipe: function (src) {
        this.recipes.splice(this.recipes.find(function (item, index) {
            if (item.src[0] == src.id && item.src[1] == src.data)
                return index;
        }), 1);
    }
};
var BLOCK_TYPE_STONE = Block.createSpecialType({
    base: 1,
    solid: true,
    renderlayer: 2,
    explosionres: 15,
    lightopacity: 15,
    destroytime: 2,
    translucency: 0
});
var BLOCK_TYPE_GRASS = Block.createSpecialType({
    base: 3,
    solid: true,
    renderlayer: 2,
    explosionres: 4,
    destroytime: 1.25,
    translucency: 0,
    sound: "grass"
});
var BLOCK_TYPE_LIGHT = Block.createSpecialType({
    lightlevel: 6,
    explosionres: 2,
    lightopacity: 15
});
var BLOCK_TYPE_GLASS = Block.createSpecialType({
    lightopacity: 2,
    destroytime: 0.5,
    renderlayer: 1,
    sound: "glass"
});
var BLOCK_TYPE_ORE = Block.createSpecialType({
    base: 1,
    solid: true,
    destroytime: 5,
    renderlayer: 2,
    explosionres: 15,
    lightopacity: 15,
    translucency: 0
});
var BLOCK_TYPE_UNI = Block.createSpecialType({
    destroytime: 5,
    explosionres: 5,
    solid: true,
    lightopacity: 15,
    translucency: 0
});
var BLOCK_TYPE_FENCE_WOOD = Block.createSpecialType({
    destroytime: 3,
    lightopacity: 1,
    renderlayer: 2,
    rendertype: 11,
    translucency: 0.5,
    sound: "wood"
});
var BLOCK_TYPE_FENCE = Block.createSpecialType({
    destroytime: 3,
    lightopacity: 1,
    renderlayer: 2,
    rendertype: 11,
    translucency: 0.5
});
var BLOCK_TYPE_WALL = Block.createSpecialType({
    destroytime: 3,
    lightopacity: 1,
    renderlayer: 2,
    rendertype: 32,
    translucency: 0.5
});
var BLOCK_TYPE_SLAB_WOOD = Block.createSpecialType({
    solid: false,
    renderlayer: 2,
    explosionres: 16,
    lightopacity: 1,
    translucency: 0,
    sound: "wood"
});
var BLOCK_TYPE_SLAB = Block.createSpecialType({
    solid: false,
    renderlayer: 2,
    explosionres: 16,
    lightopacity: 1,
    translucency: 0
});
var BLOCK_TYPE_SAND = Block.createSpecialType({
    base: 3,
    solid: true,
    renderlayer: 2,
    explosionres: 4,
    destroytime: 1.25,
    translucency: 0,
    sound: "sand"
});
var BLOCK_TYPE_LEAVES = Block.createSpecialType({
    base: 18,
    destroytime: 0.2,
    explosionres: 1,
    renderallfaces: true,
    renderlayer: 1,
    lightopacity: 1,
    translucency: 0.5,
    sound: "grass"
});
var BLOCK_TYPE_PLANT = Block.createSpecialType({
    base: 18,
    destroytime: 0.1,
    explosionres: 1,
    renderlayer: 1,
    lightopacity: 1,
    translucency: 0.5,
    sound: "grass"
});
var BLOCK_TYPE_WOOD = Block.createSpecialType({
    solid: true,
    renderlayer: 2,
    explosionres: 8,
    translucency: 0,
    sound: "wood"
});
// var darkN = new Structure("DarkT1");
// var darkC = new Structure("DarkT2");
//=======================
// Trees rework by vsdum
//=======================
//LOGS
(function () {
    var constructVariationsSet = function (name, top, side) {
        return [
            { name: name, texture: [[top, 0], [top, 0], [side, 0]], inCreative: true },
            { name: name, texture: [[side, 0], [side, 0], [top, 0], [top, 0], [side, 1]], inCreative: false },
            { name: name, texture: [[side, 1], [side, 1], [side, 1], [side, 1], [top, 0]], inCreative: false }
        ];
    };
    var makeDropFunction = function (id) {
        Block.registerDropFunction(id, function (coords, blockID, blockData, level, enchant, item, region) {
            return [[blockID, 1, 0]];
        });
    };
    var makePlaceFunction = function (id) {
        Block.registerPlaceFunction(id, function (coords, item, block, player, region) {
            var r = coords.relative;
            switch (coords.side) {
                case 0:
                case 1:
                    region.setBlock(r.x, r.y, r.z, id, 0);
                    break;
                case 2:
                case 3:
                    region.setBlock(r.x, r.y, r.z, id, 1);
                    break;
                case 4:
                case 5:
                    region.setBlock(r.x, r.y, r.z, id, 2);
                    break;
            }
        });
    };
    (function (ids) {
        for (var i in ids) {
            var block = ids[i];
            var bid = block[0], name = block[1], topt = block[2], sidet = block[3];
            IDRegistry.genBlockID(bid);
            Block.createBlock(bid, constructVariationsSet(name, topt, sidet), BLOCK_TYPE_WOOD);
            ToolAPI.registerBlockMaterial(BlockID[bid], "wood", 0, false);
            makeDropFunction(BlockID[bid]);
            makePlaceFunction(BlockID[bid]);
        }
    })([
        ["darklandsOakWood", "Darklands Oak Wood", "darklands_oak_wood_top", "darklands_oak_wood_side"],
        ["darklandsOakWoodGlowing", "Darklands Oak Wood", "darklands_oak_wood_top", "darklands_oak_wood_side_glowing"],
        ["dreadlandsWoodLog", "Dreadlands Wood Log", "dreadlands_wood_log_top", "dreadlands_wood_log_side"]
    ]);
})();
//PLANKS
IDRegistry.genBlockID("darklandsOakWoodPlanks");
IDRegistry.genBlockID("dreadlandsWoodPlanks");
Block.createBlock("darklandsOakWoodPlanks", [
    { name: "Darklands Oak Wood Planks", texture: [["darklands_oak_wood_planks", 0]], inCreative: true }
], BLOCK_TYPE_WOOD);
Block.createBlock("dreadlandsWoodPlanks", [
    { name: "Dreadlands Wood Planks", texture: [["dreadlands_wood_planks", 0]], inCreative: true }
], BLOCK_TYPE_WOOD);
ToolAPI.registerBlockMaterial(BlockID.darklandsOakWoodPlanks, "wood", 0, false);
ToolAPI.registerBlockMaterial(BlockID.dreadlandsWoodPlanks, "wood", 0, false);
//SLABS
IDRegistry.genBlockID("darklandsOakWoodSlabDouble");
IDRegistry.genBlockID("darklandsOakWoodSlab");
BaseBlocks.createSlab("darklandsOakWoodSlab", [
    { name: "Darklands Oak Wood Slab", texture: [["darklands_oak_wood_planks", 0]], inCreative: true }
], BlockID.darklandsOakWoodSlabDouble);
BaseBlocks.createDoubleSlab("darklandsOakWoodSlabDouble", [
    { name: "Darklands Oak Wood Slab", texture: [["darklands_oak_wood_planks", 0]], inCreative: false }
], BLOCK_TYPE_WOOD, BlockID.darklandsOakWoodSlab);
ToolAPI.registerBlockMaterial(BlockID.darklandsOakWoodSlab, "wood", 0, false);
ToolAPI.registerBlockMaterial(BlockID.darklandsOakWoodSlabDouble, "wood", 0, false);
//FENCES
IDRegistry.genBlockID("darklandsOakWoodFence");
IDRegistry.genBlockID("dreadlandsWoodFence");
Block.createBlock("darklandsOakWoodFence", [
    { name: "Darklands Oak Wood Fence", texture: [["darklands_oak_wood_planks", 0]], inCreative: true }
], BLOCK_TYPE_FENCE_WOOD);
Block.createBlock("dreadlandsWoodFence", [
    { name: "Dreadlands Wood Fence", texture: [["dreadlands_wood_fence", 0]], inCreative: true }
], BLOCK_TYPE_FENCE_WOOD);
ToolAPI.registerBlockMaterial(BlockID.darklandsOakWoodFence, "wood", 0, false);
ToolAPI.registerBlockMaterial(BlockID.dreadlandsWoodFence, "wood", 0, false);
//LEAVES
IDRegistry.genBlockID("darklandsOakLeaves");
IDRegistry.genBlockID("dreadlandsWoodLeaves");
Block.createBlock("darklandsOakLeaves", [
    { name: "Darklands Oak Leaves", texture: [["darklands_oak_leaves", 0]], inCreative: true }
], BLOCK_TYPE_LEAVES);
Block.createBlock("dreadlandsWoodLeaves", [
    { name: "Dreadlands Wood Leaves", texture: [["dreadlands_wood_leaves", 0]], inCreative: true }
], BLOCK_TYPE_LEAVES);
ToolAPI.registerBlockMaterial(BlockID.darklandsOakLeaves, "plant", 0, false);
ToolAPI.registerBlockMaterial(BlockID.dreadlandsWoodLeaves, "plant", 0, false);
ModAPI.addAPICallback("BetterFoliageLeaves", function (BetterFoliage) {
    BetterFoliage.setupLeavesModel(BlockID.darklandsOakLeaves, -1, ["darklands_oak_leaves", 0]);
    BetterFoliage.setupLeavesModel(BlockID.dreadlandsWoodLeaves, -1, ["dreadlands_wood_leaves", 0]);
});
Block.registerDropFunction(BlockID.darklandsOakLeaves, function (coords, blockID, blockData, level, enchant, item, region) {
    if (Math.random() < .095)
        return [[ItemID.darklandsOakSapling, 1, 0]];
    return [];
});
Block.registerDropFunction(BlockID.dreadlandsWoodLeaves, function (coords, blockID, blockData, level, enchant, item, region) {
    if (Math.random() < .095)
        return [[ItemID.dreadlandsWoodSapling, 1, 0]];
});
//SAPLINGS
IDRegistry.genBlockID("darklandsOakSapling");
IDRegistry.genBlockID("dreadlandsWoodSapling");
Block.createBlock("darklandsOakSapling", [
    { name: "Darklands Oak Sapling", texture: [["darklands_oak_sapling", 0]], inCreative: false }
], BLOCK_TYPE_PLANT);
Block.createBlock("dreadlandsWoodSapling", [
    { name: "Dreadlands Wood Sapling", texture: [["dreadlands_wood_sapling", 0]], inCreative: false }
], BLOCK_TYPE_PLANT);
Block.registerDropFunction(BlockID.darklandsOakSapling, function (coords, blockID, blockData, level, enchant, item, region) {
    return [[ItemID.darklandsOakSapling, 1, 0]];
});
Block.registerDropFunction(BlockID.dreadlandsWoodSapling, function (coords, blockID, blockData, level, enchant, item, region) {
    return [[ItemID.dreadlandsWoodSapling, 1, 0]];
});
IDRegistry.genItemID("darklandsOakSapling");
IDRegistry.genItemID("dreadlandsWoodSapling");
Item.createItem("darklandsOakSapling", "Darklands Oak Sapling", { name: "darklands_oak_sapling", meta: 0 }, { stack: 64 });
Item.createItem("dreadlandsWoodSapling", "Dreadlands Wood Sapling", { name: "dreadlands_wood_sapling", meta: 0 }, { stack: 64 });
ToolAPI.registerBlockMaterial(BlockID.darklandsOakSapling, "plant", 0, false);
ToolAPI.registerBlockMaterial(BlockID.dreadlandsWoodSapling, "plant", 0, false);
TileRenderer.setPlantModel(BlockID.darklandsOakLeaves, 0, "darklands_oak_sapling", 0);
TileRenderer.setPlantModel(BlockID.dreadlandsWoodSapling, 0, "dreadlands_wood_sapling", 0);
Item.registerUseFunction(ItemID.darklandsOakSapling, function (coords, item, block, player) {
    var region = BlockSource.getDefaultForActor(player);
    if (block.id == BlockID.grassDark /**@todo */) {
        region.setBlock(coords.relative.x, coords.relative.y, coords.relative.z, BlockID.darklandsOakSapling, 0);
        Entity.setCarriedItem(player, item.id, item.count - 1, item.data, item.extra);
    }
});
Item.registerUseFunction(ItemID.dreadlandsWoodSapling, function (coords, item, block, player) {
    var region = BlockSource.getDefaultForActor(player);
    if (block.id == BlockID.grassDread /**@todo */) {
        region.setBlock(coords.relative.x, coords.relative.y, coords.relative.z, BlockID.dreadlandsWoodSapling, 0);
        Entity.setCarriedItem(player, item.id, item.count - 1, item.data, item.extra);
    }
});
/**@todo remake tree structures with remade blocks */
// Callback.addCallback("ItemUse",function(coords,item) {
// var players = Network.getConnectedPlayers();
//  for (var i in players) {
//   player = players[i];   
//   let tsu = BlockSource.getDefaultForActor(player);
//    var crd = coords.relative;
//  if (tsu.getBlockId(crd.x,crd.y,crd.z).id == BlockID.darkSapling) {
//    if (item.id == 351 && item.data == 15) {    
//    tsu.destroyBlock(crd.x, crd.y, crd.z, false);
//  darkN.build(crd.x, crd.y + 1, crd.z, Structure.ROTATE_Y, random, tsu); 
// Entity.setCarriedItem(player, id, count - 1, data);
// }
// }
// }});
// Block.setRandomTickCallback(BlockID.darkSapling, function(x, y, z, id, data) {     
// let tsu = BlockSource.getDefaultForActor(client.getPlayerUid());
//  var coords = coords.relative;
//   if(tsu.getBlockId(coords.x, coords.y - 1, coords.z) == BlockID.grassDark) {
//  tsu.destroyBlock(coords.x,coords.y,coords.z,false);                      
// darkC.build(coords.x, coords.y + 1, coords.z, Structure.ROTATE_Y, random, tsu); 
//      }
// });       
// dreadN = new Structure("DreadT1");
// dreadC = new Structure("DreadT2");
// Callback.addCallback("ItemUse",function(coords,item) {
// var players = Network.getConnectedPlayers();
//  for (var i in players) {
//   player = players[i];   
//    let tsu = BlockSource.getDefaultForActor(player);
//     var crd = coords.relative;
//   if (tsu.getBlockId(crd.x,crd.y,crd.z) == BlockID.dreadSapling) {
//  if (item.id == 351 && item.data == 15){    
//   tsu.destroyBlock(crd.x, crd.y, crd.z, false);
//    dreadN.build(coords.x, coords.y + 1, coords.z, Structure.ROTATE_Y, random, tsu); 
// Entity.setCarriedItem(player, id, count - 1, data);
// }
// }
// }});
// Block.setRandomTickCallback(BlockID.dreadSapling, function(x, y, z, id, data) {
//   let tsu = BlockSource.getDefaultForActor(client.getPlayerUid()); 
//    var coords = coords.relative;       
//   if (tsu.getBlockId(coords.x, coords.y - 1, coords.z) == BlockID.grassDread) {
//  tsu.destroyBlock(coords.x,coords.y,coords.z,false);                      
//   dreadC.build(coords.x, coords.y + 1, coords.z, Structure.ROTATE_Y, random, tsu); 
//      }
// });
Callback.addCallback("PostLoaded", function () {
    addShapelessRecipe(BlockID.darklandsOakWoodPlanks, 4, 0, [[BlockID.darklandsOakWood, 0]]);
    Recipes.addFurnace(BlockID.darklandsOakWood, 263, 1);
    Recipes.addFurnaceFuel(BlockID.darklandsOakWood, 0, 300);
    Recipes.addFurnace(BlockID.darklandsOakWoodGlowing, 263, 1);
    Recipes.addFurnaceFuel(BlockID.darklandsOakWoodGlowing, 0, 300);
    addShapelessRecipe(BlockID.dreadlandsWoodPlanks, 4, 0, [[BlockID.dreadlandsWoodLog, 0]]);
    Recipes.addFurnace(BlockID.dreadlandsWoodLog, ItemID.coalD /**@todo */, 0);
    Recipes.addFurnaceFuel(BlockID.dreadlandsWoodLog, 0, 300);
    var arr = [BlockID.darklandsOakWoodPlanks, BlockID.dreadlandsWoodPlanks];
    for (var a in arr) {
        var id = arr[a];
        Recipes.addFurnaceFuel(id, 0, 300);
        for (var i = 0; i < 16; i++) { //bed
            addShapedRecipe(355, 1, i, ["www", "ppp"], ['w', 35, i, 'p', id, 0]);
        } //tools
        addShapedRecipe(268, 1, 0, ["p", "p", "s"], ['p', id, 0, 's', 280, 0]);
        addShapedRecipe(269, 1, 0, ["p", "s", "s"], ['p', id, 0, 's', 280, 0]);
        addShapedRecipe(270, 1, 0, ["ppp", " s ", " s "], ['p', id, 0, 's', 280, 0]);
        addShapedRecipe(271, 1, 0, ["pp ", "ps ", " s "], ['p', id, 0, 's', 280, 0]);
        addShapedRecipe(271, 1, 0, [" pp", " sp", " s "], ['p', id, 0, 's', 280, 0]);
        addShapedRecipe(290, 1, 0, ["pp", " s", " s"], ['p', id, 0, 's', 280, 0]);
        addShapedRecipe(290, 1, 0, ["pp", "s ", "s "], ['p', id, 0, 's', 280, 0]);
        addShapedRecipe(280, 4, 0, ["p", "p"], ['p', id, 0]); //stick
        addShapedRecipe(323, 3, 0, ["ppp", "ppp", " s "], ['p', id, 0, 's', 280, 0]); //sign
        addShapedRecipe(513, 1, 0, ["pip", "ppp", " p "], ['p', id, 0, 'i', 265, 0]); //shield
        addShapedRecipe(33, 1, 0, ["ppp", "cic", "crc"], ['p', id, 0, 'c', 4, 0, 'i', 265, 0, 'r', 331, 0]); //piston
        addShapedRecipe(25, 1, 0, ["ppp", "prp", "ppp"], ['p', id, 0, 'r', 331, 0]); //note block
        addShapedRecipe(84, 1, 0, ["ppp", "pdp", "ppp"], ['p', id, 0, 'd', 264, 0]); //jukebox
        addShapedRecipe(58, 1, 0, ["pp", "pp"], ['p', id, 0]); //crafting table
        addShapedRecipe(54, 1, 0, ["ppp", "p p", "ppp"], ['p', id, 0]); //chest
        addShapedRecipe(281, 4, 0, ["p p", " p "], ['p', id, 0]); //bowl
        addShapedRecipe(47, 1, 0, ["ppp", "bbb", "ppp"], ['p', id, 0, 'b', 340, 0]); //bookshelf
    }
    Recipes.addFurnaceFuel(BlockID.darklandsOakWoodSlab, 0, 300);
    Recipes.addFurnaceFuel(BlockID.darklandsOakWoodFence, 0, 300);
    Recipes.addFurnaceFuel(BlockID.dreadlandsWoodFence, 0, 300);
});
//====================|
//       OTHER        |
//====================|
//Wasteland's Thorn
IDRegistry.genBlockID("wastelandsThorn");
Block.createBlock("wastelandsThorn", [{ name: "Wasteland\'s Thorn", texture: [["wastelandsthorn", 0]], inCreative: false }]);
TileRenderer.setPlantModel(BlockID.wastelandsThorn, 0, "wastelandsthorn", 0);
ToolAPI.registerBlockMaterial(BlockID.wastelandsThorn, "plant", 0, false);
Block.registerDropFunction(BlockID.wastelandsThorn, function (coords, blockID, blockData, level, enchant, item, region) {
    return [[ItemID.wastelandsThorn, 1, 0]];
});
IDRegistry.genItemID("wastelandsThorn");
Item.createItem("wastelandsThorn", "Wastalands Horn", { name: "wastelandsthorn", data: 1 });
Item.registerUseFunction(ItemID.wastelandsThorn, function (coords, item, block, player) {
    var region = BlockSource.getDefaultForActor(player), r = coords.relative;
    if (block.id == BlockID.grassAbyss /**@todo */) {
        region.setBlock(r.x, r.y, r.z, BlockID.wastelandsThorn, 0);
        Entity.setCarriedItem(player, item.id, item.count - 1, item.data, item.extra);
    }
});
Callback.addCallback("GenerateCustomDimensionChunk", function (chunkX, chunkZ, random, dimensionId) {
    if (dimensionId == Abyss.id) {
        var coords = GenerationUtils.randomCoords(chunkX, chunkZ);
        coords = GenerationUtils.findSurface(coords.x, 75, coords.z);
        var region = BlockSource.getCurrentWorldGenRegion();
        if (coords.y < 48)
            return;
        for (var i = 0; i < randomInt(2, 5); i++) {
            if (Math.random() < .65) {
                if (region.getBlockId(coords.x, coords.y, coords.z) == BlockID.grassAbyss /**@todo */) {
                    region.setBlock(coords.x, coords.y + 1, coords.z, BlockID.wastelandsThorn, 0);
                }
            }
        }
    }
});
//Luminous Thistle
IDRegistry.genBlockID("luminousThistle");
Block.createBlock("luminousThistle", [{ name: "Luminous Thistle", texture: [["luminous_thistle", 0]], inCreative: false }]);
TileRenderer.setPlantModel(BlockID.luminousThistle, 0, "luminous_thistle", 0);
ToolAPI.registerBlockMaterial(BlockID.luminousThistle, "plant", 0, false);
Block.registerDropFunction("luminousThistle", function (coords, blockID, blockData, level, enchant, item, region) {
    return [[ItemID.luminousThistle, 1, 0]];
});
IDRegistry.genItemID("luminousThistle");
Item.createItem("luminousThistle", "Wastalands Lumin", { name: "luminousthistle", data: 1 });
Item.registerUseFunction("luminousThistle", function (coords, item, block, player) {
    var region = BlockSource.getDefaultForActor(player), r = coords.relative;
    if (block.id == BlockID.grassAbyss /**@todo */) {
        region.setBlock(r.x, r.y, r.z, BlockID.luminousThistle, 0);
        Entity.setCarriedItem(player, item.id, item.count - 1, item.data);
    }
});
Callback.addCallback("GenerateCustomDimensionChunk", function (chunkX, chunkZ, random, dimensionId) {
    if (dimensionId == Abyss.id) {
        var coords = GenerationUtils.randomCoords(chunkX, chunkZ);
        coords = GenerationUtils.findSurface(coords.x, 75, coords.z);
        var region = BlockSource.getCurrentWorldGenRegion();
        if (coords.y < 48)
            return;
        for (var i = 0; i < randomInt(1, 4); i++) {
            if (Math.random() < .65) {
                if (region.getBlockId(coords.x, coords.y, coords.z) == BlockID.grassAbyss /**@todo */) {
                    region.setBlock(coords.x, coords.y + 1, coords.z, BlockID.luminousThistle, 0);
                }
            }
        }
    }
});
IDRegistry.genBlockID("oreAbyssalnite");
Block.createBlock("oreAbyssalnite", [
    { name: "Abyssalnite Ore", texture: [["abyssalnite_ore", 0]], inCreative: true }
], BLOCK_TYPE_ORE);
ToolAPI.registerBlockMaterial(BlockID.oreAbyssalnite, "stone", 3, false);
IDRegistry.genBlockID("oreCoralium");
Block.createBlock("oreCoralium", [
    { name: "Coralium Ore", texture: [["coralium_ore", 0]], inCreative: true }
], BLOCK_TYPE_ORE);
ToolAPI.registerBlockMaterial(BlockID.oreCoralium, "stone", 3, false);
IDRegistry.genBlockID("oreCoraliumInfused");
Block.createBlock("oreCoraliumInfused", [
    { name: "Coralium Infused Stone", texture: [["coralium_infused_stone", 0]], inCreative: true }
], BLOCK_TYPE_ORE);
ToolAPI.registerBlockMaterial(BlockID.oreCoraliumInfused, "stone", 3, false);
IDRegistry.genBlockID("oreNitre");
Block.createBlock("oreNitre", [
    { name: "Nitre Ore", texture: [["nitre_ore", 0]], inCreative: true }
], BLOCK_TYPE_ORE);
ToolAPI.registerBlockMaterial(BlockID.oreNitre, "stone", 3, false);
Callback.addCallback("GenerateChunkUnderground", function (chunkX, chunkZ, random) {
    UniqueGen.generateOre(BlockID.oreAbyssalnite, 0, chunkX, chunkZ, random, {
        veinCounts: 10,
        minY: 2,
        maxY: 43,
        size: randomInt(2, 5)
    });
    UniqueGen.generateOre(BlockID.oreNitre, 0, chunkX, chunkZ, random, {
        veinCounts: 10,
        minY: 10,
        maxY: 49,
        size: randomInt(2, 5)
    });
    if (World.getBiome(chunkX, chunkZ) == 134 ||
        World.getBiome(chunkX, chunkZ) == CoralSwamp.id ||
        World.getBiome(chunkX, chunkZ) == 6) {
        UniqueGen.generateOre(BlockID.oreCoralium, 0, chunkX, chunkZ, random, {
            veinCounts: 9,
            minY: 4,
            maxY: 49,
            size: randomInt(3, 5)
        });
        UniqueGen.generateOre(BlockID.oreCoraliumInfused, 0, chunkX, chunkZ, random, {
            veinCounts: 8,
            minY: 3,
            maxY: 49,
            size: randomInt(2, 4)
        });
    }
});
IDRegistry.genBlockID("oreIronAbyssal");
Block.createBlock("oreIronAbyssal", [
    { name: "Abyssal Iron Ore", texture: [["abyssal_iron_ore", 0]], inCreative: true }
], BLOCK_TYPE_ORE);
ToolAPI.registerBlockMaterial(BlockID.oreIronAbyssal, "stone", 3, false);
IDRegistry.genBlockID("oreGoldAbyssal");
Block.createBlock("oreGoldAbyssal", [
    { name: "Abyssal Gold Ore", texture: [["abyssal_gold_ore", 0]], inCreative: true }
], BLOCK_TYPE_ORE);
ToolAPI.registerBlockMaterial(BlockID.oreGoldAbyssal, "stone", 3, false);
IDRegistry.genBlockID("oreDiamondAbyssal");
Block.createBlock("oreDiamondAbyssal", [
    { name: "Abyssal Diamond Ore", texture: [["abyssal_diamond_ore", 0]], inCreative: true }
], BLOCK_TYPE_ORE);
ToolAPI.registerBlockMaterial(BlockID.oreDiamondAbyssal, "stone", 3, false);
IDRegistry.genBlockID("oreNitreAbyssal");
Block.createBlock("oreNitreAbyssal", [
    { name: "Abyssal Nitre Ore", texture: [["abyssal_nitre_ore", 0]], inCreative: true }
], BLOCK_TYPE_ORE);
ToolAPI.registerBlockMaterial(BlockID.oreNitreAbyssal, "stone", 3, false);
IDRegistry.genBlockID("oreTinAbyssal");
Block.createBlock("oreTinAbyssal", [
    { name: "Abyssal Tin Ore", texture: [["abyssal_tin_ore", 0]], inCreative: true }
], BLOCK_TYPE_ORE);
ToolAPI.registerBlockMaterial(BlockID.oreTinAbyssal, "stone", 3, false);
IDRegistry.genBlockID("oreCopperAbyssal");
Block.createBlock("oreCopperAbyssal", [
    { name: "Abyssal Copper Ore", texture: [["abyssal_copper_ore", 0]], inCreative: true }
], BLOCK_TYPE_ORE);
ToolAPI.registerBlockMaterial(BlockID.oreCopperAbyssal, "stone", 3, false);
IDRegistry.genBlockID("oreCoraliumPearlescent");
Block.createBlock("oreCoraliumPearlescent", [
    { name: "Pearlescent Coralium Ore", texture: [["pearlescent_coralium_ore", 0]], inCreative: true }
], BLOCK_TYPE_ORE);
ToolAPI.registerBlockMaterial(BlockID.oreCoraliumPearlescent, "stone", 4, false);
IDRegistry.genBlockID("oreDreadedAbyssalnite");
Block.createBlock("oreDreadedAbyssalnite", [
    { name: "Dreaded Abyssalnite Ore", texture: [["dreaded_abyssalnite_ore", 0]], inCreative: true }
], BLOCK_TYPE_ORE);
ToolAPI.registerBlockMaterial(BlockID.oreDreadedAbyssalnite, "stone", 4, false);
IDRegistry.genBlockID("oreDreadlandsAbyssalnite");
Block.createBlock("oreDreadlandsAbyssalnite", [
    { name: "Dreadlands Abyssalnite Ore", texture: [["dreadlands_abyssalnite_ore", 0]], inCreative: true }
], BLOCK_TYPE_ORE);
ToolAPI.registerBlockMaterial(BlockID.oreDreadlandsAbyssalnite, "stone", 4, false);
IDRegistry.genBlockID("oreLiquifiedCoralium");
Block.createBlock("oreLiquifiedCoralium", [
    { name: "Liquified Coralium Ore", texture: [["liquified_coralium_ore", 0]], inCreative: true }
], BLOCK_TYPE_ORE);
ToolAPI.registerBlockMaterial(BlockID.oreLiquifiedCoralium, "stone", 4, false);
var AC_PICKAXES_BY_LEVEL = [ItemID.darkstonePickaxe, ItemID.abyssalnitePickaxe, ItemID.refinedCoraliumPickaxe, ItemID.dreadiumPickaxe, ItemID.ethaxiumPickaxe];
Block.registerDropFunction("oreAbyssalnite", function (coords, blockID, blockData, level, enchant, item, region) {
    if (level > 2)
        return [[blockID, 1, 0]];
    return [];
});
Block.registerDropFunction("oreCoralium", function (coords, blockID, blockData, level, enchant, item, region) {
    if (level > 2) {
        if (enchant.silk)
            return [[blockID, 1, 0]];
        var count = randomInt(1, 3);
        count += Math.floor(randomInt(0, 2) * enchant.fortune);
        region.spawnExpOrbs(coords.x, coords.y, coords.z, randomInt(2, 7));
        return [[ItemID.coraliumGem, count, 0]];
    }
    ;
    return [];
});
Block.registerDropFunction("oreCoraliumInfused", function (coords, blockID, blockData, level, enchant, item, region) {
    if (level > 3) {
        if (enchant.silk)
            return [[blockID, 1, 0]];
        var count = 1;
        count += Math.floor(Math.random() * enchant.fortune);
        region.spawnExpOrbs(coords.x, coords.y, coords.z, randomInt(3, 9));
        return [[ItemID.coraliumPearl, count, 0]];
    }
    ;
    return [];
});
Block.registerDropFunction("oreNitre", function (coords, blockID, blockData, level, enchant, item, region) {
    if (level > 2) {
        if (enchant.silk)
            return [[blockID, 1, 0]];
        var count = randomInt(1, 3);
        count += Math.floor(randomInt(0, 2) * enchant.fortune);
        region.spawnExpOrbs(coords.x, coords.y, coords.z, randomInt(2, 7));
        return [[ItemID.nitre, count, 0]];
    }
    ;
    return [];
});
Block.registerDropFunction("oreIronAbyssal", function (coords, blockID, blockData, level, enchant, item, region) {
    if (level > 2)
        return [[blockID, 1, 0]];
    return [];
});
Block.registerDropFunction("oreGoldAbyssal", function (coords, blockID, blockData, level, enchant, item, region) {
    if (level > 2)
        return [[blockID, 1, 0]];
    return [];
});
Block.registerDropFunction("oreDiamondAbyssal", function (coords, blockID, blockData, level, enchant, item, region) {
    if (level > 2) {
        if (enchant.silk)
            return [[blockID, 1, 0]];
        var count = 1;
        count += Math.floor(Math.random() * enchant.fortune);
        region.spawnExpOrbs(coords.x, coords.y, coords.z, randomInt(7, 12));
        return [[264, count, 0]];
    }
    return [];
});
Block.registerDropFunction("oreNitreAbyssal", function (coords, blockID, blockData, level, enchant, item, region) {
    if (level > 2)
        return [[blockID, 1, 0]];
    return [];
});
Block.registerDropFunction("oreTinAbyssal", function (coords, blockID, blockData, level, enchant, item, region) {
    if (level > 2)
        return [[blockID, 1, 0]];
    return [];
});
Block.registerDropFunction("oreCopperAbyssal", function (coords, blockID, blockData, level, enchant, item, region) {
    if (level > 2)
        return [[blockID, 1, 0]];
    return [];
});
Block.registerDropFunction("oreCoraliumPearlescent", function (coords, blockID, blockData, level, enchant, item, region) {
    //check if the pickaxe is from AbyssalCraft and if it is higher than abyssalnite
    if (AC_PICKAXES_BY_LEVEL.indexOf(item.id) !== -1) {
        if (AC_PICKAXES_BY_LEVEL.indexOf(item.id) > 1) {
            if (enchant.silk)
                return [[blockID, 1, 0]];
            var count = randomInt(1, 2);
            count += Math.floor(randomInt(0, 2) * enchant.fortune);
            region.spawnExpOrbs(coords.x, coords.y, coords.z, randomInt(6, 10));
            return [[ItemID.coraliumPearl, count, 0]];
        }
    }
    return [];
});
Block.registerDropFunction("oreDreadedAbyssalnite", function (coords, blockID, blockData, level, enchant, item, region) {
    if (AC_PICKAXES_BY_LEVEL.indexOf(item.id) !== -1) {
        if (AC_PICKAXES_BY_LEVEL.indexOf(item.id) > 0) {
            return [[blockID, 1, 0]];
        }
    }
    return [];
});
Block.registerDropFunction("oreDreadlandsAbyssalnite", function (coords, blockID, blockData, level, enchant, item, region) {
    if (AC_PICKAXES_BY_LEVEL.indexOf(item.id) !== -1) {
        if (AC_PICKAXES_BY_LEVEL.indexOf(item.id) > 0) {
            return [[blockID, 1, 0]];
        }
    }
    return [];
});
Block.registerDropFunction("oreLiquifiedCoralium", function (coords, blockID, blockData, level, enchant, item, region) {
    if (AC_PICKAXES_BY_LEVEL.indexOf(item.id) !== -1) {
        if (AC_PICKAXES_BY_LEVEL.indexOf(item.id) > 0) {
            return [[blockID, 1, 0]];
        }
    }
    return [];
});
IDRegistry.genBlockID("blockAbyssalnite");
IDRegistry.genBlockID("blockRefinedCoralium");
IDRegistry.genBlockID("blockDreadium");
IDRegistry.genBlockID("blockEthaxium");
Block.createBlock("blockAbyssalnite", [
    { name: "Block of Abyssalnite", texture: [["abyssalnite_block", 0]], inCreative: true }
], BLOCK_TYPE_UNI);
Block.createBlock("blockRefinedCoralium", [
    { name: "Block of Refined Coralium", texture: [["coralium_block", 0]], inCreative: true }
], BLOCK_TYPE_UNI);
Block.createBlock("blockDreadium", [
    { name: "Block of Dreadium", texture: [["dreadium_block", 0]], inCreative: true }
], BLOCK_TYPE_UNI);
Block.createBlock("blockEthaxium", [
    { name: "Block of Ethaxium", texture: [["ethaxium_block", 0]], inCreative: true }
], BLOCK_TYPE_UNI);
ToolAPI.registerBlockMaterial(BlockID.blockAbyssalnite, "stone", 1, false);
ToolAPI.registerBlockMaterial(BlockID.blockRefinedCoralium, "stone", 1, false);
ToolAPI.registerBlockMaterial(BlockID.blockDreadium, "stone", 1, false);
ToolAPI.registerBlockMaterial(BlockID.blockEthaxium, "stone", 1, false);
(function () {
    var addColor = function (id, color) {
        Item.registerNameOverrideFunction(id, function (item, name) {
            name = color + name;
            return name;
        });
    };
    addColor(BlockID.blockAbyssalnite, Native.Color.DARK_AQUA);
    addColor(BlockID.blockRefinedCoralium, Native.Color.AQUA);
    addColor(BlockID.blockDreadium, Native.Color.DARK_RED);
    addColor(BlockID.blockEthaxium, Native.Color.AQUA);
})();
//TODO crafts
//========================================//
// ALL DARKSTONE DECORATION BLOCKS REWRITTEN
//========================================//
IDRegistry.genBlockID("darklandsStone");
IDRegistry.genBlockID("darklandsStoneCobblestone");
IDRegistry.genBlockID("darklandsStoneBricks");
IDRegistry.genBlockID("chiseledDarklandsStoneBricks");
IDRegistry.genBlockID("crackedDarklandsStoneBricks");
IDRegistry.genBlockID("glowingDarklandsStoneBricks");
IDRegistry.genBlockID("darklandsStoneCobblestoneWall");
Block.createBlock("darklandsStone", [
    { name: "Darkstone", texture: [["darkstone", 0]], inCreative: true }
], BLOCK_TYPE_STONE);
Block.createBlock("darklandsStoneCobblestone", [
    { name: "Darkstone Cobblestone", texture: [["darkstone_cobblestone", 0]], inCreative: true }
], BLOCK_TYPE_STONE);
Block.createBlock("darklandsStoneBricks", [
    { name: "Darkstone Bricks", texture: [["darkstone_bricks", 0]], inCreative: true }
], BLOCK_TYPE_STONE);
Block.createBlock("chiseledDarklandsStoneBricks", [
    { name: "Chiseled Darkstone Bricks", texture: [["chiseled_darkstone_bricks", 0]], inCreative: true }
], BLOCK_TYPE_STONE);
Block.createBlock("crackedDarklandsStoneBricks", [
    { name: "Cracked Darkstone Bricks", texture: [["cracked_darkstone_bricks", 0]], inCreative: true }
], BLOCK_TYPE_STONE);
Block.createBlock("glowingDarklandsStoneBricks", [
    { name: "Glowing Darkstone Bricks", texture: [["glowing_darkstone_bricks", 0]], inCreative: true }
], BLOCK_TYPE_LIGHT);
Block.createBlock("darklandsStoneCobblestoneWall", [
    { name: "Darkstone Cobblestone Wall", texture: [["darkstone_cobblestone", 0]], inCreative: true }
], BLOCK_TYPE_WALL);
ToolAPI.registerBlockMaterial(BlockID.darklandsStone, "stone", 1, false);
ToolAPI.registerBlockMaterial(BlockID.darklandsStoneCobblestone, "stone", 1, false);
ToolAPI.registerBlockMaterial(BlockID.darklandsStoneBricks, "stone", 1, false);
ToolAPI.registerBlockMaterial(BlockID.chiseledDarklandsStoneBricks, "stone", 1, false);
ToolAPI.registerBlockMaterial(BlockID.crackedDarklandsStoneBricks, "stone", 1, false);
ToolAPI.registerBlockMaterial(BlockID.glowingDarklandsStoneBricks, "stone", 1, false);
ToolAPI.registerBlockMaterial(BlockID.darklandsStoneCobblestoneWall, "stone", 1, false);
Block.registerDropFunction(BlockID.darklandsStone, function (coords, blockID, blockData, level, enchant, item, region) {
    if (level > 0) {
        if (enchant.silk)
            return [[blockID, 1, 0]];
        return [[BlockID.darklandsStoneCobblestone, 1, 0]];
    }
    ;
    return [];
});
IDRegistry.genBlockID("darklandsStoneBrickFence");
Block.createBlock("darklandsStoneBrickFence", [
    { name: "Darklands Stone Brick Fence", texture: [["darklands_stone_bricks", 0]], inCreative: true }
], BLOCK_TYPE_FENCE);
ToolAPI.registerBlockMaterial(BlockID.darklandsStoneBrickFence, "stone", 1, false);
IDRegistry.genBlockID("darklandsStoneBrickSlab");
IDRegistry.genBlockID("darklandsStoneCobblestoneSlab");
IDRegistry.genBlockID("darklandsStoneSlab");
IDRegistry.genBlockID("darklandsStoneBrickSlabDouble");
IDRegistry.genBlockID("darklandsStoneCobblestoneSlabDouble");
IDRegistry.genBlockID("darklandsStoneSlabDouble");
BaseBlocks.createSlab("darklandsStoneBrickSlab", [
    { name: "Darkstone Brick Slab", texture: [
            ["darkstone_slab_top", 0], ["darkstone_slab_top", 0], ["darkstone_slab_side", 0]
        ], inCreative: true }
], BLOCK_TYPE_SLAB, BlockID.darklandsStoneBrickSlabDouble);
BaseBlocks.createSlab("darklandsStoneCobblestoneSlab", [
    { name: "Darkstone Cobblestone Slab", texture: [["darkstone_cobblestone", 0]], inCreative: true }
], BLOCK_TYPE_SLAB, BlockID.darklandsStoneCobblestoneSlabDouble);
BaseBlocks.createSlab("darklandsStoneSlab", [
    { name: "Darkstone Slab", texture: [["darkstone", 0]], inCreative: true }
], BLOCK_TYPE_SLAB, BlockID.darklandsStoneSlabDouble);
Block.createBlock("darklandsStoneBrickSlabDouble", [
    { name: "Darkstone Brick Slab", texture: [
            ["darkstone_slab_top", 0], ["darkstone_slab_top", 0], ["darkstone_slab_side", 0]
        ], inCreative: false }
], BLOCK_TYPE_SLAB);
Block.createBlock("darklandsStoneCobblestoneSlabDouble", [
    { name: "Darkstone Cobblestone Slab", texture: [["darkstone_cobblestone", 0]], inCreative: false }
], BLOCK_TYPE_SLAB);
Block.createBlock("darklandsStoneSlabDouble", [
    { name: "Darkstone Slab", texture: [["darkstone", 0]], inCreative: false }
], BLOCK_TYPE_SLAB);
ToolAPI.registerBlockMaterial(BlockID.darklandsStoneBrickSlab, "stone", 1, false);
ToolAPI.registerBlockMaterial(BlockID.darklandsStoneCobblestoneSlab, "stone", 1, false);
ToolAPI.registerBlockMaterial(BlockID.darklandsStoneSlab, "stone", 1, false);
ToolAPI.registerBlockMaterial(BlockID.darklandsStoneBrickSlabDouble, "stone", 1, false);
ToolAPI.registerBlockMaterial(BlockID.darklandsStoneCobblestoneSlabDouble, "stone", 1, false);
ToolAPI.registerBlockMaterial(BlockID.darklandsStoneSlabDouble, "stone", 1, false);
//=========================================//
// ALL DREADSTONE DECORATION BLOCKS REWRITTEN
//=========================================//
IDRegistry.genBlockID("dreadstone");
IDRegistry.genBlockID("dreadstoneCobblestone");
IDRegistry.genBlockID("dreadstoneBricks");
IDRegistry.genBlockID("chiseledDreadstoneBricks");
IDRegistry.genBlockID("crackedDreadstoneBricks");
IDRegistry.genBlockID("dreadstoneCobblestoneWall");
Block.createBlock("dreadstone", [
    { name: "Dreadstone", texture: [["dreadstone", 0]], inCreative: true }
], BLOCK_TYPE_STONE);
Block.createBlock("dreadstoneCobblestone", [
    { name: "Dreadstone Cobblestone", texture: [["dreadstone_cobblestone", 0]], inCreative: true }
], BLOCK_TYPE_STONE);
Block.createBlock("dreadstoneBricks", [
    { name: "Dreadstone Bricks", texture: [["dreadstone_bricks", 0]], inCreative: true }
], BLOCK_TYPE_STONE);
Block.createBlock("chiseledDreadstoneBricks", [
    { name: "Chiseled Dreadstone Bricks", texture: [["chiseled_dreadstone_bricks", 0]], inCreative: true }
], BLOCK_TYPE_STONE);
Block.createBlock("crackedDreadstoneBricks", [
    { name: "Cracked Dreadstone Bricks", texture: [["cracked_dreadstone_bricks", 0]], inCreative: true }
], BLOCK_TYPE_STONE);
Block.createBlock("dreadstoneCobblestoneWall", [
    { name: "Dreadstone Cobblestone Wall", texture: [["dreadstone_cobblestone", 0]], inCreative: true }
], BLOCK_TYPE_WALL);
ToolAPI.registerBlockMaterial(BlockID.dreadstone, "stone", 2, false);
ToolAPI.registerBlockMaterial(BlockID.dreadstoneCobblestone, "stone", 2, false);
ToolAPI.registerBlockMaterial(BlockID.dreadstoneBricks, "stone", 2, false);
ToolAPI.registerBlockMaterial(BlockID.chiseledDreadstoneBricks, "stone", 2, false);
ToolAPI.registerBlockMaterial(BlockID.crackedDreadstoneBricks, "stone", 2, false);
ToolAPI.registerBlockMaterial(BlockID.dreadstoneCobblestoneWall, "stone", 2, false);
Block.registerDropFunction(BlockID.dreadstone, function (coords, blockID, blockData, level, enchant, item, region) {
    if (level > 1) {
        if (enchant.silk)
            return [[blockID, 1, 0]];
        return [[BlockID.dreadstoneCobblestone, 1, 0]];
    }
    ;
    return [];
});
IDRegistry.genBlockID("dreadstoneBrickFence");
Block.createBlock("dreadstoneBrickFence", [
    { name: "Dreadstone Brick Fence", texture: [["dreadstone_bricks", 0]], inCreative: true }
]);
ToolAPI.registerBlockMaterial(BlockID.dreadstoneBrickFence, "stone", 2, false);
IDRegistry.genBlockID("dreadstoneBrickSlab");
IDRegistry.genBlockID("dreadstoneCobblestoneSlab");
IDRegistry.genBlockID("dreadstoneBrickSlabDouble");
IDRegistry.genBlockID("dreadstoneCobblestoneSlabDouble");
BaseBlocks.createSlab("dreadstoneBrickSlab", [
    { name: "Dreadstone Brick Slab", texture: [["dreadstone_bricks", 0]], inCreative: true }
], BLOCK_TYPE_SLAB, BlockID.dreadstoneBrickSlabDouble);
BaseBlocks.createSlab("dreadstoneCobblestoneSlab", [
    { name: "Dreadstone Cobblestone Slab", texture: [["dreadstone_cobblestone", 0]], inCreative: true }
], BLOCK_TYPE_SLAB, BlockID.dreadstoneCobblestoneSlabDouble);
Block.createBlock("dreadstoneBrickSlabDouble", [
    { name: "Dreadstone Brick Slab", texture: [["dreadstone_bricks", 0]], inCreative: false }
], BLOCK_TYPE_STONE);
Block.createBlock("dreadstoneCobblestoneSlabDouble", [
    { name: "Dreadstone Cobblestone Slab", texture: [["dreadstone_cobblestone", 0]], inCreative: false }
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.dreadstoneBrickSlab, "stone", 2, false);
ToolAPI.registerBlockMaterial(BlockID.dreadstoneCobblestoneSlab, "stone", 2, false);
ToolAPI.registerBlockMaterial(BlockID.dreadstoneBrickSlabDouble, "stone", 2, false);
ToolAPI.registerBlockMaterial(BlockID.dreadstoneCobblestoneSlabDouble, "stone", 2, false);
//=======================================//
// ALL ETHAXIUM DECORATION BLOCKS REWRITTEN
//=======================================//
IDRegistry.genBlockID("ethaxium");
IDRegistry.genBlockID("ethaxiumBricks");
IDRegistry.genBlockID("chiseledEthaxiumBricks");
IDRegistry.genBlockID("crackedEthaxiumBricks");
Block.createBlock("ethaxium", [
    { name: "Ethaxium", texture: [["ethaxium", 0]], inCreative: true }
], BLOCK_TYPE_STONE);
Block.createBlock("ethaxiumBricks", [
    { name: "Ethaxium Bricks", texture: [["ethaxium_bricks", 0]], inCreative: true }
], BLOCK_TYPE_STONE);
Block.createBlock("chiseledEthaxiumBricks", [
    { name: "Chiseled Ethaxium Bricks", texture: [["chiseled_ethaxium_bricks", 0]], inCreative: true }
], BLOCK_TYPE_STONE);
Block.createBlock("crackedEthaxiumBricks", [
    { name: "Cracked Ethaxium Bricks", texture: [["cracked_ethaxium_bricks", 0]], inCreative: true }
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.ethaxium, "stone", 4, false);
ToolAPI.registerBlockMaterial(BlockID.ethaxiumBricks, "stone", 4, false);
ToolAPI.registerBlockMaterial(BlockID.chiseledEthaxiumBricks, "stone", 4, false);
ToolAPI.registerBlockMaterial(BlockID.crackedEthaxiumBricks, "stone", 4, false);
IDRegistry.genBlockID("ethaxiumBrickFence");
Block.createBlock("ethaxiumBrickFence", [
    { name: "Ethaxium Brick Fence", texture: [["ethaxium_bricks", 0]], inCreative: true }
], BLOCK_TYPE_FENCE);
ToolAPI.registerBlockMaterial(BlockID.ethaxiumBrickFence, "stone", 4, false);
IDRegistry.genBlockID("ethaxiumPillar");
Block.createBlock("ethaxiumPillar", [
    { name: "Ethaxium Pillar", texture: [
            ["ethaxium_pillar_top", 0], ["ethaxium_pillar_top", 0], ["ethaxium_pillar_side", 0]
        ], inCreative: true },
    { name: "Ethaxium Pillar", texture: [
            ["ethaxium_pillar_side", 0], ["ethaxium_pillar_side", 0], ["ethaxium_pillar_top", 0], ["ethaxium_pillar_top", 0], ["ethaxium_pillar_side", 1]
        ], inCreative: false },
    { name: "Ethaxium Pillar", texture: [
            ["ethaxium_pillar_side", 1], ["ethaxium_pillar_side", 1], ["ethaxium_pillar_side", 1], ["ethaxium_pillar_side", 1], ["ethaxium_pillar_top", 0]
        ], inCreative: false }
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.ethaxiumPillar, "stone", 4, false);
Block.registerPlaceFunction(BlockID.ethaxiumPillar, function (coords, item, block, player, region) {
    var r = coords.relative;
    switch (coords.side) {
        case 0:
        case 1:
            region.setBlock(r.x, r.y, r.z, BlockID.ethaxiumPillar, 0);
            break;
        case 2:
        case 3:
            region.setBlock(r.x, r.y, r.z, BlockID.ethaxiumPillar, 1);
            break;
        case 4:
        case 5:
            region.setBlock(r.x, r.y, r.z, BlockID.ethaxiumPillar, 2);
            break;
    }
});
Block.registerDropFunction(BlockID.ethaxiumPillar, function (coords, blockID, blockData, level, enchant, item, region) {
    return [[blockID, 1, 0]];
});
IDRegistry.genBlockID("ethaxiumBrickSlab");
IDRegistry.genBlockID("ethaxiumBrickSlabDouble");
BaseBlocks.createSlab("ethaxiumBrickSlab", [
    { name: "Ethaxium Brick Slab", texture: [["ethaxium_bricks", 0]], inCreative: true }
], BLOCK_TYPE_SLAB, BlockID.ethaxiumBrickSlabDouble);
Block.createBlock("ethaxiumBrickSlabDouble", [
    { name: "Ethaxium Brick Slab", texture: [["ethaxium_bricks", 0]], inCreative: false }
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.ethaxiumBrickSlab, "stone", 4, false);
ToolAPI.registerBlockMaterial(BlockID.ethaxiumBrickSlabDouble, "stone", 4, false);
(function () {
    var makeBlue = function (id) {
        Item.registerNameOverrideFunction(id, function (item, name) {
            name = "§b" + name;
            return name;
        });
    };
    makeBlue(BlockID.ethaxium);
    makeBlue(BlockID.ethaxiumBricks);
    makeBlue(BlockID.chiseledEthaxiumBricks);
    makeBlue(BlockID.crackedEthaxiumBricks);
    makeBlue(BlockID.ethaxiumBrickFence);
    makeBlue(BlockID.ethaxiumPillar);
    makeBlue(BlockID.ethaxiumBrickSlab);
    makeBlue(BlockID.ethaxiumBrickSlabDouble);
})();
//================================================//
// DARK ETHAXIUM DECORATION BLOCKS WRITTEN FROM ZERO
//================================================//
IDRegistry.genBlockID("darkEthaxiumBricks");
IDRegistry.genBlockID("chiseledDarkEthaxiumBricks");
IDRegistry.genBlockID("crackedDarkEthaxiumBricks");
Block.createBlock("darkEthaxiumBricks", [
    { name: "Dark Ethaxium Bricks", texture: [["dark_ethaxium_bricks", 0]], inCreative: true }
], BLOCK_TYPE_STONE);
Block.createBlock("chiseledDarkEthaxiumBricks", [
    { name: "Chiseled Dark Ethaxium Bricks", texture: [["chiseled_dark_ethaxium_bricks", 0]], inCreative: true }
], BLOCK_TYPE_STONE);
Block.createBlock("crackedDarkEthaxiumBricks", [
    { name: "Cracked Dark Ethaxium Bricks", texture: [["cracked_dark_ethaxium_bricks", 0]], inCreative: true }
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.darkEthaxiumBricks, "stone", 4, false);
ToolAPI.registerBlockMaterial(BlockID.chiseledDarkEthaxiumBricks, "stone", 4, false);
ToolAPI.registerBlockMaterial(BlockID.crackedDarkEthaxiumBricks, "stone", 4, false);
IDRegistry.genBlockID("darkEthaxiumBrickFence");
Block.createBlock("darkEthaxiumBrickFence", [
    { name: "Dark Ethaxium Brick Fence", texture: [["dark_ethaxium_bricks", 0]], inCreative: true }
], BLOCK_TYPE_FENCE);
ToolAPI.registerBlockMaterial(BlockID.darkEthaxiumBrickFence, "stone", 4, false);
IDRegistry.genBlockID("darkEthaxiumPillar");
Block.createBlock("darkEthaxiumPillar", [
    { name: "Dark Ethaxium Pillar", texture: [
            ["dark_ethaxium_pillar_top", 0], ["dark_ethaxium_pillar_top", 0], ["dark_ethaxium_pillar_side", 0]
        ], inCreative: true },
    { name: "Dark Ethaxium Pillar", texture: [
            ["dark_ethaxium_pillar_side", 0], ["dark_ethaxium_pillar_side", 0], ["dark_ethaxium_pillar_top", 0], ["dark_ethaxium_pillar_top", 0], ["dark_ethaxium_pillar_side", 1]
        ], inCreative: false },
    { name: "Dark Ethaxium Pillar", texture: [
            ["dark_ethaxium_pillar_side", 1], ["dark_ethaxium_pillar_side", 1], ["dark_ethaxium_pillar_side", 1], ["dark_ethaxium_pillar_side", 1], ["dark_ethaxium_pillar_top", 0]
        ], inCreative: false }
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.darkEthaxiumPillar, "stone", 4, false);
Block.registerPlaceFunction(BlockID.darkEthaxiumPillar, function (coords, item, block, player, region) {
    var r = coords.relative;
    switch (coords.side) {
        case 0:
        case 1:
            region.setBlock(r.x, r.y, r.z, BlockID.darkEthaxiumPillar, 0);
            break;
        case 2:
        case 3:
            region.setBlock(r.x, r.y, r.z, BlockID.darkEthaxiumPillar, 1);
            break;
        case 4:
        case 5:
            region.setBlock(r.x, r.y, r.z, BlockID.darkEthaxiumPillar, 2);
            break;
    }
});
Block.registerDropFunction(BlockID.darkEthaxiumPillar, function (coords, blockID, blockData, level, enchant, item, region) {
    return [[blockID, 1, 0]];
});
IDRegistry.genBlockID("darkEthaxiumBrickSlab");
IDRegistry.genBlockID("darkEthaxiumBrickSlabDouble");
BaseBlocks.createSlab("darkEthaxiumBrickSlab", [
    { name: "Dark Ethaxium Brick Slab", texture: [["dark_ethaxium_bricks", 0]], inCreative: true }
], BLOCK_TYPE_SLAB, BlockID.ethaxiumBrickSlabDouble);
Block.createBlock("darkEthaxiumBrickSlabDouble", [
    { name: "Dark Ethaxium Brick Slab", texture: [["dark_ethaxium_bricks", 0]], inCreative: false }
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.darkEthaxiumBrickSlab, "stone", 4, false);
ToolAPI.registerBlockMaterial(BlockID.darkEthaxiumBrickSlabDouble, "stone", 4, false);
(function () {
    var makeRed = function (id) {
        Item.registerNameOverrideFunction(id, function (item, name) {
            name = "§4" + name;
            return name;
        });
    };
    makeRed(BlockID.darkEthaxiumBricks);
    makeRed(BlockID.chiseledDarkEthaxiumBricks);
    makeRed(BlockID.crackedDarkEthaxiumBricks);
    makeRed(BlockID.darkEthaxiumBrickFence);
    makeRed(BlockID.darkEthaxiumPillar);
    makeRed(BlockID.darkEthaxiumBrickSlab);
    makeRed(BlockID.darkEthaxiumBrickSlabDouble);
})();
//omothol stone ыыыыы
IDRegistry.genBlockID("omotholStone");
Block.createBlock("omotholStone", [
    { name: "Omothol Stone", texture: [["omothol_stone", 0]], inCreative: true }
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.omotholStone, "stone", 4, false);
//===============//
// ABYSSAL STONE //
//===============//
IDRegistry.genBlockID("abyssalStone");
IDRegistry.genBlockID("abyssalCobblestone");
IDRegistry.genBlockID("abyssalStoneBricks");
IDRegistry.genBlockID("chiseledAbyssalStoneBricks");
IDRegistry.genBlockID("crackedAbyssalStoneBricks");
Block.createBlock("abyssalStone", [
    { name: "Abyssal Stone", texture: [["abyssal_stone", 0]], inCreative: true }
], BLOCK_TYPE_STONE);
Block.createBlock("abyssalCobblestone", [
    { name: "Abyssal Cobblestone", texture: [["abyssal_cobblestone", 0]], inCreative: true }
], BLOCK_TYPE_STONE);
Block.createBlock("abyssalStoneBricks", [
    { name: "Abyssal Stone Bricks", texture: [["abyssal_stone_bricks", 0]], inCreative: true }
], BLOCK_TYPE_STONE);
Block.createBlock("chiseledAbyssalStoneBricks", [
    { name: "Chiseled Abyssal Stone Bricks", texture: [["chiseled_abyssal_stone_bricks", 0]], inCreative: true }
], BLOCK_TYPE_STONE);
Block.createBlock("crackedAbyssalStoneBricks", [
    { name: "Cracked Abyssal Stone Bricks", texture: [["cracked_abyssal_stone_bricks", 0]], inCreative: true }
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.abyssalStone, "stone", 1, false);
ToolAPI.registerBlockMaterial(BlockID.abyssalCobblestone, "stone", 1, false);
ToolAPI.registerBlockMaterial(BlockID.abyssalStoneBricks, "stone", 1, false);
ToolAPI.registerBlockMaterial(BlockID.chiseledAbyssalStoneBricks, "stone", 1, false);
ToolAPI.registerBlockMaterial(BlockID.crackedAbyssalStoneBricks, "stone", 1, false);
Block.registerDropFunction(BlockID.abyssalStone, function (coords, blockID, blockData, level, enchant, item, region) {
    if (level > 0) {
        if (enchant.silk)
            return [[blockID, 1, 0]];
        return [[BlockID.abyssalCobblestone, 1, 0]];
    }
    return [];
});
IDRegistry.genBlockID("abyssalStoneBrickFence");
Block.createBlock("abyssalStoneBrickFence", [
    { name: "Abyssal Stone Brick Fence", texture: [["abyssal_stone_bricks"]], inCreative: true }
], BLOCK_TYPE_FENCE);
ToolAPI.registerBlockMaterial(BlockID.abyssalStoneBrickFence, "stone", 1, false);
IDRegistry.genBlockID("abyssalStoneBrickSlab");
IDRegistry.genBlockID("abyssalStoneBrickSlabDouble");
BaseBlocks.createSlab("abyssalStoneBrickSlab", [
    { name: "Abyssal Stone Brick Slab", texture: [["abyssal_stone_bricks", 0]], inCreative: true }
], BLOCK_TYPE_STONE, BlockID.abyssalStoneBrickSlabDouble);
Block.createBlock("abyssalStoneBrickSlabDouble", [
    { name: "Abyssal Stone Brick Slab", texture: [["abyssal_stone_bricks", 0]], inCreative: true }
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.abyssalStoneBrickSlab, "stone", 1, false);
ToolAPI.registerBlockMaterial(BlockID.abyssalStoneBrickSlabDouble, "stone", 1, false);
IDRegistry.genBlockID("abyssalCobblestoneSlab");
IDRegistry.genBlockID("abyssalCobblestoneSlabDouble");
BaseBlocks.createSlab("abyssalCobblestoneSlab", [
    { name: "Abyssal Cobblestone Slab", texture: [["abyssal_cobblestone", 0]], inCreative: true }
], BLOCK_TYPE_STONE, BlockID.abyssalCobblestoneSlabDouble);
Block.createBlock("abyssalCobblestoneSlabDouble", [
    { name: "Abyssal Cobblestone Slab", texture: [["abyssal_cobblestone", 0]], inCreative: true }
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.abyssalCobblestoneSlab, "stone", 1, false);
ToolAPI.registerBlockMaterial(BlockID.abyssalCobblestoneSlabDouble, "stone", 1, false);
IDRegistry.genBlockID("abyssalCobblestoneWall");
Block.createBlock("abyssalCobblestoneWall", [
    { name: "Abyssal Cobblestone Wall", texture: [["abyssal_cobblestone", 0]], inCreative: true }
], BLOCK_TYPE_WALL);
ToolAPI.registerBlockMaterial(BlockID.abyssalCobblestoneWall, "stone", 1, false);
(function () {
    var makeBlue = function (id) {
        Item.registerNameOverrideFunction(id, function (item, name) {
            name = Native.Color.BLUE + name;
            return name;
        });
    };
    makeBlue(BlockID.abyssalStone);
    makeBlue(BlockID.abyssalCobblestone);
    makeBlue(BlockID.abyssalStoneBricks);
    makeBlue(BlockID.chiseledAbyssalStoneBricks);
    makeBlue(BlockID.crackedAbyssalStoneBricks);
    makeBlue(BlockID.abyssalStoneBrickFence);
    makeBlue(BlockID.abyssalStoneBrickSlab);
    makeBlue(BlockID.abyssalStoneBrickSlabDouble);
    makeBlue(BlockID.abyssalCobblestoneSlab);
    makeBlue(BlockID.abyssalCobblestoneSlabDouble);
    makeBlue(BlockID.abyssalCobblestoneWall);
})();
//==========//
// CORALIUM //
//==========//
IDRegistry.genBlockID("coraliumStone");
IDRegistry.genBlockID("coraliumCobblestone");
IDRegistry.genBlockID("coraliumBricks");
IDRegistry.genBlockID("chiseledCoraliumBricks");
IDRegistry.genBlockID("crackedCoraliumBricks");
IDRegistry.genBlockID("coraliumBrickFence");
IDRegistry.genBlockID("coraliumBrickSlab");
IDRegistry.genBlockID("coraliumBrickSlabDouble");
IDRegistry.genBlockID("coraliumCobblestoneSlab");
IDRegistry.genBlockID("coraliumCobblestoneSlabDouble");
IDRegistry.genBlockID("coraliumCobblestoneWall");
Block.createBlock("coraliumStone", [
    { name: "Coralium Stone", texture: [["coralium_stone", 0]], inCreative: true }
], BLOCK_TYPE_STONE);
Block.createBlock("coraliumCobblestone", [
    { name: "Coralium Cobblestone", texture: [["coralium_cobblestone", 0]], inCreative: true }
], BLOCK_TYPE_STONE);
Block.createBlock("coraliumBricks", [
    { name: "Coralium Bricks", texture: [["coralium_bricks", 0]], inCreative: true }
], BLOCK_TYPE_STONE);
Block.createBlock("chiseledCoraliumBricks", [
    { name: "Chiseled Coralium Bricks", texture: [["chiseled_coralium_bricks", 0]], inCreative: true }
], BLOCK_TYPE_STONE);
Block.createBlock("crackedCoraliumBricks", [
    { name: "Cracked Coralium Bricks", texture: [["cracked_coralium_bricks", 0]], inCreative: true }
], BLOCK_TYPE_STONE);
Block.createBlock("coraliumBrickFence", [
    { name: "Coralium Brick Fence", texture: [["coralium_bricks", 0]], inCreative: true }
], BLOCK_TYPE_FENCE);
BaseBlocks.createSlab("coraliumBrickSlab", [
    { name: "Coralium Brick Slab", texture: [["coralium_bricks", 0]], inCreative: true }
], BLOCK_TYPE_SLAB, BlockID.coraliumBrickSlabDouble);
Block.createBlock("coraliumBrickSlabDouble", [
    { name: "Coralium Brick Slab", texture: [["coralium_bricks", 0]], inCreative: true }
], BLOCK_TYPE_STONE);
BaseBlocks.createSlab("coraliumCobblestoneSlab", [
    { name: "Coralium Cobblestone Slab", texture: [["coralium_cobblestone", 0]], inCreative: true }
], BLOCK_TYPE_SLAB, BlockID.coraliumCobblestoneSlabDouble);
Block.createBlock("coraliumCobblestoneSlabDouble", [
    { name: "Coralium Cobblestone Slab", texture: [["coralium_cobblestone", 0]], inCreative: true }
], BLOCK_TYPE_STONE);
Block.createBlock("coraliumCobblestoneWall", [
    { name: "Coralium Cobblestone Wall", texture: [["coralium_cobblestone", 0]], inCreative: true }
], BLOCK_TYPE_WALL);
Block.registerDropFunction(BlockID.coraliumStone, function (coords, blockID, blockData, level, enchant, item, region) {
    if (level > 0) {
        if (enchant.silk)
            return [[blockID, 1, 0]];
        return [[BlockID.coraliumCobblestone, 1, 0]];
    }
    return [];
});
ToolAPI.registerBlockMaterial(BlockID.coraliumStone, "stone", 1, false);
ToolAPI.registerBlockMaterial(BlockID.coraliumCobblestone, "stone", 1, false);
ToolAPI.registerBlockMaterial(BlockID.coraliumBricks, "stone", 1, false);
ToolAPI.registerBlockMaterial(BlockID.chiseledCoraliumBricks, "stone", 1, false);
ToolAPI.registerBlockMaterial(BlockID.crackedCoraliumBricks, "stone", 1, false);
ToolAPI.registerBlockMaterial(BlockID.coraliumBrickFence, "stone", 1, false);
ToolAPI.registerBlockMaterial(BlockID.coraliumBrickSlab, "stone", 1, false);
ToolAPI.registerBlockMaterial(BlockID.coraliumBrickSlabDouble, "stone", 1, false);
ToolAPI.registerBlockMaterial(BlockID.coraliumCobblestoneSlab, "stone", 1, false);
ToolAPI.registerBlockMaterial(BlockID.coraliumCobblestoneSlabDouble, "stone", 1, false);
ToolAPI.registerBlockMaterial(BlockID.coraliumCobblestoneWall, "stone", 1, false);
//=============//
// ABYSSALNITE //
//=============//
IDRegistry.genBlockID("abyssalniteStone");
IDRegistry.genBlockID("abyssalniteCobblestone");
IDRegistry.genBlockID("abyssalniteBricks");
IDRegistry.genBlockID("chiseledAbyssalniteBricks");
IDRegistry.genBlockID("crackedAbyssalniteBricks");
IDRegistry.genBlockID("abyssalniteBrickFence");
IDRegistry.genBlockID("abyssalniteBrickSlab");
IDRegistry.genBlockID("abyssalniteBrickSlabDouble");
IDRegistry.genBlockID("abyssalniteCobblestoneSlab");
IDRegistry.genBlockID("abyssalniteCobblestoneSlabDouble");
IDRegistry.genBlockID("abyssalniteCobblestoneWall");
Block.createBlock("abyssalniteStone", [
    { name: "Abyssalnite Stone", texture: [["abyssalnite_stone", 0]], inCreative: true }
], BLOCK_TYPE_STONE);
Block.createBlock("abyssalniteCobblestone", [
    { name: "Abyssalnite Cobblestone", texture: [["abyssalnite_cobblestone", 0]], inCreative: true }
], BLOCK_TYPE_STONE);
Block.createBlock("abyssalniteBricks", [
    { name: "Abyssalnite Bricks", texture: [["abyssalnite_bricks", 0]], inCreative: true }
], BLOCK_TYPE_STONE);
Block.createBlock("chiseledAbyssalniteBricks", [
    { name: "Chiseled Abyssalnite Bricks", texture: [["chiseled_abyssalnite_bricks", 0]], inCreative: true }
], BLOCK_TYPE_STONE);
Block.createBlock("crackedAbyssalniteBricks", [
    { name: "Cracked Abyssalnite Bricks", texture: [["cracked_abyssalnite_bricks", 0]], inCreative: true }
], BLOCK_TYPE_STONE);
Block.createBlock("abyssalniteBrickFence", [
    { name: "Abyssalnite Brick Fence", texture: [["abyssalnite_bricks", 0]], inCreative: true }
], BLOCK_TYPE_FENCE);
BaseBlocks.createSlab("abyssalniteBrickSlab", [
    { name: "Abyssalnite Brick Slab", texture: [["abyssalnite_bricks", 0]], inCreative: true }
], BLOCK_TYPE_SLAB, BlockID.abyssalniteBrickSlabDouble);
Block.createBlock("abyssalniteBrickSlabDouble", [
    { name: "Abyssalnite Brick Slab", texture: [["abyssalnite_bricks", 0]], inCreative: true }
], BLOCK_TYPE_STONE);
BaseBlocks.createSlab("abyssalniteCobblestoneSlab", [
    { name: "Abyssalnite Cobblestone Slab", texture: [["abyssalnite_cobblestone", 0]], inCreative: true }
], BLOCK_TYPE_SLAB, BlockID.abyssalniteCobblestoneSlabDouble);
Block.createBlock("abyssalniteCobblestoneSlabDouble", [
    { name: "Abyssalnite Cobblestone Slab", texture: [["abyssalnite_cobblestone", 0]], inCreative: true }
], BLOCK_TYPE_STONE);
Block.createBlock("abyssalniteCobblestoneWall", [
    { name: "Abyssalnite Cobblestone Wall", texture: [["abyssalnite_cobblestone", 0]], inCreative: true }
], BLOCK_TYPE_WALL);
Block.registerDropFunction(BlockID.abyssalniteStone, function (coords, blockID, blockData, level, enchant, item, region) {
    if (level > 0) {
        if (enchant.silk)
            return [[blockID, 1, 0]];
        return [[BlockID.abyssalniteCobblestone, 1, 0]];
    }
    return [];
});
ToolAPI.registerBlockMaterial(BlockID.abyssalniteStone, "stone", 1, false);
ToolAPI.registerBlockMaterial(BlockID.abyssalniteCobblestone, "stone", 1, false);
ToolAPI.registerBlockMaterial(BlockID.abyssalniteBricks, "stone", 1, false);
ToolAPI.registerBlockMaterial(BlockID.chiseledAbyssalniteBricks, "stone", 1, false);
ToolAPI.registerBlockMaterial(BlockID.crackedAbyssalniteBricks, "stone", 1, false);
ToolAPI.registerBlockMaterial(BlockID.abyssalniteBrickFence, "stone", 1, false);
ToolAPI.registerBlockMaterial(BlockID.abyssalniteBrickSlab, "stone", 1, false);
ToolAPI.registerBlockMaterial(BlockID.abyssalniteBrickSlabDouble, "stone", 1, false);
ToolAPI.registerBlockMaterial(BlockID.abyssalniteCobblestoneSlab, "stone", 1, false);
ToolAPI.registerBlockMaterial(BlockID.abyssalniteCobblestoneSlabDouble, "stone", 1, false);
ToolAPI.registerBlockMaterial(BlockID.abyssalniteCobblestoneWall, "stone", 1, false);
//==================//
// CRAFTING RECIPES //
//==================//
Callback.addCallback("PostLoaded", function () {
    //darkstone
    Recipes.addFurnace(BlockID.darklandsStoneCobblestone, BlockID.darklandsStone, 0);
    addShapedRecipe(BlockID.darklandsStoneSlab, 6, 0, ["sss"], ['s', BlockID.darklandsStone, 0]);
    addShapedRecipe(BlockID.darklandsStoneBricks, 4, 0, ["ss", "ss"], ['s', BlockID.darklandsStone, 0]);
    Recipes.addFurnace(BlockID.darklandsStoneBricks, 0, BlockID.crackedDarklandsStoneBricks, 0);
    addShapedRecipe(BlockID.glowingDarklandsStoneBricks, 4, 0, ["bdb", "ogo", "bob"], ['b', BlockID.darklandsStoneBricks, 0, 'd', 264, 0, 'o', 49, 0, 'g', 89, 0]);
    addShapedRecipe(BlockID.darklandsStoneBrickSlab, 6, 0, ["sss", ['s', BlockID.darklandsStoneBricks, 0]]);
    addShapedRecipe(BlockID.chiseledDarklandsStoneBricks, 1, 0, ["s", "s"], ['s', BlockID.darklandsStoneBrickSlab, 0]);
    addShapedRecipe(BlockID.darklandsStoneCobblestoneWall, 6, 0, ["sss", "sss"], ['s', BlockID.darklandsStoneCobblestone, 0]);
    //dreadstone
    Recipes.addFurnace(BlockID.dreadstoneCobblestone, BlockID.dreadstone, 0);
    addShapedRecipe(BlockID.dreadstoneBricks, 4, 0, ["ss", "ss"], ['s', BlockID.dreadstone, 0]);
    addShapedRecipe(BlockID.dreadstoneCobblestoneWall, 6, 0, ["sss", "sss"], ['s', BlockID.dreadstoneCobblestone, 0]);
    addShapedRecipe(BlockID.dreadstoneCobblestoneSlab, 6, 0, ["sss"], ['s', BlockID.dreadstoneCobblestone, 0]);
    addShapedRecipe(BlockID.dreadstoneBrickSlab, 6, 0, ["sss"], ['s', BlockID.dreadstoneBricks, 0]);
    Recipes.addFurnace(BlockID.dreadstoneBricks, 0, BlockID.crackedDreadstoneBricks, 0);
    addShapedRecipe(BlockID.chiseledDreadstoneBricks, 1, 0, ["s", "s"], ['s', BlockID.dreadstoneBrickSlab, 0]);
    //ethaxium
    addShapedRecipe(BlockID.ethaxiumPillar, 2, 0, ["bs", "bs"], ['b', BlockID.ethaxiumBricks, 0, 's', BlockID.ethaxium, 0]);
    addShapedRecipe(BlockID.ethaxiumBricks, 1, 0, ["bb", "bb"], ['b', ItemID.ethaxiumBrick, 0]);
    addShapedRecipe(BlockID.ethaxiumBrickSlab, 6, 0, ["sss", "sss"], ['s', BlockID.ethaxiumBricks, 0]);
    Recipes.addFurnace(BlockID.ethaxiumBricks, 0, BlockID.crackedEthaxiumBricks, 0);
    addShapedRecipe(BlockID.chiseledEthaxiumBricks, 1, 0, ["s", "s"], ['s', BlockID.ethaxiumBrickSlab, 0]);
    //dark ethaxium
    addShapedRecipe(BlockID.darkEthaxiumBricks, 4, 0, ["oe", "oe"], ['o', BlockID.omotholStone, 0, 'e', BlockID.ethaxium, 0]);
    addShapedRecipe(BlockID.darkEthaxiumPillar, 2, 0, ["bo", "bo"], ['b', BlockID.darkEthaxiumBricks, 0, 'o', BlockID.omotholStone, 0]);
    addShapedRecipe(BlockID.darkEthaxiumBrickSlab, 6, 0, ["bbb"], ['b', BlockID.darkEthaxiumBricks, 0]);
    Recipes.addFurnace(BlockID.darkEthaxiumBricks, 0, BlockID.crackedDarkEthaxiumBricks, 0);
    addShapedRecipe(BlockID.chiseledDarkEthaxiumBricks, 1, 0, ["s", "s"], ['s', BlockID.darkEthaxiumBrickSlab, 0]);
    //abyssal stone
    Recipes.addFurnace(BlockID.abyssalCobblestone, BlockID.abyssalStone, 0);
    addShapedRecipe(BlockID.abyssalStoneBricks, 4, 0, ["ss", "ss"], ['s', BlockID.abyssalStone, 0]);
    addShapedRecipe(BlockID.abyssalCobblestoneWall, 6, 0, ["ccc", "ccc"], ['c', BlockID.abyssalCobblestone, 0]);
    addShapedRecipe(BlockID.abyssalCobblestoneSlab, 6, 0, ["ccc"], ['c', BlockID.abyssalCobblestone, 0]);
    addShapedRecipe(BlockID.abyssalStoneBrickSlab, 6, 0, ["sss"], ['s', BlockID.abyssalStoneBricks, 0]);
    Recipes.addFurnace(BlockID.abyssalStoneBricks, 0, BlockID.crackedAbyssalStoneBricks, 0);
    addShapedRecipe(BlockID.chiseledAbyssalStoneBricks, 1, 0, ["s", "s"], ['s', BlockID.abyssalStoneBrickSlab, 0]);
    //coralium
    //TODO RECIPES FOR CORALIUM AND ABYSSALNITE, AND ALL FENCES RECIPES
    //TODO REMAKE THIS ODOROBALO
    //abyssalnite
});
IDRegistry.genBlockID("darklandsGrass");
Block.createBlock("darklandsGrass", [
    { name: "Grass Block", texture: [["darklands_grass_bottom", 0], ["darklands_grass_top", 0], ["darklands_grass_side", 1]], inCreative: true }
], "opaque");
ToolAPI.registerBlockMaterial(BlockID.darklandsGrass, "dirt", 0, false);
Block.registerDropFunction(BlockID.darklandsGrass, function (coords, blockID, blockData, level, enchant, item, region) {
    if (enchant.silk)
        return [[blockID, 1, 0]];
    return [[3, 1, 0]];
});
IDRegistry.genBlockID("fusedAbyssalSand");
IDRegistry.genBlockID("abyssalSand");
IDRegistry.genBlockID("abyssalSandGlass");
Block.createBlock("fusedAbyssalSand", [
    { name: "Fused Abyssal Sand", texture: [["abyssal_sand", 0], ["fused_abyssal_sand_top", 0], ["fused_abyssal_sand_side", 0]], inCreative: true }
], BLOCK_TYPE_SAND);
Block.createBlock("abyssalSand", [
    { name: "Abyssal Sand", texture: [["abyssal_sand", 0]], inCreative: true }
], BLOCK_TYPE_SAND);
Block.createBlock("abyssalSandGlass", [
    { name: "Abyssal Sand Glass", texture: [["abyssal_sand_glass", 0]], inCreative: true }
], BLOCK_TYPE_GLASS);
ToolAPI.registerBlockMaterial(BlockID.fusedAbyssalSand, "dirt", 0, false);
ToolAPI.registerBlockMaterial(BlockID.abyssalSand, "dirt", 0, false);
Block.registerDropFunction(BlockID.fusedAbyssalSand, function (coords, blockID, blockData, level, enchant, item, region) {
    if (enchant.silk)
        return [[blockID, 1, 0]];
    return [[BlockID.abyssalSand, 1, 0]];
});
Callback.addCallback("PostLoaded", function () {
    Recipes.addFurnace(BlockID.abyssalSand, 0, BlockID.abyssalSandGlass, 0);
});
IDRegistry.genBlockID("dreadlandsGrass");
IDRegistry.genBlockID("dreadlandsDirt");
Block.createBlock("dreadlandsGrass", [
    { name: "Dreadlands Grass", texture: [["dreadlands_dirt", 0], ["dreadlands_grass_top", 0], ["dreadlands_grass_side", 0]], inCreative: true }
], BLOCK_TYPE_GRASS);
Block.createBlock("dreadlandsDirt", [
    { name: "DreadlandsDirt", texture: [["dreadlands_dirt", 0]], inCreative: true }
], BLOCK_TYPE_SAND);
ToolAPI.registerBlockMaterial(BlockID.dreadlandsGrass, "dirt", 0, false);
ToolAPI.registerBlockMaterial(BlockID.dreadlandsDirt, "dirt", 0, false);
Block.registerDropFunction(BlockID.dreadlandsGrass, function (coords, blockID, blockData, level, enchant, item, region) {
    if (enchant.silk)
        return [[blockID, 1, 0]];
    return [[BlockID.dreadlandsDirt, 1, 0]];
});
IDRegistry.genBlockID("shoggothOoze");
IDRegistry.genBlockID("shoggothBiomass");
Block.createBlock("shoggothOoze", [
    { name: "Shoggoth Ooze", texture: [["shoggoth_ooze", 0]], inCreative: true },
    { name: "Shoggoth Ooze", texture: [["shoggoth_ooze", 0]], inCreative: false },
    { name: "Shoggoth Ooze", texture: [["shoggoth_ooze", 0]], inCreative: false },
    { name: "Shoggoth Ooze", texture: [["shoggoth_ooze", 0]], inCreative: false },
    { name: "Shoggoth Ooze", texture: [["shoggoth_ooze", 0]], inCreative: false },
    { name: "Shoggoth Ooze", texture: [["shoggoth_ooze", 0]], inCreative: false },
    { name: "Shoggoth Ooze", texture: [["shoggoth_ooze", 0]], inCreative: false },
    { name: "Shoggoth Ooze", texture: [["shoggoth_ooze", 0]], inCreative: false },
], { base: 1, sound: "slime" });
ToolAPI.registerBlockMaterial(BlockID.shoggothOoze, "dirt", 0, false);
Block.registerDropFunction(BlockID.shoggothOoze, function (coords, blockID, blockData, level, enchant, item, region) {
    return [];
});
Block.registerPlaceFunction(BlockID.shoggothOoze, function (coords, item, block, player, region) {
    if (block.id == BlockID.shoggothOoze) {
        if (coords.side == 1 && block.data < 7) {
            region.setBlock(coords.x, coords.y, coords.z, BlockID.shoggothOoze, block.data + 1);
        }
        else {
            region.setBlock(coords.relative.x, coords.relative.y, coords.relative.z, BlockID.shoggothOoze, 0);
        }
        Entity.setCarriedItem(player, item.id, item.count - 1, item.data, item.extra);
    }
});
Callback.addCallback("DestroyBlock", function (coords, block, player) {
    var region = BlockSource.getDefaultForActor(player);
    if (region.getBlockId(coords.x, coords.y + 1, coords.z) == BlockID.shoggothOoze) {
        region.destroyBlock(coords.x, coords.y + 1, coords.z, true);
    }
});
Block.createBlock("shoggothBiomass", [
    { name: "Shoggoth Biomass", texture: [["shoggoth_biomass", 0]], inCreative: true }
], { base: 1, sound: "sand" });
ToolAPI.registerBlockDiggingLevel(BlockID.shoggothBiomass, "dirt", 1, false);
Block.registerDropFunction(BlockID.shoggothBiomass, function (coords, blockID, blockData, level, enchant) {
    if (level > 0)
        return [[blockID, 1, 0]];
    return [];
});
IDRegistry.genBlockID("monolithStone");
Block.createBlock("monolithStone", [
    { name: "Monolith Stone", texture: [["monolith_stone", 0]], inCreative: true }
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.monolithStone, "stone", 4, false);
var BIOME_CORALSWAMP = new CustomBiome("abyssal_coralswamp")
    .setGrassColor(0x00FFFF)
    .setFoliageColor(0x00FFFF)
    .setCoverBlock(2, 0)
    .setSurfaceBlock(1, 0)
    .setFillingBlock(3, 0);
Callback.addCallback("GenerateBiomeMap", function (chunkX, chunkZ, random, dimensionId, chunkSeed, worldSeed, dimensionSeed) {
    if (dimensionId != 0)
        return;
    var x = Math.floor(chunkX) * 16, z = Math.floor(chunkZ) * 16, biome = World.getBiomeMap(x + 8, z + 8);
    if (biome != 6 || biome != 134)
        return;
    if (GenerationUtils.getPerlinNoise(x + 8, y, z + 8, dimensionSeed, 1 / 256, 2) < .5 - 4 / Math.pow(256, 2))
        return;
    for (var xx = 0; xx < 16; xx++) {
        for (var zz = 0; zz < 16; zz++) {
            var noiseValue = GenerationUtils.getPerlinNoise(x + 8, 0, z + 8, dimensionSeed, 1 / 256, 2);
            if (noiseValue > .5)
                World.setBiome(xx, zz, BIOME_CORALSWAMP.id);
        }
    }
});
var BIOME_DARKLANDS = new CustomBiome("abyssal_darklands")
    .setGrassColor(0x191970)
    .setFoliageColor(0x191970)
    .setCoverBlock(BlockID.darklandsGrass, 0)
    .setSurfaceBlock(BlockID.darklandsStone, 0)
    .setFillingBlock(1, 0);
var BIOME_DARKHILLS = new CustomBiome("abyssal_darkhills")
    .setGrassColor(0x191970)
    .setFoliageColor(0x191970)
    .setCoverBlock(BlockID.darklandsGrass, 0)
    .setSurfaceBlock(BlockID.darklandsStone, 0)
    .setFillingBlock(1, 0);
Callback.addCallback("GenerateBiomeMap", function (chunkX, chunkZ, random, dimensionId, chunkSeed, worldSeed, dimensionSeed) {
    if (dimensionId != 0)
        return;
    var x = Math.floor(chunkX) * 16, y = Math.floor(chunkZ) * 16, biome = World.getBiomeMap(x + 8, y + 8), biomes = [1, 4, 27, 155], hills = [3, 131, 162, 20];
    for (var i in biomes) {
        if (biome = biomes[i]) {
            if (GenerationUtils.getPerlinNoise(x + 8, 0, z + 8, dimensionSeed, 1 / 256, 2) < .58 - 4 / Math.pow(256, 2))
                return;
            for (var xx = 0; xx < 16; xx++) {
                for (var zz = 0; zz < 16; zz++) {
                    var noiseValue = GenerationUtils.getPerlinNoise(x + 8, 0, z + 8, dimensionSeed, 1 / 256, 2);
                    if (noiseValue > .65)
                        World.setBiomeMap(xx, zz, BIOME_DARKLANDS.id);
                }
            }
        }
    }
    for (var i in hills) {
        if (biome == hills[i]) {
            if (GenerationUtils.getPerlinNoise(x + 8, 0, z + 8, dimensionSeed, 1 / 256, 2) < .8 - 4 / Math.pow(256, 2))
                return;
            for (var xx = 0; xx < 16; xx++) {
                for (var zz = 0; zz < 16; zz++) {
                    var noiseValue = GenerationUtils.getPerlinNoise(x + 8, 0, z + 8, dimensionSeed, 1 / 256, 2);
                    if (noiseValue > .8)
                        World.setBiomeMap(x, z, BIOME_DARKHILLS.id);
                }
            }
        }
    }
});
//TODO
var AbyssalWasteland = new Dimensions.CustomDimension("Abyssal Wasteland", 1974)
    .setSkyColor(0, 2.55, 2.55)
    .setFogColor(0, 2.55, 2.55)
    .setCloudColor(0, 2.55, 2.55)
    .setGenerator(Dimensions.newGenerator({
    layers: [
        {
            minY: 42, maxY: 64,
            yConversion: [[0, 0]],
            material: { base: 8 }
        },
        {
            minY: 0, maxY: 256,
            yConversion: [
                [1.5, -0.8],
                [.6, -.4],
                [0, .85],
                [.5, -.5],
                [1.5, -1]
            ],
            material: {
                base: BlockID.abyssalStone,
                surface: {
                    id: BlockID.abyssalSand, data: 0, width: 4
                },
                cover: BlockID.fusedAbyssalSand
            },
            noise: {
                octaves: {
                    count: 3, scale: 126
                }
            }
        },
        {
            minY: 0, maxY: 1,
            yConversion: [[0, 0]],
            material: { base: 7 }
        }
    ]
}));
PortalUtils.newPortalBlock("abyssalWasteland", ["abyssal_wasteland"], BlockID.abyssalWasteland, { type: "v-plane", frameId: BlockID.abyssalStone }, AbyssalWasteland.id, false);
Block.registerEntityInsideFunctionForID(BlockID.abyssalWasteland, function (blockCoords, block, entity) {
    var pos = Entity.getPosition(entity);
    if (Math.abs(blockCoords.x - pos.x) <= 0.5 &&
        Math.abs(blockCoords.y - pos.y) <= 0.5 &&
        Math.abs(blockCoords.z - pos.z) <= 0.5) {
        java.lang.Thread.sleep(4000);
        if (Entity.getDimension(entity) !== AbyssalWasteland.id) {
            Dimensions.transfer(entity, AbyssalWasteland.id);
        }
        else
            Dimensions.transfer(entity, 0);
    }
});
var AbyssalWastelandPortalShape = new PortalShape();
AbyssalWastelandPortalShape.setPortalId(BlockID.abyssalWasteland);
AbyssalWastelandPortalShape.setFrameIds(BlockID.abyssalStone);
AbyssalWastelandPortalShape.setMinSize(2, 3);
Callback.addCallback("DestroyBlock", function (coords, block, player) {
    if (block.id == BlockID.abyssalStone || block.id == BlockID.abyssalWasteland) {
        DimensionHelper.eliminateIncorrectPlacedPortals(block, BlockID.abyssalWasteland, [BlockID.abyssalStone]);
    }
});
Callback.addCallback("CustomDimensionTransfer", function (entity, from, to) {
    if (to == AbyssalWasteland.id) {
        // let region = BlockSource.getCurrentWorldGenRegion();
        var region = BlockSource.getDefaultForDimension(to.id); //I think it'll be better
        var pos = Entity.getPosition(entity);
        var surf_1 = GenerationUtils.findSurface(pos.x, 92, pos.z);
        Updatable.addUpdatable({
            age: 0,
            update: function () {
                Entity.setPosition(entity, surf_1.x, surf_1.y + 2, surf_1.z);
                this.remove = this.age++ > 5;
            }
        });
    }
});
//wtf is that saver scope ???
var AbyssalWastelandChain1 = new Structure("abyssalwasteland_chains_1");
var AbyssalWastelandChain2 = new Structure("abyssalwasteland_chains_2");
var AbyssalWastelandDungeon1 = new Structure("abyssalwasteland_dungeon_1");
var AbyssalWastelandDungeon2 = new Structure("abyssalwasteland_dungeon_2");
Callback.addCallback("GenerateCustomDimensionChunk", function (chunkX, chunkZ, random, dimensionId) {
    if (dimensionId == AbyssalWasteland.id) {
        UniqueGen.generateOreInDimension(BlockID.oreIronAbyssal, 0, chunkX, chunkZ, random, {
            veinCounts: 7,
            minY: 12, maxY: 74,
            size: randomInt(1, 5),
            mode: true,
            check: [BlockID.abyssalStone]
        });
        UniqueGen.generateOreInDimension(BlockID.oreGoldAbyssal, 0, chunkX, chunkZ, random, {
            veinCounts: 7,
            minY: 12, maxY: 67,
            size: randomInt(1, 5),
            mode: true,
            check: [BlockID.abyssalStone]
        });
        UniqueGen.generateOreInDimension(BlockID.oreDiamondAbyssal, 0, chunkX, chunkZ, random, {
            veinCounts: 5,
            minY: 12, maxY: 67,
            size: randomInt(1, 5),
            mode: true,
            check: [BlockID.abyssalStone]
        });
        UniqueGen.generateOreInDimension(BlockID.oreNitreAbyssal, 0, chunkX, chunkZ, random, {
            veinCounts: 8,
            minY: 12, maxY: 64,
            size: randomInt(1, 6),
            mode: true,
            check: [BlockID.abyssalStone]
        });
        UniqueGen.generateOreInDimension(BlockID.oreCoraliumPearlescent, 0, chunkX, chunkZ, random, {
            veinCounts: 7,
            minY: 4, maxY: 56,
            size: randomInt(1, 4),
            mode: true,
            check: [BlockID.abyssalStone]
        });
        var region = BlockSource.getDefaultForDimension(AbyssalWasteland.id);
        var coords = GenerationUtils.randomCoords(chunkX, chunkZ);
        coords = GenerationUtils.findSurface(coords.x, 85, coords.z);
        if (coords.y < 45)
            return;
        if (random.nextFloat() < .01)
            AbyssalWastelandChain1.build(coords.x, coords.y + randomInt(2, 26), coords.z, Structure.ROTATE_Y, random, region);
        if (random.nextFloat() < .008)
            AbyssalWastelandChain2.build(coords.x, coords.y + randomInt(2, 26), coords.z, Structure.ROTATE_Y, random, region);
        if (random.nextFloat() < .05)
            AbyssalWastelandDungeon1.build(coords.x, coords.y - 5, coords.z, Structure.ROTATE_Y, random, region);
        if (random.nextFloat() < .04)
            AbyssalWastelandDungeon2.build(coords.x, coords.y - 5, coords.z, Structure.ROTATE_Y, random, region);
    }
});
var Dreadlands = new Dimensions.CustomDimension("Dreadlands", 1975)
    .setSkyColor(1.78, .34, .34)
    .setFogColor(1.39, 0, 0)
    .setCloudColor(1.39, 0, 0)
    .setGenerator(Dimensions.newGenerator({
    layers: [
        {
            minY: 63, maxY: 70,
            yConversion: [[0, 0]],
            material: {
                base: BlockID.dreadstone
            }
        },
        {
            minY: 0, maxY: 256,
            yConversion: [
                [1.5, -.8], [.6, -.4], [0, .92],
                [.5, -.4], [1.5, -1]
            ],
            material: {
                base: BlockID.dreadstone,
                surface: {
                    id: BlockID.dreadlandsDirt,
                    data: 0,
                    width: 4
                },
                cover: BlockID.dreadlandsGrass
            },
            noise: {
                octaves: {
                    count: 3,
                    scale: 85
                }
            }
        },
        {
            minY: 0, maxY: 1,
            yConversion: [[0, 0]],
            material: {
                base: 7
            }
        }
    ]
}));
PortalUtils.newPortalBlock("dreadlands", ["dreadlands", 0], BlockID.dreadlands, { type: "v-plane", frameId: BlockID.dreadstone }, Dreadlands.id, false);
Block.registerEntityInsideFunctionForID(BlockID.dreadlands, function (coords, block, entity) {
    var pos = Entity.getPosition(entity);
    if (Math.abs(blockCoords.x - pos.x) <= 0.5 &&
        Math.abs(blockCoords.y - pos.y) <= 0.5 &&
        Math.abs(blockCoords.z - pos.z) <= 0.5) {
        java.lang.Thread.sleep(4000);
        if (Entity.getDimension(entity) !== Dreadlands.id) {
            Dimensions.transfer(entity, Dreadlands.id);
        }
        else
            Dimensions.transfer(entity, 0);
    }
});
PortalUtils.newPortalBlock("dreadlands", ["dreadlands", 0], BlockID.dreadlands, { type: "v-plane", frameId: BlockID.dreadstone }, Dreadlands.id, false);
var DreadlandsPortalShape = new PortalShape();
DreadlandsPortalShape.setPortalId(BlockID.dreadlands);
DreadlandsPortalShape.setFrameIds(BlockID.dreadstone);
DreadlandsPortalShape.setMinSize(2, 3);
Callback.addCallback("DestroyBlock", function (coords, block, player) {
    if (block.id == BlockID.dreadstone || block.id == BlockID.dreadlands) {
        DimensionHelper.eliminateIncorrectPlacedPortals(coords, BlockID.dreadlands, [BlockID.dreadstone]);
    }
});
Callback.addCallback("CustomDimensionTransfer", function (player, from, to) {
    if (to == Dreadlands.id) {
        var region = BlockSource.getDefaultForDimension(Dreadlands.id);
        var pos_1 = Entity.getPosition(player);
        pos_1 = GenerationUtils.findSurface(pos_1.x, 92, pos_1.z);
        Updatable.addUpdatable({
            age: 0,
            update: function () {
                Entity.setPosition(player, pos_1.x, pos_1.y + 2, pos_1.z);
                this.remove = this.age++ > 5;
            }
        });
    }
});
//wtf is saver scope
Callback.addCallback("GenerateCustomDimensionChunk", function (chunkX, chunkZ, random, dimensionId) {
    if (dimensionId == Dreadlands.id) {
        UniqueGen.generateOreInDimension(BlockID.oreDreadlandsAbyssalnite, 0, chunkX, chunkZ, random, {
            veinCounts: 7,
            minY: 10,
            maxY: 58,
            size: randomInt(1, 5),
            mode: true,
            check: [BlockID.dreadstone]
        });
        UniqueGen.generateOreInDimension(BlockID.oreDreadedAbyssalnite, 0, chunkX, chunkZ, random, {
            veinCounts: 5,
            minY: 10,
            maxY: 40,
            size: randomInt(1, 3),
            mode: true,
            check: [BlockID.dreadstone]
        });
    }
});
//TODO structures
var Omothol = new Dimensions.CustomDimension("Omothol", 1976)
    .setSkyColor(0, 0, 0)
    .setFogColor(0, 0, 0)
    .setCloudColor(0, 0, 0)
    .setGenerator(Dimensions.newGenerator({
    layers: [
        {
            minY: 0, maxY: 256,
            yConversion: [
                [0, -.8], [.6, -.7], [0, .85],
                [.3, -.5], [1.5, -1]
            ],
            material: {
                base: BlockID.omotholStone,
                surface: {
                    id: BlockID.omotholStone,
                    data: 0,
                    width: 4
                },
                cover: BlockID.omotholStone
            },
            noise: {
                octaves: {
                    count: 3, scale: 55
                }
            }
        },
        {
            minY: 0, maxY: 1,
            yConversion: [[0, 0]],
            material: {
                base: 7
            }
        }
    ]
}));
PortalUtils.newPortalBlock("omothol", ["omothol", 0], BlockID.omothol, { type: "v-plane", frameId: BlockID.omotholStone }, Omothol.id, false);
Block.registerEntityInsideFunctionForID(BlockID.omothol, function (coords, block, entity) {
    var pos = Entity.getPosition(entity);
    if (Math.abs(blockCoords.x - pos.x) <= 0.5 &&
        Math.abs(blockCoords.y - pos.y) <= 0.5 &&
        Math.abs(blockCoords.z - pos.z) <= 0.5) {
        java.lang.Thread.sleep(4000);
        if (Entity.getDimension(entity) !== Omothol.id) {
            Dimensions.transfer(entity, Omothol.id);
        }
        else
            Dimensions.transfer(entity, 0);
    }
});
var OmotholPortalShape = new PortalShape();
OmotholPortalShape.setPortalId(BlockID.omothol);
OmotholPortalShape.setFrameIds(BlockID.omotholStone);
OmotholPortalShape.setMinSize(2, 3);
Callback.addCallback("DestroyBlock", function (coords, block, player) {
    if (block.id == BlockID.omotholStone || block.id == BlockID.omothol) {
        DimensionHelper.eliminateIncorrectPlacedPortals(coords, BlockID.omothol, [BlockID.omotholStone]);
    }
});
Callback.addCallback("CustomDimensionTransfer", function (entity, from, to) {
    if (to == Omothol.id) {
        var region = BlockSource.getDefaultForDimension(Omothol.id);
        var pos_2 = Entity.getPosition(entity);
        pos_2 = GenerationUtils.findSurface(pos_2.x, 92, pos_2.z);
        Updatable.addUpdatable({
            age: 0,
            update: function () {
                Entity.setPosition(player, pos_2.x, pos_2.y + 2, pos_2.z);
                this.remove = this.age++ > 5;
            }
        });
    }
});
var AbyssalCraftItems = [];
/**@param {string} name */
function quickCreateItem(name) {
    var namee = name;
    // if(name.indexOf("'") !== -1) while(name.indexOf("'") !== -1) name[name.indexOf("'")] = "_"; 
    // more advanced operation, if there is more than one such character
    // if(name.indexOf("-") !== -1) while(name.indexOf("-") !== -1) name[name.indexOf("-")] = "_";
    if (name.indexOf("'") !== -1)
        name[name.indexOf("'")] = "_";
    if (name.indexOf("-") !== -1)
        name[name.indexOf("-")] = "_";
    var id = name.split(' ');
    for (var i in id)
        id[i] = (i == 0 ? id[i][0].toLowerCase() : id[i][0].toUpperCase()) + id[i].slice(1, id[1].length);
    id = id.join('');
    var texture = name.toLowerCase().split(' ').join('_');
    IDRegistry.genItemID(id);
    var isTech = id.indexOf("nomicon") !== -1 || id.indexOf("Charm") !== -1 || id.indexOf("Antidote") !== -1;
    Item.createItem(id, namee, { name: texture }, { stack: 64 });
    AbyssalCraftItems.push(ItemID[id]);
}
var AbyssalCraftItemNames = [
    "Oblivion Catalyst", "Powerstone Tracker", "Eye of The Abyss", "Dreaded Shard of Abyssalnite", "Dreaded Chunk of Abyssalnite",
    "Chunk of Abyssalnite", "Abyssalnite Ingot", "Coralium Gem", "Coralium Gem Cluster", "Coralium Pearl", "Chunk of Coralium",
    "Refined Coralium Ingot", "Coralium Plate", "Cobblestone Upgrade Kit", "Iron Upgrade Kit", "Gold Upgrade Kit", "Diamond Upgrade Kit",
    "Abyssalnite Upgrade Kit", "Coralium Upgrade Kit", "Dreadium Upgrade Kit", "Ethaxium Upgrade Kit", "Iron Plate", "Dirty Plate",
    "Washcloth", "Shadow Fragment", "Shadow Gem Shard", "Shadow Gem", "Shard of Oblivion", "Coralium Brick", "Dreadium Ingot",
    "Dread Fragment", "Carbon Cluster", "Dense Carbon Cluster", "Methane", "Nitre", "Sulfur", "Dread Cloth", "Dreadium Plate",
    "Dreadium Katana Blade", "Dread-plagued Gateway Key", "Tin Ingot", "Copper Ingot", "Anti-Bone", "Ethaxium Brick", "Ethaxium Ingot",
    "Life Crystal", "Eldritch Scale", "Necronomicon", "Abyssal Wasteland Necronomicon", "Dreadlands Necronomicon", "Omothol Necronomicon",
    "Abyssalnomicon", "Small Crystal Bag", "Medium Crystal Bag", "Large Crystal Bag", "Huge Crystal Bag", "Shoggoth Flesh",
    "Abyssal Shoggoth Flesh", "Dreaded Shoggoth Flesh", "Omothol Shoggoth Flesh", "Shadow Shoggoth Flesh", "Abyssalnite Nugget",
    "Refined Coralium Nugget", "Dreadium Nugget", "Ethaxium Nugget", "Abyssal Wasteland Essence", "Dreadlands Essence", "Omothol Essence",
    "Skin of The Abyssal Wasteland", "Skin of The Dreadlands", "Skin of Omothol", "Ritual Charm", "Cthulhu Charm", "Hastur Charm",
    "J'zahar Charm", "Azathoth Charm", "Nyarlathotep Charm", "Yog-Sothoth Charm", "Shub-Niggurath Charm", "Essence of The Gatekeeper",
    "Stone Tablet", "Abyssal Scroll", "Abyssal Unique Scroll", "Coralium Plague Antidote", "Dread Plague Antidote", "Cha'rcoal", "Configurator Shard"
];
for (var i in AbyssalCraftItemNames)
    quickCreateItem(AbyssalCraftItemNames[i]);
//simple name overrides
(function () {
    /**@param {number} id @param {string} color @param {string} information */
    var makeNameOverride = function (id, color, information) {
        Item.registerNameOverrideFunction(id, function (item, name) {
            name = (color !== null ? color : "") + name + (information !== null ? "\n§7" + information : "");
            return name;
        });
    };
    makeNameOverride(ItemID.oblivionCatalyst, Native.Color.DARK_RED, Translation.translate("This item contains incredible powers."));
    makeNameOverride(ItemID.eyeOfTheAbyss, Native.Color.AQUA, Translation.translate("Eye of Asorah, The Fallen."));
    makeNameOverride(ItemID.dreadedShardOfAbyssalnite, Native.Color.DARK_RED, null);
    makeNameOverride(ItemID.dreadedChunkOfAbyssalnite, Native.Color.DARK_RED, null);
    makeNameOverride(ItemID.abyssalniteIngot, Native.Color.DARK_AQUA, null);
    makeNameOverride(ItemID.coraliumPearl, Native.Color.AQUA, null);
    makeNameOverride(ItemID.refinedCoraliumIngot, Native.Color.AQUA, null);
    makeNameOverride(ItemID.cobblestoneUpgradeKit, null, Translation.translate("Wood To Cobblestone"));
    makeNameOverride(ItemID.ironUpgradeKit, null, Translation.translate("Cobblestone To Iron"));
    makeNameOverride(ItemID.goldUpgradeKit, null, Translation.translate("Iron To Gold"));
    makeNameOverride(ItemID.diamondUpgradeKit, null, Translation.translate("Gold To Diamond"));
    makeNameOverride(ItemID.abyssalniteUpgradeKit, null, Translation.translate("Diamond To Abyssalnite"));
    makeNameOverride(ItemID.coraliumUpgradeKit, null, Translation.translate("Abyssalnite To Coralium"));
    makeNameOverride(ItemID.dreadiumUpgradeKit, null, Translation.translate("Coralium To Dreadium"));
    makeNameOverride(ItemID.ethaxiumUpgradeKit, null, Translation.translate("Dreadium To Ethaxium"));
    makeNameOverride(ItemID.smallCrystalBag, null, Translation.translate("This bag holds crystallized elements"));
    makeNameOverride(ItemID.mediumCrystalBag, null, Translation.translate("This bag holds crystallized elements"));
    makeNameOverride(ItemID.largeCrystalBag, null, Translation.translate("This bag holds crystallized elements"));
    makeNameOverride(ItemID.hugeCrystalBag, null, Translation.translate("This bag holds crystallized elements"));
    makeNameOverride(ItemID.dreadiumIngot, Native.Color.DARK_RED, null);
    makeNameOverride(ItemID.dreadFragment, Native.Color.DARK_RED, null);
    makeNameOverride(ItemID.ethaxiumIngot, Native.Color.AQUA, null);
    makeNameOverride(ItemID.essenceOfTheGatekeeper, Native.Color.BLUE, Translation.translate("A mere fragment of J\'zahar.") + "\n§7" + Translation.translate("You can feel it pulsating with power."));
})();
(function () {
    /**@param {[string, number][]} entries*/
    var maxStack = function (entries) {
        for (var i in entries) {
            var entry = entries[i];
            Item.getItemById(entry[0]).setMaxStackSize(entry[1]);
        }
    };
    maxStack([
        ["eyeOfTheAbyss", 1], ["coraliumGemCluster", 16], ["cobblestoneUpgradeKit", 16], ["ironUpgradeKit", 16], ["goldUpgradeKit", 16],
        ["diamondUpgradeKit", 16], ["abyssalniteUpgradeKit", 16], ["coraliumUpgradeKit", 16], ["dreadiumUpgradeKit", 16], ["ethaxiumUpgradeKit", 16],
        ["washcloth", 1], ["necronomicon", 1], ["abyssalWastelandNecronomicon", 1], ["dreadlandsNecronomicon", 1], ["omotholNecronomicon", 1],
        ["abyssalnomicon", 1], ["smallCrystalBag", 1], ["mediumCrystalBag", 1], ["largeCrystalBag", 1], ["hugeCrystalBag", 1], ["stoneTablet", 1],
        ["coraliumPlagueAntidote", 1], ["dreadPlagueAntidote", 1]
    ]);
})();
Item.setGlint(ItemID.oblivionCatalyst, true);
Item.setGlint(ItemID.powerstoneTracker, true);
Item.addToCreative(ItemID.coraliumGemCluster, 1, 1, null);
Item.addToCreative(ItemID.coraliumGemCluster, 1, 2, null);
Item.addToCreative(ItemID.coraliumGemCluster, 1, 3, null);
Item.addToCreative(ItemID.coraliumGemCluster, 1, 4, null);
Item.addToCreative(ItemID.coraliumGemCluster, 1, 5, null);
Item.addToCreative(ItemID.coraliumGemCluster, 1, 6, null);
Item.addToCreative(ItemID.coraliumGemCluster, 1, 7, null);
Item.registerIconOverrideFunction(ItemID.coraliumGemCluster, function (item, isModUi) {
    return { name: "coralium_gem_cluster", data: item.data };
});
Item.registerNameOverrideFunction(ItemID.coraliumGemCluster, function (item, name) {
    name += "\n§7" + (item.data + 2) + Translation.translate(" Gems");
    return name;
});
Item.setMaxDamage(ItemID.washcloth, 20);
Item.registerNameOverrideFunction(ItemID.washcloth, function (item, name) {
    name += "\n§7" + Translation.translate("This item has been used ") + item.data + Translation.translate(" out of 20 times");
    return name;
});
(function () {
    /**@param {number} id @param {number} maxPE */
    var setupNecro = function (id, maxPE) {
        var extra = new ItemExtraData();
        extra.putInt("ACPotentialEnergy", 0);
        Item.addToCreative(id, 1, 0, extra.copy());
        extra.putInt("ACPotentialEnergy", maxPE);
        Item.addToCreative(id, 1, 0, extra.copy());
        Item.registerNameOverrideFunction(id, function (item, name) {
            name += "\n§7" + item.extra.getInt("ACPotentialEnergy") + "/" + maxPE + " PE";
            return name;
        });
    };
    setupNecro(ItemID.necronomicon, 5000);
    setupNecro(ItemID.abyssalWastelandNecronomicon, 10000);
    setupNecro(ItemID.dreadlandsNecronomicon, 20000);
    setupNecro(ItemID.omotholNecronomicon, 40000);
    setupNecro(ItemID.abyssalnomicon, 100000);
})();
(function () {
    //amplifiers: 0 - none, 1 - range, 2 - duration, 3 - power
    /**@param {number} id @param {string} deity */
    var setupCharm = function (id, deity) {
        var extra = new ItemExtraData();
        extra.putString("ACCharmDeity", deity);
        for (var i = 0; i < 4; i++) {
            extra.putInt("ACCharmAmplifier", i);
            Item.addToCreative(id, 1, 0, extra.copy());
        }
        var amplifiers = ["None", "Range", "Duration", "Power"];
        Item.registerNameOverrideFunction(id, function (item, name) {
            name += "\n§7" +
                Translation.translate("Amplifier: ") + Translation.translate(amplifiers[item.extra.getInt("ACCharmAmplifier")]) + "\n§7" +
                Translation.translate("Deity: ") + Translation.translate(deity);
            return name;
        });
    };
    setupCharm(ItemID.ritualCharm, "None");
    setupCharm(ItemID.cthulhuCharm, "Cthulhu");
    setupCharm(ItemID.hasturCharm, "Hastur");
    setupCharm(ItemID.j_zaharCharm, "J\'zahar");
    setupCharm(ItemID.azathothCharm, "Azathoth");
    setupCharm(ItemID.nyarlathotepCharm, "Nyarlathotep");
    setupCharm(ItemID.yog_sothothCharm, "Yog-Sothoth");
    setupCharm(ItemID.shub_niggurathCharm, "Shub-Niggurath");
})();
Item.registerIconOverrideFunction(ItemID.ritualCharm, function (item, isModUi) {
    var ampl = ["none", "range", "duration", "power"][item.extra.getInt("ACCharmAmplifier")];
    return { name: "ritual_charm_" + ampl, data: 0 };
});
(function () {
    var extra = new ItemExtraData();
    extra.putInt("ACPotentialEnergy", 0);
    extra.putInt("ACTabletStacks", 0);
    Item.addToCreative(ItemID.stoneTablet, 1, 1, extra.copy());
    Item.addToCreative(ItemID.stoneTablet, 1, 2, null);
    var render = new ICRender.Model();
    var model = new BlockRenderer.Model();
    model.addBox(3 / 16, 0, 1 / 16, 13 / 16, 1 / 16, 15 / 16, "monolith_stone", 0);
    model.addBox(7 / 32, 1 / 32, 3 / 32, 25 / 32, 3 / 32, 29 / 32, "monolith_stone", 0);
    render.addEntry(model);
    ItemModel.getFor(ItemID.stoneTablet, 0).setModel(render);
    ItemModel.getFor(ItemID.stoneTablet, 1).setModel(render).setGlintMaterial("entity_alphatest_glint_item:entity_alphatest");
    var renderCursed = new ICRender.Model();
    var modelCursed = new BlockRenderer.Model();
    modelCursed.addBox(3 / 16, 0, 1 / 16, 13 / 16, 1 / 16, 15 / 16, "monolith_stone", 0);
    modelCursed.addBox(7 / 32, 1 / 32, 3 / 32, 25 / 32, 3 / 32, 29 / 32, "monolith_stone", 0);
    modelCursed.addBox(3 / 16, 0, 1 / 16, 13 / 16, 1 / 16, 15 / 16, "curse_glint", 0);
    modelCursed.addBox(7 / 32, 1 / 32, 3 / 32, 25 / 32, 3 / 32, 29 / 32, "curse_glint", 0);
    renderCursed.addEntry(modelCursed);
    ItemModel.getFor(ItemID.stoneTablet, 2).setModel(renderCursed);
})();
Item.registerNameOverrideFunction(ItemID.stoneTablet, function (item, name) {
    switch (item.data) {
        case 0: return name;
        case 1: return name + "\n§7" + item.extra.getInt("ACPotentialEnergy") + " PE\n§7" + item.extra.getInt("ACTabletStacks") + " stacks";
        case 2: return name + "\n" + Native.Color.DARK_PURPLE + "Cursed";
    }
});
//Common scrolls by item data:
//0 - Basic, 1 - Lesser, 2 - Moderate, 3 - Greater
Item.addToCreative(ItemID.abyssalScroll, 1, 1, null);
Item.addToCreative(ItemID.abyssalScroll, 1, 2, null);
Item.addToCreative(ItemID.abyssalScroll, 1, 3, null);
Item.registerNameOverrideFunction(ItemID.abyssalScroll, function (item, name) {
    switch (item.data) {
        case 0: return Translation.translate("Basic Scroll");
        case 1: return Translation.translate("Lesser Scroll");
        case 2: return Translation.translate("Moderate Scroll");
        case 3: return Translation.translate("Greater Scroll");
    }
});
Item.registerIconOverrideFunction(ItemID.abyssalScroll, function (item, isModUi) {
    return { name: "common_scroll", data: item.data };
});
//Unique scrolls by item data:
//0 - Antimatter, 1 - Oblivion
Item.addToCreative(ItemID.abyssalUniqueScroll, 1, 1, null);
Item.registerNameOverrideFunction(ItemID.abyssalUniqueScroll, function (item, name) {
    switch (item.data) {
        case 0: return Translation.translate("Antimatter Scroll");
        case 1: return Translation.translate("Oblivion Scroll");
    }
});
Item.registerIconOverrideFunction(ItemID.abyssalUniqueScroll, function (item, isModUi) {
    return { name: "unique_scroll", data: item.data };
});
(function () {
    /**@param {number} id */
    var setupAntidote = function (id, texture) {
        var extra = new ItemExtraData();
        extra.putInt("ACAntidoteUses", 10);
        Item.addToCreative(id, 1, 0, extra);
        Item.registerNameOverrideFunction(id, function (item, name) {
            name += "\n§7" + item.extra.getInt("ACAntidoteUses") + Translation.translate(" uses left");
        });
        Item.registerIconOverrideFunction(id, function (item, isModUi) {
            var uses = item.extra.getInt("ACAntidoteUses");
            var data = null;
            switch (true) {
                case uses >= 9:
                    data = 0;
                    break;
                case uses < 9 && uses >= 7:
                    data = 1;
                    break;
                case uses < 7 && uses >= 5:
                    data = 2;
                    break;
                case uses < 5 && uses >= 3:
                    data = 3;
                    break;
                case uses < 3:
                    data = 4;
                    break;
            }
            return { name: texture, data: data };
        });
    };
    setupAntidote(ItemID.coraliumPlagueAntidote);
    setupAntidote(ItemID.dreadPlagueAntidote);
})();
Item.addToCreative(ItemID.configuratorShard, 1, 1, null);
Item.addToCreative(ItemID.configuratorShard, 1, 2, null);
Item.addToCreative(ItemID.configuratorShard, 1, 3, null);
Item.registerNameOverrideFunction(ItemID.configuratorShard, function (item, name) {
    return Translation.translate("Spirit Tablet Shard") + " #" + item.data;
});
Item.registerIconOverrideFunction(ItemID.configuratorShard, function (item, isModUi) {
    return { name: "configurator_shard", data: item.data };
});
Item.addCreativeGroup("ACItems", Translation.translate("AbyssalCraft Items"), AbyssalCraftItems);
Callback.addCallback("PostLoaded", function () {
    addShapedRecipe(ItemID.powerstoneTracker, 4, 0, ["ggg", "geg", "ggg"], ['g', ItemID.coraliumGem, 0, 'e', 381, 0]);
    addShapedRecipe(ItemID.abyssalniteIngot, 1, 0, ["nnn", "nnn", "nnn"], ['n', ItemID.abyssalniteNugget, 0]);
    addShapelessRecipe(ItemID.abyssalniteIngot, 9, 0, [[BlockID.blockAbyssalnite, 0]]);
    Recipes.addFurnace(ItemID.dreadedChunkOfAbyssalnite, 0, ItemID.abyssalniteIngot, 0);
    Recipes.addFurnace(ItemID.chunkOfAbyssalnite, 0, ItemID.abyssalniteIngot, 0);
    Recipes.addFurnace(BlockID.oreAbyssalnite, 0, ItemID.abyssalniteIngot, 0);
    Recipes.addFurnace(BlockID.oreDreadedAbyssalnite, 0, ItemID.abyssalniteIngot, 0);
    Recipes.addFurnace(BlockID.oreDreadlandsAbyssalnite, 0, ItemID.abyssalniteIngot, 0);
    for (var i = 0; i < 8; i++) {
        addShapelessRecipe(ItemID.coraliumGem, i + 2, 0, [[ItemID.coraliumGemCluster, i]]);
    }
    (function () {
        /**@param {number} count @param {number[]} crystals */
        var makeClusterRecipe = function (count, crystals) {
            var ingredients = [];
            for (var i in crystals) {
                var cr = crystals[i];
                if (cr == 1)
                    ingredients.push([ItemID.coraliumGem, 0]);
                else
                    ingredients.push([ItemID.coraliumGemCluster, cr - 2]);
            }
            addShapelessRecipe(ItemID.coraliumGemCluster, 1, count - 2, ingredients);
        };
        makeClusterRecipe(2, [1, 1]);
        makeClusterRecipe(3, [2, 1]);
        makeClusterRecipe(3, [1, 1, 1]);
        makeClusterRecipe(4, [2, 2]);
        makeClusterRecipe(4, [1, 1, 1, 1]);
        makeClusterRecipe(5, [2, 3]);
        makeClusterRecipe(5, [1, 1, 1, 1, 1]);
        makeClusterRecipe(6, [2, 2, 2]);
        makeClusterRecipe(6, [3, 3]);
        makeClusterRecipe(6, [1, 1, 1, 1, 1, 1]);
        makeClusterRecipe(7, [4, 3]);
        makeClusterRecipe(7, [1, 1, 1, 1, 1, 1, 1]);
        makeClusterRecipe(8, [2, 2, 2, 2]);
        makeClusterRecipe(8, [4, 4]);
        makeClusterRecipe(8, [1, 1, 1, 1, 1, 1, 1, 1]);
        makeClusterRecipe(9, [3, 3, 3]);
        makeClusterRecipe(9, [5, 4]);
        makeClusterRecipe(9, [1, 1, 1, 1, 1, 1, 1, 1, 1]);
    })();
    Recipes.addFurnace(BlockID.oreCoraliumPearlescent, 0, ItemID.coraliumPearl, 0);
    Recipes.addFurnace(BlockID.oreCoraliumInfused, 0, ItemID.coraliumPearl, 0);
    addShapedRecipe(ItemID.chunkOfCoralium, 1, 0, ["ccc", "csc", "ccc"], ['c', ItemID.coraliumGemCluster, 7, 's', BlockID.abyssalStone]);
    Recipes.addFurnace(ItemID.chunkOfCoralium, 0, ItemID.refinedCoraliumIngot, 0);
    addShapedRecipe(ItemID.refinedCoraliumIngot, 1, 0, ["nnn", "nnn", "nnn"], ['n', ItemID.refinedCoraliumNugget, 0]);
    addShapelessRecipe(ItemID.refinedCoraliumIngot, 9, 0, [[BlockID.blockRefinedCoralium, 0]]);
    addShapedRecipe(ItemID.coraliumPlate, 1, 0, ["ipi", "ipi", "ipi"], ['i', ItemID.refinedCoraliumIngot, 0, 'p', ItemID.coraliumPearl, 0]);
    addShapedRecipe(ItemID.cobblestoneUpgradeKit, 4, 0, ["wcc", "sf "], ['w', 5, -1, 'c', 4, 0, 's', 287, 0, 'f', 318, 0]);
    addShapedRecipe(ItemID.cobblestoneUpgradeKit, 4, 0, ["wcc", "sf "], ['w', BlockID.darklandsOakWoodPlanks, 0, 'c', 4, 0, 's', 287, 0, 'f', 318, 0]);
    addShapedRecipe(ItemID.cobblestoneUpgradeKit, 4, 0, ["wcc", "sf "], ['w', BlockID.dreadlandsWoodPlanks, 0, 'c', 4, 0, 's', 287, 0, 'f', 318, 0]);
    (function () {
        var materials = [4, 265, 266, 264, ItemID.abyssalniteIngot, ItemID.refinedCoraliumIngot, ItemID.dreadiumIngot, ItemID.ethaxiumIngot];
        var levels = ["cobblestone", "iron", "gold", "diamond", "abyssalnite", "coralium", "dreadium", "ethaxium"];
        for (var i in materials) {
            if (i == 0)
                continue;
            addShapedRecipe(ItemID[levels[i] + "UpgradeKit"], 1, 0, ["pn", "nu"], ['p', materials[i - 1], 0, 'n', materials[i], 0, 'u', ItemID[levels[i - 1] + "UpgradeKit"]]);
        }
    })();
    addShapedRecipe(ItemID.ironPlate, 2, 0, ["i", "i"], ['i', 265, 0]);
    Recipes.addShapeless({ id: ItemID.ironPlate, count: 1, data: 0 }, [{ id: ItemID.dirtyPlate, data: 0 }, { id: ItemID.washcloth, data: -1 }], function (api, field, result) {
        for (var i in field) {
            if (field[i].id == ItemID.washcloth) {
                field[i].data++;
                if (field[i].data >= Item.getMaxDamage(field[i].id)) {
                    field[i].id = field[i].count = field[i].data = 0;
                }
            }
            else
                api.decreaseFieldSlot(i);
        }
    });
    addShapedRecipe(ItemID.washcloth, 1, 0, ["ccc", "cwc", "ccc"], ['c', 30, 0, 'w', 35, 0]);
    addShapedRecipe(ItemID.shadowGemShard, 1, 0, ["fff", "fff", "fff"], ['f', ItemID.shadowFragment, 0]);
    addShapedRecipe(ItemID.shadowGem, 1, 0, ["sss", "sss", "sss"], ['s', ItemID.shadowGemShard, 0]);
    addShapelessRecipe(ItemID.shadowFragment, 9, 0, [[ItemID.shadowGemShard, 0]]);
    addShapelessRecipe(ItemID.shadowGemShard, 9, 0, [[ItemID.shadowGem, 0]]);
    addShapedRecipe(ItemID.shardOfOblivion, 1, 0, [" s ", "sgs", " s "], ['s', ItemID.shadowGem, 0, 'g', ItemID.transmutationGem, 0]);
});
var CRYSTAL_CLUSTERS_GROUP = [];
var CRYSTAL_PIECES_GROUP = [];
var CRYSTAL_SHARDS_GROUP = [];
var CRYSTAL_FRAGMENTS_GROUP = [];
var AbyssalCrystal = function (formula, material, color) {
    this.clusterTexture = "crystal_cluster";
    this.clusterAnimTexture = "crystal_cluster.anim.3";
    this.crystalTexture = "crystal_big";
    this.shardTexture = "crystal_medium";
    this.fragmentTexture = "crystal_small";
    this.formula = toChemicalFormule(formula);
    this.material = material;
    if (Array.isArray(color))
        this.color = color;
    else if (!color) {
        this.isWhite = true;
        this.color = null;
    }
    this.nameOverride = function (item, name) {
        name += "\n" + Translation.translate("Molecular Formula") + ": " + this.formula;
        return name;
    };
    this.generateTextures = function () {
        if (this.isWhite)
            return;
        else {
            var that_1 = this;
            (function (args) {
                for (var i in args) {
                    var arg = args[i];
                    var blockOrItem = arg === that_1.clusterTexture || arg === that_1.clusterAnimTexture;
                    TextureWorker.paintTexture({
                        bitmap: TextureWorker.TEXTURE_STANDART,
                        src: {
                            path: "assets/" + (blockOrItem ? "terrain-atlas/" : "items-opaque/"),
                            name: arg === that_1.clusterAnimTexture ? arg : arg + "_0"
                        },
                        color: that_1.color,
                        result: {
                            path: "assets/" + (blockOrItem ? "terrain-atlas/" : "items-opaque/"),
                            name: arg === that_1.clusterAnimTexture ? that_1.clusterTexture + "_" + that_1.material + ".anim.3" : arg + "_0"
                        }
                    });
                }
            })([this.clusterTexture, this.clusterAnimTexture, this.crystalTexture, this.shardTexture, this.fragmentTexture]);
            this.clusterTexture += "_" + this.material;
            this.clusterAnimTexture = this.clusterTexture + ".anim.3";
            this.crystalTexture += "_" + this.material;
            this.shardTexture += "_" + this.material;
            this.fragmentTexture += "_" + this.material;
        }
    };
    this.createCluster = function () {
        var blockID = "ACrystalCluster" + this.material;
        IDRegistry.genBlockID(blockID);
        Block.createBlock(blockID, [
            { name: "Crystallized " + this.material + " Cluster", texture: [[this.clusterTexture, 0]], inCreative: true }
        ], { base: 1, lightlevel: 15, sound: "stone" });
        this.clusterID = BlockID[blockID];
        CRYSTAL_CLUSTERS_GROUP.push(this.clusterID);
        ToolAPI.registerBlockMaterial(this.clusterID, "stone", 1, false);
        Block.setDestroyTime(this.clusterID, 30);
        Block.registerDropFunction(this.clusterID, function (coords, blockID, blockData, level, enchant, item, region) {
            if (level > 0)
                return [[blockID, 1, blockData]];
            return [];
        });
        Block.setShape(this.clusterID, 3 / 16, 0, 3 / 16, 13 / 16, 12 / 16, 13 / 16);
        Item.registerNameOverrideFunction(this.clusterID, this.nameOverride);
        var mesh = new RenderMesh(__dir__ + "models/crystalcluster.obj", "obj", null);
        mesh.setBlockTexture(this.clusterTexture, 0);
        BlockRenderer.setStaticICRender(this.clusterID, -1, new ICRender.Model(new BlockRenderer.Model(mesh)));
    };
    this.createPiece = function () {
        var itemID = "ACrystal" + this.material;
        IDRegistry.genItemID(itemID);
        Item.createItem(itemID, "Crystallized " + this.material, { name: this.crystalTexture, meta: 0 }, { stack: 64 });
        this.crystalID = ItemID[itemID];
        CRYSTAL_PIECES_GROUP.push(this.crystalID);
        Item.registerNameOverrideFunction(this.crystalID, this.nameOverride);
    };
    this.createShard = function () {
        var itemID = "ACrystalShard" + this.material;
        IDRegistry.genItemID(itemID);
        Item.createItem(itemID, "Crystallized " + this.material + " Shard", { name: this.shardTexture, meta: 0 }, { stack: 64 });
        this.shardID = ItemID[itemID];
        CRYSTAL_SHARDS_GROUP.push(this.shardID);
        Item.registerNameOverrideFunction(this.shardID, this.nameOverride);
    };
    this.createFragment = function () {
        var itemID = "ACrystalFragment" + this.material;
        IDRegistry.genItemID(itemID);
        Item.createItem(itemID, "Crystallized " + this.material + " Fragment", { name: this.fragmentTexture, meta: 0 }, { stack: 64 });
        this.fragmentID = ItemID[itemID];
        CRYSTAL_FRAGMENTS_GROUP.push(this.fragmentID);
        Item.registerNameOverrideFunction(this.fragmentID, this.nameOverride);
    };
    this.generateTextures();
    this.createCluster();
    this.createPiece();
    this.createShard();
    this.createFragment();
};
new AbyssalCrystal("Fe", "Iron");
new AbyssalCrystal("Au", "Gold", [234, 218, 0]);
new AbyssalCrystal("S", "Sulfur", [255, 255, 75]);
new AbyssalCrystal("C", "Carbon", [51, 51, 51]);
new AbyssalCrystal("O", "Oxygen");
new AbyssalCrystal("H", "Hydrogen");
new AbyssalCrystal("N", "Nitrogen");
new AbyssalCrystal("P", "Phosphorus", [175, 135, 33]);
new AbyssalCrystal("K", "Potassium");
new AbyssalCrystal("NO3", "Nitrate", [0, 0, 255]);
new AbyssalCrystal("CH4", "Methane", [0, 255, 0]);
new AbyssalCrystal("none", "Redstone", [255, 0, 0]);
new AbyssalCrystal("An", "Abyssalnite", [100, 0, 160]);
new AbyssalCrystal("Cor", "Coralium", [0, 255, 255]);
new AbyssalCrystal("Dr", "Dreadium", [140, 0, 0]);
new AbyssalCrystal("none", "Blaze", [234, 218, 0]);
new AbyssalCrystal("Sn", "Tin");
new AbyssalCrystal("Cu", "Copper", [220, 160, 0]);
new AbyssalCrystal("Si", "Silicon");
new AbyssalCrystal("Mg", "Magnesium");
new AbyssalCrystal("Al", "Aluminium");
new AbyssalCrystal("SiO2", "Silica");
new AbyssalCrystal("Al2O3", "Alumina");
new AbyssalCrystal("MgO", "Magnesia");
new AbyssalCrystal("Zn", "Zync");
new AbyssalCrystal("Ca", "Calcium");
new AbyssalCrystal("Be", "Beryllium");
new AbyssalCrystal("Be3Al2(SiO3)6", "Beryl");
Callback.addCallback("PostLoaded", function () {
    for (var i = 0; i < 3; i++) {
        var arr = [CRYSTAL_PIECES_GROUP, CRYSTAL_SHARDS_GROUP, CRYSTAL_FRAGMENTS_GROUP];
        for (var a in arr[i]) {
            if (i < 2) {
                Recipes.addShaped({ id: arr[i][a], count: 1, data: 0 }, [
                    "ccc",
                    "ccc",
                    "ccc"
                ], ['c', arr[i - 1][a], 0]);
            }
            if (i > 0) {
                Recipes.addShapeless({
                    id: arr[i + 1][a],
                    count: 9, data: 0
                }, [{
                        id: arr[i][a],
                        data: 0
                    }]);
            }
        }
    }
});
var AbyssalCraftCrystallizerCrystals = CRYSTAL_CLUSTERS_GROUP.concat(CRYSTAL_PIECES_GROUP, CRYSTAL_SHARDS_GROUP, CRYSTAL_FRAGMENTS_GROUP);
Item.addCreativeGroup("ACCrystallizerCrystals", Translation.translate("AbyssalCraft Crystallizer Crystals"), AbyssalCraftCrystallizerCrystals);
IDRegistry.genItemID("coraliumPlaguedFlesh");
IDRegistry.genItemID("coraliumPlaguedFleshOnABone");
IDRegistry.genItemID("MRE");
IDRegistry.genItemID("chickenOnAPlate");
IDRegistry.genItemID("porkchopOnAPlate");
IDRegistry.genItemID("beefOnAPlate");
IDRegistry.genItemID("fishOnAPlate");
IDRegistry.genItemID("friedEgg");
IDRegistry.genItemID("friedEggOnAPlate");
IDRegistry.genItemID("antiBeef");
IDRegistry.genItemID("antiChicken");
IDRegistry.genItemID("antiPork");
IDRegistry.genItemID("rottenAntiFlesh");
IDRegistry.genItemID("antiSpiderEye");
IDRegistry.genItemID("omotholGhoulFlesh");
IDRegistry.genItemID("antiPlaguedFlesh");
IDRegistry.genItemID("antiPlaguedFleshOnABone");
var AbyssalCraftFoodItems = [];
/**@param {string} str must look like "Name_foodValue_stack" */
function quickCreateFoodItem(str) {
    var name = str.split(" ");
    var ending = name[name.length - 1].split("_");
    var stackSize = parseInt(ending.pop());
    var foodValue = parseInt(ending.pop());
    name[name.length - 1] = ending;
    name = name.join(" ");
    var id = name.split(" ");
    for (var i in id)
        id[i] = (i == 0 ? id[i][0].toLowerCase() : id[i][0].toUpperCase()) + id[i].slice(1, id[1].length);
    id = id.join('');
    if (id.indexOf("-") !== -1)
        id[id.indexOf("-")] = "_";
    var texture = name.toLowerCase().split(" ").join("_");
    if (texture.indexOf("-") !== -1)
        texture[texture.indexOf("-")] = "_";
    IDRegistry.genItemID(id);
    Item.createFoodItem(id, name, { name: texture }, { stack: stackSize, isTech: false, food: foodValue });
    AbyssalCraftFoodItems.push(ItemID[id]);
}
var AbyssalCraftFoodItemNames = [
    "Coralium-plagued Flesh_2_64", "Coralium-plagued Flesh on a Bone_2_64", "MRE_20_4",
    "Chicken on A Plate_9_4", "Porkchop on A Plate_12_4", "Beef on A Plate_12_4", "Fish on A Plate_8_4",
    "Fried Egg_5_64", "Fried Egg on A Plate_8_4", "Anti-Beef_0_64", "Anti-Chicken_0_64", "Anti-Pork_0_64",
    "Rotten Anti-Flesh_0_64", "Anti-Spider Eye_0_64", "Omothol Ghoul Flesh_3_64", "Anti-plagued Flesh_0_64",
    "Anti-plagued Flesh on a Bone_0_64"
];
for (var i in AbyssalCraftFoodItemNames)
    quickCreateFoodItem(AbyssalCraftFoodItemNames[i]);
Callback.addCallback("FoodEaten", function (food, ratio, player) {
    var item = Entity.getCarriedItem(player);
    var actor = new PlayerActor(player);
    if (item.id == ItemID.coralium_plaguedFleshOnABone) {
        actor.addItemToInventory(352, 1, 0);
    }
    else if (item.id == ItemID.anti_plaguedFleshOnABone) {
        actor.addItemToInventory(ItemID.anti_bone, 1, 0);
    }
    if ([ItemID.MRE, ItemID.chickenOnAPlate, ItemID.porkchopOnAPlate, ItemID.beefOnAPlate, ItemID.fishOnAPlate, ItemID.friedEggOnAPlate].indexOf(item.id) !== -1) {
        actor.addItemToInventory(ItemID.dirtyPlate, 1, 0);
    }
    if (item.id == ItemID.coralium_plaguedFlesh || item.id == ItemID.coralium_plaguedFleshOnABone) {
        Entity.addEffect(player, Native.PotionEffect.confusion, 1, 600, true, false);
        Entity.addEffect(player, Native.PotionEffect.hunger, 2, 600, true, false);
    }
    if ([ItemID.rottenAnti_flesh, ItemID.anti_spiderEye, ItemID.anti_plaguedFlesh, ItemID.anti_plaguedFleshOnABone].indexOf(item.id) !== -1) {
        Entity.addEffect(player, Native.PotionEffect.regeneration, 1, 600, true, false);
        Entity.addEffect(player, Native.PotionEffect.saturation, 2, 600, true, false);
    }
    if ([ItemID.anti_beef, ItemID.anti_chicken, ItemID.anti_pork].indexOf(item.id) !== -1) {
        Entity.addEffect(player, Native.PotionEffect.hunger, 2, 600, true, false);
    }
    if (item.id == ItemID.omotholGhoulFlesh) {
        Entity.addEffect(player, Native.PotionEffect.nightVision, 1, 30, true, false);
        Entity.addEffect(player, Native.PotionEffect.blindness, 1, 30, true, false);
        Entity.addEffect(player, Native.PotionEffect.weakness, 1, 100, true, false);
        Entity.addEffect(player, Native.PotionEffect.confusion, 1, 150, true, false);
        Entity.addEffect(player, Native.PotionEffect.hunger, 2, 200, true, false);
    }
});
Item.addCreativeGroup("ACFoodstuffs", Translation.translate("AbyssalCraft Foodstuffs"), AbyssalCraftFoodItems);
//=============//
// ABYSSALNITE //
//=============//
IDRegistry.genItemID("abyssalniteHelmet");
Item.createArmorItem("abyssalniteHelmet", "Abyssalnite Helmet", { name: "abyssalnite_helmet" }, { type: "helmet", armor: 3, durability: 385, texture: "armor/abyssalnite_1.png", isTech: false });
IDRegistry.genItemID("abyssalniteChestplate");
Item.createArmorItem("abyssalniteChestplate", "Abyssalnite Chestplate", { name: "abyssalnite_chestplate" }, { type: "chestplate", armor: 8, durability: 560, texture: "armor/abyssalnite_1.png", isTech: false });
IDRegistry.genItemID("abyssalniteLeggings");
Item.createArmorItem("abyssalniteLeggings", "Abyssalnite Leggings", { name: "abyssalnite_leggings" }, { type: "leggings", armor: 6, durability: 525, texture: "armor/abyssalnite_2.png", isTech: false });
IDRegistry.genItemID("abyssalniteBoots");
Item.createArmorItem("abyssalniteBoots", "Abyssalnite Boots", { name: "abyssalnite_boots" }, { type: "boots", armor: 3, durability: 455, texture: "armor/abyssalnite_1.png", isTech: false });
Item.addRepairItemIds(ItemID.abyssalniteHelmet, [ItemID.abyssalniteHelmet]);
Item.addRepairItemIds(ItemID.abyssalniteChestplate, [ItemID.abyssalniteChestplate]);
Item.addRepairItemIds(ItemID.abyssalniteLeggings, [ItemID.abyssalniteLeggings]);
Item.addRepairItemIds(ItemID.abyssalniteBoots, [ItemID.abyssalniteBoots]);
//=====================//
// DREADED ABYSSALNITE //
//=====================//
IDRegistry.genItemID("dreadedAbyssalniteHelmet");
Item.createArmorItem("dreadedAbyssalniteHelmet", "Dreaded Abyssalnite Helmet", { name: "dreaded_abyssalnite_helmet" }, { type: "helmet", armor: 3, durability: 396, texture: "armor/dreaded_abyssalnite_1.png", isTech: false });
IDRegistry.genItemID("dreadedAbyssalniteChestplate");
Item.createArmorItem("dreadedAbyssalniteChestplate", "Dreaded Abyssalnite Chestplate", { name: "dreaded_abyssalnite_chestplate" }, { type: "chestplate", armor: 8, durability: 576, texture: "armor/dreaded_abyssalnite_1.png", isTech: false });
IDRegistry.genItemID("dreadedAbyssalniteLeggings");
Item.createArmorItem("dreadedAbyssalniteLeggings", "Dreaded Abyssalnite Leggings", { name: "dreaded_abyssalnite_leggings" }, { type: "leggings", armor: 6, durability: 540, texture: "armor/dreaded_abyssalnite_2.png", isTech: false });
IDRegistry.genItemID("dreadedAbyssalniteBoots");
Item.createArmorItem("dreadedAbyssalniteBoots", "Dreaded Abyssalnite Boots", { name: "dreaded_abyssalnite_boots" }, { type: "boots", armor: 3, durability: 468, texture: "armor/dreaded_abyssalnite_1.png", isTech: false });
Item.addRepairItemIds(ItemID.dreadedAbyssalniteHelmet, [ItemID.dreadedAbyssalniteHelmet]);
Item.addRepairItemIds(ItemID.dreadedAbyssalniteChestplate, [ItemID.dreadedAbyssalniteChestplate]);
Item.addRepairItemIds(ItemID.dreadedAbyssalniteLeggings, [ItemID.dreadedAbyssalniteLeggings]);
Item.addRepairItemIds(ItemID.dreadedAbyssalniteBoots, [ItemID.dreadedAbyssalniteBoots]);
//helmet - night vision
//chestplate, leggings, boots - fire resistance IV
Armor.registerOnTickListener(ItemID.dreadedAbyssalniteHelmet, function (item, slot, player) {
    Entity.addEffect(player, 16, 1, 260, true, true);
});
Armor.registerOnTickListener(ItemID.dreadedAbyssalniteChestplate, function (item, slot, player) {
    Entity.addEffect(player, 12, 4, 40, true, true);
});
Armor.registerOnTickListener(ItemID.dreadedAbyssalniteLeggings, function (item, slot, player) {
    Entity.addEffect(player, 12, 4, 40, true, true);
});
Armor.registerOnTickListener(ItemID.dreadedAbyssalniteBoots, function (item, slot, player) {
    Entity.addEffect(player, 12, 4, 40, true, true);
});
//==================//
// REFINED CORALIUM //
//==================//
IDRegistry.genItemID("refinedCoraliumHelmet");
Item.createArmorItem("refinedCoraliumHelmet", "Refined Coralium Helmet", { name: "refined_coralium_helmet" }, { type: "helmet", armor: 3, durability: 407, texture: "armor/refined_coralium_1.png", isTech: false });
IDRegistry.genItemID("refinedCoraliumChestplate");
Item.createArmorItem("refinedCoraliumChestplate", "Refined Coralium Chestplate", { name: "refined_coralium_chestplate" }, { type: "chestplate", armor: 8, durability: 592, texture: "armor/refined_coralium_1.png", isTech: false });
IDRegistry.genItemID("refinedCoraliumLeggings");
Item.createArmorItem("refinedCoraliumLeggings", "Refined Coralium Leggings", { name: "refined_coralium_leggings" }, { type: "leggings", armor: 6, durability: 555, texture: "armor/refined_coralium_2.png", isTech: false });
IDRegistry.genItemID("refinedCoraliumBoots");
Item.createArmorItem("refinedCoraliumBoots", "Refined Coralium Boots", { name: "refined_coralium_boots" }, { type: "boots", armor: 3, durability: 481, texture: "armor/refined_coralium_1.png", isTech: false });
Item.addRepairItemIds(ItemID.refinedCoraliumHelmet, [ItemID.refinedCoraliumHelmet]);
Item.addRepairItemIds(ItemID.refinedCoraliumChestplate, [ItemID.refinedCoraliumChestplate]);
Item.addRepairItemIds(ItemID.refinedCoraliumLeggings, [ItemID.refinedCoraliumLeggings]);
Item.addRepairItemIds(ItemID.refinedCoraliumBoots, [ItemID.refinedCoraliumBoots]);
//helmet - water breathing
//chestplate - resistance I
//boots - speed I
Armor.registerOnTickListener(ItemID.refinedCoraliumHelmet, function (item, slot, player) {
    Entity.addEffect(player, 13, 1, 20, true, true);
});
Armor.registerOnTickListener(ItemID.refinedCoraliumChestplate, function (item, slot, player) {
    Entity.addEffect(player, 11, 1, 20, true, true);
});
Armor.registerOnTickListener(ItemID.refinedCoraliumBoots, function (item, slot, player) {
    Entity.addEffect(player, 1, 1, 20, true, true);
});
//=================//
// PLATED CORALIUM //
//=================//
IDRegistry.genItemID("platedCoraliumHelmet");
Item.createArmorItem("platedCoraliumHelmet", "Plated Coralium Helmet", { name: "plated_coralium_helmet" }, { type: "helmet", armor: 4, durability: 605, texture: "armor/plated_coralium_1.png", isTech: false });
IDRegistry.genItemID("platedCoraliumChestplate");
Item.createArmorItem("platedCoraliumChestplate", "Plated Coralium Chestplate", { name: "plated_coralium_chestplate" }, { type: "chestplate", armor: 9, durability: 880, texture: "armor/plated_coralium_1.png", isTech: false });
IDRegistry.genItemID("platedCoraliumLeggings");
Item.createArmorItem("platedCoraliumLeggings", "Plated Coralium Leggings", { name: "plated_coralium_leggings" }, { type: "leggings", armor: 7, durability: 825, texture: "armor/plated_coralium_2.png", isTech: false });
IDRegistry.genItemID("platedCoraliumBoots");
Item.createArmorItem("platedCoraliumBoots", "Plated Coralium Boots", { name: "plated_coralium_boots" }, { type: "boots", armor: 4, durability: 715, texture: "armor/plated_coralium_1.png", isTech: false });
Item.addRepairItemIds(ItemID.platedCoraliumHelmet, [ItemID.platedCoraliumHelmet]);
Item.addRepairItemIds(ItemID.platedCoraliumChestplate, [ItemID.platedCoraliumChestplate]);
Item.addRepairItemIds(ItemID.platedCoraliumLeggings, [ItemID.platedCoraliumLeggings]);
Item.addRepairItemIds(ItemID.platedCoraliumBoots, [ItemID.platedCoraliumBoots]);
//helmet - night vision
//boots - speed II; speed III and water breathing while in water
Armor.registerOnTickListener(ItemID.platedCoraliumHelmet, function (item, slot, player) {
    Entity.addEffect(player, 16, 1, 260, true, true);
});
Armor.registerOnTickListener(ItemID.platedCoraliumBoots, function (item, slot, player) {
    var pos = Entity.getPosition(player);
    var region = BlockSource.getDefaultForActor(player);
    var down = region.getBlockId(pos.x, pos.y, pos.z);
    var up = region.getBlockId(pos.x, pos.y + 1, pos.z);
    if ((down == 8 || down == 9) || (up == 8 || up == 9)) {
        Entity.addEffect(player, 1, 3, 20, true, true);
        Entity.addEffect(player, 13, 1, 20, true, true);
    }
    else
        Entity.addEffect(player, 1, 2, 20, true, true);
});
//========//
// DEPTHS //
//========//
IDRegistry.genItemID("depthsHelmet");
Item.createArmorItem("depthsHelmet", "Visage of The Depths", { name: "depths_helmet" }, { type: "helmet", armor: 3, durability: 363, texture: "armor/depths_1.png", isTech: false });
IDRegistry.genItemID("depthsChestplate");
Item.createArmorItem("depthsChestplate", "Chestplate of The Depths", { name: "depths_chestplate" }, { type: "chestplate", armor: 8, durability: 528, texture: "armor/depths_1.png", isTech: false });
IDRegistry.genItemID("depthsLeggings");
Item.createArmorItem("depthsLeggings", "Legguards of The Depths", { name: "depths_leggings" }, { type: "leggings", armor: 6, durability: 495, texture: "armor/depths_2.png", isTech: false });
IDRegistry.genItemID("depthsBoots");
Item.createArmorItem("depthsBoots", "Boots of The Depths", { name: "depths_boots" }, { type: "boots", armor: 3, durability: 429, texture: "armor/depths_1.png", isTech: false });
Item.addRepairItemIds(ItemID.depthsHelmet, [ItemID.depthsHelmet]);
Item.addRepairItemIds(ItemID.depthsChestplate, [ItemID.depthsChestplate]);
Item.addRepairItemIds(ItemID.depthsLeggings, [ItemID.depthsLeggings]);
Item.addRepairItemIds(ItemID.depthsBoots, [ItemID.depthsBoots]);
//helmet - water breathing, night vision
//chestplate - resistance I
//leggings - jump boost II
//boots - speed II
Armor.registerOnTickListener(ItemID.depthsHelmet, function (item, slot, player) {
    Entity.addEffect(player, 16, 1, 260, true, true);
    Entity.addEffect(player, 13, 1, 20, true, true);
});
Armor.registerOnTickListener(ItemID.depthsChestplate, function (item, slot, player) {
    Entity.addEffect(player, 11, 1, 20, true, true);
});
Armor.registerOnTickListener(ItemID.depthsLeggings, function (item, slot, player) {
    Entity.addEffect(player, 8, 2, 20, true, true);
});
Armor.registerOnTickListener(ItemID.depthsBoots, function (item, slot, player) {
    Entity.addEffect(player, 1, 2, 20, true, true);
});
//==========//
// DREADIUM //
//==========//
IDRegistry.genItemID("dreadiumHelmet");
Item.createArmorItem("dreadiumHelmet", "Dreadium Helmet", { name: "dreadium_helmet" }, { type: "helmet", armor: 3, durability: 440, texture: "armor/dreadium_1.png", isTech: false });
IDRegistry.genItemID("dreadiumChestplate");
Item.createArmorItem("dreadiumChestplate", "Dreadium Chestplate", { name: "dreadium_chestplate" }, { type: "chestplate", armor: 8, durability: 640, texture: "armor/dreadium_1.png", isTech: false });
IDRegistry.genItemID("dreadiumLeggings");
Item.createArmorItem("dreadiumLeggings", "Dreadium Leggings", { name: "dreadium_leggings" }, { type: "leggings", armor: 6, durability: 600, texture: "armor/dreadium_2.png", isTech: false });
IDRegistry.genItemID("dreadiumBoots");
Item.createArmorItem("dreadiumBoots", "Dreadium Boots", { name: "dreadium_boots" }, { type: "boots", armor: 3, durability: 520, texture: "armor/dreadium_1.png", isTech: false });
Item.addRepairItemIds(ItemID.dreadiumHelmet, [ItemID.dreadiumHelmet]);
Item.addRepairItemIds(ItemID.dreadiumChestplate, [ItemID.dreadiumChestplate]);
Item.addRepairItemIds(ItemID.dreadiumLeggings, [ItemID.dreadiumLeggings]);
Item.addRepairItemIds(ItemID.dreadiumBoots, [ItemID.dreadiumBoots]);
//chestplate - resistance I
//boots - speed I
Armor.registerOnTickListener(ItemID.dreadiumChestplate, function (item, slot, player) {
    Entity.addEffect(player, 11, 1, 20, true, true);
});
Armor.registerOnTickListener(ItemID.dreadiumBoots, function (item, slot, player) {
    Entity.addEffect(player, 1, 1, 20, true, true);
});
//==================//
// DREADIUM SAMURAI //
//==================//
IDRegistry.genItemID("dreadiumSamuraiHelmet");
Item.createArmorItem("dreadiumSamuraiHelmet", "Dreadium Samurai Helmet", { name: "dreadium_samurai_helmet" }, { type: "helmet", armor: 3, durability: 495, texture: "armor/dreadium_samurai_1.png", isTech: false });
IDRegistry.genItemID("dreadiumSamuraiChestplate");
Item.createArmorItem("dreadiumSamuraiChestplate", "Dreadium Samurai Chestplate", { name: "dreadium_samurai_chestplate" }, { type: "chestplate", armor: 8, durability: 720, texture: "armor/dreadium_samurai_1.png", isTech: false });
IDRegistry.genItemID("dreadiumSamuraiLeggings");
Item.createArmorItem("dreadiumSamuraiLeggings", "Dreadium Samurai Leggings", { name: "dreadium_samurai_leggings" }, { type: "leggings", armor: 6, durability: 675, texture: "armor/dreadium_samurai_2.png", isTech: false });
IDRegistry.genItemID("dreadiumSamuraiBoots");
Item.createArmorItem("dreadiumSamuraiBoots", "Dreadium Samurai Boots", { name: "dreadium_samurai_boots" }, { type: "boots", armor: 3, durability: 585, texture: "armor/dreadium_samurai_1.png", isTech: false });
Item.addRepairItemIds(ItemID.dreadiumSamuraiHelmet, [ItemID.dreadiumSamuraiHelmet]);
Item.addRepairItemIds(ItemID.dreadiumSamuraiChestplate, [ItemID.dreadiumSamuraiChestplate]);
Item.addRepairItemIds(ItemID.dreadiumSamuraiLeggings, [ItemID.dreadiumSamuraiLeggings]);
Item.addRepairItemIds(ItemID.dreadiumSamuraiBoots, [ItemID.dreadiumSamuraiBoots]);
//helmet - night vision
//chestplate - strength I, resistance I
//leggings - fire resistance II
//boots - speed II
Armor.registerOnTickListener(ItemID.dreadiumSamuraiHelmet, function (item, slot, player) {
    Entity.addEffect(player, 16, 1, 260, true, true);
});
Armor.registerOnTickListener(ItemID.dreadiumSamuraiChestplate, function (item, slot, player) {
    Entity.addEffect(player, 5, 1, 20, true, true);
    Entity.addEffect(player, 11, 1, 20, true, true);
});
Armor.registerOnTickListener(ItemID.dreadiumSamuraiLeggings, function (item, slot, player) {
    Entity.addEffect(player, 12, 2, 20, true, true);
});
Armor.registerOnTickListener(ItemID.dreadiumSamuraiBoots, function (item, slot, player) {
    Entity.addEffect(player, 1, 2, 20, true, true);
});
//==========//
// ETHAXIUM //
//==========//
IDRegistry.genItemID("ethaxiumHelmet");
Item.createArmorItem("ethaxiumHelmet", "Ethaxium Helmet", { name: "ethaxium_helmet" }, { type: "helmet", armor: 3, durability: 550, texture: "armor/ethaxium_1.png", isTech: false });
IDRegistry.genItemID("ethaxiumChestplate");
Item.createArmorItem("ethaxiumChestplate", "Ethaxium Chestplate", { name: "ethaxium_chestplate" }, { type: "chestplate", armor: 8, durability: 800, texture: "armor/ethaxium_1.png", isTech: false });
IDRegistry.genItemID("ethaxiumLeggings");
Item.createArmorItem("ethaxiumLeggings", "Ethaxium Leggings", { name: "ethaxium_leggings" }, { type: "leggings", armor: 6, durability: 750, texture: "armor/ethaxium_2.png", isTech: false });
IDRegistry.genItemID("ethaxiumBoots");
Item.createArmorItem("ethaxiumBoots", "Ethaxium Boots", { name: "ethaxium_boots" }, { type: "boots", armor: 3, durability: 650, texture: "armor/ethaxium_1.png", isTech: false });
Item.addRepairItemIds(ItemID.ethaxiumHelmet, [ItemID.ethaxiumHelmet]);
Item.addRepairItemIds(ItemID.ethaxiumChestplate, [ItemID.ethaxiumChestplate]);
Item.addRepairItemIds(ItemID.ethaxiumLeggings, [ItemID.ethaxiumLeggings]);
Item.addRepairItemIds(ItemID.ethaxiumBoots, [ItemID.ethaxiumBoots]);
//boots - speed II
//on hurt - regeneration I, strength I, for 2 secs
Armor.registerOnTickListener(ItemID.ethaxiumBoots, function (item, slot, player) {
    Entity.addEffect(player, 1, 2, 20, true, true);
});
Armor.registerOnHurtListener(ItemID.ethaxiumHelmet, function (item, slot, player, value, type, attacker, bool1, bool2) {
    Entity.addEffect(player, 10, 1, 40, true, true);
    Entity.addEffect(player, 5, 1, 40, true, true);
});
Armor.registerOnHurtListener(ItemID.ethaxiumChestplate, function (item, slot, player, value, type, attacker, bool1, bool2) {
    Entity.addEffect(player, 10, 1, 40, true, true);
    Entity.addEffect(player, 5, 1, 40, true, true);
});
Armor.registerOnHurtListener(ItemID.ethaxiumLeggings, function (item, slot, player, value, type, attacker, bool1, bool2) {
    Entity.addEffect(player, 10, 1, 40, true, true);
    Entity.addEffect(player, 5, 1, 40, true, true);
});
Armor.registerOnHurtListener(ItemID.ethaxiumBoots, function (item, slot, player, value, type, attacker, bool1, bool2) {
    Entity.addEffect(player, 10, 1, 40, true, true);
    Entity.addEffect(player, 5, 1, 40, true, true);
});
// === COLORING NAME === //
(function () {
    var colorSet = function (id, color) {
        var arr = ["Helmet", "Chestplate", "Leggings", "Boots"];
        for (var i in arr) {
            var element = arr[i];
            Item.registerNameOverrideFunction(ItemID[id + element], function (item, name) {
                name = color + name;
                return name;
            });
        }
    };
    colorSet("abyssalnite", Native.Color.DARK_AQUA);
    colorSet("dreadedAbyssalnite", Native.Color.DARK_RED);
    colorSet("refinedCoralium", Native.Color.AQUA);
    colorSet("platedCoralium", Native.Color.GREEN);
    colorSet("depths", Native.Color.DARK_RED);
    colorSet("dreadium", Native.Color.DARK_RED);
    colorSet("dreadiumSamurai", Native.Color.DARK_RED);
    colorSet("ethaxium", Native.Color.AQUA);
})();
// ===================== //
//TODO crafting recipes
IDRegistry.genItemID("gatewayKey");
Item.createItem("gatewayKey", "Gateway Key", { name: "gateway_key" }, { stack: 1 });
Item.setToolRender(ItemID.gatewayKey, true);
Item.registerNameOverrideFunction(ItemID.gatewayKey, function (item, name) {
    return name + "\n§7" + Translation.translate("Click on the ground to \n§7create a portal. Infinite uses.");
});
IDRegistry.genItemID("");
(function () {
    function registerToolSet(damage, durability, efficiency, level, name, nameColor) {
        var _a;
        var material = { damage: damage, durability: durability, efficiency: efficiency, level: level };
        var tools = (_a = {},
            _a[name + " Sword"] = ToolType.sword,
            _a[name + " Pickaxe"] = ToolType.pickaxe,
            _a[name + " Axe"] = ToolType.axe,
            _a[name + " Shovel"] = ToolType.shovel,
            _a[name + " Hoe"] = ToolType.hoe,
            _a);
        for (var i in tools) {
            var n = i;
            var id = name.split(' ');
            for (var i_1 in id)
                id[i_1] = (i_1 == 0 ? id[i_1][0].toLowerCase() : id[i_1][0].toUpperCase()) + id[i_1].slice(1, id[1].length);
            id = id.join('');
            var texture = name.toLowerCase().split(' ').join('_');
            IDRegistry.genItemID(id);
            Item.createItem(id, n, { name: texture }, { stack: 1 });
            ToolLib.setTool(ItemID[id], material, tools[i]);
            if (typeof nameColor !== "undefined") {
                Item.registerNameOverrideFunction(ItemID[id], function (item, name) {
                    return nameColor + name;
                });
            }
        }
    }
    registerToolSet(2, 180, 8, 2, "Darkstone");
    registerToolSet(5, 1261, 10, 4, "Abyssalnite", Native.Color.DARK_AQUA);
    registerToolSet(6, 1800, 10, 4, "Refined Coralium", Native.Color.AQUA);
    registerToolSet(7, 2300, 10, 4, "Dreadium", Native.Color.DARK_RED);
    registerToolSet(9, 2800, 14, 4, "Ethaxium", Native.Color.AQUA);
})();
// IDRegistry.genItemID("soulSword");
// Item.createItem("soulSword", "Soul Reaper", {name: "soulReaper", meta: 0}, {stack: 1});
// ToolAPI.addToolMaterial("ssw", {durability: 2000, level: 6, efficiency: 6, damage: 20, enchantability: 14});
// ToolLib.setTool(ItemID.soulSword, "ssw", ToolType.sword);
// //Item.addRepairItemIds(ItemID.soulSword, [ItemID.soulG, ItemID.soulSword]);
// //Item.addRepairItemIds(ItemID.soulSword, [ItemID.ethIron, ItemID.soulSword]);
// IDRegistry.genItemID("caneJ");
// Item.createItem("caneJ", "Jzahar's Cane", {name: "SOTG", meta: 0}, {stack: 1});
// IDRegistry.genItemID("caneJr");
// Item.createItem("caneJr", "Jzahar's Cane", {name: "SOTG", meta: 0}, {stack: 1});
// var CaneM = new RenderMesh(__dir__ + "/models/Cane.obj","obj", {translate: [0, .18, 0], scale: [1.5, 1.5, 1.5]});
// ItemModel.getFor(ItemID.caneJ, 0).setModel(CaneM, "staff");
// ItemModel.getFor(ItemID.caneJr, 0).setModel(CaneM, "staff2");
// IDRegistry.genItemID("Katana");
// Item.createItem("Katana", "Dreaded Katana", {name: "SOTG", meta: 0}, {stack: 1});
// var KatanaM = new RenderMesh(__dir__ + "/models/Katana.obj","obj", {translate: [0.5, 0, 0.5], rotation: [0, Math.PI / 2, 0],  scale: [1.5, 1.5, 1.5]});
// ItemModel.getFor(ItemID.Katana, 0).setModel(KatanaM, "katana");
// ToolAPI.addToolMaterial("kt", {durability: 3000, level: 7, efficiency: 7, damage: 32, enchantability: 14});
// ToolLib.setTool(ItemID.Katana, "kt", ToolType.sword);
// ToolAPI.addToolMaterial("cjzr", {durability: 2256, level: 6, efficiency: 6, damage: 24, enchantability: 14});
// ToolLib.setTool(ItemID.caneJr, "cjzr", ToolType.sword);
// /*
// var lookDir = function(yaw, pitch){
//  var vector = {};
//  vector.y = -Math.sin((pitch));
//  vector.x = -Math.sin((yaw)) * Math.cos((pitch));
//  vector.z = Math.cos((yaw)) * Math.cos((pitch));
// return vector;
// }
// Callback.addCallback("ItemUseNoTarget", function(item){
// if (Player.getCarriedItem().id == ItemID.caneJr) {  
// let coords = Entity.getPosition(Player.get());
// let lookAngle = Entity.getLookAngle(Player.get()); 
//   var yaw = lookAngle.yaw + lookDir((Math.random() * 5) - (5 / 2));
//    var pitch = lookAngle.pitch + lookDir((Math.random() * 5) - (5 / 2));
//     let velocity = {
//    x: -Math.sin((yaw)) * Math.cos((pitch)),
//    y: Math.sin((pitch)),
//    z: Math.cos((yaw)) * Math.cos((pitch))}
// let entity = Entity.spawn(coords.x, coords.y, coords.z, Native.EntityType.SMALL_FIREBALL);
//  Entity.moveToAngle(entity, velocity, {speed: 6,  denyY: false,  jumpVel: 0});
// }         
// });*/
IDRegistry.genBlockID("abyssalRitualAltar");
IDRegistry.genBlockID("abyssalRitualAltarPedestal");
Block.createBlock("abyssalRitualAltar", [
    { name: "Ritual Altar", texture: [["cobblestone", 0]], inCreative: false },
    { name: "Ritual Altar", texture: [["darkstone_cobblestone", 0]], inCreative: false },
    { name: "Ritual Altar", texture: [["abyssal_cobblestone", 0]], inCreative: false },
    { name: "Ritual Altar", texture: [["coralium_cobblestone", 0]], inCreative: false },
    { name: "Ritual Altar", texture: [["dreadstone_cobblestone", 0]], inCreative: false },
    { name: "Ritual Altar", texture: [["abyssalnite_cobblestone", 0]], inCreative: false },
    { name: "Ritual Altar", texture: [["ethaxium_bricks", 0]], inCreative: false },
    { name: "Ritual Altar", texture: [["dark_ethaxium_bricks", 0]], inCreative: false }
]);
Block.createBlock("abyssalRitualAltarPedestal", [
    { name: "Ritual Pedestal", texture: [["cobblestone", 0]], inCreative: false },
    { name: "Ritual Pedestal", texture: [["darkstone_cobblestone", 0]], inCreative: false },
    { name: "Ritual Pedestal", texture: [["abyssal_cobblestone", 0]], inCreative: false },
    { name: "Ritual Pedestal", texture: [["coralium_cobblestone", 0]], inCreative: false },
    { name: "Ritual Pedestal", texture: [["dreadstone_cobblestone", 0]], inCreative: false },
    { name: "Ritual Pedestal", texture: [["abyssalnite_cobblestone", 0]], inCreative: false },
    { name: "Ritual Pedestal", texture: [["ethaxium_bricks", 0]], inCreative: false },
    { name: "Ritual Pedestal", texture: [["dark_ethaxium_bricks", 0]], inCreative: false }
]);
ToolAPI.registerBlockMaterial(BlockID.abyssalRitualAltar, "stone", 1, false);
ToolAPI.registerBlockMaterial(BlockID.abyssalRitualAltarPedestal, "stone", 1, false);
Block.setShape(BlockID.abyssalRitualAltar, 5 / 32, 0, 5 / 32, 27 / 32, 0, 27 / 32);
Block.setShape(BlockID.abyssalRitualAltarPedestal, 4 / 16, 0, 4 / 16, 12 / 16, 1, 12 / 16)(function () {
    var altar_boxes = [
        [2.5, 0, 2.5, 13.5, 2, 13.5],
        [3, 2, 3, 13, 3, 13],
        [5, 3, 5, 11, 11, 11],
        [4.5, 6, 4.5, 11.5, 8, 11.5],
        [4, 3, 11, 5, 11, 12],
        [11, 3, 11, 12, 11, 12],
        [4, 3, 4, 5, 11, 5],
        [11, 3, 4, 12, 11, 5],
        [3, 11, 3, 13, 12, 13],
        [2.5, 12, 2.5, 13.5, 13, 13.5]
    ];
    var pedestal_boxes = [
        [4, 0, 4, 12, 2, 12],
        [4.5, 2, 4.5, 11.5, 3, 11.5],
        [5.5, 3, 5.5, 10.5, 13, 10.5],
        [5, 3, 10, 6, 13, 11],
        [10, 3, 10, 11, 13, 11],
        [5, 3, 5, 6, 13, 6],
        [10, 3, 5, 11, 13, 6],
        [4.5, 13, 4.5, 11.5, 14, 11.5],
        [4, 15, 4, 5, 16, 5],
        [4, 15, 11, 5, 16, 12],
        [11, 15, 4, 12, 16, 5],
        [11, 15, 11, 12, 16, 12],
        [7.5, 15, 4, 8.5, 16, 5],
        [4, 15, 7.5, 5, 16, 8.5],
        [7.5, 15, 11, 8.5, 16, 12],
        [11, 15, 7.5, 12, 16, 8.5]
    ];
    var makeRenders = function (data, texture) {
        var renderAltar = new ICRender.Model();
        var modelAltar = new BlockRenderer.Model();
        for (var i in altar_boxes) {
            var box = altar_boxes[i];
            modelAltar.addBox(box[0] / 16, box[1] / 16, box[2] / 16, box[3] / 16, box[4] / 16, box[5] / 16, texture, 0);
        }
        modelAltar.addBox(5 / 16, 13 / 16, 5 / 16, 11 / 16, 14 / 16, 11 / 16, "altar_upper_" + texture, 0);
        modelAltar.addBox(7 / 32, 13 / 16, 7 / 32, 9 / 32, 1, 9 / 32, [["altar_candle_side", 0], ["altar_candle_top", 0], ["altar_candle_side", 0]]);
        modelAltar.addBox(7 / 32, 13 / 16, 23 / 32, 9 / 32, 1, 25 / 32, [["altar_candle_side", 0], ["altar_candle_top", 0], ["altar_candle_side", 0]]);
        modelAltar.addBox(23 / 32, 13 / 16, 7 / 32, 25 / 32, 1, 9 / 32, [["altar_candle_side", 0], ["altar_candle_top", 0], ["altar_candle_side", 0]]);
        modelAltar.addBox(23 / 32, 13 / 16, 23 / 32, 25 / 32, 1, 25 / 32, [["altar_candle_side", 0], ["altar_candle_top", 0], ["altar_candle_side", 0]]);
        renderAltar.addEntry(modelAltar);
        BlockRenderer.setStaticICRender(BlockID.abyssalRitualAltar, data, renderAltar);
        ItemModel.getFor(BlockID.abyssalRitualAltar, data).setModel(renderAltar);
        var renderPedestal = new ICRender.Model();
        var modelPedestal = new BlockRenderer.Model();
        for (var i in pedestal_boxes) {
            var box = pedestal_boxes[i];
            modelPedestal.addBox(box[0] / 16, box[1] / 16, box[2] / 16, box[3] / 16, box[4] / 16, box[5] / 16, texture, 0);
        }
        modelPedestal.addBox(4 / 16, 14 / 16, 4 / 16, 12 / 16, 15 / 16, 12 / 16, [[texture, 0], ["altar_pedestal_upper_" + texture], [texture, 0]]);
        renderPedestal.addEntry(modelPedestal);
        BlockRenderer.setStaticICRender(BlockID.abyssalRitualAltarPedestal, data, renderPedestal);
        ItemModel.getFor(BlockID.abyssalRitualAltarPedestal, data).setModel(renderPedestal);
    };
    makeRenders(0, "cobblestone");
    makeRenders(1, "darkstone_cobblestone");
    makeRenders(2, "abyssal_cobblestone");
    makeRenders(3, "coralium_cobblestone");
    makeRenders(4, "dreadstone_cobblestone");
    makeRenders(5, "abyssalnite_cobblestone");
    makeRenders(6, "ethaxium_bricks");
    makeRenders(7, "dark_ethaxium_bricks");
})();
TileEntity.registerPrototype(BlockID.abyssalRitualAltar, /**@type {TileEntity.TileEntityPrototype} */ {
    useNetworkItemContainer: true,
    defaultValues: {
        rotation: [0, 0, 0],
        coords: null,
        step: null,
        onCraftStart: {},
        onCraftEnd: {}
    },
    getTransportSlots: function () {
        return { input: ["slot"] };
    },
    created: function () {
        this.data.coords = [
            [this.x + 3, this.z],
            [this.x + 3, this.z + 1],
            [this.x + 2, this.z + 2],
            [this.x + 1, this.z + 3],
            [this.x, this.z + 3],
            [this.x - 1, this.z + 3],
            [this.x - 2, this.z + 2],
            [this.x - 3, this.z + 1],
            [this.x - 3, this.z],
            [this.x - 3, this.z - 1],
            [this.x - 2, this.z - 2],
            [this.x - 1, this.z - 3],
            [this.x, this.z - 3],
            [this.x + 1, this.z - 3],
            [this.x + 2, this.z - 2],
            [this.x + 3, this.z - 1]
        ];
    },
    client: {
        updateModel: function () {
            var id = Network.serverToLocalId(this.networkData.getInt("animId"));
            var data = this.networkData.getInt("animData");
            this.model.describeItem({
                id: id, count: 1, data: data, size: .5 + 1 / 16,
                rotation: [Math.PI / 2, 0, 0]
            });
        },
        load: function () {
            this.model = new Animation.Item(this.x + .5, this.y + .875, this.z + .5);
            this.updateModel();
            this.model.load();
            var that = this;
            this.networkData.addOnDataChangedListener(function (networkData, isExternalChange) {
                that.updateModel();
            });
        },
        unload: function () {
            this.model.destroy();
        },
    },
    setSlot: function (slot, id, count, data, extra) {
        this.container.setSlot(slot, id, count, data, typeof extra !== "undefined" ? extra : null);
        this.container.sendChanges();
    },
    click: function (id, count, data, coords) {
        if (this.data.step)
            return;
        var pillars = [];
        var players = Network.getConnectedPlayers();
        var _loop_1 = function (i) {
            var player = players[i];
            if (Necronomicons.isNecronomicon(id) && Entity.getSneaking(player)) {
                var thisSlot = this_1.container.getSlot("slot");
                for (var i_2 in this_1.data.coords) {
                    var xx = this_1.data.coords[i_2][0], zz = this_1.data.coords[i_2][1];
                    if (this_1.blockSource.getBlockId(xx, this_1.y, zz) == BlockID.abyssalRitualAltarPedestal) {
                        var tile = TileEntity.getTileEntity(xx, this_1.y, zz, this_1.blockSource);
                        if (!tile)
                            tile = TileEntity.addTileEntity(xx, this_1.y, zz, this_1.blockSource);
                        if (tile && tile.container.getSlot("slot").id != 0)
                            pillars.push(this_1.data.coords[i_2]);
                    }
                }
                if (thisSlot.id == 0 || pillars.length == 0)
                    return { value: void 0 };
                var CraftingItems = {};
                for (var i_3 in RitualAltar.Crafts) {
                    CraftingItems[RitualAltar.Crafts[i_3].result.toString()] = {};
                    for (var k in RitualAltar.Crafts[i_3].items) {
                        if (CraftingItems[RitualAltar.Crafts[i_3].result.toString()][RitualAltar.Crafts[i_3].items[k].toString()]) {
                            CraftingItems[RitualAltar.Crafts[i_3].result.toString()][RitualAltar.Crafts[i_3].items[k].toString()]++;
                        }
                        else
                            CraftingItems[RitualAltar.Crafts[i_3].result.toString()][RitualAltar.Crafts[i_3].items[k].toString()] = 1;
                    }
                    CraftingItems[RitualAltar.Crafts[i_3].result.toString()].centre = RitualAltar.Crafts[i_3].centre.toString();
                }
                var itemsInPillars = {};
                for (var i_4 in pillars) {
                    var tile = TileEntity.getTileEntity(pillars[i_4][0], this_1.y, pillars[i_4][1], this_1.blockSource);
                    var item = tile.container.getSlot("slot");
                    if (itemsInPillars[item.id + "," + item.data]) {
                        itemsInPillars[item.id + "," + item.data]++;
                    }
                    else
                        itemsInPillars[item.id + "," + item.data] = 1;
                }
                var centreItem = thisSlot.id + "," + thisSlot.data;
                var result_1 = 0;
                for (var l in CraftingItems) {
                    result_1 = 0;
                    for (var i_5 in items) {
                        if (centreItem != CraftingItems[l].centre || JSONlength(itemsInPillars) != JSONlength(CraftingItems[l]) - 1 ||
                            !CraftingItems[l][i_5] || itemsInPillars[i_5] != CraftingItems[l][i_5])
                            continue;
                        result_1++;
                        if (result_1 == JSONlength(itemsInPillars) || typeof result_1 === "string") {
                            result_1 = l;
                            break;
                        }
                    }
                    if (result_1 == JSONlength(itemsInPillars) || typeof result_1 === "string")
                        break;
                }
                if (typeof result_1 === "string") {
                    if (this_1.data.onCraftStart[result_1] && onCraftStart[result_1]({
                        x: this_1.x, y: this_1.y, z: this_1.z
                    }) == "stop")
                        return { value: void 0 };
                    for (var i_6 in pillars) {
                        pillars[i_6] = pillars[i_6][0] + ";" + pillars[i_6][1];
                    }
                    pillars = pillars.toString();
                    this_1.data.step = {
                        pillars: pillars,
                        result: result_1
                    };
                    pillars = pillars.split(",");
                    for (var i_7 in pillars) {
                        pillars[i_7] = pillars[i_7].split(",");
                        pillars[i_7][0] = parseInt(pillars[i_7][0]);
                        pillars[i_7][1] = parseInt(pillars[i_7][1]);
                    }
                    var that_1 = this_1;
                    RitualAltar.asd(pillars, 0, that_1, 0, function () {
                        result_1 = result_1.split(",");
                        if (result_1[0] == ItemID.sacthothsSoulReaper && that_1.blockSource.getDimension() == Omothol.id) {
                            var ent = that_1.blockSource.spawnEntity(that_1.x + .5, that_1.y + 1, that_1.z + .5, "abyss:sacthoth");
                            elder_boss.play(); /**@todo REMAKE SOUND */
                        }
                        else {
                            var ent = that_1.blockSource.spawnEntity(that_1.x, that_1.y + 1, that_1.z, 93);
                            elder_screams.play(); /**@todo REMAKE SOUND */
                        }
                        if (that_1.container.getSlot("slot").count > 1) {
                            onCallback("EntityRemoved", function (entity) {
                                if (entity == ent) {
                                    that_1.blockSource.spawnDroppedItem(that_1.x + .5, that_1.y + 1, that_1.z + .5, result_1[0], 1, result_1[1]);
                                    return "delete";
                                }
                            });
                            var sl = that_1.container.getSlot("slot");
                            that_1.container.setSlot("slot", sl.id, sl.count - 1, sl.data, sl.extra);
                            that_1.container.sendChanges();
                        }
                        else {
                            that_1.container.setSlot("slot", result_1[0], 1, result_1[1]);
                            that_1.container.sendChanges();
                        }
                        that_1.data.step = null;
                        if (that_1.data.onCraftEnd[result_1.toString()])
                            that_1.data.onCraftEnd[result_1.toString()]({ x: that_1.x, y: that_1.y, z: that_1.z });
                    });
                }
                ;
                return { value: void 0 };
            }
            else if (this_1.container.getSlot("slot").id == 0) {
                Game.prevent();
                var item = Entity.getCarriedItem(player);
                if (item.id == 0)
                    return { value: void 0 };
                this_1.setSlot("slot", item.id, 1, item.data, item.extra);
                Entity.setCarriedItem(player, item.id, item.count - 1, item.data, item.extra);
            }
            else {
                Game.prevent();
                var slot = this_1.container.getSlot("slot");
                this_1.blockSource.spawnDroppedItem(this_1.x + .5, this_1.y + 1, this_1.z + .5, slot.id, slot.count, slot.data, slot.extra);
                this_1.setSlot("slot", 0, 0, 0);
            }
        };
        var this_1 = this;
        for (var i in players) {
            var state_1 = _loop_1(i);
            if (typeof state_1 === "object")
                return state_1.value;
        }
    },
    tick: function () {
        var item = this.container.getSlot("slot");
        this.networkData.putInt("animId", item.id);
        this.networkData.putInt("animData", item.data);
        this.networkData.sendChanges();
    },
    load: function () {
        if (this.data.step) {
            if (!this.data.step.i)
                return;
            var that_2 = this;
            var pillars = this.data.step.pillars.split(",");
            for (var i in pillars) {
                pillars[i] = pillars[i].split(";");
                pillars[i][0] = parseInt(pillars[i][0]);
                pillars[i][1] = parseInt(pillars[i][1]);
            }
            RitualAltar.asd(pillars, this.data.step.i, this, 0, function () {
                elder_screams.play(); /**@todo REMAKE SOUND */
                var result = that_2.data.step.result.split(",");
                var ent = that_2.blockSource.spawnEntity(that_2.x, that_2.y + 1, that_2.z, 93);
                if (that_2.container.getSlot("slot").count > 1) {
                    onCallback("EntityRemoved", function (entity) {
                        if (entity == ent) {
                            that_2.blockSource.spawnDroppedItem(that_2.x + .5, that_2.y + 1, that_2.z + .5, result[0], 1, result[1]);
                            return "delete";
                        }
                    });
                    var sl = that_2.container.getSlot("slot");
                    that_2.container.setSlot("slot", sl.id, sl.count - 1, sl.data, sl.extra);
                    that_2.container.sendChanges();
                }
                else {
                    that_2.setSlot("slot", result[0], 1, result[1]);
                }
                that_2.data.step = null;
                if (that_2.data.onCraftEnd[result.toString()])
                    that_2.data.onCraftEnd[result.toString()]({ x: that_2.x, y: that_2.y, z: that_2.z });
            });
        }
    }
});
Block.setRandomTickCallback(BlockID.abyssalRitualAltarPedestal, function (x, y, z, id, data, region) {
    RitualAltar.pillarParticles(x, y, z, region);
});
TileEntity.registerPrototype(BlockID.abyssalRitualAltarPedestal, {
    useNetworkItemContainer: true,
    defaultValues: {
        rotation: [0, 0, 0],
        lastID: 0,
        lastData: 0
    },
    getTransportSlots: function () {
        return {
            input: ["slot"]
        };
    },
    client: {
        updateModel: function () {
            var id = Network.serverToLocalId(this.networkData, getInt("animId"));
            var data = this.networkData.getInt("animData");
            this.model.describeItem({
                id: id, count: 1, data: data, size: .4 + 1 / 16, rotation: [Math.PI / 2, 0, 0]
            });
        },
        load: function () {
            this.model = new Animation.Item(this.x + .5, this.y + .975, this.z + .5);
            this.updateModel();
            this.model.load();
            var that = this;
            this.networkData.addOnDataChangedListener(function (networkData, isExternalChange) {
                that.updateModel();
            });
        },
        unload: function () {
            this.model.destroy();
        }
    },
    setSlot: function (slot, id, count, data, extra) {
        this.container.setSlot(slot, id, count, data, typeof extra !== "undefined" ? extra : null);
        this.container.sendChanges();
    },
    click: function (id, count, data, coords, player, extra) {
        Game.prevent();
        if (this.container.getSlot("slot").id == 0) {
            var item = Entity.getCarriedItem(player);
            if (item.id == 0)
                return;
            this.setSlot("slot", item.id, 1, item.data, item.extra);
            this.container.sendChanges();
            Entity.setCarriedItem(player, item.id, item.count - 1, item.data, item.extra);
        }
        else {
            var slot = this.container.getSlot("slot");
            this.blockSource.spawnDroppedItem(this.x + .5, this.y + 1, this.z + .5, slot.id, slot.count, slot.data, slot.extra);
            this.setSlot("slot", 0, 0, 0, null);
            this.container.sendChanges();
        }
    },
    tick: function () {
        var item = this.container.getSlot("slot");
        this.data.lastID = item.id;
        this.data.lastData = item.data;
        this.data.rotation = [0, 0, 0];
        if (all_items.indexOf(item.id) !== -1)
            this.data.rotation = [Math.PI / 2, Math.PI, 0];
        this.networkData.putInt("animId", item.id);
        this.networkData.putInt("animData", item.data);
    }
});
// AbyssTable.addCraft([[371, 0], [371, 0], [371, 0], [371, 0], [371, 0], [371, 0], [371, 0], [371, 0]], [ItemID.coralPearl, 0], [ItemID.trsGem, 0], [0,-1,7,-1,2,-1,4,-1,1,-1,6,-1,3,-1,5,-1], 2000);
AbyssTable.addCraft([[331, 0], [331, 0], [331, 0], [331, 0], [ItemID.shardObl, 0], [ItemID.shardOfOblivion, 0], [ItemID.shardOfOblivion, 0], [ItemID.shardOfOblivion, 0]], [381, 0], [ItemID.oblivionCatalyst, 0], [0, -1, 7, -1, 2, -1, 4, -1, 1, -1, 6, -1, 3, -1, 5, -1], 5000);
AbyssTable.addCraft([[ItemID.refinedCoraliumIngot, 0], [ItemID.refinedCoraliumIngot, 0], [ItemID.refinedCoraliumIngot, 0], [ItemID.refinedCoraliumIngot, 0], [ItemID.coraliumGem, 0], [ItemID.coraliumGem, 0], [ItemID.coraliumGem, 0], [ItemID.coraliumGem, 0]], [ItemID.coraliumPearl, 0], [ItemID.CoraliumPlate, 0], [0, -1, 7, -1, 2, -1, 4, -1, 1, -1, 6, -1, 3, -1, 5, -1], 1500);
// AbyssTable.addCraft([[101, 0], [101, 0], [101, 0], [101, 0], [101, 0], [101, 0], [101, 0], [101, 0]], [ItemID.shardObl, 0], [ItemID.cageI, 0], [0,-1,7,-1,2,-1,4,-1,1,-1,6,-1,3,-1,5,-1], 1000);
// AbyssTable.addCraft([[340, 0], [340, 0], [340, 0], [340, 0], [339, 0], [339, 0], [339, 0], [339, 0]], [339, 0], [ItemID.scrollB, 0], [0,-1,7,-1,2,-1,4,-1,1,-1,6,-1,3,-1,5,-1], 1000);
// AbyssTable.addCraft([[340, 0], [ItemID.plantWaste, 0], [340, 0], [ItemID.plantWasteL, 0], [339, 0], [339, 0], [339, 0], [339, 0]], [339, 0], [ItemID.scrollL, 0], [0,-1,7,-1,2,-1,4,-1,1,-1,6,-1,3,-1,5,-1], 1000);
// AbyssTable.addCraft([[340, 0], [ItemID.dreadPeace, 0], [340, 0], [ItemID.dreadChunck, 0], [339, 0], [339, 0], [339, 0], [339, 0]], [339, 0], [ItemID.scrollM, 0], [0,-1,7,-1,2,-1,4,-1,1,-1,6,-1,3,-1,5,-1], 1000);
// AbyssTable.addCraft([[340, 0], [ItemID.dreadPeace, 0], [340, 0], [ItemID.dreadChunck, 0], [339, 0], [339, 0], [339, 0], [339, 0]], [339, 0], [ItemID.scrollM, 0], [0,-1,7,-1,2,-1,4,-1,1,-1,6,-1,3,-1,5,-1], 1000);
// AbyssTable.addCraft([[0, 0], [ItemID.trsGem, 0], [ItemID.dreadChunck, 0], [ItemID.coralPearlD, 0], [339, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [339, 0]], [339, 0], [ItemID.scrollM, 0], [0,-1,7,-1,2,-1,4,-1,1,-1,6,-1,3,-1,5,-1], 1000);
// AbyssTable.addCraft([[ItemID.soulPe, 0], [ItemID.soulPe, 0], [ItemID.soulPe, 0], [ItemID.soulPe, 0], [262, 0], [262, 0], [262, 0], [262, 0]], [ItemID.charmRe, 0], [ItemID.charmRr, 0], [0,-1,7,-1,2,-1,4,-1,1,-1,6,-1,3,-1,5,-1], 1000);
// AbyssTable.addCraft([[ItemID.soulPe, 0], [ItemID.soulPe, 0], [ItemID.soulPe, 0], [ItemID.soulPe, 0], [348, 0], [348, 0], [348, 0], [348, 0]], [ItemID.charmRe, 0], [ItemID.charmRpe, 0], [0,-1,7,-1,2,-1,4,-1,1,-1,6,-1,3,-1,5,-1], 1000);
// AbyssTable.addCraft([[325, 1], [ItemID.catalObl, 0], [325, 8], [BlockID.Pedestal, 0], [BlockID.stoneMonolith, 0], [BlockID.stoneMonolith, 0], [BlockID.stoneMonolith, 0], [BlockID.stoneMonolith, 0]], [ItemID.essenceOrbO, 0], [ItemID.soulSword, 0], [0,-1,7,-1,2,-1,4,-1,1,-1,6,-1,3,-1,5,-1], 1500);
// AbyssTable.addCraft([[ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0]], [ItemID.ABHelm, 0], [ItemID.DABHelm, 0], [0,-1,7,-1,2,-1,4,-1,1,-1,6,-1,3,-1,5,-1], 1500);
// AbyssTable.addCraft([[ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0]], [ItemID.ABCh, 0], [ItemID.DABCh, 0], [0,-1,7,-1,2,-1,4,-1,1,-1,6,-1,3,-1,5,-1], 1500);
// AbyssTable.addCraft([[ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0]], [ItemID.ABLeg, 0], [ItemID.DABLeg, 0], [0,-1,7,-1,2,-1,4,-1,1,-1,6,-1,3,-1,5,-1], 1500);
// AbyssTable.addCraft([[ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0]], [ItemID.ABBoot, 0], [ItemID.DABBoot, 0], [0,-1,7,-1,2,-1,4,-1,1,-1,6,-1,3,-1,5,-1], 1500);
// AbyssTable.addCraft([[ItemID.trsGem, 0], [0, 0], [111, 0], [ItemID.coralGem, 0], [ItemID.coralGem, 0], [325, 8], [ItemID.Bo, 0], [106, 0]], [ItemID.RCHelm, 0], [ItemID.DPHelm, 0], [0,-1,7,-1,2,-1,4,-1,1,-1,6,-1,3,-1,5,-1], 1500);
// AbyssTable.addCraft([[ItemID.trsGem, 0], [0, 0], [111, 0], [ItemID.coralGem, 0], [ItemID.coralGem, 0], [325, 8], [ItemID.Bo, 0], [106, 0]], [ItemID.RCCh, 0], [ItemID.DPCh, 0], [0,-1,7,-1,2,-1,4,-1,1,-1,6,-1,3,-1,5,-1], 1500);
// AbyssTable.addCraft([[ItemID.trsGem, 0], [0, 0], [111, 0], [ItemID.coralGem, 0], [ItemID.coralGem, 0], [325, 8], [ItemID.Bo, 0], [106, 0]], [ItemID.RCLeg, 0], [ItemID.DPLeg, 0], [0,-1,7,-1,2,-1,4,-1,1,-1,6,-1,3,-1,5,-1], 1500);
// AbyssTable.addCraft([[ItemID.trsGem, 0], [0, 0], [111, 0], [ItemID.coralGem, 0], [ItemID.coralGem, 0], [325, 8], [ItemID.Bo, 0], [106, 0]], [ItemID.RCBoot, 0], [ItemID.DPBoot, 0], [0,-1,7,-1,2,-1,4,-1,1,-1,6,-1,3,-1,5,-1], 1500);
IDRegistry.genBlockID("abyssalCrystallizer");
Block.createBlock("abyssalCrystallizer", [
    { name: "Crystallizer", texture: [
            ["crystallizer_top", 0],
            ["crystallizer_top", 0],
            ["crystallizer_side", 0],
            ["crystallizer_front_off", 0],
            ["crystallizer_side", 0],
            ["crystallizer_side", 0]
        ], inCreative: true }
]);
TileRenderer.setStandartModel(BlockID.abyssalCrystallizer, [
    ["crystallizer_top", 0],
    ["crystallizer_top", 0],
    ["crystallizer_side", 0],
    ["crystallizer_front_off", 0],
    ["crystallizer_side", 0],
    ["crystallizer_side", 0]
]);
TileRenderer.registerRotationModel(BlockID.abyssalCrystallizer, 0, [
    ["crystallizer_top", 0],
    ["crystallizer_top", 0],
    ["crystallizer_side", 0],
    ["crystallizer_front_off", 0],
    ["crystallizer_side", 0],
    ["crystallizer_side", 0]
]);
TileRenderer.registerRotationModel(BlockID.abyssalCrystallizer, 4, [
    ["crystallizer_top", 0],
    ["crystallizer_top", 0],
    ["crystallizer_side", 0],
    ["crystallizer_front_on", 0],
    ["crystallizer_side", 0],
    ["crystallizer_side", 0]
]);
Callback.addCallback("PostLoaded", function () {
    addShapedRecipe(BlockID.ACrystallizer, 1, 0, ["bbb", "dfd", "bbb"], ["b", BlockID.dreadstoneBricks, 0, 'd', BlockID.blockDreadium, 0, 'f', 61, 0]);
});
var guiACrystallizer = new UI.Window({
    location: {
        x: 0,
        y: 0,
        width: 1000,
        height: 520
    },
    params: {},
    drawing: [
        { type: "background", color: android.graphics.Color.argb(90, 0, 0, 0) },
        { type: "bitmap", x: 236, y: 12, bitmap: "crystallizer_window", scale: 2.5 }
    ],
    elements: (function () {
        function CResultSlotClicker(slotName) {
            return {
                onClick: function (position, container, tile) {
                    var slot = container.getSlot(slotName);
                    if (slot.id > 0) {
                        Player.addItemToInventory(slot.id, 1, slot.data);
                        container.setSlot(slot.id, slot.count - 1, slot.data, slot.extra);
                        container.validateSlot(slotName);
                    }
                    if (tile.data.exp > 0) {
                        if (tile.data.exp < 1) {
                            if (Math.random() <= tile.data.exp) {
                                Player.addExperience(5);
                            }
                            tile.data.exp = 0;
                        }
                        else {
                            Player.addExperience(Math.round(tile.data.exp) * 5);
                            tile.data.exp = 0;
                        }
                    }
                },
                onLongClick: function (position, container, tile) {
                    var slot = container.getSlot(slotName);
                    if (slot.id > 0) {
                        Player.addItemToInventory(slot.id, slot.count, slot.data);
                        container.clearSlot(slotName);
                    }
                    if (tile.data.exp > 0) {
                        if (tile.data.exp < 1) {
                            if (Math.random() <= tile.data.exp) {
                                Player.addExperience(5);
                            }
                            tile.data.exp = 0;
                        }
                        else {
                            Player.addExperience(Math.round(tile.data.exp) * 5);
                            tile.data.exp = 0;
                        }
                    }
                }
            };
        }
        ;
        var crystallizerElements = {
            "textHeader": {
                type: "text", x: 500, y: 47,
                width: 200, height: 40,
                font: { color: android.graphics.Color.WHITE, size: 25, alignment: UI.Font.ALIGN_CENTER },
                text: Translation.translate("Crystallizer")
            },
            "textInventory": {
                type: "text", x: 244, y: 224,
                width: 160, height: 35,
                font: { color: android.graphics.Color.WHITE, size: 25 },
                text: Translation.translate("Inventory")
            },
            "scaleBurn": {
                type: "scale", x: 405, y: 117, scale: 24 / 7,
                direction: 1, value: 0.5,
                bitmap: "crystallizer_burn_scale"
            },
            "scaleProgress": {
                type: "scale", x: 473, y: 117, scale: 3,
                direction: 0, value: 0.5,
                bitmap: "crystallizer_progress_scale"
            },
            "slotFuel": {
                type: "slot", x: 401, y: 168, size: 54,
                isValid: function (id) { return Crystallizer.isValidFuel(id); },
                isTransparentBackground: true
            },
            "slotSource": {
                type: "slot", x: 401, y: 60, size: 54,
                isValid: function (id, count, data) { return Crystallizer.isValidRecipe({ id: id, data: data }); },
                isTransparentBackground: true
            },
            "slotResult1": {
                type: "slot", x: 578, y: 113, size: 54,
                isValid: function () { return false; },
                clicker: CResultSlotClicker("slotResult1"),
                isTransparentBackground: true
            },
            "slotResult2": {
                type: "slot", x: 632, y: 113, size: 54,
                clicker: CResultSlotClicker("slotResult2"),
                isValid: function () { return false; },
                isTransparentBackground: true
            }
        };
        for (var i = 0; i < 9; i++) {
            crystallizerElements["slotInv" + i] = {
                type: "invSlot", x: 257 + i * 54, y: 434, size: 54, index: i
            };
        }
        for (var i = 9; i < 36; i++) {
            crystallizerElements["slotInv" + i] = {
                type: "invSlot", x: 257 + (i % 9) * 54, y: 260 + Math.floor(i / 9) * 54, size: 54, index: i
            };
        }
        return crystallizerElements;
    })()
});
Crystallizer.addFuels([
    [369, 2400],
    [377, 1200],
    [ItemID.dreadedShardOfAbyssalnite, 1000],
    [ItemID.dreadedChunkOfAbyssalnite, 1600],
    [ItemID.dreadFragment, 100],
    [ItemID.methane, 10000]
]);
Crystallizer.addRecipes([
    [[ItemID.nitre, 0], [[ItemID.ACrystalPotassium, 1, 0], [ItemID.ACrystalNitrate, 1, 0]], 0.1],
    [[168, 2], [[ItemID.ACrystalSilica, 4, 0], [ItemID.ACrystalBeryl, 4, 0]], 0.15]
]);
AbyssalMachine.init(BlockID.abyssalCrystallizer, {
    useNetworkItemContainer: true,
    defaultValues: {
        progress: 0,
        worktime: 200,
        exp: 0,
        isActive: false,
        burn: 0,
        burnMax: 0 //how many ticks burns the fuel that is in tile at the moment
    },
    getScreenName: function (player, coords) {
        return "main";
    },
    slotsEquality: function (result, slot1, slot2) {
        return (slot1.id == result[0][0] && (!result[0][2] || slot1.data == result[0][2]) && slot1.count <= 64 - result[0][1] || slot1.id == 0) &&
            result[1] ? (slot2.id == result[1][0] && (!result[1][2] || slot2.data == result[1][2]) && slot2.count <= 64 - result[1][1] || slot2.id == 0) : true;
    },
    getScreenByName: function (screenName) {
        return screenName == "main" ? guiACrystallizer : null;
    },
    burnFuel: function (slotName) {
        var fuelSlot = this.container.getSlot(slotName);
        if (fuelSlot.id > 0) {
            var dur = Crystallizer.isValidFuel(fuelSlot.id);
            if (dur > 0) {
                this.container.setSlot(slotName, fuelSlot.id, fuelSlot.count - 1, fuelSlot.data);
                this.container.validateSlot(slotName);
                return dur;
            }
        }
        return 0;
    },
    tick: function () {
        var newActive = false;
        var src = this.container.getSlot("slotSource");
        var result = Crystallizer.getRecipeResult(src.id, src.data);
        this.burnFuel("slotFuel");
        if (this.data.burn <= 0) {
            this.data.burn = this.data.burnMax = this.burnFuel("slotFuel");
        }
        if (this.data.burn > 0) {
            this.data.burn--;
            if (!this.data.isActive)
                this.activate();
        }
        else
            this.deactivate();
        if (result !== -1 && (src.count >= result.result[0][1] || !result.result[0][1])) {
            var result1 = this.container.getSlot("slotResult1");
            var result2 = this.container.getSlot("slotResult2");
            if (this.slotsEquality(result.result, result1, result2)) {
                if (this.data.burn > 0) {
                    this.data.progress += 1 / this.data.worktime;
                    newActive = true;
                }
                if (this.data.progress.toFixed(3) >= 0) {
                    this.container.setSlot("slotSource", src.id, src.count - 1, src.data);
                    this.container.setSlot("slotResult1", result.result[0][0], result1.count + result.result[0][1], result.result[0][2]);
                    if (result.result[1]) {
                        this.container.setSlot("slotResult2", result.result[1][0], result2.count + result.result[1][1], result.result[1][2]);
                    }
                    this.data.exp += result.exp;
                    this.container.validateAll();
                    this.data.progress = 0;
                }
            }
        }
        else {
            this.data.progress = 0;
        }
        if (!newActive) {
            this.data.isActive = newActive;
        }
        ;
        this.container.setScale("scaleBurn", this.data.burn / this.data.burnMax);
        this.container.setScale("scaleProgress", this.data.progress);
        this.container.sendChanges();
    }
});
//Shoggoth
Callback.addCallback("DestroyBlock", function (coords, block, player) {
    if (block.id == BlockID.stoneShoggotB && BlockSource.getDefaultForDimension(1) != null) {
        BlockSource.getDefaultForDimension(1).spawnEntity(coords.x + .5, coords.y + .5, coords.z + .5, "abyss:lesser_shoggoth");
    }
    else if (block.id == BlockID.stoneShoggotB && BlockSource.getDefaultForDimension(0) != null) {
        BlockSource.getDefaultForDimension(0).spawnEntity(coords.x + .5, coords.y + .5, coords.z + .5, "abyss:lesser_shoggoth");
    }
});
//Cha'garoth
IDRegistry.genBlockID("chagarothAltarBottom");
Block.createBlock("chagarothAltarBottom", [
    { name: "Altar of Cha\'garoth (bottom)", texture: [["BOD" /**@todo fix this*/, 0]], inCreative: true }
], "opaque");
(function () {
    var mesh = new RenderMesh(__dir__ + "/models/chagaroth_altar_bottom.obj", "obj", { translate: [0.5, 0, 0.5] });
    var render = new ICRender.Model();
    render.addEntry(new BlockRenderer.Model(mesh));
    BlockRenderer.setStaticICRender(BlockID.chagarothAltarBottom, 0, render);
    ItemModel.getFor(BlockID.chagarothAltarBottom, 0).setModel(render);
})();
IDRegistry.genBlockID("chagarothAltarTop");
Block.createBlock("chagarothAltarTop", [
    { name: "Altar of Cha\'garoth (top)", texture: [["BOD" /**@todo fix this */, 0]], inCreative: true }
], "opaque");
(function () {
    var mesh = new RenderMesh(__dir__ + "/models/chagaroth_altar_top.obj", "obj", { translate: [0.5, 0, 0.5] });
    var render = new ICRender.Model();
    render.addEntry(new BlockRenderer.Model(mesh));
    BlockRenderer.setStaticICRender(BlockID.chagarothAltarTop, 0, render);
    ItemModel.getFor(BlockID.chagarothAltarTop, 0).setModel(render);
})();
Callback.addCallback("ItemUse", function (coords, item, block, player) {
    if (BlockSource.getDefaultForDimension(Dreadlands.id) != null) {
        var region = BlockSource.getDefaultForActor(player);
        var r = coords.relative;
        if (region.getBlockId(r.x, r.y, r.z) == BlockID.chagarothAltarTop &&
            region.getBlockId(r.x, r.y - 1, r.z) == BlockID.chagarothAltarBottom) {
            Network.sendServerMessage("Ancient force thicken above gore altar");
            if (World.getThreadTime() % 640 == 0) {
                BlockSource.getDefaultForDimension(Dreadlands.id).spawnEntity(coords.x + .5, coords.y + .5, coords.z + .5, "abyss:chagoroth");
            }
        }
    }
});
//J'zahar
var JzaharPhrases = [
    "Player, do you realize I coult simply switch your Gamemode and slaught you right now?",
    "But yeah... that would technically be cheating, so I\'ll just stick to the \"rules\" and do nothing.",
    "Congratulations! YOU \'killed\' this puppet, but you can\'t kill a Great Old One...",
    "Let me unleash the last power contained within this hollow puppet, it\'ll give me the answer"
];
Callback.addCallback("ItemUse", function (coords, item, block, player) {
    if (BlockSource.getDefaultForActor(player) == BlockSource.getDefaultForDimension(Omothol.id)) {
        BlockSource.getDefaultForDimension(Omothol.id).spawnEntity(coords.x + .5, coords.y, coords.z + .5, "abyss:jzahar");
        Network.sendServerMessage(JzaharPhrases[0]);
        Network.sendServerMessage(JzaharPhrases[1]);
    }
});
Callback.addCallback("EntityDeath", function (entity, attacker, damageType) {
    if (!BlockSource.getDefaultForDimension(Omothol.id))
        return;
    if (Entity.getType(entity) == JZ.type) {
        Network.sendServerMessage(JzaharPhrases[2]);
        if (BlockSource.getDefaultForActor(attacker) == Omothol.id) {
            if (World.getThreadTime() % 780 == 0) {
                Dimensions.transfer(player, 0);
            }
        }
    }
});
var RVSettings = {
    size: 82,
    centre: {
        x: 500,
        y: 275
    },
    Rmul: 2.8,
    AngleMul: 0.8,
    Divider: 2.5
};
ModAPI.addAPICallback('RecipeViewer', function (RV) {
    RV.Core.registerRecipeType("Altar", {
        contents: {
            icon: BlockID.AltarAbyssalC,
            elements: {
                input0: {
                    type: "slot",
                    size: RVSettings.size,
                    x: RVSettings.centre.x - RVSettings.size / 2,
                    y: RVSettings.centre.y - RVSettings.size / 2 - RVSettings.size * RVSettings.Rmul
                },
                input1: {
                    type: "slot",
                    size: RVSettings.size,
                    x: RVSettings.centre.x - RVSettings.size / 2 + RVSettings.size * (RVSettings.Rmul / RVSettings.Divider),
                    y: RVSettings.centre.y - RVSettings.size / 2 - RVSettings.size * RVSettings.Rmul
                },
                input2: {
                    type: "slot",
                    size: RVSettings.size,
                    x: RVSettings.centre.x - RVSettings.size / 2 + RVSettings.size * RVSettings.Rmul,
                    y: RVSettings.centre.y - RVSettings.size / 2 - RVSettings.size * (RVSettings.Rmul / RVSettings.Divider)
                },
                input3: {
                    type: "slot",
                    size: RVSettings.size,
                    x: RVSettings.centre.x - RVSettings.size / 2 + RVSettings.size * RVSettings.Rmul,
                    y: RVSettings.centre.y - RVSettings.size / 2 + RVSettings.size * (RVSettings.Rmul / RVSettings.Divider)
                },
                input4: {
                    type: "slot",
                    size: RVSettings.size,
                    x: RVSettings.centre.x - RVSettings.size / 2 + RVSettings.size * (RVSettings.Rmul / RVSettings.Divider),
                    y: RVSettings.centre.y - RVSettings.size / 2 + RVSettings.size * RVSettings.Rmu
                },
                input5: {
                    type: "slot",
                    size: RVSettings.size,
                    x: RVSettings.centre.x - RVSettings.size / 2 - RVSettings.size * (RVSettings.Rmul / RVSettings.Divider),
                    y: RVSettings.centre.y - RVSettings.size / 2 + RVSettings.size * RVSettings.Rmul
                },
                input6: {
                    type: "slot",
                    size: RVSettings.size,
                    x: RVSettings.centre.x - RVSettings.size / 2 - RVSettings.size * RVSettings.Rmul,
                    y: RVSettings.centre.y - RVSettings.size / 2 + RVSettings.size * (RVSettings.Rmul / RVSettings.Divider)
                },
                input7: {
                    type: "slot",
                    size: RVSettings.size,
                    x: RVSettings.centre.x - RVSettings.size / 2 - RVSettings.size * RVSettings.Rmul * RVSettings.AngleMul,
                    y: RVSettings.centre.y - RVSettings.size / 2 - RVSettings.size * RVSettings.Rmul * RVSettings.AngleMul
                },
                input8: {
                    type: "slot",
                    size: RVSettings.size * 1.2,
                    x: RVSettings.centre.x - RVSettings.size / 2,
                    y: RVSettings.centre.y - RVSettings.size / 2
                },
                output0: {
                    type: "slot",
                    x: 840,
                    y: 215,
                    size: 120
                },
            }
        },
        getList: function (id, data, isUsage) {
            var list = [];
            var crafts;
            if (isUsage) {
                crafts = [];
                Crafts.find(function (element, index, array) {
                    var added = false;
                    for (var l in element.items) {
                        if (element.items[l][0] == id && element.items[l][1] == data && !added) {
                            crafts.push(element);
                            added = true;
                        }
                    }
                    if (element.centre[0] == id && element.centre[1] == data && !added) {
                        crafts.push(element);
                        added = true;
                    }
                });
            }
            else {
                crafts = AbyssTable.getCrafts([id, data]);
            }
            for (var i in crafts) {
                var input = [];
                if (crafts[i].rv) {
                    for (var k in crafts[i].rv) {
                        if (crafts[i].rv[k] == -1) {
                            input.push({
                                id: 0,
                                count: 0,
                                data: 0
                            });
                        }
                        else {
                            input.push({
                                id: Number(crafts[i].items[crafts[i].rv[k]][0]),
                                count: 1,
                                data: Number(crafts[i].items[crafts[i].rv[k]][1])
                            });
                        }
                    }
                }
                else {
                    for (var k in crafts[i].items) {
                        input.push({
                            id: Number(crafts[i].items[k][0]),
                            count: 1,
                            data: Number(crafts[i].items[k][1])
                        });
                    }
                }
                if (input.length < 16) {
                    for (var k = input.length; k < 16; k++) {
                        input.push({
                            id: 0,
                            count: 0,
                            data: 0
                        });
                    }
                }
                input.push({
                    id: Number(crafts[i].centre[0]),
                    count: 1,
                    data: Number(crafts[i].centre[1])
                });
                list.push({
                    input: input,
                    output: [{
                            id: Number(crafts[i].result[0]),
                            count: 1,
                            data: Number(crafts[i].result[1])
                        }]
                });
            }
            return list;
        }
    });
});
//crystals (by vstannumdum)
(function () {
    var materials = {
        "Iron": "железа",
        "Gold": "золота",
        "Sulfur": "серы",
        "Carbon": "углерода",
        "Oxygen": "кислорода",
        "Hydrogen": "водорода",
        "Nitrogen": "азота",
        "Phosphorus": "фосфора",
        "Potassium": "калия",
        "Nitrate": "нитрата",
        "Methane": "метана",
        "Redstone": "красного камня",
        "Abyssalnite": "абиссальнита",
        "Coralium": "коралла",
        "Dreadium": "страхолита",
        "Blaze": "пламени",
        "Tin": "олова",
        "Copper": "меди",
        "Silicon": "кремния",
        "Magnesium": "магния",
        "Aluminium": "алюминия",
        "Silica": "кремнезёма",
        "Alumina": "глинозёма",
        "Magnesia": "магнезии",
        "Zink": "цинка",
        "Calcium": "кальция",
        "Beryllium": "бериллия",
        "Beryl": "берилла"
    };
    var keys = Object.keys(materials);
    for (var i in keys) {
        var key = keys[i];
        var ruEnd = key == "Sulfur" || key == "Copper" ? "й" : "го";
        Translation.addTranslation("Crystallized " + key + " Cluster", { ru: "Кристаллизованное скопление " + materials[key] });
        Translation.addTranslation("Crystallized " + key, { ru: "Кусок кристаллизованно" + ruEnd + " " + materials[key] });
        Translation.addTranslation("Crystallized " + key + " Shard", { ru: "Осколок кристаллизованно" + ruEnd + " " + materials[key] });
        Translation.addTranslation("Crystallized " + key + " Fragment", { ru: "Фрагменти кристаллизованно" + ruEnd + " " + materials[key] });
    }
})();
Translation.addTranslation("Molecular Formula", { ru: "Молекулярная формула" });
Translation.addTranslation("Crystal Clusters", { ru: "Кристаллизованные скопления" });
Translation.addTranslation("Crystal Pieces", { ru: "Кристаллизованные куски" });
Translation.addTranslation("Crystal Shards", { ru: "Кристаллизованные осколки" });
Translation.addTranslation("Crystal Fragments", { ru: "Кристаллизованные фрагменты" });
Translation.addTranslation("Omothol Stone", { ru: "Камень тьмы" });
Translation.addTranslation("Geateway Key Tier 3", { ru: "Ключ от врат 3 тира" });
