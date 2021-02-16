//IMPORT("dimensions");
IMPORT("SoundAPI");
IMPORT("ToolLib");
IMPORT("TileRender");
IMPORT("BaseBlocks");
IMPORT("Structures");
IMPORT("PortalUtils");
IMPORT("GuideAPI");
IMPORT("TextureWorker");

function randomInt(min, max){ 
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}

var elder_screams = new Sound("cthulhu_3.ogg");
var elder_boss = new Sound("sleeping_2.ogg");
var levelloaded = false;

const searchItem = function(id, data){
    var dat = data || -1;
    var od = id || -1;
    for(var i = 9;i < 45;i++) {
        var item = Player.getInventorySlot(i);
        if((item.id == od || (od == -1 && item.id != 0)) && (item.data == dat || dat == -1)){
            return {
                id: item.id,
                data: item.data,
                extra: item.extra,
                count: item.count,
                slot: i
            }
        }
    }
}

const getPointed = ModAPI.requireGlobal("Player.getPointed");

const setTimeout = function(func, ticks){
    var upd = {
        ticks: 0,
        update: function(){
            this.ticks++
            if(this.ticks >= ticks){
                func();
                this.remove = true
            }
        }
    };
    Updatable.addUpdatable(upd);
}

const setInterval = function(func, ticks){
    var upd = {
        ticks: 0,
        update: function(){
            this.ticks++
            if(this.ticks >= ticks){
                this.ticks = 0;
                if(func())this.remove = true;
            }
        }
    };
    Updatable.addUpdatable(upd);
    return upd;
}

const clearInterval = function(upd){
    if(upd && upd == {} && upd.remove){
        upd.remove = true;
    }
}

Callback.addCallback("LevelLoaded", function(){
    levelloaded = true
})

Callback.addCallback("LevelLeft", function(){ 
    levelloaded = false
});

const items_vanilla = [6,27,28,30,32,37,38,39,40,50,69,76, 102,106,111,126,175,256,257,258,259,260,261,262,263,264,265,266,267,268,269,270,271,272,273,274,275,276,277,278,279,280,281,282,283,284,285,286,287,288,289,290,291,292,293,294,295,296,297,298,299,300,301,302,303,304,305,306,307,308,309,310,311,312,313,314,315,316,317,318,319,320,321,322,323,324,325,326,327,328,329,330,331,332,333,334,335,336,337,338,339,340,341,342,343,344,345,346,347,348,349,350,351,352,353,354,355,356,357,358,359,360,361,362,363,364,365,366,367,368,369,370,371,372,373,374,375,376,377,378,379,380,381,382,383,384,385,386,387,388,389,390,391,392,393,394,395,396,397,398,399,400,401,402,403,404,405,406,407,408,409,410,411,412,413,414,415,416,417,418,419,420,421,422,423,424,425,426,427,428,429,430,431,432,433,434,435,436,437,438,439,440,441,442,443,444,445,446,447,448,449,450,451,452,453,454,455,456,457,458,459,460,461,462,463,464,465,466,467,468,469,470,471,472,473,474,475,476,477,478,479,480,481,482,483,484,485,486,487,488,489,490,491,492,493,494,495,496,497,498,499,500,501,502,503,504,505,506,507,508,509,510,511];
const blocks_vanilla = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255];
const items_and_blocks_vanilla = items_vanilla.concat(blocks_vanilla);

var all_items = items_vanilla;
var all_blocks = blocks_vanilla;
var all_items_and_blocks;


Callback.addCallback("ModsLoaded", function () {
    for(var i in ItemID){
        all_items.push(ItemID[i]);
    };
    for(var i in BlockID){
        all_blocks.push(BlockID[i]);
    };
    all_items_and_blocks = all_items.concat(all_blocks); 
});

const allParams = function(json, fullParams){
    if(typeof json != "object") return json;
    let params = "{\n";
    for(let key in json){
        if(fullParams) params += key + " : " + allParams(json[key], true) + "\n";
        else params += key + " : " + json[key] + "\n";
    }
    params += "}";
    return params;
}

const JSONlength = function(json){
    var length = 0;
    for(var i in json){
        length++
    }
    return length;
}

const setCharAt = function (str,index,chr) { 
    if(index > str.length-1) return str; 
    return str.substr(0,index) + chr + str.substr(index+chr.length); 
}

const Timer = java.util.Timer;
const TimerTask = java.util.TimerTask;

const jSetInterval = function(__fun, __mil){
    var timer = new Timer();
    var task = new TimerTask({
        run: function(){
            if(__fun())timer.cancel();
        }
    })
    timer.scheduleAtFixedRate(task, 0, __mil);
    return timer;
}

const jSetTimeout = function(__fun, __mil){
    var timer = new Timer();
    var task = new TimerTask({
        run: function(){
            if(__fun())timer.cancel();
        }
    })
    timer.schedule(task, __mil);
    return timer;
}

const jClearInterval = function(__interval){
    if(__interval && __interval.cancel)__interval.cancel();
}

const sides = [
    [1, 0, 0],
    [-1, 0, 0],
    [0, 0, 1],
    [0, 0, -1],
    [0, 1, 0],
    [0, -1, 0]
];

const onCallbacks = {};

function onCallback(name, func){
    if(!onCallbacks[name]){
        onCallbacks[name] = [];
        Callback.addCallback(name, function(a, b, c, d, e, f, g, h){
            for(let i in onCallbacks[name]){
                let res = onCallbacks[name][i](a, b, c, d, e, f, g, h);
                if(res == "delete") onCallbacks[name].splice(i, 1);
            }
        });
    }
    onCallbacks[name].push(func);
}

function toChemicalFormule(str){
    str = str.split("");
    let newStr = "";
    for(let i in str){
        let s = str[i];
        if(!isNaN(Number(s))){
            newStr += s.sub();
        } else newStr += s;
    }
    return newStr;
}

/**@param {number} id @param {number} count @param {number} data @param {string[]} mask @param {(string | number)[]} keys */
function addShapedRecipe(id, count, data, mask, keys){
    Recipes.addShaped({id: id, count: count, data: data}, mask, keys);
}

/**@param {number} id @param {number} count @param {number} data @param {[number, number][]} items */
function addShapelessRecipe(id, count, data, items){
    let ingredients = [];
    for(let item of items){
        ingredients.push({id: item[0], data: item[1]});
    }
    Recipes.addShapeless({id: id, count: count, data: data}, ingredients);
}