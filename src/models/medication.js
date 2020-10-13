const mongoose = require('mongoose')
const medSchema=new mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    },
    medicine:{
        type:String,
        required:true
    },
    doseInfo:{
        type:String,
        required:true
    },
    reason:{
        type:String,
        required: true
    },
    prescribedDate:{
        type:Date,
        required:true
    },
    prescribedEndDate:{
        type:Date,
        required:true
    },
    note:{
        type:String,
        //required:true
    },
    doc:{
        type:Buffer
    }
},{
    timestamps: true
})

const Medication = mongoose.model('Medication',medSchema)
module.exports=Medication