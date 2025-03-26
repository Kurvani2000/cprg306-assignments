"use client";
import { useUserAuth } from "../_utils/auth-context";
import ItemList from "./item-list";
import NewItem from "./new-item";
import itemsData from "./items.json";
import MealIdeas from "./meal-ideas.js";
import React, { useState } from "react";

export default function Page() 
{
    const [items, setItems] = useState(itemsData);
    const [selectedItemName, setSelectedItemName] = useState("");
    const { user } = useUserAuth();

    if (!user) 
    {
        return null;
    }

    const handleAddItem = (newItem) => {
        setItems([...items, newItem]);
    };

    const handleItemSelect = (itemName) => {
        console.log("Selected item:", itemName.name);

        const cleanedItemName = itemName.name
            .split(",")[0] 
            .replace(/[^\w\s]/gu, "") 
            .trim();

        console.log("Cleaned item name:", cleanedItemName);
        setSelectedItemName(cleanedItemName);
    };

    return (
        <main>
            <h1>Shopping List</h1>
            <section>
                <NewItem onAddItem={handleAddItem} />
                <ItemList items={items} onItemSelect={handleItemSelect} />
            </section>
            <div>
                <MealIdeas ingredient={selectedItemName} />
            </div>
        </main>
    );
}