import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { RecipeContext } from "./RecipeProvider";

import "./Recipe.css";

export const RecipeDetail = () => {
  const { getRecipeById } = useContext(RecipeContext);

  const { recipe_id } = useParams();
  const history = useHistory();

  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    getRecipeById(recipe_id).then((recipe) => setRecipe(recipe));
  }, [recipe_id]);

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
      </div>
      <br></br>
      <button className="btn" onClick={() => history.push("/my-recipes")}>
        Return to List
      </button>
    </>
  );
};
