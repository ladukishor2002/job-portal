const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String, 
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    role: {  // Add this to the schema
        type: String,
        enum: ["jobseeker", "company", "admin","recruiter"],  // Enums will limit the possible roles
        required: true,
    },
    website:{
        type:String 
    },
    location:{
        type:String 
    },
    logo:{
        type:String // URL to company logo
    },
    recruiter:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"Recruiter"
        }
    ],
    companyfield:[
        {
            type:String,
            // like IT , Sales , oil , banking
        }
    ],
    token:{
        type:String,
    },
    resetPasswordExpires: {
        type: Date,
    },
    jobToken:{ 
        type: Number, 
        default: 0 
    },
    isBlocked:{ 
        type: Boolean, 
        default: false 
    },
    userDetailAccessCount:{
        type:Number,
        default:0
    }

           
    
})

module.exports = mongoose.model("Company",companySchema);