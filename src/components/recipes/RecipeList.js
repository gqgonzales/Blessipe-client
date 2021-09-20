import React, { useContext, useEffect } from "react";
import { RecipeContext } from "./RecipeProvider.js";
import { Link, useHistory } from "react-router-dom";
import "./Recipe.css";
import { RecipeDetail } from "./RecipeDetail.js";

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
              <div className="recipe-header">
                {/* HOW ABOUT....... -------------------*/}
                <RecipeDetail recipe={recipe} key={`Recipe-Card-${recipe.id}`}>
                  {recipe.name} from {recipe.restaurant.name} in{" "}
                  {recipe.restaurant.city.name}
                </RecipeDetail>
              </div>
              {/* IMAGE TERNARY */}
              {recipe.image != null ? (
                <img
                  className="recipe-image"
                  src={recipe.image}
                  alt={recipe.name}
                />
              ) : null}
              {/* AUTHOR BUTTONS TERNARY */}
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
