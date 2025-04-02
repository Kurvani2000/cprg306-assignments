"use client";
import { useUserAuth } from "../_utils/auth-context";
import ItemList from "./item-list";
import NewItem from "./new-item";
import itemsData from "./items.json";
import MealIdeas from "./meal-ideas.js";
import React, { useState, useEffect } from "react";
import { getItems, addItem, deleteItem } from "../_services/shopping-list-service";

export default function Page() 
{
    const [items, setItems] = useState(itemsData);
    const [selectedItemName, setSelectedItemName] = useState("");
    const { user } = useUserAuth();
    
    const loadItems = async () => {
        if (user) 
        {
            const shoppingList = await getItems(user.uid);
            setItems(shoppingList);
        }
    };

    useEffect(() => {
        loadItems();
    }, [user]);

    if (!user) 
    {
        return null;
    }

    const handleAddItem = async (newItem) => {
        if (user) 
        {
            const id = await addItem(user.uid, newItem);
            setItems([...items, { ...newItem, id }]);
        }
    };

    const handleDeleteItem = async (itemId) => {
        if (!user) {
            console.error("No user logged in");
            return;
        }

        try {
            console.log("Attempting to delete item with ID:", itemId);
            console.log("Current items state:", items.map(item => ({
                id: item.id,
                name: item.name,
                category: item.category
            })));
            
            const itemToDelete = items.find(item => item.id === itemId);
            if (!itemToDelete) 
            {
                console.error("Item not found in local state:", itemId);
                return;
            }

            console.log("Found item to delete:", {
                id: itemToDelete.id,
                name: itemToDelete.name,
                category: itemToDelete.category
            });
            
            await deleteItem(user.uid, itemId);
            
            setItems(prevItems => {
                const newItems = prevItems.filter(item => item.id !== itemId);
                console.log("Updated items state:", newItems.map(item => ({
                    id: item.id,
                    name: item.name,
                    category: item.category
                })));
                return newItems;
            });
        } catch (error) {
            console.error("Failed to delete item:", error);
        }
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
                <ItemList 
                    items={items} 
                    onItemSelect={handleItemSelect}
                    onItemDelete={handleDeleteItem} 
                />
            </section>
            <div>
                <MealIdeas ingredient={selectedItemName} />
            </div>
        </main>
    );
}