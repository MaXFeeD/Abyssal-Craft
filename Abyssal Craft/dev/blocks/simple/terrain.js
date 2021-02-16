IDRegistry.genBlockID("darklandsGrass");
Block.createBlock("darklandsGrass", [
    {name: "Grass Block", texture: [["darklands_grass_bottom", 0], ["darklands_grass_top", 0], ["darklands_grass_side", 1]], inCreative: true}
], "opaque");
ToolAPI.registerBlockMaterial(BlockID.darklandsGrass, "dirt", 0, false);
Block.registerDropFunction(BlockID.darklandsGrass, function(coords, blockID, blockData, level, enchant, item, region){
    if(enchant.silk) return [[blockID, 1, 0]];
    return [[3, 1, 0]];
});

IDRegistry.genBlockID("fusedAbyssalSand");
IDRegistry.genBlockID("abyssalSand");
IDRegistry.genBlockID("abyssalSandGlass");

Block.createBlock("fusedAbyssalSand", [
    {name: "Fused Abyssal Sand", texture: [["abyssal_sand", 0], ["fused_abyssal_sand_top", 0], ["fused_abyssal_sand_side", 0]], inCreative: true}
], BLOCK_TYPE_SAND);
Block.createBlock("abyssalSand", [
    {name: "Abyssal Sand", texture: [["abyssal_sand", 0]], inCreative: true}
], BLOCK_TYPE_SAND);
Block.createBlock("abyssalSandGlass", [
    {name: "Abyssal Sand Glass", texture: [["abyssal_sand_glass", 0]], inCreative: true}
], BLOCK_TYPE_GLASS);

ToolAPI.registerBlockMaterial(BlockID.fusedAbyssalSand, "dirt", 0, false);
ToolAPI.registerBlockMaterial(BlockID.abyssalSand, "dirt", 0, false);

Block.registerDropFunction(BlockID.fusedAbyssalSand, function(coords, blockID, blockData, level, enchant, item, region){
    if(enchant.silk) return [[blockID, 1, 0]];
    return [[BlockID.abyssalSand, 1, 0]];
});

Callback.addCallback("PostLoaded", function(){
    Recipes.addFurnace(BlockID.abyssalSand, 0, BlockID.abyssalSandGlass, 0);
});

IDRegistry.genBlockID("dreadlandsGrass");
IDRegistry.genBlockID("dreadlandsDirt");

Block.createBlock("dreadlandsGrass", [
    {name: "Dreadlands Grass", texture: [["dreadlands_dirt", 0], ["dreadlands_grass_top", 0], ["dreadlands_grass_side", 0]], inCreative: true}
], BLOCK_TYPE_GRASS);
Block.createBlock("dreadlandsDirt", [
    {name: "DreadlandsDirt", texture: [["dreadlands_dirt", 0]], inCreative: true}
], BLOCK_TYPE_SAND);

ToolAPI.registerBlockMaterial(BlockID.dreadlandsGrass, "dirt", 0, false);
ToolAPI.registerBlockMaterial(BlockID.dreadlandsDirt, "dirt", 0, false);

Block.registerDropFunction(BlockID.dreadlandsGrass, function(coords, blockID, blockData, level, enchant, item, region){
    if(enchant.silk) return [[blockID, 1, 0]];
    return [[BlockID.dreadlandsDirt, 1, 0]];
});

IDRegistry.genBlockID("shoggothOoze");
IDRegistry.genBlockID("shoggothBiomass");

Block.createBlock("shoggothOoze", [
    {name: "Shoggoth Ooze", texture: [["shoggoth_ooze", 0]], inCreative: true},
    {name: "Shoggoth Ooze", texture: [["shoggoth_ooze", 0]], inCreative: false},
    {name: "Shoggoth Ooze", texture: [["shoggoth_ooze", 0]], inCreative: false},
    {name: "Shoggoth Ooze", texture: [["shoggoth_ooze", 0]], inCreative: false},
    {name: "Shoggoth Ooze", texture: [["shoggoth_ooze", 0]], inCreative: false},
    {name: "Shoggoth Ooze", texture: [["shoggoth_ooze", 0]], inCreative: false},
    {name: "Shoggoth Ooze", texture: [["shoggoth_ooze", 0]], inCreative: false},
    {name: "Shoggoth Ooze", texture: [["shoggoth_ooze", 0]], inCreative: false},
], {base: 1, sound: "slime"});
ToolAPI.registerBlockMaterial(BlockID.shoggothOoze, "dirt", 0, false);
Block.registerDropFunction(BlockID.shoggothOoze, function(coords, blockID, blockData, level, enchant, item, region){
    return [];
});
Block.registerPlaceFunction(BlockID.shoggothOoze, function(coords, item, block, player, region){
    if(block.id == BlockID.shoggothOoze){
        if(coords.side == 1 && block.data < 7){
            region.setBlock(coords.x, coords.y, coords.z, BlockID.shoggothOoze, block.data + 1);
        } else {
            region.setBlock(coords.relative.x, coords.relative.y, coords.relative.z, BlockID.shoggothOoze, 0);
        }
        Entity.setCarriedItem(player, item.id, item.count - 1, item.data, item.extra);
    }
});
Callback.addCallback("DestroyBlock", function(coords, block, player){
    let region = BlockSource.getDefaultForActor(player);
    if(region.getBlockId(coords.x, coords.y + 1, coords.z) == BlockID.shoggothOoze){
        region.destroyBlock(coords.x, coords.y + 1, coords.z, true);
    }
});

Block.createBlock("shoggothBiomass", [
    {name: "Shoggoth Biomass", texture: [["shoggoth_biomass", 0]], inCreative: true}
], {base: 1, sound: "sand"});
ToolAPI.registerBlockDiggingLevel(BlockID.shoggothBiomass, "dirt", 1, false);
Block.registerDropFunction(BlockID.shoggothBiomass, function(coords, blockID, blockData, level, enchant){
    if(level > 0) return [[blockID, 1, 0]];
    return [];
});

IDRegistry.genBlockID("monolithStone");
Block.createBlock("monolithStone", [
    {name: "Monolith Stone", texture: [["monolith_stone", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.monolithStone, "stone", 4, false);