import React, { useState } from "react";
import { Link } from "react-router-dom";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import "./NavBar.css";

export const NavBar = () => {
  let logout = () => {
    localStorage.removeItem("bt_token");
  };

  const [showNavBar, setShowNavBar] = useState(false);
  const toggleNavBar = () => setShowNavBar(!showNavBar);

  return (
    <>
      {showNavBar ? (
        <>
          <div className="navbar-collapse" onClick={() => toggleNavBar()}>
            <ArrowDropUpIcon />
          </div>
          <ul className="navbar">
            <li className="navbar__item">
              <Link to={"/my-recipes"}>My Recipes</Link>
            </li>
            <li className="navbar__item">
              <Link to={"/recipes"}>Browse Recipes</Link>
            </li>
            <li className="navbar__item">
              <Link to={"/recipes/new"}>Create a Recipe</Link>
            </li>
            <li className="navbar__item">
              <Link to={"/restaurants"}>Restaurants</Link>
            </li>
            <li className="navbar__item">
              <Link to={"/restaurants/favorites"}>Favorites</Link>
            </li>
            <li className="navbar__item">
              <Link to={"/about"}>About</Link>
            </li>
            {localStorage.getItem("bt_token") !== null ? (
              <li className="navbar__item">
                <Link
                  onClick={() => {
                    logout();
                  }}
                  to={"/"}
                >
                  Logout
                </Link>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}{" "}
          </ul>
        </>
      ) : (
        // If show navbar is false, display nothing. Tiny little header.
        <>
          <div className="navbar-expand" onClick={() => toggleNavBar()}>
            <ArrowDropDownIcon />
          </div>
        </>
      )}
      {/* END OF NAVBAR */}
    </>
  );
};
