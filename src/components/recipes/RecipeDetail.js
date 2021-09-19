import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { RecipeContext } from "./RecipeProvider";

import "./Recipe.css";

export const RecipeDetail = () => {
  const { getRecipeById } = useContext(RecipeContext);

  const { recipe_id } = useParams();
  const history = useHistory();

  const [recipe, setRecipe] = useState({});
  const [keywords, setKeywords] = useState([]);

  useEffect(() => {
    getRecipeById(recipe_id).then((recipe) => setRecipe(recipe));
  }, [recipe_id]);

  useEffect(() => {
    setKeywords(recipe.keywords);
  }, [recipe]);

  return (
    <>
      <div className="detail--container">
        <h2>{recipe.name}</h2>
        <div>
          {/* INVESTIAGTE WHERE RESTAURANT DATA HAS GONE */}
          {/* by <b>{recipe.restaurant.name}</b> in{" "} */}
          {/* <b>{recipe.restaurant.city.name}</b> */}
        </div>
        <div>{recipe.description}</div>
        <br></br>
        <div>
          <b>{recipe.date}</b>
        </div>
        <div>
          Keywords:{" "}
          {keywords?.map((keyword) => (
            <div key={`keyword-id-${keyword.id}`}>– {keyword.word}</div>
          ))}
        </div>
      </div>
      <br></br>
      {/* TERNARY TIME */}
      {/* if recipe belongs to author, return to my /my-recipes */}
      {/* Otherwise, return to /recipes */}
      {recipe.author ? (
        <button className="btn" onClick={() => history.push("/my-recipes")}>
          Return to My Recipes
        </button>
      ) : (
        <button className="btn" onClick={() => history.push("/recipes")}>
          Return to All Recipes
        </button>
      )}
    </>
  );
};
