const mongoose=require('mongoose')
const feedbackSchema=new mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    },
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required:true
    },
    areaCode: {
        type:String,
        required:true
    },
    telNum: {
        type:String,
        required:true
    },
    email:{
        type: String,
        // required:true
    },
    feedback:{
        type: String,
        required: true
    }
},{
    timestamps: true
})

const Feedback=mongoose.model('Feedback',feedbackSchema)
module.exports = Feedback