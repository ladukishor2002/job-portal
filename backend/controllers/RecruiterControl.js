const Recruiter = require("../models/recruiter");
const User = require("../models/User")
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Job = require("../models/jobs");


exports.loginRecruiter = async(req,res) => {
    try {
        const{email,password} = req.body

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All field is required for login" 
            });
       }

       const recruiter = await Recruiter.findOne({email})

       if(!recruiter){
            return res.status(401).json({
                success:false,
                message:"Company is not register, try register"
            });
        }

        if(await bcrypt.compare(password,recruiter.password))
        {
            const token = jwt.sign(
                {
                    email:recruiter.email,
                    id:recruiter.id,
                    role:recruiter.role
                },
                process.env.JWT_SECRET,
                {
                    expiresIn:"24h",
                }
            )
            recruiter.token = token

            recruiter.password = undefined

            const options = {
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000),  // Expires in 1 days
                httpOnly: true,                                           // Ensures the cookie is not accessible via JavaScript
            };
            return res.cookie("token",token,options).status(200).json({
                success:true,
                message:`Login successful. Welcome, ${recruiter.name} !`,
                token,
                recruiter
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

exports.createJob = async (req,res) => {
    try {
        const recruiterId = req.user.id
        const recruiter = await Recruiter.findById(recruiterId);
        if (!recruiter) {
            return res.status(404).json({
                success: false,
                message: "Recruiter not found",
            });
        }

        const {
            jobTitle,
            description,
            skillRequired,
            jobType,
            salaryRange,
            jobLocation,
        } = req.body
        if(
            !jobTitle ||
            !description ||
            !skillRequired ||
            !jobType ||
            !salaryRange ||
            !jobLocation 
        ){
            return res.status(403).json({
                success:false,
                message:"All field are required to filled"
            });
        }

        const jobs = await Job.create({
            companyId:recruiter.companyId,
            recruiterId,
            jobTitle,
            description,
            skillRequired,
            jobType,
            salaryRange,
            jobLocation,
            isClose:false
        });

        recruiter.job.push(jobs.id);
        await recruiter.save();
        
        return res.status(200).json({
            success:true,
            message:"Created Job Successfully",
            data:jobs
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Error while Creating Job, Try Again"
        })
    }
}


exports.updateJob = async (req, res) => {
    try {
        const recruiterId = req.user.id;
        const { jobId, ...updateFields } = req.body; // Fetch jobId from body

        if (!jobId) {
            return res.status(400).json({
                success: false,
                message: "Job ID is required in the request body",
            });
        }

        // Fetch the recruiter and check if the job exists in their posted jobs
        const recruiter = await Recruiter.findById(recruiterId).populate("job");
        if (!recruiter) {
            return res.status(404).json({
                success: false,
                message: "Recruiter not found",
            });
        }

        // Check if jobId exists in the recruiter's job array
        const jobExists = recruiter.job.some((job) => job._id.toString() === jobId);
        if (!jobExists) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized: You can only update jobs that you created",
            });
        }

        // Update the job
        const updatedJob = await Job.findByIdAndUpdate(
            jobId,
            { $set: updateFields },
            { new: true, runValidators: true }
        );

        return res.status(200).json({
            success: true,
            message: "Job updated successfully",
            data: updatedJob,
        });

    } catch (error) {
        console.error("Error updating job:", error);
        return res.status(500).json({
            success: false,
            message: "Error while updating job. Please try again.",
        });
    }
};

exports.deleteJob = async (req, res) => {
    try {
        const recruiterId = req.user.id;
        const { jobId } = req.body; // Fetch jobId from request body

        // Validate jobId
        if (!jobId) {
            return res.status(400).json({
                success: false,
                message: "Job ID is required in the request body",
            });
        }

        // Fetch the recruiter and check if the job exists in their posted jobs
        const recruiter = await Recruiter.findById(recruiterId).populate("job");
        if (!recruiter) {
            return res.status(404).json({
                success: false,
                message: "Recruiter not found",
            });
        }

        // Check if jobId exists in the recruiter's job array
        const jobIndex = recruiter.job.findIndex((job) => job._id.toString() === jobId);
        if (jobIndex === -1) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized: You can only delete jobs that you created",
            });
        }

        // Delete the job
        await Job.findByIdAndDelete(jobId);

        // Remove the job from the recruiter's job array
        recruiter.job.splice(jobIndex, 1);
        await recruiter.save(); // Save recruiter after job removal

        return res.status(200).json({
            success: true,
            message: "Job deleted successfully",
        });

    } catch (error) {
        console.error("Error deleting job:", error);
        return res.status(500).json({
            success: false,
            message: "Error while deleting job. Please try again.",
        });
    }
};

