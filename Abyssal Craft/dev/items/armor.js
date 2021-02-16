//=============//
// ABYSSALNITE //
//=============//

IDRegistry.genItemID("abyssalniteHelmet");
Item.createArmorItem("abyssalniteHelmet", "Abyssalnite Helmet", {name: "abyssalnite_helmet"}, {type: "helmet", armor: 3, durability: 385, texture: "armor/abyssalnite_1.png", isTech: false});

IDRegistry.genItemID("abyssalniteChestplate");
Item.createArmorItem("abyssalniteChestplate", "Abyssalnite Chestplate", {name: "abyssalnite_chestplate"}, {type: "chestplate", armor: 8, durability: 560, texture: "armor/abyssalnite_1.png", isTech: false});

IDRegistry.genItemID("abyssalniteLeggings");
Item.createArmorItem("abyssalniteLeggings", "Abyssalnite Leggings", {name: "abyssalnite_leggings"}, {type: "leggings", armor: 6, durability: 525, texture: "armor/abyssalnite_2.png", isTech: false});

IDRegistry.genItemID("abyssalniteBoots");
Item.createArmorItem("abyssalniteBoots", "Abyssalnite Boots", {name: "abyssalnite_boots"}, {type: "boots", armor: 3, durability: 455, texture: "armor/abyssalnite_1.png", isTech: false});

Item.addRepairItemIds(ItemID.abyssalniteHelmet, [ItemID.abyssalniteHelmet]);
Item.addRepairItemIds(ItemID.abyssalniteChestplate, [ItemID.abyssalniteChestplate]);
Item.addRepairItemIds(ItemID.abyssalniteLeggings, [ItemID.abyssalniteLeggings]);
Item.addRepairItemIds(ItemID.abyssalniteBoots, [ItemID.abyssalniteBoots]);

//=====================//
// DREADED ABYSSALNITE //
//=====================//

IDRegistry.genItemID("dreadedAbyssalniteHelmet");
Item.createArmorItem("dreadedAbyssalniteHelmet", "Dreaded Abyssalnite Helmet", {name: "dreaded_abyssalnite_helmet"}, {type: "helmet", armor: 3, durability: 396, texture: "armor/dreaded_abyssalnite_1.png", isTech: false});

IDRegistry.genItemID("dreadedAbyssalniteChestplate");
Item.createArmorItem("dreadedAbyssalniteChestplate", "Dreaded Abyssalnite Chestplate", {name: "dreaded_abyssalnite_chestplate"}, {type: "chestplate", armor: 8, durability: 576, texture: "armor/dreaded_abyssalnite_1.png", isTech: false});

IDRegistry.genItemID("dreadedAbyssalniteLeggings");
Item.createArmorItem("dreadedAbyssalniteLeggings", "Dreaded Abyssalnite Leggings", {name: "dreaded_abyssalnite_leggings"}, {type: "leggings", armor: 6, durability: 540, texture: "armor/dreaded_abyssalnite_2.png", isTech: false});

IDRegistry.genItemID("dreadedAbyssalniteBoots");
Item.createArmorItem("dreadedAbyssalniteBoots", "Dreaded Abyssalnite Boots", {name: "dreaded_abyssalnite_boots"}, {type: "boots", armor: 3, durability: 468, texture: "armor/dreaded_abyssalnite_1.png", isTech: false});

Item.addRepairItemIds(ItemID.dreadedAbyssalniteHelmet, [ItemID.dreadedAbyssalniteHelmet]);
Item.addRepairItemIds(ItemID.dreadedAbyssalniteChestplate, [ItemID.dreadedAbyssalniteChestplate]);
Item.addRepairItemIds(ItemID.dreadedAbyssalniteLeggings, [ItemID.dreadedAbyssalniteLeggings]);
Item.addRepairItemIds(ItemID.dreadedAbyssalniteBoots, [ItemID.dreadedAbyssalniteBoots]);

//helmet - night vision
//chestplate, leggings, boots - fire resistance IV

