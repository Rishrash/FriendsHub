import React, { useEffect, useState } from "react";
import "./FollowerAndFollowingList.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function FollowerAndFollowingList() {
  const apiUrl = import.meta.env.VITE_API_HOST;
  const [userProfiles, setUserProfiles] = useState([]);
  const { userId, listType } = useParams();
  useEffect(() => {
    async function fetchUserProfiles() {
      const response = await fetch(
        `${apiUrl}/getFollowersOrFollowingUserProfiles/${userId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ listType }),
        }
      );
      const data = await response.json();
      setUserProfiles(data.userProfileData);
    }

    fetchUserProfiles();
  }, []);

  return (
    <>
      <h2>
        {userId}'s {listType}s
      </h2>
      <div className="profile-container">
        {userProfiles.map((user) => (
          <div key={user._id} className="profile-card">
            <Link
              to={`/displayUserProfile/${user.username}`}
              className="nav-link display-profile"
            >
              <img
                src={user.profilePicture}
                alt={user.firstName}
                className="profile-avatar"
              />
              <div className="profile-info">
                <h3>
                  {user.firstName} {user.lastName}
                </h3>
                <p>@{user.username}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default FollowerAndFollowingList;
