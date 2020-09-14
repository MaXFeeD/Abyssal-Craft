const Builds = ["Dark_Str1"];
const biomes = [1, 4, 27, 155];
const hills = [3, 131, 162, 20];

//Biomes
var CoralSwamp = new CustomBiome("coral_swamp")
//цвет травы(возможно 48D1CC)
.setGrassColor(0x00CED1)
// цвет листвы(возможно 48D1CC)
.setFoliageColor(0x00CED1)
.setCoverBlock(2, 0)
.setSurfaceBlock(1, 0)
.setFillingBlock(3, 0);


Callback.addCallback("GenerateBiomeMap", function(chunkX, chunkZ, rnd, dimensionId, chunkSeed,
worldSeed, dimensionSeed) {
if (dimensionId != 0) {
return;
}
for (var x = chunkX * 16; x < (chunkX + 1) * 16; x++) {
 for (var z = chunkZ; z < (chunkZ + 1) * 16; z++) {
if (World.getBiomeMap(x, z) == 6) {
World.setBiomeMap(x, z, CoralSwamp.id);
            }
        }
    }
});

var DarkLand = new CustomBiome("dark_land")
//цвет травы(возможно 483D8B)
.setGrassColor(0x191970)
// цвет листвы(возможно 483D8B)
.setFoliageColor(0x191970)
.setCoverBlock(BlockID.grassDark, 0)
.setSurfaceBlock(1, 0)
.setFillingBlock(BlockID.stoneDark, 0);

var DarkHills = new CustomBiome("dark_hills")
//цвет травы(возможно 483D8B)
.setGrassColor(0x191970)
// цвет листвы(возможно 483D8B)
.setFoliageColor(0x191970)
.setCoverBlock(BlockID.stoneDark, 0)
.setSurfaceBlock(1, 0)
.setFillingBlock(BlockID.stoneDark, 0);
/*
Callback.addCallback("GenerateBiomeMap", function(chunkX, chunkZ, rnd, dimensionId, chunkSeed,
worldSeed, dimensionSeed){ 
  genrand = new java.util.Random(Math.floor((chunkX/16)) + Math.floor((chunkZ/16)));
 for (var x = chunkX * 16; x < (chunkX + 1) * 16; x++) {
  for (var z = chunkZ; z < (chunkZ + 1) * 16; z++) {   
   for (var i in biomes) {
       if (genrand.nextInt(100) < 75) {   
             World.setBiomeMap(x, z, DarkLand.id); 
              Game.message("X:  " + x + "  Z:  " + z); 
            }
       if (genrand.nextInt(100) < 75) {    
   for (var i in hills) { 
             World.setBiomeMap(x, z, DarkHills.id);  
              Game.message("X:  " + x + "  Z:  " + z); 
                    }    
                }   
            }
        }
    }
});

//Structures
Callback.addCallback("GenerateChunk", function(chunkX, chunkZ){ 
var coords = GenerationUtils.findSurface(chunkX, chunkZ, 57, 98); 
 if (World.getBlockID(coords.x,coords.y,coords.z) == 2 && Math.random() < .12) {
Structure.setInWorld("Dark_Str1", coords.x, coords.y+1, coords.z); 
//Game.message("X: " + coords.x + "Y: " + coords.y+ "Z: " + coords.z);
   } 
if (World.getBiome(coords.x, coords.z) == CoralSwamp.id && Math.random() < .29 || World.getBiome(coords.x, coords.z) == 134 && Math.random() < .18) {
 if (World.getBlockID(coords.x,coords.y,coords.z) == 9) {
  Structure.setInWorld("Dark_Str2", coords.x, coords.y+1, coords.z); 
//Game.message("X: " + coords.x + "Y: " + coords.y+ "Z: " + coords.z);
        } 
    }
});*/