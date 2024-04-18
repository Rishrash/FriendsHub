import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminService from "../AdminService.js";

const ManageUser = () => {
  useEffect(() => {
    const theme = localStorage.getItem("theme");

    if (theme === "dark") {
      import("./ManageUserdark.css");
    } else {
      import("./ManageUser.css");
    }
  }, []);

  const apiUrl = "https://friendshub-0y8a.onrender.com";
  const [reportedUsers, setReportedUsers] = useState([]);
  const [buttonClickCount, setButtonClickCount] = useState(0);

  const deleteReports = async (userId) => {
    try {
      await AdminService.deleteReportsFromUserAccount(userId);
      setButtonClickCount((prevCount) => prevCount + 1);
      console.log("Reports removed from post successfully!");
    } catch (error) {
      console.error("Error deleting reports from post:", error);
    }
  };

  const blockUser = async (userId) => {
    try {
      await AdminService.blockUserById(userId);
      setButtonClickCount((prevCount) => prevCount + 1);
      console.log("Post blocked successfully!");
    } catch (error) {
      console.error("Error blocking post:", error);
    }
  };

  useEffect(() => {
    const fetchReportedUsers = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/admin/getReportedUsers`
        );
        setReportedUsers(response.data);
      } catch (error) {
        console.error("Error fetching reported users:", error);
      }
    };
    fetchReportedUsers();
  }, [buttonClickCount]);

  return (
    <div>
      {reportedUsers.length === 0 ? (
        <h2 className="manage-user-heading">No reported users found</h2>
      ) : (
        <>
          <h2 className="manage-user-heading">Reported Users</h2>
          <div className="reported-users-container">
            {reportedUsers.map((user) => (
              <div key={user._id} className="user-card">
                <img
                  src={user.profilePicture}
                  alt="Profile"
                  className="profile-picture"
                />
                <div className="user-details">
                  <h2>{`${user.firstName} ${user.lastName}`}</h2>
                  <p>{`Email: ${user.emailAddress}`}</p>
                  <p>{`Username: @${user.username}`}</p>
                  <h5>Reports:</h5>
                  <div className="reports-list">
                    {user.userInformation.reports.map((report, index) => (
                      <div key={index} className="report">
                        <img
                          src={report.reportBy.profilePicture}
                          alt="Reporter"
                          className="reporter-picture"
                        />
                        <div className="report-details">
                          <p>{`${report.reportBy.firstName} ${report.reportBy.lastName}`}</p>
                          <p>
                            Reported {calculateTimeDifference(report.reportAt)}{" "}
                            ago
                          </p>
                          <p>{`Comment: ${report.reportComment}`}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="actions">
                  <div className="action-btn">
                    <button
                      className="btn btn-outline-dark"
                      onClick={() => blockUser(user._id)}
                    >
                      Block
                    </button>
                  </div>
                  <div className="action-btn">
                    <button
                      className="btn-delete-reports btn btn-outline-dark"
                      onClick={() => deleteReports(user._id)}
                    >
                      Delete Reports
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Helper function to calculate time difference
const calculateTimeDifference = (createdAt) => {
  const now = new Date();
  const postDate = new Date(createdAt);
  const timeDifferenceInMilliseconds = now - postDate;

  // Calculate time difference in hours
  const timeDifferenceInHours = timeDifferenceInMilliseconds / (1000 * 60 * 60);

  if (timeDifferenceInHours < 1) {
    return `Less than 1 hour`;
  } else if (timeDifferenceInHours < 24) {
    // Less than 1 day, return hours
    const roundedHours = Math.round(timeDifferenceInHours);
    return `${roundedHours} ${roundedHours === 1 ? "hour" : "hours"}`;
  } else {
    // More than 1 day, return days
    const timeDifferenceInDays = Math.floor(timeDifferenceInHours / 24);
    return `${timeDifferenceInDays} ${
      timeDifferenceInDays === 1 ? "day" : "days"
    }`;
  }
};

export default ManageUser;
