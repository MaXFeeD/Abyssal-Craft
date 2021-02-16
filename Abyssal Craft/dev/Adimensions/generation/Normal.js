// //TODO REMAKE
// //Structures

// //shoggothN = new DungeonAPI("shoggoth1.json");
// var dungeonDO = new Structure("Dark1");
// var dungeonDT = new Structure("Dark2");
// var dungeonDTH = new Structure("Dark3");
// var dungeonDFI = new Structure("Dark5");
// Callback.addCallback("GenerateChunk", function(chunkX, chunkZ, random) {
// var coords = GenerationUtils.randomCoords(chunkX, chunkZ);
//  coords = GenerationUtils.findSurface(coords.x, 95, coords.z);
//  var Biome = World.getBiome(coords.x, coords.z);
//   let regi = BlockSource.getCurrentWorldGenRegion();
// if(coords.y < 54) return;
 
//  if (Biome == DarkLand.id && random.nextFloat() < .01) {
//   if (World.getBlockID(coords.x, coords.y, coords.z) == BlockID.grassDark)
// dungeonDO.build(coords.x, coords.y + 1, coords.z, Structure.ROTATE_Y, random, regi); 
//    }

// if (Biome == DarkLand.id && random.nextFloat() < .004) {
//   if (World.getBlockID(coords.x, coords.y, coords.z) == BlockID.grassDark)
// dungeonDTH.build(coords.x, coords.y + 1, coords.z, Structure.ROTATE_Y, random, regi); 
//    }

// if (Biome == DarkLand.id && random.nextFloat() < .003) {
//   if (World.getBlockID(coords.x, coords.y, coords.z) == BlockID.grassDark)
// dungeonDFI.build(coords.x, coords.y + 1, coords.z, Structure.ROTATE_Y, random, regi); 
//    }

// if (Biome == DarkHills.id && random.nextFloat() < .006) {
//   if (World.getBlockID(coords.x, coords.y, coords.z) == BlockID.stoneDark)
// dungeonDT.build(coords.x, coords.y + 1, coords.z, Structure.ROTATE_Y, random, regi); 
//    }

// if (Biome == DarkLand.id && random.nextFloat() < .006) {
//   if (World.getBlockID(coords.x, coords.y, coords.z) == BlockID.grassDark)
// darkN.build(coords.x, coords.y + 1, coords.z, Structure.ROTATE_Y, random, regi); 
//    }

// if (Biome == DarkLand.id && random.nextFloat() < .85) {
//   if (World.getBlockID(coords.x, coords.y, coords.z) == BlockID.grassDark)
// darkC.build(coords.x, coords.y + 1, coords.z, Structure.ROTATE_Y, random, regi); 
//    }

// if (Biome == CoralSwamp.id && random.nextFloat() < .4 || Biome == 134 && random.nextFloat() < .25) {
//  if (World.getBlockID(coords.x,coords.y,coords.z) == 9 || World.getBlockID(coords.x,coords.y,coords.z) == 8) {
// shoggothM.build(coords.x, coords.y + 1, coords.z, Structure.ROTATE_Y, random, regi);
// shoggothS.build(coords.x, coords.y + 1, coords.z, Structure.ROTATE_Y, random, regi);
//         } 
//     }

// });