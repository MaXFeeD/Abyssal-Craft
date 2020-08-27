//Tier1
IDRegistry.genItemID("abyssSSword");
Item.createItem("abyssSSword", "Dark Stone Sword", {name: "DSW", meta: 0}, {stack: 1});

IDRegistry.genItemID("abyssSShovel");
Item.createItem("abyssSShovel", "Dark Stone Shovel", {name: "DS", meta: 0}, {stack: 1});

IDRegistry.genItemID("abyssSPickaxe");
Item.createItem("abyssSPickaxe", "Dark Stone Pickaxe", {name: "DP", meta: 0}, {stack: 1});

IDRegistry.genItemID("abyssSAxe");
Item.createItem("abyssSAxe", "Dark Stone Axe", {name: "DA", meta: 0}, {stack: 1});

IDRegistry.genItemID("abyssSHoe");
Item.createItem("abyssSHoe", "Dark Stone Hoe", {name: "DH", meta: 0}, {stack: 1});

ToolAPI.addToolMaterial("abyssSsw", {durability: 496, level: 2, efficiency: 4, damage: 9, enchantability: 14});
ToolAPI.addToolMaterial("abyssSsh", {durability: 448, level: 2, efficiency: 6, damage: 3, enchantability: 14});
ToolAPI.addToolMaterial("abyssSpi", {durability: 512, level: 2, efficiency: 6, damage: 4, enchantability: 14});
ToolAPI.addToolMaterial("abyssSaxe", {durability: 510, level: 2, efficiency: 6, damage: 5, enchantability: 14});
ToolAPI.addToolMaterial("abyssShoe", {durability: 506, level: 2, efficiency: 6, damage: 3, enchantability: 14});

ToolLib.setTool(ItemID.abyssSSword, "abyssSsw", ToolType.sword);
ToolLib.setTool(ItemID.abyssSShovel, "abyssSsh", ToolType.shovel);
ToolLib.setTool(ItemID.abyssSPickaxe, "abyssSpi", ToolType.pickaxe);
ToolLib.setTool(ItemID.abyssSAxe, "abyssSaxe", ToolType.axe);
ToolLib.setTool(ItemID.abyssSHoe, "abyssShoe", ToolType.hoe);
Callback.addCallback("PostLoaded", function(){  
Recipes.addShaped({id: ItemID.abyssSSword, count: 1, data: 0}, [
    "a",
    "a",
    "b"
], ['a', BlockID.stoneDark, 0, 'b', 280, 0]);

Recipes.addShaped({id: ItemID.abyssSShovel, count: 1, data: 0}, [
    "a",
    "b",
    "b"
], ['a', BlockID.stoneDark, 0, 'b', 280, 0]);

Recipes.addShaped({id: ItemID.abyssSPickaxe, count: 1, data: 0}, [
    "aaa",
    " b ",
    " b "
], ['a', BlockID.stoneDark, 0, 'b', 280, 0]);

Recipes.addShaped({id: ItemID.abyssSAxe, count: 1, data: 0}, [
    "aa",
    "ab",
    " b"
], ['a', BlockID.stoneDark, 0, 'b', 280, 0]);

Recipes.addShaped({id: ItemID.abyssSHoe, count: 1, data: 0}, [
   "aa",
    "b",
    "b"
], ['a', BlockID.stoneDark, 0, 'b', 280, 0]);
Item.addRepairItemIds(ItemID.abyssSSword, [BlockID.stoneDark, ItemID.abyssSSword]);
Item.addRepairItemIds(ItemID.abyssSShovel, [BlockID.stoneDark, ItemID.abyssSShovel]);
Item.addRepairItemIds(ItemID.abyssSPickaxe, [BlockID.stoneDark, ItemID.abyssSPickaxe]);
Item.addRepairItemIds(ItemID.abyssSAxe, [BlockID.stoneDark, ItemID.abyssSAxe]);
Item.addRepairItemIds(ItemID.abyssSHoe, [BlockID.stoneDark, ItemID.abyssSHoe]);
});
//Tier2
IDRegistry.genItemID("abyssSword");
Item.createItem("abyssSword", "Abyssalnite Sword", {name: "ASW", meta: 0}, {stack: 1});

IDRegistry.genItemID("abyssShovel");
Item.createItem("abyssShovel", "Abyssalnite Shovel", {name: "AS", meta: 0}, {stack: 1});

