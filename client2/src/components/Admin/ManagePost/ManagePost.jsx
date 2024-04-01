import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ManagePost.css";
import AdminService from "../AdminService.js";

const ManagePost = () => {
  const apiUrl = "http://localhost:8000";
  const [posts, setPosts] = useState([]);

  const blockPost = async (postId) => {
    try {
      await AdminService.blockPostById(postId);
      console.log("Post blocked successfully!");
    } catch (error) {
      console.error("Error blocking post:", error);
    }
  };

  const deletePost = async (postId) => {
    try {
      await AdminService.deletePostById(postId);
      console.log("Post deleted successfully!");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const removeReportsFromPost = async (postId) => {
    try {
      await AdminService.deleteReportsFromPost(postId);
      console.log("Reports removed from post successfully!");
    } catch (error) {
      console.error("Error deleting reports from post:", error);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/admin/getReportedPosts`
        );
        const data = await response.data;
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div key={post._id}>
          <div className="card">
            <div className="card-header">
              <img
                className="avatar"
                src={
                  post.user && post.user.profilePicture
                    ? post.user.profilePicture
                    : "https://placekitten.com/40/40"
                }
                alt="User Avatar"
              />
              <div className="user-info">
                <Link
                  to={`/displayUserProfile/${post.user.username}`}
                  className="nav-link"
                >
                  <h4>{`${post.user.firstName} ${post.user.lastName}`}</h4>
                </Link>
                <p>Posted {calculateTimeDifference(post.createdAt)} ago</p>
              </div>
            </div>
            <div className="post-content">
              <p>{post.textDescription}</p>
              {post.images && post.images.length > 0 && (
                <img
                  className="post-image"
                  src={post.images[0].url}
                  alt="Post Image"
                />
              )}
            </div>
            <div>
              {post.reports && post.reports.length > 0 && (
                <div className="reports-section">
                  {post.reports.map((report, index) => (
                    <div key={index} className="report card">
                      <div className="card-header">
                        <div>
                          <img
                            className="avatar"
                            src={
                              report.reportBy && report.reportBy.profilePicture
                                ? report.reportBy.profilePicture
                                : "https://placekitten.com/40/40"
                            }
                            alt="User Avatar"
                          />

                          <p>
                            <strong>
                              {report.reportBy.firstName}{" "}
                              {report.reportBy.lastName}
                            </strong>
                          </p>
                          <p>
                            Reported {calculateTimeDifference(report.reportAt)}{" "}
                            ago
                          </p>
                        </div>
                        <div className="reportComment">
                          <p>
                            <strong>Comment:</strong> {report.reportComment}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="actions">
              <div className="action-btn">
                <button
                  className="btn btn-outline-dark"
                  onClick={() => blockPost(post._id)}
                >
                  Block
                </button>
              </div>
              <div className="action-btn">
                <button
                  className="btn btn-outline-dark"
                  onClick={() => deletePost(post._id)}
                >
                  Delete
                </button>
              </div>
              <div className="action-btn">
                <button
                  className="btn btn-outline-primary"
                  onClick={() => removeReportsFromPost(post._id)}
                >
                  Remove Reports
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
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

export default ManagePost;
