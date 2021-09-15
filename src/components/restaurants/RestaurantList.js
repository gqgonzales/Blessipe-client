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
      <header className="restaurants__header">
        <h1>Browse All Restaurants</h1>
        {/* <button
        className="btn btn-2 btn-sep icon-create"
        onClick={() => {
          history.push({ pathname: "/restaurants/new" });
        }}
      >
        Register New Restaurant
      </button> */}
      </header>
      <article className="restaurants">
        {restaurants.map((restaurant) => {
          return (
            <div key={`restaurant--${restaurant.id}`} className="restaurant">
              <h3 className="restaurant__name">{restaurant.name} </h3>
              <h4>
                in {restaurant.city.name}, {restaurant.city.country.name}
              </h4>
              {/* <div className="restaurant__edit">
                <button
                  className="btn btn-3"
                  onClick={() =>
                    history.push(`/restaurants/${restaurant.id}/edit`)
                  }
                >
                  Edit
                </button>
              </div> */}
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