IDRegistry.genItemID("abyssPickaxe");
Item.createItem("abyssPickaxe", "Abyssalnite Pickaxe", {name: "AP", meta: 0}, {stack: 1});

IDRegistry.genItemID("abyssAxe");
Item.createItem("abyssAxe", "Abyssalnite Axe", {name: "AA", meta: 0}, {stack: 1});

IDRegistry.genItemID("abyssHoe");
Item.createItem("abyssHoe", "Abyssalnite Hoe", {name: "AH", meta: 0}, {stack: 1});

ToolAPI.addToolMaterial("abysssw", {durability: 1129, level: 5, efficiency: 4, damage: 9, enchantability: 14});
ToolAPI.addToolMaterial("abysssh", {durability: 1562, level: 5, efficiency: 6, damage: 3, enchantability: 14});
ToolAPI.addToolMaterial("abysspi", {durability: 1568, level: 5, efficiency: 6, damage: 4, enchantability: 14});
ToolAPI.addToolMaterial("abyssaxe", {durability: 1562, level: 5, efficiency: 6, damage: 5, enchantability: 14});
ToolAPI.addToolMaterial("abysshoe", {durability: 1562, level: 5, efficiency: 6, damage: 3, enchantability: 14});

ToolLib.setTool(ItemID.abyssSword, "abysssw", ToolType.sword);
ToolLib.setTool(ItemID.abyssShovel, "abysssh", ToolType.shovel);
ToolLib.setTool(ItemID.abyssPickaxe, "abysspi", ToolType.pickaxe);
ToolLib.setTool(ItemID.abyssAxe, "abyssaxe", ToolType.axe);
ToolLib.setTool(ItemID.abyssHoe, "abysshoe", ToolType.hoe);
Recipes.addShaped({id: ItemID.abyssSword, count: 1, data: 0}, [
    "a",
    "a",
    "b"
], ['a', ItemID.abbIron, 0, 'b', 280, 0]);

Recipes.addShaped({id: ItemID.abyssShovel, count: 1, data: 0}, [
    "a",
    "b",
    "b"
], ['a', ItemID.abbIron, 0, 'b', 280, 0]);
6
Recipes.addShaped({id: ItemID.abyssPickaxe, count: 1, data: 0}, [
    "aaa",
    " b ",
    " b "
], ['a', ItemID.abbIron, 0, 'b', 280, 0]);

Recipes.addShaped({id: ItemID.abyssAxe, count: 1, data: 0}, [
    "aa",
    "ab",
    " b"
], ['a', ItemID.abbIron, 0, 'b', 280, 0]);

Recipes.addShaped({id: ItemID.abyssHoe, count: 1, data: 0}, [
   "aa",
    "b",
    "b"
], ['a', ItemID.abbIron, 0, 'b', 280, 0]);

Item.addRepairItemIds(ItemID.abyssSword, [ItemID.abbIron, ItemID.abyssSword]);
Item.addRepairItemIds(ItemID.abyssShovel, [ItemID.abbIron, ItemID.abyssShovel]);
Item.addRepairItemIds(ItemID.abyssPickaxe, [ItemID.abbIron, ItemID.abyssPickaxe]);
Item.addRepairItemIds(ItemID.abyssAxe, [ItemID.abbIron, ItemID.abyssAxe]);
Item.addRepairItemIds(ItemID.abyssHoe, [ItemID.abbIron, ItemID.abyssHoe]);

//Coralium
IDRegistry.genItemID("corSword");
Item.createItem("corSword", "Reinforced Coralium Sword", {name: "RCSW", meta: 0}, {stack: 1});

IDRegistry.genItemID("corShovel");
Item.createItem("corShovel", "Reinforced Coralium Shovel", {name: "RCS", meta: 0}, {stack: 1});

IDRegistry.genItemID("corPickaxe");
Item.createItem("corPickaxe", "Reinforced Coralium Pickaxe", {name: "RCP", meta: 0}, {stack: 1});

IDRegistry.genItemID("corAxe");
Item.createItem("corAxe", "Reinforced Coralium Axe", {name: "RCA", meta: 0}, {stack: 1});

IDRegistry.genItemID("corHoe");
Item.createItem("corHoe", "Reinforced Coralium Hoe", {name: "RCH", meta: 0}, {stack: 1});

