const mongoose = require("mongoose")


const profileSchema = new mongoose.Schema({
    about:{
        type:String,
    },
    contactNumber:{
        type:Number,
    },
    resume:{
        type:String
    },
    resumeHeadline:{
        type:String
    },
    profileSummary:{
        type:String
    },
    location:{
        type:String
    },
    image:{
        type:String // cloudinary image upload
    },
    personalDetails:{
        type:mongoose.Schema.ObjectId,
        ref:"personalDetailSchema"
    }
 
})

module.exports = mongoose.model("Profile", profileSchema)