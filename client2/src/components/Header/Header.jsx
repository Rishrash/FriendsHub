import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUser,
  faUserFriends,
  faComment,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";
import Search from "../Search/Search";

export default function Header() {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const storedUserData = localStorage.getItem("user");
  let username = "";
  if (storedUserData) {
    console.log("Inside");
    // Parse the JSON string back into a JavaScript object
    const userData = JSON.parse(storedUserData);

    // Access individual properties
    username = userData.username;
  }
  const handleClick = () => {
    logout();
  };
  return (
    <header className="header overflow-hidden">
      <nav className="navbar fixed-top navbar-expand-lg">
        <div className="container">
          <Link to="#" className="navbar-brand fs-4">
            {/* <img src="Icons/Logo.png" alt="LOGO" /> */}
            <div className="logo-container">
              <span className="logo-text">Friends</span>
              <span className="logo-text1">Hub</span>
            </div>
          </Link>
          <button
            className="navbar-toggler shadow-none "
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="sidebar offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header text-black border-bottom">
              <Link
                to="#"
                className="offcanvas-title"
                id="offcanvasNavbarLabel"
              >
                {/* <img src="Icons/Logo.png" alt="LOGO" /> */}
                <div className="logo-container">
                  <span className="logo-text">Friends</span>
                  <span className="logo-text1">Hub</span>
                </div>
              </Link>

              <button
                type="button"
                className="btn-close shadow-none"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body d-flex flex-column flex-lg-row p-4 p-lg-0">
              <div className="d-flex nav-item mix-2 search-container">
                <Search/>
              </div>
              {user && (
                <ul className="navbar-nav justify-content-center align-item-center flex-grow-1 pe-3">
                  <li className="d-flex nav-item mix-2">
                    <Link
                      to={`/displayUserProfile/${username}`}
                      className="nav-link"
                    >
                      <FontAwesomeIcon
                        icon={faUser}
                        size="xl"
                        style={{ color: "#212529" }}
                      />
                    </Link>
                  </li>
                  <li className="d-flex nav-item mix-2">
                    <Link
                      to="/"
                      className="nav-link active"
                      aria-current="page"
                    >
                      <FontAwesomeIcon
                        icon={faHouse}
                        size="xl"
                        style={{ color: "#212529" }}
                      />
                    </Link>
                  </li>
                  <li className="d-flex nav-item">
                    <Link to="/" className="nav-link">
                      <FontAwesomeIcon
                        icon={faUserFriends}
                        size="xl"
                        style={{ color: "#212529" }}
                      />
                    </Link>
                  </li>
                  <li className="d-flex nav-item mix-2">
                    <Link to="/" className="nav-link">
                      <FontAwesomeIcon
                        icon={faComment}
                        size="xl"
                        style={{ color: "#212529" }}
                      />
                    </Link>
                  </li>
                  <li className="d-flex nav-item mix-2">
                    <Link to="/" className="nav-link">
                      <FontAwesomeIcon
                        icon={faBell}
                        size="xl"
                        style={{ color: "#212529" }}
                      />
                    </Link>
                  </li>
                </ul>
              )}
              {!user && (
                <ul className="navbar-nav justify-content-center align-item-center flex-grow-1 pe-3">
                  <li className="d-flex nav-item mix-2"></li>
                  <li className="d-flex nav-item mix-2"></li>
                  <li className="d-flex nav-item"></li>
                  <li className="d-flex nav-item mix-2"></li>
                  <li className="d-flex nav-item mix-2"></li>
                </ul>
              )}
              <div className="auth">
                {user && (
                  <div>
                    <span>{user.email}</span>
                    <button
                      className="btn btn-logout btn-outline-primary"
                      onClick={handleClick}
                    >
                      Log out
                    </button>
                  </div>
                )}
                {!user && (
                  <>
                    <button className="btn btn-primary btn-login">
                      <Link className="link" to="/login">
                        Login
                      </Link>
                    </button>
                    <button className="btn btn-primary btn-signup">
                      <Link className="link" to="/signup">
                        Signup
                      </Link>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
