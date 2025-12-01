import { useState, useEffect } from 'react';

const Q18 = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const usersPerPage = 5;

    useEffect(() => {
        fetch('https://dummyjson.com/users?limit=20')
            .then(res => res.json())
            .then(data => setUsers(data.users));
    }, []);

    const startIndex = currentPage * usersPerPage;
    const currentUsers = users.slice(startIndex, startIndex + usersPerPage);
    const totalPages = Math.ceil(users.length / usersPerPage);

    return (
        <div>
            <h3>User Pagination (Q18)</h3>
            <div>
                {currentUsers.map(user => (
                    <div key={user.id} style={{ border: '1px solid #ccc', margin: '5px', padding: '10px' }}>
                        <p>{user.firstName} {user.lastName}</p>
                        <p>{user.email}</p>
                    </div>
                ))}
            </div>
            <div>
                <button 
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 0}
                >
                    Prev
                </button>
                <span> Page {currentPage + 1} of {totalPages} </span>
                <button 
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage >= totalPages - 1}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Q18;