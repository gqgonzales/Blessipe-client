import React, { useContext, useEffect, useState } from "react";
import { RecipeContext } from "../recipes/RecipeProvider.js";

export const MatchList = ({ recipe }) => {
  const { id } = recipe;
  const { findLocalRestaurants } = useContext(RecipeContext);

  const [matchedRestaurants, setMatchedRestaurants] = useState([]);

  const [showMatches, setShowMatches] = useState(false);
  const toggleDetails = () => setShowMatches(!showMatches);

  useEffect(() => {
    findLocalRestaurants(id).then(setMatchedRestaurants);
    // GET FILTERED RESTAURANTS SOMEHOW???
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {showMatches ? (
        <>
          <header className="restaurants__header">
            <h2>See Restaurant Matches</h2>
          </header>
          <button
            className="button toggle-button"
            onClick={() => {
              toggleDetails();
            }}
          >
            Hide Matches
          </button>
          <article className="matchedRestaurants">
            {matchedRestaurants.map((restaurant) => {
              return (
                <div
                  key={`restaurant--${restaurant.id}`}
                  className="restaurant"
                >
                  <h3 className="restaurant__name">{restaurant.name} </h3>
                  <h4>
                    {/* INVESTIGATE WHY RESTAURANT DATA IS GONE */}
                    in {restaurant.city.name}, {restaurant.city.country.name}
                  </h4>
                  <div>{restaurant.address}</div>
                  <a href={restaurant.url}>{restaurant.url}</a>
                  {/* ---------------------------- */}
                  <br></br>
                  <div className="restaurant-keywords">
                    Keywords:{" "}
                    {restaurant.keywords?.map((keyword) => (
                      <div key={`keyword-id-${keyword.id}`}>
                        – {keyword.word}
                      </div>
                    ))}
                  </div>
                  {/* ---------------------------- */}
                </div>
              );
            })}
          </article>{" "}
        </>
      ) : (
        <button
          className="button toggle-button"
          onClick={() => {
            toggleDetails();
          }}
        >
          Find Matches
        </button>
      )}
    </>
  );
};
