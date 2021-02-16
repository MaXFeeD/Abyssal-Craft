IDRegistry.genBlockID("oreAbyssalnite"); 
Block.createBlock("oreAbyssalnite", [
    {name: "Abyssalnite Ore", texture: [["abyssalnite_ore", 0]], inCreative: true}
], BLOCK_TYPE_ORE);
ToolAPI.registerBlockMaterial(BlockID.oreAbyssalnite, "stone", 3, false);

IDRegistry.genBlockID("oreCoralium"); 
Block.createBlock("oreCoralium", [
    {name: "Coralium Ore", texture: [["coralium_ore", 0]], inCreative: true}
], BLOCK_TYPE_ORE);
ToolAPI.registerBlockMaterial(BlockID.oreCoralium, "stone", 3, false);

IDRegistry.genBlockID("oreCoraliumInfused"); 
Block.createBlock("oreCoraliumInfused", [
    {name: "Coralium Infused Stone", texture: [["coralium_infused_stone", 0]], inCreative: true}
], BLOCK_TYPE_ORE);
ToolAPI.registerBlockMaterial(BlockID.oreCoraliumInfused, "stone", 3, false);

IDRegistry.genBlockID("oreNitre"); 
Block.createBlock("oreNitre", [
    {name: "Nitre Ore", texture: [["nitre_ore", 0]], inCreative: true}
], BLOCK_TYPE_ORE);
ToolAPI.registerBlockMaterial(BlockID.oreNitre, "stone", 3, false);

