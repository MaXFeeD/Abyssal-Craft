const CRYSTAL_CLUSTERS_GROUP = [];
const CRYSTAL_PIECES_GROUP = [];
const CRYSTAL_SHARDS_GROUP = [];
const CRYSTAL_FRAGMENTS_GROUP = [];

var AbyssalCrystal = function(formula, material, color){

    this.clusterTexture = "crystal_cluster";
    this.clusterAnimTexture = "crystal_cluster.anim.3";
    this.crystalTexture = "crystal_big";
    this.shardTexture = "crystal_medium";
    this.fragmentTexture = "crystal_small";
    this.formula = toChemicalFormule(formula);
    this.material = material;
    if (Array.isArray(color))
        this.color = color;
    else if (!color) {
        this.isWhite = true;
        this.color = null;
    }

    this.nameOverride = function (item, name) {
        name += "\n" + Translation.translate("Molecular Formula") + ": " + this.formula;
        return name;
    };

    this.generateTextures = function () {
        if (this.isWhite) return; else {
            var that_1 = this;
            (function (args) {
                for (var i in args) {
                    var arg = args[i];
                    var blockOrItem = arg === that_1.clusterTexture || arg === that_1.clusterAnimTexture;
                    TextureWorker.paintTexture({
                        bitmap: TextureWorker.TEXTURE_STANDART,
                        src: {
                            path: "assets/" + (blockOrItem ? "terrain-atlas/" : "items-opaque/"),
                            name: arg === that_1.clusterAnimTexture ? arg : arg + "_0"
                        },
                        color: that_1.color,
                        result: {
                            path: "assets/" + (blockOrItem ? "terrain-atlas/" : "items-opaque/"),
                            name: arg === that_1.clusterAnimTexture ? that_1.clusterTexture + "_" + that_1.material + ".anim.3" : arg + "_0"
                        }
                    });
                }
            })([this.clusterTexture, this.clusterAnimTexture, this.crystalTexture, this.shardTexture, this.fragmentTexture]);
            this.clusterTexture += "_" + this.material;
            this.clusterAnimTexture = this.clusterTexture + ".anim.3";
            this.crystalTexture += "_" + this.material;
            this.shardTexture += "_" + this.material;
            this.fragmentTexture += "_" + this.material;
        }
    };

    this.createCluster = function () {
        var blockID = "ACrystalCluster" + this.material;
        IDRegistry.genBlockID(blockID);
        Block.createBlock(blockID, [
            { name: "Crystallized " + this.material + " Cluster", texture: [[this.clusterTexture, 0]], inCreative: true }
        ], { base: 1, lightlevel: 15, sound: "stone" });
        this.clusterID = BlockID[blockID];
        CRYSTAL_CLUSTERS_GROUP.push(this.clusterID);
        ToolAPI.registerBlockMaterial(this.clusterID, "stone", 1, false);
        Block.setDestroyTime(this.clusterID, 30);
        Block.registerDropFunction(this.clusterID, function (coords, blockID, blockData, level, enchant, item, region) {
            if (level > 0)
                return [[blockID, 1, blockData]];
            return [];
        });
        Block.setShape(this.clusterID, 3 / 16, 0, 3 / 16, 13 / 16, 12 / 16, 13 / 16);
        Item.registerNameOverrideFunction(this.clusterID, this.nameOverride);
        var mesh = new RenderMesh(__dir__ + "models/crystalcluster.obj", "obj", null);
        mesh.setBlockTexture(this.clusterTexture, 0);
        BlockRenderer.setStaticICRender(this.clusterID, -1, new ICRender.Model(new BlockRenderer.Model(mesh)));
    };

    this.createPiece = function () {
        var itemID = "ACrystal" + this.material;
        IDRegistry.genItemID(itemID);
        Item.createItem(itemID, "Crystallized " + this.material, { name: this.crystalTexture, meta: 0 }, { stack: 64 });
        this.crystalID = ItemID[itemID];
        CRYSTAL_PIECES_GROUP.push(this.crystalID);
        Item.registerNameOverrideFunction(this.crystalID, this.nameOverride);
    };

    this.createShard = function () {
        var itemID = "ACrystalShard" + this.material;
        IDRegistry.genItemID(itemID);
        Item.createItem(itemID, "Crystallized " + this.material + " Shard", { name: this.shardTexture, meta: 0 }, { stack: 64 });
        this.shardID = ItemID[itemID];
        CRYSTAL_SHARDS_GROUP.push(this.shardID);
        Item.registerNameOverrideFunction(this.shardID, this.nameOverride);
    };

    this.createFragment = function () {
        var itemID = "ACrystalFragment" + this.material;
        IDRegistry.genItemID(itemID);
        Item.createItem(itemID, "Crystallized " + this.material + " Fragment", { name: this.fragmentTexture, meta: 0 }, { stack: 64 });
        this.fragmentID = ItemID[itemID];
        CRYSTAL_FRAGMENTS_GROUP.push(this.fragmentID);
        Item.registerNameOverrideFunction(this.fragmentID, this.nameOverride);
    };

    this.generateTextures();
    this.createCluster();
    this.createPiece();
    this.createShard();
    this.createFragment();
    
}

