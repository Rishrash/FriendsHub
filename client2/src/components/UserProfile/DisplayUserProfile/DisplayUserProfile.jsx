import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import "./DisplayUserProfile.css";
import axios from "axios";

export default function DisplayUserProfile() {
  const [userProfileData, setUserProfileData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    emailAddress: "",
    profilePicture: "",
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
  const [imageSrc, setImageSrc] = useState("/Images/profile-picture.png");
  const { userId } = useParams();
  console.log("User Id - " + userId);
  const fetchUserProfile = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/getUserProfile/${userId}`
      );
      const responseData = response.data;
      setUserProfileData({
        firstName: responseData.userProfileData.firstName,
        lastName: responseData.userProfileData.lastName,
        username: responseData.userProfileData.username,
        emailAddress: responseData.userProfileData.emailAddress,
        profilePicture: responseData.userProfileData.profilePicture,
        nickName: responseData.userProfileData.userInformation.nickName,
        bio: responseData.userProfileData.userInformation.bio,
        jobRole: responseData.userProfileData.userInformation.jobRole,
        workplace: responseData.userProfileData.userInformation.workplace,
        education: responseData.userProfileData.userInformation.education,
        college: responseData.userProfileData.userInformation.college,
        school: responseData.userProfileData.userInformation.school,
        homeTown: responseData.userProfileData.userInformation.homeTown,
        currentCity: responseData.userProfileData.userInformation.currentCity,
        relationshipStatus:
          responseData.userProfileData.userInformation.relationshipStatus,
        mobileNumber: responseData.userProfileData.userInformation.mobileNumber,
        gender: responseData.userProfileData.userInformation.gender,
        yearOfBirth:
          responseData.userProfileData.userInformation.yearOfBirth || 0,
        monthOfBirth:
          responseData.userProfileData.userInformation.monthOfBirth || 0,
        dateOfBirth:
          responseData.userProfileData.userInformation.dateOfBirth || 0,
      });

      setImageSrc(responseData.userProfileData.profilePicture);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const fileInputRef = useRef(null);

  const handleImage = async (event) => {
    try {
      const selectedFile = event.target.files[0];

      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("path", `friendsHub/${userId}/profilePictures`);
        formData.append("username", userId);

        const uploadApiUrl = "http://localhost:8000/updateUserProfilePicture";

        // Make an API call to upload the image
        const response = await axios.put(uploadApiUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const updatedImageSrc = response.data.url;

        // Update the state with the new image URL
        setImageSrc(updatedImageSrc);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      // Handle errors
    }
  };

  const handleEditImageClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    fetchUserProfile(userId);
  }, []);

  return (
    <>
      <div className="display-profile-container">
        <div className="display-profile-subcontainer">
          <div className="profile-picture-container">
            <img
              className="profile-picture"
              src={imageSrc}
              alt="Profile Picture"
            />
          </div>
          <div>
            <a className="edit-image" onClick={handleEditImageClick}>
              Edit Image
            </a>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleImage}
            />
          </div>
          <span className="fullName">
            {userProfileData.firstName} {userProfileData.lastName}
          </span>
          <p>{userProfileData.emailAddress}</p>
          <div className="table-container">
            <table>
              <tbody>
                <tr>
                  <td>
                    <strong>Username:</strong>
                  </td>
                  <td class="data">
                    {userProfileData.username ? userProfileData.username : "--"}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Email Address:</strong>
                  </td>
                  <td class="data">
                    {userProfileData.emailAddress
                      ? userProfileData.emailAddress
                      : "--"}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Nick Name:</strong>
                  </td>
                  <td class="data">
                    {userProfileData.nickName ? userProfileData.nickName : "--"}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Bio:</strong>
                  </td>
                  <td class="data">
                    {userProfileData.bio ? userProfileData.bio : "--"}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Job Role:</strong>
                  </td>
                  <td class="data">
                    {userProfileData.jobRole ? userProfileData.jobRole : "--"}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Workplace:</strong>
                  </td>
                  <td class="data">
                    {userProfileData.workplace
                      ? userProfileData.workplace
                      : "--"}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Education:</strong>
                  </td>
                  <td class="data">
                    {userProfileData.education
                      ? userProfileData.education
                      : "--"}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>College:</strong>
                  </td>
                  <td class="data">
                    {userProfileData.college ? userProfileData.college : "--"}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>School:</strong>
                  </td>
                  <td class="data">
                    {userProfileData.school ? userProfileData.school : "--"}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Home Town:</strong>
                  </td>
                  <td class="data">
                    {userProfileData.homeTown ? userProfileData.homeTown : "--"}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Current City:</strong>
                  </td>
                  <td class="data">
                    {userProfileData.currentCity
                      ? userProfileData.currentCity
                      : "--"}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Relationship Status:</strong>
                  </td>
                  <td class="data">
                    {userProfileData.relationshipStatus
                      ? userProfileData.relationshipStatus
                      : "--"}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Mobile Number:</strong>
                  </td>
                  <td class="data">
                    {userProfileData.mobileNumber
                      ? userProfileData.mobileNumber
                      : "--"}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Gender:</strong>
                  </td>
                  <td class="data">
                    {userProfileData.gender ? userProfileData.gender : "--"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Link to={`/updateUserProfile/${userId}`} className="nav-link">
            <button className="btn btn-primary" type="submit">
              Update Profile
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
