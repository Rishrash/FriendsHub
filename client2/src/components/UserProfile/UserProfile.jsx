import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./UserProfile.css";
import axios from "axios";

export default function UserProfile() {
  const [formData, setFormData] = useState({
    nickName: "",
    bio: "",
    jobRole: "",
    workplace: "",
    education: "",
    college: "",
    school: "",
    homeTown: "",
    currentCity: "",
    relationshipStatus: "",
    mobileNumber: "",
    gender: "",
    yearOfBirth: 0,
    monthOfBirth: 0,
    dateOfBirth: 0,
  });

  const fetchUserProfile = async () => {
    try {
      const { userId } = useParams();
      console.log("UserId" + userId);
      const response = await axios.get(`/getUserProfile/${userId}`);
      console.log("Response" + response);
      const userProfileData = response.data;
      setFormData(userProfileData);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    console.log("Hello, this is a log message");
    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to update user details
      const response = await axios.post("/updateUserDetails", formData);

      // Handle the response as needed
      console.log("User details updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>User Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nickName" className="form-label">
            Nickname
          </label>
          <input
            type="text"
            className="form-control"
            id="nickName"
            name="nickName"
            value={formData.nickName}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="bio" className="form-label">
            Bio
          </label>
          <textarea
            className="form-control"
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="jobRole" className="form-label">
            Job Role
          </label>
          <input
            type="text"
            className="form-control"
            id="jobRole"
            name="jobRole"
            value={formData.jobRole}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="workplace" className="form-label">
            Workplace
          </label>
          <input
            type="text"
            className="form-control"
            id="workplace"
            name="workplace"
            value={formData.workplace}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="education" className="form-label">
            Education
          </label>
          <input
            type="text"
            className="form-control"
            id="education"
            name="education"
            value={formData.education}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="college" className="form-label">
            College
          </label>
          <input
            type="text"
            className="form-control"
            id="college"
            name="college"
            value={formData.college}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="school" className="form-label">
            School
          </label>
          <input
            type="text"
            className="form-control"
            id="school"
            name="school"
            value={formData.school}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="homeTown" className="form-label">
            Home Town
          </label>
          <input
            type="text"
            className="form-control"
            id="homeTown"
            name="homeTown"
            value={formData.homeTown}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="currentCity" className="form-label">
            Current City
          </label>
          <input
            type="text"
            className="form-control"
            id="currentCity"
            name="currentCity"
            value={formData.currentCity}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="relationshipStatus" className="form-label">
            Relationship Status
          </label>
          <select
            className="form-select"
            id="relationshipStatus"
            name="relationshipStatus"
            value={formData.relationshipStatus}
            onChange={handleInputChange}
          >
            <option value="Single">Single</option>
            <option value="In a relationship">In a relationship</option>
            <option value="Engaged">Engaged</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Separated">Separated</option>
            <option value="Widowed">Widowed</option>
            <option value="Open relationship">Open relationship</option>
            <option value="It's complicated">It's complicated</option>
            <option value="Not specified">Not specified</option>
            <option value="Dating">Dating</option>
            <option value="Exclusive">Exclusive</option>
            <option value="Searching">Searching</option>
            <option value="Taking a break">Taking a break</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="mobileNumber" className="form-label">
            Mobile Number
          </label>
          <input
            type="tel"
            className="form-control"
            id="mobileNumber"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleInputChange}
          />
        </div>
        <div class="col-auto">
          <button type="submit" class="btn btn-primary mb-3 btn-update">
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
}
