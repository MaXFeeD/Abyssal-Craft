IDRegistry.genBlockID("abyssalRitualAltar");
IDRegistry.genBlockID("abyssalRitualAltarPedestal");

Block.createBlock("abyssalRitualAltar", [
    {name: "Ritual Altar", texture: [["cobblestone", 0]], inCreative: false},
    {name: "Ritual Altar", texture: [["darkstone_cobblestone", 0]], inCreative: false},
    {name: "Ritual Altar", texture: [["abyssal_cobblestone", 0]], inCreative: false},
    {name: "Ritual Altar", texture: [["coralium_cobblestone", 0]], inCreative: false},
    {name: "Ritual Altar", texture: [["dreadstone_cobblestone", 0]], inCreative: false},
    {name: "Ritual Altar", texture: [["abyssalnite_cobblestone", 0]], inCreative: false},
    {name: "Ritual Altar", texture: [["ethaxium_bricks", 0]], inCreative: false},
    {name: "Ritual Altar", texture: [["dark_ethaxium_bricks", 0]], inCreative: false}
]);
Block.createBlock("abyssalRitualAltarPedestal", [
    {name: "Ritual Pedestal", texture: [["cobblestone", 0]], inCreative: false},
    {name: "Ritual Pedestal", texture: [["darkstone_cobblestone", 0]], inCreative: false},
    {name: "Ritual Pedestal", texture: [["abyssal_cobblestone", 0]], inCreative: false},
    {name: "Ritual Pedestal", texture: [["coralium_cobblestone", 0]], inCreative: false},
    {name: "Ritual Pedestal", texture: [["dreadstone_cobblestone", 0]], inCreative: false},
    {name: "Ritual Pedestal", texture: [["abyssalnite_cobblestone", 0]], inCreative: false},
    {name: "Ritual Pedestal", texture: [["ethaxium_bricks", 0]], inCreative: false},
    {name: "Ritual Pedestal", texture: [["dark_ethaxium_bricks", 0]], inCreative: false}
]);

ToolAPI.registerBlockMaterial(BlockID.abyssalRitualAltar, "stone", 1, false);
ToolAPI.registerBlockMaterial(BlockID.abyssalRitualAltarPedestal, "stone", 1, false);

Block.setShape(BlockID.abyssalRitualAltar, 5/32, 0, 5/32, 27/32, 0, 27/32);
Block.setShape(BlockID.abyssalRitualAltarPedestal, 4/16, 0, 4/16, 12/16, 1, 12/16)

