import { toast } from "react-hot-toast"

import { setUser,setResume,clearResume } from "../slices/userProfileSlice"
import { apiConnector } from "../services/apiConnector"
import { profilePoint } from "../operations/apis"

const {

    updateProfile_api,
    uploadresume,
    deleteresume,
    getresume

} = profilePoint


export function updateProfile(token,formdata){
    console.log("token", token, "formdata", formdata);
    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
        // console.log("profile data : " + {formdata});
    try {
        const response = await apiConnector("PUT",updateProfile_api,formdata,{
            Authorization: `Bearer ${token}`,
        })
        console.log("UPDATE_PROFILE_API API RESPONSE............", response)

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        dispatch(setUser({...response.data.profileDetail}))
        toast.success("Profile update Successfully")

    } catch (error) {

        console.log("UPDATE_PROFILE_API API ERROR............", error)
        toast.error("Could Not Update Profile")
    }
        toast.dismiss(toastId)
    }
}


export function uploadResume(token, formData) {
    return async (dispatch) => {
        const toastId = toast.loading("Uploading Resume...");
        try {
            // Make API request to upload the resume
            const response = await apiConnector("POST", uploadresume, formData, {
                Authorization: `Bearer ${token}`,
            });

            console.log("UPLOAD_RESUME_API RESPONSE", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            // Optionally, you can update the state with the uploaded resume data
            dispatch(setResume(response.data.data));

            toast.success("Resume uploaded successfully!");
        } catch (error) {
            console.log("UPLOAD_RESUME_API ERROR", error);
            toast.error("Failed to upload resume.");
        }
        toast.dismiss(toastId);
    };
}
  
export function deleteResume(token) {
    return async (dispatch) => {
        const toastId = toast.loading("Deleting resume...");
        try {
            // Make the API call to delete the resume
            const response = await apiConnector("DELETE", deleteresume, null, {
                Authorization: `Bearer ${token}`,
            });

            console.log("DELETE_RESUME_API RESPONSE", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            // If successful, clear the resume in the Redux state
            dispatch(clearResume());

            toast.success("Resume deleted successfully!");
        } catch (error) {
            console.log("DELETE_RESUME_API ERROR", error);
            toast.error("Failed to delete resume.");
        }
        toast.dismiss(toastId);
    };
}

export function downloadResume(token) {
    return async (dispatch) => {
        const toastId = toast.loading("Downloading resume...");
        try {
            // Make API request to download the resume
            const response = await apiConnector("GET", getresume, null, {
                Authorization: `Bearer ${token}`,
            });

            if (response.status !== 200) {
                throw new Error("Failed to download resume.");
            }

            // Create a Blob from the file buffer received in the response
            const file = new Blob([response.data], { type: "application/pdf" });

            // Create a link to download the file
            const link = document.createElement("a");
            link.href = URL.createObjectURL(file);
            link.download = "resume.pdf"; // You can change this to the file name you want
            link.click();

            toast.success("Resume downloaded successfully!");
        } catch (error) {
            console.log("Download Resume API Error", error);
            toast.error("Failed to download resume.");
        }
        toast.dismiss(toastId);
    };
}