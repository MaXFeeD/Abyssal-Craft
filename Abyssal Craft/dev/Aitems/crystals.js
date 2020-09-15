var CRYSTAL_CLUSTERS_GROUP = [];
var CRYSTAL_PIECES_GROUP = [];
var CRYSTAL_SHARDS_GROUP = [];
var CRYSTAL_FRAGMENTS_GROUP = [];

const CrystalRegistry = {
    WHITE: ["iron", "oxygen", "hydrogen", "nitrogen", "tin", "potassium", "silicon", "magnesium", "aluminium", "silica", "alumina", "magnesia", "zinc", "calcium", "beryllium", "beryl"],
    /**
     * Creates new crystals, cluster block and shards items, with the specified chemical formule, material and color.
     * @param {string} formula - chemical formula of the crystal, written in name override function
     * @param {string} material - material of the crystal, used to create textures and register IDs, and also in the name
     * @param {[r: number, g: number, b: number]} [color] - RGB color to paint textures, crystals will be white if you don't put the color argument
     */
    register: function(formula, material, color){
        const clusterTexture = ["assets/terrain-atlas/", "crystalcluster_0", "crystalcluster.anim.3"];
        const itemsTextures = ["assets/items-opaque", {"big": "crystalbig_0", "medium": "crystalmedium_0", "small": "crystalsmall_0"}];
        let isWhite = this.WHITE.indexOf(material, 0) !== -1;
        const OVERRIDE = function(item, name){
            name += "\n" + Translation.translate("Molecular Formula"+": "+formula);
            return name;
        }
        //painting
        if(!isWhite){
            for(let i=0; i<2; i++){
                TextureWorker.paintTexture({
                    bitmap: {
                        width: 16,
                        height: 128,
                    },
                    src: {
                        path: clusterTexture[0],
                        name: i==1 ? clusterTexture[2] : clusterTexture[1]
                    },
                    paint: {
                        color: color,
                        mode: TextureWorker.MODE_STANDART
                    },
                    result: {
                        path: clusterTexture[0],
                        name: "crystalcluster_"+material+ i==1 ? "_0" : ".anim.3"
                    }
                });
            }
            for(let i=0; i<3; i++){
                let size = i==0 ? "big" : i==1 ? "medium" : "small";
                TextureWorker.paintTexture({
                    bitmap: TextureWorker.TEXTURE_STANDART,
                    src: {
                        path: itemsTextures[0],
                        name: itemsTextures[1][size]
                    },
                    paint: {
                        color: color,
                        mode: TextureWorker.MODE_STANDART
                    },
                    result: {
                        path: itemsTextures[0],
                        name: "crystal"+size+"_"+material+"_0"
                    }
                });
            }
        }
        //cluster
        const mesh = new RenderMesh(__dir__+"models/crystalcluster.obj", "obj", null);
        mesh.setBlockTexture(isWhite ? "crystalcluster" : "crystalcluster_"+material, 0);
        const render = new ICRender.Model();
        const model = new BlockRenderer.Model(mesh);
        render.addEntry(model);
        IDRegistry.genBlockID("ACrystalcluster_"+material);
        Block.createBlock("ACrystalcluster_"+material, [{
            name: "Crystallized "+material+" Cluster", 
            texture: [[isWhite ? "crystalcluster" : "crystalcluster_"+material, 0]]
        }]);
        ToolAPI.registerBlockMaterial(BlockID["ACrystalcluster_"+material], "stone", 1, false);
        Block.setDestroyTime(BlockID["ACrystalcluster_"+material], 30);
        Block.registerDropFunction(BlockID["ACrystalcluster_"+material], function(coords, blockID, blockData, level, enchant){
            if(level>0){
                return [[blockID, 1, blockData]];
            }
            return [];
        }, 1);
        Block.setShape(BlockID["ACrystalcluster_"+material], 3/16, 0, 3/16, 13/16, 12/16, 13/16);
        BlockRenderer.setStaticICRender(BlockID["ACrystalcluster_"+material], -1, render);
        Item.registerNameOverrideFunction(BlockID["ACrystalcluster_"+material], OVERRIDE);
        CRYSTAL_CLUSTERS_GROUP.push(BlockID["ACrystalcluster_"+material]);
        //items
        for(let i=0; i<3; i++){
            let namee = ["", "Shard", "Fragment"],
            size = i==0 ? "big" : i==1 ? "medium" : "small";
            IDRegistry.genItemID("ACrystal"+size[i]+material);
            Item.createItem("ACrystal"+size[i]+material, "Crystallized "+material+" "+size[i], {
                name: "crystal"+size+ isWhite ? "" : "_"+material, 
                meta: 0
            }, {stack: 64});
            Item.registerNameOverrideFunction(ItemID["ACrystal"+size[i]+material], OVERRIDE);
            i == 0 ? 
            CRYSTAL_PIECES_GROUP.push(ItemID["ACrystal"+size[i]+material]) : i==1 ?
            CRYSTAL_SHARDS_GROUP.push(ItemID["ACrystal"+size[i]+material]) :
            CRYSTAL_FRAGMENTS_GROUP.push(ItemID["ACrystal"+size[i]+material]);
            Callback.addCallback("PostLoaded", function(){
                if(i<2){
                    Recipes.addShaped({id: ItemID["ACrystal"+size[i]+material], count: 1, data: 0}, [
                        "ccc",
                        "ccc",
                        "ccc"
                    ], ['c', ItemID["ACrystal"+size[i-1]+material], 0]);
                }
                if(i>0){
                    Recipes.addShapeless({
                        id: ItemID["ACrystal"+size[i-1]+material],
                        count: 9, data: 0
                    }, [{
                        id: ItemID["ACrystal"+size[i]+material],
                        data: 0
                    }]);
                }
            });
        }
    }
}

