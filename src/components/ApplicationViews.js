import React from "react";
import { Route } from "react-router-dom";
// COUNTRIES
import { CountryProvider } from "./countries/CountryProvider";
// CITIES
import { CityProvider } from "./cities/CityProvider";
// RESTAURANTS
import { RestaurantProvider } from "./restaurants/RestaurantProvider";
import { RestaurantList } from "./restaurants/RestaurantList";
// RECIPES
import { RecipeProvider } from "./recipes/RecipeProvider";
import { RecipeList } from "./recipes/RecipeList.js";

export const ApplicationViews = () => {
  return (
    <>
      <CountryProvider>
        <CityProvider>
          <RestaurantProvider>
            <RecipeProvider>
              <Route exact path="/restaurants">
                <RestaurantList />
              </Route>

              <Route exact path="/recipes">
                <RecipeList />
              </Route>
            </RecipeProvider>
          </RestaurantProvider>
        </CityProvider>
      </CountryProvider>
    </>
  );
};
