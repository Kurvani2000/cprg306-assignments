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
      <div>
        <div className="flex items-center space-x-6 bg-white rounded-lg p-4 shadow-md">
          <button
            onClick={decrement}
            className="px-4 py-2 bg-red-500 text-white font-semibold shadow hover:bg-red-400 transition duration-500 disabled:bg-red-200"
            disabled={quantity === 1}
          >
            -
          </button>
          <span className="text-xl font-bold text-gray-700">{quantity}</span>
          <button
            onClick={increment}
            className="px-4 py-2 bg-green-500 text-white font-semibold shadow hover:bg-green-400 transition duration-300 disabled:bg-green-200"
            disabled={quantity === 20}
          >
            +
          </button>
        </div>
      </div>
    );
  }