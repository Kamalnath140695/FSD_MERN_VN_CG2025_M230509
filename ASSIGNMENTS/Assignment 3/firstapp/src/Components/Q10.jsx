import { useState, useEffect } from 'react';
import productsData from '../data.json';

const Q10 = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(productsData);
    }, []);

    return (
        <div>
            <h3>Local Products (Q10)</h3>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {products.map(product => (
                    <div key={product.id} style={{ border: '1px solid #ccc', padding: '10px' }}>
                        <h4>{product.name}</h4>
                        <p>{product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Q10;