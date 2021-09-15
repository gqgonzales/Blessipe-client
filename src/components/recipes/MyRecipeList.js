import React, { useContext, useEffect } from "react";
import { RecipeContext } from "./RecipeProvider.js";
import { useHistory } from "react-router-dom";
import "./Recipe.css";

export const MyRecipeList = () => {
  const history = useHistory();
  const { recipes, getRecipes, deleteRecipe } = useContext(RecipeContext);

  useEffect(() => {
    getRecipes();
  }, []);

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

                <button
                  className="btn btn-3"
                  onClick={() => {
                    deleteRecipe(recipe.id).then(history.push("/recipes"));
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
