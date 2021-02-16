//crystals (by vstannumdum)
(function(){
    const materials = {
        "Iron": "железа",
        "Gold": "золота",
        "Sulfur": "серы",
        "Carbon": "углерода",
        "Oxygen": "кислорода",
        "Hydrogen": "водорода",
        "Nitrogen": "азота",
        "Phosphorus": "фосфора",
        "Potassium": "калия",
        "Nitrate": "нитрата",
        "Methane": "метана",
        "Redstone": "красного камня",
        "Abyssalnite": "абиссальнита",
        "Coralium": "коралла",
        "Dreadium": "страхолита",
        "Blaze": "пламени",
        "Tin": "олова",
        "Copper": "меди",
        "Silicon": "кремния",
        "Magnesium": "магния",
        "Aluminium": "алюминия",
        "Silica": "кремнезёма",
        "Alumina": "глинозёма",
        "Magnesia": "магнезии",
        "Zink": "цинка",
        "Calcium": "кальция",
        "Beryllium": "бериллия",
        "Beryl": "берилла"
    }
    let keys = Object.keys(materials);
    for(let i in keys){
        let key = keys[i];
        let ruEnd = key=="Sulfur" || key=="Copper" ? "й" : "го";
        Translation.addTranslation("Crystallized "+key+" Cluster", {ru: "Кристаллизованное скопление "+materials[key]});
        Translation.addTranslation("Crystallized "+key, {ru: "Кусок кристаллизованно"+ruEnd+" "+materials[key]});
        Translation.addTranslation("Crystallized "+key+" Shard", {ru: "Осколок кристаллизованно"+ruEnd+" "+materials[key]});
        Translation.addTranslation("Crystallized "+key+" Fragment", {ru: "Фрагменти кристаллизованно"+ruEnd+" "+materials[key]});
    }
})();

Translation.addTranslation("Molecular Formula", {ru: "Молекулярная формула"});

Translation.addTranslation("Crystal Clusters", {ru: "Кристаллизованные скопления"});
Translation.addTranslation("Crystal Pieces", {ru: "Кристаллизованные куски"});
Translation.addTranslation("Crystal Shards", {ru: "Кристаллизованные осколки"});
Translation.addTranslation("Crystal Fragments", {ru: "Кристаллизованные фрагменты"});

Translation.addTranslation("Omothol Stone", {ru: "Камень тьмы"});
Translation.addTranslation("Geateway Key Tier 3", {ru: "Ключ от врат 3 тира"});