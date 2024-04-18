import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUser,
  faUserFriends,
  faComment,
  faBell,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";
import Search from "../Search/Search";
import { useEffect, useState } from "react";
// localStorage.setItem("theme","dark");
if (!localStorage.getItem("theme")) {
  localStorage.setItem("theme", "dark");
}

export default function Header() {
  const [icon, setIcon] = useState(null);

  // important do not delete
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setIcon(faMoon);
      import("./headerdark.css");
    } else {
      setIcon(faSun);
      import("./header.css");
    }
  }, []);

  const { user } = useAuthContext();
  const { logout } = useLogout();
  const storedUserData = localStorage.getItem("user");
  let username = "";
  let role = "";
  if (storedUserData) {
    const userData = JSON.parse(storedUserData);
    // Parse the JSON string back into a JavaScript object
    // Access individual properties

    username = userData.username;
    role = userData.role;
  }
  const handleClick = () => {
    logout();
  };
  const handleChat = () => {
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      const chatlink = "http://localhost:3000/login/" + userData.token;
      window.open(chatlink, "_blank");
    }
  };

  //to change theme
  const changeTheme = () => {
    if (localStorage.getItem("theme") == "dark") {
      setIcon(faSun);
      localStorage.setItem("theme", "light");
    } else {
      setIcon(faMoon);
      localStorage.setItem("theme", "dark");
    }
    window.location.reload();
  };
  return (
    <header className="header overflow-hidden">
      <nav className="navbar fixed-top navbar-expand-lg">
        <div className="container">
          <Link to="#" className="navbar-brand fs-4">
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
              {user && role == "user" && (
                <>
                  <div className="d-flex nav-item mix-2 search-container">
                    <Search />
                  </div>

                  <ul className="navbar-nav justify-content-center align-item-center flex-grow-1 pe-3">
                    <li className="d-flex nav-item mix-2">
                      <Link
                        to={`/displayUserProfile/${username}`}
                        className="nav-link"
                      >
                        <FontAwesomeIcon
                          className="icon"
                          icon={faUser}
                          size="xl"
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
                          className="icon"
                          icon={faHouse}
                          size="xl"
                        />
                      </Link>
                    </li>
                    <li className="d-flex nav-item">
                      <Link
                        to={`/displayFriendRequest/${username}`}
                        className="nav-link"
                      >
                        <FontAwesomeIcon
                          className="icon"
                          icon={faUserFriends}
                          size="xl"
                        />
                      </Link>
                    </li>
                    <li className="d-flex nav-item mix-2">
                      <a className="nav-link" onClick={handleChat}>
                        <FontAwesomeIcon
                          className="icon"
                          icon={faComment}
                          size="xl"
                        />
                      </a>
                    </li>
                    <li className="d-flex nav-item mix-2">
                      <Link to="/" className="nav-link">
                        <FontAwesomeIcon
                          className="icon"
                          icon={faBell}
                          size="xl"
                        />
                      </Link>
                    </li>
                  </ul>
                </>
              )}
              {user && role == "admin" && (
                <ul className="navbar-nav justify-content-start align-item-center flex-grow-1 pe-3">
                  <li className="d-flex nav-item align-self-end">
                    <Link to="/admin/manageUser" className="nav-link">
                      Manage User
                    </Link>
                  </li>
                  <li className="d-flex nav-item align-self-end">
                    <Link to="/admin/managePost" className="nav-link">
                      Manage Post
                    </Link>
                  </li>
                </ul>
              )}
              {!user && (
                <ul className="navbar-nav justify-content-center align-item-center flex-grow-1 pe-3"></ul>
              )}
              <div className="auth">
                {user && (
                  <div>
                    <button
                      onClick={changeTheme}
                      style={{ backgroundColor: "inherit", border: 0 }}
                    >
                      <FontAwesomeIcon className="icon" icon={icon} size="xl" />
                    </button>
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
                    <button
                      onClick={changeTheme}
                      style={{ backgroundColor: "inherit", border: 0 }}
                    >
                      <FontAwesomeIcon className="icon" icon={icon} size="xl" />
                    </button>
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
