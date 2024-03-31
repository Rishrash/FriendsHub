import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./DisplayFriendRequest.css";

const DisplayFriendRequest = () => {
  const apiUrl = "http://localhost:8000";
  const { userId } = useParams();
  const [userProfiles, setUserProfiles] = useState([]);
  const [message, setMessage] = useState("");
  const [buttonClickCount, setButtonClickCount] = useState(0);
  const storedUserData = localStorage.getItem("user");
  let currentUsername = userId;
  // if (storedUserData) {
  //   const userData = JSON.parse(storedUserData);
  //   currentUsername = userData.username;
  // }

  const handleClick = () => {
    setButtonClickCount((prevCount) => prevCount + 1);
  };

  const acceptFollowRequest = async (username) => {
    try {
      const response = await axios.put(`${apiUrl}/acceptFollowRequest`, {
        currentUsername,
        usernameToAcceptFollowRequest: username,
      });
      setMessage(response.data.message);
      handleClick();
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  const rejectFollowRequest = async (username) => {
    try {
      const response = await axios.put(`${apiUrl}/rejectFollowRequest`, {
        currentUsername,
        usernameToRejectFollowRequest: username,
      });
      setMessage(response.data.message);
      handleClick();
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  useEffect(() => {
    // Fetch user profiles from the API
    const fetchUserProfiles = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/getUserProfilesForIncommingFollowRequest/${currentUsername}`
        );
        setUserProfiles(response.data);
      } catch (error) {
        console.error("Error fetching user profiles:", error);
      }
    };

    fetchUserProfiles();
  }, [buttonClickCount]);

  return (
    <>
      {userProfiles.length > 0 ? (
        <h2 className="friend-request-heading">Follow Requests</h2>
      ) : (
        <h2 className="friend-request-heading">No Follow Request </h2>
      )}
      <div className="user-profiles-list">
        {userProfiles.map((user) => (
          <div key={user._id} className="user-profile-card">
            <img
              src={user.profilePicture}
              alt="Profile"
              className="profile-picture"
            />
            <div className="profile-details">
              <h2>{`${user.firstName} ${user.lastName}`}</h2>
              <p>{`@${user.username}`}</p>
            </div>
            <div className="profile-actions">
              <button
                className="btn btn-outline-primary"
                onClick={() => acceptFollowRequest(user.username)}
              >
                Accept
              </button>
              <button
                className="btn btn-outline-dark"
                onClick={() => rejectFollowRequest(user.username)}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DisplayFriendRequest;
