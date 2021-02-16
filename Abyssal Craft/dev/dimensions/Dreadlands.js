const Dreadlands = new Dimensions.CustomDimension("Dreadlands", 1975)
    .setSkyColor(1.78, .34, .34)
    .setFogColor(1.39, 0, 0)
    .setCloudColor(1.39, 0, 0)
    .setGenerator(Dimensions.newGenerator({
        layers: [
            {
                minY: 63, maxY: 70,
                yConversion: [[0, 0]],
                material: {
                    base: BlockID.dreadstone
                }
            },
            {
                minY: 0, maxY: 256,
                yConversion: [
                    [1.5, -.8], [.6, -.4], [0, .92],
                    [.5, -.4], [1.5, -1]
                ],
                material: {
                    base: BlockID.dreadstone,
                    surface: {
                        id: BlockID.dreadlandsDirt, 
                        data: 0, 
                        width: 4
                    },
                    cover: BlockID.dreadlandsGrass
                },
                noise: {
                    octaves: {
                        count: 3, 
                        scale: 85
                    }
                }
            },
            {
                minY: 0, maxY: 1,
                yConversion: [[0, 0]],
                material: {
                    base: 7
                }
            }
        ]
    }));

PortalUtils.newPortalBlock("dreadlands", ["dreadlands", 0], BlockID.dreadlands, {type: "v-plane", frameId: BlockID.dreadstone}, Dreadlands.id, false);

Block.registerEntityInsideFunctionForID(BlockID.dreadlands, function(coords, block, entity){
    let pos = Entity.getPosition(entity);
    if(Math.abs(blockCoords.x - pos.x) <= 0.5 && 
    Math.abs(blockCoords.y - pos.y) <= 0.5 &&
    Math.abs(blockCoords.z - pos.z) <= 0.5){
        java.lang.Thread.sleep(4000);
        if(Entity.getDimension(entity) !== Dreadlands.id){
            Dimensions.transfer(entity, Dreadlands.id);
        } else Dimensions.transfer(entity, 0);
    }
});

PortalUtils.newPortalBlock("dreadlands", ["dreadlands", 0], BlockID.dreadlands, {type: "v-plane", frameId: BlockID.dreadstone}, Dreadlands.id, false);

const DreadlandsPortalShape = new PortalShape();
DreadlandsPortalShape.setPortalId(BlockID.dreadlands);
DreadlandsPortalShape.setFrameIds(BlockID.dreadstone);
DreadlandsPortalShape.setMinSize(2, 3);

Callback.addCallback("DestroyBlock", function(coords, block, player){
    if(block.id == BlockID.dreadstone || block.id == BlockID.dreadlands){
        DimensionHelper.eliminateIncorrectPlacedPortals(coords, BlockID.dreadlands, [BlockID.dreadstone]);
    }
});

Callback.addCallback("CustomDimensionTransfer", function(player, from, to){
    if(to == Dreadlands.id){
        let region = BlockSource.getDefaultForDimension(Dreadlands.id);
        let pos = Entity.getPosition(player);
        pos = GenerationUtils.findSurface(pos.x, 92, pos.z);
        Updatable.addUpdatable({
            age: 0,
            update: function(){
                Entity.setPosition(player, pos.x, pos.y + 2, pos.z);
                this.remove = this.age++ > 5;
            }
        });
    }
});

//wtf is saver scope

Callback.addCallback("GenerateCustomDimensionChunk", function(chunkX, chunkZ, random, dimensionId){
    if(dimensionId == Dreadlands.id){
        UniqueGen.generateOreInDimension(BlockID.oreDreadlandsAbyssalnite, 0, chunkX, chunkZ, random, {
            veinCounts: 7,
            minY: 10,
            maxY: 58,
            size: randomInt(1, 5),
            mode: true,
            check: [BlockID.dreadstone]
        });
        UniqueGen.generateOreInDimension(BlockID.oreDreadedAbyssalnite, 0, chunkX, chunkZ, random, {
            veinCounts: 5,
            minY: 10,
            maxY: 40,
            size: randomInt(1, 3),
            mode: true,
            check: [BlockID.dreadstone]
        });
    }
});

//TODO structures