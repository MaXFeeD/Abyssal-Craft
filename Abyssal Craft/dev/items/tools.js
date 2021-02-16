IDRegistry.genItemID("gatewayKey");
Item.createItem("gatewayKey", "Gateway Key", {name: "gateway_key"}, {stack: 1});
Item.setToolRender(ItemID.gatewayKey, true);
Item.registerNameOverrideFunction(ItemID.gatewayKey, function(item, name){
    return name + "\n§7" + Translation.translate("Click on the ground to \n§7create a portal. Infinite uses.");
});

(function(){
    function registerToolSet(damage, durability, efficiency, level, materialName, nameColor){
        let material = {damage: damage, durability: durability, efficiency: efficiency, level: level}
        let tools = {
            [materialName + " Sword"]: ToolType.sword,
            [materialName + " Pickaxe"]: ToolType.pickaxe,
            [materialName + " Axe"]: ToolType.axe,
            [materialName + " Shovel"]: ToolType.shovel,
            [materialName + " Hoe"]: ToolType.hoe
        }
        for(let i in tools){
            let name = i;
            let id = (function(){
                let a = i.split(' ');
                for(let b in a) a[b] = (b === 0 ? a[b].toLowerCase() : a[b].toUpperCase()) + a[b].slice(1, a[b].length);
                let c = a.join('');
                return c;
            })();
            let texture = i.toLowerCase().split(' ').join('_');
            IDRegistry.genItemID(id);
            Item.createItem(id, name, {name: texture}, {stack: 1});
            ToolLib.setTool(ItemID[id], material, tools[i]);
            if(typeof nameColor !== "undefined"){
                Item.registerNameOverrideFunction(ItemID[id], function(item, itemName){
                    return nameColor + itemName;
                });
            }
        }
    }
    registerToolSet(2, 180, 8, 2, "Darkstone");
    registerToolSet(5, 1261, 10, 4, "Abyssalnite", Native.Color.DARK_AQUA);
    registerToolSet(6, 1800, 10, 4, "Refined Coralium", Native.Color.AQUA);
    registerToolSet(7, 2300, 10, 4, "Dreadium", Native.Color.DARK_RED);
    registerToolSet(9, 2800, 14, 4, "Ethaxium", Native.Color.AQUA);
})();

// IDRegistry.genItemID("soulSword");
// Item.createItem("soulSword", "Soul Reaper", {name: "soulReaper", meta: 0}, {stack: 1});

// ToolAPI.addToolMaterial("ssw", {durability: 2000, level: 6, efficiency: 6, damage: 20, enchantability: 14});
// ToolLib.setTool(ItemID.soulSword, "ssw", ToolType.sword);

// //Item.addRepairItemIds(ItemID.soulSword, [ItemID.soulG, ItemID.soulSword]);
// //Item.addRepairItemIds(ItemID.soulSword, [ItemID.ethIron, ItemID.soulSword]);

// IDRegistry.genItemID("caneJ");
// Item.createItem("caneJ", "Jzahar's Cane", {name: "SOTG", meta: 0}, {stack: 1});

// IDRegistry.genItemID("caneJr");
// Item.createItem("caneJr", "Jzahar's Cane", {name: "SOTG", meta: 0}, {stack: 1});

// var CaneM = new RenderMesh(__dir__ + "/models/Cane.obj","obj", {translate: [0, .18, 0], scale: [1.5, 1.5, 1.5]});

// ItemModel.getFor(ItemID.caneJ, 0).setModel(CaneM, "staff");
// ItemModel.getFor(ItemID.caneJr, 0).setModel(CaneM, "staff2");

// IDRegistry.genItemID("Katana");
// Item.createItem("Katana", "Dreaded Katana", {name: "SOTG", meta: 0}, {stack: 1});

// var KatanaM = new RenderMesh(__dir__ + "/models/Katana.obj","obj", {translate: [0.5, 0, 0.5], rotation: [0, Math.PI / 2, 0],  scale: [1.5, 1.5, 1.5]});
// ItemModel.getFor(ItemID.Katana, 0).setModel(KatanaM, "katana");

// ToolAPI.addToolMaterial("kt", {durability: 3000, level: 7, efficiency: 7, damage: 32, enchantability: 14});
// ToolLib.setTool(ItemID.Katana, "kt", ToolType.sword);

// ToolAPI.addToolMaterial("cjzr", {durability: 2256, level: 6, efficiency: 6, damage: 24, enchantability: 14});
// ToolLib.setTool(ItemID.caneJr, "cjzr", ToolType.sword);
// /*
// var lookDir = function(yaw, pitch){
//  var vector = {};
//  vector.y = -Math.sin((pitch));
//  vector.x = -Math.sin((yaw)) * Math.cos((pitch));
//  vector.z = Math.cos((yaw)) * Math.cos((pitch));
// return vector;
// }

// Callback.addCallback("ItemUseNoTarget", function(item){
// if (Player.getCarriedItem().id == ItemID.caneJr) {  
// let coords = Entity.getPosition(Player.get());
// let lookAngle = Entity.getLookAngle(Player.get()); 
//   var yaw = lookAngle.yaw + lookDir((Math.random() * 5) - (5 / 2));
//    var pitch = lookAngle.pitch + lookDir((Math.random() * 5) - (5 / 2));
//     let velocity = {
//    x: -Math.sin((yaw)) * Math.cos((pitch)),
//    y: Math.sin((pitch)),
//    z: Math.cos((yaw)) * Math.cos((pitch))}
// let entity = Entity.spawn(coords.x, coords.y, coords.z, Native.EntityType.SMALL_FIREBALL);
//  Entity.moveToAngle(entity, velocity, {speed: 6,  denyY: false,  jumpVel: 0});
// }         
// });*/
