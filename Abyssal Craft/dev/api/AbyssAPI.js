//Generation
var UniqueGen = { 
randomCoords: function(random, chunkX, chunkZ, minHeight, maxHeight){
minHeight = minHeight || 0;
maxHeight = maxHeight || 128;
 var x = chunkX*16 + random.nextInt(16);
 var z = chunkZ*16 + random.nextInt(16);
 var y = random.nextInt(maxHeight - minHeight + 1) - minHeight;
return {x: x, y: y, z: z};
},    
generateOre: function(id, data, chunkX, chunkZ, random, params) {  
for (var i = 0; i < params.veinCounts; i++) { 
var coords = this.randomCoords(random, chunkX, chunkZ, params.minY, params.maxY); 
GenerationUtils.generateOre(coords.x, coords.y, coords.z, id, data,  params.size, false, random.nextInt());
   } 
},
generateOreInDimension: function(id, data, chunkX, chunkZ, random, params) {  
for (var i = 0; i < params.veinCounts; i++) { 
var coords = this.randomCoords(random, chunkX, chunkZ, params.minY, params.maxY); 
GenerationUtils.generateOreCustom(coords.x, coords.y, coords.z, id, data, params.size, params.mode, params.check);
      }  
   }
}

ToolAPI.addToolMaterial("ds", {durability: 940, level: 2, efficiency: 4, damage: 4, enchantability: 4});    

//Necronomicons
var Necronomicons = {
//CONTAINERS 
Books:[],
Drains:[],
//connections: [{x: 3, z: 0}, {x: -3, z: 0}, {x: 0, z: 3}, {x: 0, z: -3},{x: 2, z: 2}, {x: -2, z: 2}, {x: 2, z: -2}, {x: -2, z: -2}],
//REGISTRATION
setUpAsNecronomicon:function(params){
if(!params.id)  
return Logger.LogError("{setUpAsNecronomicon} params.id должен быть строкой", "Necronomicons");
if(!params.name)   
return Logger.LogError("{setUpAsNecronomicon} params.name должен быть строкой", "Necronomicons"); 
if(!params.texture)   
return Logger.LogError("{setUpAsNecronomicon} params.name должен быть строкой", "Necronomicons");             
if(!params.maxPE)  
return Logger.LogError("{setUpAsNecronomicon} params.maxPE должен быть числом", "Necronomicons");
if(!params.PEvalue)  
return Logger.LogError("{setUpAsNecronomicon} params.maxPE должен быть числом", "Necronomicons"); 
if(!params.tier)  
return Logger.LogError("{setUpAsNecronomicon} params.tier должен быть числом", "Necronomicons"); 
if(!params.isChargable)  
return Logger.LogError("{setUpAsNecronomicon} params.isChragable должен присутсвовать", "Necronomicons"); 
this.Books.push(params); 
},
setUpNecronomicons:function() {
   var Books = this.Books;
     for (var i in Books) {
       var Book = Books[i];   
         IDRegistry.genItemID(Book.id);
           Item.createItem(Book.id, Book.name, {name: Book.texture},{isTech:false,stack:1});
             Item.setMaxDamage(Book.id, Book.maxPE + 1);        
    }     
},
//NRG
getBookData: function(idb) {    
   for (var t in this.Books) { 
     if (this.Books[t].id == idb) {   
       return this.Books[t];
        }
    }
},
getPEFromItem: function(idb) {
   var data = this.getBookData(idb);
     if(!data) {
       return 0;
        }
       return Math.min(data.maxPE - item.data, data.PEvalue);
},
decreasePEFromItem: function(idb, count) {    
   if (this.getPEFromItem(idb) != 0 && this.getPEFromItem(idb) >= count) {
       return this.getBookData(idb).PEvalue -= count;  
        }
},
encreasePEFromItem: function(idb, count) {    
   if (this.getPEFromItem(idb) != 0 && this.getPEFromItem(idb) >= count) {
       return this.getBookData(idb).PEvalue += count;  
        }
}
} 

Callback.addCallback("PreLoaded", function() { 
Necronomicons.setUpNecronomicons();   
});

var Str = {
BuildF:55,
TreesF:26,
generateTrees:function(chunkX, chunkZ, names, params) {
 for(var i in names){
  var coords = GenerationUtils.randomCoords(chunkX, chunkZ, params.min_y, params.max_y);
   if (World.getBlockID(coords.x,coords.y,coords.z)==params.check) {
  Structure.setInWorld(names[i], coords.x, coords.y+1, coords.z, [Structure.ROTATE_90Y,Structure.ROTATE_270Y,Structure.ROTATE_180Y], false, 2);
    } 
  }
},

generateBuildings:function(chunkX, chunkZ, names, params) {
 for (var i in names) {
  var coords = GenerationUtils.randomCoords(chunkX, chunkZ, params.min_y, params.max_y);
   if (World.getBlockID(coords.x,coords.y,coords.z)==params.check) {
  Structure.setInWorld(names[i], coords.x, coords.y, coords.z, [Structure.ROTATE_90Y,Structure.ROTATE_270Y,Structure.ROTATE_180Y], false, 2);
    } 
  }
},

generateShoggoth:function(chunkX, chunkZ, name, params) {
 var coords = GenerationUtils.randomCoords(chunkX, chunkZ, params.min_y, params.max_y);
  if (World.getBlockID(coords.x,coords.y,coords.z)==params.check) {
  Structure.setInWorld(name, coords.x, coords.y-2, coords.z, [Structure.ROTATE_90Y,Structure.ROTATE_270Y,Structure.ROTATE_180Y], false, 2);
    }
  }
}

