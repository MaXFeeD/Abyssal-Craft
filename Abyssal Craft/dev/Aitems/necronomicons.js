var uses = 0;

//MATIREALS
IDRegistry.genItemID("trsGem");
Item.createItem("trsGem", "Transmutation Gem", {name: "TG"});
Item.setMaxDamage(ItemID.trsGem, 8); 

IDRegistry.genItemID("soulPe");
Item.createItem("soulPe", "Soul Gem Peace", {name: "SF"});

IDRegistry.genItemID("soulPa");
Item.createItem("soulPa", "Soul Gem Part", {name: "SS"});

Recipes.addShaped({id:ItemID.soulPa, count: 1, data: 0}, [
"xx",
"xx"
], ['x', ItemID.soulPe, 0]);

IDRegistry.genItemID("soulG");
Item.createItem("soulG", "Soul Gem", {name: "SG"});

Recipes.addShaped({id:ItemID.soulG, count: 1, data: 0}, [
"xx",
"xx"
], ['x', ItemID.soulPa, 0]);

IDRegistry.genItemID("shardObl");
Item.createItem("shardObl", "Oblivion Shard", {name: "OS"});

Recipes.addShaped({id:ItemID.shardObl, count: 1, data: 0}, [
"oao",
"axa",
"oao"
], ['s', ItemID.soulG, 0, 'x', ItemID.trsGem, 0], function(api, field, result){ 
    Player.setCarriedItem(ItemID.trsGem, 1, 0);
    Item.setMaxDamage(ItemID.trsGem, Item.getMaxDamage(ItemID.trsGem)-1); 
});

IDRegistry.genItemID("catalObl");
Item.createItem("catalObl", "Oblivion Catalyst", {name: "OC"});

Item.registerUseFunction("catalObl",function(coords, item, block){
Entity.addEffect(Player.get(), 1, 4, 6000, false, false); 
Entity.addEffect(Player.get(), 3, 4, 6000, false, false);   
Entity.addEffect(Player.get(), 5, 4, 6000, false, false);  
Entity.addEffect(Player.get(), 6, 4, 6000, false, false);
Entity.addEffect(Player.get(), 10, 4, 6000, false, false);
Entity.addEffect(Player.get(), 11, 4, 6000, false, false);
Entity.addEffect(Player.get(), 12, 4, 6000, false, false);
Entity.addEffect(Player.get(), 13, 4, 6000, false, false);
Entity.addEffect(Player.get(), 14, 4, 6000, false, false);
Entity.addEffect(Player.get(), 16, 4, 6000, false, false);
Entity.addEffect(Player.get(), 21, 4, 6000, false, false);
Entity.addEffect(Player.get(), 22, 4, 6000, false, false);
Entity.addEffect(Player.get(), 23, 4, 6000, false, false);
});

IDRegistry.genItemID("crystalLife");
Item.createItem("crystalLife", "Life Crystal", {name: "lifeCrystal"});
Item.registerUseFunction("crystalLife",function(coords, item, block){
if(uses <= 4){
Entity.setMaxHealth(Player.get(), Entity.getMaxHealth(Player.get())+4);
uses += 1;
   }
}); 
        
Necronomicons.setUpAsNecronomicon({
id:"normalNecronomicon",
name:"Necronomicon",
texture:"necronomicon",
maxPE:5000,
PEvalue:5000,
tier:1,
isChargable:true
});

Necronomicons.setUpAsNecronomicon({
id:"normalNecronomiconC",
name:"Corrupted Necronomicon",
texture:"necronomicon_cor",
maxPE:10000,
PEvalue:10000,
tier:2,
isChargable:true
});

Necronomicons.setUpAsNecronomicon({
id:"normalNecronomiconD",
name:"Dreaded Necronomicon",
texture:"necronomicon_dre",
maxPE:20000,
PEvalue:20000,
tier:3,
isChargable:true
});

Necronomicons.setUpAsNecronomicon({
id:"normalNecronomiconO",
name:"Omothol Necronomicon",
texture:"necronomicon_omt",
maxPE:40000,
PEvalue:40000,
tier:4,
isChargable:true
});

Necronomicons.setUpAsNecronomicon({
id:"abyssNecronomicon",
name:"Gateway Necronomicon",
texture:"abyssalnomicon",
maxPE:50000,
PEvalue:50000,
tier:5,
isChargable:true
});


Recipes.addShaped({id:ItemID.keyABW, count: 1, data: 0}, [
"oas",
"oxa",
"xoo"
], ['a', ItemID.catalObl, 0, 'x', 369, 0,'s', ItemID.coralPearl, 0]);

