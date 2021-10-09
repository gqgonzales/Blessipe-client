import React, { useContext, useEffect } from "react";
import { RecipeContext } from "./RecipeProvider.js";
import { useHistory } from "react-router-dom";
import "./Recipe.css";
import { RecipeDetail } from "./RecipeDetail.js";

export const MyRecipeList = () => {
  const history = useHistory();
  const { recipes, getRecipes, deleteRecipe } = useContext(RecipeContext);

  useEffect(() => {
    getRecipes();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const sortedRecipes = recipes.sort((a, b) => {
    return Date.parse(b.date) - Date.parse(a.date);
  });

  const myRecipes = sortedRecipes.filter((recipe) => recipe.author);

  return (
    <>
      <header className="recipes__header">
        <h1>My Recipes</h1>
      </header>
      <article className="all-recipes">
        {myRecipes.length > 0 ? (
          <>
            {myRecipes.map((recipe) => {
              return (
                <section key={recipe.id} className="recipe-entry">
                  <div className="recipe-header">
                    <RecipeDetail
                      recipe={recipe}
                      key={`Recipe-Card-${recipe.id}`}
                    >
                      {recipe.name} from {recipe.restaurant.name} in{" "}
                      {recipe.restaurant.city.name}
                    </RecipeDetail>
                    <div className="button-group">
                      <button
                        className="btn recipe-button delete-button"
                        onClick={() => {
                          deleteRecipe(recipe.id).then(
                            history.push("/my-recipes")
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
                    {/* ----------------- IMAGES ---------------- */}
                  </div>
                  {recipe.image != null ? (
                    <img
                      className="recipe-image"
                      src={recipe.image}
                      alt={recipe.name}
                    />
                  ) : null}
                  {/* ----------------- IMAGES ---------------- */}
                </section>
              );
            })}
          </>
        ) : (
          <>
            {" "}
            <h2 className="no-recipes">You haven't added any recipes yet 😔</h2>
          </>
        )}
      </article>
    </>
  );
};
