import { useState } from 'react';

const Q15 = () => {
    const [profile, setProfile] = useState({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '123-456-7890'
    });

    const updateField = (field, value) => {
        setProfile({ ...profile, [field]: value });
    };

    return (
        <div>
            <h3>Edit Profile (Q15)</h3>
            <div>
                <label>Name: </label>
                <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => updateField('name', e.target.value)}
                />
            </div>
            <div>
                <label>Email: </label>
                <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => updateField('email', e.target.value)}
                />
            </div>
            <div>
                <label>Phone: </label>
                <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                />
            </div>
            <div>
                <h4>Current Profile:</h4>
                <p>Name: {profile.name}</p>
                <p>Email: {profile.email}</p>
                <p>Phone: {profile.phone}</p>
            </div>
        </div>
    );
};

export default Q15;