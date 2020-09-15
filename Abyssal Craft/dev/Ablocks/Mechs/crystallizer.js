IDRegistry.genBlockID("ACrystallizer");
Block.createBlock("ACrystallizer", [
    {name: "Crystallizer", texture: [
        ["crystallizer_top", 0],
        ["crystallizer_top", 0],
        ["crystallizer_side", 0],
        ["crystallizer_front_off", 0],
        ["crystallizer_side", 0],
        ["crystallizer_side", 0]
    ], inCreative: true}
]);
TileRenderer.setStandartModel(BlockID.ACrystallizer, [
    ["crystallizer_top", 0],
    ["crystallizer_top", 0],
    ["crystallizer_side", 0],
    ["crystallizer_front_off", 0],
    ["crystallizer_side", 0],
    ["crystallizer_side", 0]
]);
TileRenderer.registerRotationModel(BlockID.ACrystallizer, 0, [
    ["crystallizer_top", 0],
    ["crystallizer_top", 0],
    ["crystallizer_side", 0],
    ["crystallizer_front_off", 0],
    ["crystallizer_side", 0],
    ["crystallizer_side", 0]
]);
TileRenderer.registerRotationModel(BlockID.ACrystallizer, 4, [
    ["crystallizer_top", 0],
    ["crystallizer_top", 0],
    ["crystallizer_side", 0],
    ["crystallizer_front_on", 0],
    ["crystallizer_side", 0],
    ["crystallizer_side", 0]
]);

Callback.addCallback("PostLoaded", function(){
    Recipes.addShaped({id: BlockID.ACrystallizer, count: 1, data: 0}, [
        "bbb",
        "dfd",
        "bbb"
    ], ["b", BlockID.stoneDBRi, 0, 'd', BlockID.blockDreadalinite, 0, 'f', 61, 0]);
});

function CResultSlotClicker(slotName){
    return {
        onClick: function(container, tile){
            let slot = container.getSlot(slotName);
            if(slot.id > 0){
                Player.addItemToInventory(slot.id, 1, slot.data);
                slot.count--;
                container.validateSlot(slotName);
            }
            if(tile.data.exp > 0){
                if(tile.data.exp < 1){
                    if(Math.random() <= tile.data.exp){
                        Player.addExperience(5);
                    }
                    tile.data.exp = 0;
                } else {
                    Player.addExperience(Math.round(tile.data.exp)*5);
                    tile.data.exp = 0;
                }
            }
        },
        onLongClick: function(container, tile){
            let slot = container.getSlot(slotName);
            if(slot.id > 0){
                Player.addItemToInventory(slot.id, slot.count, slot.data);
                container.clearSlot(slotName);
            }
            if(tile.data.exp > 0){
                if(tile.data.exp < 1){
                    if(Math.random() <= tile.data.exp){
                        Player.addExperience(5);
                    }
                    tile.data.exp = 0;
                } else {
                    Player.addExperience(Math.round(tile.data.exp)*5);
                    tile.data.exp = 0;
                }
            }
        }
    }
};

const crystallizerElements = {
    "textHeader": {
        type: "text", x: 500, y: 47,
        width: 200, height: 40,
        font: {color: Color.WHITE, size: 25, alignment: UI.Font.ALIGN_CENTER},
        //Color is android.graphics.Color exported by TextureWorker lib +_+
        text: Translation.translate("Crystallizer")
    },
    "textInventory": {
        type: "text", x: 244, y: 224,
        width: 160, height: 35,
        font: {color: Color.WHITE, size: 25},
        text: Translation.translate("Inventory")
    },
    "scaleBurn": {
        type: "scale", x: 405, y: 117, scale: 24/7,
        direction: 1, value: 0.5,
        bitmap: "crystallizer_burn_scale"
    },
    "scaleProgress": {
        type: "scale", x: 473, y: 117, scale: 3,
        direction: 0, value: 0.5,
        bitmap: "crystallizer_progress_scale"
    },
    "slotFuel": {
        type: "slot", x: 401, y: 168, size: 54,
        isValid: function(id){ return Crystallizer.isValidFuel(id); },
        isTransparentBackground: true
    },
    "slotSource": {
        type: "slot", x: 401, y: 60, size: 54,
        isValid: function(id, count, data){ return Crystallizer.isValidRecipe({id: id, data: data}); },
        isTransparentBackground: true
    },
    "slotResult1": {
        type: "slot", x: 578, y: 113, size: 54,
        isValid: function(){ return false; },
        clicker: CResultSlotClicker("slotResult1"),
        isTransparentBackground: true
    },
    "slotResult2": {
        type: "slot", x: 632, y: 113, size: 54,
        clicker: CResultSlotClicker("slotResult2"),
        isValid: function(){ return false; },
        isTransparentBackground: true
    }
}
for(let i=0; i<9; i++){
    crystallizerElements["slotInv"+i] = {
        type: "invSlot", x: 257+i*54, y: 434, size: 54, index: i
    }
}
for(let i=9; i<36; i++){
    crystallizerElements["slotInv"+i] = {
        type: "invSlot", x: 257+(i%9)*54, y: 260+Math.floor(i/9)*54, size: 54, index: i
    }
}

