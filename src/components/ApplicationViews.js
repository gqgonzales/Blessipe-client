import React from "react";
import { Route } from "react-router-dom";
// COUNTRIES
import { CountryProvider } from "./countries/CountryProvider";
// CITIES
import { CityProvider } from "./cities/CityProvider";
// RESTAURANTS
import { RestaurantProvider } from "./restaurants/RestaurantProvider";
import { RestaurantList } from "./restaurants/RestaurantList";
import { FavoriteRestaurants } from "./restaurants/FavoriteRestaurants";
// RECIPES
import { RecipeProvider } from "./recipes/RecipeProvider";
import { RecipeList } from "./recipes/RecipeList.js";
import { MyRecipeList } from "./recipes/MyRecipeList";
import { RecipeForm } from "./recipes/RecipeForm";
import { RecipeDetail } from "./recipes/RecipeDetail";
import { MatchList } from "./recipes/MatchList";
// PROFILE
import { ProfileProvider } from "./profile/ProfileProvider";
// ABOUT
import { About } from "./about/About";

export const ApplicationViews = () => {
  return (
    <>
      <CountryProvider>
        <CityProvider>
          <ProfileProvider>
            <RestaurantProvider>
              <RecipeProvider>
                {/* --------------------------------------------- */}
                <Route exact path="/restaurants">
                  <RestaurantList />
                </Route>

                <Route exact path="/restaurants/favorites">
                  <FavoriteRestaurants />
                </Route>

                <Route exact path="/recipes">
                  <RecipeList />
                </Route>

                <Route exact path="/my-recipes">
                  <MyRecipeList />
                </Route>

                <Route exact path="/recipes/:recipe_id(\d+)/detail">
                  <RecipeDetail />
                </Route>

                <Route exact path="/recipes/new">
                  <RecipeForm />
                </Route>

                <Route path="/recipes/:recipe_id(\d+)/edit">
                  <RecipeForm />
                </Route>

                <Route exact path="/recipes/:recipe_id(\d+)/matches">
                  <MatchList />
                </Route>

                <Route exact path="/about">
                  <About />
                </Route>
                {/* --------------------------------------------- */}
              </RecipeProvider>
            </RestaurantProvider>
          </ProfileProvider>
        </CityProvider>
      </CountryProvider>
    </>
  );
};