Callback.addCallback("GenerateChunkUnderground", function(chunkX, chunkZ, random){ 
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
    if(World.getBiome(chunkX, chunkZ) == 134 || 
        World.getBiome(chunkX, chunkZ) == CoralSwamp.id || 
        World.getBiome(chunkX, chunkZ) == 6){
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
    {name: "Abyssal Iron Ore", texture: [["abyssal_iron_ore", 0]], inCreative: true}
], BLOCK_TYPE_ORE);
ToolAPI.registerBlockMaterial(BlockID.oreIronAbyssal, "stone", 3, false);

IDRegistry.genBlockID("oreGoldAbyssal"); 
Block.createBlock("oreGoldAbyssal", [
    {name: "Abyssal Gold Ore", texture: [["abyssal_gold_ore", 0]], inCreative: true}
], BLOCK_TYPE_ORE);
ToolAPI.registerBlockMaterial(BlockID.oreGoldAbyssal, "stone", 3, false);

IDRegistry.genBlockID("oreDiamondAbyssal"); 
Block.createBlock("oreDiamondAbyssal", [
    {name: "Abyssal Diamond Ore", texture: [["abyssal_diamond_ore", 0]], inCreative: true}
], BLOCK_TYPE_ORE);
ToolAPI.registerBlockMaterial(BlockID.oreDiamondAbyssal, "stone", 3, false);

IDRegistry.genBlockID("oreNitreAbyssal"); 
Block.createBlock("oreNitreAbyssal", [
    {name: "Abyssal Nitre Ore", texture: [["abyssal_nitre_ore", 0]], inCreative: true}
], BLOCK_TYPE_ORE);
ToolAPI.registerBlockMaterial(BlockID.oreNitreAbyssal, "stone", 3, false);

IDRegistry.genBlockID("oreTinAbyssal");
Block.createBlock("oreTinAbyssal", [
    {name: "Abyssal Tin Ore", texture: [["abyssal_tin_ore", 0]], inCreative: true}
], BLOCK_TYPE_ORE);
ToolAPI.registerBlockMaterial(BlockID.oreTinAbyssal, "stone", 3, false);

IDRegistry.genBlockID("oreCopperAbyssal");
Block.createBlock("oreCopperAbyssal", [
    {name: "Abyssal Copper Ore", texture: [["abyssal_copper_ore", 0]], inCreative: true}
], BLOCK_TYPE_ORE);
ToolAPI.registerBlockMaterial(BlockID.oreCopperAbyssal, "stone", 3, false);

IDRegistry.genBlockID("oreCoraliumPearlescent"); 
Block.createBlock("oreCoraliumPearlescent", [
    {name: "Pearlescent Coralium Ore", texture: [["pearlescent_coralium_ore", 0]], inCreative: true}
], BLOCK_TYPE_ORE);
ToolAPI.registerBlockMaterial(BlockID.oreCoraliumPearlescent, "stone", 4, false);

IDRegistry.genBlockID("oreDreadedAbyssalnite"); 
Block.createBlock("oreDreadedAbyssalnite", [
    {name: "Dreaded Abyssalnite Ore", texture: [["dreaded_abyssalnite_ore", 0]], inCreative: true}
], BLOCK_TYPE_ORE);
ToolAPI.registerBlockMaterial(BlockID.oreDreadedAbyssalnite, "stone", 4, false);

IDRegistry.genBlockID("oreDreadlandsAbyssalnite");
Block.createBlock("oreDreadlandsAbyssalnite", [
    {name: "Dreadlands Abyssalnite Ore", texture: [["dreadlands_abyssalnite_ore", 0]], inCreative: true}
], BLOCK_TYPE_ORE);
ToolAPI.registerBlockMaterial(BlockID.oreDreadlandsAbyssalnite, "stone", 4, false);

IDRegistry.genBlockID("oreLiquifiedCoralium");
Block.createBlock("oreLiquifiedCoralium", [
    {name: "Liquified Coralium Ore", texture: [["liquified_coralium_ore", 0]], inCreative: true}
], BLOCK_TYPE_ORE);
ToolAPI.registerBlockMaterial(BlockID.oreLiquifiedCoralium, "stone", 4, false);

const AC_PICKAXES_BY_LEVEL = [ItemID.darkstonePickaxe, ItemID.abyssalnitePickaxe, ItemID.refinedCoraliumPickaxe, ItemID.dreadiumPickaxe, ItemID.ethaxiumPickaxe];

Block.registerDropFunction("oreAbyssalnite", function(coords, blockID, blockData, level, enchant, item, region){
    if(level > 2) return [[blockID, 1, 0]];
    return [];
});
Block.registerDropFunction("oreCoralium", function(coords, blockID, blockData, level, enchant, item, region){
    if(level > 2){
        if(enchant.silk) return [[blockID, 1, 0]];
        let count = randomInt(1, 3);
        count += Math.floor(randomInt(0, 2) * enchant.fortune);
        region.spawnExpOrbs(coords.x, coords.y, coords.z, randomInt(2, 7));
        return [[ItemID.coraliumGem, count, 0]];
    }; return [];
});
Block.registerDropFunction("oreCoraliumInfused", function(coords, blockID, blockData, level, enchant, item, region){
    if(level > 3){
        if(enchant.silk) return [[blockID, 1, 0]];
        let count = 1;
        count += Math.floor(Math.random() * enchant.fortune);
        region.spawnExpOrbs(coords.x, coords.y, coords.z, randomInt(3, 9));
        return [[ItemID.coraliumPearl, count, 0]];
    }; return [];
});
Block.registerDropFunction("oreNitre", function(coords, blockID, blockData, level, enchant, item, region){
    if(level > 2){
        if(enchant.silk) return [[blockID, 1, 0]];
        let count = randomInt(1, 3);
        count += Math.floor(randomInt(0, 2) * enchant.fortune);
        region.spawnExpOrbs(coords.x, coords.y, coords.z, randomInt(2, 7));
        return [[ItemID.nitre, count, 0]];
    }; return [];
});
Block.registerDropFunction("oreIronAbyssal", function(coords, blockID, blockData, level, enchant, item, region){
    if(level > 2) return [[blockID, 1, 0]];
    return [];
});
Block.registerDropFunction("oreGoldAbyssal", function(coords, blockID, blockData, level, enchant, item, region){
    if(level > 2) return [[blockID, 1, 0]];
    return [];
});
Block.registerDropFunction("oreDiamondAbyssal", function(coords, blockID, blockData, level, enchant, item, region){
    if(level > 2){
        if(enchant.silk) return [[blockID, 1, 0]];
        let count = 1;
        count += Math.floor(Math.random() * enchant.fortune);
        region.spawnExpOrbs(coords.x, coords.y, coords.z, randomInt(7, 12));
        return [[264, count, 0]];
    }
    return [];
});
Block.registerDropFunction("oreNitreAbyssal", function(coords, blockID, blockData, level, enchant, item, region){
    if(level > 2) return [[blockID, 1, 0]];
    return [];
});
Block.registerDropFunction("oreTinAbyssal", function(coords, blockID, blockData, level, enchant, item, region){
    if(level > 2) return [[blockID, 1, 0]];
    return [];
});
Block.registerDropFunction("oreCopperAbyssal", function(coords, blockID, blockData, level, enchant, item, region){
    if(level > 2) return [[blockID, 1, 0]];
    return [];
});
Block.registerDropFunction("oreCoraliumPearlescent", function(coords, blockID, blockData, level, enchant, item, region){
    //check if the pickaxe is from AbyssalCraft and if it is higher than abyssalnite
    if(AC_PICKAXES_BY_LEVEL.indexOf(item.id) !== -1){
        if(AC_PICKAXES_BY_LEVEL.indexOf(item.id) > 1){
            if(enchant.silk) return [[blockID, 1, 0]];
            let count = randomInt(1, 2);
            count += Math.floor(randomInt(0, 2) * enchant.fortune);
            region.spawnExpOrbs(coords.x, coords.y, coords.z, randomInt(6, 10));
            return [[ItemID.coraliumPearl, count, 0]];
        }
    }
    return [];
});
Block.registerDropFunction("oreDreadedAbyssalnite", function(coords, blockID, blockData, level, enchant, item, region){
    if(AC_PICKAXES_BY_LEVEL.indexOf(item.id) !== -1){
        if(AC_PICKAXES_BY_LEVEL.indexOf(item.id) > 0){
            return [[blockID, 1, 0]];
        }
    }
    return [];
});
Block.registerDropFunction("oreDreadlandsAbyssalnite", function(coords, blockID, blockData, level, enchant, item, region){
    if(AC_PICKAXES_BY_LEVEL.indexOf(item.id) !== -1){
        if(AC_PICKAXES_BY_LEVEL.indexOf(item.id) > 0){
            return [[blockID, 1, 0]];
        }
    }
    return [];
});
Block.registerDropFunction("oreLiquifiedCoralium", function(coords, blockID, blockData, level, enchant, item, region){
    if(AC_PICKAXES_BY_LEVEL.indexOf(item.id) !== -1){
        if(AC_PICKAXES_BY_LEVEL.indexOf(item.id) > 0){
            return [[blockID, 1, 0]];
        }
    }
    return [];
});