//CHARMS
IDRegistry.genItemID("charm"); 
Item.createItem("charm", "Charm", {name: "charm"});

IDRegistry.genItemID("charmAzathoth"); 
Item.createItem("charmAzathoth", "Azathoth Charm", {name: "charm_azathoth"});

IDRegistry.genItemID("charmCthulhu"); 
Item.createItem("charmCthulhu", "Cthulhu Charm", {name: "charm_cthulhu"});

IDRegistry.genItemID("charmHastur"); 
Item.createItem("charmHastur", "Hastur's Charm", {name: "charm_hastur"});

IDRegistry.genItemID("charmJzahar"); 
Item.createItem("charmJzahar", "Jzahar's Gatekeeper Charm", {name: "charm_jzahar"});

IDRegistry.genItemID("charmNyarlathotep"); 
Item.createItem("charmNyarlathotep", "Nyarlathotep's Charm", {name: "charm_nyarlathotep"});

IDRegistry.genItemID("charmShubniggurath"); 
Item.createItem("charmShubniggurath", "Shubniggurath's Charm", {name: "charm_shubniggurath"});

IDRegistry.genItemID("charmYogsothoth"); 
Item.createItem("charmYogsothoth", "Yogsothoth's Charm", {name: "charm_yogsothoth"});

//DRAINS

Necronomicons.setUpAsNecronomicon({
id:"drainS",
name:"Drain Staff",
texture:"drainstaff",
maxPE:125,
PEvalue:0,
tier:1,
isChargable:true
});

Necronomicons.setUpAsNecronomicon({
id:"drainSA",
name:"Drain Staff Abyssal",
texture:"drainstaff_abyssalwasteland",
maxPE:250,
PEvalue:0,
tier:2,
isChargable:true
});

Necronomicons.setUpAsNecronomicon({
id:"drainSD",
name:"Drain Staff Dread",
texture:"drainstaff_dreadlands",
maxPE:500,
PEvalue:0,
tier:3,
isChargable:true
});

Necronomicons.setUpAsNecronomicon({
id:"drainSO",
name:"Drain Staff Omothol",
texture:"drainstaff_omothol",
maxPE:1000,
PEvalue:0,
tier:4,
isChargable:true
});

const drains = [ItemID.drainS, ItemID.drainSA, ItemID.drainSD, ItemID.drainSO];

Callback.addCallback("EntityDeath",function (entity, attacker){
for(var i in drains){
if(Player.getCarriedItem().id == drains[i] && attacker == Player.get())
Necronomicons.encreasePEFromItem(drains[i], 25);
} 
});

//POST
IDRegistry.genBlockID("stoneMonolith");
Block.createBlock("stoneMonolith", [
{name: "Stone Monolith", texture: [["monolithStone", 0]], inCreative: true}], "opaque");
ToolAPI.registerBlockMaterial(BlockID.stoneMonolith, "stone", 2, true);

IDRegistry.genBlockID("stoneShoggot");
Block.createBlock("stoneShoggot", [
{name: "Shoggoth Ooze", texture: [["shoggothOoze", 0]], inCreative: true}]);

IDRegistry.genBlockID("stoneShoggotB");
Block.createBlock("stoneShoggotB", [
{name: "Shoggoth Biomass", texture: [["shoggothBiomass", 0]], inCreative: true}]);


