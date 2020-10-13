const mongoose = require('mongoose')
const passportLocalMongoose=require('passport-local-mongoose')
const userSchema=new mongoose.Schema({
    username:{
        required:true,
        type:String
    },
    password:{
        type:String,
    },
    email: {
        unique: true,
        type: String,
        required: true
    }
})

userSchema.virtual('allergies',{
    ref:'Allergy',
    localField:'_id',
    foreignField:'owner'
})
userSchema.virtual('symptoms',{
    ref:'Symptom',
    localField:'_id',
    foreignField:'owner'
})
userSchema.virtual('medications',{
    ref:'Medication',
    localField:'_id',
    foreignField:'owner'
})
userSchema.virtual('immunisations',{
    ref:'Immune',
    localField:'_id',
    foreignField:'owner'
})
userSchema.virtual('hospitals',{
    ref:'Hospital',
    localField:'_id',
    foreignField:'owner'
})
userSchema.virtual('activities',{
    ref:'Activity',
    localField:'_id',
    foreignField:'owner'
})

userSchema.plugin(passportLocalMongoose)
const User=mongoose.model('Úser',userSchema)
module.exports=User