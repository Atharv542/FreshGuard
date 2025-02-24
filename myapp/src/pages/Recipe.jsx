import React, { useEffect, useState } from 'react';

const Recipe = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Fetch recipes from local storage on component mount
    const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    setRecipes(storedRecipes);
  }, []);

  return (
    <div className="recipe-list bg-black w-full min-h-screen px-4 sm:px-6 md:px-8 lg:px-10">
      {/* Heading - Adjusted for responsiveness */}
      <h2 className="text-white text-2xl font-bold text-center lg:mx-[600px] mb-5">
        Generated Recipes
      </h2>

      {recipes.length > 0 ? (
        recipes.map((recipeObj, index) => {
          let recipeData;
          try {
            recipeData = JSON.parse(recipeObj.recipe);
          } catch {
            return (
              <div key={index} className="p-5 bg-red-500 text-white rounded-lg mx-auto max-w-lg">
                Invalid recipe data format.
              </div>
            );
          }
          return (
            <div 
              key={index} 
              className="p-5 mb-5 rounded-lg shadow-lg 
                mx-4 sm:mx-6 md:mx-10 lg:mx-36"
            >
              <h3 className="text-xl text-orange-400 font-bold">
                Item Name: {recipeObj.itemName}
              </h3>
              <h4 className="text-lg text-orange-300 mt-2">
                Recipe Name: {recipeData.recipeName}
              </h4>
              <p className="text-gray-300 mt-2">
                Estimated Time: {recipeData.estimatedTime}
              </p>

              {/* Ingredients Section */}
              <h4 className="text-orange-300 mt-3">Ingredients:</h4>
              <ul className="list-disc list-inside text-white">
                {recipeData.ingredients.map((ingredient, i) => (
                  <li key={i}>{ingredient}</li>
                ))}
              </ul>

              {/* Instructions Section */}
              <h4 className="text-orange-300 mt-3">Instructions:</h4>
              <ol className="list-decimal list-inside text-white">
                {recipeData.instructions.map((instruction, i) => (
                  <li key={i}>{instruction}</li>
                ))}
              </ol>
            </div>
          );
        })
      ) : (
        <div className="w-full min-h-screen flex justify-center items-center text-center">
          <p className="text-gray-300 text-2xl sm:text-3xl">No recipes generated yet.</p>
        </div>
      )}
    </div>
  );
};

export default Recipe;

