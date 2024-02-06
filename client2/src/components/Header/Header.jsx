import React from "react";
import "./Header.css";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const userId = "jane.doe";
  return (
    <header class="header overflow-hidden">
      <nav class="navbar fixed-top navbar-expand-lg">
        <div class="container">
          <Link to="#" className="navbar-brand fs-4">
            <img src="Icons/Logo.png" alt="LOGO" />
          </Link>
          <button
            class="navbar-toggler shadow-none "
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="sidebar offcanvas offcanvas-end"
            tabindex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div class="offcanvas-header text-black border-bottom">
              <Link
                to="#"
                className="offcanvas-title"
                id="offcanvasNavbarLabel"
              >
                <img src="Icons/Logo.png" alt="LOGO" />
              </Link>

              <button
                type="button"
                class="btn-close shadow-none"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div class="offcanvas-body d-flex flex-column flex-lg-row p-4 p-lg-0">
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
                <li className="d-flex nav-item mix-2">
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
                </li>
              </ul>
              <div class="log d-flex flex-column flex-lg-row justify-content-center align-item-center p-3 gap-3">
                <NavLink
                  to="#login"
                  activeClassName="active"
                  className="nav-link"
                >
                  Login
                </NavLink>

                <NavLink
                  to="#signup"
                  activeClassName="active"
                  className="Signup text-decoration-none"
                >
                  Sign Up
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
