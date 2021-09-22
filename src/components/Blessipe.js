import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { NavBar } from "./nav/NavBar";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { CityProvider } from "./cities/CityProvider";
import { CountryProvider } from "./countries/CountryProvider";

export const Blessipe = () => (
  <>
    <Route
      render={() => {
        if (localStorage.getItem("bt_token")) {
          return (
            <>
              <Route render={NavBar} />
              <Route render={(props) => <ApplicationViews {...props} />} />
            </>
          );
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
    <CountryProvider>
      <CityProvider>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
      </CityProvider>
    </CountryProvider>
  </>
);
