//Tier: 1
IDRegistry.genItemID("ABHelm");
Item.createArmorItem("ABHelm", "Abyssalnite helmet", {name: "AAH"}, {type: "helmet", armor: 3, durability: 1221, texture: "armor/abyssalnite_1.png", isTech:false});

IDRegistry.genItemID("ABCh");
Item.createArmorItem("ABCh", "Abyssalnite chestplate", {name: "AAC"}, {type: "chestplate", armor: 8, durability: 1376, texture: "armor/abyssalnite_1.png", isTech:false});

IDRegistry.genItemID("ABLeg");
Item.createArmorItem("ABLeg", "Abyssalnite leggins", {name: "AAP"}, {type: "leggings", armor: 6, durability:1341, texture: "armor/abyssalnite_2.png", isTech:false});

IDRegistry.genItemID("ABBoot");
Item.createArmorItem("ABBoot", "Abyssalnite boots", {name: "AAB"}, {type: "boots", armor: 3, durability: 1200, texture: "armor/abyssalnite_1.png", isTech:false});

Item.addRepairItemIds(ItemID.ABHelm, [ItemID.ABHelm]);
Item.addRepairItemIds(ItemID.ABCh, [ItemID.ABCh]);
Item.addRepairItemIds(ItemID.ABLeg, [ItemID.ABLeg]);
Item.addRepairItemIds(ItemID.ABBoot, [ItemID.ABBoot]);

Recipes.addShaped({id: ItemID.ABHelm, count: 1, data: 0}, [
"xxx",
"x x"
], ['x', ItemID.abbIron, 0]);
Recipes.addShaped({id: ItemID.ABCh, count: 1, data: 0}, [
"x x",
"xxx",
"xxx"
], ['x', ItemID.abbIron, 0]);
Recipes.addShaped({id: ItemID.ABLeg, count: 1, data: 0}, [
"xxx",
"x x",
"x x"
], ['x', ItemID.abbIron, 0]);
Recipes.addShaped({id: ItemID.ABBoot, count: 1, data: 0}, [
"x x",
"x x"
], ['x', ItemID.abbIron, 0]);

//Tier: 2
IDRegistry.genItemID("DABHelm");
Item.createArmorItem("DABHelm", "Dreaded Abyssalnite helmet", {name: "ADAH"}, {type: "helmet", armor: 3, durability: 1347, texture: "armor/dread_1.png", isTech:false});

IDRegistry.genItemID("DABCh");
Item.createArmorItem("DABCh", "Dreaded Abyssalnite chestplate", {name: "ADAC"}, {type: "chestplate", armor: 8, durability: 1396, texture: "armor/dread_1.png", isTech:false});

IDRegistry.genItemID("DABLeg");
Item.createArmorItem("DABLeg", "Dreaded Abyssalnite leggins", {name: "ADAP"}, {type: "leggings", armor: 6, durability:1366, texture: "armor/dread_2.png", isTech:false});

IDRegistry.genItemID("DABBoot");
Item.createArmorItem("DABBoot", "Dreaded Abyssalnite boots", {name: "ADAB"}, {type: "boots", armor: 3, durability: 1337, texture: "armor/dread_1.png", isTech:false});

Item.addRepairItemIds(ItemID.DABHelm, [ItemID.DABHelm]);
Item.addRepairItemIds(ItemID.DABCh, [ItemID.DABCh]);
Item.addRepairItemIds(ItemID.DABLeg, [ItemID.DABLeg]);
Item.addRepairItemIds(ItemID.DABBoot, [ItemID.DABBoot]);

//effects:Night Vision I, Fire Resistance IV 

Armor.registerFuncs(ItemID.DABHelm, {
  tick: function(slot, inventory, index){
   if(Player.getArmorSlot(1).id == ItemID.DABCh && Player.getArmorSlot(2).id == ItemID.DABLeg && Player.getArmorSlot(3).id == ItemID.DABBoot){
 Entity.addEffect(Player.get(), 16, 4440, 0, false, false);         
 Entity.addEffect(Player.get(), 12, 4440, 0, false, false);    
   }
}
});

