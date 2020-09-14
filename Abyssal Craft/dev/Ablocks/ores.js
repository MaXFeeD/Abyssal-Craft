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

Callback.addCallback("GenerateChunkUnderground", function(chunkX, chunkZ, random){ 
UniqueGen.generateOre(BlockID.Etx, 0, chunkX, chunkZ, random, { 
veinCounts: 6, 
minY: 12, 
maxY: 48,  
size: randomInt(1, 4)
}); 
});


Callback.addCallback("GenerateChunkUnderground", function(chunkX, chunkZ, random){ 
UniqueGen.generateOre(BlockID.oreAbyssalinite, 0, chunkX, chunkZ, random, { 
veinCounts: 8,  
minY: 4, 
maxY: 32,  
size: randomInt(1, 5)
}); 
});
  
 
Callback.addCallback("GenerateChunkUnderground", function(chunkX, chunkZ, random){ 
if(World.getBiome(chunkX, chunkZ) == 134 || World.getBiome(chunkX, chunkZ) == CoralSwamp.id || World.getBiome(chunkX, chunkZ) == 6)
UniqueGen.generateOre(BlockID.oreCoral, 0, chunkX, chunkZ, random, { 
veinCounts: 8,  
minY: 4, 
maxY: 48,  
size: randomInt(1, 5)
}); 
});


Callback.addCallback("GenerateChunkUnderground", function(chunkX, chunkZ, random){
if(World.getBiome(chunkX, chunkZ) == 134 || World.getBiome(chunkX, chunkZ) == CoralSwamp.id || World.getBiome(chunkX, chunkZ) == 6)
UniqueGen.generateOre(BlockID.oreCoralInfused, 0, chunkX, chunkZ, random, { 
veinCounts: 7, 
minY: 3, 
maxY: 44,  
size: randomInt(1, 4)    
}); 
});


Callback.addCallback("GenerateChunkUnderground", function(chunkX, chunkZ, random){ 
UniqueGen.generateOre(BlockID.oreNitre, 0, chunkX, chunkZ, random, { 
veinCounts: 8, 
minY: 10, 
maxY: 48,  
size: randomInt(1, 5)    
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