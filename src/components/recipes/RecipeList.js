import React, { useContext, useEffect, useState } from "react";
import { RecipeContext } from "./RecipeProvider.js";
import { useHistory } from "react-router-dom";
import "./Recipe.css";

export const RecipeList = () => {
  const history = useHistory();
  const { recipes, getRecipes, deleteRecipe, getRecipeImages } =
    useContext(RecipeContext);

  useEffect(() => {
    getRecipes().then(getRecipeImages);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const sortedRecipes = recipes.sort((a, b) => {
    return Date.parse(b.date) - Date.parse(a.date);
  });

  const [recipeImage, setRecipeImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(file);
  };

  const createRecipeImageString = (event) => {
    getBase64(event.target.files[0], (base64ImageString) => {
      console.log("Base64 of file is", base64ImageString);
      setRecipeImage(base64ImageString);
      // Update a component state variable to the value of base64ImageString
    });
  };

  return (
    <>
      <header className="recipes__header">
        <h1>Browse All Recipes</h1>
        {/* <button
          className="btn btn-2 btn-sep icon-create"
          onClick={() => {
            history.push({ pathname: "/recipes/new" });
          }}
          >
          Create a New Recipe
        </button> */}
      </header>
      <article className="recipes">
        {sortedRecipes.map((recipe) => {
          return (
            <section key={recipe.id} className="all-recipes">
              <h3 className="recipe-header">
                {recipe.name} from {recipe.restaurant.name}
              </h3>
              <div>{recipe.date}</div>
              <div>{recipe.description}</div>
              {recipe.image != null ? (
                <img
                  className="recipe-image"
                  src={recipe.image}
                  alt={recipe.name}
                />
              ) : null}
              {recipe.author ? (
                <>
                  {/* BEGIN ---- IMAGE BUTTON */}
                  {/* <input
                    type="file"
                    id="recipe_image"
                    onChange={createRecipeImageString}
                  />
                  <input type="hidden" name="recipe" value={recipe.id} />
                  <button
                    onClick={() => {
                      // Upload the stringified recipeImage that is stored in state
                      uploadRecipeImage(recipeImage);
                    }}
                  >
                    Upload
                  </button>
                  <br></br> */}
                  {/*END ---- IMAGE BUTTON */}
                  <button
                    className="btn btn-3"
                    onClick={() => history.push(`/recipes/${recipe.id}/edit`)}
                  >
                    Edit Entry
                  </button>
                  <button
                    className="btn btn-3"
                    onClick={() => {
                      deleteRecipe(recipe.id).then(history.push("/recipes"));
                    }}
                  >
                    Delete Entry
                  </button>
                </>
              ) : null}
            </section>
          );
        })}
      </article>
    </>
  );
};
