const BLOCK_TYPE_STONE = Block.createSpecialType({
    base: 1,
    solid: true,
    renderlayer: 2,
    explosionres: 15,
    lightopacity: 15,
    destroytime: 2,
    translucency: 0 
});

const BLOCK_TYPE_GRASS = Block.createSpecialType({
    base: 3,
    solid: true,
    renderlayer: 2,
    explosionres: 4,
    destroytime: 1.25,
    translucency: 0,
    sound: "grass"
});

const BLOCK_TYPE_LIGHT = Block.createSpecialType({
     lightlevel: 6,
     explosionres: 2,
     lightopacity: 15
});

const BLOCK_TYPE_GLASS = Block.createSpecialType({
    lightopacity: 2,
    destroytime: 0.5, 
    renderlayer: 1,
    sound: "glass"
});

const BLOCK_TYPE_ORE = Block.createSpecialType({
    base: 1,
    solid: true,  
    destroytime: 5,
    renderlayer: 2,
    explosionres: 15,
    lightopacity: 15,
    translucency: 0
});

const BLOCK_TYPE_UNI = Block.createSpecialType({  
    destroytime: 5,
    explosionres: 5,
    solid: true,
    lightopacity: 15,
    translucency: 0  
});

const BLOCK_TYPE_FENCE_WOOD = Block.createSpecialType({
    destroytime: 3,
    lightopacity: 1,
    renderlayer: 2, 
    rendertype: 11,
    translucency: 0.5,
    sound: "wood"    
});

const BLOCK_TYPE_FENCE = Block.createSpecialType({
    destroytime: 3,
    lightopacity: 1,
    renderlayer: 2, 
    rendertype: 11,
    translucency: 0.5  
});

const BLOCK_TYPE_WALL = Block.createSpecialType({
    destroytime: 3,
    lightopacity: 1,
    renderlayer: 2,
    rendertype: 32,
    translucency: 0.5
});

const BLOCK_TYPE_SLAB_WOOD = Block.createSpecialType({
    solid: false,
    renderlayer: 2,
    explosionres: 16,
    lightopacity: 1,
    translucency: 0,
    sound: "wood"
});

const BLOCK_TYPE_SLAB = Block.createSpecialType({
    solid: false,
    renderlayer: 2,
    explosionres: 16,
    lightopacity: 1,
    translucency: 0
});

const BLOCK_TYPE_SAND = Block.createSpecialType({
    base: 3,
    solid: true,
    renderlayer: 2,
    explosionres: 4,
    destroytime: 1.25,
    translucency: 0,
    sound: "sand"
});

const BLOCK_TYPE_LEAVES = Block.createSpecialType({
    base: 18,
    destroytime: 0.2,
    explosionres: 1,
    renderallfaces: true,
    renderlayer: 1,
    lightopacity: 1,
    translucency: 0.5,
    sound: "grass"
});

const BLOCK_TYPE_PLANT = Block.createSpecialType({
    base: 18,
    destroytime: 0.1,
    explosionres: 1,
    renderlayer: 1,
    lightopacity: 1,
    translucency: 0.5,
    sound: "grass"
});

const BLOCK_TYPE_WOOD = Block.createSpecialType({
    solid: true,
    renderlayer: 2,
    explosionres: 8,
    translucency: 0,
    sound: "wood"
});