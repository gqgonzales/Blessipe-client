import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Restaurant.css";
import { RestaurantContext } from "./RestaurantProvider.js";
import { ProfileContext } from "../profile/ProfileProvider";

export const RestaurantList = (props) => {
  const { restaurants, getRestaurants, closeRestaurant } =
    useContext(RestaurantContext);
  const { profile, getProfile } = useContext(ProfileContext);

  const history = useHistory();

  useEffect(() => {
    getRestaurants();
    getProfile();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <header className="restaurants__header">
        <h1>Browse All Restaurants</h1>
      </header>
      <article className="restaurants">
        {restaurants.map((restaurant) => {
          return (
            <div key={`restaurant--${restaurant.id}`} className="restaurant">
              <h3 className="restaurant__name">{restaurant.name} </h3>
              <h4>
                in {restaurant.city.name}, {restaurant.city.country.name}
              </h4>
              <div>{restaurant.address}</div>
              <a href={restaurant.url}>{restaurant.url}</a>
              <div>{restaurant.phone_number}</div>
              {/* ---------------------------- */}
              <br></br>
              <div className="restaurant-keywords">
                Keywords:{" "}
                {restaurant.keywords?.map((keyword) => (
                  <div key={`keyword-id-${keyword.id}`}>– {keyword.word}</div>
                ))}
              </div>
              {/* ---------------------------- */}
              {profile.user?.user.is_staff ? (
                // If admin, allow delete button to appear
                <button
                  className="btn btn-3"
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
