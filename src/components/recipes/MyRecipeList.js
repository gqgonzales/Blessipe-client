import React, { useContext, useEffect } from "react";
import { RecipeContext } from "./RecipeProvider.js";
import { useHistory } from "react-router-dom";
import "./Recipe.css";

export const MyRecipeList = () => {
  const history = useHistory();
  const { recipes, getRecipes, deleteRecipe } = useContext(RecipeContext);

  useEffect(() => {
    getRecipes();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const sortedRecipes = recipes.sort((a, b) => {
    return Date.parse(b.date) - Date.parse(a.date);
  });

  return (
    <>
      <header className="recipes__header">
        <h1>My Recipes</h1>
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
