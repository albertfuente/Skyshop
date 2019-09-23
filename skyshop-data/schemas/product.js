const { Schema } = require('mongoose')

module.exports = new Schema({
    title: {
        type: String,
        require: true
    },

    image: {
        type: String,
    },

    description:{
        type:String,
        require:true
    },
    size: {
        type: String,
        required: true,
        default: ""
    }, 

    color: {
        type: String,
        required: true
    }, 
    
    price:{
        type:Number,
        required:true
    }
})
