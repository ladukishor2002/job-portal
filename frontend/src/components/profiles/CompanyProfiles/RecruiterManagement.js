// import React, { useState, useEffect } from 'react';
// import { PlusCircle, Trash2, Users, Pencil, Key } from 'lucide-react';
// import { useDispatch, useSelector } from 'react-redux';
// import { createRecruiter, deleteRecruiter, fetchRecruiter, updateRecruiter } from '../../../operations/recruiterAPI';
// import RecruiterAccessToken from './RecruiterAccessToken';

// const RecruiterManagement = () => {
//   const token = useSelector((state)=>state.company?.token);
//   const recruiter = useSelector((state) => state.company?.recruiters);
  
//   const [newRecruiter, setNewRecruiter] = useState({ name: "", email: "", password: "", contactNumber: "", description: ""});
//   const [showAlert, setShowAlert] = useState(false);
//   const [alertMessage, setAlertMessage] = useState("");
//   const [editingId, setEditingId] = useState(null);
//   const [editData, setEditData] = useState({});
//   const [localRecruiters, setLocalRecruiters] = useState([]);
//   // New state for the token modal
//   const [showTokenModal, setShowTokenModal] = useState(false);
//   const [selectedRecruiterToken, setSelectedRecruiterToken] = useState("");
//   const [selectedRecruiterName, setSelectedRecruiterName] = useState("");

//   const dispatch = useDispatch();
  
//   useEffect(() => {
//     if (token) { 
//       dispatch(fetchRecruiter(token));
//     }
//   }, [token, dispatch]);

//   useEffect(() => {
//     let timer;
//     if (showAlert) {
//       timer = setTimeout(() => {
//         setShowAlert(false);
//       }, 3000);
//     }
//     return () => clearTimeout(timer);
//   }, [showAlert]);

//   const handleAddRecruiter = async () => {
//     if (!newRecruiter.name || !newRecruiter.email || !newRecruiter.password || !newRecruiter.contactNumber || !newRecruiter.description) {
//       setAlertMessage("Please fill in all recruiter fields");
//       setShowAlert(true);
//       return;
//     }

//     const newRecruiterData = {
//       token,
//       role: "recruiter",
//       ...newRecruiter,
//     };

//     try {
//       const response = await dispatch(createRecruiter(newRecruiterData, token));
     
//       // Update local state immediately with the new recruiter
//       if (response && response.data) {
//         setLocalRecruiters(prevRecruiters => [...prevRecruiters, response.data]);
//       }
//       dispatch(fetchRecruiter(token));
//       setNewRecruiter({ name: "", email: "", password: "", contactNumber: "", description: "" });
//       setAlertMessage("Recruiter added successfully");
//       setShowAlert(true);
//     } catch (error) {
//       console.error("Error adding recruiter:", error);
//       setAlertMessage("Failed to add recruiter");
//       setShowAlert(true);
//     }
//   };
  

//   const handleEditClick = (recruiterData) => {
//     setEditingId(recruiterData._id);
//     setEditData(recruiterData);
//   };

//   const handleSaveEdit = async () => {
//     try {
//       dispatch(updateRecruiter(token, editingId, editData));
//       setEditingId(null);
//       dispatch(fetchRecruiter(token));
//       setEditData({});
//       setAlertMessage("Recruiter updated successfully");
//       setShowAlert(true);
//     } catch (error) {
//       console.error("Error updating recruiter:", error);
//       setAlertMessage("Failed to update recruiter");
//       setShowAlert(true);
//     }
//   };

//   const handleCancelEdit = () => {
//     setEditingId(null);
//     setEditData({});
//   };

//   const handleDeleteRecruiter = async (id) => {
//     try {
//       await dispatch(deleteRecruiter(token, id));
//       // Update local state immediately
//       dispatch(fetchRecruiter(token));

//       setAlertMessage("Recruiter deleted successfully");
//       setShowAlert(true);
//     } catch (error) {
//       console.error("Error deleting recruiter:", error);
//       setAlertMessage("Failed to delete recruiter");
//       setShowAlert(true);
//     }
//   };

//   // New function to handle token icon click
//   const handleTokenClick = (recruiter) => {
//     setEditingId(recruiter._id);
//     setSelectedRecruiterToken(recruiter.token || "No token available");
//     setSelectedRecruiterName(recruiter.name);
//     setShowTokenModal(true);
//   };
//   // Function to close the token modal
//   const closeTokenModal = () => {
//     setShowTokenModal(false);
//     setSelectedRecruiterToken("");
//     setSelectedRecruiterName("");
//   };

//   console.log(editingId);

//   // Render the token modal
//   const TokenModal = () => {
//     if (!showTokenModal) return null;

