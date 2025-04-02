"use client";
import React, { useState, useEffect } from 'react';

const fetchMealIdeas = async (ingredient) => {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        const data = await response.json();
        return data.meals || []; 
    } catch (error) {
        console.error("Error fetching meal ideas:", error);
        return [];
    }
};

const fetchMealDetails = async (mealId) => {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        const data = await response.json();
        return data.meals ? data.meals[0] : null;
    } catch (error) {
        console.error("Error fetching meal details:", error);
        return null;
    }
};

const MealIdeas = ({ ingredient }) => {
    const [meals, setMeals] = useState([]);
    const [selectedMeal, setSelectedMeal] = useState(null);

    const loadMealIdeas = async () => {
        if (ingredient) {
            const mealData = await fetchMealIdeas(ingredient);
            setMeals(mealData);
        } else {
            setMeals([]); 
        }
    };

    const handleMealClick = async (mealId) => {
        if (selectedMeal && selectedMeal.idMeal === mealId) 
        {
            setSelectedMeal(null);
        } 
        else 
        {
            const mealDetails = await fetchMealDetails(mealId);
            setSelectedMeal(mealDetails); 
        }
    };

    useEffect(() => {
        loadMealIdeas();
        setSelectedMeal(null);
    }, [ingredient]);

      const ingredients = selectedMeal
        ? Object.entries(selectedMeal)
              .filter(([key, value]) => key.startsWith("strIngredient") && value)
              .map(([key, ingredient]) => {
                  const index = key.replace("strIngredient", "");
                  const measure = selectedMeal[`strMeasure${index}`] || ""; 
                  return { ingredient, measure };
              })
        : [];

    return (
        <div className="meal-ideas bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-extrabold mb-6 text-center">Meal Ideas</h2>

            {meals.length === 0 ? (
                <p className="text-gray-500 text-lg text-center">
                    {ingredient ? `No meal ideas found for "${ingredient}".` : "Select an ingredient to see meal ideas!"}
                </p>
            ) : (
                <ul className="space-y-4">
                    {meals.map((meal) => (
                        <React.Fragment key={meal.idMeal}>
                            <li
                                className="meal-item bg-gray-200 p-4 rounded-lg flex items-center space-x-4 hover:bg-gray-300 transition-all shadow-lg cursor-pointer"
                                onClick={() => handleMealClick(meal.idMeal)}
                            >
                                <img src={meal.strMealThumb} alt={meal.strMeal} className="w-16 h-16 rounded-full border-2 border-pink-400" />
                                <span className="text-gray font-semibold text-lg">{meal.strMeal}</span>
                            </li>
                            {/* If this meal is selected, show the details below the li */}
                            {selectedMeal && selectedMeal.idMeal === meal.idMeal && (
                                <div className="bg-white p-4 rounded-lg shadow-md mt-2">
                                    <h4 className="text-xl font-semibold mb-2">Ingredients needed:</h4>
                                    <ul className="list-none">
                                        {ingredients.map((item, index) => (
                                            <li key={index} className="text-gray-600">
                                                {item.ingredient} {item.measure && `(${item.measure})`}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MealIdeas;