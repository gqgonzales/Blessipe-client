import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

export const NavBar = (props) => {
  let logout = () => {
    localStorage.removeItem("bt_token");
  };

  return (
    <>
      <header className="main-header">
        <div className="site-text">
          <h1 className="site-title">Blessipe</h1>
          <h2 className="site-subhead">The Online Food + Travel Journal</h2>
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
      </header>
    </>
  );
};
