import mongoose from 'mongoose'

let schema = {
    title: String,
    category: String,
    photo: String,
    text: String,
}


let Schema = new mongoose.Schema(schema)

let Recept = mongoose.model('reciep', Schema)


export { Recept }