//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//         <div className="bg-white rounded-lg p-6 w-full max-w-md">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-xl font-semibold">Access Token for {selectedRecruiterName}</h3>
//             <button 
//               onClick={closeTokenModal}
//               className="text-gray-500 hover:text-gray-700 focus:outline-none"
//             >
//               &times;
//             </button>
//           </div>
//           <div className="mb-4">
//             <p className="text-sm text-gray-600 mb-2">Use this token for API authentication:</p>
//             <div className="bg-gray-100 p-3 rounded-lg break-all font-mono text-sm">
//               {selectedRecruiterToken}
//             </div>
//           </div>
//           <div className="flex justify-between">
//             <button
//               onClick={() => {
//                 navigator.clipboard.writeText(selectedRecruiterToken);
//                 setAlertMessage("Token copied to clipboard");
//                 setShowAlert(true);
//               }}
//               className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//             >
//               Copy to Clipboard
//             </button>
//             <button
//               onClick={closeTokenModal}
//               className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md w-[60%]">
//       <div className="p-4 border-b">
//         <h2 className="text-xl font-semibold flex items-center gap-2">
//           <Users className="h-6 w-6" />
//           Recruiters Management
//         </h2>
//       </div>
//       <div className="p-6">
//         {showAlert && (
//           <div className="mb-4 p-4 rounded-lg bg-blue-50 text-blue-700">
//             {alertMessage}
//           </div>
//         )}

//         <div className="space-y-6">
//           {/* Add New Recruiter Form */}
//           <div className="flex gap-4 items-end">
//             <div className="flex-1 space-y-2">
//               <input
//                 type="text"
//                 placeholder="Recruiter Name"
//                 value={newRecruiter.name}
//                 onChange={(e) => setNewRecruiter({ ...newRecruiter, name: e.target.value })}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <input
//                 type="email"
//                 placeholder="Recruiter Email"
//                 value={newRecruiter.email}
//                 onChange={(e) => setNewRecruiter({ ...newRecruiter, email: e.target.value })}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <input 
//                 type="password"
//                 placeholder="Enter password" 
//                 value={newRecruiter.password} 
//                 onChange={(e) => setNewRecruiter({...newRecruiter, password: e.target.value})}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <input 
//                 type="number"
//                 placeholder="Enter your number" 
//                 value={newRecruiter.contactNumber} 
//                 onChange={(e) => setNewRecruiter({...newRecruiter, contactNumber: e.target.value})}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <input 
//                 type="text"
//                 placeholder="Enter the description" 
//                 value={newRecruiter.description} 
//                 onChange={(e) => setNewRecruiter({...newRecruiter, description: e.target.value})}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <button
//               onClick={handleAddRecruiter}
//               className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2"
//             >
//               <PlusCircle className="h-4 w-4" />
//               Add Recruiter
//             </button>
//           </div>

//           {/* Recruiters List */}
//           <div className="space-y-4">
//             {recruiter && recruiter.length > 0 ? (
//               <div className="recruiter mt-6 px-4">
//                 {recruiter.map((recruiterItem) => (
//                   <div
//                     key={recruiterItem._id}
//                     className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-4"
//                   >
//                     <div className="space-y-1 flex-1">
//                       {editingId === recruiterItem._id ? (
//                         <div className="space-y-2">
//                           <input
//                             type="text"
//                             value={editData.name}
//                             onChange={(e) => setEditData({...editData, name: e.target.value})}
//                             className="w-full px-3 py-1 border rounded"
//                           />
//                           <input
//                             type="email"
//                             value={editData.email}
//                             onChange={(e) => setEditData({...editData, email: e.target.value})}
//                             className="w-full px-3 py-1 border rounded"
//                           />
//                           <input
//                             type="text"
//                             value={editData.password}
//                             onChange={(e) => setEditData({...editData, password: e.target.value})}
//                             className="w-full px-3 py-1 border rounded"
//                           />
//                           <input
//                             type="text"
//                             value={editData.contactNumber}
//                             onChange={(e) => setEditData({...editData, contactNumber: e.target.value})}
//                             className="w-full px-3 py-1 border rounded"
//                           />
//                           <input
//                             type="text"
//                             value={editData.description}
//                             onChange={(e) => setEditData({...editData, description: e.target.value})}
//                             className="w-full px-3 py-1 border rounded"
//                           />
//                           <div className="flex gap-2">
//                             <button
//                               onClick={handleSaveEdit}
//                               className="px-3 py-1 bg-green-600 text-white rounded"
//                             >
//                               Save
//                             </button>
//                             <button
//                               onClick={handleCancelEdit}
//                               className="px-3 py-1 bg-gray-600 text-white rounded"
//                             >
//                               Cancel
//                             </button>
//                           </div>
//                         </div>
//                       ) : (
//                         <>
//                           <h4 className="font-medium">{recruiterItem.name}</h4>
//                           <p className="text-sm text-gray-600">Email: {recruiterItem.email}</p>
//                           <p className="text-sm text-gray-600">Password: {recruiterItem.password}</p>
//                           <p className="text-sm text-gray-600">Contact: {recruiterItem.contactNumber}</p>
//                           <p className="text-sm text-gray-600">Description: {recruiterItem.description}</p>
//                         </>
//                       )}
//                     </div>
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => handleTokenClick(recruiterItem)}
//                         className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center gap-2 h-10"
//                         title="View Access Token"
//                       >
//                         <Key className="h-4 w-4" />
//                         Token
//                       </button>
//                       <button
//                         onClick={() => handleEditClick(recruiterItem)}
//                         className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2 h-10"
//                       >
//                         <Pencil className="h-4 w-4" />
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDeleteRecruiter(recruiterItem._id)}
//                         className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex items-center gap-2 h-10"
//                       >
//                         <Trash2 className="h-4 w-4" />
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-center text-gray-600">No recruiters found</p>
//             )}
//           </div>
//         </div>
//       </div>
      
