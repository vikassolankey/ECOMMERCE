const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true

    },
    image:{
        type:String,
        required:true,
        trim:true

    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    desc:{
        type:String,
        required:true
    },
    reviews:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Review'
        }
    ]
})

const product = mongoose.model('product', productSchema);
module.exports=product;

