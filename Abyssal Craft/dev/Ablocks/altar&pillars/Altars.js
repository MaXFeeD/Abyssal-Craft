var particle_altar = Particles.registerParticleType({
    texture: "AltarParticle",
    size: [.6, 1],
    lifetime: [35, 35],
    render: 2
});

TileEntity.registerPrototype(BlockID.AltarAbyssalC,{
    defaultValues:{
        anim: null,
        rotation: [0, 0, 0],
        coords: null,
        step: null,
        lastid: 0,
        lastdata: 0  
    },
    getTransportSlots: function(){
        return{
            input: ["slot"],
            //output: ["slot"]
       };
    },
    created:function(){ 
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
    setSlot:function(slot, id, count, data, extra){
        var item = this.container.getSlot(slot);
        item.id = Number(id);
        item.count = Number(count);
        item.data = Number(data);
        item.extra = extra;
    },
    click:function(id, count, data, coords){
        if(this.data.step) return;
        var pillars = [];
        if(id == ItemID.normalNecronomicon && Entity.getSneaking(Player.get())){
            for(var i in this.data.coords){
                if (World.getBlock(this.data.coords[i][0], this.y, this.data.coords[i][1]).id == 4){
                    World.setBlock(this.data.coords[i][0], this.y, this.data.coords[i][1], BlockID.PillarAbyssalC, 0);
                    World.addTileEntity(this.data.coords[i][0], this.y, this.data.coords[i][1]);
                    Entity.spawn(this.data.coords[i][0], this.y + 1, this.data.coords[i][1], 93);
               };
            }
            for (var i in this.data.coords) {
                if (World.getBlock(this.data.coords[i][0], this.y, this.data.coords[i][1]).id == BlockID.PillarAbyssalC){
                    var tile = World.getTileEntity(this.data.coords[i][0], this.y, this.data.coords[i][1]);
                    if (!tile) tile = World.addTileEntity(this.data.coords[i][0], this.y, this.data.coords[i][1]);
                    if(tile && tile.container.getSlot('slot').id != 0)pillars.push(this.data.coords[i]);
               }
            }
            if (this.container.getSlot('slot').id == 0 || pillars.length == 0) return;
            var CraftingItems = {};
            for(var i in Crafts){
                CraftingItems[Crafts[i].result.toString()] = {};
                for(var k in Crafts[i].items){
                    if(CraftingItems[Crafts[i].result.toString()][Crafts[i].items[k].toString()]){
                        CraftingItems[Crafts[i].result.toString()][Crafts[i].items[k].toString()]++;
                  }else{
                        CraftingItems[Crafts[i].result.toString()][Crafts[i].items[k].toString()] = 1;
                  }
               }
                CraftingItems[Crafts[i].result.toString()].centre = Crafts[i].centre.toString();
           }
            var itemsInPillars = {};
            for(var i in pillars){
                var tile = World.getTileEntity(pillars[i][0], this.y, pillars[i][1]);
                var item = tile.container.getSlot('slot');
                 if(itemsInPillars[item.id + ',' + item.data]){
                    itemsInPillars[item.id + ',' + item.data]++
               }else{
                    itemsInPillars[item.id + ',' + item.data] = 1
               }
            }
            var centreItem = this.container.getSlot('slot').id + ',' + this.container.getSlot('slot').data;
            var result = 0
            for(var l in CraftingItems){
                result = 0
                for(var i in itemsInPillars){
                 if(centreItem != CraftingItems[l].centre || JSONlength(itemsInPillars) != JSONlength(CraftingItems[l]) - 1 || !CraftingItems[l][i] || itemsInPillars[i] != CraftingItems[l][i]) continue;
                    result++
                    if(result == JSONlength(itemsInPillars) || typeof(result) == 'string'){
                        result = l;
                        break
                  };
               }
                if(result == JSONlength(itemsInPillars) || typeof(result) == 'string') break;
            }
            if(typeof(result) == 'string'){
                if(onCraftStart[result] && onCraftStart[result]({
                        x: this.x,
                        y: this.y,
                        z: this.z
                    }) == 'stop') return;
                for (var i in pillars){
                    pillars[i] = pillars[i][0] + ";" + pillars[i][1];
               }
                pillars = pillars.toString();
                this.data.step = {
                    pillars: pillars,
                    result: result
               };
                pillars = pillars.split(",");
                for(var i in pillars){
                    pillars[i] = pillars[i].split(";");
                    pillars[i][0] = Number(pillars[i][0]);
                    pillars[i][1] = Number(pillars[i][1]);
               }
                var ths = this;
                asd(pillars, 0, ths, function(){
                    result = result.split(',');
                    var ent = Entity.spawn(ths.x, ths.y + 1, ths.z, 93);
                    elder_screams.play();
                    if (ths.container.getSlot('slot').count > 1) {
                        onCallback("EntityRemoved", function(entity) {
                            if (entity == ent) {
                                drop(ths.x + 0.5, ths.y + 1, ths.z + 0.5, result[0], 1, result[1]);
                                return "delete";
                           }
                        });
                        ths.container.getSlot('slot').count--;
                 }else{
                        ths.setSlot('slot', result[0], 1, result[1]);
                 }
                    ths.data.step = null;
                    if(onCraftEnd[result.toString()]) onCraftEnd[result.toString()]({
                        x: ths.x,
                        y: ths.y,
                        z: ths.z
                 });
             });
          }
            return;
       } else if (this.container.getSlot('slot').id == 0){
            Game.prevent();
            var item = Player.getCarriedItem();
            if (item.id == 0) return;
            this.setSlot('slot', item.id, 1, item.data, item.extra);
            Player.decreaseCarriedItem(1);
       }else{
            Game.prevent();
            var slot = this.container.getSlot('slot');
            drop(this.x + 0.5, this.y + 1, this.z + 0.5, slot.id, slot.count, slot.data, slot.extra);
            this.setSlot('slot', 0, 0, 0);
       }
    },
    tick: function() {
      Particles.addParticle(this.x + 0.1, this.y + 0.1, this.z + 0.9, 7, 0, .04, 0, 0); 
      Particles.addParticle(this.x + 0.9, this.y + 0.1, this.z + 0.1, 7, 0, .04, 0, 0);  
      Particles.addParticle(this.x + 0.9, this.y + 0.1, this.z + 0.9, 7, 0, .04, 0, 0);
      Particles.addParticle(this.x + 0.1, this.y + 0.1, this.z + 0.1, 7, 0, .04, 0, 0);
        var item = this.container.getSlot('slot');
        if ((!this.data.anim || (this.data.lastid != item.id || this.data.lastdata != item.data)) && item.id != 0) {
            if ((this.data.lastid != item.id || this.data.lastdata != item.data) && this.data.anim) this.data.anim.destroy();
            this.data.lastid = item.id;
            this.data.lastdata = item.data;
            var bonus_coords = {
                x: 0,
                y: 0,
                z: 0
           };
            this.data.rotation = [0, 0, 0];
            if (all_items.indexOf(item.id) != -1){
                bonus_coords.x -= 0.06;
                bonus_coords.y -= 0.095;
                bonus_coords.z += 0.06125;
                this.data.rotation = [Math.PI / 2, Math.PI, 0];
           }
            this.data.anim = new Animation.Item(this.x + 0.5 + 1 / 16 + bonus_coords.x, this.y + 0.75 + 0.325 + bonus_coords.y, this.z + 0.5 - 1 / 16 + bonus_coords.z);
            this.data.anim.describeItem({
                id: item.id,
                count: 1,
                data: item.data,
                size: 1 / (16 / 6),
                rotation: this.data.rotation,
                notRandomize: true
          });
            this.data.anim.load();
       }else if(this.data.anim && item.id == 0){
            this.data.lastid = 0;
            this.data.lastdata = 0;
            this.data.anim.destroy();
            this.data.anim = null;
       }  
    },
    load:function(){
        if(this.data.anim) this.data.anim.load();
        if(this.data.step){
            if(!this.data.step.i) return;
            var ths = this;
            var pillars = ths.data.step.pillars.split(",");
            for(var i in pillars){
                pillars[i] = pillars[i].split(";");
                pillars[i][0] = Number(pillars[i][0]);
                pillars[i][1] = Number(pillars[i][1]);
           }   
            asd(pillars, ths.data.step.i, ths, function(){
                elder_screams.play();
                var result = ths.data.step.result.split(',');
                var ent = Entity.spawn(ths.x, ths.y + 1, ths.z, 93);    
                if(ths.container.getSlot('slot').count > 1){
                    onCallback("EntityRemoved", function(entity){
                        if(entity == ent){
                            drop(ths.x + 0.5, ths.y + 1, ths.z + 0.5, result[0], 1, result[1]);
                            return "delete";
                       }
                    });            
                    ths.container.getSlot('slot').count--
               }else{
                    ths.setSlot('slot', result[0], 1, result[1]);
             }
                ths.data.step = null;
                if(onCraftEnd[result.toString()])onCraftEnd[result.toString()]({
                    x: ths.x,
                    y: ths.y,
                    z: ths.z
             });
         });            
      }
   },
    unload: function() {
        if(this.data.anim){
            this.data.anim.destroy();
      }
   },
    destroyBlock: function(coords, player) {
        if(this.data.anim){
            this.data.anim.destroy();
            this.data.anim = null;
      }
   } 
});

function particles(altarCoords, pillarCoords, tile, slot, particleType, interval, repeates, endFunc, curentRepeat){
    curentRepeat = curentRepeat || 1;
    if(World.getBlock(pillarCoords.x, pillarCoords.y, pillarCoords.z).id == 0 || tile.container.getSlot("slot").id == 0 || World.getBlock(altarCoords.x, altarCoords.y, altarCoords.z).id == 0 || World.getTileEntity(altarCoords.x, altarCoords.y, altarCoords.z).container.getSlot("slot").id == 0){
        return
    }
    if (curentRepeat > repeates) {
        if (tile.container.getSlot('slot').count == 1){
            tile.setSlot('slot', 0, 0, 0);
       }else{
            tile.container.getSlot("slot").count--;
       }
        setTimeout(function(){
            endFunc();
       }, 40);
        return;
   }
    for(var i = 0.1; i < Math.random() / 2; i += 0.1){
        var emitter = new Particles.ParticleEmitter(pillarCoords.x + 0.5 + Math.random() / 5, pillarCoords.y + 0.75 + Math.random() / 5, pillarCoords.z + 0.5 + Math.random() / 5);
        emitter.setEmitRelatively(true);
        emitter.emit(particleType, 0, 0, 0, 0, 0, 0, 0, (altarCoords.x - pillarCoords.x) / 40 / 20, (altarCoords.y - pillarCoords.y) / 40 / 20, (altarCoords.z - pillarCoords.z) / 40 / 20);
   }
    setTimeout(function(){
        particles(altarCoords, pillarCoords, tile, slot, particleType, interval, repeates, endFunc, curentRepeat + 1);
   }, interval)
}

function asd(pillars, i, tileAltar, endFunc){
    tileAltar.data.step.i = i;
    if(i >= pillars.length) return endFunc();
    var tile = World.getTileEntity(pillars[i][0], tileAltar.y, pillars[i][1]);
    if(tile && tile.container.getSlot('slot').id != 0){
        particles({
            x: tileAltar.x,
            y: tileAltar.y,
            z: tileAltar.z
        }, {
            x: pillars[i][0],
            y: tileAltar.y,
            z: pillars[i][1]
        }, tile, 'slot', particle_altar, 3, 40, function() {
            asd(pillars, i + 1, tileAltar, endFunc);
        });
   }else{
        tileAltar.data.step = null; 
   }
}