Callback.addCallback("PostLoaded", function(){
Recipes.addShaped({id:BlockID.Pedestal, count: 1, data: 0}, [
"asa",
"axa",
"aaa"
], ['a', BlockID.stoneMonolith, 0, 'x', ItemID.soulPa, 0, 's', ItemID.coralPearl, 0]);

Recipes.addShaped({id:61, count: 1, data: 0}, [
"aaa",
"a a",
"aaa"
], ['a', BlockID.stoneDark, 0]);


Item.addCreativeGroup("Necronomicons", "Necronomicons", [ItemID.normalNecronomicon, ItemID.normalNecronomiconC, ItemID.normalNecronomiconD, ItemID.normalNecronomiconO, ItemID.abyssNecronomicon]);
Item.addCreativeGroup("Charms", "Charms", [ItemID.charm, ItemID.charmAzathoth, ItemID.charmCthulhu, ItemID.charmHastur, ItemID.charmJzahar, ItemID.charmNyarlathotep, ItemID.charmShubniggurath, ItemID.charmYogsothoth]);
Item.addCreativeGroup("Drain Staffs", "Drain Staffs", [ItemID.drainS, ItemID.drainSA, ItemID.drainSD, ItemID.drainSO]);
AbyssTable.addCraft([[371, 0], [371, 0], [371, 0], [371, 0], [371, 0], [371, 0], [371, 0], [371, 0]], [ItemID.coralPearl, 0], [ItemID.trsGem, 0], [0,-1,7,-1,2,-1,4,-1,1,-1,6,-1,3,-1,5,-1], 2000);
Item.setGlint(ItemID.trsGem, true);
AbyssTable.addCraft([[331, 0], [331, 0], [331, 0], [331, 0], [ItemID.shardObl, 0], [ItemID.shardObl, 0], [ItemID.shardObl, 0], [ItemID.shardObl, 0]], [381, 0], [ItemID.catalObl, 0], [0,-1,7,-1,2,-1,4,-1,1,-1,6,-1,3,-1,5,-1], 5000);
Item.setGlint(ItemID.catalObl, true);
AbyssTable.addCraft([[ItemID.essenceABW, 0], [ItemID.essenceABW, 0], [ItemID.essenceABW, 0], [ItemID.essenceABW, 0], [ItemID.coralGem, 0], [ItemID.coralGem, 0], [ItemID.coralGem, 0], [ItemID.coralGem, 0]], [ItemID.coralPearl, 0], [ItemID.essenceOrbABW, 0], [0,-1,7,-1,2,-1,4,-1,1,-1,6,-1,3,-1,5,-1], 3500);
AbyssTable.addCraft([[ItemID.coralIron, 0], [ItemID.coralIron, 0], [ItemID.coralIron, 0], [ItemID.coralIron, 0], [ItemID.coralGem, 0], [ItemID.coralGem, 0], [ItemID.coralGem, 0], [ItemID.coralGem, 0]], [ItemID.coralPearl, 0], [ItemID.coralPlate, 0], [0,-1,7,-1,2,-1,4,-1,1,-1,6,-1,3,-1,5,-1], 1500);
Item.setGlint(ItemID.essenceOrbABW, true);

Recipes.addShaped({id:ItemID.normalNecronomicon, count: 1, data: 0}, [
"aas",
"axa",
"aas"
], ['a', 367, 0, 'x', 340, 0, 's', 265, 0]);
});

AbyssTable.addCraft([[ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0]], [ItemID.ABHelm, 0], [ItemID.DABHelm, 0], [0,-1,7,-1,2,-1,4,-1,1,-1,6,-1,3,-1,5,-1], 1500);
AbyssTable.addCraft([[ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0]], [ItemID.ABCh, 0], [ItemID.DABCh, 0], [0,-1,7,-1,2,-1,4,-1,1,-1,6,-1,3,-1,5,-1], 1500);
AbyssTable.addCraft([[ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0]], [ItemID.ABLeg, 0], [ItemID.DABLeg, 0], [0,-1,7,-1,2,-1,4,-1,1,-1,6,-1,3,-1,5,-1], 1500);
AbyssTable.addCraft([[ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0], [ItemID.dreadPeace, 0]], [ItemID.ABBoot, 0], [ItemID.DABBoot, 0], [0,-1,7,-1,2,-1,4,-1,1,-1,6,-1,3,-1,5,-1], 1500);

AbyssTable.addCraft([[ItemID.trsGem, 0], [0, 0], [111, 0], [ItemID.coralGem, 0], [ItemID.coralGem, 0], [325, 8], [ItemID.Bo, 0], [106, 0]], [ItemID.RCHelm, 0], [ItemID.DPHelm, 0], [0,-1,7,-1,2,-1,4,-1,1,-1,6,-1,3,-1,5,-1], 1500);
AbyssTable.addCraft([[ItemID.trsGem, 0], [0, 0], [111, 0], [ItemID.coralGem, 0], [ItemID.coralGem, 0], [325, 8], [ItemID.Bo, 0], [106, 0]], [ItemID.RCCh, 0], [ItemID.DPCh, 0], [0,-1,7,-1,2,-1,4,-1,1,-1,6,-1,3,-1,5,-1], 1500);
AbyssTable.addCraft([[ItemID.trsGem, 0], [0, 0], [111, 0], [ItemID.coralGem, 0], [ItemID.coralGem, 0], [325, 8], [ItemID.Bo, 0], [106, 0]], [ItemID.RCLeg, 0], [ItemID.DPLeg, 0], [0,-1,7,-1,2,-1,4,-1,1,-1,6,-1,3,-1,5,-1], 1500);
AbyssTable.addCraft([[ItemID.trsGem, 0], [0, 0], [111, 0], [ItemID.coralGem, 0], [ItemID.coralGem, 0], [325, 8], [ItemID.Bo, 0], [106, 0]], [ItemID.RCBoot, 0], [ItemID.DPBoot, 0], [0,-1,7,-1,2,-1,4,-1,1,-1,6,-1,3,-1,5,-1], 1500);
