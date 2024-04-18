import React, { useState, useEffect } from "react";
import axios from "axios";

const CreatePost = () => {
  useEffect(() => {
    const theme = localStorage.getItem("theme");

    if (theme === "dark") {
      import("./CreatePostdark.css");
    } else {
      import("./CreatePost.css");
    }
  }, []);

  const apiUrl = import.meta.env.VITE_API_HOST;
  const [textDescription, setTextDescription] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [selectedImageToPreview, setSelectedImageToPreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const storedUserData = localStorage.getItem("user");
  let userId = "";
  let username = "";
  if (storedUserData) {
    const userData = JSON.parse(storedUserData);
    userId = userData.userId;
    username = userData.username;
  }

  const handleImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImageToPreview(URL.createObjectURL(file));
      setSelectedImage(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedImageToPreview(URL.createObjectURL(file));
      setSelectedImage(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDeleteImage = () => {
    setSelectedImage(null);
    setSelectedImageToPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!textDescription.trim() && !selectedImage) {
      setErrorMessage("Please enter a text description and select an image.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("textDescription", textDescription);
      formData.append("visibility", visibility);
      formData.append("user", userId);
      formData.append("username", username);
      formData.append("image", selectedImage);

      const response = await axios.post(`${apiUrl}/createPost`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Post created successfully:", response.data);
      setErrorMessage("");
      window.location.reload();
    } catch (error) {
      console.error("Error creating post:", error);
      setErrorMessage("Some error encountered while creating the post.");
    }
  };

  //for managing the create post subcontainer toggle state in order to show the container
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [iconClass, setIconClass] = useState("create-post-item");

  const toggleCreatePost = () => {
    setShowCreatePost((prevState) => !prevState);
    console.log(showCreatePost);
    if (!showCreatePost) {
      setIconClass("create-post-item rotate-icon");
    } else {
      setIconClass("create-post-item");
    }
  };

  return (
    <div className="create-post-container">
      {showCreatePost && (
        <div className="create-post-subcontainer">
          <div className="post-container">
            <h2 className="post-heading">Create New Post</h2>
            <form className="create-post-form" onSubmit={handleSubmit}>
              {errorMessage && (
                <div className="error-message">{errorMessage}</div>
              )}
              <div>
                <label htmlFor="textDescription">Text Description:</label>
                <textarea
                  id="textDescription"
                  value={textDescription}
                  onChange={(e) => setTextDescription(e.target.value)}
                />
              </div>

              <div
                className="dropzone"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  style={{ display: "none" }}
                  id="fileInput"
                />
                <label htmlFor="fileInput">
                  <div className="drop-zone-text">
                    Drag &amp; Drop or Click to Select Image
                  </div>
                </label>
                {selectedImageToPreview && (
                  <div>
                    <img
                      src={selectedImageToPreview}
                      alt="Selected"
                      className="selected-image"
                    />
                    <p className="cross-icon">
                      <i
                        className="fa-solid fa-x"
                        onClick={handleDeleteImage}
                      ></i>
                    </p>
                  </div>
                )}
              </div>
              <div>
                <label htmlFor="visibility">Visibility:</label>
                <select
                  id="visibility"
                  value={visibility}
                  onChange={(e) => setVisibility(e.target.value)}
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="friends">Friends</option>
                </select>
              </div>
              <br />
              <br />
              <div className="btn-container">
                <button className="btn btn-primary" type="submit">
                  Create Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className={iconClass} onClick={toggleCreatePost}>
        <div className="add-post-icon">
          <i className="fa-solid fa-plus"></i>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
