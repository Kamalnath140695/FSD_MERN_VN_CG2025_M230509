import { useState, useEffect } from 'react';
import axios from 'axios';

const Q17 = () => {
    const [user, setUser] = useState({ firstName: '', lastName: '', email: '' });
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get('https://dummyjson.com/users/1')
            .then(res => setUser({
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                email: res.data.email
            }));
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put('https://dummyjson.com/users/1', user);
            setMessage('User updated successfully!');
        } catch (error) {
            setMessage('Error updating user');
        }
    };

    return (
        <div>
            <h3>Edit User (Q17)</h3>
            <form onSubmit={handleUpdate}>
                <div>
                    <input
                        type="text"
                        placeholder="First Name"
                        value={user.firstName}
                        onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={user.lastName}
                        onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                    />
                </div>
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />
                </div>
                <button type="submit">Update User</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Q17;