ToolAPI.addToolMaterial("corsw", {durability: 1189, level: 5, efficiency: 4, damage: 10, enchantability: 14});
ToolAPI.addToolMaterial("corsh", {durability: 1610, level: 5, efficiency: 6, damage: 3, enchantability: 14});
ToolAPI.addToolMaterial("corpi", {durability: 1506, level: 5, efficiency: 6, damage: 4, enchantability: 14});
ToolAPI.addToolMaterial("coraxe", {durability: 1598, level: 5, efficiency: 6, damage: 5, enchantability: 14});
ToolAPI.addToolMaterial("corhoe", {durability: 1597, level: 5, efficiency: 6, damage: 3, enchantability: 14});

ToolLib.setTool(ItemID.corSword, "corsw", ToolType.sword);
ToolLib.setTool(ItemID.corShovel, "corsh", ToolType.shovel);
ToolLib.setTool(ItemID.corPickaxe, "corpi", ToolType.pickaxe);
ToolLib.setTool(ItemID.corAxe, "coraxe", ToolType.axe);
ToolLib.setTool(ItemID.corHoe, "corhoe", ToolType.hoe);
Recipes.addShaped({id: ItemID.corSword, count: 1, data: 0}, [
    "a",
    "a",
    "b"
], ['a', ItemID.coralIron, 0, 'b', 280, 0]);

Recipes.addShaped({id: ItemID.corShovel, count: 1, data: 0}, [
    "a",
    "b",
    "b"
], ['a', ItemID.coralIron, 0, 'b', 280, 0]);
6
Recipes.addShaped({id: ItemID.corPickaxe, count: 1, data: 0}, [
    "aaa",
    " b ",
    " b "
], ['a', ItemID.coralIron, 0, 'b', 280, 0]);

Recipes.addShaped({id: ItemID.corAxe, count: 1, data: 0}, [
    "aa",
    "ab",
    " b"
], ['a', ItemID.coralIron, 0, 'b', 280, 0]);

Recipes.addShaped({id: ItemID.corHoe, count: 1, data: 0}, [
   "aa",
    "b",
    "b"
], ['a', ItemID.coralIron, 0, 'b', 280, 0]);

Item.addRepairItemIds(ItemID.corSword, [ItemID.coralIron, ItemID.corSword]);
Item.addRepairItemIds(ItemID.corShovel, [ItemID.coralIron, ItemID.corShovel]);
Item.addRepairItemIds(ItemID.corPickaxe, [ItemID.coralIron, ItemID.corPickaxe]);
Item.addRepairItemIds(ItemID.corAxe, [ItemID.coralIron, ItemID.corAxe]);
Item.addRepairItemIds(ItemID.corHoe, [ItemID.coralIron, ItemID.corHoe]);

//Tier3
IDRegistry.genItemID("dreSword");
Item.createItem("dreSword", "Dredalinite Sword", {name: "DDSW", meta: 0}, {stack: 1});

IDRegistry.genItemID("dreShovel");
Item.createItem("dreShovel", "Dredalinite Shovel", {name: "DDS", meta: 0}, {stack: 1});

IDRegistry.genItemID("drePickaxe");
Item.createItem("drePickaxe", "Dredalinite Pickaxe", {name: "DDP", meta: 0}, {stack: 1});

IDRegistry.genItemID("dreAxe");
Item.createItem("dreAxe", "Dredalinite Axe", {name: "DDA", meta: 0}, {stack: 1});

IDRegistry.genItemID("dreHoe");
Item.createItem("dreHoe", "Dredalinite Hoe", {name: "DDH", meta: 0}, {stack: 1});

ToolAPI.addToolMaterial("dresw", {durability: 1329, level: 5, efficiency: 4, damage: 12, enchantability: 14});
ToolAPI.addToolMaterial("dresh", {durability: 1762, level: 5, efficiency: 6, damage: 3, enchantability: 14});
ToolAPI.addToolMaterial("drepi", {durability: 1768, level: 5, efficiency: 6, damage: 4, enchantability: 14});
ToolAPI.addToolMaterial("dreaxe", {durability: 1762, level: 5, efficiency: 6, damage: 5, enchantability: 14});
ToolAPI.addToolMaterial("drehoe", {durability: 1762, level: 5, efficiency: 6, damage: 3, enchantability: 14});

ToolLib.setTool(ItemID.dreSword, "dresw", ToolType.sword);
ToolLib.setTool(ItemID.dreShovel, "dresh", ToolType.shovel);
ToolLib.setTool(ItemID.drePickaxe, "drepi", ToolType.pickaxe);
ToolLib.setTool(ItemID.dreAxe, "dreaxe", ToolType.axe);
ToolLib.setTool(ItemID.dreHoe, "drehoe", ToolType.hoe);
Recipes.addShaped({id: ItemID.dreSword, count: 1, data: 0}, [
    "a",
    "a",
    "b"
], ['a', ItemID.dreadIron, 0, 'b', 280, 0]);