IDRegistry.genItemID("RCHelm");
Item.createArmorItem("RCHelm", "Refined Coralium helmet", {name: "ACH"}, {type: "helmet", armor: 3, durability: 1534, texture: "armor/coralium_1.png", isTech:false});

IDRegistry.genItemID("RCCh");
Item.createArmorItem("RCCh", "Refined Coralium chestplate", {name: "ACC"}, {type: "chestplate", armor: 8, durability: 1587, texture: "armor/coralium_1.png", isTech:false});

IDRegistry.genItemID("RCLeg");
Item.createArmorItem("RCLeg", "Refined Coralium leggins", {name: "ACP"}, {type: "leggings", armor: 6, durability:1552, texture: "armor/coralium_2.png", isTech:false});

IDRegistry.genItemID("RCBoot");
Item.createArmorItem("RCBoot", "Refined Coralium boots", {name: "ACB"}, {type: "boots", armor: 3, durability: 1531, texture: "armor/coralium_1.png", isTech:false});

Item.addRepairItemIds(ItemID.RCHelm, [ItemID.RCHelm]);
Item.addRepairItemIds(ItemID.RCCh, [ItemID.RCCh]);
Item.addRepairItemIds(ItemID.RCLeg, [ItemID.RCLeg]);
Item.addRepairItemIds(ItemID.RCBoot, [ItemID.RCBoot]);

Recipes.addShaped({id: ItemID.RCHelm, count: 1, data: 0}, [
"xxx",
"x x"
], ['x', ItemID.coralIron, 0]);
Recipes.addShaped({id: ItemID.RCCh, count: 1, data: 0}, [
"x x",
"xxx",
"xxx"
], ['x', ItemID.coralIron, 0]);
Recipes.addShaped({id: ItemID.RCLeg, count: 1, data: 0}, [
"xxx",
"x x",
"x x"
], ['x', ItemID.coralIron, 0]);
Recipes.addShaped({id: ItemID.RCBoot, count: 1, data: 0}, [
"x x",
"x x"
], ['x', ItemID.coralIron, 0]);
//effects:, Speed II, Water Breathing I

Armor.registerFuncs(ItemID.RCHelm, {
  tick: function(slot, inventory, index){
   if(Player.getArmorSlot(1).id == ItemID.RCCh && Player.getArmorSlot(2).id == ItemID.RCLeg && Player.getArmorSlot(3).id == ItemID.RCBoot){
 Entity.addEffect(Player.get(), 1, 4440, 1, false, false);         
 Entity.addEffect(Player.get(), 13, 4440, 0, false, false);    
   }
}
});

//Tier: 3
IDRegistry.genItemID("PRCHelm");
Item.createArmorItem("PRCHelm", "Plated Coralium helmet", {name: "ACHP"}, {type: "helmet", armor: 5, durability: 1600, texture: "armor/coraliumP_1.png", isTech:false});

IDRegistry.genItemID("PRCCh");
Item.createArmorItem("PRCCh", "Plated Coralium chestplate", {name: "ACCP"}, {type: "chestplate", armor: 9, durability: 1668, texture: "armor/coraliumP_1.png", isTech:false});

IDRegistry.genItemID("PRCLeg");
Item.createArmorItem("PRCLeg", "Plated Coralium leggins", {name: "ACPP"}, {type: "leggings", armor: 7, durability:1643, texture: "armor/coraliumP_2.png", isTech:false});

IDRegistry.genItemID("PRCBoot");
Item.createArmorItem("PRCBoot", "Plated Coralium boots", {name: "ACBP"}, {type: "boots", armor: 4, durability: 1634, texture: "armor/coraliumP_1.png", isTech:false});

Item.addRepairItemIds(ItemID.PRCHelm, [ItemID.PRCHelm]);
Item.addRepairItemIds(ItemID.PRCCh, [ItemID.PRCCh]);
Item.addRepairItemIds(ItemID.PRCLeg, [ItemID.PRCLeg]);
Item.addRepairItemIds(ItemID.PRCBoot, [ItemID.PRCBoot]);

//effects: Night Vision I, Speed II, Water Breathing II

