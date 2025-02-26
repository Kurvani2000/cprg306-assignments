"use client";

import { useState } from "react";

export default function NewItem() 
{
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [category, setCategory] = useState("produce");

    const increment = () => {
      setQuantity(prev => Math.min(prev + 1, 20));
    };
  
    const decrement = () => {
      setQuantity(prev => Math.max(prev - 1, 1));
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      let item = {name, quantity, category};

      console.log(item);
      alert(`Added Item: \nName: ${name}\nQuantity: ${quantity}\nCategory: ${category}`);

      setName("");
      setQuantity(1);
      setCategory("Produce");
    };

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <div>
              <button placeholder="item name">
                    value={name}
                    required onChange={(event) => setName(event.target.value)}
              </button>
            </div>
          </div>

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

            <div>
            <label>
                Category:  
                <select required value={category} onChange={(event) => setCategory(event.target.value)}>
                    <option value="Produce">Produce</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Bakery">Bakery</option>
                    <option value="Meat">Meat</option>
                    <option value="Frozen Foods">Frozen Foods</option>
                    <option value="Canned Goods">Canned Goods</option>
                    <option value="Dry Goods">Dry Goods</option>
                    <option value="Beverages">Beverages</option>
                    <option value="Snacks">Snacks</option>
                    <option value="Household">Household</option>
                    <option value="Other">Other</option>
                </select>
            </label>
            </div>
          </div>
        </div>
      </form>
    );
  }