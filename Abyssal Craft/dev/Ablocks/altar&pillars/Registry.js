IDRegistry.genBlockID("AltarAbyssalC");
Block.createBlockWithRotation("AltarAbyssalC", [
{name: "Abyssal Altar", texture: [["coblestone", 0], ["coblestone", 0], ["coblestone", 0]], inCreative: true}]);
ToolAPI.registerBlockMaterial(BlockID.AltarAbyssalC, "stone", 1, true);

IDRegistry.genBlockID("PillarAbyssalC");
Block.createBlockWithRotation("PillarAbyssalC", [
{name: "Abyssal Pillar", texture: [["coblestone", 0], ["overlay", 0], ["coblestone", 0]], inCreative: true}]);
ToolAPI.registerBlockMaterial(BlockID.PillarAbyssalC, "stone", 1, true);


var PillarRender = new ICRender.Model();
BlockRenderer.setStaticICRender(BlockID.PillarAbyssalC, -1, PillarRender);
var PillarModel = BlockRenderer.createModel();

PillarModel.addBox(4/16, 0/16, 4/16, 12/16, 2/16, 12/16, "cobblestone", 0);
PillarModel.addBox(4.5/16, 2/16, 4.5/16, 11.5/16, 3/16, 11.5/16, "cobblestone", 0);
PillarModel.addBox(5/16, 3/16, 10/16, 6/16, 13/16, 11/16, "cobblestone", 0);
PillarModel.addBox(10/16, 3/16, 10/16, 11/16, 13/16, 11/16, "cobblestone", 0);
PillarModel.addBox(10/16, 3/16, 5/16, 11/16, 13/16, 6/16, "cobblestone", 0);
PillarModel.addBox(5/16, 3/16, 5/16, 6/16, 13/16, 6/16, "cobblestone", 0);
PillarModel.addBox(5.5/16, 3/16, 5.5/16, 10.5/16, 13/16, 10.5/16, "cobblestone", 0);
PillarModel.addBox(4.5/16, 13/16, 4.5/16, 11.5/16, 14/16, 11.5/16, "cobblestone", 0);
PillarModel.addBox(4/16, 14/16, 4/16, 12/16, 15/16, 12/16, "cobblestone", 0);//tyt
PillarModel.addBox(11/16, 15/16, 4/16, 12/16, 16/16, 5/16, "cobblestone", 0);
PillarModel.addBox(11/16, 15/16, 11/16, 12/16, 16/16, 12/16, "cobblestone", 0);
PillarModel.addBox(4/16, 15/16, 11/16, 5/16, 16/16, 12/16, "cobblestone", 0);
PillarModel.addBox(4/16, 15/16, 4/16, 5/16, 16/16, 5/16, "cobblestone", 0);
PillarModel.addBox(7.5/16, 15/16, 4/16, 8.5/16, 16/16, 5/16, "cobblestone", 0);
PillarModel.addBox(7.5/16, 15/16, 11/16, 8.5/16, 16/16, 12/16, "cobblestone", 0);
PillarModel.addBox(4/16, 15/16, 7.5/16, 5/16, 16/16, 8.5/16, "cobblestone", 0);
PillarModel.addBox(11/16, 15/16, 7.5/16, 12/16, 16/16, 8.5/16, "cobblestone", 0);

PillarRender.addEntry(PillarModel);
Block.setShape(BlockID.PillarAbyssalC, 2/16, 0/16, 2/16, 14/16, 16/16, 14/16);

var Altrender = new ICRender.Model();
BlockRenderer.setStaticICRender(BlockID.AltarAbyssalC, -1, Altrender);
var Altmodel = BlockRenderer.createModel();

