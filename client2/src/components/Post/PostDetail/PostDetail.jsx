import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./PostDetail.css";

const PostDetail = () => {
  const apiUrl = import.meta.env.VITE_API_HOST;
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [userId, setUserId] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [buttonClickCount, setButtonClickCount] = useState(0);
  const storedUserData = localStorage.getItem("user");
  let userData;
  if (storedUserData) {
    // Parse the JSON string back into a JavaScript object
    userData = JSON.parse(storedUserData);
  }
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${apiUrl}/getPost/${postId}`);
        const data = await response.json();
        setPost(data);
        setUserId(userData.userId);
        setComments(data.comments);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId, commentText, buttonClickCount]);

  const handleLikeClick = async (userId, postId) => {
    try {
      const response = await axios.put(`${apiUrl}/likePost`, {
        userId,
        postId,
      });
      setButtonClickCount((prevCount) => prevCount + 1);
      console.log(response.data.message);
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };

  const handleReportClick = async (userId, postId) => {
    try {
      const response = await axios.put(`${apiUrl}/reportPost`, {
        reportComment: "Reported",
        userId,
        postId,
      });
      console.log(response.data.message);
    } catch (error) {
      console.error("Error Reporting the post:", error);
    }
  };

  const handleCommentPost = async (userId, postId) => {
    try {
      const response = await axios.put(`${apiUrl}/commentPost`, {
        postComment: commentText,
        userId,
        postId,
      });
      setCommentText("");
      console.log(response.data.message);
    } catch (error) {
      console.error("Error commenting the post: ", error);
    }
  };

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
        <div className="like-comment-count">
          <div>Likes {post.likes.length}</div>
          <div>Comments {post.comments.length}</div>
        </div>
        <div>
          <div className="post-like-report">
            <div>
              <button
                className="btn"
                onClick={() => handleLikeClick(userId, post._id)}
              >
                <i className="fas fa-thumbs-up"></i> Like
              </button>
            </div>
            <div>
              <button
                className="btn"
                onClick={() => handleReportClick(userId, post._id)}
              >
                <i class="fa-solid fa-circle-exclamation"></i>
                Report
              </button>
            </div>
          </div>
          <div className="post-comment">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
            />

            <button
              className="btn"
              onClick={() => handleCommentPost(userId, post._id)}
            >
              <i className="fas fa-comment"></i>
            </button>
          </div>
        </div>

        <div className="comments">
          {comments.length == 0 ? (
            <h4>No Comments</h4>
          ) : (
            <>
              <h6>
                <strong>Comments:</strong>
              </h6>
              {comments.map((comment) => (
                <div key={comment._id} className="comment">
                  <img
                    className="avatar"
                    src={
                      comment.commentBy && comment.commentBy.profilePicture
                        ? comment.commentBy.profilePicture
                        : "https://placekitten.com/40/40"
                    }
                    alt="User Avatar"
                  />
                  <div className="comment-detail">
                    <p className="commentBy">
                      <strong>
                        {" "}
                        {comment.commentBy.firstName}{" "}
                        {comment.commentBy.lastName}
                      </strong>
                    </p>
                    <p className="comment-content">{comment.comment}</p>
                  </div>
                </div>
              ))}
            </>
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
