import React, { useEffect } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import CreatePost from "../Post/CreatePost/CreatePost";
import DisplayPost from "../Post/DisplayPost/DisplayPost";

export default function Home() {
  const storedUserData = localStorage.getItem("user");
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
