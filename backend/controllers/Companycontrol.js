const Company = require("../models/company");
const Recruiter = require("../models/recruiter");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


exports.companySignup = async (req,res) => {
    try {
        const{
            name,
            description,
            email,
            password,
            role,
            website,
            location,
            logo,
            companyfield,
        }= req.body

        if(
            !name ||
            !description ||
            !email ||
            !password ||
            !role ||
            !website ||
            !location ||
            !logo ||
            !companyfield
        ){
            return res.status(403).json({
                success:false,
                message:"All field are required to filled"
            });
        }

        const existCompany = await Company.findOne({email});
        if(existCompany){
            return res.status(400).json({
                success:false,
                message:"Company already Exist"
            });
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const company = await Company.create({
            name,
            description,
            email,
            password:hashedPassword,
            role,
            website,
            location,
            logo,
            companyfield,
            recruiter:createRecruiter._id
        });

        return res.status(200).json({
            success:true,
            message:"Company register Successfully",
            company
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Error while registering Company, Try Again"
        })
    }
}

exports.loginCompany = async (req,res) => {
    try {
       const {email,password} = req.body

       if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All field is required for login" 
            });
       }

       const company = await Company.findOne({email})

       if(!company){
            return res.status(401).json({
                success:false,
                message:"Company is not register, try register"
            })
        }

        if(await bcrypt.compare(password,company.password))
        {
            const token = jwt.sign(
                {
                    email:company.email,
                    id:company.id,
                    role:company.role
                },
                process.env.JWT_SECRET,
                {
                    expiresIn:"24h",
                }
            )
            company.token = token

            company.password = undefined

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),  // Expires in 3 days
                httpOnly: true,                                           // Ensures the cookie is not accessible via JavaScript
            };
            return res.cookie("token",token,options).status(200).json({
                success:true,
                message:`Login successful. Welcome, ${company.name} !`,
                token,
                company
            })

        }
        else{
            return res.status(401).json({
                success:false,
                message:"Password is Incorrect",
            });
        }      
        

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Login Failed , Try again"
        })
    }
}

exports.updateCompanyDetail = async (req,res) => {
    try {
        const{
            name,
            description,
            email,
            website,
            location,
            logo,
            companyfield
        } = req.body

        const compid = req.user.id

        if(!compid){
            return res.status(400).json({
                success:false,
                message:"Company not Found for updating detail"
            });
        }

        if( !name ||
            !description ||
            !email ||
            !website ||
            !location ||
            !logo ||
            !companyfield
        )
        {
            return res.status(401).json({
                success:false,
                message:"All field required to update Details"
            });
        }

        const comp = await Company.findByIdAndUpdate(
            compid,
            {
                name:name,
                description:description,
                email:email,
                website:website,
                location:location,
                logo:logo,
                companyfield:companyfield
            },
            {new:true}
        );

        // comp.name = name;
        // comp.description = description;
        // comp.email = email;
        // comp.website = website;
        // comp.location = location;
        // comp.logo = logo;
        // comp.companyfield = companyfield;

        await comp.save();

        return res.status(200).json({
            success:true,
            message:"Company details have been updated!!",
            comp
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Error while updating User data !!",
        })
    }
}

exports.deleteCompany = async (req,res) => {
    try {
        const compid = req.user.id

        const comp = await Company.findById(compid)

        if(!comp){
            return res.status(404).json({
                success:false,
                message:"Company Doesn't exist"
            });
        }
        if(!comp.recruiter){
            return res.status(401).json({
                success:false,
                message:"Company Recruiter can't be found"
            });
        }
        await Recruiter.findByIdAndDelete(comp.recruiter);

        await Company.findByIdAndDelete(compid);

        return res.status(200).json({
            success:true,
            message:"Company Deleted Successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error while Deleting Company Account"
        })
    }
}

exports.getAllDetailCompany = async (req,res) => {
    try {
        const id = req.user.id

        const companyDetail = await Company.findById(id).populate("recruiter").exec();

        return res.status(200).json({
            success:true,
            message:"Company Detail Fetched Successfully",
            companyDetail
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Error while Fetching Company Details"
        });
    }
}

exports.createRecruiter = async (req,res) => {
    try {
        const companyId =  req.user.id
        const {
            name,
            email,
            password,
            contactNumber,
            image,
            description,
            
        } = req.body

        if(
            !name ||
            !email ||
            !password ||
            !contactNumber ||
            !image ||
            !description
          
        )
        {
            return res.status(400).json({
                success:false,
                message:"All field are Required"
            });
        }
        //check if Recruiter is already exist by emailaddress
        const existRecruiter = await Recruiter.findOne({email});
        if(existRecruiter){
            return res.status(400).json({
                success:false,
                message:"Recruiter already Exist"
            })
        }

        const hashedPassword = await bcrypt.hash(password,10); // hassing password for recruiter
        const compId = await Company.findById(companyId)  //finding company Id and pushing it to recruiter

        const createRecruiter = await Recruiter.create({
            name,
            email,
            password:hashedPassword,
            contactNumber,
            image,
            companyId:compId._id,
            description
        });

        compId.recruiter =  createRecruiter._id
        await compId.save();

        return res.status(200).json({
            success:true,
            message:"Recruiter Register Successfully",
            createRecruiter,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Recruiter can't register, Try again"
        });
    }
}

exports.loginRecruiter = async(req,res) => {
    try {
        const{email,password} = req.body
    } catch (error) {
        
    }
}