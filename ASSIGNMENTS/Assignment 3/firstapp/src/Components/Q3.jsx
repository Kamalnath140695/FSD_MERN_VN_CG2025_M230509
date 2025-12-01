const ProfileCards = [
    {
        name: "micky",
        role: "software developer",
        image: "https://www.shutterstock.com/image-photo/image-mickey-mouse-holding-3-260nw-2648509217.jpg"
    },
    {
        name: "timon",
        role: "software tester",
        image: "https://www.shutterstock.com/image-photo/meerkat-closeup-481378408"
    },
    {
        name: "pumpa",
        role: "Business Analyst",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqscI0Q7p8e9tDylEr16_fCx8pW9D-1ZfEvg&s"
    }
];

const ProfileCard = (props) => {
    return (
        <div style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '16px',
            margin: '10px',
            width: '250px',
            textAlign: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <img 
                src={props.image} 
                alt={props.name}
                style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <h3>{props.name}</h3>
            <p>{props.role}</p>
        </div>
    );
};

const ProfileCardList = () => {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {ProfileCards.map(profile => (
                <ProfileCard 
                    key={profile.name}
                    name={profile.name}
                    role={profile.role}
                    image={profile.image}
                />
            ))}
        </div>
    );
};

export default ProfileCardList;