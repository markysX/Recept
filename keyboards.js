let keyboardAction = {
    reply_markup: {
        inline_keyboard: [
           
            [
                {text: '✏️ Редактировать', callback_data: 'edit'},
            ],
            [
                {text: '🗑 Удалить', callback_data: 'delete'}
            ],
            [
                {text: '👈 Предыдущий', callback_data: 'Предыдущий наш'},
                {text: '👉 Следующий', callback_data: 'Следующий наш'},
              
            ],
        ]
    }
}

let keyboardCategory = {
    reply_markup: {
        inline_keyboard: [
           
            [
                {text: '🍧 десерты', callback_data: 'new kategory десерты'},
                {text: '🍛 супы', callback_data: 'new kategory супы'},
                {text: '🍚 каши', callback_data: 'new kategory каши'},
            ],
            [
                {text: '🍣 суши', callback_data: 'new kategory суши'},

                {text: '🍕 пицца', callback_data: 'new kategory пицца'}
            ]
        ]
    }
}

let keyboard = {
    reply_markup: {
        inline_keyboard: [
            [
                {text: '👈 Предыдущий', callback_data: 'Предыдущий'},
                {text: '👉 Следующий', callback_data: 'Следующий'},
              
            ],
            [
                {text: ' ❤️ добавить в избраные', callback_data: 'love'},
                {text: ' 🗒 добавить свой рецепт', callback_data: 'добавить свой рецепт'},
               
            ],
            [
                {text: ' 🗒 мой рецепты', callback_data: 'мой рецепты'}
            ],
            [
                {text: '🍧 десерты', callback_data: '1-десерты'},
                {text: '🍛 супы', callback_data: '1-супы'},
                {text: '🍚 каши', callback_data: '1-каши'},
            ],
            [
                {text: '🍣 суши', callback_data: '1-суши'},
                {text: '🥗 салаты', callback_data: '1-салаты'},
                {text: '🍕 пицца', callback_data: '1-пицца'},
             
            ],
            [
                   {text: '🍹 напитки', callback_data: '1-напитки'},
                {text: '🥫 соусы', callback_data: '1-соусы'},
            ]
        ]
    }
}

let keyboardSoup = {
    reply_markup: {
        inline_keyboard: [
            [
                {text: '🐟 супы с морепродуктами', callback_data: 'супы с морепродуктами'},
                {text: '🍄 супы с грибами', callback_data: 'супы с грибами'},
            ],
           
        ]
    }
}


export {keyboardAction,
    keyboardCategory,
    keyboard,
    keyboardSoup}