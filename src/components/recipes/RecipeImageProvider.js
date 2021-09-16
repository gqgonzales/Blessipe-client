import React, { useState } from "react";

export const RecipeImageContext = React.createContext();

export const RecipeImageProvider = (props) => {
  const [recipeImages, setRecipeImages] = useState([]);
  // --------------------- IMAGES ---------------------
  const getRecipeImages = () => {
    return fetch("http://localhost:8000/recipeimages", {
      headers: {
        Authorization: `Token ${localStorage.getItem("bt_token")}`,
      },
    })
      .then((response) => response.json())
      .then(setRecipeImages);
  };

  const getSingleRecipeImage = (recipeImageId) => {
    return fetch(`http://localhost:8000/recipeimages/${recipeImageId}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("bt_token")}`,
      },
    }).then((response) => response.json());
  };

  const uploadRecipeImage = (recipeImageString) => {
    return fetch(`http://localhost:8000/recipeimages/${recipeImageString}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("bt_token")}`,
      },
      body: JSON.stringify(recipeImageString),
    }).then(getRecipeImages);
  };

  return (
    <RecipeImageContext.Provider
      value={{
        recipeImages,
        getRecipeImages,
        getSingleRecipeImage,
        uploadRecipeImage,
      }}
    >
      {props.children}
    </RecipeImageContext.Provider>
  );
};
