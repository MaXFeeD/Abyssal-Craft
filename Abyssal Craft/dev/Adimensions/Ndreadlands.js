// dungeonO = new Structure("Dungeon1");
// dungeonT = new Structure("Dungeon2");
// Callback.addCallback("GenerateCustomDimensionChunk", function(chunkX, chunkZ, random, dimensionId) {
// if (dimensionId ==  Dreadlands.id) {
//  let regi = BlockSource.getCurrentWorldGenRegion();
//   var coords = GenerationUtils.randomCoords(chunkX, chunkZ);
//  coords = GenerationUtils.findSurface(coords.x, 75, coords.z);
//  if (coords.y < 52) return;
// if (random.nextFloat() < .68) {
//   if (World.getBlockID(coords.x, coords.y, coords.z) == BlockID.grassDread)
// dreadN.build(coords.x, coords.y + 1, coords.z, Structure.ROTATE_Y, random, regi); 
//     }

// if (random.nextFloat() < .64) {
//   if (World.getBlockID(coords.x, coords.y, coords.z) == BlockID.grassDread)
// dreadC.build(coords.x, coords.y + 1, coords.z, Structure.ROTATE_Y, random, regi); 
//     }
// }
// });