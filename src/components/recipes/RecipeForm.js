import React, { useContext, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { RecipeContext } from "../recipes/RecipeProvider.js";
import { RestaurantContext } from "../restaurants/RestaurantProvider.js";

export const RecipeForm = () => {
  const history = useHistory();
  const { recipe_id } = useParams();

  const { createRecipe, getRecipeById, editRecipe } = useContext(RecipeContext);
  const { getRestaurants, restaurants } = useContext(RestaurantContext);
  const [recipeImage, setRecipeImage] = useState(false);

  const [currentRecipe, setCurrentRecipe] = useState({
    traveler: 0,
    restaurant: 0,
    name: "",
    date: "",
    description: "",
    image: "",
  });
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    getRestaurants();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (recipe_id) {
      getRecipeById(recipe_id).then((recipe) => {
        setCurrentRecipe({
          traveler: recipe.traveler.id,
          restaurant: recipe.restaurant.id,
          name: recipe.name,
          date: recipe.date,
          description: recipe.description,
          image: recipe.image,
        });
      });
    }
  }, [recipe_id]); // eslint-disable-line react-hooks/exhaustive-deps

  const changeState = (domEvent) => {
    const recipeX = { ...currentRecipe };
    recipeX[domEvent.target.name] = domEvent.target.value;
    setCurrentRecipe(recipeX);
  };

  const sortedRestaurants = restaurants.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(file);
  };

  const createRecipeImageString = (event) => {
    getBase64(event.target.files[0], (base64ImageString) => {
      // console.log("Base64 of file is", base64ImageString);
      // Update a component state variable to the value of base64ImageString
      setRecipeImage(base64ImageString);
    });
  };

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
        {/* -------------- RESTAURANT --------------*/}
        <fieldset>
          <div className="form-group">
            <label htmlFor="restaurant_id">Where did you eat it?</label>
            <select
              name="restaurant"
              className="form-control"
              value={currentRecipe.restaurant}
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
            <label htmlFor="date">When did you eat it?</label>
            <input
              type="date"
              id="date"
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
        {/* -------------- IMAGE UPLOAD v1  -------------- */}
        <fieldset>
          <label htmlFor="image"> Upload a photo of the dish: </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={createRecipeImageString}
          />
          If you have already uploaded a photo, disregard!
        </fieldset>

        {recipe_id ? (
          // If there is a param (meaning we're EDITING), hit the next ternary. Otherwise, skip to line 204
          recipeImage ? (
            // If there is a file that's been converted to string in state, hit this first ternary
            // It assumes this is an existing recipe WITHOUT a photo.
            // Add that imgString from state to the request.
            // It looks something like: ""data:image/jpeg;base64,/9j/4AAQSk......" but way longer
            <button
              type="submit"
              onClick={(evt) => {
                evt.preventDefault();
                const thisRecipe = {
                  id: parseInt(recipe_id),
                  traveler: parseInt(currentRecipe.traveler),
                  restaurant: parseInt(currentRecipe.restaurant),
                  name: currentRecipe.name,
                  date: currentRecipe.date,
                  description: currentRecipe.description,
                  image: recipeImage,
                };
                editRecipe(thisRecipe).then(() => history.push("/my-recipes"));
              }}
              className="btn btn-primary"
            >
              Edit Entry
            </button>
          ) : (
            // If no image tampering has happened, pass back whatever imgString came from django
            // This string will look something like: "http://localhost:8000/media/recipeimages/125..."
            <button
              type="submit"
              onClick={(evt) => {
                evt.preventDefault();
                const thisRecipe = {
                  id: parseInt(recipe_id),
                  traveler: parseInt(currentRecipe.traveler),
                  restaurant: parseInt(currentRecipe.restaurant),
                  name: currentRecipe.name,
                  date: currentRecipe.date,
                  description: currentRecipe.description,
                  image: currentRecipe.image,
                };
                editRecipe(thisRecipe).then(() => history.push("/my-recipes"));
              }}
              className="btn btn-primary"
            >
              Edit Entry
            </button>
          )
        ) : (
          // If no param was found, that means this is a new recipe we're creating!
          <button
            type="submit"
            onClick={(evt) => {
              evt.preventDefault();
              const newRecipe = {
                traveler: currentRecipe.traveler,
                restaurant: currentRecipe.restaurant,
                name: currentRecipe.name,
                date: currentRecipe.date,
                description: currentRecipe.description,
                image: recipeImage,
              };
              createRecipe(newRecipe).then(() => history.push("/my-recipes"));
            }}
            className="btn btn-primary"
          >
            Finish Entry
          </button>
        )}
      </form>
    </>
  );
};
