import React, { useState } from 'react';
import { Building, Mail, Globe, MapPin, Upload, Edit2, Check, X } from 'lucide-react';
import RecruiterManagement from './RecruiterManagement';
import CompanyHeader from './CompanyHeader';

const CompanyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [company, setCompany] = useState({
    name: "TechCorp Inc",
    description: "Leading technology solutions provider",
    email: "contact@techcorp.com",
    website: "www.techcorp.com",
    location: "San Francisco, CA",
    companyfield: ["IT", "Sales"],
    logo: "/api/placeholder/100/100"
  });

  const [editedCompany, setEditedCompany] = useState(company);
  const [newField, setNewField] = useState("");

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setEditedCompany(prev => ({
        ...prev,
        logo: imageUrl
      }));
    }
  };

  const handleEdit = () => {
    setEditedCompany(company);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedCompany(company);
  };

  const handleSave = () => {
    setCompany(editedCompany);
    setIsEditing(false);
    // Here you would typically make an API call to update the company information
  };

  const handleAddField = () => {
    if (newField && !editedCompany.companyfield.includes(newField)) {
      setEditedCompany(prev => ({
        ...prev,
        companyfield: [...prev.companyfield, newField]
      }));
      setNewField("");
    }
  };

  const handleRemoveField = (fieldToRemove) => {
    setEditedCompany(prev => ({
      ...prev,
      companyfield: prev.companyfield.filter(field => field !== fieldToRemove)
    }));
  };

  return (
    <>
      
      <div className="min-h-[100vh] relative w-full flex items-center flex-col space-y-6 bg-slate-100">
      <CompanyHeader />
        <div className="bg-white rounded-lg shadow-md w-[60%]   ">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Building className="h-6 w-6" />
              Company Information
            </h2>
            {!isEditing ? (
              <button 
                onClick={handleEdit}
                className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2"
              >
                <Edit2 className="h-4 w-4" />
                Edit Company
              </button>
            ) : (
              <div className="flex gap-2">
                <button 
                  onClick={handleSave}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
                >
                  <Check className="h-4 w-4" />
                  Save
                </button>
                <button 
                  onClick={handleCancel}
                  className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </button>
              </div>
            )}
          </div>
          <div className="p-6 grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative group">
                  <img
                    src={isEditing ? editedCompany.logo : company.logo}
                    alt="Company Logo"
                    className="w-24 h-24 rounded-lg object-cover border"
                  />
                  {isEditing && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleLogoUpload}
                        />
                        <div className="flex items-center gap-2 px-3 py-2 text-white hover:bg-white hover:bg-opacity-10 rounded transition-colors">
                          <Upload className="h-4 w-4" />
                          <span>Upload</span>
                        </div>
                      </label>
                    </div>
                  )}
                </div>
                <div className="space-y-2 flex-1">
                  {isEditing ? (
                    <>
                      <input
                        value={editedCompany.name}
                        onChange={(e) => setEditedCompany(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Company Name"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-lg"
                      />
                      <textarea
                        value={editedCompany.description}
                        onChange={(e) => setEditedCompany(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Company Description"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        rows={3}
                      />
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold">{company.name}</h3>
                      <p className="text-gray-600">{company.description}</p>
                    </>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                {isEditing ? (
                  <>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-600" />
                      <input
                        value={editedCompany.email}
                        onChange={(e) => setEditedCompany(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="Email"
                        className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-gray-600" />
                      <input
                        value={editedCompany.website}
                        onChange={(e) => setEditedCompany(prev => ({ ...prev, website: e.target.value }))}
                        placeholder="Website"
                        className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-600" />
                      <input
                        value={editedCompany.location}
                        onChange={(e) => setEditedCompany(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="Location"
                        className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-600" />
                      <span>{company.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-gray-600" />
                      <span>{company.website}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-600" />
                      <span>{company.location}</span>
                    </div>
                  </>
                )}
              </div>
              <div>
                <h4 className="font-semibold mb-2">Fields:</h4>
                <div className="flex gap-2 flex-wrap">
                  {(isEditing ? editedCompany.companyfield : company.companyfield).map((field, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-1"
                    >
                      {field}
                      {isEditing && (
                        <button
                          onClick={() => handleRemoveField(field)}
                          className="text-blue-800 hover:text-blue-900"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </span>
                  ))}
                  {isEditing && (
                    <div className="flex gap-2">
                      <input
                        value={newField}
                        onChange={(e) => setNewField(e.target.value)}
                        placeholder="Add field"
                        className="w-32 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button 
                        onClick={handleAddField}
                        className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Add
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <RecruiterManagement />
      </div>
    </>
  );
};

export default CompanyProfile;