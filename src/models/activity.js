const mongoose=require('mongoose')
const activitySchema=new mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    },
    activityType:{
        type: String,
        required: true
    },
    startDate:{
        type: Date,
        required:true
    },
    startTime: {
        type:String,
        required:true
    },
    duration: {
        type:String,
        required:true
    },
    note:{
        type: String,
        // required:true
    }
},{
    timestamps: true
})

const Activity=mongoose.model('Activity',activitySchema)
module.exports = Activity