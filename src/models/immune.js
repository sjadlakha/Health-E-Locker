const mongoose = require('mongoose')
const immuneSchema=new mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    },
    vaccine:{
        type: String,
        required: true
    },
    protectionagainst:{
        type: String,
        required: true
    },
    note:{
        type: String,
        required:true
    },
    dateTaken:{
        type:Date,
        required:true
    },
    doc:{
        type:Buffer
    }
},{
    timestamps: true
})
const Immune=mongoose.model('Immune',immuneSchema)
module.exports=Immune