import React, { useEffect } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import CreatePost from "../Post/CreatePost/CreatePost";
import DisplayPost from "../Post/DisplayPost/DisplayPost";

export default function Home() {
  const storedUserData = localStorage.getItem("user");
  let username = "";
  if (storedUserData) {
    const userData = JSON.parse(storedUserData);
    username = userData.username;
  }
  const navigateTo = useNavigate();
  useEffect(() => {
    if (!storedUserData) {
      navigateTo("/login");
    }
  }, []);

  return (
    <>
      <main>
        <CreatePost />
        <DisplayPost />
      </main>
    </>
  );
}
