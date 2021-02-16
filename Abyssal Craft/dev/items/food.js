IDRegistry.genItemID("coraliumPlaguedFlesh");
IDRegistry.genItemID("coraliumPlaguedFleshOnABone");
IDRegistry.genItemID("MRE");
IDRegistry.genItemID("chickenOnAPlate");
IDRegistry.genItemID("porkchopOnAPlate");
IDRegistry.genItemID("beefOnAPlate");
IDRegistry.genItemID("fishOnAPlate");
IDRegistry.genItemID("friedEgg");
IDRegistry.genItemID("friedEggOnAPlate");
IDRegistry.genItemID("antiBeef");
IDRegistry.genItemID("antiChicken");
IDRegistry.genItemID("antiPork");
IDRegistry.genItemID("rottenAntiFlesh");
IDRegistry.genItemID("antiSpiderEye");
IDRegistry.genItemID("omotholGhoulFlesh");
IDRegistry.genItemID("antiPlaguedFlesh");
IDRegistry.genItemID("antiPlaguedFleshOnABone");

const AbyssalCraftFoodItems = [];

/**@param {string} str must look like "Name_foodValue_stack" */
function quickCreateFoodItem(str){
     let name = str.split(" ");
     let ending = name[name.length - 1].split("_");
     let stackSize = parseInt(ending.pop()); 
     let foodValue = parseInt(ending.pop());
     name[name.length - 1] = ending;
     name = name.join(" ");
     let id = name.split(" ");
     for(let i in id) id[i] = (i == 0 ? id[i][0].toLowerCase() : id[i][0].toUpperCase()) + id[i].slice(1, id[1].length);
     id = id.join('');
     if(id.indexOf("-") !== -1) id[id.indexOf("-")] = "_";
     let texture = name.toLowerCase().split(" ").join("_");
     if(texture.indexOf("-") !== -1) texture[texture.indexOf("-")] = "_";
     IDRegistry.genItemID(id);
     Item.createFoodItem(id, name, {name: texture}, {stack: stackSize, isTech: false, food: foodValue});
     AbyssalCraftFoodItems.push(ItemID[id]);
}

const AbyssalCraftFoodItemNames = [
     "Coralium-plagued Flesh_2_64", "Coralium-plagued Flesh on a Bone_2_64", "MRE_20_4",
     "Chicken on A Plate_9_4", "Porkchop on A Plate_12_4", "Beef on A Plate_12_4", "Fish on A Plate_8_4",
     "Fried Egg_5_64", "Fried Egg on A Plate_8_4", "Anti-Beef_0_64", "Anti-Chicken_0_64", "Anti-Pork_0_64",
     "Rotten Anti-Flesh_0_64", "Anti-Spider Eye_0_64", "Omothol Ghoul Flesh_3_64", "Anti-plagued Flesh_0_64",
     "Anti-plagued Flesh on a Bone_0_64"
]

for(let i in AbyssalCraftFoodItemNames) quickCreateFoodItem(AbyssalCraftFoodItemNames[i]);

Callback.addCallback("FoodEaten", function(food, ratio, player){
     let item = Entity.getCarriedItem(player);
     let actor = new PlayerActor(player);
     if(item.id == ItemID.coralium_plaguedFleshOnABone){
          actor.addItemToInventory(352, 1, 0);
     } else if(item.id == ItemID.anti_plaguedFleshOnABone){
          actor.addItemToInventory(ItemID.anti_bone, 1, 0);
     }
     if([ItemID.MRE, ItemID.chickenOnAPlate, ItemID.porkchopOnAPlate, ItemID.beefOnAPlate, ItemID.fishOnAPlate, ItemID.friedEggOnAPlate].indexOf(item.id) !== -1){
          actor.addItemToInventory(ItemID.dirtyPlate, 1, 0);
     }
     if(item.id == ItemID.coralium_plaguedFlesh || item.id == ItemID.coralium_plaguedFleshOnABone){
          Entity.addEffect(player, Native.PotionEffect.confusion, 1, 600, true, false);
          Entity.addEffect(player, Native.PotionEffect.hunger, 2, 600, true, false);
     }
     if([ItemID.rottenAnti_flesh, ItemID.anti_spiderEye, ItemID.anti_plaguedFlesh, ItemID.anti_plaguedFleshOnABone].indexOf(item.id) !== -1){
          Entity.addEffect(player, Native.PotionEffect.regeneration, 1, 600, true, false);
          Entity.addEffect(player, Native.PotionEffect.saturation, 2, 600, true, false);
     }
     if([ItemID.anti_beef, ItemID.anti_chicken, ItemID.anti_pork].indexOf(item.id) !== -1){
          Entity.addEffect(player, Native.PotionEffect.hunger, 2, 600, true, false);
     }
     if(item.id == ItemID.omotholGhoulFlesh){
          Entity.addEffect(player, Native.PotionEffect.nightVision, 1, 30, true, false);
          Entity.addEffect(player, Native.PotionEffect.blindness, 1, 30, true, false);
          Entity.addEffect(player, Native.PotionEffect.weakness, 1, 100, true, false);
          Entity.addEffect(player, Native.PotionEffect.confusion, 1, 150, true, false);
          Entity.addEffect(player, Native.PotionEffect.hunger, 2, 200, true, false);
     }
});

Item.addCreativeGroup("ACFoodstuffs", Translation.translate("AbyssalCraft Foodstuffs"), AbyssalCraftFoodItems);