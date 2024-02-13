import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

function App() {
  const navigateTo = useNavigate();
  useEffect(() => {
    // Navigate to the desired route on component mount
    navigate("/login");
  }, [navigate]);
  return <></>;
}

export default App;
