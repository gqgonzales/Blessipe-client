import React, { useState } from "react";

export const RecipeContext = React.createContext();

export const RecipeProvider = (props) => {
  const [recipes, setRecipes] = useState([]);

  const getRecipes = () => {
    return fetch("http://localhost:8000/recipes", {
      headers: {
        Authorization: `Token ${localStorage.getItem("bt_token")}`,
      },
    })
      .then((response) => response.json())
      .then(setRecipes);
  };

  const getRecipeById = (recipeId) => {
    return fetch(`http://localhost:8000/recipes/${recipeId}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("bt_token")}`,
      },
    }).then((response) => response.json());
  };

  const createRecipe = (recipe) => {
    return fetch("http://localhost:8000/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("bt_token")}`,
      },
      body: JSON.stringify(recipe),
    }).then(getRecipes);
  };

  const editRecipe = (recipe) => {
    return fetch(`http://localhost:8000/recipes/${recipe.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("bt_token")}`,
      },
      body: JSON.stringify(recipe),
    }).then(getRecipes);
  };

  const deleteRecipe = (recipeId) => {
    return fetch(`http://localhost:8000/recipes/${recipeId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("bt_token")}`,
      },
    }).then(getRecipes);
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        getRecipes,
        createRecipe,
        getRecipeById,
        editRecipe,
        deleteRecipe,
      }}
    >
      {props.children}
    </RecipeContext.Provider>
  );
};
