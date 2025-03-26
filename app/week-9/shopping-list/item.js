export default function Item({name, quantity, category, onSelect}) 
{
     return(<section className="bg-pink-200 p-4 m-4">
        <ul onClick = {onSelect}>
                <li className="font-bold text-blue-900">Name: {name}</li>
                <li>Quantity: {quantity}</li>
                <li><span className="font-bold">Category:</span> {category}</li>
        </ul>
        </section>);
}