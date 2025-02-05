const mongoose = require("mongoose")

const recruiterSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
       
    },
    email:{
        type:String,
        trim:true,
        
    },
    password:{
        type:String
    },
    contactNumber:{
        type:Number,
        trim:true,
        
    },
    image:{
        type:String
    },
    companyId:{
        type:mongoose.Schema.ObjectId,
        ref:"Company"
    },
    role:{
        type:String,
        enum: ["jobseeker", "company", "admin", "recruiter"],
        require:true
    },
    job:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"Jobs"
        }
    ],
    // association:{
    //     type:String,
    //     enum:["assign","freelance"],
    // },
    description:{
        type:String
    },
    token:{
        type:String,
    },
 
})

module.exports = mongoose.model("Recruiter",recruiterSchema);