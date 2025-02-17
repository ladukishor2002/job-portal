

// import React, { useEffect, useMemo, useState } from 'react';
// import { Plus, Pencil, Trash2, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCompanyJobs } from '../../../operations/companyAPI';
// import { fetchJob, createJob, updateJob } from '../../../operations/recruiterAPI';

// // const ImageSlider = ({ images }) => {
// //   const [currentIndex, setCurrentIndex] = useState(0);

// //   const goToNext = () => {
// //     setCurrentIndex((prevIndex) => 
// //       prevIndex === images.length - 1 ? 0 : prevIndex + 1
// //     );
// //   };

// //   const goToPrevious = () => {
// //     setCurrentIndex((prevIndex) => 
// //       prevIndex === 0 ? images.length - 1 : prevIndex - 1
// //     );
// //   };

// //   if (!images || images.length === 0) return null;

// //   return (
// //     <div className="relative w-full h-96 mb-2">
// //       <div className="absolute inset-0 bg-gray-100 rounded overflow-hidden">
// //         <img
// //           src={images[currentIndex]}
// //           alt={`Slide ${currentIndex + 1}`}
// //           className="w-full h-full object-cover"
// //         />
// //       </div>
// //       {images.length > 1 && (
// //         <>
// //           <button
// //             className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
// //             onClick={goToPrevious}
// //           >
// //             <ChevronLeft className="w-4 h-4" />
// //           </button>
// //           <button
// //             className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white"
// //             onClick={goToNext}
// //           >
// //             <ChevronRight className="w-4 h-4" />
// //           </button>
// //           <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
// //             {images.map((_, index) => (
// //               <button
// //                 key={index}
// //                 className={`w-2 h-2 rounded-full ${
// //                   index === currentIndex ? 'bg-white' : 'bg-white/50'
// //                 }`}
// //                 onClick={() => setCurrentIndex(index)}
// //               />
// //             ))}
// //           </div>
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// const Modal = ({ isOpen, onClose, title, children }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-4 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//         <div className="flex justify-between items-center mb-2">
//           <h2 className="text-xl font-bold">{title}</h2>
//           <button 
//             onClick={onClose} 
//             className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
//           >
//             ×
//           </button>
//         </div>
//         {children}
//       </div>
//     </div>
//   );
// };

// const Jobs = () => {

//   const selectors = useMemo(() => ({
//     selectFetchedJobs: (state) => state.recruiter.recruiterData,
//   }), []);
  
//   const job = useSelector(selectors.selectFetchedJobs);
//   console.log(job);
//   const dispatch = useDispatch();
//   const token = useSelector((state) => state.recruiter.token);
//   console.log("token in jobs", token)

//   useEffect(() => {
//     if (token) {
//       console.log("fetching jobs...");
//       dispatch(fetchJob(token));
//     }
//   }, [dispatch, token]);

//   useEffect(()=> {
//     if(job){
//       setAllJob(job);
//     }
//   }, job)


// const [alljob, setAllJob] = useState([]);
//   const [editingJob, setEditingJob] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     jobTitle: "",
  
//     jobLocation: "",
//     jobType: "",
//     description: "",
//     skillRequired: [],
//     salaryRange: "",
//     // images: []
//   });

//   // const handleImageUpload = (e) => {
//   //   const files = Array.from(e.target.files);
//   //   const imageUrls = files.map(file => URL.createObjectURL(file));
//   //   setFormData(prev => ({
//   //     ...prev,
//   //     images: [...prev.images, ...imageUrls]
//   //   }));
//   // };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (editingJob) {
//       // Dispatch update job action with formData
//       dispatch(updateJob({
//         id: editingJob.id,
//         jobData: formData,
//         token
//       }));

//       // Update local state for immediate UI feedback
//       setJobs(prev => prev.map(job => 
//         job.id === editingJob.id ? { ...formData, id: job.id } : job
//       ));

//     } else {
//       // Dispatch create job action with formData
//       console.log("token", token);
//       console.log("form data", formData);
//       dispatch(createJob(
//         token,
//       formData
        
//       )
//     );

//       setJobs(prev => [...prev, { ...formData, id: Date.now() }]);
//     }
//     handleCloseModal();
//   };

//   const handleDelete = (jobId) => {
//     setJobs(prev => prev.filter(job => job.id !== jobId));
//   };

//   const handleEdit = (job) => {
//     setEditingJob(job);
//     setFormData({
//       jobTitle: job.title,
//       // company: job.company,
//       jobLocation: job.location,
//       jobType: job.type,
//       description: job.description,
//       skillRequired: [job.requirements],
//       salaryRange: job.salary,
//       // images: job.images || []
//     });
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setEditingJob(null);
//     setFormData({
//       jobTitle: "",
//       // company: "",
//       jobLocation: "",
//       jobType: "",
//       description: "",
//       skillRequired: [],
//       salaryRange: "",
//       // images: []
//     });
//   };

