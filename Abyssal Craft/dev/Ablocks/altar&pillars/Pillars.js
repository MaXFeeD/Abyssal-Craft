var particle_pillar = Particles.registerParticleType({
    texture: "AltarParticle",
    size: [.4, .8],
    lifetime: [12, 12],
    render: 2
});

function particles_for_pillar(x, y, z){
  var bonus_coords = [
        [1 / 16 * 4, 1 / 16 * 4],
        [1 / 16 * 13, 1 / 16 * 4],
        [1 / 16 * 4, 1 / 16 * 13],
        [1 / 16 * 12, 1 / 16 * 12]
    ];
    for(var i in bonus_coords){
        var emitter = new Particles.ParticleEmitter(x + bonus_coords[i][0], y + 1 / 16 * 14, z + bonus_coords[i][1]);
        emitter.setEmitRelatively(true);
        emitter.emit(particle_pillar, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
   }
}

Block.setRandomTickCallback(BlockID.PillarAbyssalC, function(x, y, z, id, data){
   particles_for_pillar(x, y, z);
});

TileEntity.registerPrototype(BlockID.PillarAbyssalC,{
    defaultValues:{
        anim: null,
        rotation: [0, 0, 0],
        lastid: 0,
        lastdata: 0
    },
    getTransportSlots: function(){
        return{
            input:["slot"],
            //output: ["slot"]
       };
    },
    setSlot: function(slot, id, count, data, extra){
        var item = this.container.getSlot(slot);
        item.id = id;
        item.count = count;
        item.data = data;
        item.extra = extra;
    },
    click: function(id, count, data, coords){
        Game.prevent();
        if(this.container.getSlot('slot').id == 0){
            var item = Player.getCarriedItem();
            if (item.id == 0) return;
            this.setSlot('slot', item.id, 1, item.data, item.extra);
            Player.decreaseCarriedItem(1);
       }else{
            var slot = this.container.getSlot('slot');
            drop(this.x + 0.5, this.y + 1, this.z + 0.5, slot.id, slot.count, slot.data, slot.extra);
            this.setSlot('slot', 0, 0, 0);
       }
    },
    tick:function(){
        var item = this.container.getSlot('slot');
        if((!this.data.anim || (this.data.lastid != item.id || this.data.lastdata != item.data)) && item.id != 0) {
            if ((this.data.lastid != item.id || this.data.lastdata != item.data) && this.data.anim) this.data.anim.destroy();
            this.data.lastid = item.id;
            this.data.lastdata = item.data;
            var bonus_coords = {
                x: 0,
                y: 0,
                z: 0
           };
            this.data.rotation = [0, 0, 0];
            if(all_items.indexOf(item.id) != -1){
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
        }else if (this.data.anim && item.id == 0){
            this.data.lastid = 0;
            this.data.lastdata = 0;
            this.data.anim.destroy();
            this.data.anim = null;
       }
    },
    init: function() {
        if(this.data.anim) this.data.anim.load();
    },
    destroyBlock:function(coords, player){
        if (this.data.anim){
            this.data.anim.destroy();
            this.data.anim = null;
       }
    }
});


TileEntity.registerPrototype(BlockID.Pedestal,{
    defaultValues:{
        anim: null,
        rotation: [Math.PI / 2, 0, 0],
        lastid:0,
        lastdata:0    
    }, 
    setSlot: function(slot, id, count, data, extra){
        var item = this.container.getSlot(slot);
        item.id = id;
        item.count = count;
        item.data = data;
        item.extra = extra;
    },
    click: function(id, count, data, coords){
        Game.prevent();
        if(this.container.getSlot('slot').id == 0 && Player.getCarriedItem().id == ItemID.normalNecronomicon){
            var item = Player.getCarriedItem();
            if (item.id == 0) return;
            this.setSlot('slot', item.id, 1, item.data, item.extra);
            Player.decreaseCarriedItem(1);
       }else{
            var slot = this.container.getSlot('slot');
            drop(this.x + 0.5, this.y + 1, this.z + 0.5, slot.id, slot.count, slot.data, slot.extra);
            this.setSlot('slot', 0, 0, 0);
       }
    },
    tick:function(){    
        var item = this.container.getSlot('slot');
        if(!this.data.anim || item.id != 0){
            if((this.data.lastid != item.id || this.data.lastdata != item.data) && this.data.anim) this.data.anim.destroy();
            this.data.lastid = item.id;
            this.data.lastdata = item.data;
            var bonus_coords = {
                x: 0,
                y: 0,
                z: 0
           };
            this.data.rotation = [0, 0, 0];
            if(all_items.indexOf(item.id) != -1){
                bonus_coords.x -= 0;
                bonus_coords.y -= 0.095;
                bonus_coords.z += 0;
                this.data.rotation = [0, 0, 0];
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
    init: function() {
        if(this.data.anim) this.data.anim.load();  
    },
    destroyBlock:function(coords, player){
        if (this.data.anim){
            this.data.anim.destroy();
            this.data.anim = null;
       }
    }
});

TileEntity.registerPrototype(BlockID.PedestalN,{
    defaultValues:{
        anim: null,
        rotation: [Math.PI / 2, 0, 0],
        lastid:0,
        lastdata:0    
    }, 
    setSlot: function(slot, id, count, data, extra){
        var item = this.container.getSlot(slot);
        item.id = id;
        item.count = count;
        item.data = data;
        item.extra = extra;
    },
    click: function(id, count, data, coords){
        Game.prevent();
        if(this.container.getSlot('slot').id == 0 && Player.getCarriedItem().id == ItemID.normalNecronomicon){
            var item = Player.getCarriedItem();
            if (item.id == 0) return;
            this.setSlot('slot', item.id, 1, item.data, item.extra);
            Player.decreaseCarriedItem(1);
       }else{
            var slot = this.container.getSlot('slot');
            drop(this.x + 0.5, this.y + 1, this.z + 0.5, slot.id, slot.count, slot.data, slot.extra);
            this.setSlot('slot', 0, 0, 0);
       }
    },
    tick:function(){    
        var item = this.container.getSlot('slot');
        if(!this.data.anim || item.id != 0){
            if((this.data.lastid != item.id || this.data.lastdata != item.data) && this.data.anim) this.data.anim.destroy();
            this.data.lastid = item.id;
            this.data.lastdata = item.data;
            var bonus_coords = {
                x: 0,
                y: 0,
                z: 0
           };
            this.data.rotation = [0, 0, 0];
            if(all_items.indexOf(item.id) != -1){
                bonus_coords.x -= 0;
                bonus_coords.y -= 0.095;
                bonus_coords.z += 0;
                this.data.rotation = [0, 0, 0];
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
    init: function() {
        if(this.data.anim) this.data.anim.load();  
    },
    destroyBlock:function(coords, player){
        if (this.data.anim){
            this.data.anim.destroy();
            this.data.anim = null;
       }
    }
});