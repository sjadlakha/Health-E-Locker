const mongoose = require('mongoose')
const hospSchema=new mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    },
    hospitalName:{
        type: String,
        required: true
    },
    reason:{
        type: String,
        required: true
    },
    admissionDate:{
        type:Date,
        required: true
    },
    dischargeDate:{
        type:Date,
        //required: true
    },
    note: {
        type:String,
        required:true
    },
    doc:{
        type:Buffer,
    }
},{
    timestamps: true
})
const Hospital=mongoose.model('Hospital',hospSchema)
module.exports=Hospital