//Shoggoth

Callback.addCallback("DestroyBlock", function(coords, block, player){
    if(block.id == BlockID.stoneShoggotB && BlockSource.getDefaultForDimension(1) != null){
        BlockSource.getDefaultForDimension(1).spawnEntity(coords.x + .5, coords.y + .5, coords.z + .5, "abyss:lesser_shoggoth");
    } else if(block.id == BlockID.stoneShoggotB && BlockSource.getDefaultForDimension(0) != null){
        BlockSource.getDefaultForDimension(0).spawnEntity(coords.x + .5, coords.y + .5, coords.z + .5, "abyss:lesser_shoggoth");
    }
});

//Cha'garoth

IDRegistry.genBlockID("chagarothAltarBottom");
Block.createBlock("chagarothAltarBottom", [
    {name: "Altar of Cha\'garoth (bottom)", texture: [["BOD"/**@todo fix this*/, 0]], inCreative: true}
], "opaque");

(function(){
    const mesh = new RenderMesh(__dir__ + "/models/chagaroth_altar_bottom.obj", "obj", {translate: [0.5, 0, 0.5]});
    const render = new ICRender.Model();
    render.addEntry(new BlockRenderer.Model(mesh));
    BlockRenderer.setStaticICRender(BlockID.chagarothAltarBottom, 0, render);
    ItemModel.getFor(BlockID.chagarothAltarBottom, 0).setModel(render);
})();

IDRegistry.genBlockID("chagarothAltarTop");
Block.createBlock("chagarothAltarTop", [
    {name: "Altar of Cha\'garoth (top)", texture: [["BOD"/**@todo fix this */, 0]], inCreative: true}
], "opaque");

(function(){
    const mesh = new RenderMesh(__dir__ + "/models/chagaroth_altar_top.obj", "obj", {translate: [0.5, 0, 0.5]});
    const render = new ICRender.Model();
    render.addEntry(new BlockRenderer.Model(mesh));
    BlockRenderer.setStaticICRender(BlockID.chagarothAltarTop, 0, render);
    ItemModel.getFor(BlockID.chagarothAltarTop, 0).setModel(render);
})();

Callback.addCallback("ItemUse", function(coords, item, block, player){
    if(BlockSource.getDefaultForDimension(Dreadlands.id) != null){
        let region = BlockSource.getDefaultForActor(player);
        let r = coords.relative;
        if(region.getBlockId(r.x, r.y, r.z) == BlockID.chagarothAltarTop &&
        region.getBlockId(r.x, r.y - 1, r.z) == BlockID.chagarothAltarBottom){
            Network.sendServerMessage("Ancient force thicken above gore altar");
            if(World.getThreadTime() % 640 == 0){
                BlockSource.getDefaultForDimension(Dreadlands.id).spawnEntity(coords.x + .5, coords.y + .5, coords.z + .5, "abyss:chagoroth");
            }
        }
    }
});

//J'zahar

const JzaharPhrases = [
    "Player, do you realize I coult simply switch your Gamemode and slaught you right now?",
    "But yeah... that would technically be cheating, so I\'ll just stick to the \"rules\" and do nothing.",
    "Congratulations! YOU \'killed\' this puppet, but you can\'t kill a Great Old One...",
    "Let me unleash the last power contained within this hollow puppet, it\'ll give me the answer"
];

Callback.addCallback("ItemUse", function(coords, item, block, player){
    if(BlockSource.getDefaultForActor(player) == BlockSource.getDefaultForDimension(Omothol.id)){
        BlockSource.getDefaultForDimension(Omothol.id).spawnEntity(coords.x + .5, coords.y, coords.z + .5, "abyss:jzahar");
        Network.sendServerMessage(JzaharPhrases[0]);
        Network.sendServerMessage(JzaharPhrases[1]);
    }
});

Callback.addCallback("EntityDeath", function(entity, attacker, damageType){
    if(!BlockSource.getDefaultForDimension(Omothol.id)) return;
    if(Entity.getType(entity) == JZ.type){
        Network.sendServerMessage(JzaharPhrases[2]);
        if(BlockSource.getDefaultForActor(attacker) == Omothol.id){
            if(World.getThreadTime() % 780 == 0){
                Dimensions.transfer(player, 0);
            }
        }
    }
});