Recipes.addShaped({id: ItemID.dreShovel, count: 1, data: 0}, [
    "a",
    "b",
    "b"
], ['a', ItemID.dreadIron, 0, 'b', 280, 0]);
6
Recipes.addShaped({id: ItemID.drePickaxe, count: 1, data: 0}, [
    "aaa",
    " b ",
    " b "
], ['a', ItemID.dreadIron, 0, 'b', 280, 0]);

Recipes.addShaped({id: ItemID.dreAxe, count: 1, data: 0}, [
    "aa",
    "ab",
    " b"
], ['a', ItemID.dreadIron, 0, 'b', 280, 0]);

Recipes.addShaped({id: ItemID.dreHoe, count: 1, data: 0}, [
   "aa",
    "b",
    "b"
], ['a', ItemID.dreadIron, 0, 'b', 280, 0]);

Item.addRepairItemIds(ItemID.dreSword, [ItemID.dreadIron, ItemID.dreSword]);
Item.addRepairItemIds(ItemID.dreShovel, [ItemID.dreadIron, ItemID.dreShovel]);
Item.addRepairItemIds(ItemID.drePickaxe, [ItemID.dreadIron, ItemID.drePickaxe]);
Item.addRepairItemIds(ItemID.dreAxe, [ItemID.dreadIron, ItemID.dreAxe]);
Item.addRepairItemIds(ItemID.dreHoe, [ItemID.dreadIron, ItemID.dreHoe]);

//Ethaxium
IDRegistry.genItemID("ethSword");
Item.createItem("ethSword", "Ethaxium Sword", {name: "ESW", meta: 0}, {stack: 1});

IDRegistry.genItemID("ethShovel");
Item.createItem("ethShovel", "Ethaxium Shovel", {name: "ES", meta: 0}, {stack: 1});

IDRegistry.genItemID("ethPickaxe");
Item.createItem("ethPickaxe", "Ethaxium Pickaxe", {name: "EP", meta: 0}, {stack: 1});

IDRegistry.genItemID("ethAxe");
Item.createItem("ethAxe", "Ethaxium Axe", {name: "EA", meta: 0}, {stack: 1});

IDRegistry.genItemID("ethHoe");
Item.createItem("ethHoe", "Ethaxium Hoe", {name: "EH", meta: 0}, {stack: 1});

ToolAPI.addToolMaterial("ethsw", {durability: 1929, level: 6, efficiency: 5, damage: 15, enchantability: 14});
ToolAPI.addToolMaterial("ethsh", {durability: 2162, level: 6, efficiency: 7, damage: 4, enchantability: 14});
ToolAPI.addToolMaterial("ethpi", {durability: 2168, level: 6, efficiency: 7, damage: 4, enchantability: 14});
ToolAPI.addToolMaterial("ethaxe", {durability: 2162, level: 6, efficiency: 7, damage: 6, enchantability: 14});
ToolAPI.addToolMaterial("ethhoe", {durability: 2162, level: 6, efficiency: 7, damage: 3, enchantability: 14});

ToolLib.setTool(ItemID.ethSword, "ethsw", ToolType.sword);
ToolLib.setTool(ItemID.ethShovel, "ethsh", ToolType.shovel);
ToolLib.setTool(ItemID.ethPickaxe, "ethpi", ToolType.pickaxe);
ToolLib.setTool(ItemID.ethAxe, "ethaxe", ToolType.axe);
ToolLib.setTool(ItemID.ethHoe, "ethhoe", ToolType.hoe);
Recipes.addShaped({id: ItemID.ethSword, count: 1, data: 0}, [
    "a",
    "a",
    "b"
], ['a', ItemID.ethIron, 0, 'b', ItemID.ethBrick, 0]);

Recipes.addShaped({id: ItemID.ethShovel, count: 1, data: 0}, [
    "a",
    "b",
    "b"
], ['a', ItemID.ethIron, 0, 'b', ItemID.ethBrick, 0]);
6
Recipes.addShaped({id: ItemID.ethPickaxe, count: 1, data: 0}, [
    "aaa",
    " b ",
    " b "
], ['a', ItemID.ethIron, 0, 'b', ItemID.ethBrick, 0]);