Armor.registerOnTickListener(ItemID.dreadedAbyssalniteHelmet, function(item, slot, player){
    Entity.addEffect(player, 16, 1, 260, true, true);
});
Armor.registerOnTickListener(ItemID.dreadedAbyssalniteChestplate, function(item, slot, player){
    Entity.addEffect(player, 12, 4, 40, true, true);
});
Armor.registerOnTickListener(ItemID.dreadedAbyssalniteLeggings, function(item, slot, player){
    Entity.addEffect(player, 12, 4, 40, true, true);
});
Armor.registerOnTickListener(ItemID.dreadedAbyssalniteBoots, function(item, slot, player){
    Entity.addEffect(player, 12, 4, 40, true, true);
});

//==================//
// REFINED CORALIUM //
//==================//

IDRegistry.genItemID("refinedCoraliumHelmet");
Item.createArmorItem("refinedCoraliumHelmet", "Refined Coralium Helmet", {name: "refined_coralium_helmet"}, {type: "helmet", armor: 3, durability: 407, texture: "armor/refined_coralium_1.png", isTech: false});

IDRegistry.genItemID("refinedCoraliumChestplate");
Item.createArmorItem("refinedCoraliumChestplate", "Refined Coralium Chestplate", {name: "refined_coralium_chestplate"}, {type: "chestplate", armor: 8, durability: 592, texture: "armor/refined_coralium_1.png", isTech: false});

IDRegistry.genItemID("refinedCoraliumLeggings");
Item.createArmorItem("refinedCoraliumLeggings", "Refined Coralium Leggings", {name: "refined_coralium_leggings"}, {type: "leggings", armor: 6, durability: 555, texture: "armor/refined_coralium_2.png", isTech: false});

IDRegistry.genItemID("refinedCoraliumBoots");
Item.createArmorItem("refinedCoraliumBoots", "Refined Coralium Boots", {name: "refined_coralium_boots"}, {type: "boots", armor: 3, durability: 481, texture: "armor/refined_coralium_1.png", isTech: false});

Item.addRepairItemIds(ItemID.refinedCoraliumHelmet, [ItemID.refinedCoraliumHelmet]);
Item.addRepairItemIds(ItemID.refinedCoraliumChestplate, [ItemID.refinedCoraliumChestplate]);
Item.addRepairItemIds(ItemID.refinedCoraliumLeggings, [ItemID.refinedCoraliumLeggings]);
Item.addRepairItemIds(ItemID.refinedCoraliumBoots, [ItemID.refinedCoraliumBoots]);

//helmet - water breathing
//chestplate - resistance I
//boots - speed I

Armor.registerOnTickListener(ItemID.refinedCoraliumHelmet, function(item, slot, player){
    Entity.addEffect(player, 13, 1, 20, true, true);
});
Armor.registerOnTickListener(ItemID.refinedCoraliumChestplate, function(item, slot, player){
    Entity.addEffect(player, 11, 1, 20, true, true);
});
Armor.registerOnTickListener(ItemID.refinedCoraliumBoots, function(item, slot, player){
    Entity.addEffect(player, 1, 1, 20, true, true);
});

//=================//
// PLATED CORALIUM //
//=================//

IDRegistry.genItemID("platedCoraliumHelmet");
Item.createArmorItem("platedCoraliumHelmet", "Plated Coralium Helmet", {name: "plated_coralium_helmet"}, {type: "helmet", armor: 4, durability: 605, texture: "armor/plated_coralium_1.png", isTech: false});

IDRegistry.genItemID("platedCoraliumChestplate");
Item.createArmorItem("platedCoraliumChestplate", "Plated Coralium Chestplate", {name: "plated_coralium_chestplate"}, {type: "chestplate", armor: 9, durability: 880, texture: "armor/plated_coralium_1.png", isTech: false});

IDRegistry.genItemID("platedCoraliumLeggings");
Item.createArmorItem("platedCoraliumLeggings", "Plated Coralium Leggings", {name: "plated_coralium_leggings"}, {type: "leggings", armor: 7, durability: 825, texture: "armor/plated_coralium_2.png", isTech: false});

IDRegistry.genItemID("platedCoraliumBoots");
Item.createArmorItem("platedCoraliumBoots", "Plated Coralium Boots", {name: "plated_coralium_boots"}, {type: "boots", armor: 4, durability: 715, texture: "armor/plated_coralium_1.png", isTech: false});

