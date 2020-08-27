/*
NIDE BUILD INFO:
  dir: dev
  target: main.js
  files: 17
*/



// file: header.js

//IMPORT("dimensions");
IMPORT("SoundAPI");
IMPORT("ToolLib");
IMPORT("TileRender");
IMPORT("StructuresAPI");
IMPORT("PortalUtils");

function randomInt(min, max){ 
return Math.floor(Math.random() * (max - min + 1)) + min; 
}

var elder_screams = new Sound("cthulhu_2.ogg");
var levelloaded = false;

const searchItem = function(id, data){
    var dat = data || -1;
    var od = id || -1;
    for(var i = 9;i < 45;i++) {
     var item = Player.getInventorySlot(i);
        if((item.id == od || (od == -1 && item.id != 0)) && (item.data == dat || dat == -1)){
            return {
                id: item.id,
                data: item.data,
                extra: item.extra,
                count: item.count,
                slot: i
            }
        }
    }
}

const getPointed = ModAPI.requireGlobal("Player.getPointed");

const setTimeout = function(func, ticks){
    var upd = {
        ticks: 0,
        update: function(){
            this.ticks++
            if(this.ticks >= ticks){
                func();
                this.remove = true
            }
        }
    };
    Updatable.addUpdatable(upd);
}

const setInterval = function(func, ticks){
    var upd = {
        ticks: 0,
        update: function(){
            this.ticks++
            if(this.ticks >= ticks){
                this.ticks = 0;
                if(func())this.remove = true;
            }
        }
    };
    Updatable.addUpdatable(upd);
    return upd;
}

const clearInterval = function(upd){
    if(upd && upd == {} && upd.remove){
        upd.remove = true;
    }
}

Callback.addCallback("LevelLoaded", function(){
    levelloaded = true
})

Callback.addCallback("LevelLeft", function(){ 
    levelloaded = false
});

const items_vanilla = [6,27,28,30,32,37,38,39,40,50,69,76, 102,106,111,126,175,256,257,258,259,260,261,262,263,264,265,266,267,268,269,270,271,272,273,274,275,276,277,278,279,280,281,282,283,284,285,286,287,288,289,290,291,292,293,294,295,296,297,298,299,300,301,302,303,304,305,306,307,308,309,310,311,312,313,314,315,316,317,318,319,320,321,322,323,324,325,326,327,328,329,330,331,332,333,334,335,336,337,338,339,340,341,342,343,344,345,346,347,348,349,350,351,352,353,354,355,356,357,358,359,360,361,362,363,364,365,366,367,368,369,370,371,372,373,374,375,376,377,378,379,380,381,382,383,384,385,386,387,388,389,390,391,392,393,394,395,396,397,398,399,400,401,402,403,404,405,406,407,408,409,410,411,412,413,414,415,416,417,418,419,420,421,422,423,424,425,426,427,428,429,430,431,432,433,434,435,436,437,438,439,440,441,442,443,444,445,446,447,448,449,450,451,452,453,454,455,456,457,458,459,460,461,462,463,464,465,466,467,468,469,470,471,472,473,474,475,476,477,478,479,480,481,482,483,484,485,486,487,488,489,490,491,492,493,494,495,496,497,498,499,500,501,502,503,504,505,506,507,508,509,510,511];
const blocks_vanilla = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255];
const items_and_blocks_vanilla = items_vanilla.concat(blocks_vanilla);

var all_items = items_vanilla;
var all_blocks = blocks_vanilla;
var all_items_and_blocks;


Callback.addCallback("ModsLoaded", function () {
    for(var i in ItemID){
        all_items.push(ItemID[i]);
    };
    for(var i in BlockID){
        all_blocks.push(BlockID[i]);
    };
    all_items_and_blocks = all_items.concat(all_blocks); 
});

const allParams = function(json, fullParams){
 if(typeof(json) != "object") return json;
 var params = '{\n';
 for(var key in json){
    if(fullParams){
     params += key + ' : ' + allParams(json[key], true) + '\n';
    } else {
     params += key + ' : ' + json[key] + '\n';
    }
 }
 params += '}';
 return params;
}

const JSONlength = function(json){
    var length = 0;
    for(var i in json){
        length++
    }
    return length;
}

const setCharAt = function (str,index,chr) { 
    if(index > str.length-1) return str; 
    return str.substr(0,index) + chr + str.substr(index+chr.length); 
}

const Timer = java.util.Timer;
const TimerTask = java.util.TimerTask;

const jSetInterval = function(__fun, __mil){
    var timer = new Timer();
    var task = new TimerTask({
        run: function(){
            if(__fun())timer.cancel();
        }
    })
    timer.scheduleAtFixedRate(task, 0, __mil);
    return timer;
}

const jSetTimeout = function(__fun, __mil){
    var timer = new Timer();
    var task = new TimerTask({
        run: function(){
            if(__fun())timer.cancel();
        }
    })
    timer.schedule(task, __mil);
    return timer;
}

const jClearInterval = function(__interval){
    if(__interval && __interval.cancel)__interval.cancel();
}

const sides = [
    [1, 0, 0],
    [-1, 0, 0],
    [0, 0, 1],
    [0, 0, -1],
    [0, 1, 0],
    [0, -1, 0]
];

const drop = function(x, y, z, id, count, data, extra){
  var container = new UI.Container();
  var item = container.getSlot("asd");
  item.id = Number(id);
  item.count = Number(count);
  item.data = Number(data);
  item.extra = extra;
  container.dropAt(x, y, z);
}

const onCallbacks = {};

function onCallback(name,func){
  if(!onCallbacks[name]){
    onCallbacks[name] = [];
    Callback.addCallback(name, function (a,b,c,d,e,f,g,h){
      for(var i in onCallbacks[name]){
        var res = onCallbacks[name][i](a,b,c,d,e,f,g,h);
        if(res == "delete")onCallbacks[name].splice(i,1);
      }
    });
  }
  onCallbacks[name].push(func);
}



// file: api/AbyssAPI.js