(function(){
    const altar_boxes = [
        [2.5, 0, 2.5, 13.5, 2, 13.5],
        [3, 2, 3, 13, 3, 13],
        [5, 3, 5, 11, 11, 11],
        [4.5, 6, 4.5, 11.5, 8, 11.5],
        [4, 3, 11, 5, 11, 12],
        [11, 3, 11, 12, 11, 12],
        [4, 3, 4, 5, 11, 5],
        [11, 3, 4, 12, 11, 5],
        [3, 11, 3, 13, 12, 13],
        [2.5, 12, 2.5, 13.5, 13, 13.5]
    ];
    const pedestal_boxes = [
        [4, 0, 4, 12, 2, 12],
        [4.5, 2, 4.5, 11.5, 3, 11.5],
        [5.5, 3, 5.5, 10.5, 13, 10.5],
        [5, 3, 10, 6, 13, 11],
        [10, 3, 10, 11, 13, 11],
        [5, 3, 5, 6, 13, 6],
        [10, 3, 5, 11, 13, 6],
        [4.5, 13, 4.5, 11.5, 14, 11.5],
        [4, 15, 4, 5, 16, 5],
        [4, 15, 11, 5, 16, 12],
        [11, 15, 4, 12, 16, 5],
        [11, 15, 11, 12, 16, 12],
        [7.5, 15, 4, 8.5, 16, 5],
        [4, 15, 7.5, 5, 16, 8.5],
        [7.5, 15, 11, 8.5, 16, 12],
        [11, 15, 7.5, 12, 16, 8.5]
    ];
    let makeRenders = function(data, texture){
        const renderAltar = new ICRender.Model();
        const modelAltar = new BlockRenderer.Model();
        for(let i in altar_boxes){
            let box = altar_boxes[i];
            modelAltar.addBox(box[0] / 16, box[1] / 16, box[2] / 16, box[3] / 16, box[4] / 16, box[5] / 16, texture, 0);
        }
        modelAltar.addBox(5/16, 13/16, 5/16, 11/16, 14/16, 11/16, "altar_upper_" + texture, 0);
        modelAltar.addBox(7/32, 13/16, 7/32, 9/32, 1, 9/32, [["altar_candle_side", 0], ["altar_candle_top", 0], ["altar_candle_side", 0]]);
        modelAltar.addBox(7/32, 13/16, 23/32, 9/32, 1, 25/32, [["altar_candle_side", 0], ["altar_candle_top", 0], ["altar_candle_side", 0]]);
        modelAltar.addBox(23/32, 13/16, 7/32, 25/32, 1, 9/32, [["altar_candle_side", 0], ["altar_candle_top", 0], ["altar_candle_side", 0]]);
        modelAltar.addBox(23/32, 13/16, 23/32, 25/32, 1, 25/32, [["altar_candle_side", 0], ["altar_candle_top", 0], ["altar_candle_side", 0]]);
        renderAltar.addEntry(modelAltar);
        BlockRenderer.setStaticICRender(BlockID.abyssalRitualAltar, data, renderAltar);
        ItemModel.getFor(BlockID.abyssalRitualAltar, data).setModel(renderAltar);
        const renderPedestal = new ICRender.Model();
        const modelPedestal = new BlockRenderer.Model();
        for(let i in pedestal_boxes){
            let box = pedestal_boxes[i];
            modelPedestal.addBox(box[0] / 16, box[1] / 16, box[2] / 16, box[3] / 16, box[4] / 16, box[5] / 16, texture, 0);
        }
        modelPedestal.addBox(4/16, 14/16, 4/16, 12/16, 15/16, 12/16, [[texture, 0], ["altar_pedestal_upper_" + texture], [texture, 0]]);
        renderPedestal.addEntry(modelPedestal);
        BlockRenderer.setStaticICRender(BlockID.abyssalRitualAltarPedestal, data, renderPedestal);
        ItemModel.getFor(BlockID.abyssalRitualAltarPedestal, data).setModel(renderPedestal);
    }
    makeRenders(0, "cobblestone");
    makeRenders(1, "darkstone_cobblestone");
    makeRenders(2, "abyssal_cobblestone");
    makeRenders(3, "coralium_cobblestone");
    makeRenders(4, "dreadstone_cobblestone");
    makeRenders(5, "abyssalnite_cobblestone");
    makeRenders(6, "ethaxium_bricks");
    makeRenders(7, "dark_ethaxium_bricks");
})();

