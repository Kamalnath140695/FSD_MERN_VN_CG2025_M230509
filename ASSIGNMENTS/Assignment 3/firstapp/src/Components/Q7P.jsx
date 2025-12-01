import Q7C from './Q7C';

const Q7P = () => {
    const showAlert = () => {
        alert("Alert from Parent Component!");
    };

    return (
        <div>
            <h2>Parent Component (Q7P)</h2>
            <Q7C onButtonClick={showAlert} />
        </div>
    );
};

export default Q7P;