Altmodel.addBox(2.5/16, 0/16, 2.5/16, 13.5/16, 2/16, 13.5/16, "cobblestone", 0);
Altmodel.addBox(3/16, 2/16, 3/16, 13/16, 3/16, 13/16, "cobblestone", 0);
Altmodel.addBox(11/16, 3/16, 11/16, 12/16, 11/16, 12/16, "cobblestone", 0);
Altmodel.addBox(4/16, 3/16, 11/16, 5/16, 11/16, 12/16, "cobblestone", 0);
Altmodel.addBox(4/16, 3/16, 4/16, 5/16, 11/16, 5/16, "cobblestone", 0);
Altmodel.addBox(11/16, 3/16, 4/16, 12/16, 11/16, 5/16, "cobblestone", 0);
Altmodel.addBox(5/16, 3/16, 5/16, 11/16, 11/16, 11/16, "cobblestone", 0);
Altmodel.addBox(4.5/16, 6/16, 5/16, 5/16, 8/16, 11/16, "cobblestone", 0);
Altmodel.addBox(11/16, 6/16, 5/16, 11.5/16, 8/16, 11/16, "cobblestone", 0);
Altmodel.addBox(5/16, 6/16, 11/16, 11/16, 8/16, 11.5/16, "cobblestone", 0);
Altmodel.addBox(5/16, 6/16, 4.5/16, 11/16, 8/16, 5/16, "cobblestone", 0);
Altmodel.addBox(2/16, 12/16, 2/16, 14/16, 13/16, 14/16, "cobblestone", 0);
Altmodel.addBox(3/16, 11/16, 3/16, 13/16, 12/16, 13/16, "cobblestone", 0);
Altmodel.addBox(5/16, 13/16, 5/16, 11/16, 14/16, 11/16, "BOD", 0);
Altmodel.addBox(3/16, 13/16, 3/16, 4/16, 16/16, 4/16, "cobblestone", 0);
Altmodel.addBox(12/16, 13/16, 3/16, 13/16, 16/16, 4/16, "cobblestone", 0);
Altmodel.addBox(12/16, 13/16, 12/16, 13/16, 16/16, 13/16, "cobblestone", 0);
Altmodel.addBox(3/16, 13/16, 12/16, 4/16, 16/16, 13/16, "cobblestone", 0);
Altrender.addEntry(Altmodel);

IDRegistry.genBlockID("Pedestal");
Block.createBlockWithRotation("Pedestal", [
{name: "Energy Pedestal", texture: [["monolithStone", 0], ["overlay", 0], ["monolithStone", 0]], inCreative: true}]);
ToolAPI.registerBlockMaterial(BlockID.Pedestal, "stone", 0, true);

Block.setShape(BlockID.Pedestal, 2/16, 0/16, 2/16, 14/16, 16/16, 14/16);

var PedestalRender = new ICRender.Model();
BlockRenderer.setStaticICRender(BlockID.Pedestal, -1, PedestalRender);
var PedestalModel = BlockRenderer.createModel();

PedestalModel.addBox(4/16, 0/16, 4/16, 12/16, 2/16, 12/16, "monolithStone", 0);
PedestalModel.addBox(4.5/16, 2/16, 4.5/16, 11.5/16, 3/16, 11.5/16, "monolithStone", 0);
PedestalModel.addBox(5/16, 3/16, 10/16, 6/16, 13/16, 11/16, "monolithStone", 0);
PedestalModel.addBox(10/16, 3/16, 10/16, 11/16, 13/16, 11/16, "monolithStone", 0);
PedestalModel.addBox(10/16, 3/16, 5/16, 11/16, 13/16, 6/16, "monolithStone", 0);
PedestalModel.addBox(5/16, 3/16, 5/16, 6/16, 13/16, 6/16, "monolithStone", 0);
PedestalModel.addBox(5.5/16, 3/16, 5.5/16, 10.5/16, 13/16, 10.5/16, "monolithStone", 0);
PedestalModel.addBox(4.5/16, 13/16, 4.5/16, 11.5/16, 14/16, 11.5/16, "monolithStone", 0);
PedestalModel.addBox(4/16, 14/16, 4/16, 12/16, 15/16, 12/16, "monolithStone", 0);//tyt
PedestalRender.addEntry(PedestalModel);

IDRegistry.genBlockID("PedestalN");
Block.createBlockWithRotation("PedestalN", [
{name: "Energy Pedestal Overworld", texture: [["cobblestone", 0], ["overlay", 0], ["cobblestone", 0]], inCreative: true}]);
ToolAPI.registerBlockMaterial(BlockID.Pedestal, "stone", 0, true);

Block.setShape(BlockID.PedestalN, 2/16, 0/16, 2/16, 14/16, 16/16, 14/16);

var PedestalRenderN = new ICRender.Model();
BlockRenderer.setStaticICRender(BlockID.PedestalN, -1, PedestalRenderN);
var PedestalModelN = BlockRenderer.createModel();

