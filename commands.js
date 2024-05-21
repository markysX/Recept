import {keyboardAction, keyboard} from './keyboards.js'
import {Recept} from './models/Recept.js'
import { config } from './index.js'
import { data } from './data.js'


async function commands (bot, msgId, text) {
    if (text == '/start') {
        bot.sendMessage(msgId, `Привет! У нас в ассортименте есть ${data.length} рецептов. Какая категория блюд вас интересует?`, keyboard)
    }
    
    if (text == '/love') {
    bot.sendMessage(msgId, `love: ${loves}`, keyboard)
    
    
    }
    
    if (text == '/my') {
       let recept = await Recept.find({})
       config.numberNash = 0
      
    let text = `
    ${ recept[0].title}
    ${ recept[0].category}
    ${ recept[0].text}
    
    
    `
        bot.sendPhoto(msgId,recept[0].photo, {caption: text, parse_mode: 'HTML', ...keyboardAction})
    }
}
export {commands } 