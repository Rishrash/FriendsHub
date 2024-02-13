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

export default function Header() {
  const { user } = useAuthContext();
  const userId = "jane.doe";
  const { logout } = useLogout();
  const storedUserData = localStorage.getItem("user");
  let emailAddress = "rishababbhi@gmail.com";
  if (storedUserData) {
    console.log("Inside");
    // Parse the JSON string back into a JavaScript object
    const userData = JSON.parse(storedUserData);

    // Now userData is an object containing your stored data
    console.log("User Data:", userData);
    // Access individual properties
    emailAddress = userData.emailAddress;

    console.log("Email Address:", emailAddress);
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
              <span className="logo-text">FriendsHub</span>
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
                  <span className="logo-text">FriendsHub</span>
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
                <form className="search d-flex" role="search">
                  <input
                    className="form-control me-2 col-sm"
                    type="search"
                    aria-label="Search"
                  />
                  <button className="btn btn-search btn-primary" type="submit">
                    Search
                  </button>
                </form>
              </div>
              <ul className="navbar-nav justify-content-center align-item-center flex-grow-1 pe-3">
                <li className="d-flex nav-item mix-2">
                  <Link
                    // to={`/userProfile/${userId}`}
                    to={`/displayUserProfile/${emailAddress}`}
                    className="nav-link"
                  >
                    {/* <img src="Icons/Profile.png" alt="Profile" /> */}
                    <FontAwesomeIcon
                      icon={faUser}
                      size="xl"
                      style={{ color: "#212529" }}
                    />
                  </Link>
                </li>
                <li className="d-flex nav-item mix-2">
                  <Link to="/" className="nav-link active" aria-current="page">
                    {/* <img src="Icons/Home.png" alt="Home" /> */}
                    <FontAwesomeIcon
                      icon={faHouse}
                      size="xl"
                      style={{ color: "#212529" }}
                    />
                  </Link>
                </li>
                <li className="d-flex nav-item">
                  <Link to="/" className="nav-link">
                    {/* <img src="Icons/Friend_request.png" alt="Friend Request" /> */}
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
                    {/* <img src="Icons/Notification.png" alt="Notification" /> */}
                    <FontAwesomeIcon
                      icon={faBell}
                      size="xl"
                      style={{ color: "#212529" }}
                    />
                  </Link>
                </li>
              </ul>
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
