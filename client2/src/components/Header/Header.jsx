import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

export default function Header() {
  const userId = "jane.doe";
  return (
    <header className="header overflow-hidden">
      <nav className="navbar fixed-top navbar-expand-lg">
        <div className="container">
          <Link to="#" className="navbar-brand fs-4">
            <img src="Icons/Logo.png" alt="LOGO" />
          </Link>
          <div className="d-flex nav-item mix-2 search-container">
            <form className="search d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
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
                <img src="Icons/Logo.png" alt="LOGO" />
              </Link>

              <button
                type="button"
                className="btn-close shadow-none"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body d-flex flex-column flex-lg-row p-4 p-lg-0">
              <ul className="navbar-nav justify-content-center align-item-center flex-grow-1 pe-3">
                <li className="d-flex nav-item mix-2">
                  <Link
                    to={`/userProfile/${userId}`}
                    className="nav-link"
                    onClick={() => setToLocalStorage({ userName })}
                  >
                    <img src="Icons/Profile.png" alt="Profile" />
                  </Link>
                </li>
                <li className="d-flex nav-item mix-2">
                  <Link to="/" className="nav-link active" aria-current="page">
                    <img src="Icons/Home.png" alt="Home" />
                  </Link>
                </li>
                <li className="d-flex nav-item">
                  <Link to="/friend-request" className="nav-link">
                    <img src="Icons/Friend_request.png" alt="Friend Request" />
                  </Link>
                </li>
                <li className="d-flex nav-item mix-2">
                  <Link to="/chat" className="nav-link">
                    <img src="Icons/Chat.png" alt="Chat" />
                  </Link>
                </li>
                <li className="d-flex nav-item mix-2">
                  <Link to="/notifications" className="nav-link">
                    <img src="Icons/Notification.png" alt="Notification" />
                  </Link>
                </li>
              </ul>
              <div className="log d-flex flex-column flex-lg-row justify-content-center align-item-center p-3 gap-3">
                <Link to="/login" className="btn-login">
                  Login
                </Link>

                <Link to="/signup" className="btn-signup">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
