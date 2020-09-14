var Abyss = new Dimensions.CustomDimension("Abyss", 1974); 
Abyss.setSkyColor(0, 2.55, 2.55); 
Abyss.setFogColor(0, 2.55, 2.55); 
Abyss.setCloudColor(0, 2.55, 2.55); 
 
Abyss.setGenerator(Dimensions.newGenerator({ 
 layers: [ 
  {
minY: 42, maxY: 64,
yConversion: [[0, 0]],
material: {base: 8},
  },
 { 
minY: 0, maxY: 256, 
yConversion: [[1.5, -0.8], [.6, -.4], [0, .85], [.5, -.5], [1.5, -1]], 
material: {base: BlockID.stoneAbyss, surface: {id:BlockID.sandAbyss, data: 0, width:4}, cover: BlockID.grassAbyss}, 
noise: {octaves: {count: 3, scale: 126}}
  }, 
 {
minY: 0, maxY: 1,
yConversion: [[0, 0]],
material: {base: 7},
  }  
 ] 
}
)); 
 
PortalUtils.newPortalBlock("abyssWastes", ["AG", 0], {type: "v-plane", frameId: BlockID.stoneAbyss}, false);

var Ashape = new PortalShape();
Ashape.setPortalId(BlockID.abyssWastes);
Ashape.setFrameIds(BlockID.stoneAbyss);
Ashape.setMinSize(2, 3);
 
Callback.addCallback("ItemUse", function(coords, item, block){ 
if(Player.getCarriedItem().id == ItemID.keyABW) 
var rect = Ashape.findPortal(coords.relative.x, coords.relative.y, coords.relative.z);
  if (rect) {
            Ashape.buildPortal(rect, false);
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
    Dimensions.transfer(Player.get(), 0); 
    }
});


var teleport = false;

Callback.addCallback('DimensionLoaded', function (dimension) {
if (dimension == Abyss.id) {
 if (!teleport) {
 var CP = Player.getPosition();
  var crD = GenerationUtils.findHighSurface(CP.x, CP.z, 65, 75);
    Ashape.buildPortal(crD, true);
     Player.setPosition(CP.x, crD.y, CP.z);
   teleport = true;
}
}});

Saver.addSavesScope("teleported",
function read(scope){
TP = scope.teleport;
},
function save(){
return {TP : teleport };
}
);

Callback.addCallback("GenerateCustomDimensionChunk", function(chunkX, chunkZ, random, dimensionId){
if(Player.getDimension() ==  Abyss.id)
UniqueGen.generateOreInDimension(BlockID.oreAiron, 0, chunkX, chunkZ, random, { 
veinCounts: 7, 
minY: 12, 
maxY: 60,  
size: randomInt(1, 5),
mode: true,
check: [BlockID.stoneAbyss]       
}); 
});

Callback.addCallback("GenerateCustomDimensionChunk", function(chunkX, chunkZ, random, dimensionId){
if(Player.getDimension() ==  Abyss.id)
UniqueGen.generateOreInDimension(BlockID.oreAgold, 0, chunkX, chunkZ, random, { 
veinCounts: 7, 
minY: 12, 
maxY: 55,  
size: randomInt(1, 5),
mode: true,
check: [BlockID.stoneAbyss]      
}); 
});

Callback.addCallback("GenerateCustomDimensionChunk", function(chunkX, chunkZ, random, dimensionId){
if(Player.getDimension() ==  Abyss.id)
UniqueGen.generateOreInDimension(BlockID.oreAdiamond, 0, chunkX, chunkZ, random, { 
veinCounts: 5, 
minY: 12, 
maxY: 52,  
size: randomInt(1, 5),
mode: true,
check: [BlockID.stoneAbyss]       
}); 
});

Callback.addCallback("GenerateCustomDimensionChunk", function(chunkX, chunkZ, random, dimensionId){
if(Player.getDimension() ==  Abyss.id)
UniqueGen.generateOreInDimension(BlockID.oreAnitre, 0, chunkX, chunkZ, random, { 
veinCounts: 8, 
minY: 12, 
maxY: 60,  
size: randomInt(1, 6),
mode: true,
check: [BlockID.stoneAbyss]   
}); 
});

Callback.addCallback("GenerateCustomDimensionChunk", function(chunkX, chunkZ, random, dimensionId){
if(Player.getDimension() ==  Abyss.id)
UniqueGen.generateOreInDimension(BlockID.oreAcorpearl, 0, chunkX, chunkZ, random, { 
veinCounts: 4, 
minY: 12, 
maxY: 55,  
size: randomInt(1, 4),
mode: true,
check: [BlockID.stoneAbyss]   
}); 
});