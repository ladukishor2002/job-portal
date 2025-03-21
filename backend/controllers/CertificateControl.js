const User = require("../models/User")
const Profile = require("../models/Profile")
const certificate = require("../models/ExtraProfile/certificate");
require("dotenv").config();


exports.createCertificate = async (req , res) =>{
    try {
        const {

            certificateName,
            certificateLink,
            certificateDescription

        } = req.body
        if(
            !certificateName ||
            !certificateLink ||
            !certificateDescription
        )
            {
                return res.status(403).json({
                    success:false,
                    message:"All field are required too be filled"
                });
            }
        const Id = req.user.id

        const user = await User.findById(Id)

        const profile = await Profile.findById(user.profile)
        
        if(!profile){
            return res.status(400).json({
                success:false,
                message:"Profile don't Exist"
            })
        }
        

        const certificates = await certificate.create({
            certificateName,
            certificateLink,
            certificateDescription
        })

        profile.certificates.push(certificates.id);
        await profile.save();

        return res.status(200).json({
            success:true,
            message:"Certificate Created Successfully",
            data:certificates,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Certificate can't register, Try again"
        });
    }
}

exports.updateCertificate = async (req ,res) => {
    try {
        const {
            certificateId,
            certificateName,
            certificateLink,
            certificateDescription

        } = req.body

        if(
            !certificateId,
            !certificateName ||
            !certificateLink ||
            !certificateDescription
        )
            {
                return res.status(403).json({
                    success:false,
                    message:"All field are required too be filled"
                });
            }
        const Id = req.user.id
        const userId = await User.findById(Id);

        const profileId = await Profile.findById(userId.profile)
        if(!profileId){
            return res.status(400).json({
                success:false,
                message:"Profile don't Exist"
            })
        }

        const certificates = await certificate.findByIdAndUpdate(
            certificateId,
            {
                certificateName : certificateName,
                certificateLink : certificateLink,
                certificateDescription : certificateDescription
            },
            {new:true}
        )
        
        await certificates.save();

        return res.status(200).json({
            success:true,
            message:"Certificate Updated Successfully !!",
            certificates,
        })
            

    } catch (error) {
        console.log(error)
            return res.status(500).json({
                success:false,
                message:"Error while updating Certificate"
            })
    }
}

exports.deleteCertificate = async(req,res) => {
    try {
        const { certificateId } = req.body;
        if(!certificateId){
            return res.status(403).json({
                success:false,
                message:"certificateId is required for delete"
            });
        }
        const Id = req.user.id
        
        const userId = await User.findById(Id)
        const profileId = await Profile.findById(userId.profile)

       
        if(!profileId){
            return res.status(400).json({
                success:false,
                message:"Profile don't Exist"
            })
        }
        profileId.certificates = profileId.certificates.filter(
            (id) => id.toString() !== certificateId
        );
        await profileId.save();
        
        await certificate.findByIdAndDelete(certificateId);

        return res.status(200).json({
            success:true,
            message:"Delete Certificate Successfully !!"
        })

    } catch (error) {
        console.log(error)
            return res.status(500).json({
                success:false,
                message:"Error while Deleting certificates"
            })
    }
}

exports.getCertificates = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).populate('profile');
        const profile = await Profile.findById(user.profile).populate('certificates');

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Profile not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: profile.certificates, // Return the array of certificates
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch certificates",
        });
    }
}
// exports.getCertificates = async (req, res) => {
//     try {
//         const userId = req.user.id;
//         const user = await User.findById(userId).populate('profile');
//         const profile = await Profile.findById(user.profile).populate({
//             path: 'certificates',
//             select: '_id', // Only select the '_id' field from certificates
//         });

//         if (!profile) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Profile not found",
//             });
//         }

//         // Extract only the IDs of the certificates
//         const certificateIds = profile.certificates.map(cert => cert._id);

//         return res.status(200).json({
//             success: true,
//             data: certificateIds, // Return only the array of certificate IDs
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             success: false,
//             message: "Failed to fetch certificates",
//         });
//     }
// };