CrystalRegistry.register("Fe", "Iron");
CrystalRegistry.register("Au", "Gold", [234, 218, 0]);
CrystalRegistry.register("S", "Sulfur", [255, 255, 75]);
CrystalRegistry.register("C", "Carbon", [51, 51, 51]);
CrystalRegistry.register("O", "Oxygen");
CrystalRegistry.register("H", "Hydrogen");
CrystalRegistry.register("N", "Nitrogen");
CrystalRegistry.register("P", "Phosphorus", [175, 135, 33]);
CrystalRegistry.register("K", "Potassium");
CrystalRegistry.register("NO"+"3".sub(), "Nitrate", [0, 0, 255]);
CrystalRegistry.register("CH"+"4".sub(), "Methane", [0, 255, 0]);
CrystalRegistry.register("none", "Redstone", [255, 0, 0]);
CrystalRegistry.register("An", "Abyssalnite", [100, 0, 160]);
CrystalRegistry.register("Cor", "Coralium", [0, 255, 255]);
CrystalRegistry.register("Dr", "Dreadium", [140, 0, 0]);
CrystalRegistry.register("none", "Blaze", [234, 218, 0]);
CrystalRegistry.register("Sn", "Tin");
CrystalRegistry.register("Cu", "Copper", [220, 160, 0]);
CrystalRegistry.register("Si", "Silicon");
CrystalRegistry.register("Mg", "Magnesium");
CrystalRegistry.register("Al", "Aluminium");
CrystalRegistry.register("SiO"+"2".sub(), "Silica");
CrystalRegistry.register("Al"+"2".sub()+"O"+"3".sub(), "Alumina");
CrystalRegistry.register("MgO", "Magnesia");
CrystalRegistry.register("Zn", "Zync");
CrystalRegistry.register("Ca", "Calcium");
CrystalRegistry.register("Be", "Beryllium");
CrystalRegistry.register("Be"+"3".sub()+"Al"+"2".sub()+"(SiO"+"3".sub()+")"+"6".sub(), "Beryl");