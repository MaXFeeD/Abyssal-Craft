const AbyssalCraftItems = [];

/**@param {string} name */
function quickCreateItem(name){
    let namee = name;
    // if(name.indexOf("'") !== -1) while(name.indexOf("'") !== -1) name[name.indexOf("'")] = "_"; 
    // more advanced operation, if there is more than one such character
    // if(name.indexOf("-") !== -1) while(name.indexOf("-") !== -1) name[name.indexOf("-")] = "_";
    if(name.indexOf("'") !== -1) name[name.indexOf("'")] = "_";
    if(name.indexOf("-") !== -1) name[name.indexOf("-")] = "_";
    let id = name.split(' ');
    for(let i in id) id[i] = (i == 0 ? id[i][0].toLowerCase() : id[i][0].toUpperCase()) + id[i].slice(1, id[1].length);
    id = id.join('');
    let texture = name.toLowerCase().split(' ').join('_');
    IDRegistry.genItemID(id);
    let isTech = id.indexOf("nomicon") !== -1 || id.indexOf("Charm") !== -1 || id.indexOf("Antidote") !== -1;
    Item.createItem(id, namee, {name: texture}, {stack: 64});
    AbyssalCraftItems.push(ItemID[id]);
}

const AbyssalCraftItemNames = [
    "Oblivion Catalyst", "Powerstone Tracker", "Eye of The Abyss", "Dreaded Shard of Abyssalnite", "Dreaded Chunk of Abyssalnite",
    "Chunk of Abyssalnite", "Abyssalnite Ingot", "Coralium Gem", "Coralium Gem Cluster", "Coralium Pearl", "Chunk of Coralium",
    "Refined Coralium Ingot", "Coralium Plate", "Cobblestone Upgrade Kit", "Iron Upgrade Kit", "Gold Upgrade Kit", "Diamond Upgrade Kit",
    "Abyssalnite Upgrade Kit", "Coralium Upgrade Kit", "Dreadium Upgrade Kit", "Ethaxium Upgrade Kit", "Iron Plate", "Dirty Plate",
    "Washcloth", "Shadow Fragment", "Shadow Gem Shard", "Shadow Gem", "Shard of Oblivion", "Coralium Brick", "Dreadium Ingot",
    "Dread Fragment", "Carbon Cluster", "Dense Carbon Cluster", "Methane", "Nitre", "Sulfur", "Dread Cloth", "Dreadium Plate",
    "Dreadium Katana Blade", "Dread-plagued Gateway Key", "Tin Ingot", "Copper Ingot", "Anti-Bone", "Ethaxium Brick", "Ethaxium Ingot",
    "Life Crystal", "Eldritch Scale", "Necronomicon", "Abyssal Wasteland Necronomicon", "Dreadlands Necronomicon", "Omothol Necronomicon",
    "Abyssalnomicon", "Small Crystal Bag", "Medium Crystal Bag", "Large Crystal Bag", "Huge Crystal Bag", "Shoggoth Flesh",
    "Abyssal Shoggoth Flesh", "Dreaded Shoggoth Flesh", "Omothol Shoggoth Flesh", "Shadow Shoggoth Flesh", "Abyssalnite Nugget",
    "Refined Coralium Nugget", "Dreadium Nugget", "Ethaxium Nugget", "Abyssal Wasteland Essence", "Dreadlands Essence", "Omothol Essence",
    "Skin of The Abyssal Wasteland", "Skin of The Dreadlands", "Skin of Omothol", "Ritual Charm", "Cthulhu Charm", "Hastur Charm",
    "J'zahar Charm", "Azathoth Charm", "Nyarlathotep Charm", "Yog-Sothoth Charm", "Shub-Niggurath Charm", "Essence of The Gatekeeper",
    "Stone Tablet", "Abyssal Scroll", "Abyssal Unique Scroll", "Coralium Plague Antidote", "Dread Plague Antidote", "Cha'rcoal", "Configurator Shard"
]

for(let i in AbyssalCraftItemNames) quickCreateItem(AbyssalCraftItemNames[i]);

