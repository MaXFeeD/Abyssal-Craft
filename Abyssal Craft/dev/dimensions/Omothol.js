const Omothol = new Dimensions.CustomDimension("Omothol", 1976)
    .setSkyColor(0, 0, 0)
    .setFogColor(0, 0, 0)
    .setCloudColor(0, 0, 0)
    .setGenerator(Dimensions.newGenerator({
        layers: [
            {
                minY: 0, maxY: 256,
                yConversion: [
                    [0, -.8], [.6, -.7], [0, .85],
                    [.3, -.5], [1.5, -1]
                ],
                material: {
                    base: BlockID.omotholStone,
                    surface: {
                        id: BlockID.omotholStone, 
                        data: 0, 
                        width: 4
                    },
                    cover: BlockID.omotholStone
                },
                noise: {
                    octaves: {
                        count: 3, scale: 55
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

PortalUtils.newPortalBlock("omothol", ["omothol", 0], BlockID.omothol, {type: "v-plane", frameId: BlockID.omotholStone}, Omothol.id, false);

Block.registerEntityInsideFunctionForID(BlockID.omothol, function(coords, block, entity){
    let pos = Entity.getPosition(entity);
    if(Math.abs(blockCoords.x - pos.x) <= 0.5 && 
    Math.abs(blockCoords.y - pos.y) <= 0.5 &&
    Math.abs(blockCoords.z - pos.z) <= 0.5){
        java.lang.Thread.sleep(4000);
        if(Entity.getDimension(entity) !== Omothol.id){
            Dimensions.transfer(entity, Omothol.id);
        } else Dimensions.transfer(entity, 0);
    }
});

const OmotholPortalShape = new PortalShape()
OmotholPortalShape.setPortalId(BlockID.omothol);
OmotholPortalShape.setFrameIds(BlockID.omotholStone);
OmotholPortalShape.setMinSize(2, 3);

Callback.addCallback("DestroyBlock", function(coords, block, player){
    if(block.id == BlockID.omotholStone || block.id == BlockID.omothol){
        DimensionHelper.eliminateIncorrectPlacedPortals(coords, BlockID.omothol, [BlockID.omotholStone]);
    }
});

Callback.addCallback("CustomDimensionTransfer", function(entity, from, to){
    if(to == Omothol.id){
        let region = BlockSource.getDefaultForDimension(Omothol.id);
        let pos = Entity.getPosition(entity);
        pos = GenerationUtils.findSurface(pos.x, 92, pos.z);
        Updatable.addUpdatable({
            age: 0,
            update: function(){
                Entity.setPosition(player, pos.x, pos.y + 2, pos.z);
                this.remove = this.age++ > 5;
            }
        })
    }
});