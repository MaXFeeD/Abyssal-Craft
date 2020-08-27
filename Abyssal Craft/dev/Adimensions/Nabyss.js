var Abyss = new Dimensions.CustomDimension("Abyss", 1974); 
Abyss.setSkyColor(0, 2.86, 2.89); 
Abyss.setFogColor(0, 2.86, 2.89); 
Abyss.setCloudColor(0, 2.86, 2.89); 
 
Abyss.setGenerator(Dimensions.newGenerator({ 
 layers: [ 
 { 
minY: 0, maxY: 256, 
yConversion: [[1.5, -0.8], [.6, -.4], [0, .85], [.5, -.5], [1.5, -1]], 
material: {base: BlockID.stoneAbyss, surface: {id:BlockID.sandAbyss, data: 0, width:4}, cover: BlockID.grassAbyss}, 
noise: {octaves: {count: 3, scale: 126}}
  }, 
 {
minY: 0, maxY: 1,
yConversion: [[.0,.0]],
material: {base: 7},
  },
 {
minY: 42, maxY: 64,
yConversion: [[.0,.0]],
material: {base: 8},
  }  
 ] 
}
)); 
 
PortalUtils.newPortalBlock("abyssWastes", ["AG", 0], {type: "v-plane", frameId: BlockID.stoneAbyss}, false);

var shape = new PortalShape();
shape.setPortalId(BlockID.abyssWastes);
shape.setFrameIds(BlockID.stoneAbyss);
shape.setMinSize(2, 3);
 
Callback.addCallback("ItemUse", function(coords, item, block){ 
if(Player.getCarriedItem().id == ItemID.keyABW) 
var rect = shape.findPortal(coords.relative.x, coords.relative.y, coords.relative.z);
  if (rect) {
            shape.buildPortal(rect, false);
   }
}); 
    
Callback.addCallback("DestroyBlock", function(pos, block){
    if (block.id == BlockID.stoneAbyss || block.id == BlockID.abyssWastes) {
        DimensionHelper.eliminateIncorrectPlacedPortals(pos, BlockID.abyssWastes, [BlockID.stoneAbyss]);
    }
}); 


Callback.addCallback("tick", function() {
let crdsP = Player.getPosition();
if(World.getBlockID(crdsP.x, crdsP.y, crdsP.z) == BlockID.abyssWastes && Player.getDimension() != Abyss.id) {  
    Dimensions.transfer(Player.get(), Abyss.id);  
    } else if(World.getBlockID(crdsP.x, crdsP.y, crdsP.z) == BlockID.abyssWastes && Player.getDimension() == Abyss.id) {
    Dimensions.transfer(Player.get(), 1); 
    }
});

var teleports = 0;
Callback.addCallback('DimensionLoaded', function (dimension) {
if (dimension != Abyss.id) return;
 if (teleports < 1) {
 var CP = Player.getPosition();
  var crD = GenerationUtils.findSurface(CP.x, CP.z, 48, 72); 
   shape.buildPortal(crD, true);
   teleports += 1;
}
});