//simple name overrides
(function(){
    /**@param {number} id @param {string} color @param {string} information */
    let makeNameOverride = function(id, color, information){
        Item.registerNameOverrideFunction(id, function(item, name){
            name = (color !== null ? color : "") + name + (information !== null ? "\n§7" + information : "");
            return name;
        });
    }
    makeNameOverride(ItemID.oblivionCatalyst, Native.Color.DARK_RED, Translation.translate("This item contains incredible powers."));
    makeNameOverride(ItemID.eyeOfTheAbyss, Native.Color.AQUA, Translation.translate("Eye of Asorah, The Fallen."));
    makeNameOverride(ItemID.dreadedShardOfAbyssalnite, Native.Color.DARK_RED, null);
    makeNameOverride(ItemID.dreadedChunkOfAbyssalnite, Native.Color.DARK_RED, null);
    makeNameOverride(ItemID.abyssalniteIngot, Native.Color.DARK_AQUA, null);
    makeNameOverride(ItemID.coraliumPearl, Native.Color.AQUA, null);
    makeNameOverride(ItemID.refinedCoraliumIngot, Native.Color.AQUA, null);
    makeNameOverride(ItemID.cobblestoneUpgradeKit, null, Translation.translate("Wood To Cobblestone"));
    makeNameOverride(ItemID.ironUpgradeKit, null, Translation.translate("Cobblestone To Iron"));
    makeNameOverride(ItemID.goldUpgradeKit, null, Translation.translate("Iron To Gold"));
    makeNameOverride(ItemID.diamondUpgradeKit, null, Translation.translate("Gold To Diamond"));
    makeNameOverride(ItemID.abyssalniteUpgradeKit, null, Translation.translate("Diamond To Abyssalnite"));
    makeNameOverride(ItemID.coraliumUpgradeKit, null, Translation.translate("Abyssalnite To Coralium"));
    makeNameOverride(ItemID.dreadiumUpgradeKit, null, Translation.translate("Coralium To Dreadium"));
    makeNameOverride(ItemID.ethaxiumUpgradeKit, null, Translation.translate("Dreadium To Ethaxium"));
    makeNameOverride(ItemID.smallCrystalBag, null, Translation.translate("This bag holds crystallized elements"));
    makeNameOverride(ItemID.mediumCrystalBag, null, Translation.translate("This bag holds crystallized elements"));
    makeNameOverride(ItemID.largeCrystalBag, null, Translation.translate("This bag holds crystallized elements"));
    makeNameOverride(ItemID.hugeCrystalBag, null, Translation.translate("This bag holds crystallized elements"));
    makeNameOverride(ItemID.dreadiumIngot, Native.Color.DARK_RED, null);
    makeNameOverride(ItemID.dreadFragment, Native.Color.DARK_RED, null);
    makeNameOverride(ItemID.ethaxiumIngot, Native.Color.AQUA, null);
    makeNameOverride(ItemID.essenceOfTheGatekeeper, Native.Color.BLUE, Translation.translate("A mere fragment of J\'zahar.") + "\n§7" + Translation.translate("You can feel it pulsating with power."));
})();

(function(){
    /**@param {[string, number][]} entries*/
    let maxStack = function(entries){
        for(let i in entries){
            let entry = entries[i];
            Item.getItemById(entry[0]).setMaxStackSize(entry[1]);
        }
    }
    maxStack([
        ["eyeOfTheAbyss", 1], ["coraliumGemCluster", 16], ["cobblestoneUpgradeKit", 16], ["ironUpgradeKit", 16], ["goldUpgradeKit", 16], 
        ["diamondUpgradeKit", 16], ["abyssalniteUpgradeKit", 16], ["coraliumUpgradeKit", 16], ["dreadiumUpgradeKit", 16], ["ethaxiumUpgradeKit", 16],
        ["washcloth", 1], ["necronomicon", 1], ["abyssalWastelandNecronomicon", 1], ["dreadlandsNecronomicon", 1], ["omotholNecronomicon", 1], 
        ["abyssalnomicon", 1], ["smallCrystalBag", 1], ["mediumCrystalBag", 1], ["largeCrystalBag", 1], ["hugeCrystalBag", 1], ["stoneTablet", 1],
        ["coraliumPlagueAntidote", 1], ["dreadPlagueAntidote", 1]
    ]);
})();

