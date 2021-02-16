IDRegistry.genBlockID("blockAbyssalnite");
IDRegistry.genBlockID("blockRefinedCoralium"); 
IDRegistry.genBlockID("blockDreadium"); 
IDRegistry.genBlockID("blockEthaxium"); 

Block.createBlock("blockAbyssalnite", [
    {name: "Block of Abyssalnite", texture: [["abyssalnite_block", 0]], inCreative: true}
], BLOCK_TYPE_UNI);
Block.createBlock("blockRefinedCoralium", [
    {name: "Block of Refined Coralium", texture: [["coralium_block", 0]],inCreative: true}
], BLOCK_TYPE_UNI);
Block.createBlock("blockDreadium", [
    {name: "Block of Dreadium", texture: [["dreadium_block", 0]],inCreative: true}
], BLOCK_TYPE_UNI);
Block.createBlock("blockEthaxium", [
    {name: "Block of Ethaxium", texture: [["ethaxium_block", 0]],inCreative: true}
], BLOCK_TYPE_UNI);

ToolAPI.registerBlockMaterial(BlockID.blockAbyssalnite, "stone", 1, false);
ToolAPI.registerBlockMaterial(BlockID.blockRefinedCoralium, "stone", 1, false);
ToolAPI.registerBlockMaterial(BlockID.blockDreadium, "stone", 1, false);
ToolAPI.registerBlockMaterial(BlockID.blockEthaxium, "stone", 1, false);

(function(){
    let addColor = function(id, color){
        Item.registerNameOverrideFunction(id, function(item, name){
            name = color + name;
            return name;
        });
    }
    addColor(BlockID.blockAbyssalnite, Native.Color.DARK_AQUA);
    addColor(BlockID.blockRefinedCoralium, Native.Color.AQUA);
    addColor(BlockID.blockDreadium, Native.Color.DARK_RED);
    addColor(BlockID.blockEthaxium, Native.Color.AQUA);
})();

//TODO crafts