import { useState, useEffect } from 'react';

const Q12 = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data.products);
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading data</div>;

    return (
        <div>
            <h3>Products with Loading/Error (Q12)</h3>
            <div>
                {products.map(product => (
                    <div key={product.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                        <h4>{product.title}</h4>
                        <p>Price: ${product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Q12;