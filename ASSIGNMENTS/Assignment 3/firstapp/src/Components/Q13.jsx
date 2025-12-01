import { useState } from 'react';

const Q13 = () => {
    const [fruits, setFruits] = useState(['Apple', 'Banana', 'Orange']);
    const [newFruit, setNewFruit] = useState('');

    const addFruit = (e) => {
        e.preventDefault();
        if (newFruit.trim()) {
            setFruits([...fruits, newFruit]);
            setNewFruit('');
        }
    };

    return (
        <div>
            <h3>Add Fruits (Q13)</h3>
            <form onSubmit={addFruit}>
                <input
                    type="text"
                    value={newFruit}
                    onChange={(e) => setNewFruit(e.target.value)}
                    placeholder="Enter fruit name"
                />
                <button type="submit">Add Fruit</button>
            </form>
            <ul>
                {fruits.map((fruit, index) => (
                    <li key={index}>{fruit}</li>
                ))}
            </ul>
        </div>
    );
};

export default Q13;