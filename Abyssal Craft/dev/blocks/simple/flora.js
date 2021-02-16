// var darkN = new Structure("DarkT1");
// var darkC = new Structure("DarkT2");

//=======================
// Trees rework by vsdum
//=======================

//LOGS

(function(){
    let constructVariationsSet = function(name, top, side){
        return [
            {name: name, texture: [[top, 0], [top, 0], [side, 0]], inCreative: true},
            {name: name, texture: [[side, 0], [side, 0], [top, 0], [top, 0], [side, 1]], inCreative: false},
            {name: name, texture: [[side, 1], [side, 1], [side, 1], [side, 1], [top, 0]], inCreative: false}
        ]
    }
    let makeDropFunction = function(id){
        Block.registerDropFunction(id, function(coords, blockID, blockData, level, enchant, item, region){
            return [[blockID, 1, 0]];
        });
    }
    let makePlaceFunction = function(id){
        Block.registerPlaceFunction(id, function(coords, item, block, player, region){
            let r = coords.relative;
            switch(coords.side){
                case 0: case 1:
                    region.setBlock(r.x, r.y, r.z, id, 0); break;
                case 2: case 3:
                    region.setBlock(r.x, r.y, r.z, id, 1); break;
                case 4: case 5:
                    region.setBlock(r.x, r.y, r.z, id, 2); break;
            }
        });
    };
    (function(ids){
        for(let i in ids){
            let block = ids[i];
            let bid = block[0], 
                name = block[1], 
                topt = block[2], 
                sidet = block[3];
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
    {name: "Darklands Oak Wood Planks", texture: [["darklands_oak_wood_planks", 0]], inCreative: true}
], BLOCK_TYPE_WOOD);
Block.createBlock("dreadlandsWoodPlanks", [
    {name: "Dreadlands Wood Planks", texture: [["dreadlands_wood_planks", 0]], inCreative: true}
], BLOCK_TYPE_WOOD);

ToolAPI.registerBlockMaterial(BlockID.darklandsOakWoodPlanks, "wood", 0, false);
ToolAPI.registerBlockMaterial(BlockID.dreadlandsWoodPlanks, "wood", 0, false);

//SLABS

IDRegistry.genBlockID("darklandsOakWoodSlabDouble");
IDRegistry.genBlockID("darklandsOakWoodSlab");

BaseBlocks.createSlab("darklandsOakWoodSlab", [
    {name: "Darklands Oak Wood Slab", texture: [["darklands_oak_wood_planks", 0]], inCreative: true}
], BlockID.darklandsOakWoodSlabDouble);
BaseBlocks.createDoubleSlab("darklandsOakWoodSlabDouble", [
    {name: "Darklands Oak Wood Slab", texture: [["darklands_oak_wood_planks", 0]], inCreative: false}
], BLOCK_TYPE_WOOD, BlockID.darklandsOakWoodSlab);

ToolAPI.registerBlockMaterial(BlockID.darklandsOakWoodSlab, "wood", 0, false);
ToolAPI.registerBlockMaterial(BlockID.darklandsOakWoodSlabDouble, "wood", 0, false);

//FENCES

IDRegistry.genBlockID("darklandsOakWoodFence");
IDRegistry.genBlockID("dreadlandsWoodFence");

Block.createBlock("darklandsOakWoodFence", [
    {name: "Darklands Oak Wood Fence", texture: [["darklands_oak_wood_planks", 0]], inCreative: true}
], BLOCK_TYPE_FENCE_WOOD);
Block.createBlock("dreadlandsWoodFence", [
    {name: "Dreadlands Wood Fence", texture: [["dreadlands_wood_fence", 0]], inCreative: true}
], BLOCK_TYPE_FENCE_WOOD);

ToolAPI.registerBlockMaterial(BlockID.darklandsOakWoodFence, "wood", 0, false);
ToolAPI.registerBlockMaterial(BlockID.dreadlandsWoodFence, "wood", 0, false);

//LEAVES

IDRegistry.genBlockID("darklandsOakLeaves");
IDRegistry.genBlockID("dreadlandsWoodLeaves");

Block.createBlock("darklandsOakLeaves", [
    {name: "Darklands Oak Leaves", texture: [["darklands_oak_leaves", 0]], inCreative: true}
], BLOCK_TYPE_LEAVES);
Block.createBlock("dreadlandsWoodLeaves", [
    {name: "Dreadlands Wood Leaves", texture: [["dreadlands_wood_leaves", 0]], inCreative: true}
], BLOCK_TYPE_LEAVES);

ToolAPI.registerBlockMaterial(BlockID.darklandsOakLeaves, "plant", 0, false);
ToolAPI.registerBlockMaterial(BlockID.dreadlandsWoodLeaves, "plant", 0, false);

ModAPI.addAPICallback("BetterFoliageLeaves", function(BetterFoliage) {
    BetterFoliage.setupLeavesModel(BlockID.darklandsOakLeaves, -1, ["darklands_oak_leaves", 0]);
    BetterFoliage.setupLeavesModel(BlockID.dreadlandsWoodLeaves, -1, ["dreadlands_wood_leaves", 0]);
});

Block.registerDropFunction(BlockID.darklandsOakLeaves, function(coords, blockID, blockData, level, enchant, item, region){
    if(Math.random() < .095) return [[ItemID.darklandsOakSapling, 1, 0]];
    return [];
});
Block.registerDropFunction(BlockID.dreadlandsWoodLeaves, function(coords, blockID, blockData, level, enchant, item, region){
    if(Math.random() < .095) return [[ItemID.dreadlandsWoodSapling, 1, 0]];
});

//SAPLINGS

IDRegistry.genBlockID("darklandsOakSapling");
IDRegistry.genBlockID("dreadlandsWoodSapling");

Block.createBlock("darklandsOakSapling", [
    {name: "Darklands Oak Sapling", texture: [["darklands_oak_sapling", 0]], inCreative: false}
], BLOCK_TYPE_PLANT);
Block.createBlock("dreadlandsWoodSapling", [
    {name: "Dreadlands Wood Sapling", texture: [["dreadlands_wood_sapling", 0]], inCreative: false}
], BLOCK_TYPE_PLANT);

Block.registerDropFunction(BlockID.darklandsOakSapling, function(coords, blockID, blockData, level, enchant, item, region){
    return [[ItemID.darklandsOakSapling, 1, 0]];
});
Block.registerDropFunction(BlockID.dreadlandsWoodSapling, function(coords, blockID, blockData, level, enchant, item, region){
    return [[ItemID.dreadlandsWoodSapling, 1, 0]];
});

IDRegistry.genItemID("darklandsOakSapling");
IDRegistry.genItemID("dreadlandsWoodSapling");

Item.createItem("darklandsOakSapling", "Darklands Oak Sapling", {name: "darklands_oak_sapling", meta: 0}, {stack: 64});
Item.createItem("dreadlandsWoodSapling", "Dreadlands Wood Sapling", {name: "dreadlands_wood_sapling", meta: 0}, {stack: 64});

ToolAPI.registerBlockMaterial(BlockID.darklandsOakSapling, "plant", 0, false);
ToolAPI.registerBlockMaterial(BlockID.dreadlandsWoodSapling, "plant", 0, false);

TileRenderer.setPlantModel(BlockID.darklandsOakLeaves, 0, "darklands_oak_sapling", 0);
TileRenderer.setPlantModel(BlockID.dreadlandsWoodSapling, 0, "dreadlands_wood_sapling", 0);

Item.registerUseFunction(ItemID.darklandsOakSapling, function(coords, item, block, player){
    let region = BlockSource.getDefaultForActor(player);
    if(block.id == BlockID.grassDark/**@todo */){
        region.setBlock(coords.relative.x, coords.relative.y, coords.relative.z, BlockID.darklandsOakSapling, 0);
        Entity.setCarriedItem(player, item.id, item.count - 1, item.data, item.extra);
    }
});
Item.registerUseFunction(ItemID.dreadlandsWoodSapling, function(coords, item, block, player){
    let region = BlockSource.getDefaultForActor(player);
    if(block.id == BlockID.grassDread/**@todo */){
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

Callback.addCallback("PostLoaded", function(){
    addShapelessRecipe(BlockID.darklandsOakWoodPlanks, 4, 0, [[BlockID.darklandsOakWood, 0]]);
    Recipes.addFurnace(BlockID.darklandsOakWood, 263, 1);
    Recipes.addFurnaceFuel(BlockID.darklandsOakWood, 0, 300);
    Recipes.addFurnace(BlockID.darklandsOakWoodGlowing, 263, 1);
    Recipes.addFurnaceFuel(BlockID.darklandsOakWoodGlowing, 0, 300);
    addShapelessRecipe(BlockID.dreadlandsWoodPlanks, 4, 0, [[BlockID.dreadlandsWoodLog, 0]]);
    Recipes.addFurnace(BlockID.dreadlandsWoodLog, ItemID.coalD/**@todo */, 0);
    Recipes.addFurnaceFuel(BlockID.dreadlandsWoodLog, 0, 300);
    let arr = [BlockID.darklandsOakWoodPlanks, BlockID.dreadlandsWoodPlanks]
    for(let a in arr){
        let id = arr[a];
        Recipes.addFurnaceFuel(id, 0, 300);
        for(let i=0; i<16; i++){//bed
            addShapedRecipe(355, 1, i, ["www", "ppp"], ['w', 35, i, 'p', id, 0]);
        }//tools
        addShapedRecipe(268, 1, 0, ["p", "p", "s"], ['p', id, 0, 's', 280, 0]);
        addShapedRecipe(269, 1, 0, ["p", "s", "s"], ['p', id, 0, 's', 280, 0]);
        addShapedRecipe(270, 1, 0, ["ppp", " s ", " s "], ['p', id, 0, 's', 280, 0]);
        addShapedRecipe(271, 1, 0, ["pp ", "ps ", " s "], ['p', id, 0, 's', 280, 0]);
        addShapedRecipe(271, 1, 0, [" pp", " sp", " s "], ['p', id, 0, 's', 280, 0]);
        addShapedRecipe(290, 1, 0, ["pp", " s", " s"], ['p', id, 0, 's', 280, 0]);
        addShapedRecipe(290, 1, 0, ["pp", "s ", "s "], ['p', id, 0, 's', 280, 0]);
        addShapedRecipe(280, 4, 0, ["p", "p"], ['p', id, 0]);//stick
        addShapedRecipe(323, 3, 0, ["ppp", "ppp", " s "], ['p', id, 0, 's', 280, 0]);//sign
        addShapedRecipe(513, 1, 0, ["pip", "ppp", " p "], ['p', id, 0, 'i', 265, 0]);//shield
        addShapedRecipe(33, 1, 0, ["ppp", "cic", "crc"], ['p', id, 0, 'c', 4, 0, 'i', 265, 0, 'r', 331, 0]);//piston
        addShapedRecipe(25, 1, 0, ["ppp", "prp", "ppp"], ['p', id, 0, 'r', 331, 0]);//note block
        addShapedRecipe(84, 1, 0, ["ppp", "pdp", "ppp"], ['p', id, 0, 'd', 264, 0]);//jukebox
        addShapedRecipe(58, 1, 0, ["pp", "pp"], ['p', id, 0]);//crafting table
        addShapedRecipe(54, 1, 0, ["ppp", "p p", "ppp"], ['p', id, 0]);//chest
        addShapedRecipe(281, 4, 0, ["p p", " p "], ['p', id, 0]);//bowl
        addShapedRecipe(47, 1, 0, ["ppp", "bbb", "ppp"], ['p', id, 0, 'b', 340, 0]);//bookshelf
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
Block.createBlock("wastelandsThorn", [{name: "Wasteland\'s Thorn", texture: [["wastelandsthorn", 0]], inCreative: false}]);
TileRenderer.setPlantModel(BlockID.wastelandsThorn, 0, "wastelandsthorn", 0);
ToolAPI.registerBlockMaterial(BlockID.wastelandsThorn, "plant", 0, false);
Block.registerDropFunction(BlockID.wastelandsThorn, function(coords, blockID, blockData, level, enchant, item, region){
    return [[ItemID.wastelandsThorn, 1, 0]];
});

IDRegistry.genItemID("wastelandsThorn");
Item.createItem("wastelandsThorn", "Wastalands Horn", {name: "wastelandsthorn", data: 1});

Item.registerUseFunction(ItemID.wastelandsThorn, function(coords, item, block, player) {
    let region = BlockSource.getDefaultForActor(player), r = coords.relative;
    if(block.id == BlockID.grassAbyss/**@todo */){
        region.setBlock(r.x, r.y, r.z, BlockID.wastelandsThorn, 0);
        Entity.setCarriedItem(player, item.id, item.count - 1, item.data, item.extra);
    }
});

Callback.addCallback("GenerateCustomDimensionChunk", function(chunkX, chunkZ, random, dimensionId){
    if(dimensionId == Abyss.id){
        let coords = GenerationUtils.randomCoords(chunkX, chunkZ);
        coords = GenerationUtils.findSurface(coords.x, 75, coords.z);
        let region = BlockSource.getCurrentWorldGenRegion();
        if(coords.y < 48) return;
        for(let i=0; i<randomInt(2, 5); i++){
            if(Math.random() < .65){
                if(region.getBlockId(coords.x, coords.y, coords.z) == BlockID.grassAbyss/**@todo */){
                    region.setBlock(coords.x, coords.y + 1, coords.z, BlockID.wastelandsThorn, 0);
                }
            }
        }
    }
});

//Luminous Thistle

IDRegistry.genBlockID("luminousThistle");
Block.createBlock("luminousThistle", [{name: "Luminous Thistle", texture: [["luminous_thistle", 0]], inCreative: false}]);
TileRenderer.setPlantModel(BlockID.luminousThistle, 0, "luminous_thistle", 0);
ToolAPI.registerBlockMaterial(BlockID.luminousThistle, "plant", 0, false);
Block.registerDropFunction("luminousThistle", function(coords, blockID, blockData, level, enchant, item, region){
    return [[ItemID.luminousThistle, 1, 0]];
});

IDRegistry.genItemID("luminousThistle");
Item.createItem("luminousThistle", "Wastalands Lumin", {name: "luminousthistle", data: 1});

Item.registerUseFunction("luminousThistle", function(coords, item, block, player){
    let region = BlockSource.getDefaultForActor(player), r = coords.relative;
    if(block.id == BlockID.grassAbyss/**@todo */){
        region.setBlock(r.x, r.y, r.z, BlockID.luminousThistle, 0);
        Entity.setCarriedItem(player, item.id, item.count - 1, item.data);
    }
});

Callback.addCallback("GenerateCustomDimensionChunk", function(chunkX, chunkZ, random, dimensionId){
    if(dimensionId == Abyss.id){
        let coords = GenerationUtils.randomCoords(chunkX, chunkZ);
        coords = GenerationUtils.findSurface(coords.x, 75, coords.z);
        let region = BlockSource.getCurrentWorldGenRegion();
        if(coords.y < 48) return;
        for(let i=0; i<randomInt(1, 4); i++){
            if(Math.random() < .65){
                if(region.getBlockId(coords.x, coords.y, coords.z) == BlockID.grassAbyss/**@todo */){
                    region.setBlock(coords.x, coords.y + 1, coords.z, BlockID.luminousThistle, 0);
                }
            }
        }
    }
});