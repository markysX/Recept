import telegramBot from 'node-telegram-bot-api'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { data } from './data.js'
import {Recept} from './models/Recept.js'
import{commands} from './commands.js'  
import {
    keyboardAction,
    keyboardCategory,
    keyboard,
    keyboardSoup} from './keyboards.js'
import express from 'express'

// - - - - - - - - CONNECT TO DB & BOT - - - - - - - 
dotenv.config()

let vfhr_bot = process.env.TOKEN
let cukaty_bot =  process.env.TOKEN2
let url = process.env.DB

mongoose.connect(url)
let bot = new telegramBot(cukaty_bot, {polling: true})

const app = express()
app.set('view engine', 'ejs')

// - - - - - - - - END CONNECT TO DB & BOT - - - - - - -


let isWaitname = false
let isWaitnameing = false


export let config = {
    numberNash: 0

}



let number = 0
let loves = []
let user_kategory = ''

let newRecept = {
    title: '',
    category: '',
    photo: '',
    text: '',
}




app.get('/recept/:number', async function (req, res) {
    let ingredients = ''
    let number = +req.params.number;
    if ( data[number].ingredients) {

        let ing = data[number].ingredients
        for (let i = 0; i<ing.length; i++ ) {
            ingredients += ing[i] + '<br>'
            
        }
    }
        res.render('index.ejs', {recept: data[number], ingredients})
    })


bot.on('message', 

async function (msg) {
    let msgId = msg.chat.id
    let text = msg.text
    commands(bot, msgId, text)

    if (isWaitnameing) {
        newRecept.text = text;

        bot.sendMessage(msgId, 'ингридиенты приняты',)
        bot.sendMessage(msgId, 'отправьте фото  ',)
        isWaitnameing = false
        return ''
    }

    if (isWaitname) {
        newRecept.title = text;

        bot.sendMessage(msgId, 'Название принято',)
        bot.sendMessage(msgId, 'Введите ингридиенты',)
        isWaitnameing = true
        isWaitname = false
    return ''


    }


  


}

)




bot.on('callback_query', 

async function (msg) {
    let text = msg.data;
    console.log(text)
    let msgId = msg.message.chat.id


    if (text == 'delete' ) {
        let recept = await Recept.find({})

         await Recept.findByIdAndDelete(recept[config.numberNash]._id)
 bot.sendMessage(msgId, 'рецепт удален' )
    }

 

    if (text.startsWith('new kategory')) {

        newRecept.category = text.slice(13);

        
            bot.sendMessage(msgId, 'ведите название блюда',)
            isWaitname = true

    
        

    }

    if (text == 'Предыдущий' ) {
        number--
        for (let i = number ; i > 0; i--) {

            if (data[i].category == user_kategory) {
                let text2 = `
                ${data[number].title}
                ${data[number].text}
                `
                bot.sendPhoto(msgId, data[number].photo, {caption: text2, ...keyboard, parse_mode: 'HTML'})
                break
                
            }
            number--

         }
    }

    if (text == 'Предыдущий наш' ) {
        let recept = await Recept.find({})

        if (config.numberNash == 0 ) {
            bot.sendMessage(msgId, 'больше рицептов нет 🤷‍♀️ 🙅‍♂️',)
            return false
        }
   
        config.numberNash--
  
        let text = `
        <b>${ recept[config.numberNash].title} </b>
        
        ${ recept[config.numberNash].category}
        ${ recept[config.numberNash].text}  
        
        <i>Рецепт ${config.numberNash  } / ${recept.length -1 }</i>
                
                
                `
        try {
            await bot.sendPhoto(msgId,recept[config.numberNash].photo, {caption: text, parse_mode: 'HTML', ...keyboardAction})
        }
        catch(e) {
            await bot.sendMessage(msgId, text, {parse_mode: 'HTML', ...keyboardAction})

        }  
          
    

    }

    if (text == 'Следующий наш' ) {

        let recept = await Recept.find({})
        if (config.numberNash==recept.length-1) {
            bot.sendMessage(msgId, 'больше рицептов нет 🤷‍♀️ 🙅‍♂️',)
return false
        }
   
        config.numberNash++

        console.log(  recept [config.numberNash])
  
                 
        let text = `
<b>${ recept[config.numberNash].title} </b>

${ recept[config.numberNash].category}
${ recept[config.numberNash].text}  

<i>Рецепт ${config.numberNash  } / ${recept.length -1 }</i>
        
        
        `
        try {
            await bot.sendPhoto(msgId,recept[config.numberNash].photo, {caption: text, parse_mode: 'HTML', ...keyboardAction})
        }
        catch(e) {
            await bot.sendMessage(msgId, text, {parse_mode: 'HTML', ...keyboardAction})

        }  
          
                


    }

    if (text == 'Следующий') {
        number++

        for (let i = number ; i < data.length; i++) {
            if (data[i].category == user_kategory) {
                let text2 = `
                ${data[number].title}
                ${data[number].text}
                `
                bot.sendPhoto(msgId, data[number].photo, {caption: text2, ...keyboard, parse_mode: 'HTML'})
                break
        
            }
            number++

         }
          
     
    }

    if (text =='мой рецепты' ) {
        bot.sendMessage(msgId, 'покачто рецептов нет',)

    }

    if (text =='love' ) {
        bot.sendMessage(msgId, 'добавлено',)

    }



    if (text == 'добавить свой рецепт') {
        bot.sendMessage(msgId, 'выберете категорию', keyboardCategory)

    }



    if (text.startsWith('1-')) {
       let category = text.slice(2)
       console.log( category)


       number = 0

        
       
       user_kategory = category

       for (let i = number ; i < data.length; i++) {
           if (data[i].category == user_kategory) {
            let text2 = `
            ${data[number].title}
            ${data[number].text.slice(0,600)} 
            `
                if (data[number].text.length>600) {
                    text2+='\n <a href="http://localhost:3000/recept/' + number + '">читать продолжение...</a>'
                }
              
               bot.sendPhoto(msgId, data[number].photo, {caption: text2, ...keyboard, parse_mode: 'HTML'})
               break
       
           }
           number++

        }


    }

  
}

)




// for(i = 0;i < 10;i++){

// }



bot.on('photo', 

async function (msg) {
    let msgId = msg.chat.id

    bot.sendMessage(msgId, 'фотография принята',)
    let photo = msg.photo[0]
    const fileId = photo.file_id;

    const url = await bot.getFileLink(fileId)
    newRecept.photo = url;
    
    bot.sendMessage(msgId, url,)
    
    await Recept.insertMany([
        newRecept
    ])

    bot.sendMessage(msgId, 'рецепт сохранен',)
}

)



app.listen(3001)

// http://localhost:3001/recept