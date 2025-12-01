import { useState } from 'react';

const Q14 = () => {
    const [fruits, setFruits] = useState(['Apple', 'Banana', 'Orange']);
    const [newFruit, setNewFruit] = useState('');

    const addFruit = (e) => {
        e.preventDefault();
        if (newFruit.trim()) {
            setFruits([...fruits, newFruit]);
            setNewFruit('');
        }
    };

    const deleteFruit = (index) => {
        setFruits(fruits.filter((_, i) => i !== index));
    };

    return (
        <div>
            <h3>Add/Delete Fruits (Q14)</h3>
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
                    <li key={index}>
                        {fruit}
                        <button onClick={() => deleteFruit(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Q14;