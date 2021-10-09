import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Restaurant.css";
import { RestaurantContext } from "./RestaurantProvider.js";
import { ProfileContext } from "../profile/ProfileProvider";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

export const RestaurantList = (props) => {
  const {
    restaurants,
    getRestaurants,
    closeRestaurant,
    favoriteThisRestaurant,
    unfavoriteThisRestaurant,
  } = useContext(RestaurantContext);
  const { profile, getProfile } = useContext(ProfileContext);

  const history = useHistory();

  useEffect(() => {
    getProfile();
    getRestaurants();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <header className="restaurants__header">
        <h1>Browse All Restaurants</h1>
      </header>
      <article className="restaurants-list">
        {restaurants.map((restaurant) => {
          return (
            <div
              key={`restaurant--${restaurant.id}`}
              className="restaurant-card"
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
              <h4 className="restaurant__locale">
                in {restaurant.city.name}, {restaurant.city.country.name}
              </h4>
              <div>{restaurant.address}</div>
              <div>{restaurant.phone_number}</div>
              {/* ---------------------------- */}
              <br></br>
              <div className="restaurant-keywords">
                Keywords:{" "}
                {restaurant.keywords?.map((keyword) => keyword.word).join(", ")}
              </div>
              {/* ---------------------------- */}
              <div className="favorite-wrapper">
                {restaurant.favorited ? (
                  <FavoriteIcon
                    className="favorite-heart-full"
                    onClick={() =>
                      unfavoriteThisRestaurant(restaurant.id).then(
                        getRestaurants
                      )
                    }
                  />
                ) : (
                  <FavoriteBorderIcon
                    className="favorite-heart-outline"
                    onClick={() =>
                      favoriteThisRestaurant(restaurant.id).then(getRestaurants)
                    }
                  />
                )}
              </div>
              {/* ---------------------------- */}
              {profile.user?.user.is_staff ? (
                // If admin, allow delete button to appear
                <button
                  className="btn delete-button"
                  onClick={() => {
                    closeRestaurant(restaurant.id).then(
                      history.push("/restaurants")
                    );
                  }}
                >
                  Delete Restaurant
                </button>
              ) : null}
            </div>
          );
        })}
      </article>
    </>
  );
};
