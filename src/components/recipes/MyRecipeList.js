import React, { useContext, useEffect, useState } from "react";
import { RecipeContext } from "./RecipeProvider.js";
import { useHistory } from "react-router-dom";
import "./Recipe.css";

export const MyRecipeList = () => {
  const history = useHistory();
  const { recipes, getRecipes, deleteRecipe, createRecipeImage } =
    useContext(RecipeContext);

  useEffect(() => {
    getRecipes();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [recipeImage, setRecipeImage] = useState("");
  // const [isLoading, setIsLoading] = useState(false);

  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(file);
  };

  const createRecipeImageString = (event) => {
    getBase64(event.target.files[0], (base64ImageString) => {
      console.log("Base64 of file is", base64ImageString);
      // Update a component state variable to the value of base64ImageString
      setRecipeImage(base64ImageString);
    });
  };

  const sortedRecipes = recipes.sort((a, b) => {
    return Date.parse(b.date) - Date.parse(a.date);
  });

  return (
    <>
      <header className="recipes__header">
        <h1>My Recipes</h1>
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
        {sortedRecipes
          .filter((recipe) => recipe.author)
          .map((recipe) => {
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
                {/* ----------------- IMAGES ---------------- */}

                <button
                  className="btn btn-3"
                  onClick={() => history.push(`/recipes/${recipe.id}/edit`)}
                >
                  Edit Entry
                </button>
                <button
                  className="btn btn-3"
                  onClick={() => {
                    deleteRecipe(recipe.id).then(history.push("/my-recipes"));
                  }}
                >
                  Delete Entry
                </button>
              </section>
            );
          })}
      </article>
    </>
  );
};