const Crafts = [];

const onCraftStart = {};

const onCraftEnd = {}

const AbyssTable = { 
    addCraft: function(items, targetItem, result, recipeviewer_order, PE) {
        if (!items) return Logger.Log("items not listed", "AbyssAPI ERROR");
        if (!targetItem) return Logger.Log("targetItem not listed", "AbyssAPI ERROR");
        if (!result) return Logger.Log("result not listed", "AbyssAPI ERROR");
        if (recipeviewer_order && recipeviewer_order.length != 16) recipeviewer_order = null;
        Crafts.push({
            items: items,
            centre: targetItem,
            result: result,
            rv: recipeviewer_order     
        });
    },
    
    removeCraft: function(item) {
        if (!item) return Logger.Log("item not listed", "AbyssAPI ERROR");
        Crafts.splice(Crafts.find(function(element, index, array) {
            if (element.result[0] == item[0] && element.result[1] == item[1]) return index;
        }), 1)
    },
    
    getCraft: function(item) {
        if (!item) return Logger.Log("item not listed", "AbyssAPI ERROR");
        return Crafts.find(function(element, index, array) {
            if (element.result[0] == item[0] && (element.result[1] == item[1] || item[1] == -1)) return element;
        })
    },
    
    getCrafts: function(item) {
        if (!item) return Logger.Log("item not listed", "AbyssAPI ERROR");
        var listCrafts = [];
        Crafts.find(function(element, index, array) {
            if (element.result[0] == item[0] && (element.result[1] == item[1] || item[1] == -1)) listCrafts.push(element);
        })
        return listCrafts;
    },
    
    getPE: function(item) {
      for (var l in Crafts) {
        if (Player.getCarriedItem().id == item && Necronomicons.getPEFromItem(item) >= Crafts[l].PE)
          return;        
        }  
    },
    
    onCraftStart: function(item, func) {
        if (!item) return Logger.Log("item not listed", "AbyssAPI ERROR");
        if (!func) return Logger.Log("func not listed", "AbyssAPI ERROR");
        onCraftStart[item.toString()] = func;
    },
    
    onCraftEnd: function(item, func) {
        if (!item) return Logger.Log("item not listed", "AbyssAPI ERROR");
        if (!func) return Logger.Log("func not listed", "AbyssAPI ERROR");
        onCraftEnd[item.toString()] = func;
    } 
}

const AbyssalMachine = {
  init: function(id, Prototype){
    if(Prototype.defaultValues && Prototype.defaultValues.isActive !== undefined){
			if(!Prototype.renderModel){
				Prototype.renderModel = function(){
          TileRenderer.mapAtCoords(this.x, this.y, this.z, this.blockID, this.data.meta + (this.data.isActive? 4 : 0));
        }
			};
			Prototype.setActive = Prototype.setActive || this.setActive;
			Prototype.activate = Prototype.activate || function(){
				this.setActive(true);
			}
			Prototype.deactivate = Prototype.deactivate || function(){
				this.setActive(false);
			}
			Prototype.destroy = Prototype.destroy || function(){
				BlockRenderer.unmapAtCoords(this.x, this.y, this.z);
			}
    }
    if(!Prototype.init && Prototype.renderModel){
			Prototype.init = Prototype.renderModel;
		}
    TileEntity.registerPrototype(id, Prototype);
  },
  setActive: function(isActive){
    if(this.data.isActive != isActive){
			this.data.isActive = isActive;
			if(this.data.isActive){
        TileRenderer.mapAtCoords(this.x, this.y, this.z, this.blockID, 0);
      } else {
        BlockRenderer.unmapAtCoords(this.x, this.y, this.z);
      }
		}
  }
}

const Crystallizer = {
  recipes: [],
  fuel: {},
  addFuel: function(id, ticks){
    this.fuel[id] = ticks;
  },
  addFuels: function(fuels){
    for(let i in fuels){
      this.addFuel(fuels[i][0], fuels[i][1]);
    }
  },
  isValidFuel: function(id){
    return this.fuel[id] || -1;
  },
  addRecipe: function(src, result, exp){
    this.recipes.push({
      src: src,
      result: result,
      exp: exp
    });
  },
  addRecipes: function(recipes){
    for(let i in recipes){
      this.addRecipe(recipes[i][0], recipes[i][1], recipes[i][2]);
    }
  },
  isValidRecipe: function(src){
    return this.recipes.find(function(item){
      return item.src[0] == src.id && item.src[1] == src.data;
    });
  },
  getRecipeResult: function(src){
    this.recipes.find(function(item){
      if(item.src[0] == src.id && item.src[1] == src.data){
        return {
          result: item.result,
          exp: item.exp
        }
      }
    }) || -1;
  },
  deleteRecipe: function(src){
    this.recipes.splice(this.recipes.find(function(item, index){
      if(item.src[0] == src.id && item.src[1] == src.data){
        return index;
      }
    }), 1);
  }
}