TileEntity.registerPrototype(BlockID.abyssalRitualAltar, /**@type {TileEntity.TileEntityPrototype} */ {
    useNetworkItemContainer: true,
    defaultValues: {
        rotation: [0, 0, 0],
        coords: null,
        step: null,
        onCraftStart: {},
        onCraftEnd: {}
    },
    getTransportSlots: function(){
        return {input: ["slot"]}
    },
    created: function(){
        this.data.coords = [
            [this.x + 3, this.z],
            [this.x + 3, this.z + 1],
            [this.x + 2, this.z + 2],
            [this.x + 1, this.z + 3],
            [this.x, this.z + 3],
            [this.x - 1, this.z + 3],
            [this.x - 2, this.z + 2],
            [this.x - 3, this.z + 1],
            [this.x - 3, this.z],
            [this.x - 3, this.z - 1],
            [this.x - 2, this.z - 2],
            [this.x - 1, this.z - 3],
            [this.x, this.z - 3],
            [this.x + 1, this.z - 3],
            [this.x + 2, this.z - 2],
            [this.x + 3, this.z - 1]
        ]
    },
    client: {
        updateModel: function(){
            let id = Network.serverToLocalId(this.networkData.getInt("animId"));
            let data = this.networkData.getInt("animData");
            this.model.describeItem({
                id: id, count: 1, data: data, size: .5 + 1 / 16,
                rotation: [Math.PI / 2, 0, 0]
            });
        },
        load: function(){
            this.model = new Animation.Item(this.x + .5, this.y + .875, this.z + .5);
            this.updateModel();
            this.model.load();
            let that = this;
            this.networkData.addOnDataChangedListener(function(networkData, isExternalChange){
                that.updateModel();
            });
        },
        unload: function(){
            this.model.destroy();
        },
    },
    setSlot: function(slot, id, count, data, extra){
        this.container.setSlot(slot, id, count, data, typeof extra !== "undefined" ? extra : null);
        this.container.sendChanges();
    },
    click: function(id, count, data, coords){
        if(this.data.step) return;
        let pillars = [];
        let players = Network.getConnectedPlayers();
        for(let i in players){
            let player = players[i];
            if(Necronomicons.isNecronomicon(id) && Entity.getSneaking(player)){
                let thisSlot = this.container.getSlot("slot");
                for(let i in this.data.coords){
                    let xx = this.data.coords[i][0],
                        zz = this.data.coords[i][1];
                    if(this.blockSource.getBlockId(xx, this.y, zz) == BlockID.abyssalRitualAltarPedestal){
                        let tile = TileEntity.getTileEntity(xx, this.y, zz, this.blockSource);
                        if(!tile) tile = TileEntity.addTileEntity(xx, this.y, zz, this.blockSource);
                        if(tile && tile.container.getSlot("slot").id != 0) pillars.push(this.data.coords[i]);
                    }
                }
                if(thisSlot.id == 0 || pillars.length == 0) return;
                let CraftingItems = {};
                for(let i in RitualAltar.Crafts){
                    CraftingItems[RitualAltar.Crafts[i].result.toString()] = {};
                    for(let k in RitualAltar.Crafts[i].items){
                        if(CraftingItems[RitualAltar.Crafts[i].result.toString()][RitualAltar.Crafts[i].items[k].toString()]){
                            CraftingItems[RitualAltar.Crafts[i].result.toString()][RitualAltar.Crafts[i].items[k].toString()]++;
                        } else CraftingItems[RitualAltar.Crafts[i].result.toString()][RitualAltar.Crafts[i].items[k].toString()] = 1;
                    }
                    CraftingItems[RitualAltar.Crafts[i].result.toString()].centre = RitualAltar.Crafts[i].centre.toString();
                }
                let itemsInPillars = {};
                for(let i in pillars){
                    let tile = TileEntity.getTileEntity(pillars[i][0], this.y, pillars[i][1], this.blockSource);
                    let item = tile.container.getSlot("slot");
                    if(itemsInPillars[item.id + "," + item.data]){
                        itemsInPillars[item.id + "," + item.data]++;
                    } else itemsInPillars[item.id + "," + item.data] = 1;
                }
                let centreItem = thisSlot.id + "," + thisSlot.data;
                let result = 0;
                for(let l in CraftingItems){
                    result = 0;
                    for(let i in items){
                        if(centreItem != CraftingItems[l].centre || JSONlength(itemsInPillars) != JSONlength(CraftingItems[l]) - 1 ||
                            !CraftingItems[l][i] || itemsInPillars[i] != CraftingItems[l][i]) continue;
                        result++;
                        if(result == JSONlength(itemsInPillars) || typeof result === "string"){
                            result = l; break;
                        }
                    }
                    if(result == JSONlength(itemsInPillars) || typeof result === "string") break;
                }
                if(typeof result === "string"){
                    if(this.data.onCraftStart[result] && onCraftStart[result]({
                        x: this.x, y: this.y, z: this.z
                    }) == "stop") return;
                    for(let i in pillars){
                        pillars[i] = pillars[i][0] + ";" + pillars[i][1];
                    }
                    pillars = pillars.toString();
                    this.data.step = {
                        pillars: pillars,
                        result: result
                    }
                    pillars = pillars.split(",");
                    for(let i in pillars){
                        pillars[i] = pillars[i].split(",");
                        pillars[i][0] = parseInt(pillars[i][0]);
                        pillars[i][1] = parseInt(pillars[i][1]);
                    }
                    let that = this;
                    RitualAltar.asd(pillars, 0, that, 0, function(){
                        result = result.split(",");
                        if(result[0] == ItemID.sacthothsSoulReaper && that.blockSource.getDimension() == Omothol.id){
                            let ent = that.blockSource.spawnEntity(that.x + .5, that.y + 1, that.z + .5, "abyss:sacthoth");
                            elder_boss.play();/**@todo REMAKE SOUND */
                        } else {
                            let ent = that.blockSource.spawnEntity(that.x, that.y + 1, that.z, 93);
                            elder_screams.play();/**@todo REMAKE SOUND */
                        }
                        if(that.container.getSlot("slot").count > 1){
                            onCallback("EntityRemoved", function(entity){
                                if(entity == ent){
                                    that.blockSource.spawnDroppedItem(that.x + .5, that.y + 1, that.z + .5, result[0], 1, result[1]);
                                    return "delete";
                                }
                            });
                            let sl = that.container.getSlot("slot");
                            that.container.setSlot("slot", sl.id, sl.count - 1, sl.data, sl.extra);
                            that.container.sendChanges();
                        } else {
                            that.container.setSlot("slot", result[0], 1, result[1]);
                            that.container.sendChanges();
                        }
                        that.data.step = null;
                        if(that.data.onCraftEnd[result.toString()]) that.data.onCraftEnd[result.toString()]({x: that.x, y: that.y, z: that.z});
                    });
                }; return;
            } else if(this.container.getSlot("slot").id == 0){
                Game.prevent();
                let item = Entity.getCarriedItem(player);
                if(item.id == 0) return;
                this.setSlot("slot", item.id, 1, item.data, item.extra);
                Entity.setCarriedItem(player, item.id, item.count - 1, item.data, item.extra);
            } else {
                Game.prevent();
                let slot = this.container.getSlot("slot");
                this.blockSource.spawnDroppedItem(this.x + .5, this.y + 1, this.z + .5, slot.id, slot.count, slot.data, slot.extra);
                this.setSlot("slot", 0, 0, 0);
            }
        }
    },
    tick: function(){
        let item = this.container.getSlot("slot");
        this.networkData.putInt("animId", item.id);
        this.networkData.putInt("animData", item.data);
        this.networkData.sendChanges();
    },
    load: function(){
        if(this.data.step){
            if(!this.data.step.i) return;
            let that = this;
            let pillars = this.data.step.pillars.split(",");
            for(let i in pillars){
                pillars[i] = pillars[i].split(";");
                pillars[i][0] = parseInt(pillars[i][0]);
                pillars[i][1] = parseInt(pillars[i][1]);
            }
            RitualAltar.asd(pillars, this.data.step.i, this, 0, function(){
                elder_screams.play();/**@todo REMAKE SOUND */
                let result = that.data.step.result.split(",");
                let ent = that.blockSource.spawnEntity(that.x, that.y + 1, that.z, 93);
                if(that.container.getSlot("slot").count > 1){
                    onCallback("EntityRemoved", function(entity){
                        if(entity == ent){
                            that.blockSource.spawnDroppedItem(that.x + .5, that.y + 1, that.z + .5, result[0], 1, result[1]);
                            return "delete";
                        }
                    });
                    let sl = that.container.getSlot("slot");
                    that.container.setSlot("slot", sl.id, sl.count - 1, sl.data, sl.extra);
                    that.container.sendChanges();
                } else {
                    that.setSlot("slot", result[0], 1, result[1]);
                }
                that.data.step = null;
                if(that.data.onCraftEnd[result.toString()]) that.data.onCraftEnd[result.toString()]({x: that.x, y: that.y, z: that.z});
            });
        }
    }
});