const guiACrystallizer = new UI.Window({
    location: {
        x: 0,
        y: 0,
        width: 1000,
        height: 520
    },
    params: {},
    drawing: [
        {type: "background", color: android.graphics.Color.argb(90, 0, 0, 0)},
        {type: "bitmap", x: 236, y: 12, bitmap: "crystallizer_window", scale: 2.5}//+7+3
    ],
    elements: crystallizerElements
});

function crSlotsEquality(result, slot1, slot2){
    return (slot1.id == result[0][0] && (!result[0][2] || slot1.data == result[0][2]) && slot1.count <= 64 - result[0][1] || slot1.id == 0) &&
    result[1] ? (slot2.id == result[1][0] && (!result[1][2] || slot2.data == result[1][2]) && slot2.count <= 64 - result[1][1] || slot2.id == 0) : true;
}

Crystallizer.addFuels([
    [369, 2400],
    [377, 1200],
    [ItemID.dreadPeace, 1000],
    [ItemID.dreadChunck, 1600],
    [ItemID.dreadFragment, 100],
    [ItemID.AMethane, 10000]
]);

Crystallizer.addRecipes([
    [ItemID.nitrePeace, 0], [[ItemID.ACrystalPotassium, 1, 0], [ItemID.ACrystalNitrate, 1, 0]], 0.1
]);

AbyssalMachine.init(BlockID.ACrystallizer, {
    defaultValues: {
        progress: 0,//smelting progress 0-1
        worktime: 200,//machine smelts one item for 10 seconds -> 200 ticks
        exp: 0,//experience value in tile
        isActive: false,//is machine active
        burn: 0,//how many ticks the fuel is burning already
        burnMax: 0//how many ticks burns the fuel that is in tile at the moment
    },
    getGuiScreen: function(){
        return guiACrystallizer;
    },
    burnFuel: function(slotName){
        let fuelSlot = this.container.getSlot(slotName);
        if(fuelSlot.id > 0){
            let dur = Crystallizer.isValidFuel(fuelSlot.id);
            if(dur > 0){
                fuelSlot.count--;
                this.container.validateSlot(slotName);
                return dur;
            }
        }
        return 0;
    },
    tick: function(){
        let newActive = false;
        let src = this.container.getSlot("slotSource");
        let result = Crystallizer.getRecipeResult(src.id, src.data);
        this.burnFuel("slotFuel");
        if(this.data.burn <= 0){
            this.data.burn = this.data.burnMax = this.burnFuel("slotFuel");
        }
        if(this.data.burn > 0){
            burn--;
            if(!this.data.isActive) this.activate();
        } else this.deactivate();
        if(result !== -1 && (src.count >= result.result[0][1] || !result.result[0][1])){
            let result1 = this.container.getSlot("slotResult1");
            let result2 = this.container.getSlot("slotResult2");
            if(crSlotsEquality(result.result, result1, result2)){
                if(this.data.burn > 0){
                    this.data.progress += 1/this.data.worktime;
                    newActive = true;
                }
                if(this.data.progress.toFixed(3) >= 0){
                    src.count -= 1;
                    result1.id = result.result[0][0];
                    result1.data = result.result[0][2];
                    result.count += result.result[0][1];
                    if(result.result[1]){
                        result2.id = result.result[1][0];
                        result2.data = result.result[1][2];
                        result2.count += result.result[1][1];
                    }
                    this.data.exp += result.exp;
                    this.container.validateAll();
                    this.data.progress = 0;
                }
            }
        } else { this.data.progress = 0; }
        if(!newActive){ this.data.isActive = newActive };
        this.container.setScale("scaleBurn", this.data.burn / this.data.burnMax);
        this.container.setScale("scaleProgress", this.data.progress);
    }
});