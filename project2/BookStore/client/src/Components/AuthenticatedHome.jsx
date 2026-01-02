import React, { useEffect } from 'react';

const AuthenticatedHome = () => {
  useEffect(() => {
    // Check if user is logged in
    const userToken = localStorage.getItem('userToken');
    
    if (userToken) {
      // User is logged in, redirect to user home
      window.location.href = '/user/home';
    } else {
      // User is not logged in, redirect to general home
      window.location.href = '/';
    }
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      backgroundColor: '#F5F5DC'
    }}>
      <p>Redirecting...</p>
    </div>
  );
};

export default AuthenticatedHome;