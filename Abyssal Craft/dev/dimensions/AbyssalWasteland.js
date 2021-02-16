const AbyssalWasteland = new Dimensions.CustomDimension("Abyssal Wasteland", 1974)
    .setSkyColor(0, 2.55, 2.55)
    .setFogColor(0, 2.55, 2.55)
    .setCloudColor(0, 2.55, 2.55)
    .setGenerator(Dimensions.newGenerator({
        layers: [
            {
                minY: 42, maxY: 64,
                yConversion: [[0, 0]],
                material: {base: 8}
            },
            {
                minY: 0, maxY: 256,
                yConversion: [
                    [1.5, -0.8],
                    [.6, -.4],
                    [0, .85],
                    [.5, -.5],
                    [1.5, -1]
                ],
                material: {
                    base: BlockID.abyssalStone,
                    surface: {
                        id: BlockID.abyssalSand, data: 0, width: 4
                    },
                    cover: BlockID.fusedAbyssalSand
                },
                noise: {
                    octaves: {
                        count: 3, scale: 126
                    }
                }
            },
            {
                minY: 0, maxY: 1,
                yConversion: [[0, 0]],
                material: {base: 7}
            }
        ]
    }));

PortalUtils.newPortalBlock("abyssalWasteland", ["abyssal_wasteland"], BlockID.abyssalWasteland, {type: "v-plane", frameId: BlockID.abyssalStone}, AbyssalWasteland.id, false);

Block.registerEntityInsideFunctionForID(BlockID.abyssalWasteland, function(blockCoords, block, entity){
    let pos = Entity.getPosition(entity);
    if(Math.abs(blockCoords.x - pos.x) <= 0.5 && 
    Math.abs(blockCoords.y - pos.y) <= 0.5 &&
    Math.abs(blockCoords.z - pos.z) <= 0.5){
        java.lang.Thread.sleep(4000);
        if(Entity.getDimension(entity) !== AbyssalWasteland.id){
            Dimensions.transfer(entity, AbyssalWasteland.id);
        } else Dimensions.transfer(entity, 0);
    }
});

const AbyssalWastelandPortalShape = new PortalShape();
AbyssalWastelandPortalShape.setPortalId(BlockID.abyssalWasteland);
AbyssalWastelandPortalShape.setFrameIds(BlockID.abyssalStone);
AbyssalWastelandPortalShape.setMinSize(2, 3);

Callback.addCallback("DestroyBlock", function(coords, block, player){
    if(block.id == BlockID.abyssalStone || block.id == BlockID.abyssalWasteland){
        DimensionHelper.eliminateIncorrectPlacedPortals(block, BlockID.abyssalWasteland, [BlockID.abyssalStone]);
    }
});

Callback.addCallback("CustomDimensionTransfer", function(entity, from, to){
    if(to == AbyssalWasteland.id){
        // let region = BlockSource.getCurrentWorldGenRegion();
        let region = BlockSource.getDefaultForDimension(to.id);//I think it'll be better
        let pos = Entity.getPosition(entity);
        let surf = GenerationUtils.findSurface(pos.x, 92, pos.z);
        Updatable.addUpdatable({
            age: 0,
            update: function(){
                Entity.setPosition(entity, surf.x, surf.y + 2, surf.z);
                this.remove = this.age++ > 5;
            }
        });
    }
});

//wtf is that saver scope ???

const AbyssalWastelandChain1 = new Structure("abyssalwasteland_chains_1");
const AbyssalWastelandChain2 = new Structure("abyssalwasteland_chains_2");
const AbyssalWastelandDungeon1 = new Structure("abyssalwasteland_dungeon_1");
const AbyssalWastelandDungeon2 = new Structure("abyssalwasteland_dungeon_2");

Callback.addCallback("GenerateCustomDimensionChunk", function(chunkX, chunkZ, random, dimensionId){
    if(dimensionId == AbyssalWasteland.id){
        UniqueGen.generateOreInDimension(BlockID.oreIronAbyssal, 0, chunkX, chunkZ, random, {
            veinCounts: 7,
            minY: 12, maxY: 74,
            size: randomInt(1, 5),
            mode: true,
            check: [BlockID.abyssalStone]
        });
        UniqueGen.generateOreInDimension(BlockID.oreGoldAbyssal, 0, chunkX, chunkZ, random, {
            veinCounts: 7,
            minY: 12, maxY: 67,
            size: randomInt(1, 5),
            mode: true,
            check: [BlockID.abyssalStone]
        });
        UniqueGen.generateOreInDimension(BlockID.oreDiamondAbyssal, 0, chunkX, chunkZ, random, {
            veinCounts: 5,
            minY: 12, maxY: 67,
            size: randomInt(1, 5),
            mode: true,
            check: [BlockID.abyssalStone]
        });
        UniqueGen.generateOreInDimension(BlockID.oreNitreAbyssal, 0, chunkX, chunkZ, random, {
            veinCounts: 8,
            minY: 12, maxY: 64,
            size: randomInt(1, 6),
            mode: true,
            check: [BlockID.abyssalStone]
        });
        UniqueGen.generateOreInDimension(BlockID.oreCoraliumPearlescent, 0, chunkX, chunkZ, random, {
            veinCounts: 7,
            minY: 4, maxY: 56,
            size: randomInt(1, 4),
            mode: true,
            check: [BlockID.abyssalStone]
        });
        let region = BlockSource.getDefaultForDimension(AbyssalWasteland.id);
        let coords = GenerationUtils.randomCoords(chunkX, chunkZ);
        coords = GenerationUtils.findSurface(coords.x, 85, coords.z);
        if(coords.y < 45) return;
        if(random.nextFloat() < .01) AbyssalWastelandChain1.build(coords.x, coords.y + randomInt(2, 26), coords.z, Structure.ROTATE_Y, random, region);
        if(random.nextFloat() < .008) AbyssalWastelandChain2.build(coords.x, coords.y + randomInt(2, 26), coords.z, Structure.ROTATE_Y, random, region);
        if(random.nextFloat() < .05) AbyssalWastelandDungeon1.build(coords.x, coords.y - 5, coords.z, Structure.ROTATE_Y, random, region);
        if(random.nextFloat() < .04) AbyssalWastelandDungeon2.build(coords.x, coords.y - 5, coords.z, Structure.ROTATE_Y, random, region);
    }
});