import React, { useContext, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { RecipeContext } from "../recipes/RecipeProvider.js";
import { RestaurantContext } from "../restaurants/RestaurantProvider.js";

export const RecipeEdit = () => {
  const history = useHistory();
  const { createRecipe } = useContext(RecipeContext);
  const { getRestaurants, restaurants } = useContext(RestaurantContext);

  const { recipeId } = useParams();

  const [currentRecipe, setCurrentRecipe] = useState({
    recipe: parseInt(recipeId),
    traveler: 0,
    restaurant: 0,
    name: "",
    date: "",
    description: "",
  });

  useEffect(() => {
    getRestaurants();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const changeState = (domEvent) => {
    const recipeX = { ...currentRecipe };
    recipeX[domEvent.target.name] = domEvent.target.value;
    setCurrentRecipe(recipeX);
  };

  const sortedRestaurants = restaurants.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  return (
    <>
      <form className="recipe-form">
        <h2 className="gameForm__title">Create a New Recipe</h2>
        {/* -------------- TITLE --------------*/}
        <fieldset>
          <div className="form-group">
            <label htmlFor="name">What did you eat?</label>
            <input
              type="text"
              name="name"
              required
              autoFocus
              placeholder="Record the name of the dish here..."
              className="form-control"
              value={currentRecipe.name}
              onChange={changeState}
            />
          </div>
        </fieldset>
        {/* -------------- GAME --------------*/}
        <fieldset>
          <div className="form-group">
            <label htmlFor="restaurant_id">Where did you eat it?</label>
            <select
              name="restaurant_id"
              className="form-control"
              value={currentRecipe.restaurant_id}
              placeholder="Where did you eat it?"
              onChange={changeState}
            >
              <option value="0">Select a restaurant...</option>
              {sortedRestaurants.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>
        </fieldset>
        {/* -------------- DATE --------------*/}
        <fieldset>
          <div className="form-group">
            <label htmlFor="eventDate">When did you eat it?</label>
            <input
              type="date"
              id="eventDate"
              name="date"
              value={currentRecipe.date}
              required
              autoFocus
              className="form-control"
              placeholder="When did you eat it?"
              onChange={changeState}
            />
          </div>
        </fieldset>
        {/* -------------- DESCRIPTION --------------*/}
        <fieldset>
          <div className="form-group">
            <label htmlFor="description">
              What was so memorable about the dish?
            </label>
            <textarea
              //   type="text"
              name="description"
              required
              autoFocus
              className="form-control"
              placeholder="Record your memories here..."
              value={currentRecipe.description}
              onChange={changeState}
            />
          </div>
        </fieldset>

        <button
          type="submit"
          onClick={(evt) => {
            evt.preventDefault();
            const newEvent = {
              traveler: currentRecipe.traveler_id,
              restaurant: currentRecipe.restaurant_id,
              name: currentRecipe.name,
              date: currentRecipe.date,
              description: currentRecipe.description,
            };

            createRecipe(newEvent).then(() => history.push("/my-recipes"));
          }}
          className="btn btn-primary"
        >
          Finish Entry
        </button>
      </form>
    </>
  );
};
