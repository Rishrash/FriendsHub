import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PostDetail.css";

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:8000/getPost/${postId}`);
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="post-detail">
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
            <h4>{`${post.user.firstName} ${post.user.lastName}`}</h4>
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
      </div>
    </div>
  );
};

// Reuse the calculateTimeDifference function from DisplayPost
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

export default PostDetail;
