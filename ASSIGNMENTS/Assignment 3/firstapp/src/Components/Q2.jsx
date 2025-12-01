var isLoggedIn = true;

const LogMessage = () => {
    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>{isLoggedIn ? "Welcome Back!" : "Please Log in"}</h2>
            <button style={{
                padding: '10px 20px',
                fontSize: '16px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
            }}>
                {isLoggedIn ? 'Login' : 'Login'}
            </button>
        </div>
    );
};

export default LogMessage; 