import React from "react";
import { Route } from "react-router-dom";
// COUNTRIES
import { CountryProvider } from "./countries/CountryProvider";
// CITIES
import { CityProvider } from "./cities/CityProvider";
// RESTAURANTS
import { RestaurantList } from "./restaurants/RestaurantList";
import { RestaurantProvider } from "./restaurants/RestaurantProvider";

export const ApplicationViews = () => {
  return (
    <>
      <CountryProvider>
        <CityProvider>
          <RestaurantProvider>
            <Route exact path="/restaurants">
              <RestaurantList />
            </Route>
          </RestaurantProvider>
        </CityProvider>
      </CountryProvider>
    </>
  );
};
