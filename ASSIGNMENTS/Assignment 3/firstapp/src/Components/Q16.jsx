import { useState } from 'react';
import axios from 'axios';

const Q16 = () => {
    const [formData, setFormData] = useState({ title: '', body: '' });
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://dummyjson.com/posts/add', formData);
            setMessage('Post Added!');
            setFormData({ title: '', body: '' });
        } catch (error) {
            setMessage('Error adding post');
        }
    };

    return (
        <div>
            <h3>Add Post (Q16)</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        placeholder="Title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                </div>
                <div>
                    <textarea
                        placeholder="Body"
                        value={formData.body}
                        onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                    />
                </div>
                <button type="submit">Add Post</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Q16;