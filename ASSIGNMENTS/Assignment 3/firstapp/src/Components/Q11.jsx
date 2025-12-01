import { useState, useEffect } from 'react';

const Q11 = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(data => setProducts(data.products));
    }, []);

    return (
        <div>
            <h3>API Products (Q11)</h3>
            <div>
                {products.map(product => (
                    <div key={product.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                        <h4>{product.title}</h4>
                        <p>Price: ${product.price}</p>
                        <p>Brand: {product.brand}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Q11;