Item.setGlint(ItemID.oblivionCatalyst, true);
Item.setGlint(ItemID.powerstoneTracker, true);

Item.addToCreative(ItemID.coraliumGemCluster, 1, 1, null);
Item.addToCreative(ItemID.coraliumGemCluster, 1, 2, null);
Item.addToCreative(ItemID.coraliumGemCluster, 1, 3, null);
Item.addToCreative(ItemID.coraliumGemCluster, 1, 4, null);
Item.addToCreative(ItemID.coraliumGemCluster, 1, 5, null);
Item.addToCreative(ItemID.coraliumGemCluster, 1, 6, null);
Item.addToCreative(ItemID.coraliumGemCluster, 1, 7, null);
Item.registerIconOverrideFunction(ItemID.coraliumGemCluster, function(item, isModUi){
    return {name: "coralium_gem_cluster", data: item.data}
});
Item.registerNameOverrideFunction(ItemID.coraliumGemCluster, function(item, name){
    name += "\n§7" + (item.data + 2) + Translation.translate(" Gems");
    return name;
});

Item.setMaxDamage(ItemID.washcloth, 20);
Item.registerNameOverrideFunction(ItemID.washcloth, function(item, name){
    name += "\n§7" + Translation.translate("This item has been used ") + item.data + Translation.translate(" out of 20 times");
    return name;
});

(function(){
    /**@param {number} id @param {number} maxPE */
    let setupNecro = function(id, maxPE){
        let extra = new ItemExtraData();
        extra.putInt("ACPotentialEnergy", 0);
        Item.addToCreative(id, 1, 0, extra.copy());
        extra.putInt("ACPotentialEnergy", maxPE);
        Item.addToCreative(id, 1, 0, extra.copy());
        Item.registerNameOverrideFunction(id, function(item, name){
            name += "\n§7" + item.extra.getInt("ACPotentialEnergy") + "/" + maxPE + " PE";
            return name;
        });
    }
    setupNecro(ItemID.necronomicon, 5000);
    setupNecro(ItemID.abyssalWastelandNecronomicon, 10000);
    setupNecro(ItemID.dreadlandsNecronomicon, 20000);
    setupNecro(ItemID.omotholNecronomicon, 40000);
    setupNecro(ItemID.abyssalnomicon, 100000);
})();

(function(){
    //amplifiers: 0 - none, 1 - range, 2 - duration, 3 - power
    /**@param {number} id @param {string} deity */
    let setupCharm = function(id, deity){
        let extra = new ItemExtraData();
        extra.putString("ACCharmDeity", deity);
        for(let i=0; i<4; i++){
            extra.putInt("ACCharmAmplifier", i);
            Item.addToCreative(id, 1, 0, extra.copy());
        }
        let amplifiers = ["None", "Range", "Duration", "Power"];
        Item.registerNameOverrideFunction(id, function(item, name){
            name += "\n§7" + 
            Translation.translate("Amplifier: ") + Translation.translate(amplifiers[item.extra.getInt("ACCharmAmplifier")]) + "\n§7" +
            Translation.translate("Deity: ") + Translation.translate(deity);
            return name;
        });
    }
    setupCharm(ItemID.ritualCharm, "None");
    setupCharm(ItemID.cthulhuCharm, "Cthulhu");
    setupCharm(ItemID.hasturCharm, "Hastur");
    setupCharm(ItemID.j_zaharCharm, "J\'zahar");
    setupCharm(ItemID.azathothCharm, "Azathoth");
    setupCharm(ItemID.nyarlathotepCharm, "Nyarlathotep");
    setupCharm(ItemID.yog_sothothCharm, "Yog-Sothoth");
    setupCharm(ItemID.shub_niggurathCharm, "Shub-Niggurath");
})();
Item.registerIconOverrideFunction(ItemID.ritualCharm, function(item, isModUi){
    let ampl = ["none", "range", "duration", "power"][item.extra.getInt("ACCharmAmplifier")];
    return {name: "ritual_charm_" + ampl, data: 0}
});