Item.addRepairItemIds(ItemID.platedCoraliumHelmet, [ItemID.platedCoraliumHelmet]);
Item.addRepairItemIds(ItemID.platedCoraliumChestplate, [ItemID.platedCoraliumChestplate]);
Item.addRepairItemIds(ItemID.platedCoraliumLeggings, [ItemID.platedCoraliumLeggings]);
Item.addRepairItemIds(ItemID.platedCoraliumBoots, [ItemID.platedCoraliumBoots]);

//helmet - night vision
//boots - speed II; speed III and water breathing while in water

Armor.registerOnTickListener(ItemID.platedCoraliumHelmet, function(item, slot, player){
    Entity.addEffect(player, 16, 1, 260, true, true);
});
Armor.registerOnTickListener(ItemID.platedCoraliumBoots, function(item, slot, player){
    let pos = Entity.getPosition(player);
    let region = BlockSource.getDefaultForActor(player);
    let down = region.getBlockId(pos.x, pos.y, pos.z);
    let up = region.getBlockId(pos.x, pos.y + 1, pos.z);
    if((down == 8 || down == 9) || (up == 8 || up == 9)){
        Entity.addEffect(player, 1, 3, 20, true, true);
        Entity.addEffect(player, 13, 1, 20, true, true);
    } else Entity.addEffect(player, 1, 2, 20, true, true);
});

//========//
// DEPTHS //
//========//

IDRegistry.genItemID("depthsHelmet");
Item.createArmorItem("depthsHelmet", "Visage of The Depths", {name: "depths_helmet"}, {type: "helmet", armor: 3, durability: 363, texture: "armor/depths_1.png", isTech: false});

IDRegistry.genItemID("depthsChestplate");
Item.createArmorItem("depthsChestplate", "Chestplate of The Depths", {name: "depths_chestplate"}, {type: "chestplate", armor: 8, durability: 528, texture: "armor/depths_1.png", isTech: false});

IDRegistry.genItemID("depthsLeggings");
Item.createArmorItem("depthsLeggings", "Legguards of The Depths", {name: "depths_leggings"}, {type: "leggings", armor: 6, durability: 495, texture: "armor/depths_2.png", isTech: false});

IDRegistry.genItemID("depthsBoots");
Item.createArmorItem("depthsBoots", "Boots of The Depths", {name: "depths_boots"}, {type: "boots", armor: 3, durability: 429, texture: "armor/depths_1.png", isTech: false});

Item.addRepairItemIds(ItemID.depthsHelmet, [ItemID.depthsHelmet]);
Item.addRepairItemIds(ItemID.depthsChestplate, [ItemID.depthsChestplate]);
Item.addRepairItemIds(ItemID.depthsLeggings, [ItemID.depthsLeggings]);
Item.addRepairItemIds(ItemID.depthsBoots, [ItemID.depthsBoots]);

//helmet - water breathing, night vision
//chestplate - resistance I
//leggings - jump boost II
//boots - speed II

Armor.registerOnTickListener(ItemID.depthsHelmet, function(item, slot, player){
    Entity.addEffect(player, 16, 1, 260, true, true);
    Entity.addEffect(player, 13, 1, 20, true, true);
});
Armor.registerOnTickListener(ItemID.depthsChestplate, function(item, slot, player){
    Entity.addEffect(player, 11, 1, 20, true, true);
});
Armor.registerOnTickListener(ItemID.depthsLeggings, function(item, slot, player){
    Entity.addEffect(player, 8, 2, 20, true, true);
});
Armor.registerOnTickListener(ItemID.depthsBoots, function(item, slot, player){
    Entity.addEffect(player, 1, 2, 20, true, true);
});

//==========//
// DREADIUM //
//==========//

IDRegistry.genItemID("dreadiumHelmet");
Item.createArmorItem("dreadiumHelmet", "Dreadium Helmet", {name: "dreadium_helmet"}, {type: "helmet", armor: 3, durability: 440, texture: "armor/dreadium_1.png", isTech: false});

