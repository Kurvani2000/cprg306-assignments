"use client";

import { useState } from "react";

export default function NewItem() 
{
    const [quantity, setQuantity] = useState(1);
  
    const increment = () => {
      setQuantity(prev => Math.min(prev + 1, 20));
    };
  
    const decrement = () => {
      setQuantity(prev => Math.max(prev - 1, 1));
    };
  
    return (
      <div className="p-6 max-w-sm mx-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl shadow-lg flex flex-col items-center space-y-6">
        <h2 className="text-2xl font-bold text-white">Adjust Quantity</h2>
        <div className="flex items-center space-x-6 bg-white rounded-lg p-4 shadow-md">
          <button
            onClick={decrement}
            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-400 transition duration-300 disabled:bg-red-200"
            disabled={quantity === 1}
          >
            -
          </button>
          <span className="text-xl font-bold text-gray-700">{quantity}</span>
          <button
            onClick={increment}
            className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-400 transition duration-300 disabled:bg-green-200"
            disabled={quantity === 20}
          >
            +
          </button>
        </div>
      </div>
    );
  }