//   return (
//     <div className="p-4 max-w-5xl mx-auto">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Job Listings</h1>
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
//         >
//           <Plus className="w-4 h-4" />
//           Add New Job
//         </button>
//       </div>

//       <Modal
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         title={editingJob ? 'Edit Job Listing' : 'Create New Job Listing'}
//       >
//         <form onSubmit={handleSubmit} className="space-y-3">
//           <div className="grid grid-cols-2 gap-3">
//             <div>
//               <label className="block text-sm font-medium mb-1">Job Title</label>
//               <input
//                 type="text"
//                 name="jobTitle"
//                 value={formData.title}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
//                 required
//               />
//             </div>
//             {/* <div>
//               <label className="block text-sm font-medium mb-1">Company</label>
//               <input
//                 type="text"
//                 name="company"
//                 value={formData.company}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
//                 required
//               />
//             </div> */}
//             <div>
//               <label className="block text-sm font-medium mb-1">Location</label>
//               <input
//                 type="text"
//                 name="jobLocation"
//                 value={formData.location}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Job Type</label>
//               <input
//                 type="text"
//                 name="jobType"
//                 value={formData.type}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Salary Range</label>
//               <input
//                 type="text"
//                 name="salaryRange"
//                 value={formData.salary}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
//                 required
//               />
//             </div>
//             {/* <div>
//               <label className="block text-sm font-medium mb-1">Images</label>
//               <input
//                 type="file"
//                 multiple
//                 onChange={handleImageUpload}
//                 className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
//               />
//               {formData.images.length > 0 && (
//                 <div className="mt-2 flex flex-wrap gap-2">
//                   {formData.images.map((url, index) => (
//                     <div key={index} className="w-16 h-16 relative">
//                       <img src={url} alt={`Thumbnail ${index}`} className="w-full h-full object-cover rounded" />
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div> */}
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">Description</label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded h-20 focus:outline-none focus:ring-1 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">Requirements</label>
//             <textarea
//               name="skillRequired"
//               value={formData.requirements}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded h-20 focus:outline-none focus:ring-1 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <div className="flex justify-end gap-2 mt-2">
//             <button
//               type="button"
//               onClick={handleCloseModal}
//               className="px-4 py-2 border rounded hover:bg-gray-100"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             >
//               {editingJob ? 'Update Job' : 'Create Job'}
//             </button>
//           </div>
//         </form>
//       </Modal>

//       <div className="space-y-3">
//         {jobs.map(job => (
//           <div key={job.id} className="border rounded-lg p-4 bg-white shadow-sm">
//             {/* {job.images.length > 0 && <ImageSlider images={job.images} />} */}
//             <div className="flex justify-between items-start mt-1">
//               <div>
//                 <h2 className="text-xl font-bold text-gray-800">{job.title}</h2>
//                 {/* <p className="text-gray-600">{job.company}</p> */}
//               </div>
//               <div className="flex gap-1">
//                 <button
//                   onClick={() => handleEdit(job)}
//                   className="p-1.5 text-gray-600 hover:text-gray-800 transition-colors"
//                 >
//                   <Pencil className="w-5 h-5" />
//                 </button>
//                 <button
//                   onClick={() => handleDelete(job.id)}
//                   className="p-1.5 text-red-600 hover:text-red-800 transition-colors"
//                 >
//                   <Trash2 className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
//             <div className="mt-3 grid grid-cols-3 gap-2">
//               <div className="bg-gray-50 p-2 rounded">
//                 <span className="block text-sm font-medium text-gray-600">Location</span>
//                 <span className="text-gray-900">{job.location}</span>
//               </div>
//               <div className="bg-gray-50 p-2 rounded">
//                 <span className="block text-sm font-medium text-gray-600">Type</span>
//                 <span className="text-gray-900">{job.type}</span>
//               </div>
//               <div className="bg-gray-50 p-2 rounded">
//                 <span className="block text-sm font-medium text-gray-600">Salary</span>
//                 <span className="text-gray-900">{job.salary}</span>
//               </div>
//             </div>
//             <div className="mt-3">
//               <h4 className="text-base font-medium text-gray-800 mb-1">Description</h4>
//               <p className="text-gray-600 text-sm">{job.description}</p>
//             </div>
//             <div className="mt-2">
//               <h4 className="text-base font-medium text-gray-800 mb-1">Requirements</h4>
//               <p className="text-gray-600 text-sm">{job.requirements}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Jobs;

