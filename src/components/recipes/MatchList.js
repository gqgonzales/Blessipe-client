import React, { useContext, useEffect, useState } from "react";
import { RecipeContext } from "../recipes/RecipeProvider.js";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { RestaurantContext } from "../restaurants/RestaurantProvider.js";
import "../restaurants/Restaurant.css";

export const MatchList = ({ recipe }) => {
  const { id } = recipe;
  const { recipes, findLocalRestaurants } = useContext(RecipeContext);
  const { getRestaurants, favoriteThisRestaurant, unfavoriteThisRestaurant } =
    useContext(RestaurantContext);

  const [matchedRestaurants, setMatchedRestaurants] = useState([]);

  const [showMatches, setShowMatches] = useState(false);
  const toggleMatches = () => setShowMatches(!showMatches);

  useEffect(() => {
    findLocalRestaurants(id).then(setMatchedRestaurants);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    findLocalRestaurants(id).then(setMatchedRestaurants);
  }, [favoriteThisRestaurant, unfavoriteThisRestaurant, recipes]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {showMatches ? (
        // If the showMatches boolean equates to True, proceed to ternary evaluating the length of matchedRestaurants
        <>
          {matchedRestaurants.length > 0 ? (
            // If the length of the matchedRestaurants list has at least one hit, return the list using .map
            <>
              <button
                className="button toggle-button"
                onClick={() => {
                  toggleMatches();
                }}
              >
                Hide Matches
              </button>
              <header className="matches__header">
                <h2>Matching Restaurants Near You</h2>
              </header>
              <article className="matchedRestaurants">
                {matchedRestaurants.map((restaurant) => {
                  return (
                    <div
                      key={`restaurant--${restaurant.id}`}
                      className="match-card"
                    >
                      <h3 className="restaurant__name">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={restaurant.url}
                        >
                          {restaurant.name}
                        </a>
                      </h3>
                      <h4>
                        in {restaurant.city.name},{" "}
                        {restaurant.city.country.name}
                      </h4>
                      <div>{restaurant.address}</div>
                      <div>{restaurant.phone_number}</div>
                      {/* ---------------------------- */}
                      <br></br>
                      <div className="restaurant-keywords">
                        Keywords:{" "}
                        {restaurant.keywords
                          ?.map((keyword) => keyword.word)
                          .join(", ")}
                      </div>
                      {/* ---------------------------- */}
                      <div className="favorite-wrapper">
                        {restaurant.favorited ? (
                          <FavoriteIcon
                            className="favorite-heart-full"
                            onClick={() =>
                              unfavoriteThisRestaurant(restaurant.id)
                                .then(getRestaurants)
                                .then(findLocalRestaurants(id))
                            }
                          />
                        ) : (
                          <FavoriteBorderIcon
                            className="favorite-heart-outline"
                            onClick={() =>
                              favoriteThisRestaurant(restaurant.id)
                                .then(getRestaurants)
                                .then(findLocalRestaurants(id))
                            }
                          />
                        )}
                      </div>
                      {/* ---------------------------- */}
                    </div>
                  );
                })}
              </article>{" "}
            </>
          ) : (
            // If the length of the matchedRestaurants list is 0, there were no matches.
            <>
              <header className="restaurants__header">
                <h2>No current matches nearby 😔</h2>
              </header>
              <div>Try adding more keywords to the recipe!</div>
              <br></br>
              <button
                className="button toggle-button"
                onClick={() => {
                  toggleMatches();
                }}
              >
                Collapse
              </button>
            </>
          )}
        </>
      ) : (
        // If showMatches is false, display a button that flips the value to True.
        <>
          {/* <div className="button-group"> */}
          <button
            className="button toggle-button"
            onClick={() => {
              toggleMatches();
            }}
          >
            Find Matches
          </button>
          {/* </div> */}
        </>
      )}
    </>
  );
};
