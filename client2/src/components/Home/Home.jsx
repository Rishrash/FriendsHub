import React from "react";
import "./Home.css";

export default function Home() {
  return (
    <>
      <main>
        <div class="card">
          <div class="card-header">
            <img
              class="avatar"
              src="https://placekitten.com/40/40"
              alt="User Avatar"
            />
            <div class="user-info">
              <h4>John Doe</h4>
              <p>Posted 2 hours ago</p>
            </div>
          </div>
          <div class="post-content">
            <p>This is the content of the post. It can be as long as needed.</p>
            <img
              class="post-image"
              src="https://placekitten.com/400/200"
              alt="Post Image"
            />
          </div>
          <div class="actions">
            <div class="action-btn">
              <i class="fas fa-thumbs-up"></i> Like
            </div>
            <div class="action-btn">
              <i class="fas fa-comment"></i> Comment
            </div>
            <div class="action-btn">
              <i class="fas fa-share"></i> Share
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <img
              class="avatar"
              src="https://placekitten.com/40/40"
              alt="User Avatar"
            />
            <div class="user-info">
              <h4>John Doe</h4>
              <p>Posted 2 hours ago</p>
            </div>
          </div>
          <div class="post-content">
            <p>This is the content of the post. It can be as long as needed.</p>
            <img
              class="post-image"
              src="https://placekitten.com/400/200"
              alt="Post Image"
            />
          </div>
          <div class="actions">
            <div class="action-btn">
              <i class="fas fa-thumbs-up"></i> Like
            </div>
            <div class="action-btn">
              <i class="fas fa-comment"></i> Comment
            </div>
            <div class="action-btn">
              <i class="fas fa-share"></i> Share
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <img
              class="avatar"
              src="https://placekitten.com/40/40"
              alt="User Avatar"
            />
            <div class="user-info">
              <h4>John Doe</h4>
              <p>Posted 2 hours ago</p>
            </div>
          </div>
          <div class="post-content">
            <p>This is the content of the post. It can be as long as needed.</p>
            <img
              class="post-image"
              src="https://placekitten.com/400/200"
              alt="Post Image"
            />
          </div>
          <div class="actions">
            <div class="action-btn">
              <i class="fas fa-thumbs-up"></i> Like
            </div>
            <div class="action-btn">
              <i class="fas fa-comment"></i> Comment
            </div>
            <div class="action-btn">
              <i class="fas fa-share"></i> Share
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
