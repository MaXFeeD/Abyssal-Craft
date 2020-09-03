var Dreadlands = new Dimensions.CustomDimension("Dreadlands", 1975); 
Dreadlands.setSkyColor(1.78, .34, .34); 
Dreadlands.setFogColor(1.39, 0, 0); 
Dreadlands.setCloudColor(1.39, 0, 0); 
 
Dreadlands.setGenerator(Dimensions.newGenerator({ 
 layers: [ 
 {
minY: 63, maxY: 70,
yConversion: [[0, 0]],
material: {base: 8},
  },   
 { 
minY: 0, maxY: 256, 
yConversion: [[1.5, -0.8], [.6, -.4], [0, 0.92], [.5, -.4], [1.5, -1]], 
material: {base: BlockID.stoneDread, surface: {id:BlockID.dirtDread, data: 0, width:4}, cover: BlockID.grassDread}, 
noise: {octaves: {count: 3, scale: 85}}
  }, 
 {
minY: 0, maxY: 1,
yConversion: [[0, 0]],
material: {base: 7},
  }
 ] 
}
)); 
 
PortalUtils.newPortalBlock("dreadLands", ["DG", 0], {type: "v-plane", frameId: BlockID.stoneDread}, false);

var Dshape = new PortalShape();
Dshape.setPortalId(BlockID.dreadLands);
Dshape.setFrameIds(BlockID.stoneDread);
Dshape.setMinSize(2, 3);
 
Callback.addCallback("ItemUse", function(coords, item, block){ 
if(Player.getCarriedItem().id == ItemID.keyABW) 
var rect = shape.findPortal(coords.relative.x, coords.relative.y, coords.relative.z);
  if (rect) {
            Dshape.buildPortal(rect, false);
   }
}); 
    
Callback.addCallback("DestroyBlock", function(pos, block){
    if (block.id == BlockID.stoneDread || block.id == BlockID.dreadLands) {
        DimensionHelper.eliminateIncorrectPlacedPortals(pos, BlockID.dreadLands, [BlockID.stoneDread]);
    }
}); 


Callback.addCallback("tick", function() {
let crdsP = Player.getPosition();
if(World.getBlockID(crdsP.x, crdsP.y, crdsP.z) == BlockID.dreadLands && Player.getDimension() != Dreadlands.id) {  
    Dimensions.transfer(Player.get(), Abyss.id);  
    } else if(World.getBlockID(crdsP.x, crdsP.y, crdsP.z) == BlockID.dreadLands && Player.getDimension() == Dreadlands.id) {
    Dimensions.transfer(Player.get(), 0); 
    }
});


var teleportd = false;

Callback.addCallback('DimensionLoaded', function (dimension) {
if (dimension != Dreadlands.id) return;
 if (!teleportd) {
 var CP = Player.getPosition();
  var crD = GenerationUtils.findHighSurface(CP.x, CP.z, 50, 80);
    Dshape.buildPortal(crD, true);
     Player.setPosition(CP.x, crD.y, CP.z);
   teleportd = true;
}
});

Saver.addSavesScope("teleported",
function read(scope){
TP = scope.teleportd;
},
function save(){
return {TP : teleportd };
}
);