Armor.registerFuncs(ItemID.PRCHelm, {
  tick: function(slot, inventory, index){
   if(Player.getArmorSlot(1).id == ItemID.PRCCh && Player.getArmorSlot(2).id == ItemID.PRCLeg && Player.getArmorSlot(3).id == ItemID.PRCBoot){
 Entity.addEffect(Player.get(), 16, 4440, 0, false, false);         
 Entity.addEffect(Player.get(), 1, 4440, 1, false, false); 
 Entity.addEffect(Player.get(), 13, 4440, 1, false, false);    
   }
}
});

Recipes.addShaped({id: ItemID.PRCHelm, count: 1, data: 0}, [
"aba",
"bcb",
"xxx"
], ['a', ItemID.coralPearl, 0, 'b', ItemID.coralPlate, 0, 'c', ItemID.RCHelm, 0, 'x', ItemID.coralIron, 0]);
Recipes.addShaped({id: ItemID.PRCCh, count: 1, data: 0}, [
"b b",
"xcx",
"xbx" 
], ['b', ItemID.coralPlate, 0, 'c', ItemID.RCCh, 0, 'x', ItemID.coralIron, 0]);
Recipes.addShaped({id: ItemID.PRCLeg, count: 1, data: 0}, [
"bcb",
"x x",
"x x"
], ['b', ItemID.coralPlate, 0, 'c', ItemID.RCLeg, 0, 'x', ItemID.coralIron, 0]);
Recipes.addShaped({id: ItemID.PRCBoot, count: 1, data: 0}, [
"x x",
"bxb"
], ['b', ItemID.coralPlate, 0, 'c', ItemID.RCBoot, 0, 'x', ItemID.coralIron, 0]);

IDRegistry.genItemID("DPHelm");
Item.createArmorItem("DPHelm", "Depths helmet", {name: "ADH"}, {type: "helmet", armor: 3, durability: 1623, texture: "armor/depths_1.png", isTech:false});

IDRegistry.genItemID("DPCh");
Item.createArmorItem("DPCh", "Depths chestplate", {name: "ADC"}, {type: "chestplate", armor: 8, durability: 1745, texture: "armor/depths_1.png", isTech:false});

IDRegistry.genItemID("DPLeg");
Item.createArmorItem("DPLeg", "Depths leggins", {name: "ADP"}, {type: "leggings", armor: 6, durability:1734, texture: "armor/depths_2.png", isTech:false});

IDRegistry.genItemID("DPBoot");
Item.createArmorItem("DPBoot", "Depths boots", {name: "ADB"}, {type: "boots", armor: 3, durability: 1674, texture: "armor/depths_1.png", isTech:false});

Item.addRepairItemIds(ItemID.DPHelm, [ItemID.DPHelm]);
Item.addRepairItemIds(ItemID.DPCh, [ItemID.DPCh]);
Item.addRepairItemIds(ItemID.DPLeg, [ItemID.DPLeg]);
Item.addRepairItemIds(ItemID.DPBoot, [ItemID.DPBoot]);

//effects: Night Vision II, Speed III, Water Breathing II, Jump Boost II

Armor.registerFuncs(ItemID.DPHelm, {
  tick: function(slot, inventory, index){
   if(Player.getArmorSlot(1).id == ItemID.DPCh && Player.getArmorSlot(2).id == ItemID.DPLeg && Player.getArmorSlot(3).id == ItemID.DPBoot){
 Entity.addEffect(Player.get(), 16, 4440, 1, false, false);         
 Entity.addEffect(Player.get(), 1, 4440, 2, false, false); 
 Entity.addEffect(Player.get(), 13, 4440, 1, false, false); 
 Entity.addEffect(Player.get(), 8, 4440, 1, false, false);  
   }
}
});

IDRegistry.genItemID("DADHelm");
Item.createArmorItem("DADHelm", "Dredalinite helmet", {name: "ADDH"}, {type: "helmet", armor: 3, durability: 1844, texture: "armor/dreadium_1.png", isTech:false});

IDRegistry.genItemID("DADCh");
Item.createArmorItem("DADCh", "Dredalinite chestplate", {name: "ADDC"}, {type: "chestplate", armor: 8, durability: 1934, texture: "armor/dreadium_1.png", isTech:false});