new AbyssalCrystal("Fe", "Iron");
new AbyssalCrystal("Au", "Gold", [234, 218, 0]);
new AbyssalCrystal("S", "Sulfur", [255, 255, 75]);
new AbyssalCrystal("C", "Carbon", [51, 51, 51]);
new AbyssalCrystal("O", "Oxygen");
new AbyssalCrystal("H", "Hydrogen");
new AbyssalCrystal("N", "Nitrogen");
new AbyssalCrystal("P", "Phosphorus", [175, 135, 33]);
new AbyssalCrystal("K", "Potassium");
new AbyssalCrystal("NO3", "Nitrate", [0, 0, 255]);
new AbyssalCrystal("CH4", "Methane", [0, 255, 0]);
new AbyssalCrystal("none", "Redstone", [255, 0, 0]);
new AbyssalCrystal("An", "Abyssalnite", [100, 0, 160]);
new AbyssalCrystal("Cor", "Coralium", [0, 255, 255]);
new AbyssalCrystal("Dr", "Dreadium", [140, 0, 0]);
new AbyssalCrystal("none", "Blaze", [234, 218, 0]);
new AbyssalCrystal("Sn", "Tin");
new AbyssalCrystal("Cu", "Copper", [220, 160, 0]);
new AbyssalCrystal("Si", "Silicon");
new AbyssalCrystal("Mg", "Magnesium");
new AbyssalCrystal("Al", "Aluminium");
new AbyssalCrystal("SiO2", "Silica");
new AbyssalCrystal("Al2O3", "Alumina");
new AbyssalCrystal("MgO", "Magnesia");
new AbyssalCrystal("Zn", "Zync");
new AbyssalCrystal("Ca", "Calcium");
new AbyssalCrystal("Be", "Beryllium");
new AbyssalCrystal("Be3Al2(SiO3)6", "Beryl");

Callback.addCallback("PostLoaded", function () {
    for (var i = 0; i < 3; i++) {
        var arr = [CRYSTAL_PIECES_GROUP, CRYSTAL_SHARDS_GROUP, CRYSTAL_FRAGMENTS_GROUP];
        for (var a in arr[i]) {
            if (i < 2) {
                Recipes.addShaped({ id: arr[i][a], count: 1, data: 0 }, [
                    "ccc",
                    "ccc",
                    "ccc"
                ], ['c', arr[i - 1][a], 0]);
            }
            if (i > 0) {
                Recipes.addShapeless({
                    id: arr[i + 1][a],
                    count: 9, data: 0
                }, [{
                    id: arr[i][a],
                    data: 0
                }]);
            }
        }
    }
});

const AbyssalCraftCrystallizerCrystals = CRYSTAL_CLUSTERS_GROUP.concat(CRYSTAL_PIECES_GROUP, CRYSTAL_SHARDS_GROUP, CRYSTAL_FRAGMENTS_GROUP);

Item.addCreativeGroup("ACCrystallizerCrystals", Translation.translate("AbyssalCraft Crystallizer Crystals"), AbyssalCraftCrystallizerCrystals);