exports.getJobRecruiter = async (req, res) => {
    try {
        const recruiterId = req.user.id; // Get recruiter ID from auth middleware

        // Find all jobs created by this recruiter and populate appliedUsers
        const jobs = await Job.find({ recruiterId })
            .select("jobTitle description skillRequired jobType salaryRange jobLocation isClose") 
            .populate({
                path:"appliedUsers",
                select:"firstName lastName email",
            }) 
            .exec();

        if (jobs.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No jobs found for this recruiter.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Jobs fetched successfully",
            data: jobs
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error while fetching recruiter jobs"
        });
    }
};

exports.logoutRecruiter = async (req, res) => {
    try {
        // Clear the authentication token by setting an expired cookie
        return res
            .cookie("token", "", {
                expires: new Date(0),  // Expire the cookie immediately
                httpOnly: true,
            })
            .status(200)
            .json({
                success: true,
                message: "Logout successful",
            });
    } catch (error) {
        console.error("Logout Error:", error);
        return res.status(500).json({
            success: false,
            message: "Logout failed, please try again",
        });
    }
};


exports.getUserDetailsForRecruiter = async (req, res) => {
    try {
        const recruiterId = req.user.id;
        const { userId } = req.body; // Recruiter selects a specific user

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required",
            });
        }

        // Fetch recruiter and verify existence
        const recruiter = await Recruiter.findById(recruiterId).populate("job");
        if (!recruiter) {
            return res.status(404).json({
                success: false,
                message: "Recruiter not found",
            });
        }

        // Check recruiter access permissions
        if (!recruiter.permanentAccess && recruiter.userDetailAccessCount <= 0) {
            return res.status(403).json({
                success: false,
                message: "Access Denied: You do not have permission to view user details",
            });
        }

        // Fetch the user and check if they applied to any of the recruiter's jobs
        const user = await User.findById(userId)
            .select("firstName lastName email workstatus profile appliedJobs")
            .populate({
                path: "profile",
                select: "contactNumber resume resumeHeadline profileSummary location image personalDetails onlineProfiles certificates skillsProfile project careerProfile educationProfile employProfile",
                populate: {
                    path: "personalDetails onlineProfiles certificates skillsProfile project careerProfile educationProfile employProfile",
                },
            });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Check if the user applied to any job created by this recruiter
        const hasAppliedToRecruiterJob = user.appliedJobs.some(jobId =>
            recruiter.job.some(recruiterJob => recruiterJob._id.toString() === jobId.toString())
        );

        if (!hasAppliedToRecruiterJob) {
            return res.status(403).json({
                success: false,
                message: "Access Denied: This user has not applied to your jobs",
            });
        }

        // Reduce access count if not permanent
        if (!recruiter.permanentAccess) {
            recruiter.userDetailAccessCount -= 1;
            await recruiter.save();
        }

        return res.status(200).json({
            success: true,
            message: "User details fetched successfully",
            user,
        });

    } catch (error) {
        console.error("Error fetching user details:", error);
        return res.status(500).json({
            success: false,
            message: "Error while fetching user details. Please try again.",
        });
    }
};


// exports.getUserDetailsForRecruiter = async (req, res) => {
//     try {
//         const recruiterId = req.user.id;
//         const { jobId } = req.body; // Recruiter requests access for a specific job

//         if (!jobId) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Job ID is required",
//             });
//         }

//         // Fetch recruiter data with access control
//         const recruiter = await Recruiter.findById(recruiterId);
//         if (!recruiter) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Recruiter not found",
//             });
//         }

//         // Check access permissions
//         if (!recruiter.permanentAccess && recruiter.userDetailAccessCount <= 0) {
//             return res.status(403).json({
//                 success: false,
//                 message: "Access Denied: You do not have permission to view user details",
//             });
//         }

//         // Fetch user details related to this job (Assuming Users apply to jobs)
//         const userDetails = await User.find({ appliedJobs: jobId })
//                 .select("firstName lastName email workstatus profile")
//                 .populate({
//                     path:"profile",
//                     select:"contactNumber resume resumeHeadline profileSummary location image personalDetails onlineProfiles certificates skillsProfile project careerProfile educationProfile employProfile",
//                     populate:{
//                         path: "personalDetails onlineProfiles certificates skillsProfile project careerProfile educationProfile employProfile"
//                     }
//                 })
//         .limit(
//             recruiter.permanentAccess ? 1000 : recruiter.userDetailAccessCount
//         );

//         // Reduce access count if not permanent
//         if (!recruiter.permanentAccess) {
//             recruiter.userDetailAccessCount -= userDetails.length;
//             await recruiter.save();
//         }

//         return res.status(200).json({
//             success: true,
//             message: "User details fetched successfully",
//             users: userDetails,
//         });

//     } catch (error) {
//         console.error("Error fetching user details:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Error while fetching user details. Please try again.",
//         });
//     }
// };
