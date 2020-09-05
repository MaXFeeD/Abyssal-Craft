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

IDRegistry.genItemID("coralPearlD");
Item.createItem("coralPearlD", "Coralium Pearl", {name: "EoA"});


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

IDRegistry.genItemID("essencOrbeABW");
Item.createItem("essenceOrbABW", "Abyss Essence", {name: "essence_abyssalwasteland"});

IDRegistry.genItemID("essenceOrbABW");
Item.createItem("essenceOrbABW", "Dreaded Essence", {name: "essence_dreadlands"});

IDRegistry.genItemID("essenceOrbDW");
Item.createItem("essenceOrbDW", "Omothol Essence", {name: "essence_omothol"});

IDRegistry.genItemID("skinSHN");
Item.createItem("skinSHN", "Shoggoth Skin", {name: "shoggothflesh_overworld"});

IDRegistry.genItemID("skinSHDk");
Item.createItem("skinSHDk", "Dark Shoggoth Skin", {name: "shoggothflesh_darkrealm"});

IDRegistry.genItemID("skinSHA");
Item.createItem("skinSHA", "Abyss Shoggoth Skin", {name: "shoggothflesh_abyssalwasteland"});

IDRegistry.genItemID("skinSHD");
Item.createItem("skinSHD", "Dread Shoggoth Skin", {name: "shoggothflesh_dreadlands"});

IDRegistry.genItemID("skinSHO");
Item.createItem("skinSHO", "Omothol Shoggoth Skin", {name: "shoggothflesh_omothol"});

IDRegistry.genItemID("coalD");
Item.createItem("coalD", "Dreaded Coal", {name: "charcoal"});

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
], ['x', ItemID.ethIron, 0]);

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