IDRegistry.genItemID("dreadiumChestplate");
Item.createArmorItem("dreadiumChestplate", "Dreadium Chestplate", {name: "dreadium_chestplate"}, {type: "chestplate", armor: 8, durability: 640, texture: "armor/dreadium_1.png", isTech: false});

IDRegistry.genItemID("dreadiumLeggings");
Item.createArmorItem("dreadiumLeggings", "Dreadium Leggings", {name: "dreadium_leggings"}, {type: "leggings", armor: 6, durability: 600, texture: "armor/dreadium_2.png", isTech: false});

IDRegistry.genItemID("dreadiumBoots");
Item.createArmorItem("dreadiumBoots", "Dreadium Boots", {name: "dreadium_boots"}, {type: "boots", armor: 3, durability: 520, texture: "armor/dreadium_1.png", isTech: false});

Item.addRepairItemIds(ItemID.dreadiumHelmet, [ItemID.dreadiumHelmet]);
Item.addRepairItemIds(ItemID.dreadiumChestplate, [ItemID.dreadiumChestplate]);
Item.addRepairItemIds(ItemID.dreadiumLeggings, [ItemID.dreadiumLeggings]);
Item.addRepairItemIds(ItemID.dreadiumBoots, [ItemID.dreadiumBoots]);

//chestplate - resistance I
//boots - speed I

Armor.registerOnTickListener(ItemID.dreadiumChestplate, function(item, slot, player){
    Entity.addEffect(player, 11, 1, 20, true, true);
});
Armor.registerOnTickListener(ItemID.dreadiumBoots, function(item, slot, player){
    Entity.addEffect(player, 1, 1, 20, true, true);
});

//==================//
// DREADIUM SAMURAI //
//==================//

IDRegistry.genItemID("dreadiumSamuraiHelmet");
Item.createArmorItem("dreadiumSamuraiHelmet", "Dreadium Samurai Helmet", {name: "dreadium_samurai_helmet"}, {type: "helmet", armor: 3, durability: 495, texture: "armor/dreadium_samurai_1.png", isTech: false});

IDRegistry.genItemID("dreadiumSamuraiChestplate");
Item.createArmorItem("dreadiumSamuraiChestplate", "Dreadium Samurai Chestplate", {name: "dreadium_samurai_chestplate"}, {type: "chestplate", armor: 8, durability: 720, texture: "armor/dreadium_samurai_1.png", isTech: false});

IDRegistry.genItemID("dreadiumSamuraiLeggings");
Item.createArmorItem("dreadiumSamuraiLeggings", "Dreadium Samurai Leggings", {name: "dreadium_samurai_leggings"}, {type: "leggings", armor: 6, durability: 675, texture: "armor/dreadium_samurai_2.png", isTech: false});

IDRegistry.genItemID("dreadiumSamuraiBoots");
Item.createArmorItem("dreadiumSamuraiBoots", "Dreadium Samurai Boots", {name: "dreadium_samurai_boots"}, {type: "boots", armor: 3, durability: 585, texture: "armor/dreadium_samurai_1.png", isTech: false});

Item.addRepairItemIds(ItemID.dreadiumSamuraiHelmet, [ItemID.dreadiumSamuraiHelmet]);
Item.addRepairItemIds(ItemID.dreadiumSamuraiChestplate, [ItemID.dreadiumSamuraiChestplate]);
Item.addRepairItemIds(ItemID.dreadiumSamuraiLeggings, [ItemID.dreadiumSamuraiLeggings]);
Item.addRepairItemIds(ItemID.dreadiumSamuraiBoots, [ItemID.dreadiumSamuraiBoots]);

//helmet - night vision
//chestplate - strength I, resistance I
//leggings - fire resistance II
//boots - speed II

Armor.registerOnTickListener(ItemID.dreadiumSamuraiHelmet, function(item, slot, player){
    Entity.addEffect(player, 16, 1, 260, true, true);
});
Armor.registerOnTickListener(ItemID.dreadiumSamuraiChestplate, function(item, slot, player){
    Entity.addEffect(player, 5, 1, 20, true, true);
    Entity.addEffect(player, 11, 1, 20, true, true);
});
Armor.registerOnTickListener(ItemID.dreadiumSamuraiLeggings, function(item, slot, player){
    Entity.addEffect(player, 12, 2, 20, true, true);
});
Armor.registerOnTickListener(ItemID.dreadiumSamuraiBoots, function(item, slot, player){
    Entity.addEffect(player, 1, 2, 20, true, true);
});

