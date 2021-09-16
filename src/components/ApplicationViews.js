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
import { MyRecipeList } from "./recipes/MyRecipeList";
import { RecipeForm } from "./recipes/RecipeForm";

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

              <Route exact path="/my-recipes">
                <MyRecipeList />
              </Route>

              <Route exact path="/new-recipe">
                <RecipeForm />
              </Route>
            </RecipeProvider>
          </RestaurantProvider>
        </CityProvider>
      </CountryProvider>
    </>
  );
};
