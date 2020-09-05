GuideAPI.registerGuide("normalNecronomicon", { 
item: ItemID.normalNecronomicon, 
debug: false, 
textures: { 
background: "necronomicon_background", 
nextLink: "next_page", 
preLink: "pre_page", 
close: "btn_close", 
}, 

pages: {
 
            "default": {
                nextLink: "default",
                left: {
                    controller: PageControllers.BASIC_PAGE,
                    elements: [
                        {text: "Запретное Знание", size: 25, link: "first"},
                        {text: "Книга Заклинаний", size: 25, link: "second"},
                        {text: "Ритуалы", size: 25, link: "third"},
                        {text: "Что за книга", size: 25, link: "forth"},
                        {text: "Получение Знаний", size: 25, link: "fifth"},
                        {text: "Разная информация", size: 25, link: "sixth"},
                    ]
                },
                
                right: {
                    controller: PageControllers.BASIC_PAGE,
                    elements: [
                         {text: ".", size: 1},
                    ]
                }
            },
            
//Акт Первый     
"first": {
                preLink: "default",
                nextLink: "default",
            left: {
                    controller: PageControllers.BASIC_PAGE,
                    elements: [
                         {text: "Abyssal Craft", size: 25, link: "knowone"},
                         {text: "Пантеон", size: 25, link: "knowtwo"},
                         {text: "Абиссалнамикон", size: 25, link: "knowthree"},
                         {text: "Покровители", size: 25, link: "knowfore"},
                         {text: "Поверхность", size: 25, link: "knowfive"},
                    ]
                },
                
        right: {
                    controller: PageControllers.BASIC_PAGE,
                    elements: [
                        {text: ".", size: 1},
                    ]
                }
            },
         
"knowone": {
                preLink: "first",
                nextLink: "knowone1",
            left: {
                    controller: PageControllers.BASIC_PAGE,
                    elements: [
                         {text: "AbyssalCraft - это мод, в изучении которого вам поможет эта книга. Он в основном ориентирован на исследование, с 4 новыми измерениями, которые вы можете исследовать", size: 20},
                    ]
                },
                
        right: {
                    controller: PageControllers.BASIC_PAGE,
                    elements: [
                        {text: "Измерения достигаются с помощью «ключей шлюза», которые представляют собой ключи, предназначенные для создания порталов между измерениями (четвертое измерение достигается выпадением из третьего)", size: 20},
                    ]
                }
            },
            
 
"knowone1": {
                preLink: "knowone",
                nextLink: "default",
            left: {
                    controller: PageControllers.BASIC_PAGE,
                    elements: [
                         {text: "Также есть 5 новых типов камня и 15 новых руд, которые можно найти по всему Верхнему миру и измерениям", size: 20},
                    ]
                },
                
        right: {
                    controller: PageControllers.BASIC_PAGE,
                    elements: [
                        {text: "Помимо исследования, AbyssalCraft вводит свой собственный тип магии, использующийся для ритуалов поклонения Великим Древним.", size: 20},
                    ]
                }
            },
"knowtwo": {
                preLink: "first",
                nextLink: "knowtwo1",
            left: {
                    controller: PageControllers.BASIC_PAGE,
                    elements: [
                         {text: "Внешние Боги", size: 25, link: "outside"},
                         {text: "Великие Древние", size: 25, link: "greatoldones"},
                    ]
                },
                
        right: {
                    controller: PageControllers.BASIC_PAGE,
                    elements: [
                        {text: ".", size: 10},
                    ]
                }
            },
"outside": {
                preLink: "knowtwo",
                nextLink: "outside1",
            left: {
                    controller: PageControllers.BASIC_PAGE,
                    elements: [
                         {text: "Азатот", size: 20},
                    ]
               },
                
        right: {
                    controller: PageControllers.BASIC_PAGE,
                    elements: [
                        {text: "Он находится за пределами вселенной, успокаиваемый вечным звуком дудок и барабанов. Несмотря на это, у него есть собственная воля, и он отдает команды Ньярлатхотепу. Он бог", size: 20},
                    ]
                }
            },
"outside1": {
                preLink: "outside",
                nextLink: "outside2",
            left: {
                    controller: PageControllers.BASIC_PAGE,
                    elements: [
                         {text: "Ньярлатхотеп. Ползучий Хаос - это Внешний Бог, который не изгнан и не заключен в тюрьму.", size: 20},
                    ]
               },
                
        right: {
                    controller: PageControllers.BASIC_PAGE,
                    elements: [
                        {text: "Он ходит по земле, спрятавшись среди людей, распространяя безумие. Помимо служения культам Внешних Богов, он исполняет желания Азатота, которому служит", size: 20},
                    ]
                }
            },
"outside2": {
                preLink: "outside1",
                nextLink: "outside3",
            left: {
                    controller: PageControllers.BASIC_PAGE,
                    elements: [
                         {text: "Йог-Сотот, Скрытый у Порога, - Внешний Бог, потомок Безымянного Тумана.", size: 20},
                    ]
               },
                
        right: {
                    controller: PageControllers.BASIC_PAGE,
                    elements: [
                        {text: "В значительной степени подразумевается, если не прямо заявляется, что Йог-Сотот всеведущ и заперт за пределами вселенной, что означает, что он знает и может видеть все пространство-время одновременно, что от Йог-Сотота не скрыто никаких секретов.", size: 20},
                    ]
                }
            },
"outside3": {
                preLink: "outside2",
                nextLink: "default",
            left: {
                    controller: PageControllers.BASIC_PAGE,
                    elements: [
                         {text: "Шуб-Ниггурат, Черный Лесной Козел с тысячей детенышей, - Внешний Бог в пантеоне.", size: 20},
                    ]
               },
                
        right: {
                    controller: PageControllers.BASIC_PAGE,
                    elements: [
                        {text: "Она - извращенное божество плодородия, которое, как говорят, выглядит как огромная мутная масса, которая выдавливает черные щупальца, мокрые рты и короткие извивающиеся козьи ноги. Маленькие существа постоянно выплевываются чудовищами, которые либо поглощаются, либо убегают", size: 20},
                    ]
                }
            },    
"greatoldones": {
                preLink: "knowtwo",
                nextLink: "greatoldones1",
            left: {
                    controller: PageControllers.BASIC_PAGE,
                    elements: [
                         {text: "Ктулху - Великий Древний, заточенный в бесконечном сне под морем в городе Р'льех.", size: 20},
                    ]
               },
                
        right: {
                    controller: PageControllers.BASIC_PAGE,
                    elements: [
                        {text: "У него голова осьминога и чешуйчатое тело с крыльями на спине. Его состояние бесконечного сна связано с войной со Старшими Существами, которая закончилась тем, что Р'льех погрузился на дно моря. Однажды он поднимется, чтобы править землей.", size: 20},
                    ]
                }
            },    
"greatoldones1": {
                preLink: "greatoldones",
                nextLink: "greatoldones2",
            left: {
                    controller: PageControllers.BASIC_PAGE,
                    elements: [
                         {text: "Хастур, Невыразимый, - Великий Старик и сводный брат Ктулху.", size: 20},
                    ]
               },
                
        right: {
                    controller: PageControllers.BASIC_PAGE,
                    elements: [
                        {text: "О Хастуре известно немного, но известно, что он принимает форму Короля в желтых одеждах и маске. Как и большинство Великих Древних, он способен принимать любую форму, какую пожелает", size: 20},
                    ]
                }
            },
"greatoldones2": {
                preLink: "greatoldones1",
                nextLink: "default",
            left: {
                    controller: PageControllers.BASIC_PAGE,
                    elements: [
                         {text: "Дж'захар, привратник Бездны, - внебрачный отпрыск Хастура.", size: 20},
                    ]
               },
                
        right: {
                    controller: PageControllers.BASIC_PAGE,
                    elements: [
                        {text: "Желая власти и не желая изгнания к звездам, Дж'захар вышел за пределы времени и пространства, чтобы достичь своей свободы. Результатом были силы, подобные силе Йог-Сотота, и в наказание вечная охрана его заключенных в тюрьму собратьев-божеств.", size: 20},
                    ]
                }
            },   
"knowthree": {
                preLink: "first",
                nextLink: "default",
            left: {
                    controller: PageControllers.BASIC_PAGE,
                    elements: [
                         {text: "Абиссальномикон - это нечестивый фолиант, из которого был написан Некрономикон, когда Дж'захар читал этот раздел для Альхазреда.", size: 20},
                    ]
                },
                
        right: {
                    controller: PageControllers.BASIC_PAGE,
                    elements: [
                        {text: ".", size: 10},
                    ]
                }
            },
"knowfore": {
                preLink: "first",
                nextLink: "default",
            left: {
                    controller: PageControllers.BASIC_PAGE,
                    elements: [
                         {text: "В этом разделе появляются люди, которые пообещали как минимум 10 долларов в пользу Shinoow's Patreon .", size: 20},
                    ]
                },
                
        right: {
                    controller: PageControllers.BASIC_PAGE,
                    elements: [
                        {text: "Saice Shoop", size: 20},
                    ]
                }
            },
"knowfive": {
                preLink: "first",
                nextLink: "knowtwo1",
            left: {
                    controller: PageControllers.BASIC_PAGE,
                    elements: [
                         {text: "", size: 20},
                    ]
                },
                
        right: {
                    controller: PageControllers.BASIC_PAGE,
                    elements: [
                        {text: "", size: 20},
                    ]
                }
            },
//Акт Второй
"second": {
                preLink: "default",
                nextLink: "default",
            left: {
                    controller: PageControllers.BASIC_PAGE,
                    elements: [
                         {text: "a", size: 20, link: "bookone"},
                         {text: "b", size: 20, link: "booktwo"},
                         {text: "c", size: 20, link: "bookthree"},
                         {text: "d", size: 20, link: "bookfore"},
                         {text: "e", size: 20, link: "bookf"},
                    ]
                },
                
        right: {
                    controller: PageControllers.BASIC_PAGE,
                    elements: [
                        {text: ".", size: 10},
                    ]
                }
            },
//Акт Третий
"third": {
                preLink: "default",
                nextLink: "default",
            left: {
                    controller: PageControllers.BASIC_PAGE,
                    elements: [
                         {text: "Некронамикон", size: 15, link: "ritualone"},
                         {text: "Некронамикон Бездной Пустоши", size: 15},
                         {text: "Некронамикон Ужасных Земель", size: 15},
                         {text: "Некронамикон Омотула", size: 15},
                         {text: "Абиссалнамикон", size: 15},
                    ]
                },
                
        right: {
                    controller: PageControllers.BASIC_PAGE,
                    elements: [
                        {text: ".", size: 10},
                    ]
                }
            },
"ritualone": {
                preLink: "third",
                nextLink: "default",
            left: {
                    controller: PageControllers.BASIC_PAGE,
                    elements: [
                         {text: "Катализатор забвения", size: 25},
                    ]
                },
                
        right: {
                    controller: PageControllers.BASIC_PAGE,
                    elements: [
                        {text: "Катализатор забвения создается путем наполнения Ока Эндера Осколками забвения и Красной пылью.", size: 15},
                        {text: "Создаётся: Везде", size: 15},
                        {text: "Энергия: 5000", size: 15},
                        {text: "Остаточная помощь: нет", size: 15},
                        {text: "Рецепт: 4x Осколки забвения, 4x Красная пыль", size: 15},
                        {text: "Подношение алтарю: 1x Глаз Эндера", size: 15},
                    ]
                }
            },
}   
});