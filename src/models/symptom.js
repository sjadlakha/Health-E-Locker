const mongoose = require('mongoose')
const sympSchema=new mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    },
    symptom:{
        type:String,
        required:true
    },
    dateOccurred:{
        type:Date,
        required:true
    },
    duration:{
        type:String,
        //required: true
    },
    context:{
        type:String,
        required: true
    },
    severity:{
        type:String,
        required:true
    },
    note:{
        type:String,
        //required:true
    },
    doc:{
        type:Buffer,
    }
},{
    timestamps: true
})
const Symptom=mongoose.model('Symptom',sympSchema)
module.exports=Symptom