IDRegistry.genItemID("DADLeg");
Item.createArmorItem("DADLeg", "Dredalinite leggins", {name: "ADDP"}, {type: "leggings", armor: 6, durability:1988, texture: "armor/dreadium_2.png", isTech:false});

IDRegistry.genItemID("DADBoot");
Item.createArmorItem("DADBoot", "Dredalinite boots", {name: "ADDB"}, {type: "boots", armor: 3, durability: 1825, texture: "armor/dreadium_1.png", isTech:false});

Item.addRepairItemIds(ItemID.DADHelm, [ItemID.DADHelm]);
Item.addRepairItemIds(ItemID.DADCh, [ItemID.DADCh]);
Item.addRepairItemIds(ItemID.DADLeg, [ItemID.DADLeg]);
Item.addRepairItemIds(ItemID.DADBoot, [ItemID.DADBoot]);

Recipes.addShaped({id: ItemID.DADHelm, count: 1, data: 0}, [
"xxx",
"x x"
], ['x', ItemID.dreadIron, 0]);
Recipes.addShaped({id: ItemID.DADCh, count: 1, data: 0}, [
"x x",
"xxx",
"xxx"
], ['x', ItemID.dreadIron, 0]);
Recipes.addShaped({id: ItemID.DADLeg, count: 1, data: 0}, [
"xxx",
"x x",
"x x"
], ['x', ItemID.dreadIron, 0]);
Recipes.addShaped({id: ItemID.DADBoot, count: 1, data: 0}, [
"x x",
"x x"
], ['x', ItemID.dreadIron, 0]);

//EFFECTS: Resistance III, Speed III

Armor.registerFuncs(ItemID.DADHelm, {
  tick: function(slot, inventory, index){
   if(Player.getArmorSlot(1).id == ItemID.DADCh && Player.getArmorSlot(2).id == ItemID.DADLeg && Player.getArmorSlot(3).id == ItemID.DADBoot){
 Entity.addEffect(Player.get(), 11, 4440, 2, false, false);         
 Entity.addEffect(Player.get(), 1, 4440, 2, false, false); 
   }
}
});

//tier:4
IDRegistry.genItemID("DADSHelm");
Item.createArmorItem("DADSHelm", "Dreadium Samurai helmet", {name: "ADSH"}, {type: "helmet", armor: 7, durability: 2320, texture: "armor/dreadiumS_1.png", isTech:false});

IDRegistry.genItemID("DADSCh");
Item.createArmorItem("DADSCh", "Dreadium Samurai chestplate", {name: "ADSC"}, {type: "chestplate", armor: 12, durability: 2545, texture: "armor/dreadiumS_1.png", isTech:false});

IDRegistry.genItemID("DADSLeg");
Item.createArmorItem("DADSLeg", "Dreadium Samurai leggins", {name: "ADSP"}, {type: "leggings", armor: 8, durability:2468, texture: "armor/dreadiumS_2.png", isTech:false});

IDRegistry.genItemID("DADSBoot");
Item.createArmorItem("DADSBoot", "Dreadium Samurai boots", {name: "ADSB"}, {type: "boots", armor: 5, durability: 2312, texture: "armor/dreadiumS_1.png", isTech:false});

Item.addRepairItemIds(ItemID.DADSHelm, [ItemID.DADSHelm]);
Item.addRepairItemIds(ItemID.DADSCh, [ItemID.DADSCh]);
Item.addRepairItemIds(ItemID.DADSLeg, [ItemID.DADSLeg]);
Item.addRepairItemIds(ItemID.DADSBoot, [ItemID.DADSBoot]);

