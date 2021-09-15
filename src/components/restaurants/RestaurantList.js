import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Restaurant.css";
import { RestaurantContext } from "./RestaurantProvider.js";

export const RestaurantList = (props) => {
  const { restaurants, getRestaurants, closeRestaurant } =
    useContext(RestaurantContext);
  const history = useHistory();

  useEffect(() => {
    getRestaurants();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {/* <button
        className="btn btn-2 btn-sep icon-create"
        onClick={() => {
          history.push({ pathname: "/restaurants/new" });
        }}
      >
        Register New Restaurant
      </button> */}
      <br></br>
      <article className="restaurants">
        {restaurants.map((restaurant) => {
          return (
            <div key={`restaurant--${restaurant.id}`} className="restaurant">
              <div className="game__name">
                {restaurant.name} in {restaurant.city.name},{" "}
                {restaurant.city.country.name}
              </div>
              <div className="game__edit">
                <button
                  className="btn btn-3"
                  onClick={() =>
                    history.push(`/restaurants/${restaurant.id}/edit`)
                  }
                >
                  Edit
                </button>
              </div>
              <button
                className="btn btn-3"
                onClick={() => {
                  closeRestaurant(restaurant.id).then(
                    history.push("/restaurants")
                  );
                }}
              >
                Delete Event
              </button>
            </div>
          );
        })}
      </article>
    </>
  );
};
