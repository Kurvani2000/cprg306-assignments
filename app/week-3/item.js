export default function Item({name, quantity, category}) 
{
     return(<section className="bg-pink-200 p-4 m-4">
        <li className="font-bold text-blue-900">Name: {name}</li>
        <li>Quantity: {quantity}</li>
        <li><span className="font-bold">Category:</span> {category}</li>
        </section>);
}