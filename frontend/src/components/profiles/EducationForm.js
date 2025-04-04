

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createEducationProfiles, updateEducationProfiles } from '../../operations/educationprofileAPI';
import { X } from 'lucide-react';

const EducationForm = ({ onSave, initialData = null }) => {
    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.profile);
   
    const [educationData, setEducationData] = useState({
        institutionName: '',
        courseName: '',
        courseType: 'full-time',
        duration: '',
        marks: '',
        location: '',
        education: ''
    });

    useEffect(() => {
        if (initialData) {
            const { _id, ...dataWithoutId } = initialData;
            setEducationData(dataWithoutId);
        }
    }, [initialData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEducationData({ ...educationData, [name]: value });
    };

    const handleSave = async () => {
        try {
            if (initialData) {
                await dispatch(updateEducationProfiles(token, initialData._id, educationData));
            } else {
                await dispatch(createEducationProfiles(token, educationData));
            }
            onSave(educationData);
        } catch (error) {
            console.error("Error saving education profile:", error);
        }
    };

    const handleCancel = () => {
        onSave(null);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center h-full w-full z-[9999999999]">
            <div className="popup-content min-h-[400px] w-[700px] bg-white relative pl-8 p-6 rounded-lg">
                <div className="flex justify-between pr-4">
                    <h2 className="text-2xl font-bold">{initialData ? 'Edit Education' : 'Add Education'}</h2>
                    <button onClick={handleCancel} className="hover:bg-gray-100 p-2 rounded-full">
                        <X size={20} />
                    </button>
                </div>
                
                <div className="education-level flex flex-col mt-4">
                    <label htmlFor="education" className="text-lg font-semibold">Education Level: </label>
                    <select
                        className="border w-full p-2 mt-1 bg-zinc-100 rounded-lg"
                        name="education"
                        value={educationData.education}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Education Level</option>
                        <option value="10th">10th</option>
                        <option value="12th">12th</option>
                        <option value="Graduation">Graduation</option>
                        <option value="Post-graduation">Post-graduation</option>
                        <option value="PHD">PHD</option>
                    </select>
                </div>

                <div className="university flex flex-col mt-3">
                    <label htmlFor="institutionName" className="text-lg font-semibold">University/Institute: </label>
                    <input
                        className="border w-full p-2 mt-1 bg-zinc-100 rounded-lg"
                        type="text"
                        name="institutionName"
                        placeholder="University or Institute Name"
                        value={educationData.institutionName}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="course flex flex-col mt-3">
                    <label htmlFor="courseName" className="text-lg font-semibold">Course: </label>
                    <input
                        className="border w-full p-2 mt-1 bg-zinc-100 rounded-lg"
                        type="text"
                        name="courseName"
                        placeholder="Course Name"
                        value={educationData.courseName}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="location flex flex-col mt-3">
                    <label htmlFor="location" className="text-lg font-semibold">Location: </label>
                    <input
                        className="border w-full p-2 mt-1 bg-zinc-100 rounded-lg"
                        type="text"
                        name="location"
                        placeholder="Institution Location"
                        value={educationData.location}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="course-type mt-3 flex flex-col gap-1">
                    <h1 className="text-lg font-semibold">Course Type</h1>
                    <div className="radio-btn flex gap-16">
                        <label>
                            <input
                                type="radio"
                                name="courseType"
                                value="full-time"
                                checked={educationData.courseType === 'full-time'}
                                onChange={handleInputChange}
                            />
                            Full-time
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="courseType"
                                value="part-time"
                                checked={educationData.courseType === 'part-time'}
                                onChange={handleInputChange}
                            />
                            Part-time
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="courseType"
                                value="distance-learning"
                                checked={educationData.courseType === 'distance-learning'}
                                onChange={handleInputChange}
                            />
                            Distance learning
                        </label>
                    </div>
                </div>

                <div className="duration flex flex-col mt-3">
                    <label htmlFor="duration" className="text-lg font-semibold">Duration: </label>
                    <input
                        className="border w-full p-2 mt-1 bg-zinc-100 rounded-lg"
                        type="text"
                        name="duration"
                        placeholder="e.g., 2 years, 4 semesters"
                        value={educationData.duration}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="marks flex flex-col mt-3">
                    <label htmlFor="marks" className="text-lg font-semibold">Marks/Grade: </label>
                    <input
                        className="border w-full p-2 mt-1 bg-zinc-100 rounded-lg"
                        type="text"
                        name="marks"
                        placeholder="e.g., 85%, 3.8 GPA"
                        value={educationData.marks}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="popup-buttons mt-6 flex gap-4">
                    <button className="px-3 py-2 border rounded-lg bg-zinc-100" onClick={handleCancel}>Cancel</button>
                    <button className="px-6 py-2 border rounded-lg bg-blue-500 text-white hover:bg-blue-600" onClick={handleSave}>
                        {initialData ? 'Update' : 'Save'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EducationForm;