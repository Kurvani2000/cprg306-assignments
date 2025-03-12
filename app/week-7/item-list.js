import { useState } from "react";
import Item from "./item";

export default function ItemList({ items = [] }) 
{
    const [sortBy, setSortBy] = useState("name");
    const selectedStyle = "bg-red-300 text-black rounded-md";
    
    let nameStyle = "";
    let categoryStyle = "";

    if (sortBy === "name") 
    {
        items.sort((a, b) => a.name.localeCompare(b.name));
        nameStyle = selectedStyle;
    } 
    else if (sortBy === "category") 
    {
        items.sort((a, b) => {
            if (a.category < b.category) return -1;
            if (a.category > b.category) return 1;
            return 0;
        });

        categoryStyle = selectedStyle;
    }

    return (
        <div>
            <div>
                <button className={nameStyle} onClick={() => setSortBy("name")}>
                    Name Sort
                </button>
                <button className={categoryStyle} onClick={() => setSortBy("category")}>
                    Category Sort
                </button>
            </div>
            <ul>
                <li>
                    {items.map((items) => (
                        <Item>
                            key={items.id}
                            name={items.name}
                            quantity={items.quantity}
                            category={items.category}
                        </Item>
                    ))}
                </li>
            </ul>
        </div>
    );
}