import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJob, createJob, updateJob, deleteJob } from '../../../operations/recruiterAPI';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold">{title}</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const Jobs = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.recruiter.token);
  const recruiterData = useSelector(state => state.recruiter.recruiterData);
  
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobLocation: "",
    jobType: "",
    description: "",
    skillRequired: "",
    salaryRange: "",
  });

  // Fetch jobs when component mounts or token changes
  useEffect(() => {
    if (token) {
      dispatch(fetchJob(token));
    }
  }, [dispatch, token]);

  // Update local state when recruiterData changes
  useEffect(() => {
    if (recruiterData && Array.isArray(recruiterData)) {
      // Map API data to component format
      const formattedJobs = recruiterData.map(job => ({
        id: job._id,
        title: job.jobTitle,
        location: job.jobLocation || '',
        type: job.jobType || '',
        description: job.description || '',
        requirements: Array.isArray(job.skillRequired) 
          ? job.skillRequired.join(', ') 
          : typeof job.skillRequired === 'string' 
            ? job.skillRequired 
            : '',
        salary: job.salaryRange || ''
      }));
      setJobs(formattedJobs);
    }
  }, [recruiterData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prepare data for API
    const jobData = {
      ...formData,
      skillRequired: formData.skillRequired
        ? formData.skillRequired.split(',').map(skill => skill.trim())
        : []
    };
    
    if (editingJob) {
      dispatch(updateJob(
        token,
         editingJob.id,
        jobData,
        
      ));
    } else {
      dispatch(createJob(token, jobData));
    }
    
    handleCloseModal();
  };

  const handleDelete = (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      dispatch(deleteJob(token, jobId ));
      setJobs(prev => prev.filter(job => job.id !== jobId));
    }
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setFormData({
      jobTitle: job.title || '',
      jobLocation: job.location || '',
      jobType: job.type || '',
      description: job.description || '',
      skillRequired: typeof job.requirements === 'string'
        ? job.requirements
        : Array.isArray(job.requirements)
          ? job.requirements.join(', ')
          : '',
      salaryRange: job.salary || '',
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingJob(null);
    setFormData({
      jobTitle: "",
      jobLocation: "",
      jobType: "",
      description: "",
      skillRequired: "",
      salaryRange: "",
    });
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Job Listings</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
        >
          <Plus className="w-4 h-4" />
          Add New Job
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingJob ? 'Edit Job Listing' : 'Create New Job Listing'}
      >
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Job Title</label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                type="text"
                name="jobLocation"
                value={formData.jobLocation}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Job Type</label>
              <input
                type="text"
                name="jobType"
                value={formData.jobType}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Salary Range</label>
              <input
                type="text"
                name="salaryRange"
                value={formData.salaryRange}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded h-20 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Requirements (comma-separated)</label>
            <textarea
              name="skillRequired"
              value={formData.skillRequired}
              onChange={handleInputChange}
              className="w-full p-2 border rounded h-20 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
              placeholder="E.g. React, JavaScript, 3+ years experience"
            />
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {editingJob ? 'Update Job' : 'Create Job'}
            </button>
          </div>
        </form>
      </Modal>

      <div className="space-y-3">
        {jobs.length > 0 ? (
          jobs.map(job => (
            <div key={job.id} className="border rounded-lg p-4 bg-white shadow-sm">
              <div className="flex justify-between items-start mt-1">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{job.title || 'Untitled Job'}</h2>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleEdit(job)}
                    className="p-1.5 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="p-1.5 text-red-600 hover:text-red-800 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                <div className="bg-gray-50 p-2 rounded">
                  <span className="block text-sm font-medium text-gray-600">Location</span>
                  <span className="text-gray-900">{job.location || 'Not specified'}</span>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <span className="block text-sm font-medium text-gray-600">Type</span>
                  <span className="text-gray-900">{job.type || 'Not specified'}</span>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <span className="block text-sm font-medium text-gray-600">Salary</span>
                  <span className="text-gray-900">{job.salary || 'Not specified'}</span>
                </div>
              </div>
              <div className="mt-3">
                <h4 className="text-base font-medium text-gray-800 mb-1">Description</h4>
                <p className="text-gray-600 text-sm">{job.description || 'No description provided'}</p>
              </div>
              <div className="mt-2">
                <h4 className="text-base font-medium text-gray-800 mb-1">Requirements</h4>
                <p className="text-gray-600 text-sm">{job.requirements || 'No requirements specified'}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No jobs found. Click "Add New Job" to create your first job posting.
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;