(function(){
    let extra = new ItemExtraData();
    extra.putInt("ACPotentialEnergy", 0);
    extra.putInt("ACTabletStacks", 0);
    Item.addToCreative(ItemID.stoneTablet, 1, 1, extra.copy());
    Item.addToCreative(ItemID.stoneTablet, 1, 2, null);
    const render = new ICRender.Model();
    const model = new BlockRenderer.Model();
    model.addBox(3/16, 0, 1/16, 13/16, 1/16, 15/16, "monolith_stone", 0);
    model.addBox(7/32, 1/32, 3/32, 25/32, 3/32, 29/32, "monolith_stone", 0);
    render.addEntry(model);
    ItemModel.getFor(ItemID.stoneTablet, 0).setModel(render);
    ItemModel.getFor(ItemID.stoneTablet, 1).setModel(render).setGlintMaterial("entity_alphatest_glint_item:entity_alphatest");
    const renderCursed = new ICRender.Model();
    const modelCursed = new BlockRenderer.Model();
    modelCursed.addBox(3/16, 0, 1/16, 13/16, 1/16, 15/16, "monolith_stone", 0);
    modelCursed.addBox(7/32, 1/32, 3/32, 25/32, 3/32, 29/32, "monolith_stone", 0);
    modelCursed.addBox(3/16, 0, 1/16, 13/16, 1/16, 15/16, "curse_glint", 0);
    modelCursed.addBox(7/32, 1/32, 3/32, 25/32, 3/32, 29/32, "curse_glint", 0);
    renderCursed.addEntry(modelCursed);
    ItemModel.getFor(ItemID.stoneTablet, 2).setModel(renderCursed);
})();
Item.registerNameOverrideFunction(ItemID.stoneTablet, function(item, name){
    switch(item.data){
        case 0: return name;
        case 1: return name + "\n§7" + item.extra.getInt("ACPotentialEnergy") + " PE\n§7" + item.extra.getInt("ACTabletStacks") + " stacks";
        case 2: return name + "\n" + Native.Color.DARK_PURPLE + "Cursed";
    }
});

//Common scrolls by item data:
//0 - Basic, 1 - Lesser, 2 - Moderate, 3 - Greater

Item.addToCreative(ItemID.abyssalScroll, 1, 1, null);
Item.addToCreative(ItemID.abyssalScroll, 1, 2, null);
Item.addToCreative(ItemID.abyssalScroll, 1, 3, null);
Item.registerNameOverrideFunction(ItemID.abyssalScroll, function(item, name){
    switch(item.data){
        case 0: return Translation.translate("Basic Scroll");
        case 1: return Translation.translate("Lesser Scroll");
        case 2: return Translation.translate("Moderate Scroll");
        case 3: return Translation.translate("Greater Scroll");
    }
});
Item.registerIconOverrideFunction(ItemID.abyssalScroll, function(item, isModUi){
    return {name: "common_scroll", data: item.data};
});

//Unique scrolls by item data:
//0 - Antimatter, 1 - Oblivion

Item.addToCreative(ItemID.abyssalUniqueScroll, 1, 1, null);
Item.registerNameOverrideFunction(ItemID.abyssalUniqueScroll, function(item, name){
    switch(item.data){
        case 0: return Translation.translate("Antimatter Scroll");
        case 1: return Translation.translate("Oblivion Scroll");
    }
});
Item.registerIconOverrideFunction(ItemID.abyssalUniqueScroll, function(item, isModUi){
    return {name: "unique_scroll", data: item.data};
});

(function(){
    /**@param {number} id */
    let setupAntidote = function(id, texture){
        let extra = new ItemExtraData();
        extra.putInt("ACAntidoteUses", 10);
        Item.addToCreative(id, 1, 0, extra);
        Item.registerNameOverrideFunction(id, function(item, name){
            name += "\n§7" + item.extra.getInt("ACAntidoteUses") + Translation.translate(" uses left");
        });
        Item.registerIconOverrideFunction(id, function(item, isModUi){
            let uses = item.extra.getInt("ACAntidoteUses");
            let data = null;
            switch(true){
                case uses >= 9: data = 0; break;
                case uses < 9 && uses >= 7: data = 1; break;
                case uses < 7 && uses >= 5: data = 2; break;
                case uses < 5 && uses >= 3: data = 3; break;
                case uses < 3: data = 4; break;
            }
            return {name: texture, data: data};
        });
    }
    setupAntidote(ItemID.coraliumPlagueAntidote);
    setupAntidote(ItemID.dreadPlagueAntidote);
})();

