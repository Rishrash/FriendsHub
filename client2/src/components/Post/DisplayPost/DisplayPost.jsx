import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./DisplayPost.css";

const DisplayPost = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:8000/getPosts");
        const data = await response.json();
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
          <Link to={`/postDetail/${post._id}`} className="post-link">
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
              <div className="actions" style={{flexDirection:"row"}}>
                <div className="action-btn">
                  <i className="fas fa-thumbs-up"></i> Like
                </div>
                <div className="action-btn">
                  <i className="fas fa-comment"></i> Comment
                </div>
                <div className="action-btn">
                   <i class="fa-solid fa-circle-exclamation"></i> Report
                </div>
              </div>
            </div>
          </Link>
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

export default DisplayPost;
