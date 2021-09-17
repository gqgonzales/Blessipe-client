import React, { useContext, useEffect } from "react";
import { RecipeContext } from "./RecipeProvider.js";
import { useHistory } from "react-router-dom";
import "./Recipe.css";

export const RecipeList = () => {
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
        <h1>Browse All Recipes</h1>
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
