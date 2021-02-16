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
    {name: "Darkstone", texture: [["darkstone", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
Block.createBlock("darklandsStoneCobblestone", [
    {name: "Darkstone Cobblestone", texture: [["darkstone_cobblestone", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
Block.createBlock("darklandsStoneBricks", [
    {name: "Darkstone Bricks", texture: [["darkstone_bricks", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
Block.createBlock("chiseledDarklandsStoneBricks", [
    {name: "Chiseled Darkstone Bricks", texture: [["chiseled_darkstone_bricks", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
Block.createBlock("crackedDarklandsStoneBricks", [
    {name: "Cracked Darkstone Bricks", texture: [["cracked_darkstone_bricks", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
Block.createBlock("glowingDarklandsStoneBricks", [
    {name: "Glowing Darkstone Bricks", texture: [["glowing_darkstone_bricks", 0]], inCreative: true}
], BLOCK_TYPE_LIGHT);

Block.createBlock("darklandsStoneCobblestoneWall", [
    {name: "Darkstone Cobblestone Wall", texture: [["darkstone_cobblestone", 0]], inCreative: true}
], BLOCK_TYPE_WALL);

ToolAPI.registerBlockMaterial(BlockID.darklandsStone, "stone", 1, false);
ToolAPI.registerBlockMaterial(BlockID.darklandsStoneCobblestone, "stone", 1, false);
ToolAPI.registerBlockMaterial(BlockID.darklandsStoneBricks, "stone", 1, false);
ToolAPI.registerBlockMaterial(BlockID.chiseledDarklandsStoneBricks, "stone", 1, false);
ToolAPI.registerBlockMaterial(BlockID.crackedDarklandsStoneBricks, "stone", 1, false);
ToolAPI.registerBlockMaterial(BlockID.glowingDarklandsStoneBricks, "stone", 1, false);
ToolAPI.registerBlockMaterial(BlockID.darklandsStoneCobblestoneWall, "stone", 1, false);

Block.registerDropFunction(BlockID.darklandsStone, function(coords, blockID, blockData, level, enchant, item, region){
    if(level > 0){
        if(enchant.silk) return [[blockID, 1, 0]];
        return [[BlockID.darklandsStoneCobblestone, 1, 0]];
    }; return [];
});

IDRegistry.genBlockID("darklandsStoneBrickFence");
Block.createBlock("darklandsStoneBrickFence", [
    {name: "Darklands Stone Brick Fence", texture: [["darklands_stone_bricks", 0]], inCreative: true}
], BLOCK_TYPE_FENCE);
ToolAPI.registerBlockMaterial(BlockID.darklandsStoneBrickFence, "stone", 1, false);

IDRegistry.genBlockID("darklandsStoneBrickSlab");
IDRegistry.genBlockID("darklandsStoneCobblestoneSlab");
IDRegistry.genBlockID("darklandsStoneSlab");
IDRegistry.genBlockID("darklandsStoneBrickSlabDouble");
IDRegistry.genBlockID("darklandsStoneCobblestoneSlabDouble");
IDRegistry.genBlockID("darklandsStoneSlabDouble");

BaseBlocks.createSlab("darklandsStoneBrickSlab", [
    {name: "Darkstone Brick Slab", texture: [
        ["darkstone_slab_top", 0], ["darkstone_slab_top", 0], ["darkstone_slab_side", 0]
    ], inCreative: true}
], BLOCK_TYPE_SLAB, BlockID.darklandsStoneBrickSlabDouble);
BaseBlocks.createSlab("darklandsStoneCobblestoneSlab", [
    {name: "Darkstone Cobblestone Slab", texture: [["darkstone_cobblestone", 0]], inCreative: true}
], BLOCK_TYPE_SLAB, BlockID.darklandsStoneCobblestoneSlabDouble);
BaseBlocks.createSlab("darklandsStoneSlab", [
    {name: "Darkstone Slab", texture: [["darkstone", 0]], inCreative: true}
], BLOCK_TYPE_SLAB, BlockID.darklandsStoneSlabDouble);

Block.createBlock("darklandsStoneBrickSlabDouble", [
    {name: "Darkstone Brick Slab", texture: [
        ["darkstone_slab_top", 0], ["darkstone_slab_top", 0], ["darkstone_slab_side", 0]
    ], inCreative: false}
], BLOCK_TYPE_SLAB);
Block.createBlock("darklandsStoneCobblestoneSlabDouble", [
    {name: "Darkstone Cobblestone Slab", texture: [["darkstone_cobblestone", 0]], inCreative: false}
], BLOCK_TYPE_SLAB);
Block.createBlock("darklandsStoneSlabDouble", [
    {name: "Darkstone Slab", texture: [["darkstone", 0]], inCreative: false}
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
    {name: "Dreadstone", texture: [["dreadstone", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
Block.createBlock("dreadstoneCobblestone", [
    {name: "Dreadstone Cobblestone", texture: [["dreadstone_cobblestone", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
Block.createBlock("dreadstoneBricks", [
    {name: "Dreadstone Bricks", texture: [["dreadstone_bricks", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
Block.createBlock("chiseledDreadstoneBricks", [
    {name: "Chiseled Dreadstone Bricks", texture: [["chiseled_dreadstone_bricks", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
Block.createBlock("crackedDreadstoneBricks", [
    {name: "Cracked Dreadstone Bricks", texture: [["cracked_dreadstone_bricks", 0]], inCreative: true}
], BLOCK_TYPE_STONE);

Block.createBlock("dreadstoneCobblestoneWall", [
    {name: "Dreadstone Cobblestone Wall", texture: [["dreadstone_cobblestone", 0]], inCreative: true}
], BLOCK_TYPE_WALL);

ToolAPI.registerBlockMaterial(BlockID.dreadstone, "stone", 2, false);
ToolAPI.registerBlockMaterial(BlockID.dreadstoneCobblestone, "stone", 2, false);
ToolAPI.registerBlockMaterial(BlockID.dreadstoneBricks, "stone", 2, false);
ToolAPI.registerBlockMaterial(BlockID.chiseledDreadstoneBricks, "stone", 2, false);
ToolAPI.registerBlockMaterial(BlockID.crackedDreadstoneBricks, "stone", 2, false);
ToolAPI.registerBlockMaterial(BlockID.dreadstoneCobblestoneWall, "stone", 2, false);

Block.registerDropFunction(BlockID.dreadstone, function(coords, blockID, blockData, level, enchant, item, region){
    if(level > 1){
        if(enchant.silk) return [[blockID, 1, 0]];
        return [[BlockID.dreadstoneCobblestone, 1, 0]];
    }; return [];
});

IDRegistry.genBlockID("dreadstoneBrickFence");
Block.createBlock("dreadstoneBrickFence", [
    {name: "Dreadstone Brick Fence", texture: [["dreadstone_bricks", 0]], inCreative: true}
]);
ToolAPI.registerBlockMaterial(BlockID.dreadstoneBrickFence, "stone", 2, false);

IDRegistry.genBlockID("dreadstoneBrickSlab");
IDRegistry.genBlockID("dreadstoneCobblestoneSlab");
IDRegistry.genBlockID("dreadstoneBrickSlabDouble");
IDRegistry.genBlockID("dreadstoneCobblestoneSlabDouble");

BaseBlocks.createSlab("dreadstoneBrickSlab", [
    {name: "Dreadstone Brick Slab", texture: [["dreadstone_bricks", 0]], inCreative: true}
], BLOCK_TYPE_SLAB, BlockID.dreadstoneBrickSlabDouble);
BaseBlocks.createSlab("dreadstoneCobblestoneSlab", [
    {name: "Dreadstone Cobblestone Slab", texture: [["dreadstone_cobblestone", 0]], inCreative: true}
], BLOCK_TYPE_SLAB, BlockID.dreadstoneCobblestoneSlabDouble);

Block.createBlock("dreadstoneBrickSlabDouble", [
    {name: "Dreadstone Brick Slab", texture: [["dreadstone_bricks", 0]], inCreative: false}
], BLOCK_TYPE_STONE);
Block.createBlock("dreadstoneCobblestoneSlabDouble", [
    {name: "Dreadstone Cobblestone Slab", texture: [["dreadstone_cobblestone", 0]], inCreative: false}
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
    {name: "Ethaxium", texture: [["ethaxium", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
Block.createBlock("ethaxiumBricks", [
    {name: "Ethaxium Bricks", texture: [["ethaxium_bricks", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
Block.createBlock("chiseledEthaxiumBricks", [
    {name: "Chiseled Ethaxium Bricks", texture: [["chiseled_ethaxium_bricks", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
Block.createBlock("crackedEthaxiumBricks", [
    {name: "Cracked Ethaxium Bricks", texture: [["cracked_ethaxium_bricks", 0]], inCreative: true}
],  BLOCK_TYPE_STONE);

ToolAPI.registerBlockMaterial(BlockID.ethaxium, "stone", 4, false);
ToolAPI.registerBlockMaterial(BlockID.ethaxiumBricks, "stone", 4, false);
ToolAPI.registerBlockMaterial(BlockID.chiseledEthaxiumBricks, "stone", 4, false);
ToolAPI.registerBlockMaterial(BlockID.crackedEthaxiumBricks, "stone", 4, false);

IDRegistry.genBlockID("ethaxiumBrickFence");
Block.createBlock("ethaxiumBrickFence", [
    {name: "Ethaxium Brick Fence", texture: [["ethaxium_bricks", 0]], inCreative: true}
], BLOCK_TYPE_FENCE);
ToolAPI.registerBlockMaterial(BlockID.ethaxiumBrickFence, "stone", 4, false);

IDRegistry.genBlockID("ethaxiumPillar");
Block.createBlock("ethaxiumPillar", [
    {name: "Ethaxium Pillar", texture: [
        ["ethaxium_pillar_top", 0], ["ethaxium_pillar_top", 0], ["ethaxium_pillar_side", 0]
    ], inCreative: true},
    {name: "Ethaxium Pillar", texture: [
        ["ethaxium_pillar_side", 0], ["ethaxium_pillar_side", 0], ["ethaxium_pillar_top", 0], ["ethaxium_pillar_top", 0], ["ethaxium_pillar_side", 1]
    ], inCreative: false},
    {name: "Ethaxium Pillar", texture: [
        ["ethaxium_pillar_side", 1], ["ethaxium_pillar_side", 1], ["ethaxium_pillar_side", 1], ["ethaxium_pillar_side", 1], ["ethaxium_pillar_top", 0]
    ], inCreative: false}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.ethaxiumPillar, "stone", 4, false);
Block.registerPlaceFunction(BlockID.ethaxiumPillar, function(coords, item, block, player, region){
    let r = coords.relative;
    switch(coords.side){
        case 0: case 1: region.setBlock(r.x, r.y, r.z, BlockID.ethaxiumPillar, 0); break;
        case 2: case 3: region.setBlock(r.x, r.y, r.z, BlockID.ethaxiumPillar, 1); break;
        case 4: case 5: region.setBlock(r.x, r.y, r.z, BlockID.ethaxiumPillar, 2); break;
    }
});
Block.registerDropFunction(BlockID.ethaxiumPillar, function(coords, blockID, blockData, level, enchant, item, region){
    return [[blockID, 1, 0]];
});

IDRegistry.genBlockID("ethaxiumBrickSlab");
IDRegistry.genBlockID("ethaxiumBrickSlabDouble");

BaseBlocks.createSlab("ethaxiumBrickSlab", [
    {name: "Ethaxium Brick Slab", texture: [["ethaxium_bricks", 0]], inCreative: true}
], BLOCK_TYPE_SLAB, BlockID.ethaxiumBrickSlabDouble);
Block.createBlock("ethaxiumBrickSlabDouble", [
    {name: "Ethaxium Brick Slab", texture: [["ethaxium_bricks", 0]], inCreative: false}
], BLOCK_TYPE_STONE);

ToolAPI.registerBlockMaterial(BlockID.ethaxiumBrickSlab, "stone", 4, false);
ToolAPI.registerBlockMaterial(BlockID.ethaxiumBrickSlabDouble, "stone", 4, false);

(function(){
    let makeBlue = function(id){
        Item.registerNameOverrideFunction(id, function(item, name){
            name = "§b" + name;
            return name;
        });
    }
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
    {name: "Dark Ethaxium Bricks", texture: [["dark_ethaxium_bricks", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
Block.createBlock("chiseledDarkEthaxiumBricks", [
    {name: "Chiseled Dark Ethaxium Bricks", texture: [["chiseled_dark_ethaxium_bricks", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
Block.createBlock("crackedDarkEthaxiumBricks", [
    {name: "Cracked Dark Ethaxium Bricks", texture: [["cracked_dark_ethaxium_bricks", 0]], inCreative: true}
], BLOCK_TYPE_STONE);

ToolAPI.registerBlockMaterial(BlockID.darkEthaxiumBricks, "stone", 4, false);
ToolAPI.registerBlockMaterial(BlockID.chiseledDarkEthaxiumBricks, "stone", 4, false);
ToolAPI.registerBlockMaterial(BlockID.crackedDarkEthaxiumBricks, "stone", 4, false);

IDRegistry.genBlockID("darkEthaxiumBrickFence");
Block.createBlock("darkEthaxiumBrickFence", [
    {name: "Dark Ethaxium Brick Fence", texture: [["dark_ethaxium_bricks", 0]], inCreative: true}
], BLOCK_TYPE_FENCE);
ToolAPI.registerBlockMaterial(BlockID.darkEthaxiumBrickFence, "stone", 4, false);

IDRegistry.genBlockID("darkEthaxiumPillar");
Block.createBlock("darkEthaxiumPillar", [
    {name: "Dark Ethaxium Pillar", texture: [
        ["dark_ethaxium_pillar_top", 0], ["dark_ethaxium_pillar_top", 0], ["dark_ethaxium_pillar_side", 0]
    ], inCreative: true},
    {name: "Dark Ethaxium Pillar", texture: [
        ["dark_ethaxium_pillar_side", 0], ["dark_ethaxium_pillar_side", 0], ["dark_ethaxium_pillar_top", 0], ["dark_ethaxium_pillar_top", 0], ["dark_ethaxium_pillar_side", 1]
    ], inCreative: false},
    {name: "Dark Ethaxium Pillar", texture: [
        ["dark_ethaxium_pillar_side", 1], ["dark_ethaxium_pillar_side", 1], ["dark_ethaxium_pillar_side", 1], ["dark_ethaxium_pillar_side", 1], ["dark_ethaxium_pillar_top", 0]
    ], inCreative: false}
], BLOCK_TYPE_STONE);
ToolAPI.registerBlockMaterial(BlockID.darkEthaxiumPillar, "stone", 4, false);
Block.registerPlaceFunction(BlockID.darkEthaxiumPillar, function(coords, item, block, player, region){
    let r = coords.relative;
    switch(coords.side){
        case 0: case 1: region.setBlock(r.x, r.y, r.z, BlockID.darkEthaxiumPillar, 0); break;
        case 2: case 3: region.setBlock(r.x, r.y, r.z, BlockID.darkEthaxiumPillar, 1); break;
        case 4: case 5: region.setBlock(r.x, r.y, r.z, BlockID.darkEthaxiumPillar, 2); break;
    }
});
Block.registerDropFunction(BlockID.darkEthaxiumPillar, function(coords, blockID, blockData, level, enchant, item, region){
    return [[blockID, 1, 0]];
});

IDRegistry.genBlockID("darkEthaxiumBrickSlab");
IDRegistry.genBlockID("darkEthaxiumBrickSlabDouble");

BaseBlocks.createSlab("darkEthaxiumBrickSlab", [
    {name: "Dark Ethaxium Brick Slab", texture: [["dark_ethaxium_bricks", 0]], inCreative: true}
], BLOCK_TYPE_SLAB, BlockID.ethaxiumBrickSlabDouble);
Block.createBlock("darkEthaxiumBrickSlabDouble", [
    {name: "Dark Ethaxium Brick Slab", texture: [["dark_ethaxium_bricks", 0]], inCreative: false}
], BLOCK_TYPE_STONE);

ToolAPI.registerBlockMaterial(BlockID.darkEthaxiumBrickSlab, "stone", 4, false);
ToolAPI.registerBlockMaterial(BlockID.darkEthaxiumBrickSlabDouble, "stone", 4, false);

(function(){
    let makeRed = function(id){
        Item.registerNameOverrideFunction(id, function(item, name){
            name = "§4" + name;
            return name;
        });
    }
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
    {name: "Omothol Stone", texture: [["omothol_stone", 0]], inCreative: true}
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
    {name: "Abyssal Stone", texture: [["abyssal_stone", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
Block.createBlock("abyssalCobblestone", [
    {name: "Abyssal Cobblestone", texture: [["abyssal_cobblestone", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
Block.createBlock("abyssalStoneBricks", [
    {name: "Abyssal Stone Bricks", texture: [["abyssal_stone_bricks", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
Block.createBlock("chiseledAbyssalStoneBricks", [
    {name: "Chiseled Abyssal Stone Bricks", texture: [["chiseled_abyssal_stone_bricks", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
Block.createBlock("crackedAbyssalStoneBricks", [
    {name: "Cracked Abyssal Stone Bricks", texture: [["cracked_abyssal_stone_bricks", 0]], inCreative: true}
], BLOCK_TYPE_STONE);

ToolAPI.registerBlockMaterial(BlockID.abyssalStone, "stone", 1, false);
ToolAPI.registerBlockMaterial(BlockID.abyssalCobblestone, "stone", 1, false);
ToolAPI.registerBlockMaterial(BlockID.abyssalStoneBricks, "stone", 1, false);
ToolAPI.registerBlockMaterial(BlockID.chiseledAbyssalStoneBricks, "stone", 1, false);
ToolAPI.registerBlockMaterial(BlockID.crackedAbyssalStoneBricks, "stone", 1, false);

Block.registerDropFunction(BlockID.abyssalStone, function(coords, blockID, blockData, level, enchant, item, region){
    if(level > 0){
        if(enchant.silk) return [[blockID, 1, 0]];
        return [[BlockID.abyssalCobblestone, 1, 0]];
    }
    return [];
});

IDRegistry.genBlockID("abyssalStoneBrickFence");
Block.createBlock("abyssalStoneBrickFence", [
    {name: "Abyssal Stone Brick Fence", texture: [["abyssal_stone_bricks"]], inCreative: true}
], BLOCK_TYPE_FENCE);
ToolAPI.registerBlockMaterial(BlockID.abyssalStoneBrickFence, "stone", 1, false);

IDRegistry.genBlockID("abyssalStoneBrickSlab");
IDRegistry.genBlockID("abyssalStoneBrickSlabDouble");

BaseBlocks.createSlab("abyssalStoneBrickSlab", [
    {name: "Abyssal Stone Brick Slab", texture: [["abyssal_stone_bricks", 0]], inCreative: true}
], BLOCK_TYPE_STONE, BlockID.abyssalStoneBrickSlabDouble);
Block.createBlock("abyssalStoneBrickSlabDouble", [
    {name: "Abyssal Stone Brick Slab", texture: [["abyssal_stone_bricks", 0]], inCreative: true}
], BLOCK_TYPE_STONE);

ToolAPI.registerBlockMaterial(BlockID.abyssalStoneBrickSlab, "stone", 1, false);
ToolAPI.registerBlockMaterial(BlockID.abyssalStoneBrickSlabDouble, "stone", 1, false);

IDRegistry.genBlockID("abyssalCobblestoneSlab");
IDRegistry.genBlockID("abyssalCobblestoneSlabDouble");

BaseBlocks.createSlab("abyssalCobblestoneSlab", [
    {name: "Abyssal Cobblestone Slab", texture: [["abyssal_cobblestone", 0]], inCreative: true}
], BLOCK_TYPE_STONE, BlockID.abyssalCobblestoneSlabDouble);
Block.createBlock("abyssalCobblestoneSlabDouble", [
    {name: "Abyssal Cobblestone Slab", texture: [["abyssal_cobblestone", 0]], inCreative: true}
], BLOCK_TYPE_STONE);

ToolAPI.registerBlockMaterial(BlockID.abyssalCobblestoneSlab, "stone", 1, false);
ToolAPI.registerBlockMaterial(BlockID.abyssalCobblestoneSlabDouble, "stone", 1, false);

IDRegistry.genBlockID("abyssalCobblestoneWall");
Block.createBlock("abyssalCobblestoneWall", [
    {name: "Abyssal Cobblestone Wall", texture: [["abyssal_cobblestone", 0]], inCreative: true}
], BLOCK_TYPE_WALL);
ToolAPI.registerBlockMaterial(BlockID.abyssalCobblestoneWall, "stone", 1, false);

(function(){
    let makeBlue = function(id){
        Item.registerNameOverrideFunction(id, function(item, name){
            name = Native.Color.BLUE + name;
            return name;
        });
    }
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
    {name: "Coralium Stone", texture: [["coralium_stone", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
Block.createBlock("coraliumCobblestone", [
    {name: "Coralium Cobblestone", texture: [["coralium_cobblestone", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
Block.createBlock("coraliumBricks", [
    {name: "Coralium Bricks", texture: [["coralium_bricks", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
Block.createBlock("chiseledCoraliumBricks", [
    {name: "Chiseled Coralium Bricks", texture: [["chiseled_coralium_bricks", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
Block.createBlock("crackedCoraliumBricks", [
    {name: "Cracked Coralium Bricks", texture: [["cracked_coralium_bricks", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
Block.createBlock("coraliumBrickFence", [
    {name: "Coralium Brick Fence", texture: [["coralium_bricks", 0]], inCreative: true}
], BLOCK_TYPE_FENCE);
BaseBlocks.createSlab("coraliumBrickSlab", [
    {name: "Coralium Brick Slab", texture: [["coralium_bricks", 0]], inCreative: true}
], BLOCK_TYPE_SLAB, BlockID.coraliumBrickSlabDouble);
Block.createBlock("coraliumBrickSlabDouble", [
    {name: "Coralium Brick Slab", texture: [["coralium_bricks", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
BaseBlocks.createSlab("coraliumCobblestoneSlab", [
    {name: "Coralium Cobblestone Slab", texture: [["coralium_cobblestone", 0]], inCreative: true}
], BLOCK_TYPE_SLAB, BlockID.coraliumCobblestoneSlabDouble);
Block.createBlock("coraliumCobblestoneSlabDouble", [
    {name: "Coralium Cobblestone Slab", texture: [["coralium_cobblestone", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
Block.createBlock("coraliumCobblestoneWall", [
    {name: "Coralium Cobblestone Wall", texture: [["coralium_cobblestone", 0]], inCreative: true}
], BLOCK_TYPE_WALL);

Block.registerDropFunction(BlockID.coraliumStone, function(coords, blockID, blockData, level, enchant, item, region){
    if(level > 0){
        if(enchant.silk) return [[blockID, 1, 0]];
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
    {name: "Abyssalnite Stone", texture: [["abyssalnite_stone", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
Block.createBlock("abyssalniteCobblestone", [
    {name: "Abyssalnite Cobblestone", texture: [["abyssalnite_cobblestone", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
Block.createBlock("abyssalniteBricks", [
    {name: "Abyssalnite Bricks", texture: [["abyssalnite_bricks", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
Block.createBlock("chiseledAbyssalniteBricks", [
    {name: "Chiseled Abyssalnite Bricks", texture: [["chiseled_abyssalnite_bricks", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
Block.createBlock("crackedAbyssalniteBricks", [
    {name: "Cracked Abyssalnite Bricks", texture: [["cracked_abyssalnite_bricks", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
Block.createBlock("abyssalniteBrickFence", [
    {name: "Abyssalnite Brick Fence", texture: [["abyssalnite_bricks", 0]], inCreative: true}
], BLOCK_TYPE_FENCE);
BaseBlocks.createSlab("abyssalniteBrickSlab", [
    {name: "Abyssalnite Brick Slab", texture: [["abyssalnite_bricks", 0]], inCreative: true}
], BLOCK_TYPE_SLAB, BlockID.abyssalniteBrickSlabDouble);
Block.createBlock("abyssalniteBrickSlabDouble", [
    {name: "Abyssalnite Brick Slab", texture: [["abyssalnite_bricks", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
BaseBlocks.createSlab("abyssalniteCobblestoneSlab", [
    {name: "Abyssalnite Cobblestone Slab", texture: [["abyssalnite_cobblestone", 0]], inCreative: true}
], BLOCK_TYPE_SLAB, BlockID.abyssalniteCobblestoneSlabDouble);
Block.createBlock("abyssalniteCobblestoneSlabDouble", [
    {name: "Abyssalnite Cobblestone Slab", texture: [["abyssalnite_cobblestone", 0]], inCreative: true}
], BLOCK_TYPE_STONE);
Block.createBlock("abyssalniteCobblestoneWall", [
    {name: "Abyssalnite Cobblestone Wall", texture: [["abyssalnite_cobblestone", 0]], inCreative: true}
], BLOCK_TYPE_WALL);

Block.registerDropFunction(BlockID.abyssalniteStone, function(coords, blockID, blockData, level, enchant, item, region){
    if(level > 0){
        if(enchant.silk) return [[blockID, 1, 0]];
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

Callback.addCallback("PostLoaded", function(){
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