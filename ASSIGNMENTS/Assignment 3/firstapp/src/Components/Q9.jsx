import { useState } from 'react';

const Q9 = () => {
    const students = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace'];
    const [search, setSearch] = useState('');

    const filteredStudents = students.filter(student =>
        student.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <h3>Student Search (Q9)</h3>
            <input
                type="text"
                placeholder="Search students..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <ul>
                {filteredStudents.map((student, index) => (
                    <li key={index}>{student}</li>
                ))}
            </ul>
        </div>
    );
};

export default Q9;