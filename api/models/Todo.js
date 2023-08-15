const mongoose = require('mongoose')
const Schema = mongoose.Schema;  // Making schema

const TodoSchema = new Schema({  // Schema bana rhe hai
    text:{
        type: String,
        required: true,
    },
    complete : {
        type: Boolean,
        default: false,

    },
    timestamp:{
        type: String,  
        default: Date.now()
    }
})

const Todo = mongoose.model("Todo", TodoSchema) // This is where we actually create the schema and pass our schema.

module.exports = Todo // exporting the model