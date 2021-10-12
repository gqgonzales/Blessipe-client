import React, { useContext, useEffect } from "react";
import { RecipeContext } from "./RecipeProvider.js";
import { useHistory } from "react-router-dom";
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
      <header className="recipes recipes__header">
        <h1>Browse All Recipes</h1>
      </header>
      <article className="all-recipes">
        {sortedRecipes
          .filter((recipe) => recipe.is_public === true)
          .map((recipe) => {
            return (
              <section key={recipe.id} className="recipe-entry">
                <div className="recipe-text-container">
                  <RecipeDetail
                    recipe={recipe}
                    key={`Recipe-Card-${recipe.id}`}
                  >
                    {recipe.name} from {recipe.restaurant.name} in{" "}
                    {recipe.restaurant.city.name}
                  </RecipeDetail>
                  {/* AUTHOR BUTTONS TERNARY */}
                  {recipe.author ? (
                    <>
                      <div className="button-group">
                        <button
                          className="btn recipe-button delete-button"
                          onClick={() => {
                            deleteRecipe(recipe.id).then(
                              history.push("/recipes")
                            );
                          }}
                        >
                          Delete Entry
                        </button>
                        <button
                          className="btn recipe-button edit-button"
                          onClick={() =>
                            history.push(`/recipes/${recipe.id}/edit`)
                          }
                        >
                          Edit Entry
                        </button>
                      </div>
                    </>
                  ) : null}
                </div>
                {/* IMAGE TERNARY */}
                {recipe.image != null ? (
                  <img
                    className="recipe-image"
                    src={recipe.image}
                    alt={recipe.name}
                  />
                ) : null}
              </section>
            );
          })}
      </article>
    </>
  );
};
