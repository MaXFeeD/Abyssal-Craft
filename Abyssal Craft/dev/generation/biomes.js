const BIOME_CORALSWAMP = new CustomBiome("abyssal_coralswamp")
.setGrassColor(0x00FFFF)
.setFoliageColor(0x00FFFF)
.setCoverBlock(2, 0)
.setSurfaceBlock(1, 0)
.setFillingBlock(3, 0);

Callback.addCallback("GenerateBiomeMap", function(chunkX, chunkZ, random, dimensionId, chunkSeed, worldSeed, dimensionSeed){
    if(dimensionId != 0) return;
    let x = Math.floor(chunkX) * 16,
        z = Math.floor(chunkZ) * 16,
        biome = World.getBiomeMap(x + 8, z + 8);
    if(biome != 6 || biome != 134) return;
    if(GenerationUtils.getPerlinNoise(x + 8, y, z + 8, dimensionSeed, 1/256, 2) < .5 - 4 / Math.pow(256, 2)) return;
    for(let xx=0; xx<16; xx++){
        for(let zz=0; zz<16; zz++){
            let noiseValue = GenerationUtils.getPerlinNoise(x + 8, 0, z + 8, dimensionSeed, 1 / 256, 2);
            if(noiseValue > .5) World.setBiome(xx, zz, BIOME_CORALSWAMP.id);
        }
    }
});

const BIOME_DARKLANDS = new CustomBiome("abyssal_darklands")
.setGrassColor(0x191970)
.setFoliageColor(0x191970)
.setCoverBlock(BlockID.darklandsGrass, 0)
.setSurfaceBlock(BlockID.darklandsStone, 0)
.setFillingBlock(1, 0);

const BIOME_DARKHILLS = new CustomBiome("abyssal_darkhills")
.setGrassColor(0x191970)
.setFoliageColor(0x191970)
.setCoverBlock(BlockID.darklandsGrass, 0)
.setSurfaceBlock(BlockID.darklandsStone, 0)
.setFillingBlock(1, 0);

Callback.addCallback("GenerateBiomeMap", function(chunkX, chunkZ, random, dimensionId, chunkSeed, worldSeed, dimensionSeed){
    if(dimensionId != 0) return;
    let x = Math.floor(chunkX) * 16,
        y = Math.floor(chunkZ) * 16,
        biome = World.getBiomeMap(x + 8, y + 8),
        biomes = [1, 4, 27, 155],
        hills = [3, 131, 162, 20];
    for(let i in biomes){
        if(biome = biomes[i]){
            if(GenerationUtils.getPerlinNoise(x + 8, 0, z + 8, dimensionSeed, 1/256, 2) < .58 - 4 / Math.pow(256, 2)) return;
            for(let xx=0; xx<16; xx++){
                for(let zz=0; zz<16; zz++){
                    let noiseValue = GenerationUtils.getPerlinNoise(x + 8, 0, z + 8, dimensionSeed, 1/256, 2);
                    if(noiseValue > .65) World.setBiomeMap(xx, zz, BIOME_DARKLANDS.id);
                }
            }
        }
    }
    for(let i in hills){
        if(biome == hills[i]){
            if(GenerationUtils.getPerlinNoise(x + 8, 0, z + 8, dimensionSeed, 1/256, 2) < .8 - 4 / Math.pow(256, 2)) return;
            for(let xx=0; xx<16; xx++){
                for(let zz=0; zz<16; zz++){
                    let noiseValue = GenerationUtils.getPerlinNoise(x + 8, 0, z + 8, dimensionSeed, 1/256, 2);
                    if(noiseValue > .8) World.setBiomeMap(x, z, BIOME_DARKHILLS.id);
                }
            }
        }
    }
});