//==========//
// ETHAXIUM //
//==========//

IDRegistry.genItemID("ethaxiumHelmet");
Item.createArmorItem("ethaxiumHelmet", "Ethaxium Helmet", {name: "ethaxium_helmet"}, {type: "helmet", armor: 3, durability: 550, texture: "armor/ethaxium_1.png", isTech: false});

IDRegistry.genItemID("ethaxiumChestplate");
Item.createArmorItem("ethaxiumChestplate", "Ethaxium Chestplate", {name: "ethaxium_chestplate"}, {type: "chestplate", armor: 8, durability: 800, texture: "armor/ethaxium_1.png", isTech: false});

IDRegistry.genItemID("ethaxiumLeggings");
Item.createArmorItem("ethaxiumLeggings", "Ethaxium Leggings", {name: "ethaxium_leggings"}, {type: "leggings", armor: 6, durability: 750, texture: "armor/ethaxium_2.png", isTech: false});

IDRegistry.genItemID("ethaxiumBoots");
Item.createArmorItem("ethaxiumBoots", "Ethaxium Boots", {name: "ethaxium_boots"}, {type: "boots", armor: 3, durability: 650, texture: "armor/ethaxium_1.png", isTech: false});

Item.addRepairItemIds(ItemID.ethaxiumHelmet, [ItemID.ethaxiumHelmet]);
Item.addRepairItemIds(ItemID.ethaxiumChestplate, [ItemID.ethaxiumChestplate]);
Item.addRepairItemIds(ItemID.ethaxiumLeggings, [ItemID.ethaxiumLeggings]);
Item.addRepairItemIds(ItemID.ethaxiumBoots, [ItemID.ethaxiumBoots]);

//boots - speed II
//on hurt - regeneration I, strength I, for 2 secs

Armor.registerOnTickListener(ItemID.ethaxiumBoots, function(item, slot, player){
    Entity.addEffect(player, 1, 2, 20, true, true);
});
Armor.registerOnHurtListener(ItemID.ethaxiumHelmet, function(item, slot, player, value, type, attacker, bool1, bool2){
    Entity.addEffect(player, 10, 1, 40, true, true);
    Entity.addEffect(player, 5, 1, 40, true, true);
});
Armor.registerOnHurtListener(ItemID.ethaxiumChestplate, function(item, slot, player, value, type, attacker, bool1, bool2){
    Entity.addEffect(player, 10, 1, 40, true, true);
    Entity.addEffect(player, 5, 1, 40, true, true);
});
Armor.registerOnHurtListener(ItemID.ethaxiumLeggings, function(item, slot, player, value, type, attacker, bool1, bool2){
    Entity.addEffect(player, 10, 1, 40, true, true);
    Entity.addEffect(player, 5, 1, 40, true, true);
});
Armor.registerOnHurtListener(ItemID.ethaxiumBoots, function(item, slot, player, value, type, attacker, bool1, bool2){
    Entity.addEffect(player, 10, 1, 40, true, true);
    Entity.addEffect(player, 5, 1, 40, true, true);
});

// === COLORING NAME === //

(function(){
    let colorSet = function(id, color){
        let arr = ["Helmet", "Chestplate", "Leggings", "Boots"];
        for(let i in arr){
            let element = arr[i];
            Item.registerNameOverrideFunction(ItemID[id + element], function(item, name){
                name = color + name;
                return name;
            });
        }
    }
    colorSet("abyssalnite", Native.Color.DARK_AQUA);
    colorSet("dreadedAbyssalnite", Native.Color.DARK_RED);
    colorSet("refinedCoralium", Native.Color.AQUA);
    colorSet("platedCoralium", Native.Color.GREEN);
    colorSet("depths", Native.Color.DARK_RED);
    colorSet("dreadium", Native.Color.DARK_RED);
    colorSet("dreadiumSamurai", Native.Color.DARK_RED);
    colorSet("ethaxium", Native.Color.AQUA);
})();

// ===================== //

//TODO crafting recipes