const StudentDetails = [
    {
        name: "kamal",
        dept: "Mechanical",
        year: 2016
    },
     {
        name: "jadeja",
        dept: "Computer",
        year: 2016
    },
    {
        name: "GORDAN",
        dept: "ECE",
        year: 2016
    },
     {
        name: "AUSTAN",
        dept: "EEE",
        year: 2016
    }
];

const StudentList = () => {
    return (
        <div style={{display:"inline-flex"}}>
            {StudentDetails.map(student => (
                <div key={student.name} style={{
                    border: '1px solid #ccc',
                    borderRadius: '15px',
                    padding: '5px',
                    margin: '5px',
                    width: '300px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                    <img 
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrzbvuWMGgFqJoVI2FSzZvZyxx9lLQZw0sVA&s" 
                        alt="Student" 
                        style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px' }}
                    />
                    <h3>{student.name}</h3>
                    <p>Department: {student.dept}</p>
                    <p>Year: {student.year}</p>
                </div>
            ))}
        </div>
    );
}

export default StudentList