Item.addToCreative(ItemID.configuratorShard, 1, 1, null);
Item.addToCreative(ItemID.configuratorShard, 1, 2, null);
Item.addToCreative(ItemID.configuratorShard, 1, 3, null);
Item.registerNameOverrideFunction(ItemID.configuratorShard, function(item, name){
    return Translation.translate("Spirit Tablet Shard") + " #" + item.data;
});
Item.registerIconOverrideFunction(ItemID.configuratorShard, function(item, isModUi){
    return {name: "configurator_shard", data: item.data}
});

Item.addCreativeGroup("ACItems", Translation.translate("AbyssalCraft Items"), AbyssalCraftItems);

Callback.addCallback("PostLoaded", function(){
    addShapedRecipe(ItemID.powerstoneTracker, 4, 0, ["ggg", "geg", "ggg"], ['g', ItemID.coraliumGem, 0, 'e', 381, 0]);
    addShapedRecipe(ItemID.abyssalniteIngot, 1, 0, ["nnn", "nnn", "nnn"], ['n', ItemID.abyssalniteNugget, 0]);
    addShapelessRecipe(ItemID.abyssalniteIngot, 9, 0, [[BlockID.blockAbyssalnite, 0]]);
    Recipes.addFurnace(ItemID.dreadedChunkOfAbyssalnite, 0, ItemID.abyssalniteIngot, 0);
    Recipes.addFurnace(ItemID.chunkOfAbyssalnite, 0, ItemID.abyssalniteIngot, 0);
    Recipes.addFurnace(BlockID.oreAbyssalnite, 0, ItemID.abyssalniteIngot, 0);
    Recipes.addFurnace(BlockID.oreDreadedAbyssalnite, 0, ItemID.abyssalniteIngot, 0);
    Recipes.addFurnace(BlockID.oreDreadlandsAbyssalnite, 0, ItemID.abyssalniteIngot, 0);
    for(let i=0; i<8; i++){
        addShapelessRecipe(ItemID.coraliumGem, i + 2, 0, [[ItemID.coraliumGemCluster, i]]);
    }
    (function(){
        /**@param {number} count @param {number[]} crystals */
        let makeClusterRecipe = function(count, crystals){
            let ingredients = [];
            for(let i in crystals){
                let cr = crystals[i];
                if(cr == 1) ingredients.push([ItemID.coraliumGem, 0]);
                else ingredients.push([ItemID.coraliumGemCluster, cr - 2]);
            }
            addShapelessRecipe(ItemID.coraliumGemCluster, 1, count - 2, ingredients);
        }
        makeClusterRecipe(2, [1, 1]);
        makeClusterRecipe(3, [2, 1]);
        makeClusterRecipe(3, [1, 1, 1]);
        makeClusterRecipe(4, [2, 2]);
        makeClusterRecipe(4, [1, 1, 1, 1]);
        makeClusterRecipe(5, [2, 3]);
        makeClusterRecipe(5, [1, 1, 1, 1, 1]);
        makeClusterRecipe(6, [2, 2, 2]);
        makeClusterRecipe(6, [3, 3]);
        makeClusterRecipe(6, [1, 1, 1, 1, 1, 1]);
        makeClusterRecipe(7, [4, 3]);
        makeClusterRecipe(7, [1, 1, 1, 1, 1, 1, 1]);
        makeClusterRecipe(8, [2, 2, 2, 2]);
        makeClusterRecipe(8, [4, 4]);
        makeClusterRecipe(8, [1, 1, 1, 1, 1, 1, 1, 1]);
        makeClusterRecipe(9, [3, 3, 3]);
        makeClusterRecipe(9, [5, 4]);
        makeClusterRecipe(9, [1, 1, 1, 1, 1, 1, 1, 1, 1]);
    })();
    Recipes.addFurnace(BlockID.oreCoraliumPearlescent, 0, ItemID.coraliumPearl, 0);
    Recipes.addFurnace(BlockID.oreCoraliumInfused, 0, ItemID.coraliumPearl, 0);
    addShapedRecipe(ItemID.chunkOfCoralium, 1, 0, ["ccc", "csc", "ccc"], ['c', ItemID.coraliumGemCluster, 7, 's', BlockID.abyssalStone]);
    Recipes.addFurnace(ItemID.chunkOfCoralium, 0, ItemID.refinedCoraliumIngot, 0);
    addShapedRecipe(ItemID.refinedCoraliumIngot, 1, 0, ["nnn", "nnn", "nnn"], ['n', ItemID.refinedCoraliumNugget, 0]);
    addShapelessRecipe(ItemID.refinedCoraliumIngot, 9, 0, [[BlockID.blockRefinedCoralium, 0]]);
    addShapedRecipe(ItemID.coraliumPlate, 1, 0, ["ipi", "ipi", "ipi"], ['i', ItemID.refinedCoraliumIngot, 0, 'p', ItemID.coraliumPearl, 0]);
    addShapedRecipe(ItemID.cobblestoneUpgradeKit, 4, 0, ["wcc", "sf "], ['w', 5, -1, 'c', 4, 0, 's', 287, 0, 'f', 318, 0]);
    addShapedRecipe(ItemID.cobblestoneUpgradeKit, 4, 0, ["wcc", "sf "], ['w', BlockID.darklandsOakWoodPlanks, 0, 'c', 4, 0, 's', 287, 0, 'f', 318, 0]);
    addShapedRecipe(ItemID.cobblestoneUpgradeKit, 4, 0, ["wcc", "sf "], ['w', BlockID.dreadlandsWoodPlanks, 0, 'c', 4, 0, 's', 287, 0, 'f', 318, 0]);
    (function(){
        let materials = [4, 265, 266, 264, ItemID.abyssalniteIngot, ItemID.refinedCoraliumIngot, ItemID.dreadiumIngot, ItemID.ethaxiumIngot];
        let levels = ["cobblestone", "iron", "gold", "diamond", "abyssalnite", "coralium", "dreadium", "ethaxium"];
        for(let i in materials){
            if(i == 0) continue;
            addShapedRecipe(ItemID[levels[i] + "UpgradeKit"], 1, 0, ["pn", "nu"], ['p', materials[i - 1], 0, 'n', materials[i], 0, 'u', ItemID[levels[i - 1] + "UpgradeKit"]]);
        }
    })();
    addShapedRecipe(ItemID.ironPlate, 2, 0, ["i", "i"], ['i', 265, 0]);
    Recipes.addShapeless({id: ItemID.ironPlate, count: 1, data: 0}, [{id: ItemID.dirtyPlate, data: 0}, {id: ItemID.washcloth, data: -1}], function(api, field, result){
        for(let i in field){
            if(field[i].id == ItemID.washcloth){
                field[i].data++;
                if(field[i].data >= Item.getMaxDamage(field[i].id)){
                    field[i].id = field[i].count = field[i].data = 0;
                }
            } else api.decreaseFieldSlot(i);
        }
    });
    addShapedRecipe(ItemID.washcloth, 1, 0, ["ccc", "cwc", "ccc"], ['c', 30, 0, 'w', 35, 0]);
    addShapedRecipe(ItemID.shadowGemShard, 1, 0, ["fff", "fff", "fff"], ['f', ItemID.shadowFragment, 0]);
    addShapedRecipe(ItemID.shadowGem, 1, 0, ["sss", "sss", "sss"], ['s', ItemID.shadowGemShard, 0]);
    addShapelessRecipe(ItemID.shadowFragment, 9, 0, [[ItemID.shadowGemShard, 0]]);
    addShapelessRecipe(ItemID.shadowGemShard, 9, 0, [[ItemID.shadowGem, 0]]);
    addShapedRecipe(ItemID.shardOfOblivion, 1, 0, [" s ", "sgs", " s "], ['s', ItemID.shadowGem, 0, 'g', ItemID.transmutationGem, 0]);
});