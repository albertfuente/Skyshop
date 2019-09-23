const mongoose = require('mongoose')
const { Schema, ObjectId } = mongoose
const itemSchema = require('./item') 



module.exports = new Schema({
    date: {
        type: Date,
        required: false
    },
    
    state: {
        type: ['opened','closed'],
        required: false,
        default:'opened'
    },
    owner: { type: ObjectId,
         ref: 'User',
         require: true
    }, // per referencia schema

    items: [itemSchema] //array de items
})