Block.setRandomTickCallback(BlockID.abyssalRitualAltarPedestal, function(x, y, z, id, data, region){
    RitualAltar.pillarParticles(x, y, z, region);
});

TileEntity.registerPrototype(BlockID.abyssalRitualAltarPedestal, {
    useNetworkItemContainer: true,
    defaultValues: {
        rotation: [0, 0, 0],
        lastID: 0,
        lastData: 0
    },
    getTransportSlots: function(){
        return {
            input: ["slot"]
        }
    },
    client: {
        updateModel: function(){
            let id = Network.serverToLocalId(this.networkData, getInt("animId"));
            let data = this.networkData.getInt("animData");
            this.model.describeItem({
                id: id, count: 1, data: data, size: .4 + 1/16, rotation: [Math.PI / 2, 0, 0]
            });
        },
        load: function(){
            this.model = new Animation.Item(this.x + .5, this.y + .975, this.z + .5);
            this.updateModel();
            this.model.load();
            let that = this;
            this.networkData.addOnDataChangedListener(function(networkData, isExternalChange){
                that.updateModel();
            });
        },
        unload: function(){
            this.model.destroy();
        }
    },
    setSlot: function(slot, id, count, data, extra){
        this.container.setSlot(slot, id, count, data, typeof extra !== "undefined" ? extra : null);
        this.container.sendChanges();
    },
    click: function(id, count, data, coords, player, extra){
        Game.prevent();
        if(this.container.getSlot("slot").id == 0){
            let item = Entity.getCarriedItem(player);
            if(item.id == 0) return;
            this.setSlot("slot", item.id, 1, item.data, item.extra);
            this.container.sendChanges();
            Entity.setCarriedItem(player, item.id, item.count - 1, item.data, item.extra);
        } else {
            let slot = this.container.getSlot("slot");
            this.blockSource.spawnDroppedItem(this.x + .5, this.y + 1, this.z + .5, slot.id, slot.count, slot.data, slot.extra);
            this.setSlot("slot", 0, 0, 0, null);
            this.container.sendChanges();
        }
    },
    tick: function(){
        let item = this.container.getSlot("slot");
        this.data.lastID = item.id;
        this.data.lastData = item.data;
        this.data.rotation = [0, 0, 0];
        if(all_items.indexOf(item.id) !== -1) this.data.rotation = [Math.PI / 2, Math.PI, 0];
        this.networkData.putInt("animId", item.id);
        this.networkData.putInt("animData", item.data);
    }
});