PedestalModelN.addBox(4/16, 0/16, 4/16, 12/16, 2/16, 12/16, "cobblestone", 0);
PedestalModelN.addBox(4.5/16, 2/16, 4.5/16, 11.5/16, 3/16, 11.5/16, "cobblestone", 0);
PedestalModelN.addBox(5/16, 3/16, 10/16, 6/16, 13/16, 11/16, "cobblestone", 0);
PedestalModelN.addBox(10/16, 3/16, 10/16, 11/16, 13/16, 11/16, "cobblestone", 0);
PedestalModelN.addBox(10/16, 3/16, 5/16, 11/16, 13/16, 6/16, "cobblestone", 0);
PedestalModelN.addBox(5/16, 3/16, 5/16, 6/16, 13/16, 6/16, "cobblestone", 0);
PedestalModelN.addBox(5.5/16, 3/16, 5.5/16, 10.5/16, 13/16, 10.5/16, "cobblestone", 0);
PedestalModelN.addBox(4.5/16, 13/16, 4.5/16, 11.5/16, 14/16, 11.5/16, "cobblestone", 0);
PedestalModelN.addBox(4/16, 14/16, 4/16, 12/16, 15/16, 12/16, "cobblestone", 0);//tyt
PedestalRenderN.addEntry(PedestalModelN);

Item.addCreativeGroup("Altars & Sacrafices", "Altars & Sacrafices", [BlockID.AltarAbyssalC]);
Item.addCreativeGroup("Pillars & Energy", "Pillars & Energy", [BlockID.PillarAbyssalC, BlockID.Pedestal, BlockID.PedestalN]);


IDRegistry.genBlockID("statueCt");
Block.createBlockWithRotation("statueCt", [
{name: "Cthulhu statue", texture: [["cthulhustatue", 0]], inCreative: true}]);
ToolAPI.registerBlockMaterial(BlockID.statueCt, "stone", 1, true);

var CTmesh = new RenderMesh();
CTmesh.setBlockTexture("cthulhustatue",0);
CTmesh.importFromFile(__dir__+"/models/ctulhu.obj","obj",{translate: [0.5, 0, 0.5]});
var CTrender = new ICRender.Model();
CTrender.addEntry(new BlockRenderer.Model(CTmesh));
BlockRenderer.setStaticICRender(BlockID.statueCt,0,CTrender);

IDRegistry.genBlockID("statueJz");
Block.createBlockWithRotation("statueJz", [
{name: "J'zahar statue", texture: [["jzaharstatue", 0]], inCreative: true}]);
ToolAPI.registerBlockMaterial(BlockID.statueJz, "stone", 1, true);

var Jzmesh = new RenderMesh();
Jzmesh.setBlockTexture("jzaharstatue",0);
Jzmesh.importFromFile(__dir__+"/models/jzahar.obj","obj",{translate: [0.5, 0, 0.5]});
var Jzrender = new ICRender.Model();
Jzrender.addEntry(new BlockRenderer.Model(Jzmesh));
BlockRenderer.setStaticICRender(BlockID.statueJz,0,Jzrender);

Callback.addCallback('BuildBlock', function (coords, block, entity) {
if(block.id == BlockID.statueJz){
let  pc = Player.getPosition();
if(pc.x > coords.x){ 
  Jzmesh.mesh.rotate(coords.x + .5, coords.y, coords.z + .5, 0, 0, 0); 
      }
if(pc.x < coords.x){ 
  Jzmesh.mesh.rotate(coords.x + .5, coords.y, coords.z + .5, 0, 180, 0); 
      }
if(pc.z > coords.z){ 
  Jzmesh.mesh.rotate(coords.x + .5, coords.y, coords.z + .5, 0, 90, 0); 
      }
if(pc.z < coords.z){ 
  Jzmesh.mesh.rotate(coords.x + .5, coords.y, coords.z + .5, 0, 270, 0); 
      }
   }
});

IDRegistry.genBlockID("statueAz");
Block.createBlockWithRotation("statueAz", [
{name: "Azathoth statue", texture: [["azathothstatue", 0]], inCreative: true}]);
ToolAPI.registerBlockMaterial(BlockID.statueAz, "stone", 1, true);

var Azmesh = new RenderMesh();
Azmesh.setBlockTexture("azathothstatue",0);
Azmesh.importFromFile(__dir__+"/models/azathoth.obj","obj",{translate: [0.5, 0, 0.5]});
var Azrender = new ICRender.Model();
Azrender.addEntry(new BlockRenderer.Model(Azmesh));
BlockRenderer.setStaticICRender(BlockID.statueAz,0,Azrender);

//CTmesh.mesh.rotate(coords.x + .5, coords.y, coords.z + .5, 0, Math.Pi/2, 0);