import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { RecipeContext } from "./RecipeProvider";

import "./Recipe.css";

export const RecipeDetail = ({ recipe }) => {
  const {
    id,
    name,
    description,
    date,
    keywords,
    author,
    traveler,
    restaurant,
  } = recipe;

  const { getRecipeById } = useContext(RecipeContext);

  // const { recipe_id } = useParams();
  const history = useHistory();

  // const [recipe, setRecipe] = useState({});
  // const [keywords, setKeywords] = useState([]);

  // useEffect(() => {
  //   getRecipeById(recipe_id).then((recipe) => setRecipe(recipe));
  // }, [recipe_id]);

  // useEffect(() => {
  //   setKeywords(keywords);
  // }, [recipe]);

  const [showDetails, setShowDetails] = useState(false);
  const toggleDetails = () => setShowDetails(!showDetails);

  return (
    <>
      {showDetails ? (
        <>
          <h2 className="recipe-name-switch" onClick={() => toggleDetails()}>
            {/* Show Details */}
            {name} from {restaurant.name} in {restaurant.city.name}
          </h2>
          <div className="detail--container">
            <div>
              <b className="recipe-date">{date}</b>
            </div>
            <br></br>
            <div className="recipe-description">{description}</div>
            <br></br>
            <div>
              Keywords:{" "}
              {keywords?.map((keyword) => (
                <div key={`keyword-id-${keyword.id}`}>– {keyword.word}</div>
              ))}
            </div>
          </div>
          <br></br>
        </>
      ) : (
        <>
          <h2 className="recipe-name-switch" onClick={() => toggleDetails()}>
            {/* Show Details */}
            {name} from {restaurant.name} in {restaurant.city.name}
          </h2>
          <div className="detail--container">
            <div>
              <b className="recipe-date">{date}</b>
            </div>
          </div>
          <br></br>
        </>
      )}
    </>
  );
};
