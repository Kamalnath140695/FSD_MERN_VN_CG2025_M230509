import { useState } from 'react';

const Q8 = () => {
    const products = [
        { name: 'iPhone', category: 'Electronics' },
        { name: 'T-Shirt', category: 'Clothes' },
        { name: 'Laptop', category: 'Electronics' },
        { name: 'Jeans', category: 'Clothes' },
        { name: 'Headphones', category: 'Electronics' },
        { name: 'Jacket', category: 'Clothes' }
    ];

    const [filter, setFilter] = useState('All');

    const filteredProducts = filter === 'All' 
        ? products 
        : products.filter(product => product.category === filter);

    return (
        <div>
            <h3>Product Filter (Q8)</h3>
            <div>
                <button onClick={() => setFilter('All')}>All</button>
                <button onClick={() => setFilter('Electronics')}>Electronics</button>
                <button onClick={() => setFilter('Clothes')}>Clothes</button>
            </div>
            <ul>
                {filteredProducts.map((product, index) => (
                    <li key={index}>{product.name} - {product.category}</li>
                ))}
            </ul>
        </div>
    );
};

export default Q8;