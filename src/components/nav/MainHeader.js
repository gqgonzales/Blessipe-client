import React from "react";
import { NavBar } from "./NavBar";
import "./NavBar.css";

export const MainHeader = () => {
  return (
    <>
      <header className="main-header">
        <div className="site-text">
          <h1 className="site-title">Blessipe</h1>
          <h2 className="site-subhead">The Online Food + Travel Journal</h2>
        </div>
        <NavBar />
      </header>
    </>
  );
};
