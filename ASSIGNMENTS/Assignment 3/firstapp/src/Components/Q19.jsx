import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const Home = () => <div><h2>Home Page</h2><p>Welcome to the home page!</p></div>;
const About = () => <div><h2>About Page</h2><p>This is the about page.</p></div>;
const Products = () => <div><h2>Products Page</h2><p>Browse our products here.</p></div>;

const Q19 = () => {
    return (
        <Router>
            <div>
                <h3>React Router App (Q19)</h3>
                <nav>
                    <Link to="/">Home</Link> | 
                    <Link to="/about">About</Link> | 
                    <Link to="/products">Products</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/products" element={<Products />} />
                </Routes>
            </div>
        </Router>
    );
};

export default Q19;