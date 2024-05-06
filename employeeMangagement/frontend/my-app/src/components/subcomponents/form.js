// Form.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Form() {
  const navigate = useNavigate();

  const departmentOptions = [
    { value: 'systemManagement', label: 'System Management' },
    { value: 'financialManagement', label: 'Financial Management' },
    { value: 'veterinarian', label: 'Veterinarian' }
  ];

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNo: '', // Added phoneNo field
    licenseNumber: '',
    department: '', // Added department field
    availabilityStatus: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/submitFormData', formData);
      console.log(response.data);
      navigate('/'); // Redirect to home page
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert('Item No already exists. Please add a new one.');
      } else {
        console.error(error);
      }
    }
  };

  const handleClick = () => {
    navigate('/'); // Navigate programmatically to '/drivers' route
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        {/* Full Name Input */}
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        {/* Phone No Input */}
        <div className="mb-3">
          <label htmlFor="phoneNo" className="form-label">Phone No</label>
          <input
            type="tel"
            className="form-control"
            id="phoneNo"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
            required
          />
        </div>
        {/* License Number Input */}
        <div className="mb-3">
          <label htmlFor="licenseNumber" className="form-label">Employee ID</label>
          <input
            type="text"
            className="form-control"
            id="licenseNumber"
            name="licenseNumber"
            value={formData.licenseNumber}
            onChange={handleChange}
            required
          />
        </div>
        {/* Department Input */}
        <div className="mb-3">
          <label htmlFor="department" className="form-label">Department</label>
          <select
            className="form-select"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            {departmentOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        {/* Availability Status Select */}
        <div className="mb-3">
          <label htmlFor="availabilityStatus" className="form-label">Availability Status</label>
          <select
            className="form-select"
            id="availabilityStatus"
            name="availabilityStatus"
            value={formData.availabilityStatus}
            onChange={handleChange}
            required
          >
            <option value="">Select Availability Status</option>
            <option value="available">Available</option>
            <option value="onLeave">On Leave</option>
          </select>
        </div>
        {/* Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <button
            type="submit"
            className="btn btn-primary submit_before_viewDrivers"
            style={{ marginRight: '10px' }}
          >
            Submit
          </button>
          <button
            type="button"
            className="btn btn-primary view_drivers"
            onClick={handleClick}
            style={{ marginLeft: '1000px' }}
          >
            View Employees
          </button>
        </div>
      </form>
    </div>
  );
}
