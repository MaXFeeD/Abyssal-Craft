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
veinChance: .38, 
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
veinChance: .5, 
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
veinChance: .35, 
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
veinChance: .35, 
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
veinChance: .40, 
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