//Generation
var UniqueGen = { 
generateOre: function(id, data, chunkX, chunkZ, params) {  
for (var i = 0; i < params.veinCounts; i++) { 
var coords = GenerationUtils.randomCoords(chunkX, chunkZ, params.min_y, params.max_y); 
if (Math.random() < params.veinChance) GenerationUtils.genMinable(coords.x, coords.y, coords.z, { 
id: id, 
data: data, 
size: params.size, 
ratio: params.ratio, 
checkerTile: params.checkerTile, 
checkerMode: params.checkerMode 
      }); 
   }  
},
generateOreInDimension: function(id, data, chunkX, chunkZ, params){  
for (var i = 0; i < params.veinCounts; i++){ 
var coords = GenerationUtils.randomCoords(chunkX, chunkZ, params.min_y, params.max_y); 
if(Math.random() * 100 < params.veinChance)GenerationUtils.generateOreCustom(coords.x, coords.y, coords.z, id, data, params.count, params.mode, params.check);
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
},
showPE: function(idbs) {
 for(var k in idbs) {
  Callback.addCallback("ItemUseNoTarget", function(item){
   if (Player.getCarriedItem().id == idbs[k])
     Game.tipMessage("PE  " + this.getPEFromItem(idbs[k]));
        });
    }
}
} 

Callback.addCallback("PreLoaded", function() { 
Necronomicons.setUpNecronomicons();   
});

/*Callback.addCallback("tick", function() {
Necronomicons.showPE([ItemID.normalNecronomicon, ItemID.normalNecronomiconC, ItemID.abyssNecronomicon, ItemID.drainS, ItemID.drainSA, ItemID.drainSD, ItemID.drainSO]);
});*/

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
generateShoggoth:function(chunkX, chunkZ, names, params) {
var coords = GenerationUtils.randomCoords(chunkX, chunkZ, params.min_y, params.max_y);
if (World.getBlockID(coords.x,coords.y,coords.z)==params.check) {
  Structure.setInWorld(names, coords.x, coords.y-2, coords.z, [Structure.ROTATE_90Y,Structure.ROTATE_270Y,Structure.ROTATE_180Y], false, 2);
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
    
    onCraftStart: function(item, func) {
        if (!item) return Logger.Log("item not listed", "AbyssAPI ERROR");
        if (!func) return Logger.Log("func not listed", "AbyssAPI ERROR");
        onCraftStart[item.toString()] = func;
    },
    
    onCraftEnd: function(item, func) {
        if (!item) return Logger.Log("item not listed", "AbyssAPI ERROR");
        if (!func) return Logger.Log("func not listed", "AbyssAPI ERROR");
        onCraftEnd[item.toString()] = func;
    },
    getPE: function(item) {
      for (var l in Crafts) {
        if (Player.getCarriedItem().id == item && Necronomicons.getPEFromItem(item) >= Crafts[l].PE)
          return;        
        }  
    }
}



// file: Ablocks/terrain.js

var BLOCK_TYPE_STONE = Block.createSpecialType({
    base: 1,
    solid: true,
    renderlayer: 2,
    explosionres: 15,
    lightopacity: 15,
    translucency: 0
});

var BLOCK_TYPE_LIGHT = Block.createSpecialType({
     lightlevel: 6,
     explosionres: 2,
     lightopacity: 15 
});

var BLOCK_TYPE_GLASS = Block.createSpecialType({
    lightopacity: 2,
    destroytime: 1, 
    renderlayer: 1
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

IDRegistry.genBlockID("grassDark");
Block.createBlock("grassDark", [
{name: "Dark Lands Grass", texture: [["DLGbottom", 0], ["DLGtop", 0], ["DLGSides", 1]], inCreative: true}], "opaque");
ToolAPI.registerBlockMaterial(BlockID.grassDark, "dirt", 0, true);

IDRegistry.genBlockID("stoneDark"); 
Block.createBlock("stoneDark", [
{name: "Dark Stone", texture: [["DS", 0]],inCreative: true}], BLOCK_TYPE_STONE);

IDRegistry.genBlockID("stoneDABri"); 
Block.createBlock("stoneDABri", [
{name: "Dark Bricks", texture: [["DSB", 0]],inCreative: true}], BLOCK_TYPE_STONE);

IDRegistry.genBlockID("stoneDABrik"); 
Block.createBlock("stoneDABrik", [
{name: "Dark Bricks", texture: [["DSBf", 0]],inCreative: true}], BLOCK_TYPE_STONE);

IDRegistry.genBlockID("stoneDarkL"); 
Block.createBlock("stoneDarkL", [
{name: "Dark Stone Beacon", texture: [["DSsTop", 0], ["DSsTop", 0], ["DSGlow", 0]],inCreative: true}], BLOCK_TYPE_LIGHT);

//ingots blocks
IDRegistry.genBlockID("blockAbyssalinite"); 
Block.createBlock("blockAbyssalinite", [
{name: "Block of Abyssalinite", texture: [["BOA", 0]],inCreative: true}], BLOCK_TYPE_UNI);

IDRegistry.genBlockID("blockCoralium"); 
Block.createBlock("blockCoralium", [
{name: "Block of Coralium", texture: [["BOC", 0]],inCreative: true}], BLOCK_TYPE_UNI);

IDRegistry.genBlockID("blockDreadalinite"); 
Block.createBlock("blockDreadalinite", [
{name: "Block of Dreadalinite", texture: [["BOD", 0]],inCreative: true}], BLOCK_TYPE_UNI);

IDRegistry.genBlockID("blockEthaxium"); 
Block.createBlock("blockEthaxium", [
{name: "Block of Ethaxium", texture: [["BOE", 0]],inCreative: true}], BLOCK_TYPE_UNI);

IDRegistry.genBlockID("grassAbyss");
Block.createBlock("grassAbyss", [
{name: "Abyssal Wastlands Grass", texture: [["abyssalsand", 0], ["fusedabyssalsand", 0], ["fusedabyssalsand_side", 0]],inCreative: true}], "opaque");
ToolAPI.registerBlockMaterial(BlockID.grassAbyss, "dirt", 0, true);

IDRegistry.genBlockID("sandAbyss");
Block.createBlock("sandAbyss",[
{name: "Abyssal Wastlands Sand", texture: [["abyssalsand", 0]], inCreative: true}], "opaque");
ToolAPI.registerBlockMaterial(BlockID.sandAbyss, "dirt", 0, true);

IDRegistry.genBlockID("glassAbyss"); 
Block.createBlock("glassAbyss", [
{name: "Abyssal Waste Glass", texture: [["abyssalsandglass", 0]],inCreative: true}], BLOCK_TYPE_GLASS);

IDRegistry.genBlockID("stoneAbyss"); 
Block.createBlock("stoneAbyss", [
{name: "Abyssal Waste Stone", texture: [["AS", 0]],inCreative: true}], BLOCK_TYPE_STONE);

IDRegistry.genBlockID("stoneABri"); 
Block.createBlock("stoneABri", [
{name: "Abyssal Waste Bricks", texture: [["ASB", 0]],inCreative: true}], BLOCK_TYPE_STONE);

IDRegistry.genBlockID("stoneABrik"); 
Block.createBlock("stoneABrik", [
{name: "Abyssal Waste Bricks", texture: [["ASBf", 0]],inCreative: true}], BLOCK_TYPE_STONE);

IDRegistry.genBlockID("grassDread");
Block.createBlock("grassDread", [
{name: "Dreaded Wastlands Grass", texture: [["DLGbottom", 0], ["DrGtop", 0], ["DRGSides", 1]], inCreative: true}], "opaque");
ToolAPI.registerBlockMaterial(BlockID.grassDread, "dirt", 0, true);

IDRegistry.genBlockID("stoneDread"); 
Block.createBlock("stoneDread", [
{name: "Dread Lands Stone", texture: [["DrS", 0]],inCreative: true}], BLOCK_TYPE_STONE);

IDRegistry.genBlockID("stoneDBri"); 
Block.createBlock("stoneDBri", [
{name: "Dread Lands Bricks", texture: [["DrSB", 0]],inCreative: true}], BLOCK_TYPE_STONE);

IDRegistry.genBlockID("stoneDBrik"); 
Block.createBlock("stoneDBrik", [
{name: "Dread Lands Bricks", texture: [["DrSBf", 0]],inCreative: true}], BLOCK_TYPE_STONE);

IDRegistry.genBlockID("Etx"); 
Block.createBlock("Etx", [
{name: "Etaxium", texture: [["Eth", 0]],inCreative: true}], BLOCK_TYPE_STONE);

IDRegistry.genBlockID("stoneEtxb"); 
Block.createBlock("stoneEtxb", [
{name: "Ethaxium Bricks", texture: [["EB", 0]],inCreative: true}], BLOCK_TYPE_STONE);

IDRegistry.genBlockID("stoneEtxB"); 
Block.createBlock("stoneEtxB", [
{name: "Ethaxium Bricks", texture: [["EBC", 0]],inCreative: true}], BLOCK_TYPE_STONE);

IDRegistry.genBlockID("stoneEtxP"); 
Block.createBlock("stoneEtxP", [
{name: "Ethaxium Pillar", texture: [["EBP_top", 0], ["EBP_top", 0], ["EBP", 0]],inCreative: true}], BLOCK_TYPE_STONE);


Callback.addCallback('PostLoaded', function () {
Recipes.addShaped({id: BlockID.stoneDABrik, count: 4, data: 0}, [
"xx",
"xx",
], ['x', BlockID.stoneDark, 0]);

Recipes.addShaped({id: BlockID.stoneABrik, count: 4, data: 0}, [
"xx",
"xx",
], ['x', BlockID.stoneAbyss, 0]);

Recipes.addShaped({id: BlockID.stoneDBrik, count: 4, data: 0}, [
"xx",
"xx",
], ['x', BlockID.stoneDread, 0]);

Recipes.addFurnace(BlockID.stoneDark, BlockID.stoneDABri, 0);
Recipes.addFurnace(BlockID.stoneAbyss, BlockID.stoneABri, 0);
Recipes.addFurnace(BlockID.stoneAbyss, BlockID.stoneABri, 0);
Recipes.addFurnace(BlockID.Etx, BlockID.stoneEtxb, 0);
Recipes.addFurnace(BlockID.Etx, BlockID.stoneEtxB, 0);
});



// file: Ablocks/altar&pillars/Registry.js

IDRegistry.genBlockID("AltarAbyssalC");
Block.createBlockWithRotation("AltarAbyssalC", [
{name: "Abyssal Altar", texture: [["coblestone", 0], ["coblestone", 0], ["coblestone", 0]], inCreative: true}]);
ToolAPI.registerBlockMaterial(BlockID.AltarAbyssalC, "stone", 1, true);

IDRegistry.genBlockID("PillarAbyssalC");
Block.createBlockWithRotation("PillarAbyssalC", [
{name: "Abyssal Pillar", texture: [["coblestone", 0], ["overlay", 0], ["coblestone", 0]], inCreative: true}]);
ToolAPI.registerBlockMaterial(BlockID.PillarAbyssalC, "stone", 1, true);


var PillarRender = new ICRender.Model();
BlockRenderer.setStaticICRender(BlockID.PillarAbyssalC, -1, PillarRender);
var PillarModel = BlockRenderer.createModel();

PillarModel.addBox(4/16, 0/16, 4/16, 12/16, 2/16, 12/16, "cobblestone", 0);
PillarModel.addBox(4.5/16, 2/16, 4.5/16, 11.5/16, 3/16, 11.5/16, "cobblestone", 0);
PillarModel.addBox(5/16, 3/16, 10/16, 6/16, 13/16, 11/16, "cobblestone", 0);
PillarModel.addBox(10/16, 3/16, 10/16, 11/16, 13/16, 11/16, "cobblestone", 0);
PillarModel.addBox(10/16, 3/16, 5/16, 11/16, 13/16, 6/16, "cobblestone", 0);
PillarModel.addBox(5/16, 3/16, 5/16, 6/16, 13/16, 6/16, "cobblestone", 0);
PillarModel.addBox(5.5/16, 3/16, 5.5/16, 10.5/16, 13/16, 10.5/16, "cobblestone", 0);
PillarModel.addBox(4.5/16, 13/16, 4.5/16, 11.5/16, 14/16, 11.5/16, "cobblestone", 0);
PillarModel.addBox(4/16, 14/16, 4/16, 12/16, 15/16, 12/16, "cobblestone", 0);//tyt
PillarModel.addBox(11/16, 15/16, 4/16, 12/16, 16/16, 5/16, "cobblestone", 0);
PillarModel.addBox(11/16, 15/16, 11/16, 12/16, 16/16, 12/16, "cobblestone", 0);
PillarModel.addBox(4/16, 15/16, 11/16, 5/16, 16/16, 12/16, "cobblestone", 0);
PillarModel.addBox(4/16, 15/16, 4/16, 5/16, 16/16, 5/16, "cobblestone", 0);
PillarModel.addBox(7.5/16, 15/16, 4/16, 8.5/16, 16/16, 5/16, "cobblestone", 0);
PillarModel.addBox(7.5/16, 15/16, 11/16, 8.5/16, 16/16, 12/16, "cobblestone", 0);
PillarModel.addBox(4/16, 15/16, 7.5/16, 5/16, 16/16, 8.5/16, "cobblestone", 0);
PillarModel.addBox(11/16, 15/16, 7.5/16, 12/16, 16/16, 8.5/16, "cobblestone", 0);

PillarRender.addEntry(PillarModel);
Block.setShape(BlockID.PillarAbyssalC, 2/16, 0/16, 2/16, 14/16, 16/16, 14/16);

var Altrender = new ICRender.Model();
BlockRenderer.setStaticICRender(BlockID.AltarAbyssalC, -1, Altrender);
var Altmodel = BlockRenderer.createModel();

Altmodel.addBox(2.5/16, 0/16, 2.5/16, 13.5/16, 2/16, 13.5/16, "cobblestone", 0);
Altmodel.addBox(3/16, 2/16, 3/16, 13/16, 3/16, 13/16, "cobblestone", 0);
Altmodel.addBox(11/16, 3/16, 11/16, 12/16, 11/16, 12/16, "cobblestone", 0);
Altmodel.addBox(4/16, 3/16, 11/16, 5/16, 11/16, 12/16, "cobblestone", 0);
Altmodel.addBox(4/16, 3/16, 4/16, 5/16, 11/16, 5/16, "cobblestone", 0);
Altmodel.addBox(11/16, 3/16, 4/16, 12/16, 11/16, 5/16, "cobblestone", 0);
Altmodel.addBox(5/16, 3/16, 5/16, 11/16, 11/16, 11/16, "cobblestone", 0);
Altmodel.addBox(4.5/16, 6/16, 5/16, 5/16, 8/16, 11/16, "cobblestone", 0);
Altmodel.addBox(11/16, 6/16, 5/16, 11.5/16, 8/16, 11/16, "cobblestone", 0);
Altmodel.addBox(5/16, 6/16, 11/16, 11/16, 8/16, 11.5/16, "cobblestone", 0);
Altmodel.addBox(5/16, 6/16, 4.5/16, 11/16, 8/16, 5/16, "cobblestone", 0);
Altmodel.addBox(2/16, 12/16, 2/16, 14/16, 13/16, 14/16, "cobblestone", 0);
Altmodel.addBox(3/16, 11/16, 3/16, 13/16, 12/16, 13/16, "cobblestone", 0);
Altmodel.addBox(5/16, 13/16, 5/16, 11/16, 14/16, 11/16, "BOD", 0);
Altmodel.addBox(3/16, 13/16, 3/16, 4/16, 16/16, 4/16, "cobblestone", 0);
Altmodel.addBox(12/16, 13/16, 3/16, 13/16, 16/16, 4/16, "cobblestone", 0);
Altmodel.addBox(12/16, 13/16, 12/16, 13/16, 16/16, 13/16, "cobblestone", 0);
Altmodel.addBox(3/16, 13/16, 12/16, 4/16, 16/16, 13/16, "cobblestone", 0);
Altrender.addEntry(Altmodel);

IDRegistry.genBlockID("Pedestal");
Block.createBlockWithRotation("Pedestal", [
{name: "Energy Pedestal", texture: [["monolithStone", 0], ["overlay", 0], ["monolithStone", 0]], inCreative: true}]);
ToolAPI.registerBlockMaterial(BlockID.Pedestal, "stone", 0, true);

Block.setShape(BlockID.Pedestal, 2/16, 0/16, 2/16, 14/16, 16/16, 14/16);

var PedestalRender = new ICRender.Model();
BlockRenderer.setStaticICRender(BlockID.Pedestal, -1, PedestalRender);
var PedestalModel = BlockRenderer.createModel();

PedestalModel.addBox(4/16, 0/16, 4/16, 12/16, 2/16, 12/16, "monolithStone", 0);
PedestalModel.addBox(4.5/16, 2/16, 4.5/16, 11.5/16, 3/16, 11.5/16, "monolithStone", 0);
PedestalModel.addBox(5/16, 3/16, 10/16, 6/16, 13/16, 11/16, "monolithStone", 0);
PedestalModel.addBox(10/16, 3/16, 10/16, 11/16, 13/16, 11/16, "monolithStone", 0);
PedestalModel.addBox(10/16, 3/16, 5/16, 11/16, 13/16, 6/16, "monolithStone", 0);
PedestalModel.addBox(5/16, 3/16, 5/16, 6/16, 13/16, 6/16, "monolithStone", 0);
PedestalModel.addBox(5.5/16, 3/16, 5.5/16, 10.5/16, 13/16, 10.5/16, "monolithStone", 0);
PedestalModel.addBox(4.5/16, 13/16, 4.5/16, 11.5/16, 14/16, 11.5/16, "monolithStone", 0);
PedestalModel.addBox(4/16, 14/16, 4/16, 12/16, 15/16, 12/16, "monolithStone", 0);//tyt
PedestalRender.addEntry(PedestalModel);

IDRegistry.genBlockID("PedestalN");
Block.createBlockWithRotation("PedestalN", [
{name: "Energy Pedestal Overworld", texture: [["cobblestone", 0], ["overlay", 0], ["cobblestone", 0]], inCreative: true}]);
ToolAPI.registerBlockMaterial(BlockID.Pedestal, "stone", 0, true);

Block.setShape(BlockID.PedestalN, 2/16, 0/16, 2/16, 14/16, 16/16, 14/16);

var PedestalRenderN = new ICRender.Model();
BlockRenderer.setStaticICRender(BlockID.PedestalN, -1, PedestalRenderN);
var PedestalModelN = BlockRenderer.createModel();

PedestalModelN.addBox(4/16, 0/16, 4/16, 12/16, 2/16, 12/16, "cobblestone", 0);
PedestalModelN.addBox(4.5/16, 2/16, 4.5/16, 11.5/16, 3/16, 11.5/16, "cobblestone", 0);
PedestalModelN.addBox(5/16, 3/16, 10/16, 6/16, 13/16, 11/16, "cobblestone", 0);
PedestalModelN.addBox(10/16, 3/16, 10/16, 11/16, 13/16, 11/16, "cobblestone", 0);
PedestalModelN.addBox(10/16, 3/16, 5/16, 11/16, 13/16, 6/16, "cobblestone", 0);
PedestalModelN.addBox(5/16, 3/16, 5/16, 6/16, 13/16, 6/16, "cobblestone", 0);
PedestalModelN.addBox(5.5/16, 3/16, 5.5/16, 10.5/16, 13/16, 10.5/16, "cobblestone", 0);
PedestalModelN.addBox(4.5/16, 13/16, 4.5/16, 11.5/16, 14/16, 11.5/16, "cobblestone", 0);
PedestalModelN.addBox(4/16, 14/16, 4/16, 12/16, 15/16, 12/16, "cobblestone", 0);//tyt
PedestalRenderN.addEntry(PedestalModelN);

Item.addCreativeGroup("Altars & Sacrafices", "Altars & Sacrafices", [BlockID.AltarAbyssalC]);
Item.addCreativeGroup("Pillars & Energy", "Pillars & Energy", [BlockID.PillarAbyssalC, BlockID.Pedestal, BlockID.PedestalN]);


IDRegistry.genBlockID("statueCt");
Block.createBlockWithRotation("statueCt", [
{name: "Cthulhu statue", texture: [["cthulhustatue", 0]], inCreative: true}]);
ToolAPI.registerBlockMaterial(BlockID.statueCt, "stone", 1, true);

var CTmesh = new RenderMesh();
CTmesh.setBlockTexture("cthulhustatue",0);
CTmesh.importFromFile(__dir__+"/models/ctulhu.obj","obj",{translate: [0.5, 0, 0.5]});
var CTrender = new ICRender.Model();
CTrender.addEntry(new BlockRenderer.Model(CTmesh));
BlockRenderer.setStaticICRender(BlockID.statueCt,0,CTrender);

IDRegistry.genBlockID("statueJz");
Block.createBlockWithRotation("statueJz", [
{name: "J'zahar statue", texture: [["jzaharstatue", 0]], inCreative: true}]);
ToolAPI.registerBlockMaterial(BlockID.statueJz, "stone", 1, true);

var Jzmesh = new RenderMesh();
Jzmesh.setBlockTexture("jzaharstatue",0);
Jzmesh.importFromFile(__dir__+"/models/jzahar.obj","obj",{translate: [0.5, 0, 0.5]});
var Jzrender = new ICRender.Model();
Jzrender.addEntry(new BlockRenderer.Model(Jzmesh));
BlockRenderer.setStaticICRender(BlockID.statueJz,0,Jzrender);

IDRegistry.genBlockID("statueAz");
Block.createBlockWithRotation("statueAz", [
{name: "Azathoth statue", texture: [["azathothstatue", 0]], inCreative: true}]);
ToolAPI.registerBlockMaterial(BlockID.statueAz, "stone", 1, true);

var Azmesh = new RenderMesh();
Azmesh.setBlockTexture("azathothstatue",0);
Azmesh.importFromFile(__dir__+"/models/azathoth.obj","obj",{translate: [0.5, 0, 0.5]});
var Azrender = new ICRender.Model();
Azrender.addEntry(new BlockRenderer.Model(Azmesh));
BlockRenderer.setStaticICRender(BlockID.statueAz,0,Azrender);

Callback.addCallback('ItemUse', function (coords, item, block) {
if(item.id == 280){
if(block.id == BlockID.statueCt || block.id == BlockID.statueJz || block.id == BlockID.statueAz){
CTmesh.mesh.rotate(coords.x + .5, coords.y, coords.z + .5, 0, Math.Pi/2, 0);
}
}
});



// file: Ablocks/altar&pillars/Pillars.js

var particle_pillar = Particles.registerParticleType({
    texture: "AltarParticle",
    size: [.4, .8],
    lifetime: [12, 12],
    render: 2
});

function particles_for_pillar(x, y, z){
  var bonus_coords = [
        [1 / 16 * 4, 1 / 16 * 4],
        [1 / 16 * 13, 1 / 16 * 4],
        [1 / 16 * 4, 1 / 16 * 13],
        [1 / 16 * 12, 1 / 16 * 12]
    ];
    for(var i in bonus_coords){
        var emitter = new Particles.ParticleEmitter(x + bonus_coords[i][0], y + 1 / 16 * 14, z + bonus_coords[i][1]);
        emitter.setEmitRelatively(true);
        emitter.emit(particle_pillar, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
   }
}

Block.setRandomTickCallback(BlockID.PillarAbyssalC, function(x, y, z, id, data){
   particles_for_pillar(x, y, z);
});

TileEntity.registerPrototype(BlockID.PillarAbyssalC,{
    defaultValues:{
        anim: null,
        rotation: [0, 0, 0],
        lastid: 0,
        lastdata: 0
    },
    getTransportSlots: function(){
        return{
            input:["slot"],
            //output: ["slot"]
       };
    },
    setSlot: function(slot, id, count, data, extra){
        var item = this.container.getSlot(slot);
        item.id = id;
        item.count = count;
        item.data = data;
        item.extra = extra;
    },
    click: function(id, count, data, coords){
        Game.prevent();
        if(this.container.getSlot('slot').id == 0){
            var item = Player.getCarriedItem();
            if (item.id == 0) return;
            this.setSlot('slot', item.id, 1, item.data, item.extra);
            Player.decreaseCarriedItem(1);
       }else{
            var slot = this.container.getSlot('slot');
            drop(this.x + 0.5, this.y + 1, this.z + 0.5, slot.id, slot.count, slot.data, slot.extra);
            this.setSlot('slot', 0, 0, 0);
       }
    },
    tick:function(){
        var item = this.container.getSlot('slot');
        if((!this.data.anim || (this.data.lastid != item.id || this.data.lastdata != item.data)) && item.id != 0) {
            if ((this.data.lastid != item.id || this.data.lastdata != item.data) && this.data.anim) this.data.anim.destroy();
            this.data.lastid = item.id;
            this.data.lastdata = item.data;
            var bonus_coords = {
                x: 0,
                y: 0,
                z: 0
           };
            this.data.rotation = [0, 0, 0];
            if(all_items.indexOf(item.id) != -1){
                bonus_coords.x -= 0.06;
                bonus_coords.y -= 0.095;
                bonus_coords.z += 0.06125;
                this.data.rotation = [Math.PI / 2, Math.PI, 0];
           }
            this.data.anim = new Animation.Item(this.x + 0.5 + 1 / 16 + bonus_coords.x, this.y + 0.75 + 0.325 + bonus_coords.y, this.z + 0.5 - 1 / 16 + bonus_coords.z);
            this.data.anim.describeItem({
                id: item.id,
                count: 1,
                data: item.data,
                size: 1 / (16 / 6),
                rotation: this.data.rotation,
                notRandomize: true
           });
            this.data.anim.load();
        }else if (this.data.anim && item.id == 0){
            this.data.lastid = 0;
            this.data.lastdata = 0;
            this.data.anim.destroy();
            this.data.anim = null;
       }
    },
    init: function() {
        if(this.data.anim) this.data.anim.load();
    },
    destroyBlock:function(coords, player){
        if (this.data.anim){
            this.data.anim.destroy();
            this.data.anim = null;
       }
    }
});


TileEntity.registerPrototype(BlockID.Pedestal,{
    defaultValues:{
        anim: null,
        rotation: [Math.PI / 2, 0, 0],
        lastid:0,
        lastdata:0    
    }, 
    setSlot: function(slot, id, count, data, extra){
        var item = this.container.getSlot(slot);
        item.id = id;
        item.count = count;
        item.data = data;
        item.extra = extra;
    },
    click: function(id, count, data, coords){
        Game.prevent();
        if(this.container.getSlot('slot').id == 0 && Player.getCarriedItem().id == ItemID.normalNecronomicon){
            var item = Player.getCarriedItem();
            if (item.id == 0) return;
            this.setSlot('slot', item.id, 1, item.data, item.extra);
            Player.decreaseCarriedItem(1);
       }else{
            var slot = this.container.getSlot('slot');
            drop(this.x + 0.5, this.y + 1, this.z + 0.5, slot.id, slot.count, slot.data, slot.extra);
            this.setSlot('slot', 0, 0, 0);
       }
    },
    tick:function(){    
        var item = this.container.getSlot('slot');
        if(!this.data.anim || item.id != 0){
            if((this.data.lastid != item.id || this.data.lastdata != item.data) && this.data.anim) this.data.anim.destroy();
            this.data.lastid = item.id;
            this.data.lastdata = item.data;
            var bonus_coords = {
                x: 0,
                y: 0,
                z: 0
           };
            this.data.rotation = [0, 0, 0];
            if(all_items.indexOf(item.id) != -1){
                bonus_coords.x -= 0;
                bonus_coords.y -= 0.095;
                bonus_coords.z += 0;
                this.data.rotation = [0, 0, 0];
           }
            this.data.anim = new Animation.Item(this.x + 0.5 + 1 / 16 + bonus_coords.x, this.y + 0.75 + 0.325 + bonus_coords.y, this.z + 0.5 - 1 / 16 + bonus_coords.z);
            this.data.anim.describeItem({
                id: item.id,
                count: 1,
                data: item.data,
                size: 1 / (16 / 6),
                rotation: this.data.rotation,
                notRandomize: true
           });
            this.data.anim.load();   
       }else if(this.data.anim && item.id == 0){
            this.data.lastid = 0;
            this.data.lastdata = 0;
            this.data.anim.destroy();
            this.data.anim = null;
       }  
    },
    init: function() {
        if(this.data.anim) this.data.anim.load();  
    },
    destroyBlock:function(coords, player){
        if (this.data.anim){
            this.data.anim.destroy();
            this.data.anim = null;
       }
    }
});

TileEntity.registerPrototype(BlockID.PedestalN,{
    defaultValues:{
        anim: null,
        rotation: [Math.PI / 2, 0, 0],
        lastid:0,
        lastdata:0    
    }, 
    setSlot: function(slot, id, count, data, extra){
        var item = this.container.getSlot(slot);
        item.id = id;
        item.count = count;
        item.data = data;
        item.extra = extra;
    },
    click: function(id, count, data, coords){
        Game.prevent();
        if(this.container.getSlot('slot').id == 0 && Player.getCarriedItem().id == ItemID.normalNecronomicon){
            var item = Player.getCarriedItem();
            if (item.id == 0) return;
            this.setSlot('slot', item.id, 1, item.data, item.extra);
            Player.decreaseCarriedItem(1);
       }else{
            var slot = this.container.getSlot('slot');
            drop(this.x + 0.5, this.y + 1, this.z + 0.5, slot.id, slot.count, slot.data, slot.extra);
            this.setSlot('slot', 0, 0, 0);
       }
    },
    tick:function(){    
        var item = this.container.getSlot('slot');
        if(!this.data.anim || item.id != 0){
            if((this.data.lastid != item.id || this.data.lastdata != item.data) && this.data.anim) this.data.anim.destroy();
            this.data.lastid = item.id;
            this.data.lastdata = item.data;
            var bonus_coords = {
                x: 0,
                y: 0,
                z: 0
           };
            this.data.rotation = [0, 0, 0];
            if(all_items.indexOf(item.id) != -1){
                bonus_coords.x -= 0;
                bonus_coords.y -= 0.095;
                bonus_coords.z += 0;
                this.data.rotation = [0, 0, 0];
           }
            this.data.anim = new Animation.Item(this.x + 0.5 + 1 / 16 + bonus_coords.x, this.y + 0.75 + 0.325 + bonus_coords.y, this.z + 0.5 - 1 / 16 + bonus_coords.z);
            this.data.anim.describeItem({
                id: item.id,
                count: 1,
                data: item.data,
                size: 1 / (16 / 6),
                rotation: this.data.rotation,
                notRandomize: true
           });
            this.data.anim.load();   
       }else if(this.data.anim && item.id == 0){
            this.data.lastid = 0;
            this.data.lastdata = 0;
            this.data.anim.destroy();
            this.data.anim = null;
       }  
    },
    init: function() {
        if(this.data.anim) this.data.anim.load();  
    },
    destroyBlock:function(coords, player){
        if (this.data.anim){
            this.data.anim.destroy();
            this.data.anim = null;
       }
    }
});



// file: Ablocks/altar&pillars/Altars.js

var particle_altar = Particles.registerParticleType({
    texture: "AltarParticle",
    size: [.6, 1],
    lifetime: [35, 35],
    render: 2
});

TileEntity.registerPrototype(BlockID.AltarAbyssalC,{
    defaultValues:{
        anim: null,
        rotation: [0, 0, 0],
        coords: null,
        step: null,
        lastid: 0,
        lastdata: 0  
    },
    getTransportSlots: function(){
        return{
            input: ["slot"],
            //output: ["slot"]
       };
    },
    created:function(){ 
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
        ]
    },
    setSlot:function(slot, id, count, data, extra){
        var item = this.container.getSlot(slot);
        item.id = Number(id);
        item.count = Number(count);
        item.data = Number(data);
        item.extra = extra;
    },
    click:function(id, count, data, coords){
        if(this.data.step) return;
        var pillars = [];
        if(id == ItemID.normalNecronomicon && Entity.getSneaking(Player.get())){
            for(var i in this.data.coords){
                if (World.getBlock(this.data.coords[i][0], this.y, this.data.coords[i][1]).id == 4){
                    World.setBlock(this.data.coords[i][0], this.y, this.data.coords[i][1], BlockID.PillarAbyssalC, 0);
                    World.addTileEntity(this.data.coords[i][0], this.y, this.data.coords[i][1]);
                    Entity.spawn(this.data.coords[i][0], this.y + 1, this.data.coords[i][1], 93);
               };
            }
            for (var i in this.data.coords) {
                if (World.getBlock(this.data.coords[i][0], this.y, this.data.coords[i][1]).id == BlockID.PillarAbyssalC){
                    var tile = World.getTileEntity(this.data.coords[i][0], this.y, this.data.coords[i][1]);
                    if (!tile) tile = World.addTileEntity(this.data.coords[i][0], this.y, this.data.coords[i][1]);
                    if(tile && tile.container.getSlot('slot').id != 0)pillars.push(this.data.coords[i]);
               }
            }
            if (this.container.getSlot('slot').id == 0 || pillars.length == 0) return;
            var CraftingItems = {};
            for(var i in Crafts){
                CraftingItems[Crafts[i].result.toString()] = {};
                for(var k in Crafts[i].items){
                    if(CraftingItems[Crafts[i].result.toString()][Crafts[i].items[k].toString()]){
                        CraftingItems[Crafts[i].result.toString()][Crafts[i].items[k].toString()]++;
                  }else{
                        CraftingItems[Crafts[i].result.toString()][Crafts[i].items[k].toString()] = 1;
                  }
               }
                CraftingItems[Crafts[i].result.toString()].centre = Crafts[i].centre.toString();
           }
            var itemsInPillars = {};
            for(var i in pillars){
                var tile = World.getTileEntity(pillars[i][0], this.y, pillars[i][1]);
                var item = tile.container.getSlot('slot');
                 if(itemsInPillars[item.id + ',' + item.data]){
                    itemsInPillars[item.id + ',' + item.data]++
               }else{
                    itemsInPillars[item.id + ',' + item.data] = 1
               }
            }
            var centreItem = this.container.getSlot('slot').id + ',' + this.container.getSlot('slot').data;
            var result = 0
            for(var l in CraftingItems){
                result = 0
                for(var i in itemsInPillars){
                 if(centreItem != CraftingItems[l].centre || JSONlength(itemsInPillars) != JSONlength(CraftingItems[l]) - 1 || !CraftingItems[l][i] || itemsInPillars[i] != CraftingItems[l][i]) continue;
                    result++
                    if(result == JSONlength(itemsInPillars) || typeof(result) == 'string'){
                        result = l;
                        break
                  };
               }
                if(result == JSONlength(itemsInPillars) || typeof(result) == 'string') break;
            }
            if(typeof(result) == 'string'){
                if(onCraftStart[result] && onCraftStart[result]({
                        x: this.x,
                        y: this.y,
                        z: this.z
                    }) == 'stop') return;
                for (var i in pillars){
                    pillars[i] = pillars[i][0] + ";" + pillars[i][1];
               }
                pillars = pillars.toString();
                this.data.step = {
                    pillars: pillars,
                    result: result
               };
                pillars = pillars.split(",");
                for(var i in pillars){
                    pillars[i] = pillars[i].split(";");
                    pillars[i][0] = Number(pillars[i][0]);
                    pillars[i][1] = Number(pillars[i][1]);
               }
                var ths = this;
                asd(pillars, 0, ths, function(){
                    result = result.split(',');
                    var ent = Entity.spawn(ths.x, ths.y + 1, ths.z, 93);
                    elder_screams.play();
                    if (ths.container.getSlot('slot').count > 1) {
                        onCallback("EntityRemoved", function(entity) {
                            if (entity == ent) {
                                drop(ths.x + 0.5, ths.y + 1, ths.z + 0.5, result[0], 1, result[1]);
                                return "delete";
                           }
                        });
                        ths.container.getSlot('slot').count--;
                 }else{
                        ths.setSlot('slot', result[0], 1, result[1]);
                 }
                    ths.data.step = null;
                    if(onCraftEnd[result.toString()]) onCraftEnd[result.toString()]({
                        x: ths.x,
                        y: ths.y,
                        z: ths.z
                 });
             });
          }
            return;
       } else if (this.container.getSlot('slot').id == 0){
            Game.prevent();
            var item = Player.getCarriedItem();
            if (item.id == 0) return;
            this.setSlot('slot', item.id, 1, item.data, item.extra);
            Player.decreaseCarriedItem(1);
       }else{
            Game.prevent();
            var slot = this.container.getSlot('slot');
            drop(this.x + 0.5, this.y + 1, this.z + 0.5, slot.id, slot.count, slot.data, slot.extra);
            this.setSlot('slot', 0, 0, 0);
       }
    },
    tick: function() {   
        var item = this.container.getSlot('slot');
        if ((!this.data.anim || (this.data.lastid != item.id || this.data.lastdata != item.data)) && item.id != 0) {
            if ((this.data.lastid != item.id || this.data.lastdata != item.data) && this.data.anim) this.data.anim.destroy();
            this.data.lastid = item.id;
            this.data.lastdata = item.data;
            var bonus_coords = {
                x: 0,
                y: 0,
                z: 0
           };
            this.data.rotation = [0, 0, 0];
            if (all_items.indexOf(item.id) != -1){
                bonus_coords.x -= 0.06;
                bonus_coords.y -= 0.095;
                bonus_coords.z += 0.06125;
                this.data.rotation = [Math.PI / 2, Math.PI, 0];
           }
            this.data.anim = new Animation.Item(this.x + 0.5 + 1 / 16 + bonus_coords.x, this.y + 0.75 + 0.325 + bonus_coords.y, this.z + 0.5 - 1 / 16 + bonus_coords.z);
            this.data.anim.describeItem({
                id: item.id,
                count: 1,
                data: item.data,
                size: 1 / (16 / 6),
                rotation: this.data.rotation,
                notRandomize: true
          });
            this.data.anim.load();
       }else if(this.data.anim && item.id == 0){
            this.data.lastid = 0;
            this.data.lastdata = 0;
            this.data.anim.destroy();
            this.data.anim = null;
       }  
    },
    init:function(){
        if(this.data.anim) this.data.anim.load();
        if(this.data.step){
            if(!this.data.step.i) return;
            var ths = this;
            var pillars = ths.data.step.pillars.split(",");
            for(var i in pillars){
                pillars[i] = pillars[i].split(";");
                pillars[i][0] = Number(pillars[i][0]);
                pillars[i][1] = Number(pillars[i][1]);
           }   
            asd(pillars, ths.data.step.i, ths, function(){
                elder_screams.play();
                var result = ths.data.step.result.split(',');
                var ent = Entity.spawn(ths.x, ths.y + 1, ths.z, 93);    
                if(ths.container.getSlot('slot').count > 1){
                    onCallback("EntityRemoved", function(entity){
                        if(entity == ent){
                            drop(ths.x + 0.5, ths.y + 1, ths.z + 0.5, result[0], 1, result[1]);
                            return "delete";
                       }
                    });            
                    ths.container.getSlot('slot').count--
               }else{
                    ths.setSlot('slot', result[0], 1, result[1]);
             }
                ths.data.step = null;
                if(onCraftEnd[result.toString()])onCraftEnd[result.toString()]({
                    x: ths.x,
                    y: ths.y,
                    z: ths.z
             });
         });            
      }
   },
    destroyBlock: function(coords, player) {
        if(this.data.anim){
            this.data.anim.destroy();
      }
   } 
});

function particles(altarCoords, pillarCoords, tile, slot, particleType, interval, repeates, endFunc, curentRepeat){
    curentRepeat = curentRepeat || 1;
    if(World.getBlock(pillarCoords.x, pillarCoords.y, pillarCoords.z).id == 0 || tile.container.getSlot("slot").id == 0 || World.getBlock(altarCoords.x, altarCoords.y, altarCoords.z).id == 0 || World.getTileEntity(altarCoords.x, altarCoords.y, altarCoords.z).container.getSlot("slot").id == 0){
        return
    }
    if (curentRepeat > repeates) {
        if (tile.container.getSlot('slot').count == 1){
            tile.setSlot('slot', 0, 0, 0);
       }else{
            tile.container.getSlot("slot").count--;
       }
        setTimeout(function(){
            endFunc();
       }, 40);
        return;
   }
    for(var i = 0.1; i < Math.random() / 2; i += 0.1){
        var emitter = new Particles.ParticleEmitter(pillarCoords.x + 0.5 + Math.random() / 5, pillarCoords.y + 0.75 + Math.random() / 5, pillarCoords.z + 0.5 + Math.random() / 5);
        emitter.setEmitRelatively(true);
        emitter.emit(particleType, 0, 0, 0, 0, 0, 0, 0, (altarCoords.x - pillarCoords.x) / 40 / 20, (altarCoords.y - pillarCoords.y) / 40 / 20, (altarCoords.z - pillarCoords.z) / 40 / 20);
   }
    setTimeout(function(){
        particles(altarCoords, pillarCoords, tile, slot, particleType, interval, repeates, endFunc, curentRepeat + 1);
   }, interval)
}

function asd(pillars, i, tileAltar, endFunc){
    tileAltar.data.step.i = i;
    if(i >= pillars.length) return endFunc();
    var tile = World.getTileEntity(pillars[i][0], tileAltar.y, pillars[i][1]);
    if(tile && tile.container.getSlot('slot').id != 0){
        particles({
            x: tileAltar.x,
            y: tileAltar.y,
            z: tileAltar.z
        }, {
            x: pillars[i][0],
            y: tileAltar.y,
            z: pillars[i][1]
        }, tile, 'slot', particle_altar, 3, 40, function() {
            asd(pillars, i + 1, tileAltar, endFunc);
        });
   }else{
        tileAltar.data.step = null; 
   }
}



// file: Ablocks/ores.js

IDRegistry.genBlockID("oreAbyssalinite"); 
Block.createBlock("oreAbyssalinite", [
{name: "Abyssalinite Ore", texture:[["AO", 0]],inCreative: true}],BLOCK_TYPE_ORE);
Block.setDestroyLevel("oreAbyssalinite", 3);

IDRegistry.genBlockID("oreCoral"); 
Block.createBlock("oreCoral", [
{name: "Coralium Ore", texture:[["CO", 0]],inCreative: true}],BLOCK_TYPE_ORE);
Block.setDestroyLevel("oreCoral", 3);

IDRegistry.genBlockID("oreCoralInfused"); 
Block.createBlock("oreCoralInfused", [
{name: "Coralium Infused Stone", texture:[["CIS", 0]],inCreative: true}],BLOCK_TYPE_ORE);
Block.setDestroyLevel("oreCoral", 3);

IDRegistry.genBlockID("oreNitre"); 
Block.createBlock("oreNitre", [
{name: "Nitre Ore", texture:[["NO", 0]],inCreative: true}],BLOCK_TYPE_ORE);
Block.setDestroyLevel("oreNitre", 4);

Callback.addCallback("GenerateChunkUnderground", function(chunkX, chunkZ){ 
UniqueGen.generateOre(BlockID.Etx, 0, chunkX, chunkZ, { 
veinCounts: 3, 
veinChance: 28, 
minY: 12, 
maxY: 48,  
size: randomInt(1, 3),  
ratio: .5, 
checkerTile: 1, 
checkerMode: true
}); 
});


Callback.addCallback("GenerateChunkUnderground", function(chunkX, chunkZ){ 
UniqueGen.generateOre(BlockID.oreAbyssalinite, 0, chunkX, chunkZ, { 
veinCounts: 4, 
veinChance: 48, 
minY: 4, 
maxY: 27,  
size: randomInt(1, 3),  
ratio: .5, 
checkerTile: 1, 
checkerMode: true
}); 
});
  
 
Callback.addCallback("GenerateChunkUnderground", function(chunkX, chunkZ){ 
if(World.getBiome(chunkX, chunkZ) == 134 || World.getBiome(chunkX, chunkZ) == CoralSwamp.id)
UniqueGen.generateOre(BlockID.oreCoral, 0, chunkX, chunkZ, { 
veinCounts: 3, 
veinChance: 30, 
minY: 4, 
maxY: 27,  
size: randomInt(1, 3),  
ratio: .5, 
checkerTile: 1, 
checkerMode: true
}); 
});


Callback.addCallback("GenerateChunkUnderground", function(chunkX, chunkZ){
if(World.getBiome(chunkX, chunkZ) == 134 || World.getBiome(chunkX, chunkZ) == CoralSwamp.id)
UniqueGen.generateOre(BlockID.oreCoralInfused, 0, chunkX, chunkZ, { 
veinCounts: 3, 
veinChance: 36, 
minY: 4, 
maxY: 30,  
size: 1,  
ratio: .5, 
checkerTile: 1, 
checkerMode: true
}); 
});


Callback.addCallback("GenerateChunkUnderground", function(chunkX, chunkZ){ 
UniqueGen.generateOre(BlockID.oreNitre, 0, chunkX, chunkZ, { 
veinCounts: 4, 
veinChance: 40, 
minY: 22, 
maxY: 58,  
size: randomInt(1, 4),  
ratio: .5, 
checkerTile: 1, 
checkerMode: true
}); 
});

//DimensionOres
IDRegistry.genBlockID("oreAiron"); 
Block.createBlock("oreAiron", [
{name: "Abyssal Iron Ore", texture:[["AIO", 0]],inCreative: true}],BLOCK_TYPE_ORE);


IDRegistry.genBlockID("oreAgold"); 
Block.createBlock("oreAgold", [
{name: "Abyssal Gold Ore", texture:[["AGO", 0]],inCreative: true}],BLOCK_TYPE_ORE);


IDRegistry.genBlockID("oreAdiamond"); 
Block.createBlock("oreAdiamond", [
{name: "Abyssal Diamond Ore", texture:[["ADO", 0]],inCreative: true}],BLOCK_TYPE_ORE);


IDRegistry.genBlockID("oreAnitre"); 
Block.createBlock("oreAnitre", [
{name: "Abyssal Nitre Ore", texture:[["ANO", 0]],inCreative: true}],BLOCK_TYPE_ORE);


IDRegistry.genBlockID("oreAcorpearl"); 
Block.createBlock("oreAcorpearl", [
{name: "Pearlescent Coralium Ore", texture:[["APCorO", 0]],inCreative: true}],BLOCK_TYPE_ORE);

IDRegistry.genBlockID("oreDAbyss"); 
Block.createBlock("oreDAbyss", [
{name: "Dreaded Abyssalinite Ore", texture:[["DrSO", 0]],inCreative: true}],BLOCK_TYPE_ORE);
/*
Callback.addCallback("GenerateCustomDimensionChunk", function(chunkX, chunkZ, random, dimensionId){
if(!Player.getDimension() ==  Abyss.id) return;
for (var i = 0; i < 32; i++){ 
var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 3, 60); 
GenerationUtils.generateOreCustom(coords.x, coords.y, coords.z, BlockID.oreAiron, 0, randomInt(2, 5), true, [BlockID.stoneAbyss]);
}  
});

Callback.addCallback("GenerateCustomDimensionChunk", function(chunkX, chunkZ, random, dimensionId){
if(!Player.getDimension() ==  Abyss.id) return;
for (var i = 0; i < 23; i++){ 
var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 3, 60); 
GenerationUtils.generateOreCustom(coords.x, coords.y, coords.z, BlockID.oreAgold, 0, randomInt(2, 5), true, [BlockID.stoneAbyss]);
}  
});

Callback.addCallback("GenerateCustomDimensionChunk", function(chunkX, chunkZ, random, dimensionId){
if(!Player.getDimension() ==  Abyss.id) return;
for (var i = 0; i < 23; i++){ 
var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 3, 60); 
GenerationUtils.generateOreCustom(coords.x, coords.y, coords.z, BlockID.oreAdiamond, 0, randomInt(2, 3), true, [BlockID.stoneAbyss]);
}  
});

Callback.addCallback("GenerateCustomDimensionChunk", function(chunkX, chunkZ, random, dimensionId){
if(!Player.getDimension() ==  Abyss.id) return;
for (var i = 0; i < 23; i++){ 
var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 3, 60); 
GenerationUtils.generateOreCustom(coords.x, coords.y, coords.z, BlockID.oreAnitre, 0, randomInt(1, 5), true, [BlockID.stoneAbyss]);
}  
});

Callback.addCallback("GenerateCustomDimensionChunk", function(chunkX, chunkZ, random, dimensionId){
if(!Player.getDimension() ==  Abyss.id) return;
for (var i = 0; i < 23; i++){ 
var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 3, 60); 
GenerationUtils.generateOreCustom(coords.x, coords.y, coords.z, BlockID.oreAcorpearl, 0, randomInt(1, 3), true, [BlockID.stoneAbyss]);
}  
});*/



// file: Ablocks/flora.js

//DARK
const Treesd = ["Dark_Trees1", "Dark_Trees2"];

IDRegistry.genBlockID("darkLog");
Block.createBlock("darkLog", [
    {name: "Dark Log", texture: [["DLTTtop", 0], ["DLTTtop", 0], ["DLTTside", 0], ["DLTTside", 0], ["DLTTside", 0], ["DLTTside", 0]], inCreative: true}]);
ToolAPI.registerBlockMaterial(BlockID.darkLog, "wood");

IDRegistry.genBlockID("darkLogS");
Block.createBlock("darkLogS", [
    {name: "Dark Log Sided", texture: [["DLTTside", 0]], inCreative: true}]);
ToolAPI.registerBlockMaterial(BlockID.darkLogS, "wood");

IDRegistry.genBlockID("darkP");
Block.createBlock("darkP", [
    {name: "Dark Planks", texture: [["DLTplank", 0]], inCreative: true}
]);
ToolAPI.registerBlockMaterial(BlockID.darkP, "wood");

IDRegistry.genBlockID("darkLeaves");
Block.createBlock("darkLeaves", [
    {name: "Dark Leaves", texture: [["DLT_L", 0]], inCreative: true}
]);
ToolAPI.registerBlockMaterial(BlockID.darkLeaves, "plant");

Block.registerDropFunction("darkLeaves", function(){
    if(Math.random() < .075){
        return [[ItemID.darkSapling, 1, 0]]
    }
    else {
        return [];
    }
});
ToolAPI.registerBlockMaterial(BlockID.darkLeaves, "plant");

IDRegistry.genBlockID("darkSapling");
Block.createBlock("darkSapling", [{name: "Dark Tree Sapling", texture: [["DLTS", 0]], inCreative: false}]);
Block.registerDropFunction("darkSapling", function(){
    return [[ItemID.darkSapling, 1, 0]];
});

IDRegistry.genItemID("darkSapling");
Item.createItem("darkSapling", "Dark Tree Sapling", {name: "DLTS", data: 1});

TileRenderer.setPlantModel(BlockID.darkSapling, 0, "DLTS", 0);
ToolAPI.registerBlockMaterial(BlockID.darkSapling, "plant");

Item.registerUseFunction("darkSapling",function(coords, item, block){
var coords = coords.relative;
    if(World.getBlockID(coords.x,coords.y-1,coords.z)==BlockID.grassDark){
        World.setBlock(coords.x,coords.y,coords.z,BlockID.darkSapling,0);
        Player.setCarriedItem(item.id, item.count - 1, item.data);
    } 
});

Callback.addCallback("ItemUse",function(coords,item){
var crd = coords.relative;
if(World.getBlock(crd.x,crd.y,crd.z).id == BlockID.darkSapling){
if(item.id == 351 && item.data == 15){    
World.destroyBlock(crd.x, crd.y, crd.z, false);
Str.generateTrees(crd.x, crd.z, Treesd, {min_y:crd.y,max_y:crd.y, check: BlockID.grassDark});
Player.setCarriedItem(id, count - 1, data);
}
}
});

Block.setRandomTickCallback(BlockID.darkSapling, function(x, y, z, id, data){       
var coords = coords.relative;
if(World.getBlockID(coords.x, coords.y - 1, coords.z)==BlockID.grassDark){
World.destroyBlock(coords.x,coords.y,coords.z,false);                      
Str.generateTrees(crd.x, crd.z, Treesd, {min_y:crd.y,max_y:crd.y, check: BlockID.grassDark});
     }
});         


//DREAD
const Treesdr = ["Dread_Trees1", "Dread_Trees1"];

IDRegistry.genBlockID("dreadLog");
Block.createBlock("dreadLog", [
    {name: "Dread Log", texture: [["DrTtop", 0], ["DrTtop", 0], ["DrTside", 0], ["DrTside", 0], ["DrTside", 0], ["DrTside", 0]], inCreative: true}]);
ToolAPI.registerBlockMaterial(BlockID.dreadLog, "wood");

IDRegistry.genBlockID("dreadLogS");
Block.createBlock("dreadLogS", [
    {name: "Dread Log Sided", texture: [["DrTside", 0]], inCreative: true}]);
ToolAPI.registerBlockMaterial(BlockID.dreadLogS, "wood");

IDRegistry.genBlockID("dreadP");
Block.createBlock("dreadP", [
    {name: "Dread Planks", texture: [["DrTplank", 0]], inCreative: true}
]);
ToolAPI.registerBlockMaterial(BlockID.dreadP, "wood");


IDRegistry.genBlockID("dreadLeaves");
Block.createBlock("dreadLeaves", [
    {name: "Dread Leaves", texture: [["DrT_L", 0]], inCreative: true}
]);
ToolAPI.registerBlockMaterial(BlockID.dreadLeaves, "plant");

Block.registerDropFunction("dreadLeaves", function(){
    if(Math.random() < .075){
        return [[ItemID.dreadSapling, 1, 0]]
    }
    else {
        return [];
    }
});
ToolAPI.registerBlockMaterial(BlockID.dreadLeaves, "plant");

IDRegistry.genBlockID("dreadSapling");
Block.createBlock("dreadSapling", [{name: "Dread Tree Sapling", texture: [["DrTS", 0]], inCreative: false}]);
Block.registerDropFunction("dreadSapling", function(){
    return [[ItemID.dreadSapling, 1, 0]];
});

IDRegistry.genItemID("dreadSapling");
Item.createItem("dreadSapling", "Dread Tree Sapling", {name: "DrTS", data: 1});

TileRenderer.setPlantModel(BlockID.dreadSapling, 0, "DrTS", 0);
ToolAPI.registerBlockMaterial(BlockID.dreadSapling, "plant");

Item.registerUseFunction("dreadSapling",function(coords, item, block){
var coordss = coords.relative;
    if(World.getBlockID(coordss.x,coordss.y-1,coordss.z)==BlockID.grassDread){  
        World.setBlock(coordss.x,coordss.y,coordss.z,BlockID.dreadSapling,0);  
        Player.setCarriedItem(item.id, item.count - 1, item.data);
    }
});

Callback.addCallback("ItemUse",function(coords,item){
var crd = coords.relative;
if(World.getBlock(crd.x,crd.y,crd.z).id == BlockID.dreadSapling){
if(item.id == 351 && item.data == 15){    
World.destroyBlock(crd.x, crd.y, crd.z, false);
Str.generateTrees(crd.x, crd.z, Treesdr, {min_y:crd.y,max_y:crd.y, check: BlockID.grassDread});
Player.setCarriedItem(id, count - 1, data);
}
}
});

Block.setRandomTickCallback(BlockID.dreadSapling, function(x, y, z, id, data){
var coords = coords.relative;       
if(World.getBlockID(coords.x, coords.y - 1, coords.z)==BlockID.grassDread){
World.destroyBlock(coords.x,coords.y,coords.z,false);                      
Str.generateTrees(crd.x, crd.z, Treesdr, {min_y:crd.y,max_y:crd.y, check: BlockID.grassDread});
     }
});  

Callback.addCallback("PostLoaded", function(){
Recipes.addShaped({id: BlockID.darkP, count: 4, data: 0}, [
"x",
], ['x', BlockID.darkLog, 0]); 

Recipes.addShaped({id: BlockID.dreadP, count: 1, data: 0}, [
"x",
], ['x', BlockID.dreadLog, 0]); 

Recipes.addShaped({id: 58, count: 1, data: 0}, [
"xx",
"xx",
], ['x', BlockID.darkP, 0]); 

Recipes.addShaped({id: 58, count: 1, data: 0}, [
"xx",
"xx",
], ['x', BlockID.dreadP, 0]); 
});

IDRegistry.genBlockID("plantWaste");
Block.createBlock("plantWaste", [{name: "Wastalands Horn", texture: [["wastelandsthorn", 0]], inCreative: false}]);
TileRenderer.setPlantModel(BlockID.plantWaste, 0, "wastelandsthorn", 0);
ToolAPI.registerBlockMaterial(BlockID.plantWaste, "plant");
Block.registerDropFunction("plantWaste", function(){
    return [[ItemID.plantWaste, 1, 0]];
});

IDRegistry.genItemID("plantWaste");
Item.createItem("plantWaste", "Wastalands Horn", {name: "wastelandsthorn", data: 1});

Item.registerUseFunction("plantWaste",function(coords, item, block){
var coordss = coords.relative;
    if(World.getBlockID(coordss.x,coordss.y-1,coordss.z)==BlockID.grassAbyss){  
        World.setBlock(coordss.x,coordss.y,coordss.z,BlockID.plantWaste,0);
        Player.setCarriedItem(item.id, item.count - 1, item.data);
    }
});

IDRegistry.genBlockID("plantWasteL");
Block.createBlock("plantWasteL", [{name: "Wastalands Lumin", texture: [["luminousthistle", 0]], inCreative: false}]);
TileRenderer.setPlantModel(BlockID.plantWasteL, 0, "luminousthistle", 0);
ToolAPI.registerBlockMaterial(BlockID.plantWasteL, "plant");
Block.registerDropFunction("plantWasteL", function(){
    return [[ItemID.plantWasteL, 1, 0]];
});

IDRegistry.genItemID("plantWasteL");
Item.createItem("plantWasteL", "Wastalands Lumin", {name: "luminousthistle", data: 1});

Item.registerUseFunction("plantWasteL",function(coords, item, block){
var coordss = coords.relative;
    if(World.getBlockID(coordss.x,coordss.y-1,coordss.z)==BlockID.grassAbyss){  
        World.setBlock(coordss.x,coordss.y,coordss.z,BlockID.plantWasteL,0);
        Player.setCarriedItem(item.id, item.count - 1, item.data);
    }
});

IDRegistry.genBlockID("plantWDh");
Block.createBlock("plantWDh", [{name: "Dreaded Wastalands Hilt", texture: [["hilt", 0]], inCreative: false}]);
TileRenderer.setPlantModel(BlockID.plantWDh, 0, "hilt", 0);
ToolAPI.registerBlockMaterial(BlockID.plantWDh, "plant");
Block.registerDropFunction("plantWDh", function(){
    return [[ItemID.plantWDh, 1, 0]];
});

IDRegistry.genItemID("plantWDh");
Item.createItem("plantWDh", "Dreaded Wastalands Hilt", {name: "hilt", data: 1});

Item.registerUseFunction("plantWDh",function(coords, item, block){
var coordss = coords.relative;
    if(World.getBlockID(coordss.x,coordss.y-1,coordss.z)==BlockID.grassDread){  
        World.setBlock(coordss.x,coordss.y,coordss.z,BlockID.plantWDh,0);
        Player.setCarriedItem(item.id, item.count - 1, item.data);
    }
});



// file: Adimensions/generation/Normal.js

const Builds = ["Dark_Str1"];
const biomes = [1, 4, 27, 155];
const hills = [3, 131, 162, 20];

//Biomes
var CoralSwamp = new CustomBiome("coral_swamp")
//цвет травы(возможно 48D1CC)
.setGrassColor(0x20B2AA)
// цвет листвы(возможно 48D1CC)
.setFoliageColor(0x20B2AA)
.setCoverBlock(2, 0)
.setSurfaceBlock(1, 0)
.setFillingBlock(3, 0);


Callback.addCallback("GenerateBiomeMap", function(chunkX, chunkZ, rnd, dimensionId, chunkSeed,
worldSeed, dimensionSeed) {
if (dimensionId != 1) {
return;
}
for (var x = chunkX * 16; x < (chunkX + 1) * 16; x++) {
 for (var z = chunkZ; z < (chunkZ + 1) * 16; z++) {
if (World.getBiomeMap(x, z) == 6) {
World.setBiomeMap(x, z, CoralSwamp.id);
            }
        }
    }
});

var DarkLand = new CustomBiome("dark_land")
//цвет травы(возможно 483D8B)
.setGrassColor(0x4B0082)
// цвет листвы(возможно 483D8B)
.setFoliageColor(0x4B0082)
.setCoverBlock(BlockID.grassDark, 0)
.setSurfaceBlock(1, 0)
.setFillingBlock(BlockID.stoneDark, 0);

var DarkHills = new CustomBiome("dark_hills")
//цвет травы(возможно 483D8B)
.setGrassColor(0x4B0082)
// цвет листвы(возможно 483D8B)
.setFoliageColor(0x4B0082)
.setCoverBlock(BlockID.stoneDark, 0)
.setSurfaceBlock(1, 0)
.setFillingBlock(BlockID.stoneDark, 0);

Callback.addCallback("GenerateBiomeMap", function(chunkX, chunkZ, rnd, dimensionId, chunkSeed,
worldSeed, dimensionSeed){
if (dimensionId != 0){
return;
}
genrand = new java.util.Random(Math.floor(chunkX/16)*1024 + Math.floor(chunkZ/16));
 for (var x = chunkX * 16; x < (chunkX + 1) * 16; x++) {
  for (var z = chunkZ; z < (chunkZ + 1) * 16; z++) {  
   for (var i in biomes) {
       if (genrand.nextInt(100) < 7){
    if (GenerationUtils.getPerlinNoise(x,0,z, worldSeed,1/256,4)  && World.getBiomeMap(x, z) == biomes[i]) {  
   World.setBiomeMap(x, z, DarkLand.id);
                }
            }
   for (var i in hills) {
     if (GenerationUtils.getPerlinNoise(x,0,z, worldSeed,1/256,4) && World.getBiomeMap(x, z) == hills[i]) {
   World.setBiomeMap(x, z, DarkHills.id);
                    }
                }   
            }
        }
    }
});

//Structures
Callback.addCallback("GenerateChunk", function(chunkX, chunkZ){ 
var coords = GenerationUtils.findSurface(chunkX, chunkZ, 57, 98); 
 if (World.getBlockID(coords.x,coords.y,coords.z) == 2 && Math.random() < .12) {
Structure.setInWorld("Dark_Str1", coords.x, coords.y+1, coords.z); 
//Game.message("X: " + coords.x + "Y: " + coords.y+ "Z: " + coords.z);
   } 
if (World.getBiome(coords.x, coords.z) == CoralSwamp.id && Math.random() < .29 || World.getBiome(coords.x, coords.z) == 134 && Math.random() < .18) {
 if (World.getBlockID(coords.x,coords.y,coords.z) == 9) {
  Structure.setInWorld("Dark_Str2", coords.x, coords.y+1, coords.z); 
//Game.message("X: " + coords.x + "Y: " + coords.y+ "Z: " + coords.z);
        } 
    }
});



// file: Aitems/items.js

 //abyssalinite
IDRegistry.genItemID("abbChunck");
Item.createItem("abbChunck", "Abyssalnite Chunck", {name: "AC"});

IDRegistry.genItemID("abbIron");
Item.createItem("abbIron", "Abyssalnite Ingot", {name: "AI"});

//coral
IDRegistry.genItemID("coralChunck");
Item.createItem("coralChunck", "Coralium Chunck", {name: "CC"});

IDRegistry.genItemID("coralIron");
Item.createItem("coralIron", "Reinforced Coralium Ingot", {name: "RCI"});

IDRegistry.genItemID("dreadPeace");
Item.createItem("dreadPeace", "Dreadalnite Peace", {name: "DSOA"});

IDRegistry.genItemID("dreadChunck");
Item.createItem("dreadChunck", "Dreadalnite Chunck", {name: "DAC"});

Recipes.addShaped({id: ItemID.dreadChunck, count: 1, data: 0}, [
"xx",
"xx"
], ['x', ItemID.dreadPeace, 0]);

IDRegistry.genItemID("dreadIron");
Item.createItem("dreadIron", "Dreadalinite Ingot", {name: "DI"});
Recipes.addFurnace(ItemID.dreadChunck,ItemID.dreadIron);

IDRegistry.genItemID("nitrePeace");
Item.createItem("nitrePeace", "Nitre", {name: "nitre"}); 

IDRegistry.genItemID("sulfurPeace");
Item.createItem("sulfurPeace", "Sulfur", {name: "sulfur"}); 

Recipes.addShaped({id: 289, count: 3, data: 0}, [
"ax",
"b"
], ['x', ItemID.sulfurPeace, 0, 'a', ItemID.nitrePeace, 0, 'b', 263, -1]);
//Ethaxium
IDRegistry.genItemID("ethBrick");
Item.createItem("ethBrick", "Ethaxium Brick", {name: "EB"});
Recipes.addFurnace(BlockID.Etx,ItemID.ethBrick);

IDRegistry.genItemID("ethIron");
Item.createItem("ethIron", "Ethaxium Ingot", {name: "EI"});

IDRegistry.genItemID("abbNugget");
Item.createItem("abbNugget", "Abyssalnite Nugget", {name: "nugget_abyssalnite"});

IDRegistry.genItemID("dreadNugget");
Item.createItem("dreadNugget", "Dreadanlnite Nugget", {name: "nugget_dreadium"});

Recipes.addShaped({id: ItemID.dreadIron, count: 1, data: 0}, [
     "xxx",
     "xxx",
     "xxx"
], ['x', ItemID.dreadNugget, 0]);
Recipes.addShapeless({id: ItemID.dreadNugget, count: 9, data: 0}, [{id: ItemID.dreadIron, data: 0}]);


IDRegistry.genItemID("coralNugget");
Item.createItem("coralNugget", "Reinforced Coralium Nugget", {name: "nugget_coralium"});

Recipes.addShaped({id: ItemID.coralIron, count: 1, data: 0}, [
     "xxx",
     "xxx",
     "xxx"
], ['x', ItemID.coralNugget, 0]);
Recipes.addShapeless({id: ItemID.coralNugget, count: 9, data: 0}, [{id: ItemID.coralIron, data: 0}]);

IDRegistry.genItemID("ethNugget");
Item.createItem("ethNugget", "Ethaxium Nugget", {name: "nugget_ethaxium"});

IDRegistry.genItemID("coralGem");
Item.createItem("coralGem", "Coralium Gem", {name: "CG"});
Recipes.addFurnace(ItemID.coralChunck,ItemID.coralIron);

IDRegistry.genItemID("coralPearl");
Item.createItem("coralPearl", "Coralium Pearl", {name: "CP"});

IDRegistry.genItemID("coralPlate");
Item.createItem("coralPlate", "Reinforced Coralium Plate", {name: "CPP"});


//Upgrade kits
IDRegistry.genItemID("cobUpgr");
Item.createItem("cobUpgr", "Cobblestone Upgrade", {name: "CobU"});

Recipes.addShaped({id: ItemID.cobUpgr, count: 1, data: 0}, [
     "ax",
     "xr",
     "d"
], ['x', 4, 0, 'a', 5, -1, 'r', 287, 0, 'd', 318, 0]);

Recipes.addShaped({id: 272, count: 1, data: 0}, [
"ax",
], ['x', ItemID.cobUpgr, 0, 'a', 268, 0]);
Recipes.addShaped({id: 275, count: 1, data: 0}, [
"ax",
], ['x', ItemID.cobUpgr, 0, 'a', 271, 0]);
Recipes.addShaped({id: 274, count: 1, data: 0}, [
"ax",
], ['x', ItemID.cobUpgr, 0, 'a', 270, 0]);
Recipes.addShaped({id: 291, count: 1, data: 0}, [
"ax",
], ['x', ItemID.cobUpgr, 0, 'a', 290, 0]);
Recipes.addShaped({id: 273, count: 1, data: 0}, [
"ax",
], ['x', ItemID.cobUpgr, 0, 'a', 269, 0]);

IDRegistry.genItemID("iroUpgr");
Item.createItem("iroUpgr", "Iron Upgrade", {name: "IroU"});

Recipes.addShaped({id: ItemID.iroUpgr, count: 1, data: 0}, [
     "ax",
     "xr",
], ['x', 265, 0, 'a', 4, 0, 'r', ItemID.cobUpgr, 0]);

Recipes.addShaped({id: 267, count: 1, data: 0}, [
"ax",
], ['x', ItemID.iroUpgr, 0, 'a', 272, 0]);
Recipes.addShaped({id: 258, count: 1, data: 0}, [
"ax",
], ['x', ItemID.iroUpgr, 0, 'a', 275, 0]);
Recipes.addShaped({id: 257, count: 1, data: 0}, [
"ax",
], ['x', ItemID.iroUpgr, 0, 'a', 274, 0]);
Recipes.addShaped({id: 292, count: 1, data: 0}, [
"ax",
], ['x', ItemID.iroUpgr, 0, 'a', 291, 0]);
Recipes.addShaped({id: 256, count: 1, data: 0}, [
"ax",
], ['x', ItemID.iroUpgr, 0, 'a', 273, 0]);

IDRegistry.genItemID("golUpgr");
Item.createItem("golUpgr", "Gold Ungrade", {name: "GolU"});

Recipes.addShaped({id: ItemID.golUpgr, count: 1, data: 0}, [
     "ax",
     "xr",
], ['x', 266, 0, 'a', 265, 0, 'r', ItemID.iroUpgr, 0]);

Recipes.addShaped({id: 283, count: 1, data: 0}, [
"ax",
], ['x', ItemID.golUpgr, 0, 'a', 267, 0]);
Recipes.addShaped({id: 286, count: 1, data: 0}, [
"ax",
], ['x', ItemID.golUpgr, 0, 'a', 258, 0]);
Recipes.addShaped({id: 285, count: 1, data: 0}, [
"ax",
], ['x', ItemID.golUpgr, 0, 'a', 257, 0]);
Recipes.addShaped({id: 294, count: 1, data: 0}, [
"ax",
], ['x', ItemID.golUpgr, 0, 'a', 292, 0]);
Recipes.addShaped({id: 284, count: 1, data: 0}, [
"ax",
], ['x', ItemID.golUpgr, 0, 'a', 256, 0]);

IDRegistry.genItemID("diaUpgr");
Item.createItem("diaUpgr", "Diamond Upgrade", {name: "DiaU"});

Recipes.addShaped({id: ItemID.diaUpgr, count: 1, data: 0}, [
     "ax",
     "xr",
], ['x', 264, 0, 'a', 266, 0, 'r', ItemID.golUpgr, 0]);

Recipes.addShaped({id: 276, count: 1, data: 0}, [
"ax",
], ['x', ItemID.diaUpgr, 0, 'a', 283, 0]);
Recipes.addShaped({id: 279, count: 1, data: 0}, [
"ax",
], ['x', ItemID.diaUpgr, 0, 'a', 286, 0]);
Recipes.addShaped({id: 278, count: 1, data: 0}, [
"ax",
], ['x', ItemID.diaUpgr, 0, 'a', 285, 0]);
Recipes.addShaped({id: 293, count: 1, data: 0}, [
"ax",
], ['x', ItemID.diaUpgr, 0, 'a', 294, 0]);
Recipes.addShaped({id: 277, count: 1, data: 0}, [
"ax",
], ['x', ItemID.diaUpgr, 0, 'a', 284, 0]);

IDRegistry.genItemID("abyUpgr");
Item.createItem("abyUpgr", "Abyssalinite Upgrade", {name: "AbyU"});

Recipes.addShaped({id: ItemID.abyUpgr, count: 1, data: 0}, [
     "ax",
     "xr",
], ['x', ItemID.abbIron, 0, 'a', 264, 0, 'r', ItemID.diaUpgr, 0]);
Callback.addCallback("PostLoaded", function(){
Recipes.addShaped({id: ItemID.abyssSword, count: 1, data: 0}, [
"ax",
], ['x', ItemID.abyUpgr, 0, 'a', 276, 0]);
Recipes.addShaped({id: ItemID.abyssAxe, count: 1, data: 0}, [
"ax",
], ['x', ItemID.abyUpgr, 0, 'a', 279, 0]);
Recipes.addShaped({id: ItemID.abyssPickaxe, count: 1, data: 0}, [
"ax",
], ['x', ItemID.abyUpgr, 0, 'a', 278, 0]);
Recipes.addShaped({id: ItemID.abyssHoe, count: 1, data: 0}, [
"ax",
], ['x', ItemID.abyUpgr, 0, 'a', 293, 0]);
Recipes.addShaped({id: ItemID.abyssShovel, count: 1, data: 0}, [
"ax",
], ['x', ItemID.abyUpgr, 0, 'a', 277, 0]);
});
IDRegistry.genItemID("corUpgr");
Item.createItem("corUpgr", "Coralium Upgrade", {name: "CorU"});

Recipes.addShaped({id: ItemID.corUpgr, count: 1, data: 0}, [
     "ax",
     "xr",
], ['x', ItemID.coralIron, 0, 'a', ItemID.abbIron, 0, 'r', ItemID.abyUpgr, 0]);
Callback.addCallback("PostLoaded", function(){  
Recipes.addShaped({id: ItemID.corSword, count: 1, data: 0}, [
"ax",
], ['x', ItemID.corUpgr, 0, 'a', ItemID.abyssSword, 0]);
Recipes.addShaped({id: ItemID.corAxe, count: 1, data: 0}, [
"ax",
], ['x', ItemID.corUpgr, 0, 'a', ItemID.abyssAxe, 0]);
Recipes.addShaped({id: ItemID.corPickaxe, count: 1, data: 0}, [
"ax",
], ['x', ItemID.corUpgr, 0, 'a', ItemID.abyssPickaxe, 0]);
Recipes.addShaped({id: ItemID.corHoe, count: 1, data: 0}, [
"ax",
], ['x', ItemID.corUpgr, 0, 'a', ItemID.abyssHoe, 0]);
Recipes.addShaped({id: ItemID.corShovel, count: 1, data: 0}, [
"ax",
], ['x', ItemID.corUpgr, 0, 'a', ItemID.abyssShovel, 0]);
});

IDRegistry.genItemID("dreUpgr");
Item.createItem("dreUpgr", "Dreadalinite Upgrade", {name: "DreU"});
Recipes.addShaped({id: ItemID.dreUpgr, count: 1, data: 0}, [
     "ax",
     "xr",
], ['x', ItemID.dreadIron, 0, 'a', ItemID.coralIron, 0, 'r', ItemID.corUpgr, 0]);
Callback.addCallback("PostLoaded", function(){  
Recipes.addShaped({id: ItemID.dreSword, count: 1, data: 0}, [
"ax",
], ['x', ItemID.dreUpgr, 0, 'a', ItemID.corSword, 0]);
Recipes.addShaped({id: ItemID.dreAxe, count: 1, data: 0}, [
"ax",
], ['x', ItemID.dreUpgr, 0, 'a', ItemID.corAxe, 0]);
Recipes.addShaped({id: ItemID.drePickaxe, count: 1, data: 0}, [
"ax",
], ['x', ItemID.dreUpgr, 0, 'a', ItemID.corPickaxe, 0]);
Recipes.addShaped({id: ItemID.dreHoe, count: 1, data: 0}, [
"ax",
], ['x', ItemID.dreUpgr, 0, 'a', ItemID.corHoe, 0]);
Recipes.addShaped({id: ItemID.dreShovel, count: 1, data: 0}, [
"ax",
], ['x', ItemID.dreUpgr, 0, 'a', ItemID.corShovel, 0]);
});

IDRegistry.genItemID("ethUpgr");
Item.createItem("ethUpgr", "Ethaxium Upgrade", {name: "EthU"});
Recipes.addShaped({id: ItemID.dreUpgr, count: 1, data: 0}, [
     "ad",
     "xr",
], ['x', ItemID.ethIron, 0, 'd', ItemID.ethBrick, 0, 'a', ItemID.dreadIron, 0, 'r', ItemID.dreUpgr, 0]);
Callback.addCallback("PostLoaded", function(){  
Recipes.addShaped({id: ItemID.dreSword, count: 1, data: 0}, [
"ax",
], ['x', ItemID.ethUpgr, 0, 'a', ItemID.ethSword, 0]);
Recipes.addShaped({id: ItemID.dreAxe, count: 1, data: 0}, [
"ax",
], ['x', ItemID.ethUpgr, 0, 'a', ItemID.ethAxe, 0]);
Recipes.addShaped({id: ItemID.drePickaxe, count: 1, data: 0}, [
"ax",
], ['x', ItemID.ethUpgr, 0, 'a', ItemID.ethPickaxe, 0]);
Recipes.addShaped({id: ItemID.dreHoe, count: 1, data: 0}, [
"ax",
], ['x', ItemID.ethUpgr, 0, 'a', ItemID.ethrHoe, 0]);
Recipes.addShaped({id: ItemID.dreShovel, count: 1, data: 0}, [
"ax",
], ['x', ItemID.ethUpgr, 0, 'a', ItemID.ethShovel, 0]);
});

//PortalItems
IDRegistry.genItemID("keyABW");
Item.createItem("keyABW", "Geateway Key Tier 1", {name: "GK"});

IDRegistry.genItemID("keyDW");
Item.createItem("keyDW", "Geateway Key Tier 2", {name: "GKD"});


IDRegistry.genItemID("skinABW");
Item.createItem("skinABW", "Depths Monster Skin", {name: "skin_abyssalwasteland"});

IDRegistry.genItemID("skinDW");
Item.createItem("skinDW", "Dreaded Monster Skin", {name: "skin_dreadlands"});

IDRegistry.genItemID("skinO");
Item.createItem("skinO", "Omothol Monster Skin", {name: "skin_omothol"});

IDRegistry.genItemID("essenceABW");
Item.createItem("essenceABW", "Abyss Essence", {name: "essence_abyssalwasteland"});

IDRegistry.genItemID("essenceOrbABW");
Item.createItem("essenceOrbABW", "Abyss Essence Pearl", {name: "essence_abyssalwasteland"});

IDRegistry.genItemID("essenceDW");
Item.createItem("essenceDW", "Dreaded Essence", {name: "essence_dreadlands"});

IDRegistry.genItemID("skinSHN");
Item.createItem("skinSHN", "Shoggoth Skin", {name: "shoggothFlesh_overworld"});

Callback.addCallback('PostLoaded', function () {
Block.registerDropFunction("oreAbyssalinite", function(coords, blockID, blockData, level, enchant){
    if(level >= 3){
        if(enchant.silk){
            return [[BlockID.oreAbyssalinite, 1, 0]];
        }
        var drop = [[BlockID.oreAbyssalinite, 1, 0]];
        if(Math.random() < enchant.fortune/3 - 1/3){drop.push(drop[0]);}
        ToolAPI.dropOreExp(coords, 3, 7, enchant.experience);
        return drop;
    }
    return [];
});
Recipes.addFurnace(BlockID.oreAbyssalinite, ItemID.abbIron, 0);

Block.registerDropFunction("oreCoral", function(coords, blockID, blockData, level, enchant){
    if(level >= 3){
        if(enchant.silk){
            return [[BlockID.oreCoral, 1, 0]];
        }
        var drop = [[ItemID.coralGem, randomInt(1,3), 0]];
        if(Math.random() < enchant.fortune/3 - 1/3){drop.push(drop[0]);}
        ToolAPI.dropOreExp(coords, 3, 7, enchant.experience);
        return drop;
    }
    return [];
});
Recipes.addFurnace(BlockID.oreCoral, ItemID.coralGem, 0);

Block.registerDropFunction("oreCoralInfused", function(coords, blockID, blockData, level, enchant){
    if(level >= 3){
        if(enchant.silk){
            return [[BlockID.oreCoralInfused, 1, 0]];
        }
        var drop = [[ItemID.coralPearl, 1, 0]];
        if(Math.random() < enchant.fortune/3 - 1/3){drop.push(drop[0]);}
        ToolAPI.dropOreExp(coords, 3, 7, enchant.experience);
        return drop;
    }
    return [];
});
Recipes.addFurnace(BlockID.oreCoralInfused, ItemID.coralPearl, 0);

Block.registerDropFunction("oreNitre", function(coords, blockID, blockData, level, enchant){
    if(level >= 3){
        if(enchant.silk){
            return [[BlockID.oreNitre, 1, 0]];
        }
        var drop = [[ItemID.nitrePeace, randomInt(1, 3), 0]];
        if(Math.random() < enchant.fortune/3 - 1/3){drop.push(drop[0]);}
        ToolAPI.dropOreExp(coords, 3, 7, enchant.experience);
        return drop;
    }
    return [];
});
Recipes.addFurnace(BlockID.oreNitre, ItemID.nitrePeace, 0);

Recipes.addFurnace(BlockID.oreAiron, 265, 0);
Recipes.addFurnace(BlockID.oreAgold, 266, 0);
Recipes.addFurnace(BlockID.oreDAbyss, ItemID.abbIron, 0);
Recipes.addFurnace(BlockID.oreAdiamond, 264, 0);


Block.registerDropFunction("oreAdiamond", function(coords, blockID, blockData, level, enchant){
    if(level >= 3){
        if(enchant.silk){
            return [[BlockID.oreAdiamond, 1, 0]];
        }
        var drop = [[264, randomInt(1, 3), 0]];
        if(Math.random() < enchant.fortune/3 - 1/3){drop.push(drop[0]);}
        ToolAPI.dropOreExp(coords, 3, 7, enchant.experience);
        return drop;
    }
    return [];
});
Recipes.addFurnace(BlockID.sandAbyss, BlockID.glassAbyss, 0);

Block.registerDropFunction("Etx", function(coords, blockID, blockData, level, enchant){
    if(level >= 3){
        if(enchant.silk){
            return [[BlockID.Etx, 1, 0]];
        }
        var drop = [[ItemID.ethBrick,, randomInt(1, 3), 0]];
        if(Math.random() < enchant.fortune/3 - 1/3){drop.push(drop[0]);}
        ToolAPI.dropOreExp(coords, 3, 7, enchant.experience);
        return drop;
    }
    return [];
});

Recipes.addFurnace(BlockID.sandAbyss, BlockID.glassAbyss, 0);

Recipes.addShaped({id: BlockID.blockEthaxium, count: 1, data: 0}, [
"xx",
"xx"
], ['a', ItemID.ethIron, 0]);

Recipes.addShaped({id: BlockID.stoneEtxP, count: 1, data: 0}, [
"x",
], ['x', BlockID.stoneEtxb, 0]);

Recipes.addShaped({id: BlockID.stoneEtxP, count: 1, data: 0}, [
"x",
], ['x', BlockID.stoneEtxB, 0]);

Recipes.addShaped({id: BlockID.stoneDarkL, count: 4, data: 0}, [
"oxo",
"xsx",
"oxo"
], ['x', BlockID.stoneDark, 0,'s', ItemID.coralPearl, 0]);

Recipes.addShaped({id: ItemID.ethIron, count: 1, data: 0}, [
     "xxx",
     "xxx",
     "xxx"
], ['x', ItemID.ethNugget, 0]);
Recipes.addShapeless({id: ItemID.ethNugget, count: 9, data: 0}, [{id: ItemID.ethIron, data: 0}]);

Recipes.addShaped({id: ItemID.abbIron, count: 1, data: 0}, [
     "xxx",
     "xxx",
     "xxx"
], ['x', ItemID.abbNugget, 0]);
Recipes.addShapeless({id: ItemID.abbNugget, count: 9, data: 0}, [{id: ItemID.abbIron, data: 0}]);

Recipes.addShaped({id: BlockID.oreCoralInfused, count: 1, data: 0}, [
"xxx",
"aaa",
"xxx"
], ['a', ItemID.coralGem, 0,'x', 1, 0]);

Recipes.addFurnace(ItemID.abbChunck,ItemID.abbIron);
Recipes.addFurnace(ItemID.coralChunck,ItemID.coralIron);
});



// file: Aitems/food.js

IDRegistry.genItemID("plateFood");
Item.createItem("plateFood", "Food Plate", {name: "plate"},{isTech:false});
Recipes.addShaped({id: ItemID.plateFood, count: 2, data: 0}, [
"xx",
], ['x', 265, 0]);

IDRegistry.genItemID("plateFoodD");
Item.createItem("plateFoodD", "Dirty Food Plate", {name: "dirtyplate"},{isTech:false});

IDRegistry.genItemID("plateFoodC");
Item.createFoodItem("plateFoodC", "Chicken on a Plate", {name: "ChiP"},{isTech:false,food: 11});
Callback.addCallback("FoodEaten",function(heal, satRatio){
if(Player.getCarriedItem().id==ItemID.plateFoodC){
Player.addItemToInventory(ItemID.plateFoodD, 1);
}});

IDRegistry.genItemID("plateFoodP");
Item.createFoodItem("plateFoodP", "Porkchop on a Plate", {name: "PorP"},{isTech:false,food: 15});
Callback.addCallback("FoodEaten",function(heal, satRatio){
if(Player.getCarriedItem().id==ItemID.plateFoodP){
Player.addItemToInventory(ItemID.plateFoodD, 1);
}});

IDRegistry.genItemID("plateFoodB");
Item.createFoodItem("plateFoodB", "Beef on a Plate", {name: "BeeP"},{isTech:false,food: 13});
Callback.addCallback("FoodEaten",function(heal, satRatio){
if(Player.getCarriedItem().id==ItemID.plateFoodB){
Player.addItemToInventory(ItemID.plateFoodD, 1);
}});

IDRegistry.genItemID("plateFoodF");
Item.createFoodItem("plateFoodF", "Fish on a Plate", {name: "FisP"},{isTech:false,food: 13});
Callback.addCallback("FoodEaten",function(heal, satRatio){
if(Player.getCarriedItem().id==ItemID.plateFoodF){
Player.addItemToInventory(ItemID.plateFoodD, 1);
}});

IDRegistry.genItemID("eggF");
Item.createFoodItem("eggF", "Fried Egg", {name: "friedegg"},{isTech:false,food: 7});
Recipes.addFurnace(344, ItemID.eggF, 0);

IDRegistry.genItemID("plateEggF");
Item.createFoodItem("plateEggF", "Fried Egg on a Plate", {name: "eggp"},{isTech:false,food: 9});
Callback.addCallback("FoodEaten",function(heal, satRatio){
if(Player.getCarriedItem().id==ItemID.plateFoodF){
Player.addItemToInventory(ItemID.plateFoodD, 1);
}});

IDRegistry.genItemID("MRE");
Item.createFoodItem("MRE", "MRE", {name: "MRE"},{isTech:false,food: 20});
Recipes.addShaped({id: ItemID.MRE, count: 1, data: 0}, [
     "ax",
     "xr",
     "d"
], ['x', ItemID.plateFoodC, 0, 'a', ItemID.plateFoodP, 0, 'r', ItemID.plateFoodB, 0, 'd', ItemID.plateFoodF, 0]);

IDRegistry.genItemID("Cb");
Item.createFoodItem("Cb", "Boned Flesh Abyss", {name: "CB"},{isTech:false,food: 4});

IDRegistry.genItemID("Bo");
Item.createFoodItem("Bo", "Flesh Abyss", {name: "CF"},{isTech:false,food: 4});

//ANTIFOOD
IDRegistry.genItemID("anBo");
Item.createItem("anBo", "Anti Bone", {name: "antiBone"});

IDRegistry.genItemID("anFl");
Item.createFoodItem("anFl", "Anti Flesh", {name: "antiFlesh"},{isTech:false,food: 3});
Callback.addCallback("FoodEaten",function(heal, satRatio){
if(Player.getCarriedItem().id==ItemID.anFl){
Entity.addEffect(Player.get(), 17, 240, 1, false, false);
}});

IDRegistry.genItemID("anCb");
Item.createFoodItem("anCb", "Anti Boned Flesh", {name: "antiCB"},{isTech:false,food: 3});
Callback.addCallback("FoodEaten",function(heal, satRatio){
if(Player.getCarriedItem().id==ItemID.anCb){
Entity.addEffect(Player.get(), 17, 240, 1, false, false);
}});

IDRegistry.genItemID("anCF");
Item.createFoodItem("anCF", "Anti Dreadling Flesh", {name: "antiCF"},{isTech:false,food: 3});
Callback.addCallback("FoodEaten",function(heal, satRatio){
if(Player.getCarriedItem().id==ItemID.anCF){
Entity.addEffect(Player.get(), 17, 240, 1, false, false);
}});

IDRegistry.genItemID("anSY");
Item.createFoodItem("anSY", "Anti Spider Eye", {name: "antiSpider_eye"},{isTech:false,food: 3});
Callback.addCallback("FoodEaten",function(heal, satRatio){
if(Player.getCarriedItem().id==ItemID.anSY){
Entity.addEffect(Player.get(), 17, 240, 1, false, false);
}});

IDRegistry.genItemID("anCh");
Item.createFoodItem("anCh", "Anti Chicken", {name: "antiChicken"},{isTech:false,food: 3});

IDRegistry.genItemID("anBe");
Item.createFoodItem("anBe", "Anti Beef", {name: "antiBeef"},{isTech:false,food: 3});

IDRegistry.genItemID("anMilk");
Item.createFoodItem("anMilk", "Anti Milk", {name: "Antibucket"},{isTech:false,food: 9});
Callback.addCallback("FoodEaten",function(heal, satRatio){
if(Player.getCarriedItem().id==ItemID.anMilk){
Player.addItemToInventory(325, 1, 0);
}});

IDRegistry.genItemID("anPo");
Item.createFoodItem("anPo", "Anti Pork", {name: "antiPork"},{isTech:false,food: 4});





// file: Aitems/tools.js

//Tier1
IDRegistry.genItemID("abyssSSword");
Item.createItem("abyssSSword", "Dark Stone Sword", {name: "DSW", meta: 0}, {stack: 1});

IDRegistry.genItemID("abyssSShovel");
Item.createItem("abyssSShovel", "Dark Stone Shovel", {name: "DS", meta: 0}, {stack: 1});

IDRegistry.genItemID("abyssSPickaxe");
Item.createItem("abyssSPickaxe", "Dark Stone Pickaxe", {name: "DP", meta: 0}, {stack: 1});

IDRegistry.genItemID("abyssSAxe");
Item.createItem("abyssSAxe", "Dark Stone Axe", {name: "DA", meta: 0}, {stack: 1});

IDRegistry.genItemID("abyssSHoe");
Item.createItem("abyssSHoe", "Dark Stone Hoe", {name: "DH", meta: 0}, {stack: 1});

ToolAPI.addToolMaterial("abyssSsw", {durability: 496, level: 2, efficiency: 4, damage: 9, enchantability: 14});
ToolAPI.addToolMaterial("abyssSsh", {durability: 448, level: 2, efficiency: 6, damage: 3, enchantability: 14});
ToolAPI.addToolMaterial("abyssSpi", {durability: 512, level: 2, efficiency: 6, damage: 4, enchantability: 14});
ToolAPI.addToolMaterial("abyssSaxe", {durability: 510, level: 2, efficiency: 6, damage: 5, enchantability: 14});
ToolAPI.addToolMaterial("abyssShoe", {durability: 506, level: 2, efficiency: 6, damage: 3, enchantability: 14});

ToolLib.setTool(ItemID.abyssSSword, "abyssSsw", ToolType.sword);
ToolLib.setTool(ItemID.abyssSShovel, "abyssSsh", ToolType.shovel);
ToolLib.setTool(ItemID.abyssSPickaxe, "abyssSpi", ToolType.pickaxe);
ToolLib.setTool(ItemID.abyssSAxe, "abyssSaxe", ToolType.axe);
ToolLib.setTool(ItemID.abyssSHoe, "abyssShoe", ToolType.hoe);
Callback.addCallback("PostLoaded", function(){  
Recipes.addShaped({id: ItemID.abyssSSword, count: 1, data: 0}, [
    "a",
    "a",
    "b"
], ['a', BlockID.stoneDark, 0, 'b', 280, 0]);

Recipes.addShaped({id: ItemID.abyssSShovel, count: 1, data: 0}, [
    "a",
    "b",
    "b"
], ['a', BlockID.stoneDark, 0, 'b', 280, 0]);

Recipes.addShaped({id: ItemID.abyssSPickaxe, count: 1, data: 0}, [
    "aaa",
    " b ",
    " b "
], ['a', BlockID.stoneDark, 0, 'b', 280, 0]);

Recipes.addShaped({id: ItemID.abyssSAxe, count: 1, data: 0}, [
    "aa",
    "ab",
    " b"
], ['a', BlockID.stoneDark, 0, 'b', 280, 0]);

Recipes.addShaped({id: ItemID.abyssSHoe, count: 1, data: 0}, [
   "aa",
    "b",
    "b"
], ['a', BlockID.stoneDark, 0, 'b', 280, 0]);
Item.addRepairItemIds(ItemID.abyssSSword, [BlockID.stoneDark, ItemID.abyssSSword]);
Item.addRepairItemIds(ItemID.abyssSShovel, [BlockID.stoneDark, ItemID.abyssSShovel]);
Item.addRepairItemIds(ItemID.abyssSPickaxe, [BlockID.stoneDark, ItemID.abyssSPickaxe]);
Item.addRepairItemIds(ItemID.abyssSAxe, [BlockID.stoneDark, ItemID.abyssSAxe]);
Item.addRepairItemIds(ItemID.abyssSHoe, [BlockID.stoneDark, ItemID.abyssSHoe]);
});
//Tier2
IDRegistry.genItemID("abyssSword");
Item.createItem("abyssSword", "Abyssalnite Sword", {name: "ASW", meta: 0}, {stack: 1});

IDRegistry.genItemID("abyssShovel");
Item.createItem("abyssShovel", "Abyssalnite Shovel", {name: "AS", meta: 0}, {stack: 1});

IDRegistry.genItemID("abyssPickaxe");
Item.createItem("abyssPickaxe", "Abyssalnite Pickaxe", {name: "AP", meta: 0}, {stack: 1});

IDRegistry.genItemID("abyssAxe");
Item.createItem("abyssAxe", "Abyssalnite Axe", {name: "AA", meta: 0}, {stack: 1});

IDRegistry.genItemID("abyssHoe");
Item.createItem("abyssHoe", "Abyssalnite Hoe", {name: "AH", meta: 0}, {stack: 1});

ToolAPI.addToolMaterial("abysssw", {durability: 1129, level: 5, efficiency: 4, damage: 9, enchantability: 14});
ToolAPI.addToolMaterial("abysssh", {durability: 1562, level: 5, efficiency: 6, damage: 3, enchantability: 14});
ToolAPI.addToolMaterial("abysspi", {durability: 1568, level: 5, efficiency: 6, damage: 4, enchantability: 14});
ToolAPI.addToolMaterial("abyssaxe", {durability: 1562, level: 5, efficiency: 6, damage: 5, enchantability: 14});
ToolAPI.addToolMaterial("abysshoe", {durability: 1562, level: 5, efficiency: 6, damage: 3, enchantability: 14});

ToolLib.setTool(ItemID.abyssSword, "abysssw", ToolType.sword);
ToolLib.setTool(ItemID.abyssShovel, "abysssh", ToolType.shovel);
ToolLib.setTool(ItemID.abyssPickaxe, "abysspi", ToolType.pickaxe);
ToolLib.setTool(ItemID.abyssAxe, "abyssaxe", ToolType.axe);
ToolLib.setTool(ItemID.abyssHoe, "abysshoe", ToolType.hoe);
Recipes.addShaped({id: ItemID.abyssSword, count: 1, data: 0}, [
    "a",
    "a",
    "b"
], ['a', ItemID.abbIron, 0, 'b', 280, 0]);

Recipes.addShaped({id: ItemID.abyssShovel, count: 1, data: 0}, [
    "a",
    "b",
    "b"
], ['a', ItemID.abbIron, 0, 'b', 280, 0]);
6
Recipes.addShaped({id: ItemID.abyssPickaxe, count: 1, data: 0}, [
    "aaa",
    " b ",
    " b "
], ['a', ItemID.abbIron, 0, 'b', 280, 0]);

Recipes.addShaped({id: ItemID.abyssAxe, count: 1, data: 0}, [
    "aa",
    "ab",
    " b"
], ['a', ItemID.abbIron, 0, 'b', 280, 0]);

Recipes.addShaped({id: ItemID.abyssHoe, count: 1, data: 0}, [
   "aa",
    "b",
    "b"
], ['a', ItemID.abbIron, 0, 'b', 280, 0]);

Item.addRepairItemIds(ItemID.abyssSword, [ItemID.abbIron, ItemID.abyssSword]);
Item.addRepairItemIds(ItemID.abyssShovel, [ItemID.abbIron, ItemID.abyssShovel]);
Item.addRepairItemIds(ItemID.abyssPickaxe, [ItemID.abbIron, ItemID.abyssPickaxe]);
Item.addRepairItemIds(ItemID.abyssAxe, [ItemID.abbIron, ItemID.abyssAxe]);
Item.addRepairItemIds(ItemID.abyssHoe, [ItemID.abbIron, ItemID.abyssHoe]);

//Coralium
IDRegistry.genItemID("corSword");
Item.createItem("corSword", "Reinforced Coralium Sword", {name: "RCSW", meta: 0}, {stack: 1});

IDRegistry.genItemID("corShovel");
Item.createItem("corShovel", "Reinforced Coralium Shovel", {name: "RCS", meta: 0}, {stack: 1});

IDRegistry.genItemID("corPickaxe");
Item.createItem("corPickaxe", "Reinforced Coralium Pickaxe", {name: "RCP", meta: 0}, {stack: 1});

IDRegistry.genItemID("corAxe");
Item.createItem("corAxe", "Reinforced Coralium Axe", {name: "RCA", meta: 0}, {stack: 1});

IDRegistry.genItemID("corHoe");
Item.createItem("corHoe", "Reinforced Coralium Hoe", {name: "RCH", meta: 0}, {stack: 1});

ToolAPI.addToolMaterial("corsw", {durability: 1189, level: 5, efficiency: 4, damage: 10, enchantability: 14});
ToolAPI.addToolMaterial("corsh", {durability: 1610, level: 5, efficiency: 6, damage: 3, enchantability: 14});
ToolAPI.addToolMaterial("corpi", {durability: 1506, level: 5, efficiency: 6, damage: 4, enchantability: 14});
ToolAPI.addToolMaterial("coraxe", {durability: 1598, level: 5, efficiency: 6, damage: 5, enchantability: 14});
ToolAPI.addToolMaterial("corhoe", {durability: 1597, level: 5, efficiency: 6, damage: 3, enchantability: 14});

ToolLib.setTool(ItemID.corSword, "corsw", ToolType.sword);
ToolLib.setTool(ItemID.corShovel, "corsh", ToolType.shovel);
ToolLib.setTool(ItemID.corPickaxe, "corpi", ToolType.pickaxe);
ToolLib.setTool(ItemID.corAxe, "coraxe", ToolType.axe);
ToolLib.setTool(ItemID.corHoe, "corhoe", ToolType.hoe);
Recipes.addShaped({id: ItemID.corSword, count: 1, data: 0}, [
    "a",
    "a",
    "b"
], ['a', ItemID.coralIron, 0, 'b', 280, 0]);

Recipes.addShaped({id: ItemID.corShovel, count: 1, data: 0}, [
    "a",
    "b",
    "b"
], ['a', ItemID.coralIron, 0, 'b', 280, 0]);
6
Recipes.addShaped({id: ItemID.corPickaxe, count: 1, data: 0}, [
    "aaa",
    " b ",
    " b "
], ['a', ItemID.coralIron, 0, 'b', 280, 0]);

Recipes.addShaped({id: ItemID.corAxe, count: 1, data: 0}, [
    "aa",
    "ab",
    " b"
], ['a', ItemID.coralIron, 0, 'b', 280, 0]);

Recipes.addShaped({id: ItemID.corHoe, count: 1, data: 0}, [
   "aa",
    "b",
    "b"
], ['a', ItemID.coralIron, 0, 'b', 280, 0]);

Item.addRepairItemIds(ItemID.corSword, [ItemID.coralIron, ItemID.corSword]);
Item.addRepairItemIds(ItemID.corShovel, [ItemID.coralIron, ItemID.corShovel]);
Item.addRepairItemIds(ItemID.corPickaxe, [ItemID.coralIron, ItemID.corPickaxe]);
Item.addRepairItemIds(ItemID.corAxe, [ItemID.coralIron, ItemID.corAxe]);
Item.addRepairItemIds(ItemID.corHoe, [ItemID.coralIron, ItemID.corHoe]);

//Tier3
IDRegistry.genItemID("dreSword");
Item.createItem("dreSword", "Dredalinite Sword", {name: "DDSW", meta: 0}, {stack: 1});

IDRegistry.genItemID("dreShovel");
Item.createItem("dreShovel", "Dredalinite Shovel", {name: "DDS", meta: 0}, {stack: 1});

IDRegistry.genItemID("drePickaxe");
Item.createItem("drePickaxe", "Dredalinite Pickaxe", {name: "DDP", meta: 0}, {stack: 1});

IDRegistry.genItemID("dreAxe");
Item.createItem("dreAxe", "Dredalinite Axe", {name: "DDA", meta: 0}, {stack: 1});

IDRegistry.genItemID("dreHoe");
Item.createItem("dreHoe", "Dredalinite Hoe", {name: "DDH", meta: 0}, {stack: 1});

ToolAPI.addToolMaterial("dresw", {durability: 1329, level: 5, efficiency: 4, damage: 12, enchantability: 14});
ToolAPI.addToolMaterial("dresh", {durability: 1762, level: 5, efficiency: 6, damage: 3, enchantability: 14});
ToolAPI.addToolMaterial("drepi", {durability: 1768, level: 5, efficiency: 6, damage: 4, enchantability: 14});
ToolAPI.addToolMaterial("dreaxe", {durability: 1762, level: 5, efficiency: 6, damage: 5, enchantability: 14});
ToolAPI.addToolMaterial("drehoe", {durability: 1762, level: 5, efficiency: 6, damage: 3, enchantability: 14});

ToolLib.setTool(ItemID.dreSword, "dresw", ToolType.sword);
ToolLib.setTool(ItemID.dreShovel, "dresh", ToolType.shovel);
ToolLib.setTool(ItemID.drePickaxe, "drepi", ToolType.pickaxe);
ToolLib.setTool(ItemID.dreAxe, "dreaxe", ToolType.axe);
ToolLib.setTool(ItemID.dreHoe, "drehoe", ToolType.hoe);
Recipes.addShaped({id: ItemID.dreSword, count: 1, data: 0}, [
    "a",
    "a",
    "b"
], ['a', ItemID.dreadIron, 0, 'b', 280, 0]);

Recipes.addShaped({id: ItemID.dreShovel, count: 1, data: 0}, [
    "a",
    "b",
    "b"
], ['a', ItemID.dreadIron, 0, 'b', 280, 0]);
6
Recipes.addShaped({id: ItemID.drePickaxe, count: 1, data: 0}, [
    "aaa",
    " b ",
    " b "
], ['a', ItemID.dreadIron, 0, 'b', 280, 0]);

Recipes.addShaped({id: ItemID.dreAxe, count: 1, data: 0}, [
    "aa",
    "ab",
    " b"
], ['a', ItemID.dreadIron, 0, 'b', 280, 0]);

Recipes.addShaped({id: ItemID.dreHoe, count: 1, data: 0}, [
   "aa",
    "b",
    "b"
], ['a', ItemID.dreadIron, 0, 'b', 280, 0]);

Item.addRepairItemIds(ItemID.dreSword, [ItemID.dreadIron, ItemID.dreSword]);
Item.addRepairItemIds(ItemID.dreShovel, [ItemID.dreadIron, ItemID.dreShovel]);
Item.addRepairItemIds(ItemID.drePickaxe, [ItemID.dreadIron, ItemID.drePickaxe]);
Item.addRepairItemIds(ItemID.dreAxe, [ItemID.dreadIron, ItemID.dreAxe]);
Item.addRepairItemIds(ItemID.dreHoe, [ItemID.dreadIron, ItemID.dreHoe]);

//Ethaxium
IDRegistry.genItemID("ethSword");
Item.createItem("ethSword", "Ethaxium Sword", {name: "ESW", meta: 0}, {stack: 1});

IDRegistry.genItemID("ethShovel");
Item.createItem("ethShovel", "Ethaxium Shovel", {name: "ES", meta: 0}, {stack: 1});

IDRegistry.genItemID("ethPickaxe");
Item.createItem("ethPickaxe", "Ethaxium Pickaxe", {name: "EP", meta: 0}, {stack: 1});

IDRegistry.genItemID("ethAxe");
Item.createItem("ethAxe", "Ethaxium Axe", {name: "EA", meta: 0}, {stack: 1});

IDRegistry.genItemID("ethHoe");
Item.createItem("ethHoe", "Ethaxium Hoe", {name: "EH", meta: 0}, {stack: 1});

ToolAPI.addToolMaterial("ethsw", {durability: 1929, level: 6, efficiency: 5, damage: 15, enchantability: 14});
ToolAPI.addToolMaterial("ethsh", {durability: 2162, level: 6, efficiency: 7, damage: 4, enchantability: 14});
ToolAPI.addToolMaterial("ethpi", {durability: 2168, level: 6, efficiency: 7, damage: 4, enchantability: 14});
ToolAPI.addToolMaterial("ethaxe", {durability: 2162, level: 6, efficiency: 7, damage: 6, enchantability: 14});
ToolAPI.addToolMaterial("ethhoe", {durability: 2162, level: 6, efficiency: 7, damage: 3, enchantability: 14});

ToolLib.setTool(ItemID.ethSword, "ethsw", ToolType.sword);
ToolLib.setTool(ItemID.ethShovel, "ethsh", ToolType.shovel);
ToolLib.setTool(ItemID.ethPickaxe, "ethpi", ToolType.pickaxe);
ToolLib.setTool(ItemID.ethAxe, "ethaxe", ToolType.axe);
ToolLib.setTool(ItemID.ethHoe, "ethhoe", ToolType.hoe);
Recipes.addShaped({id: ItemID.ethSword, count: 1, data: 0}, [
    "a",
    "a",
    "b"
], ['a', ItemID.ethIron, 0, 'b', ItemID.ethBrick, 0]);

Recipes.addShaped({id: ItemID.ethShovel, count: 1, data: 0}, [
    "a",
    "b",
    "b"
], ['a', ItemID.ethIron, 0, 'b', ItemID.ethBrick, 0]);
6
Recipes.addShaped({id: ItemID.ethPickaxe, count: 1, data: 0}, [
    "aaa",
    " b ",
    " b "
], ['a', ItemID.ethIron, 0, 'b', ItemID.ethBrick, 0]);

Recipes.addShaped({id: ItemID.ethAxe, count: 1, data: 0}, [
    "aa",
    "ab",
    " b"
], ['a', ItemID.ethIron, 0, 'b', ItemID.ethBrick, 0]);

Recipes.addShaped({id: ItemID.ethHoe, count: 1, data: 0}, [
   "aa",
    "b",
    "b"
], ['a', ItemID.ethIron, 0, 'b', ItemID.ethBrick, 0]);

Item.addRepairItemIds(ItemID.ethSword, [ItemID.ethIron, ItemID.ethSword]);
Item.addRepairItemIds(ItemID.ethShovel, [ItemID.ethIron, ItemID.ethShovel ]);
Item.addRepairItemIds(ItemID.ethPickaxe, [ItemID.ethIron, ItemID.ethPickaxe]);
Item.addRepairItemIds(ItemID.ethAxe, [ItemID.ethIron, ItemID.ethAxe]);
Item.addRepairItemIds(ItemID.ethHoe, [ItemID.ethIron, ItemID.ethHoe]);

IDRegistry.genItemID("soulSword");
Item.createItem("soulSword", "Soul Reaper", {name: "soulReaper", meta: 0}, {stack: 1});

ToolAPI.addToolMaterial("ssw", {durability: 2000, level: 6, efficiency: 6, damage: 20, enchantability: 14});
ToolLib.setTool(ItemID.soulSword, "ssw", ToolType.sword);

//Item.addRepairItemIds(ItemID.soulSword, [ItemID.soulG, ItemID.soulSword]);
//Item.addRepairItemIds(ItemID.soulSword, [ItemID.ethIron, ItemID.soulSword]);

IDRegistry.genItemID("caneJ");
Item.createItem("caneJ", "Jzahar's Cane", {name: "SOTG", meta: 0}, {stack: 1});

IDRegistry.genItemID("caneJr");
Item.createItem("caneJr", "Jzahar's Cane", {name: "SOTG", meta: 0}, {stack: 1});

var CaneM = new RenderMesh(__dir__ + "/models/Cane.obj","obj", {translate: [0, .18, 0], scale: [1.5, 1.5, 1.5]});

ItemModel.getFor(ItemID.caneJ, 0).setModel(CaneM, "staff");
ItemModel.getFor(ItemID.caneJr, 0).setModel(CaneM, "staff2");

IDRegistry.genItemID("Katana");
Item.createItem("Katana", "Dreaded Katana", {name: "SOTG", meta: 0}, {stack: 1});

var KatanaM = new RenderMesh(__dir__ + "/models/Katana.obj","obj", {translate: [0.5, 0, 0.5], scale: [1.5, 1.5, 1.5]});
ItemModel.getFor(ItemID.Katana, 0).setModel(KatanaM, "katana");

ToolAPI.addToolMaterial("kt", {durability: 3000, level: 7, efficiency: 7, damage: 32, enchantability: 14});
ToolLib.setTool(ItemID.Katana, "kt", ToolType.sword);

ToolAPI.addToolMaterial("cjzr", {durability: 2256, level: 6, efficiency: 6, damage: 24, enchantability: 14});
ToolLib.setTool(ItemID.caneJr, "cjzr", ToolType.sword);

var lookDir = function(yaw, pitch){
 var vector = {};
 vector.y = -Math.sin((pitch));
 vector.x = -Math.sin((yaw)) * Math.cos((pitch));
 vector.z = Math.cos((yaw)) * Math.cos((pitch));
return vector;
}

Callback.addCallback("ItemUseNoTarget", function(item){
if (Player.getCarriedItem().id == ItemID.caneJr) {  
let coords = Entity.getPosition(Player.get());
let lookAngle = Entity.getLookAngle(Player.get()); 
  var yaw = lookAngle.yaw + lookDir((Math.random() * 5) - (5 / 2));
   var pitch = lookAngle.pitch + lookDir((Math.random() * 5) - (5 / 2));
    let velocity = {
   x: -Math.sin((yaw)) * Math.cos((pitch)),
   y: Math.sin((pitch)),
   z: Math.cos((yaw)) * Math.cos((pitch))}
let entity = Entity.spawn(coords.x, coords.y, coords.z, Native.EntityType.SMALL_FIREBALL);
 Entity.moveToAngle(entity, velocity, {speed: 6,  denyY: false,  jumpVel: 0});
}         
});




// file: Aitems/armor.js

//Tier: 1
IDRegistry.genItemID("ABHelm");
Item.createArmorItem("ABHelm", "Abyssalnite helmet", {name: "AAH"}, {type: "helmet", armor: 3, durability: 1221, texture: "armor/abyssalnite_1.png", isTech:false});

IDRegistry.genItemID("ABCh");
Item.createArmorItem("ABCh", "Abyssalnite chestplate", {name: "AAC"}, {type: "chestplate", armor: 8, durability: 1376, texture: "armor/abyssalnite_1.png", isTech:false});

IDRegistry.genItemID("ABLeg");
Item.createArmorItem("ABLeg", "Abyssalnite leggins", {name: "AAP"}, {type: "leggings", armor: 6, durability:1341, texture: "armor/abyssalnite_2.png", isTech:false});

IDRegistry.genItemID("ABBoot");
Item.createArmorItem("ABBoot", "Abyssalnite boots", {name: "AAB"}, {type: "boots", armor: 3, durability: 1200, texture: "armor/abyssalnite_1.png", isTech:false});

Item.addRepairItemIds(ItemID.ABHelm, [ItemID.ABHelm]);
Item.addRepairItemIds(ItemID.ABCh, [ItemID.ABCh]);
Item.addRepairItemIds(ItemID.ABLeg, [ItemID.ABLeg]);
Item.addRepairItemIds(ItemID.ABBoot, [ItemID.ABBoot]);

Recipes.addShaped({id: ItemID.ABHelm, count: 1, data: 0}, [
"xxx",
"x x"
], ['x', ItemID.abbIron, 0]);
Recipes.addShaped({id: ItemID.ABCh, count: 1, data: 0}, [
"x x",
"xxx",
"xxx"
], ['x', ItemID.abbIron, 0]);
Recipes.addShaped({id: ItemID.ABLeg, count: 1, data: 0}, [
"xxx",
"x x",
"x x"
], ['x', ItemID.abbIron, 0]);
Recipes.addShaped({id: ItemID.ABBoot, count: 1, data: 0}, [
"x x",
"x x"
], ['x', ItemID.abbIron, 0]);

//Tier: 2
IDRegistry.genItemID("DABHelm");
Item.createArmorItem("DABHelm", "Dreaded Abyssalnite helmet", {name: "ADAH"}, {type: "helmet", armor: 3, durability: 1347, texture: "armor/dread_1.png", isTech:false});

IDRegistry.genItemID("DABCh");
Item.createArmorItem("DABCh", "Dreaded Abyssalnite chestplate", {name: "ADAC"}, {type: "chestplate", armor: 8, durability: 1396, texture: "armor/dread_1.png", isTech:false});

IDRegistry.genItemID("DABLeg");
Item.createArmorItem("DABLeg", "Dreaded Abyssalnite leggins", {name: "ADAP"}, {type: "leggings", armor: 6, durability:1366, texture: "armor/dread_2.png", isTech:false});

IDRegistry.genItemID("DABBoot");
Item.createArmorItem("DABBoot", "Dreaded Abyssalnite boots", {name: "ADAB"}, {type: "boots", armor: 3, durability: 1337, texture: "armor/dread_1.png", isTech:false});

Item.addRepairItemIds(ItemID.DABHelm, [ItemID.DABHelm]);
Item.addRepairItemIds(ItemID.DABCh, [ItemID.DABCh]);
Item.addRepairItemIds(ItemID.DABLeg, [ItemID.DABLeg]);
Item.addRepairItemIds(ItemID.DABBoot, [ItemID.DABBoot]);

//effects:Night Vision I, Fire Resistance IV 

Armor.registerFuncs(ItemID.DABHelm, {
  tick: function(slot, inventory, index){
   if(Player.getArmorSlot(1).id == ItemID.DABCh && Player.getArmorSlot(2).id == ItemID.DABLeg ) 
 Entity.addEffect(Player.get(), 16, 4440, 0, false, false);         
 Entity.addEffect(Player.get(), 12, 4440, 0, false, false);    
   }
});

IDRegistry.genItemID("RCHelm");
Item.createArmorItem("RCHelm", "Refined Coralium helmet", {name: "ACH"}, {type: "helmet", armor: 3, durability: 1534, texture: "armor/coralium_1.png", isTech:false});

IDRegistry.genItemID("RCCh");
Item.createArmorItem("RCCh", "Refined Coralium chestplate", {name: "ACC"}, {type: "chestplate", armor: 8, durability: 1587, texture: "armor/coralium_1.png", isTech:false});

IDRegistry.genItemID("RCLeg");
Item.createArmorItem("RCLeg", "Refined Coralium leggins", {name: "ACP"}, {type: "leggings", armor: 6, durability:1552, texture: "armor/coralium_2.png", isTech:false});

IDRegistry.genItemID("RCBoot");
Item.createArmorItem("RCBoot", "Refined Coralium boots", {name: "ACB"}, {type: "boots", armor: 3, durability: 1531, texture: "armor/coralium_1.png", isTech:false});

Item.addRepairItemIds(ItemID.RCHelm, [ItemID.RCHelm]);
Item.addRepairItemIds(ItemID.RCCh, [ItemID.RCCh]);
Item.addRepairItemIds(ItemID.RCLeg, [ItemID.RCLeg]);
Item.addRepairItemIds(ItemID.RCBoot, [ItemID.RCBoot]);

Recipes.addShaped({id: ItemID.RCHelm, count: 1, data: 0}, [
"xxx",
"x x"
], ['x', ItemID.coralIron, 0]);
Recipes.addShaped({id: ItemID.RCCh, count: 1, data: 0}, [
"x x",
"xxx",
"xxx"
], ['x', ItemID.coralIron, 0]);
Recipes.addShaped({id: ItemID.RCLeg, count: 1, data: 0}, [
"xxx",
"x x",
"x x"
], ['x', ItemID.coralIron, 0]);
Recipes.addShaped({id: ItemID.RCBoot, count: 1, data: 0}, [
"x x",
"x x"
], ['x', ItemID.coralIron, 0]);
//effects:, Speed II, Water Breathing I


//Tier: 3
IDRegistry.genItemID("PRCHelm");
Item.createArmorItem("PRCHelm", "Plated Coralium helmet", {name: "ACHP"}, {type: "helmet", armor: 5, durability: 1600, texture: "armor/coraliumP_1.png", isTech:false});

IDRegistry.genItemID("PRCCh");
Item.createArmorItem("PRCCh", "Plated Coralium chestplate", {name: "ACCP"}, {type: "chestplate", armor: 9, durability: 1668, texture: "armor/coraliumP_1.png", isTech:false});

IDRegistry.genItemID("PRCLeg");
Item.createArmorItem("PRCLeg", "Plated Coralium leggins", {name: "ACPP"}, {type: "leggings", armor: 7, durability:1643, texture: "armor/coraliumP_2.png", isTech:false});

IDRegistry.genItemID("PRCBoot");
Item.createArmorItem("PRCBoot", "Plated Coralium boots", {name: "ACBP"}, {type: "boots", armor: 4, durability: 1634, texture: "armor/coraliumP_1.png", isTech:false});

Item.addRepairItemIds(ItemID.PRCHelm, [ItemID.PRCHelm]);
Item.addRepairItemIds(ItemID.PRCCh, [ItemID.PRCCh]);
Item.addRepairItemIds(ItemID.PRCLeg, [ItemID.PRCLeg]);
Item.addRepairItemIds(ItemID.PRCBoot, [ItemID.PRCBoot]);

//effects: Night Vision I, Speed II, Water Breathing II

Recipes.addShaped({id: ItemID.PRCHelm, count: 1, data: 0}, [
"aba",
"bcb",
"xxx"
], ['a', ItemID.coralPearl, 0, 'b', ItemID.coralPlate, 0, 'c', ItemID.RCHelm, 0, 'x', ItemID.coralIron, 0]);
Recipes.addShaped({id: ItemID.PRCCh, count: 1, data: 0}, [
"b b",
"xcx",
"xbx" 
], ['b', ItemID.coralPlate, 0, 'c', ItemID.RCCh, 0, 'x', ItemID.coralIron, 0]);
Recipes.addShaped({id: ItemID.PRCLeg, count: 1, data: 0}, [
"bcb",
"x x",
"x x"
], ['b', ItemID.coralPlate, 0, 'c', ItemID.RCLeg, 0, 'x', ItemID.coralIron, 0]);
Recipes.addShaped({id: ItemID.PRCBoot, count: 1, data: 0}, [
"x x",
"bxb"
], ['b', ItemID.coralPlate, 0, 'c', ItemID.RCBoot, 0, 'x', ItemID.coralIron, 0]);

IDRegistry.genItemID("DPHelm");
Item.createArmorItem("DPHelm", "Depths helmet", {name: "ADH"}, {type: "helmet", armor: 3, durability: 1623, texture: "armor/depths_1.png", isTech:false});

IDRegistry.genItemID("DPCh");
Item.createArmorItem("DPCh", "Depths chestplate", {name: "ADC"}, {type: "chestplate", armor: 8, durability: 1745, texture: "armor/depths_1.png", isTech:false});

IDRegistry.genItemID("DPLeg");
Item.createArmorItem("DPLeg", "Depths leggins", {name: "ADP"}, {type: "leggings", armor: 6, durability:1734, texture: "armor/depths_2.png", isTech:false});

IDRegistry.genItemID("DPBoot");
Item.createArmorItem("DPBoot", "Depths boots", {name: "ADB"}, {type: "boots", armor: 3, durability: 1674, texture: "armor/depths_1.png", isTech:false});

Item.addRepairItemIds(ItemID.DPHelm, [ItemID.DPHelm]);
Item.addRepairItemIds(ItemID.DPCh, [ItemID.DPCh]);
Item.addRepairItemIds(ItemID.DPLeg, [ItemID.DPLeg]);
Item.addRepairItemIds(ItemID.DPBoot, [ItemID.DPBoot]);

//effects: Night Vision II, Speed III, Water Breathing II, Jump Boost II

IDRegistry.genItemID("DADHelm");
Item.createArmorItem("DADHelm", "Dredalinite helmet", {name: "ADDH"}, {type: "helmet", armor: 3, durability: 1844, texture: "armor/dreadium_1.png", isTech:false});

IDRegistry.genItemID("DADCh");
Item.createArmorItem("DADCh", "Dredalinite chestplate", {name: "ADDC"}, {type: "chestplate", armor: 8, durability: 1934, texture: "armor/dreadium_1.png", isTech:false});

IDRegistry.genItemID("DADLeg");
Item.createArmorItem("DADLeg", "Dredalinite leggins", {name: "ADDP"}, {type: "leggings", armor: 6, durability:1988, texture: "armor/dreadium_2.png", isTech:false});

IDRegistry.genItemID("DADBoot");
Item.createArmorItem("DADBoot", "Dredalinite boots", {name: "ADDB"}, {type: "boots", armor: 3, durability: 1825, texture: "armor/dreadium_1.png", isTech:false});

Item.addRepairItemIds(ItemID.DADHelm, [ItemID.DADHelm]);
Item.addRepairItemIds(ItemID.DADCh, [ItemID.DADCh]);
Item.addRepairItemIds(ItemID.DADLeg, [ItemID.DADLeg]);
Item.addRepairItemIds(ItemID.DADBoot, [ItemID.DADBoot]);

Recipes.addShaped({id: ItemID.DADHelm, count: 1, data: 0}, [
"xxx",
"x x"
], ['x', ItemID.dreadIron, 0]);
Recipes.addShaped({id: ItemID.DADCh, count: 1, data: 0}, [
"x x",
"xxx",
"xxx"
], ['x', ItemID.dreadIron, 0]);
Recipes.addShaped({id: ItemID.DADLeg, count: 1, data: 0}, [
"xxx",
"x x",
"x x"
], ['x', ItemID.dreadIron, 0]);
Recipes.addShaped({id: ItemID.DADBoot, count: 1, data: 0}, [
"x x",
"x x"
], ['x', ItemID.dreadIron, 0]);

//EFFECTS: Resistance III, Speed III

//tier:4
IDRegistry.genItemID("DADSHelm");
Item.createArmorItem("DADSHelm", "Dreadium Samurai helmet", {name: "ADSH"}, {type: "helmet", armor: 7, durability: 2320, texture: "armor/dreadiumS_1.png", isTech:false});

IDRegistry.genItemID("DADSCh");
Item.createArmorItem("DADSCh", "Dreadium Samurai chestplate", {name: "ADSC"}, {type: "chestplate", armor: 12, durability: 2545, texture: "armor/dreadiumS_1.png", isTech:false});

IDRegistry.genItemID("DADSLeg");
Item.createArmorItem("DADSLeg", "Dreadium Samurai leggins", {name: "ADSP"}, {type: "leggings", armor: 8, durability:2468, texture: "armor/dreadiumS_2.png", isTech:false});

IDRegistry.genItemID("DADSBoot");
Item.createArmorItem("DADSBoot", "Dreadium Samurai boots", {name: "ADSB"}, {type: "boots", armor: 5, durability: 2312, texture: "armor/dreadiumS_1.png", isTech:false});

Item.addRepairItemIds(ItemID.DADSHelm, [ItemID.DADSHelm]);
Item.addRepairItemIds(ItemID.DADSCh, [ItemID.DADSCh]);
Item.addRepairItemIds(ItemID.DADSLeg, [ItemID.DADSLeg]);
Item.addRepairItemIds(ItemID.DADSBoot, [ItemID.DADSBoot]);

Recipes.addShaped({id: ItemID.DADSHelm, count: 1, data: 0}, [
" b ",
"xax"
], ['x', ItemID.dreadChunck, 0, 'a', ItemID.DADHelm, 0, 'b', ItemID.dreadIron, 0]);
Recipes.addShaped({id: ItemID.DADSCh, count: 1, data: 0}, [
"xbx",
"xax",
"xxx"
], ['x', ItemID.dreadChunck, 0, 'a', ItemID.DADCh, 0, 'b', ItemID.dreadIron, 0]);
Recipes.addShaped({id: ItemID.DADSLeg, count: 1, data: 0}, [
"xax",
"bbb"
], ['x', ItemID.dreadChunck, 0, 'a', ItemID.DADLeg, 0, 'b', ItemID.dreadIron, 0]);
Callback.addCallback("PostLoaded", function(){
Recipes.addShaped({id: ItemID.DADSBoot, count: 1, data: 0}, [
"xax",
"bbb"
], ['x', ItemID.dreadChunck, 0, 'a', ItemID.DADBoot, 0, 'b', BlockID.dreadP, 0]);
});
//EFFECTS: Resistance 4, Speed III, Fire Resistance II, Strength II

//Ethaxium
IDRegistry.genItemID("AEHelm");
Item.createArmorItem("AEHelm", "Ethaxium helmet", {name: "AEH"}, {type: "helmet", armor: 9, durability: 2889, texture: "armor/ethaxium_1.png", isTech:false});

IDRegistry.genItemID("AECh");
Item.createArmorItem("AECh", "Ethaxium chestplate", {name: "AEC"}, {type: "chestplate", armor: 14, durability: 3090, texture: "armor/ethaxium_1.png", isTech:false});

IDRegistry.genItemID("AELeg");
Item.createArmorItem("AELeg", "Ethaxium leggins", {name: "AEP"}, {type: "leggings", armor: 10, durability:2516, texture: "armor/ethaxium_2.png", isTech:false});

IDRegistry.genItemID("AEBoot");
Item.createArmorItem("AEBoot", "Ethaxium boots", {name: "AEB"}, {type: "boots", armor: 7, durability: 2714, texture: "armor/ethaxium_1.png", isTech:false});

Item.addRepairItemIds(ItemID.AEHelm, [ItemID.AEHelm]);
Item.addRepairItemIds(ItemID.AECh, [ItemID.AECh]);
Item.addRepairItemIds(ItemID.AELeg, [ItemID.AELeg]);
Item.addRepairItemIds(ItemID.AEBoot, [ItemID.AEBoot]);

Recipes.addShaped({id: ItemID.AEHelm, count: 1, data: 0}, [
"xxx",
"x x"
], ['x', ItemID.ethIron, 0]);
Recipes.addShaped({id: ItemID.AECh, count: 1, data: 0}, [
"x x",
"xxx",
"xxx"
], ['x', ItemID.ethIron, 0]);
Recipes.addShaped({id: ItemID.AELeg, count: 1, data: 0}, [
"xxx",
"x x",
"x x"
], ['x', ItemID.ethIron, 0]);
Recipes.addShaped({id: ItemID.AEBoot, count: 1, data: 0}, [
"x x",
"x x"
], ['x', ItemID.ethIron, 0]);

//EFFECTS: Resistance 5, Speed III, Fire Resistance II, Strength II



// file: Aitems/necronomicons.js

var uses = 0;

//MATIREALS
IDRegistry.genItemID("trsGem");
Item.createItem("trsGem", "Transmutation Gem", {name: "TG"});
Item.setMaxDamage(ItemID.trsGem, 8); 

IDRegistry.genItemID("soulPe");
Item.createItem("soulPe", "Soul Gem Peace", {name: "SF"});

IDRegistry.genItemID("soulPa");
Item.createItem("soulPa", "Soul Gem Part", {name: "SS"});

Recipes.addShaped({id:ItemID.soulPa, count: 1, data: 0}, [
"xx",
"xx"
], ['x', ItemID.soulPe, 0]);

IDRegistry.genItemID("soulG");
Item.createItem("soulG", "Soul Gem", {name: "SG"});

Recipes.addShaped({id:ItemID.soulG, count: 1, data: 0}, [
"xx",
"xx"
], ['x', ItemID.soulPa, 0]);

IDRegistry.genItemID("shardObl");
Item.createItem("shardObl", "Oblivion Shard", {name: "OS"});

Recipes.addShaped({id:ItemID.shardObl, count: 1, data: 0}, [
"oao",
"axa",
"oao"
], ['s', ItemID.soulG, 0, 'x', ItemID.trsGem, 0], function(api, field, result){ 
    Player.setCarriedItem(ItemID.trsGem, 1, 0);
    Item.setMaxDamage(ItemID.trsGem, Item.getMaxDamage(ItemID.trsGem)-1); 
});

IDRegistry.genItemID("catalObl");
Item.createItem("catalObl", "Oblivion Catalyst", {name: "OC"});

Item.registerUseFunction("catalObl",function(coords, item, block){
Entity.addEffect(Player.get(), 1, 4, 6000, false, false); 
Entity.addEffect(Player.get(), 3, 4, 6000, false, false);   
Entity.addEffect(Player.get(), 5, 4, 6000, false, false);  
Entity.addEffect(Player.get(), 6, 4, 6000, false, false);
Entity.addEffect(Player.get(), 10, 4, 6000, false, false);
Entity.addEffect(Player.get(), 11, 4, 6000, false, false);
Entity.addEffect(Player.get(), 12, 4, 6000, false, false);
Entity.addEffect(Player.get(), 13, 4, 6000, false, false);
Entity.addEffect(Player.get(), 14, 4, 6000, false, false);
Entity.addEffect(Player.get(), 16, 4, 6000, false, false);
Entity.addEffect(Player.get(), 21, 4, 6000, false, false);
Entity.addEffect(Player.get(), 22, 4, 6000, false, false);
Entity.addEffect(Player.get(), 23, 4, 6000, false, false);
});

IDRegistry.genItemID("crystalLife");
Item.createItem("crystalLife", "Life Crystal", {name: "lifeCrystal"});
Item.registerUseFunction("crystalLife",function(coords, item, block){
if(uses <= 4){
Entity.setMaxHealth(Player.get(), Entity.getMaxHealth(Player.get())+4);
uses += 1;
   }
}); 
        
Necronomicons.setUpAsNecronomicon({
id:"normalNecronomicon",
name:"Necronomicon",
texture:"necronomicon",
maxPE:5000,
PEvalue:5000,
tier:1,
isChargable:true
});

Necronomicons.setUpAsNecronomicon({
id:"normalNecronomiconC",
name:"Corrupted Necronomicon",
texture:"necronomicon_cor",
maxPE:10000,
PEvalue:10000,
tier:2,
isChargable:true
});

Necronomicons.setUpAsNecronomicon({
id:"normalNecronomiconD",
name:"Dreaded Necronomicon",
texture:"necronomicon_dre",
maxPE:20000,
PEvalue:20000,
tier:3,
isChargable:true
});

Necronomicons.setUpAsNecronomicon({
id:"normalNecronomiconO",
name:"Omothol Necronomicon",
texture:"necronomicon_omt",
maxPE:40000,
PEvalue:40000,
tier:4,
isChargable:true
});

Necronomicons.setUpAsNecronomicon({
id:"abyssNecronomicon",
name:"Gateway Necronomicon",
texture:"abyssalnomicon",
maxPE:50000,
PEvalue:50000,
tier:5,
isChargable:true
});


Recipes.addShaped({id:ItemID.keyABW, count: 1, data: 0}, [
"oas",
"oxa",
"xoo"
], ['a', ItemID.catalObl, 0, 'x', 369, 0,'s', ItemID.coralPearl, 0]);

//CHARMS
IDRegistry.genItemID("charm"); 
Item.createItem("charm", "Charm", {name: "charm"});

IDRegistry.genItemID("charmAzathoth"); 
Item.createItem("charmAzathoth", "Azathoth Charm", {name: "charm_azathoth"});

IDRegistry.genItemID("charmCthulhu"); 
Item.createItem("charmCthulhu", "Cthulhu Charm", {name: "charm_cthulhu"});

IDRegistry.genItemID("charmHastur"); 
Item.createItem("charmHastur", "Hastur's Charm", {name: "charm_hastur"});

IDRegistry.genItemID("charmJzahar"); 
Item.createItem("charmJzahar", "Jzahar's Gatekeeper Charm", {name: "charm_jzahar"});

IDRegistry.genItemID("charmNyarlathotep"); 
Item.createItem("charmNyarlathotep", "Nyarlathotep's Charm", {name: "charm_nyarlathotep"});

IDRegistry.genItemID("charmShubniggurath"); 
Item.createItem("charmShubniggurath", "Shubniggurath's Charm", {name: "charm_shubniggurath"});

IDRegistry.genItemID("charmYogsothoth"); 
Item.createItem("charmYogsothoth", "Yogsothoth's Charm", {name: "charm_yogsothoth"});

//DRAINS

Necronomicons.setUpAsNecronomicon({
id:"drainS",
name:"Drain Staff",
texture:"drainstaff",
maxPE:125,
PEvalue:0,
tier:1,
isChargable:true
});

Necronomicons.setUpAsNecronomicon({
id:"drainSA",
name:"Drain Staff Abyssal",
texture:"drainstaff_abyssalwasteland",
maxPE:250,
PEvalue:0,
tier:2,
isChargable:true
});

Necronomicons.setUpAsNecronomicon({
id:"drainSD",
name:"Drain Staff Dread",
texture:"drainstaff_dreadlands",
maxPE:500,
PEvalue:0,
tier:3,
isChargable:true
});

Necronomicons.setUpAsNecronomicon({
id:"drainSO",
name:"Drain Staff Omothol",
texture:"drainstaff_omothol",
maxPE:1000,
PEvalue:0,
tier:4,
isChargable:true
});

const drains = [ItemID.drainS, ItemID.drainSA, ItemID.drainSD, ItemID.drainSO];

Callback.addCallback("EntityDeath",function (entity, attacker){
for(var i in drains){
if(Player.getCarriedItem().id == drains[i] && attacker == Player.get())
Necronomicons.encreasePEFromItem(drains[i], 25);
} 
});

//POST
IDRegistry.genBlockID("stoneMonolith");
Block.createBlock("stoneMonolith", [
{name: "Stone Monolith", texture: [["monolithStone", 0]], inCreative: true}], "opaque");
ToolAPI.registerBlockMaterial(BlockID.stoneMonolith, "stone", 2, true);

IDRegistry.genBlockID("stoneShoggot");
Block.createBlock("stoneShoggot", [
{name: "Shoggoth Ooze", texture: [["shoggothOoze", 0]], inCreative: true}]);

IDRegistry.genBlockID("stoneShoggotB");
Block.createBlock("stoneShoggotB", [
{name: "Shoggoth Biomass", texture: [["shoggothBiomass", 0]], inCreative: true}]);


Callback.addCallback("PostLoaded", function(){
Recipes.addShaped({id:BlockID.Pedestal, count: 1, data: 0}, [
"asa",
"axa",
"aaa"
], ['a', BlockID.stoneMonolith, 0, 'x', ItemID.soulPa, 0,'s', ItemID.coralPearl, 0]);

//Item.setCategory(id, category);
Item.addCreativeGroup("Necronomicons", "Necronomicons", [ItemID.normalNecronomicon, ItemID.normalNecronomiconC, ItemID.normalNecronomiconD, ItemID.normalNecronomiconO, ItemID.abyssNecronomicon]);
Item.addCreativeGroup("Charms", "Charms", [ItemID.charm, ItemID.charmAzathoth, ItemID.charmCthulhu, ItemID.charmHastur, ItemID.charmJzahar, ItemID.charmNyarlathotep, ItemID.charmShubniggurath, ItemID.charmYogsothoth]);
Item.addCreativeGroup("Drain Staffs", "Drain Staffs", [ItemID.drainS, ItemID.drainSA, ItemID.drainSD, ItemID.drainSO]);
AbyssTable.addCraft([[371, 0], [371, 0], [371, 0], [371, 0], [371, 0], [371, 0], [371, 0], [371, 0]], [ItemID.coralPearl, 0], [ItemID.trsGem, 0], [0,-1,7,-1,2,-1,4,-1,1,-1,6,-1,3,-1,5,-1], 2000);
Item.setGlint(ItemID.trsGem, true);
AbyssTable.addCraft([[331, 0], [331, 0], [331, 0], [331, 0], [ItemID.shardObl, 0], [ItemID.shardObl, 0], [ItemID.shardObl, 0], [ItemID.shardObl, 0]], [381, 0], [ItemID.catalObl, 0], [0,-1,7,-1,2,-1,4,-1,1,-1,6,-1,3,-1,5,-1], 5000);
Item.setGlint(ItemID.catalObl, true);
AbyssTable.addCraft([[ItemID.essenceABW, 0], [ItemID.essenceABW, 0], [ItemID.essenceABW, 0], [ItemID.essenceABW, 0], [ItemID.coralGem, 0], [ItemID.coralGem, 0], [ItemID.coralGem, 0], [ItemID.coralGem, 0]], [ItemID.coralPearl, 0], [ItemID.essenceOrbABW, 0], [0,-1,7,-1,2,-1,4,-1,1,-1,6,-1,3,-1,5,-1], 3500);
AbyssTable.addCraft([[ItemID.coralIron, 0], [ItemID.coralIron, 0], [ItemID.coralIron, 0], [ItemID.coralIron, 0], [ItemID.coralGem, 0], [ItemID.coralGem, 0], [ItemID.coralGem, 0], [ItemID.coralGem, 0]], [ItemID.coralPearl, 0], [ItemID.coralPlate, 0], [0,-1,7,-1,2,-1,4,-1,1,-1,6,-1,3,-1,5,-1], 1500);
Item.setGlint(ItemID.essenceOrbABW, true);

Recipes.addShaped({id:ItemID.normalNecronomicon, count: 1, data: 0}, [
"aas",
"axa",
"aas"
], ['a', 367, 0, 'x', 340, 0,'s', 265, 0]);
});

AbyssTable.addCraft([[ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0]], [ItemID.ABHelm, 0], [ItemID.DABHelm, 0], [0,-1,7,-1,2,-1,4,-1,1,-1,6,-1,3,-1,5,-1], 1500);
AbyssTable.addCraft([[ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0]], [ItemID.ABCh, 0], [ItemID.DABCh, 0], [0,-1,7,-1,2,-1,4,-1,1,-1,6,-1,3,-1,5,-1], 1500);
AbyssTable.addCraft([[ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0]], [ItemID.ABLeg, 0], [ItemID.DABLeg, 0], [0,-1,7,-1,2,-1,4,-1,1,-1,6,-1,3,-1,5,-1], 1500);
AbyssTable.addCraft([[ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0]], [ItemID.ABBoot, 0], [ItemID.DABBoot, 0], [0,-1,7,-1,2,-1,4,-1,1,-1,6,-1,3,-1,5,-1], 1500);

AbyssTable.addCraft([[ItemID.trsGem, 0], [0, 0], [111, 0], [ItemID.coralGem, 0], [ItemID.coralGem, 0], [325, 8], [ItemID.Bo, 0], [106, 0]], [ItemID.RCHelm, 0], [ItemID.DPHelm, 0], [0,-1,7,-1,2,-1,4,-1,1,-1,6,-1,3,-1,5,-1], 1500);
AbyssTable.addCraft([[ItemID.trsGem, 0], [0, 0], [111, 0], [ItemID.coralGem, 0], [ItemID.coralGem, 0], [325, 8], [ItemID.Bo, 0], [106, 0]], [ItemID.RCCh, 0], [ItemID.DPCh, 0], [0,-1,7,-1,2,-1,4,-1,1,-1,6,-1,3,-1,5,-1], 1500);
AbyssTable.addCraft([[ItemID.trsGem, 0], [0, 0], [111, 0], [ItemID.coralGem, 0], [ItemID.coralGem, 0], [325, 8], [ItemID.Bo, 0], [106, 0]], [ItemID.RCLeg, 0], [ItemID.DPLeg, 0], [0,-1,7,-1,2,-1,4,-1,1,-1,6,-1,3,-1,5,-1], 1500);
AbyssTable.addCraft([[ItemID.trsGem, 0], [0, 0], [111, 0], [ItemID.coralGem, 0], [ItemID.coralGem, 0], [325, 8], [ItemID.Bo, 0], [106, 0]], [ItemID.RCBoot, 0], [ItemID.DPBoot, 0], [0,-1,7,-1,2,-1,4,-1,1,-1,6,-1,3,-1,5,-1], 1500);




// file: Adimensions/Nabyss.js

var Abyss = new Dimensions.CustomDimension("Abyss", 1974); 
Abyss.setSkyColor(0, 2.86, 2.89); 
Abyss.setFogColor(0, 2.86, 2.89); 
Abyss.setCloudColor(0, 2.86, 2.89); 
 
Abyss.setGenerator(Dimensions.newGenerator({ 
 layers: [ 
 { 
minY: 0, maxY: 256, 
yConversion: [[1.5, -0.8], [.6, -.4], [0, .85], [.5, -.5], [1.5, -1]], 
material: {base: BlockID.stoneAbyss, surface: {id:BlockID.sandAbyss, data: 0, width:4}, cover: BlockID.grassAbyss}, 
noise: {octaves: {count: 3, scale: 126}}
  }, 
 {
minY: 0, maxY: 1,
yConversion: [[.0,.0]],
material: {base: 7},
  },
 {
minY: 42, maxY: 64,
yConversion: [[.0,.0]],
material: {base: 8},
  }  
 ] 
}
)); 
 
PortalUtils.newPortalBlock("abyssWastes", ["AG", 0], {type: "v-plane", frameId: BlockID.stoneAbyss}, false);

var shape = new PortalShape();
shape.setPortalId(BlockID.abyssWastes);
shape.setFrameIds(BlockID.stoneAbyss);
shape.setMinSize(2, 3);
 
Callback.addCallback("ItemUse", function(coords, item, block){ 
if(Player.getCarriedItem().id == ItemID.keyABW) 
var rect = shape.findPortal(coords.relative.x, coords.relative.y, coords.relative.z);
  if (rect) {
            shape.buildPortal(rect, false);
   }
}); 
    
Callback.addCallback("DestroyBlock", function(pos, block){
    if (block.id == BlockID.stoneAbyss || block.id == BlockID.abyssWastes) {
        DimensionHelper.eliminateIncorrectPlacedPortals(pos, BlockID.abyssWastes, [BlockID.stoneAbyss]);
    }
}); 


Callback.addCallback("tick", function() {
let crdsP = Player.getPosition();
if(World.getBlockID(crdsP.x, crdsP.y, crdsP.z) == BlockID.abyssWastes && Player.getDimension() != Abyss.id) {  
    Dimensions.transfer(Player.get(), Abyss.id);  
    } else if(World.getBlockID(crdsP.x, crdsP.y, crdsP.z) == BlockID.abyssWastes && Player.getDimension() == Abyss.id) {
    Dimensions.transfer(Player.get(), 1); 
    }
});

var teleports = 0;
Callback.addCallback('DimensionLoaded', function (dimension) {
if (dimension != Abyss.id) return;
 if (teleports < 1) {
 var CP = Player.getPosition();
  var crD = GenerationUtils.findSurface(CP.x, CP.z, 48, 72); 
   shape.buildPortal(crD, true);
   teleports += 1;
}
});




// file: RecipeViewer.js

const RVSettings = {
    size: 82,
    centre: {
        x: 500,
        y: 275
    },
    Rmul: 2.8,
    AngleMul: 0.8,
    Divider: 2.5
}

ModAPI.addAPICallback('RecipeViewer', function(RV) {
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
        getList: function(id, data, isUsage) {   
            var list = [];
            var crafts;
            if (isUsage) {
                crafts = [];
                Crafts.find(function(element, index, array) {
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
                })
            } else {
                crafts = AbyssTable.getCrafts([id, data]);
            }   
            for (var i in crafts) {
                var input = []
                if (crafts[i].rv) {
                    for (var k in crafts[i].rv) {
                        if (crafts[i].rv[k] == -1) {
                            input.push({
                                id: 0,
                                count: 0,
                                data: 0
                            });
                        } else {
                            input.push({
                                id: Number(crafts[i].items[crafts[i].rv[k]][0]),
                                count: 1,
                                data: Number(crafts[i].items[crafts[i].rv[k]][1])
                            });
                        }
                    }
                } else {
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



// file: Translation.js

//Blocks
Translation.addTranslation("Dark Lands Grass", {ru: "Дерн Тёмных Земель"});
Translation.addTranslation("Dark Stone", {ru: "Камень Тёмных Земенль"});
Translation.addTranslation("Abyssal Wastlands Grass", {ru: "Дёрн Бездны"});
Translation.addTranslation("Abyssal Wastlands Sand", {ru: "Песок Бездны"});
Translation.addTranslation("Abyssal Waste Glass", {ru: "Стекло Бездны"});
Translation.addTranslation("Abyssal Waste Stone", {ru: "Камень Бездны"});
Translation.addTranslation("Abyssal Waste Bricks", {ru: "Кладка Бездны"});
Translation.addTranslation("Dreaded Wastlands Grass", {ru: "Дерн Ужасных Земель"});
Translation.addTranslation("Dread Lands Stone", {ru: "Камень Ужасных Земенль"});
Translation.addTranslation("Dread Lands Bricks", {ru: "Кладка Ужасных Земель"});
Translation.addTranslation("Abyssal Waste Bricks", {ru: "Кладка Бездны"});
Translation.addTranslation("Dark Bricks", {ru: "Кладка Тёмных Земель"});
Translation.addTranslation("Dark Stone Beacon", {ru: "Маяк Тёмных Земель"});
Translation.addTranslation("Block of Abyssalinite", {ru: "Блок Абиссалинита"});
Translation.addTranslation("Block of Coralium", {ru: "Блок Кораллиума"});
Translation.addTranslation("Block of Dreadalinite", {ru: "Блок Дредалинита"});
Translation.addTranslation("Block of Ethaxium", {ru: "Блок Этаксиума"});
Translation.addTranslation("Etaxium", {ru: "Этаксиум"});
Translation.addTranslation("Ethaxium Bricks", {ru: "Кладка Этаксиума"});
Translation.addTranslation("Ethaxium Pillar", {ru: "Колонна Этаксиума"});
 
Translation.addTranslation("Abyssalinite Ore", {ru: "Абиссалинитовая Руда"});
Translation.addTranslation("Coralium Ore", {ru: "Кораллиумовая Руда"});
Translation.addTranslation("Coralium Infused Ore", {ru: "Кораллиумовая Руда с Жемчугом"});
Translation.addTranslation("Nitre Ore", {ru: "Селитросодержащая Руда"});

Translation.addTranslation("Abyssal Iron Ore", {ru: "Железная Руда Бездны"});
Translation.addTranslation("Abyssal Gold Ore", {ru: "Золотая Руда Бездны"});
Translation.addTranslation("Abyssal Diamond Ore", {ru: "Алмазная Руда Бездны"});
Translation.addTranslation("Abyssal Nitre Ore", {ru: "Селитросодержащая Руда Бездны"});
Translation.addTranslation("Pearlescent Coralium Ore", {ru: "Жемчужная Руда Бездны"});
Translation.addTranslation("Dreaded Abyssalinite Ore", {ru: "Абиссалинит Руда Ужасных Земель"});

Translation.addTranslation("Dark Log", {ru: "Тёмный Дуб"});
Translation.addTranslation("Dark Log Sided", {ru: "Тёмная Кора"});
Translation.addTranslation("Dark Planks", {ru: "Тёмные Доски"});
Translation.addTranslation("Dark Leaves", {ru: "Тёмная Листва"});
Translation.addTranslation("Dark Tree Sapling", {ru: "Тёмный Саженец"});

Translation.addTranslation("Dread Log", {ru: "Ужасный Дуб"});
Translation.addTranslation("Dread Log Sided", {ru: "Ужасная Кора"});
Translation.addTranslation("Dread Planks", {ru: "Ужасные Доски"});
Translation.addTranslation("Dread Leaves", {ru: "Ужасная Листва"});
Translation.addTranslation("Dread Tree Sapling", {ru: "Ужасный Саженец"});

Translation.addTranslation("Wastalands Horn", {ru: "Пустырный Рог"});
Translation.addTranslation("Wastalands Lumin", {ru: "Пустырный Светоцвет"});
Translation.addTranslation("Dreaded Wastalands Hilt", {ru: "Пустырный Шипик"});

Translation.addTranslation("Stone Monolith", {ru: "Монолитный Камень"});
Translation.addTranslation("Shoggoth Ooze", {ru: "Слизь Шогготов"});
Translation.addTranslation("Shoggoth Biomass", {ru: "Биомасса Шогготов"});

Translation.addTranslation("Abyssal Altar", {ru: "Алтарь"});
Translation.addTranslation("Abyssal Pillar", {ru: "Постамент"});
Translation.addTranslation("Energy Pedestal", {ru: "Энергетический Пъедестал"});
Translation.addTranslation("Energy Pedestal Overworld", {ru: "Энергетический Пъедестал Надземного Мира"});
//Items
Translation.addTranslation("Abyssalnite Chunck", {ru: "Абиссалинитовый Кусок"});
Translation.addTranslation("Abyssalnite Ingot", {ru: "Абиссалинитовый Слиток"});
Translation.addTranslation("Coralium Chunck", {ru: "Коралумовый Кусок"});
Translation.addTranslation("Reinforced Coralium Ingot", {ru: "Коралумовый Слиток"});
Translation.addTranslation("Dreadalnite Peace", {ru: "Ужаснолинитовый Кусочек"});
Translation.addTranslation("Dreadalnite Chunck", {ru: "Ужаснолинитовый Кусок"});
Translation.addTranslation("Dreadalnite Ingot", {ru: "Ужаснолинитовый Слиток"});
Translation.addTranslation("Nitre", {ru: "Селитра"});
Translation.addTranslation("Sulfur", {ru: "Сера"});
Translation.addTranslation("Ethaxium Brick", {ru: "Этаксиумовый Кирпич"});
Translation.addTranslation("Ethaxium Ingot", {ru: "Этаксиумовый Слиток"});

Translation.addTranslation("Abyssalnite Nugget", {ru: "Абиссалинитовый Самородок"});
Translation.addTranslation("Dreadanlnite Nugget", {ru: "Ужаснолинитовый Самородок"});
Translation.addTranslation("Reinforced Coralium Nugget", {ru: "Кораллиумовый Самородок"});
Translation.addTranslation("Ethaxium Nugget", {ru: "Этаксиумовый Самородок"});

Translation.addTranslation("Coralium Gem", {ru: "Кораллиумовый Самоцвет"});
Translation.addTranslation("Coralium Pearl", {ru: "Кораллиумовая Жемчужина"});
Translation.addTranslation("Reinforced Coralium Plate", {ru: "Кораллиумовая Пластина"});

Translation.addTranslation("Cobblestone Upgrade", {ru: "Каменное Улучшение"});
Translation.addTranslation("Iron Upgrade", {ru: "Железное Улучшение"});
Translation.addTranslation("Gold Upgrade", {ru: "Золотое Улучшение"});
Translation.addTranslation("Diamond Upgrade", {ru: "Алмазное Улучшение"});
Translation.addTranslation("Abyssalinite Upgrade", {ru: "Абиссалинитовое Улучшение"});
Translation.addTranslation("Coralium Upgrade", {ru: "Коралиумовое Улучшение"});
Translation.addTranslation("Dreadalinite Upgrade", {ru: "Ужаснолинитовое Улучшение"});
Translation.addTranslation("Ethaxium Upgrade", {ru: "Этаксиумовое Улучшение"});

Translation.addTranslation("Geateway Key Tier 1", {ru: "Ключ от Врат 1 тира"});
Translation.addTranslation("Geateway Key Tier 2", {ru: "Ключ от Врат 2 тира"});

Translation.addTranslation("Depths Monster Skin", {ru: "Кожа Глубинного Монстра"});
Translation.addTranslation("Dreaded Monster Skin", {ru: "Кожа Ужасного Монстра"});
Translation.addTranslation("Omothol Monster Skin", {ru: "Кожа Тёмного Монстра"});

Translation.addTranslation("Transmutation Gem", {ru: "Самоцвт Трансмутации"});
Translation.addTranslation("Soul Gem Peace", {ru: "Кусочек Самоцвета Души"});
Translation.addTranslation("Soul Gem Part", {ru: "Кусок Самоцвета Души"});
Translation.addTranslation("Soul Gem", {ru: "Самоцвет Души"});
Translation.addTranslation("Oblivion Shard", {ru: "Кусок Забытого Катализатора"});
Translation.addTranslation("Oblivion Catalyst", {ru: "Забытый Катализатор"});
Translation.addTranslation("Life Crystal", {ru: "Кристалл Жизни"});

Translation.addTranslation("Drain Staff", {ru: "Разрушитель"});
Translation.addTranslation("Drain Staff Abyssal", {ru: "Разрушитель Бездны"});
Translation.addTranslation("Drain Staff Dread", {ru: "Разрушитель Ужасноземелья"});
Translation.addTranslation("Drain Staff Omothol", {ru: "Разрушитель Тёмноземелья"});

Translation.addTranslation("Necronomicon", {ru: "Некрономикон"});
Translation.addTranslation("Corrupted Necronomicon", {ru: "Искаженный Некрономикон"});
Translation.addTranslation("Dreaded Necronomicon", {ru: "Ужасный некрономикон"});
Translation.addTranslation("Omothol Necronomicon", {ru: "Тёмный некрономикон"});
Translation.addTranslation("Gateway Necronomicon", {ru: "Некрономикон Хранителя Врат Бездны Дж'захара"});

Translation.addTranslation("Charm", {ru: "Оберег"});
Translation.addTranslation("Azathoth Charm", {ru: "Оберег Азатота"});
Translation.addTranslation("Cthulhu Charm", {ru: "Оберег Ктулху"});
Translation.addTranslation("Hastur's Charm", {ru: "Оберег Хастура"});
Translation.addTranslation("Jzahar's Charm", {ru: "Оберег Дж'захара"});
Translation.addTranslation("Nyarlathotep's Charm", {ru: "Оберег Ньярлототепа"});
Translation.addTranslation("Shubniggurath's Charm", {ru: "Оберег Шуббнигурата"});
Translation.addTranslation("Yogsothoth's Charm", {ru: "Оберег Йогсокота"});

Translation.addTranslation("Abyss Essence", {ru: "Эссенция Бездны"});
Translation.addTranslation("Abyss Essence Pearl", {ru: "Жемчуг Бездны Наполненный Силой"});
Translation.addTranslation("Dreaded Essence", {ru: "Эссенция Ужаса"});

//Tools
Translation.addTranslation("Dark Stone Sword", {ru: "Меч из Камня Темных Земель"});
Translation.addTranslation("Dark Stone Shovel", {ru: "Лопата из Камня Темных Земель"});
Translation.addTranslation("Dark Stone Pickaxe", {ru: "Кирка из Камня Темных Земель"});
Translation.addTranslation("Dark Stone Axe", {ru: "Топор из Камня Темных Земель"});
Translation.addTranslation("Dark Stone Hoe", {ru: "Мотыга из Камня Темных Земель"});

Translation.addTranslation("Abyssalnite Sword", {ru: "Меч из Абиссалинита"});
Translation.addTranslation("Abyssalnite Shovel", {ru: "Лопата из Абиссалинита"});
Translation.addTranslation("Abyssalnite Pickaxe", {ru: "Кирка из Абиссалинита"});
Translation.addTranslation("Abyssalnite Axe", {ru: "Топор из Абиссалинита"});
Translation.addTranslation("Abyssalnite Hoe", {ru: "Мотыга из Абиссалинита"});

Translation.addTranslation("Reinforced Coralium Sword", {ru: "Меч из Кораллиума"});
Translation.addTranslation("Reinforced Coralium Shovel", {ru: "Лопата из Кораллиума"});
Translation.addTranslation("Reinforced Coralium Pickaxe", {ru: "Кирка из Кораллиума"});
Translation.addTranslation("Reinforced Coralium Axe", {ru: "Топор из Кораллиума"});
Translation.addTranslation("Reinforced Coralium Hoe", {ru: "Мотыга из Кораллиума"});

Translation.addTranslation("Dredalinite Sword", {ru: "Меч из Ужастнолинита"});
Translation.addTranslation("Dredalinite Shovel", {ru: "Лопата из Ужастнолинита"});
Translation.addTranslation("Dredalinite Pickaxe", {ru: "Кирка из Ужастнолинита"});
Translation.addTranslation("Dredalinite Axe", {ru: "Топор из Ужастнолинита"});
Translation.addTranslation("Dredalinite Hoe", {ru: "Мотыга из Ужастнолинита"});

Translation.addTranslation("Ethaxium Sword", {ru: "Меч из Этаксиума"});
Translation.addTranslation("Ethaxium Shovel", {ru: "Лопата из Этаксиума"});
Translation.addTranslation("Ethaxium Pickaxe", {ru: "Кирка из Этаксиума"});
Translation.addTranslation("Ethaxium Axe", {ru: "Топор из Этаксиума"});
Translation.addTranslation("Ethaxium Hoe", {ru: "Мотыга из Этаксиума"});

Translation.addTranslation("Soul Reaper", {ru: "Жнец Душ"});
Translation.addTranslation("Jzahar's Cane", {ru: "Посох Дж'захара"});

Translation.addTranslation("Abyssalnite helmet", {ru: "Шлем из Абиссалинита"});
Translation.addTranslation("Abyssalnite chestplate", {ru: "Кирасса из Абиссалинита"});
Translation.addTranslation("Abyssalnite leggins", {ru: "Поножи из Абиссалинита"});
Translation.addTranslation("Abyssalnite boots", {ru: "Ботинки из Абиссалинита"});

Translation.addTranslation("Dreaded Abyssalnite helmet", {ru: "Шлем из Ужаснолинита"});
Translation.addTranslation("Dreaded Abyssalnite chestplate", {ru: "Кирасса из Ужаснолинита"});
Translation.addTranslation("Dreaded Abyssalnite leggins", {ru: "Поножи из Ужаснолинита"});
Translation.addTranslation("Dreaded Abyssalnite boots", {ru: "Ботинки из Ужаснолинита"});

Translation.addTranslation("Refined Coralium helmet", {ru: "Шлем из Цельного Кораллиума"});
Translation.addTranslation("Refined Coralium chestplate", {ru: "Кирасса из Цельного Кораллиума"});
Translation.addTranslation("Refined Coralium leggins", {ru: "Поножи из Цельного Кораллиума"});
Translation.addTranslation("Refined Coralium boots", {ru: "Ботинки из Цельного Кораллиума"});

Translation.addTranslation("Plated Coralium helmet", {ru: "Шлем из Пластинчатого Кораллиума"});
Translation.addTranslation("Plated Coralium chestplate", {ru: "Кирасса из Пластинчатого Кораллиума"});
Translation.addTranslation("Plated Coralium leggins", {ru: "Поножи из Пластинчатого Кораллиума"});
Translation.addTranslation("Plated Coralium boots", {ru: "Ботинки из Пластинчатого Кораллиума"});

Translation.addTranslation("Depths helmet helmet", {ru: "Шлем Глубин"});
Translation.addTranslation("Depths helmet chestplate", {ru: "Кирасса Глубин"});
Translation.addTranslation("Depths helmet leggins", {ru: "Поножи Глубин"});
Translation.addTranslation("Depths helmet boots", {ru: "Ботинки Глубин"});

Translation.addTranslation("Dredalinite helmet", {ru: "Шлем из Ужаснолинита"});
Translation.addTranslation("Dredalinite chestplate", {ru: "Кирасса из Ужаснолинита"});
Translation.addTranslation("Dredalinite leggins", {ru: "Поножи из Ужаснолинита"});
Translation.addTranslation("Dredalinite boots", {ru: "Ботинки из Ужаснолинита"});

Translation.addTranslation("Dreadium Samurai helmet", {ru: "Шлем Ужасно-Самурайский"});
Translation.addTranslation("Dreadium Samurai chestplate", {ru: "Кирасса Ужасно-Самурайская"});
Translation.addTranslation("Dreadium Samurai leggins", {ru: "Поножи из Ужасно-Самурайские"});
Translation.addTranslation("Dreadium Samurai boots", {ru: "Ботинки из Ужасно-Самурайские"});

Translation.addTranslation("Ethaxium helmet", {ru: "Шлем из Этаксиума"});
Translation.addTranslation("Ethaxium chestplate", {ru: "Кирасса из Этаксиума"});
Translation.addTranslation("Ethaxium leggins", {ru: "Поножи из Этаксиума"});
Translation.addTranslation("Ethaxium boots", {ru: "Ботинки из Этаксиума"});

Translation.addTranslation("Food Plate", {ru: "Тарелка"});
Translation.addTranslation("Dirty Food Plate", {ru: "Грязная Тарелка"});
Translation.addTranslation("Chicken on a Plate", {ru: "Курица на Тарелке"});
Translation.addTranslation("Porkchop on a Plate", {ru: "Отбивная на Тарелке"});
Translation.addTranslation("Beef on a Plate", {ru: "Говядина на Тарелке"});
Translation.addTranslation("Fish on a Plate", {ru: "Рыба на Тарелке"});
Translation.addTranslation("Fried Egg", {ru: "Яичница"});
Translation.addTranslation("Fried Egg on a Plate", {ru: "Яичница на Тарелке"});
Translation.addTranslation("MRE", {ru: "МРЕ"});
Translation.addTranslation("Boned Flesh Abyss", {ru: "Мясо на Кости"});
Translation.addTranslation("Flesh Abyss", {ru: "Мясо Бездны"});
Translation.addTranslation("Anti Bone", {ru: "Анти Кость"});
Translation.addTranslation("Anti Flesh", {ru: "Анти плоть"});
Translation.addTranslation("Anti Boned Flesh", {ru: "Анти Мясо на Кости"});
Translation.addTranslation("Anti Dreadling Flesh", {ru: "Анти Мясо"});
Translation.addTranslation("Anti Spider Eye", {ru: "Анти Глаз Паука"});
Translation.addTranslation("Anti Chicken", {ru: "Анти Курятина"});
Translation.addTranslation("Anti Beef", {ru: "Анти Говядина"});
Translation.addTranslation("Anti Milk", {ru: "Анти Молоко"});
Translation.addTranslation("Anti Pork", {ru: "Анти Свинина"});
Translation.addTranslation("Dreaded Katana", {ru: "Катана Ужаса"});
Translation.addTranslation("Shoggoth Skin", {ru: "Кожа Шоггота"});

//GUI
Translation.addTranslation("Altar", {ru: "Алтарь"});
Translation.addTranslation("Necronomicons", {ru: "Некрономиконы"});
Translation.addTranslation("Charms", {ru: "Обереги"});
Translation.addTranslation("Drain Staffs", {ru: "Разрушители"});
Translation.addTranslation("Altars & Sacrafices", {ru: "Алтари и Жертвоприношения"});
Translation.addTranslation("Pillars & Energy", {ru: "Постаменты и Энергия"});