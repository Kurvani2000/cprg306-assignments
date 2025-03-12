import ItemList from "./item-list";
import NewItem from "./new-item";
import itemsData from "./items.json";

export default function Page() 
{
    const [items, setItems] = useState(itemsData);

    const handleAddItem = (newItem) => {
        setItems((prevItems) => [...prevItems, newItem]);
    };

    return (
        <main>
            <h1>Shopping List</h1>
            <ItemList/>

            <NewItem onAddItem={handleAddItem} />
            <ItemList items={items} />
        </main>
    );
}