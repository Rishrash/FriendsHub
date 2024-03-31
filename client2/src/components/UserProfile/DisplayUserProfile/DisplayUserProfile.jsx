import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import "./DisplayUserProfile.css";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import DisplayPost from "../../Post/DisplayPost/DisplayPost";

export default function DisplayUserProfile() {
  const apiUrl = "http://localhost:8000";
  const storedUserData = localStorage.getItem("user");
  let currentUsername = "";
  if (storedUserData) {
    const userData = JSON.parse(storedUserData);
    currentUsername = userData.username;
  }
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
    isMyProfile: "",
    yearOfBirth: 0,
    monthOfBirth: 0,
    dateOfBirth: 0,
    followers: [],
    following: [],
    incomingfollowRequests: [],
    sentfollowRequests: [],
  });

  const [currentUserProfileData, setCurrentUserProfileData] = useState({
    followers: [],
    following: [],
    incomingfollowRequests: [],
    sentfollowRequests: [],
  });
  const [message, setMessage] = useState("");
  const [buttonClickCount, setButtonClickCount] = useState(0);
  const [imageSrc, setImageSrc] = useState("/Images/profile-picture.png");
  const { userId: displayedProfileUsername } = useParams();

  const fetchUserProfileOfCurrentUser = async (userId) => {
    try {
      const response = await axios.get(
        `${apiUrl}/getUserProfile/${currentUsername}`
      );
      const responseData = response.data;
      setCurrentUserProfileData({
        followers: responseData.userProfileData.userInformation.followers,
        following: responseData.userProfileData.userInformation.following,
        incomingfollowRequests:
          responseData.userProfileData.userInformation.incomingfollowRequests,
        sentfollowRequests:
          responseData.userProfileData.userInformation.sentfollowRequests,
      });
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };
  const fetchUserProfileToDisplay = async (userId) => {
    try {
      const response = await axios.get(`${apiUrl}/getUserProfile/${userId}`);
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
        followers: responseData.userProfileData.userInformation.followers,
        following: responseData.userProfileData.userInformation.following,
        incomingfollowRequests:
          responseData.userProfileData.userInformation.incomingfollowRequests,
        sentfollowRequests:
          responseData.userProfileData.userInformation.sentfollowRequests,
        yearOfBirth:
          responseData.userProfileData.userInformation.yearOfBirth || 0,
        monthOfBirth:
          responseData.userProfileData.userInformation.monthOfBirth || 0,
        dateOfBirth:
          responseData.userProfileData.userInformation.dateOfBirth || 0,
        isMyProfile: currentUsername == userId,
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
        formData.append(
          "path",
          `friendsHub/${displayedProfileUsername}/profilePictures`
        );
        formData.append("username", displayedProfileUsername);

        const uploadApiUrl = `${apiUrl}/updateUserProfilePicture`;

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
    }
  };

  const handleEditImageClick = () => {
    fileInputRef.current.click();
  };

  const handleClick = () => {
    setButtonClickCount((prevCount) => prevCount + 1);
  };

  const sendFollowRequest = async () => {
    try {
      const response = await axios.put(`${apiUrl}/sendFollowRequest`, {
        currentUsername,
        usernameToSendFollowRequest: displayedProfileUsername,
      });
      setMessage(response.data.message);
      handleClick();
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  const cancelFollowRequest = async () => {
    try {
      const response = await axios.put(`${apiUrl}/cancelFollowRequest`, {
        currentUsername,
        usernameToCancelFollowRequest: displayedProfileUsername,
      });
      setMessage(response.data.message);
      handleClick();
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  const acceptFollowRequest = async () => {
    try {
      const response = await axios.put(`${apiUrl}/acceptFollowRequest`, {
        currentUsername,
        usernameToAcceptFollowRequest: displayedProfileUsername,
      });
      setMessage(response.data.message);
      handleClick();
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  const rejectFollowRequest = async () => {
    try {
      const response = await axios.put(`${apiUrl}/rejectFollowRequest`, {
        currentUsername,
        usernameToRejectFollowRequest: displayedProfileUsername,
      });
      setMessage(response.data.message);
      handleClick();
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  const unfollowExistingFollower = async () => {
    try {
      const response = await axios.put(`${apiUrl}/unfollowExistingFollower`, {
        currentUsername,
        usernameToUnfollow: displayedProfileUsername,
      });
      setMessage(response.data.message);
      handleClick();
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  useEffect(() => {
    fetchUserProfileToDisplay(displayedProfileUsername);
    fetchUserProfileOfCurrentUser(currentUsername);
  }, [buttonClickCount]);

  return (
    <>
      <div className="display-profile-container">
        <div className="display-profile-subcontainer">
          {!userProfileData.isMyProfile &&
            currentUserProfileData.incomingfollowRequests.includes(
              displayedProfileUsername
            ) && (
              <div className="followRequestContainer">
                <p>
                  <FontAwesomeIcon
                    icon={faUserPlus}
                    size="s"
                    style={{ color: "#212529" }}
                  />
                  &nbsp;
                  <strong>{displayedProfileUsername}</strong> wants to follow
                  you
                </p>
                <button
                  className="btn btn-outline-primary"
                  onClick={acceptFollowRequest}
                >
                  Accept
                </button>
                <button
                  className="btn btn-outline-dark"
                  onClick={rejectFollowRequest}
                >
                  Reject
                </button>
              </div>
            )}
          <div className="profile-header">
            <div className="profile-picture-container">
              <img
                className="profile-picture"
                src={imageSrc}
                alt="Profile Picture"
              />
            </div>
            {userProfileData.isMyProfile && (
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
            )}
            <span className="fullName">
              {userProfileData.firstName} {userProfileData.lastName}
            </span>
            <p>{userProfileData.emailAddress}</p>
            {!userProfileData.isMyProfile && (
              <div>
                {!currentUserProfileData.following.includes(
                  displayedProfileUsername
                ) &&
                  !currentUserProfileData.sentfollowRequests.includes(
                    displayedProfileUsername
                  ) && (
                    <button
                      className="btn btn-primary"
                      onClick={sendFollowRequest}
                    >
                      Follow
                    </button>
                  )}
                {currentUserProfileData.following.includes(
                  displayedProfileUsername
                ) && (
                  <>
                    <p className="btn">Following</p>
                    <button
                      className="btn btn-primary"
                      onClick={unfollowExistingFollower}
                    >
                      Unfollow
                    </button>
                  </>
                )}
                {currentUserProfileData.sentfollowRequests.includes(
                  displayedProfileUsername
                ) && (
                  <button
                    className="btn btn-primary"
                    onClick={cancelFollowRequest}
                  >
                    Cancel Request
                  </button>
                )}
              </div>
            )}
          </div>
          <div className="display-userdetails-container">
            <div>
              <div className="table-container">
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Username:</strong>
                      </td>
                      <td className="data">
                        {userProfileData.username
                          ? userProfileData.username
                          : "--"}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Email Address:</strong>
                      </td>
                      <td className="data">
                        {userProfileData.emailAddress
                          ? userProfileData.emailAddress
                          : "--"}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Nick Name:</strong>
                      </td>
                      <td className="data">
                        {userProfileData.nickName
                          ? userProfileData.nickName
                          : "--"}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Bio:</strong>
                      </td>
                      <td className="data">
                        {userProfileData.bio ? userProfileData.bio : "--"}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Job Role:</strong>
                      </td>
                      <td className="data">
                        {userProfileData.jobRole
                          ? userProfileData.jobRole
                          : "--"}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Workplace:</strong>
                      </td>
                      <td className="data">
                        {userProfileData.workplace
                          ? userProfileData.workplace
                          : "--"}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Education:</strong>
                      </td>
                      <td className="data">
                        {userProfileData.education
                          ? userProfileData.education
                          : "--"}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>College:</strong>
                      </td>
                      <td className="data">
                        {userProfileData.college
                          ? userProfileData.college
                          : "--"}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>School:</strong>
                      </td>
                      <td className="data">
                        {userProfileData.school ? userProfileData.school : "--"}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Home Town:</strong>
                      </td>
                      <td className="data">
                        {userProfileData.homeTown
                          ? userProfileData.homeTown
                          : "--"}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Current City:</strong>
                      </td>
                      <td className="data">
                        {userProfileData.currentCity
                          ? userProfileData.currentCity
                          : "--"}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Relationship Status:</strong>
                      </td>
                      <td className="data">
                        {userProfileData.relationshipStatus
                          ? userProfileData.relationshipStatus
                          : "--"}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Mobile Number:</strong>
                      </td>
                      <td className="data">
                        {userProfileData.mobileNumber
                          ? userProfileData.mobileNumber
                          : "--"}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Gender:</strong>
                      </td>
                      <td className="data">
                        {userProfileData.gender ? userProfileData.gender : "--"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {userProfileData.isMyProfile && (
            <Link
              to={`/updateUserProfile/${displayedProfileUsername}`}
              className="nav-link"
            >
              <button className="btn btn-primary" type="submit">
                Update Profile
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