Recipes.addShaped({id: ItemID.DADSHelm, count: 1, data: 0}, [
" b ",
"xax"
], ['x', ItemID.dreadChunck, 0, 'a', ItemID.DADHelm, 0, 'b', ItemID.dreadIron, 0]);
Recipes.addShaped({id: ItemID.DADSCh, count: 1, data: 0}, [
"xbx",
"xax",
"xxx"
], ['x', ItemID.dreadChunck, 0, 'a', ItemID.DADCh, 0, 'b', ItemID.dreadIron, 0]);
Recipes.addShaped({id: ItemID.DADSLeg, count: 1, data: 0}, [
"xax",
"bbb"
], ['x', ItemID.dreadChunck, 0, 'a', ItemID.DADLeg, 0, 'b', ItemID.dreadIron, 0]);
Callback.addCallback("PostLoaded", function(){
Recipes.addShaped({id: ItemID.DADSBoot, count: 1, data: 0}, [
"xax",
"bbb"
], ['x', ItemID.dreadChunck, 0, 'a', ItemID.DADBoot, 0, 'b', BlockID.dreadP, 0]);
});
//EFFECTS: Resistance 4, Speed III, Fire Resistance II, Strength II

Armor.registerFuncs(ItemID.DADSHelm, {
  tick: function(slot, inventory, index){
   if(Player.getArmorSlot(1).id == ItemID.DADSCh && Player.getArmorSlot(2).id == ItemID.DADSLeg && Player.getArmorSlot(3).id == ItemID.DADSBoot){
 Entity.addEffect(Player.get(), 16, 4440, 1, false, false);         
 Entity.addEffect(Player.get(), 11, 4440, 3, false, false); 
 Entity.addEffect(Player.get(), 12, 4440, 1, false, false); 
 Entity.addEffect(Player.get(), 5, 4440, 1, false, false);  
   }
}
});

//Ethaxium
IDRegistry.genItemID("AEHelm");
Item.createArmorItem("AEHelm", "Ethaxium helmet", {name: "AEH"}, {type: "helmet", armor: 9, durability: 2889, texture: "armor/ethaxium_1.png", isTech:false});

IDRegistry.genItemID("AECh");
Item.createArmorItem("AECh", "Ethaxium chestplate", {name: "AEC"}, {type: "chestplate", armor: 14, durability: 3090, texture: "armor/ethaxium_1.png", isTech:false});

IDRegistry.genItemID("AELeg");
Item.createArmorItem("AELeg", "Ethaxium leggins", {name: "AEP"}, {type: "leggings", armor: 10, durability:2516, texture: "armor/ethaxium_2.png", isTech:false});

IDRegistry.genItemID("AEBoot");
Item.createArmorItem("AEBoot", "Ethaxium boots", {name: "AEB"}, {type: "boots", armor: 7, durability: 2714, texture: "armor/ethaxium_1.png", isTech:false});

Item.addRepairItemIds(ItemID.AEHelm, [ItemID.AEHelm]);
Item.addRepairItemIds(ItemID.AECh, [ItemID.AECh]);
Item.addRepairItemIds(ItemID.AELeg, [ItemID.AELeg]);
Item.addRepairItemIds(ItemID.AEBoot, [ItemID.AEBoot]);

Recipes.addShaped({id: ItemID.AEHelm, count: 1, data: 0}, [
"xxx",
"x x"
], ['x', ItemID.ethIron, 0]);
Recipes.addShaped({id: ItemID.AECh, count: 1, data: 0}, [
"x x",
"xxx",
"xxx"
], ['x', ItemID.ethIron, 0]);
Recipes.addShaped({id: ItemID.AELeg, count: 1, data: 0}, [
"xxx",
"x x",
"x x"
], ['x', ItemID.ethIron, 0]);
Recipes.addShaped({id: ItemID.AEBoot, count: 1, data: 0}, [
"x x",
"x x"
], ['x', ItemID.ethIron, 0]);

//EFFECTS: Resistance 5, Speed III, Fire Resistance II, Strength II

Armor.registerFuncs(ItemID.AEHelm, {
  tick: function(slot, inventory, index){
   if(Player.getArmorSlot(1).id == ItemID.AECh && Player.getArmorSlot(2).id == ItemID.AELeg && Player.getArmorSlot(3).id == ItemID.AEBoot){
 Entity.addEffect(Player.get(), 1, 4440, 2, false, false);         
 Entity.addEffect(Player.get(), 11, 4440, 4, false, false); 
 Entity.addEffect(Player.get(), 12, 4440, 1, false, false); 
 Entity.addEffect(Player.get(), 5, 4440, 1, false, false);  
   }
}
});