var BLOCK_TYPE_LEAVES = Block.createSpecialType({
    base: 18,
    destroytime: 0.2,
    explosionres: 1,
    renderallfaces: true,
    renderlayer: 1,
    lightopacity: 1,
    translucency: 0.5
});

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
], BLOCK_TYPE_LEAVES);
ToolAPI.registerBlockMaterial(BlockID.darkLeaves, "plant");

Block.registerDropFunction("darkLeaves", function(){
    if(Math.random() < .085){
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

/*Block.setRandomTickCallback(BlockID.darkSapling, function(x, y, z, id, data){       
var coords = coords.relative;
if(World.getBlockID(coords.x, coords.y - 1, coords.z)==BlockID.grassDark){
World.destroyBlock(coords.x,coords.y,coords.z,false);                      
Str.generateTrees(crd.x, crd.z, Treesd, {min_y:crd.y,max_y:crd.y, check: BlockID.grassDark});
     }
});*/         


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
], BLOCK_TYPE_LEAVES);
ToolAPI.registerBlockMaterial(BlockID.dreadLeaves, "plant");

Block.registerDropFunction("dreadLeaves", function(){
    if(Math.random() < .085){
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

/*Block.setRandomTickCallback(BlockID.dreadSapling, function(x, y, z, id, data){
var coords = coords.relative;       
if(World.getBlockID(coords.x, coords.y - 1, coords.z)==BlockID.grassDread){
World.destroyBlock(coords.x,coords.y,coords.z,false);                      
Str.generateTrees(crd.x, crd.z, Treesdr, {min_y:crd.y,max_y:crd.y, check: BlockID.grassDread});
     }
});*/

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

Callback.addCallback("GenerateCustomDimensionChunk", function(chunkX, chunkZ, random, dimensionId){       
  for(var i = 0; i < randomInt(2, 5); i++){ 
    var coords = GenerationUtils.findHighSurface(chunkX, chunkZ, 49, 75);
         if(Math.random() < .65){
       World.setBlock(coords.x, coords.y + 1, coords.z, BlockID.plantWaste, 0);                       
         }  
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

Callback.addCallback("GenerateCustomDimensionChunk", function(chunkX, chunkZ, random, dimensionId){       
  for(var i = 0; i < randomInt(1, 4); i++){ 
    var coords = GenerationUtils.findHighSurface(chunkX, chunkZ, 49, 75);
         if(Math.random() < .65){
       World.setBlock(coords.x, coords.y + 1, coords.z, BlockID.plantWasteL, 0);                       
         }  
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