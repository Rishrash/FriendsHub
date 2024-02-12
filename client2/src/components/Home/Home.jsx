import React from "react";
import "./Home.css";

export default function Home() {
  return (
    <>
      <main>
        <div className="card">
          <div className="card-header">
            <img
              className="avatar"
              src="https://placekitten.com/40/40"
              alt="User Avatar"
            />
            <div className="user-info">
              <h4>John Doe</h4>
              <p>Posted 2 hours ago</p>
            </div>
          </div>
          <div className="post-content">
            <p>This is the content of the post. It can be as long as needed.</p>
            <img
              className="post-image"
              src="https://placekitten.com/400/200"
              alt="Post Image"
            />
          </div>
          <div className="actions">
            <div className="action-btn">
              <i className="fas fa-thumbs-up"></i> Like
            </div>
            <div className="action-btn">
              <i className="fas fa-comment"></i> Comment
            </div>
            <div className="action-btn">
              <i className="fas fa-share"></i> Share
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <img
              className="avatar"
              src="https://placekitten.com/40/40"
              alt="User Avatar"
            />
            <div className="user-info">
              <h4>John Doe</h4>
              <p>Posted 2 hours ago</p>
            </div>
          </div>
          <div className="post-content">
            <p>This is the content of the post. It can be as long as needed.</p>
            <img
              className="post-image"
              src="https://placekitten.com/400/200"
              alt="Post Image"
            />
          </div>
          <div className="actions">
            <div className="action-btn">
              <i className="fas fa-thumbs-up"></i> Like
            </div>
            <div className="action-btn">
              <i className="fas fa-comment"></i> Comment
            </div>
            <div className="action-btn">
              <i className="fas fa-share"></i> Share
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <img
              className="avatar"
              src="https://placekitten.com/40/40"
              alt="User Avatar"
            />
            <div className="user-info">
              <h4>John Doe</h4>
              <p>Posted 2 hours ago</p>
            </div>
          </div>
          <div className="post-content">
            <p>This is the content of the post. It can be as long as needed.</p>
            <img
              className="post-image"
              src="https://placekitten.com/400/200"
              alt="Post Image"
            />
          </div>
          <div className="actions">
            <div className="action-btn">
              <i className="fas fa-thumbs-up"></i> Like
            </div>
            <div className="action-btn">
              <i className="fas fa-comment"></i> Comment
            </div>
            <div className="action-btn">
              <i className="fas fa-share"></i> Share
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