Recipes.addShaped({id: ItemID.ethAxe, count: 1, data: 0}, [
    "aa",
    "ab",
    " b"
], ['a', ItemID.ethIron, 0, 'b', ItemID.ethBrick, 0]);

Recipes.addShaped({id: ItemID.ethHoe, count: 1, data: 0}, [
   "aa",
    "b",
    "b"
], ['a', ItemID.ethIron, 0, 'b', ItemID.ethBrick, 0]);

Item.addRepairItemIds(ItemID.ethSword, [ItemID.ethIron, ItemID.ethSword]);
Item.addRepairItemIds(ItemID.ethShovel, [ItemID.ethIron, ItemID.ethShovel ]);
Item.addRepairItemIds(ItemID.ethPickaxe, [ItemID.ethIron, ItemID.ethPickaxe]);
Item.addRepairItemIds(ItemID.ethAxe, [ItemID.ethIron, ItemID.ethAxe]);
Item.addRepairItemIds(ItemID.ethHoe, [ItemID.ethIron, ItemID.ethHoe]);

IDRegistry.genItemID("soulSword");
Item.createItem("soulSword", "Soul Reaper", {name: "soulReaper", meta: 0}, {stack: 1});

ToolAPI.addToolMaterial("ssw", {durability: 2000, level: 6, efficiency: 6, damage: 20, enchantability: 14});
ToolLib.setTool(ItemID.soulSword, "ssw", ToolType.sword);

//Item.addRepairItemIds(ItemID.soulSword, [ItemID.soulG, ItemID.soulSword]);
//Item.addRepairItemIds(ItemID.soulSword, [ItemID.ethIron, ItemID.soulSword]);

IDRegistry.genItemID("caneJ");
Item.createItem("caneJ", "Jzahar's Cane", {name: "SOTG", meta: 0}, {stack: 1});

IDRegistry.genItemID("caneJr");
Item.createItem("caneJr", "Jzahar's Cane", {name: "SOTG", meta: 0}, {stack: 1});

var CaneM = new RenderMesh(__dir__ + "/models/Cane.obj","obj", {translate: [0, .18, 0], scale: [1.5, 1.5, 1.5]});

ItemModel.getFor(ItemID.caneJ, 0).setModel(CaneM, "staff");
ItemModel.getFor(ItemID.caneJr, 0).setModel(CaneM, "staff2");

IDRegistry.genItemID("Katana");
Item.createItem("Katana", "Dreaded Katana", {name: "SOTG", meta: 0}, {stack: 1});

var KatanaM = new RenderMesh(__dir__ + "/models/Katana.obj","obj", {translate: [0.5, 0, 0.5], scale: [1.5, 1.5, 1.5]});
ItemModel.getFor(ItemID.Katana, 0).setModel(KatanaM, "katana");

ToolAPI.addToolMaterial("kt", {durability: 3000, level: 7, efficiency: 7, damage: 32, enchantability: 14});
ToolLib.setTool(ItemID.Katana, "kt", ToolType.sword);

ToolAPI.addToolMaterial("cjzr", {durability: 2256, level: 6, efficiency: 6, damage: 24, enchantability: 14});
ToolLib.setTool(ItemID.caneJr, "cjzr", ToolType.sword);

var lookDir = function(yaw, pitch){
 var vector = {};
 vector.y = -Math.sin((pitch));
 vector.x = -Math.sin((yaw)) * Math.cos((pitch));
 vector.z = Math.cos((yaw)) * Math.cos((pitch));
return vector;
}

Callback.addCallback("ItemUseNoTarget", function(item){
if (Player.getCarriedItem().id == ItemID.caneJr) {  
let coords = Entity.getPosition(Player.get());
let lookAngle = Entity.getLookAngle(Player.get()); 
  var yaw = lookAngle.yaw + lookDir((Math.random() * 5) - (5 / 2));
   var pitch = lookAngle.pitch + lookDir((Math.random() * 5) - (5 / 2));
    let velocity = {
   x: -Math.sin((yaw)) * Math.cos((pitch)),
   y: Math.sin((pitch)),
   z: Math.cos((yaw)) * Math.cos((pitch))}
let entity = Entity.spawn(coords.x, coords.y, coords.z, Native.EntityType.SMALL_FIREBALL);
 Entity.moveToAngle(entity, velocity, {speed: 6,  denyY: false,  jumpVel: 0});
}         
});