//       {/* Token Modal Component */}
//       <RecruiterAccessToken    isOpen={showTokenModal} 
//   onClose={closeTokenModal} 
//   recruiterId={editingId}/>
//     </div>
//   );
// };

// export default RecruiterManagement;
import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2, Users, Pencil, Key } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { createRecruiter, deleteRecruiter, fetchRecruiter, updateRecruiter } from '../../../operations/recruiterAPI';
import RecruiterAccessToken from './RecruiterAccessToken';

const RecruiterManagement = () => {
  const token = useSelector((state)=>state.company?.token);
  const recruiter = useSelector((state) => state.company?.recruiters);
  
  const [newRecruiter, setNewRecruiter] = useState({ name: "", email: "", password: "", contactNumber: "", description: ""});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [localRecruiters, setLocalRecruiters] = useState([]);
  // New state for the token modal
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [selectedRecruiterToken, setSelectedRecruiterToken] = useState("");
  const [selectedRecruiterName, setSelectedRecruiterName] = useState("");
  const [tokenRecruiterId, setTokenRecruiterId] = useState(null);

  const dispatch = useDispatch();
  
  useEffect(() => {
    if (token) { 
      dispatch(fetchRecruiter(token));
    }
  }, [token, dispatch]);

  useEffect(() => {
    let timer;
    if (showAlert) {
      timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [showAlert]);

  const handleAddRecruiter = async () => {
    if (!newRecruiter.name || !newRecruiter.email || !newRecruiter.password || !newRecruiter.contactNumber || !newRecruiter.description) {
      setAlertMessage("Please fill in all recruiter fields");
      setShowAlert(true);
      return;
    }

    const newRecruiterData = {
      token,
      role: "recruiter",
      ...newRecruiter,
    };

    try {
      const response = await dispatch(createRecruiter(newRecruiterData, token));
     
      // Update local state immediately with the new recruiter
      if (response && response.data) {
        setLocalRecruiters(prevRecruiters => [...prevRecruiters, response.data]);
      }
      dispatch(fetchRecruiter(token));
      setNewRecruiter({ name: "", email: "", password: "", contactNumber: "", description: "" });
      setAlertMessage("Recruiter added successfully");
      setShowAlert(true);
    } catch (error) {
      console.error("Error adding recruiter:", error);
      setAlertMessage("Failed to add recruiter");
      setShowAlert(true);
    }
  };
  

  const handleEditClick = (recruiterData) => {
    setEditingId(recruiterData._id);
    setEditData(recruiterData);
  };

  const handleSaveEdit = async () => {
    try {
      dispatch(updateRecruiter(token, editingId, editData));
      setEditingId(null);
      dispatch(fetchRecruiter(token));
      setEditData({});
      setAlertMessage("Recruiter updated successfully");
      setShowAlert(true);
    } catch (error) {
      console.error("Error updating recruiter:", error);
      setAlertMessage("Failed to update recruiter");
      setShowAlert(true);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleDeleteRecruiter = async (id) => {
    try {
      await dispatch(deleteRecruiter(token, id));
      // Update local state immediately
      dispatch(fetchRecruiter(token));

      setAlertMessage("Recruiter deleted successfully");
      setShowAlert(true);
    } catch (error) {
      console.error("Error deleting recruiter:", error);
      setAlertMessage("Failed to delete recruiter");
      setShowAlert(true);
    }
  };

  // Updated function to handle token icon click
  const handleTokenClick = (recruiter) => {
    setTokenRecruiterId(recruiter._id);
    setSelectedRecruiterToken(recruiter.token || "No token available");
    setSelectedRecruiterName(recruiter.name);
    setShowTokenModal(true);
  };
  
  // Updated function to close the token modal
  const closeTokenModal = () => {
    setShowTokenModal(false);
    setTokenRecruiterId(null);
    setSelectedRecruiterToken("");
    setSelectedRecruiterName("");
  };

  // Render the token modal
  const TokenModal = () => {
    if (!showTokenModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Access Token for {selectedRecruiterName}</h3>
            <button 
              onClick={closeTokenModal}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              &times;
            </button>
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Use this token for API authentication:</p>
            <div className="bg-gray-100 p-3 rounded-lg break-all font-mono text-sm">
              {selectedRecruiterToken}
            </div>
          </div>
          <div className="flex justify-between">
            <button
              onClick={() => {
                navigator.clipboard.writeText(selectedRecruiterToken);
                setAlertMessage("Token copied to clipboard");
                setShowAlert(true);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Copy to Clipboard
            </button>
            <button
              onClick={closeTokenModal}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md w-[60%]">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Users className="h-6 w-6" />
          Recruiters Management
        </h2>
      </div>
      <div className="p-6">
        {showAlert && (
          <div className="mb-4 p-4 rounded-lg bg-blue-50 text-blue-700">
            {alertMessage}
          </div>
        )}

        <div className="space-y-6">
          {/* Add New Recruiter Form */}
          <div className="flex gap-4 items-end">
            <div className="flex-1 space-y-2">
              <input
                type="text"
                placeholder="Recruiter Name"
                value={newRecruiter.name}
                onChange={(e) => setNewRecruiter({ ...newRecruiter, name: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Recruiter Email"
                value={newRecruiter.email}
                onChange={(e) => setNewRecruiter({ ...newRecruiter, email: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input 
                type="password"
                placeholder="Enter password" 
                value={newRecruiter.password} 
                onChange={(e) => setNewRecruiter({...newRecruiter, password: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input 
                type="number"
                placeholder="Enter your number" 
                value={newRecruiter.contactNumber} 
                onChange={(e) => setNewRecruiter({...newRecruiter, contactNumber: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input 
                type="text"
                placeholder="Enter the description" 
                value={newRecruiter.description} 
                onChange={(e) => setNewRecruiter({...newRecruiter, description: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleAddRecruiter}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2"
            >
              <PlusCircle className="h-4 w-4" />
              Add Recruiter
            </button>
          </div>

          {/* Recruiters List */}
          <div className="space-y-4">
            {recruiter && recruiter.length > 0 ? (
              <div className="recruiter mt-6 px-4">
                {recruiter.map((recruiterItem) => (
                  <div
                    key={recruiterItem._id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-4"
                  >
                    <div className="space-y-1 flex-1">
                      {editingId === recruiterItem._id ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={editData.name}
                            onChange={(e) => setEditData({...editData, name: e.target.value})}
                            className="w-full px-3 py-1 border rounded"
                          />
                          <input
                            type="email"
                            value={editData.email}
                            onChange={(e) => setEditData({...editData, email: e.target.value})}
                            className="w-full px-3 py-1 border rounded"
                          />
                          <input
                            type="text"
                            value={editData.password}
                            onChange={(e) => setEditData({...editData, password: e.target.value})}
                            className="w-full px-3 py-1 border rounded"
                          />
                          <input
                            type="text"
                            value={editData.contactNumber}
                            onChange={(e) => setEditData({...editData, contactNumber: e.target.value})}
                            className="w-full px-3 py-1 border rounded"
                          />
                          <input
                            type="text"
                            value={editData.description}
                            onChange={(e) => setEditData({...editData, description: e.target.value})}
                            className="w-full px-3 py-1 border rounded"
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={handleSaveEdit}
                              className="px-3 py-1 bg-green-600 text-white rounded"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="px-3 py-1 bg-gray-600 text-white rounded"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <h4 className="font-medium">{recruiterItem.name}</h4>
                          <p className="text-sm text-gray-600">Email: {recruiterItem.email}</p>
                          <p className="text-sm text-gray-600">Password: {recruiterItem.password}</p>
                          <p className="text-sm text-gray-600">Contact: {recruiterItem.contactNumber}</p>
                          <p className="text-sm text-gray-600">Description: {recruiterItem.description}</p>
                        </>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleTokenClick(recruiterItem)}
                        className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center gap-2 h-10"
                        title="View Access Token"
                      >
                        <Key className="h-4 w-4" />
                        Token
                      </button>
                      <button
                        onClick={() => handleEditClick(recruiterItem)}
                        className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2 h-10"
                      >
                        <Pencil className="h-4 w-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteRecruiter(recruiterItem._id)}
                        className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex items-center gap-2 h-10"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600">No recruiters found</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Token Modal Component */}
      <RecruiterAccessToken    
        isOpen={showTokenModal} 
        onClose={closeTokenModal} 
        recruiterId={tokenRecruiterId}
      />
    </div>
  );
};

export default RecruiterManagement;