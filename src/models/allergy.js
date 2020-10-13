const mongoose=require('mongoose')
const allergySchema=new mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    },
    allergen:{
        type:String,
        required:true
    },
    reactions:{
        type: String,
        required: true
    },
    dateidentified:{
        type: Date,
        required: true
    },
    severity:{
        type: String,
        required: true
    },
    note: {
        type:String,
        required:true
    },
    doc:{
        type:Buffer
    }
},{
    timestamps: true
})
const Allergy=mongoose.model('Allergy',allergySchema)
module.exports=Allergy