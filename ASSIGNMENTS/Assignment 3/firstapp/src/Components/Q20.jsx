import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom';

const Home = () => <div><h2>Home Page</h2></div>;
const About = () => <div><h2>About Page</h2></div>;

const Products = () => (
    <div>
        <h2>Products</h2>
        <nav>
            <Link to="/products/electronics">Electronics</Link> | 
            <Link to="/products/fashion">Fashion</Link>
        </nav>
        <Outlet />
    </div>
);

const Electronics = () => <div><h3>Electronics Section</h3><p>Browse our electronic products.</p></div>;
const Fashion = () => <div><h3>Fashion Section</h3><p>Explore our fashion collection.</p></div>;

const Q20 = () => {
    return (
        <Router>
            <div>
                <h3>Nested Routes App (Q20)</h3>
                <nav>
                    <Link to="/">Home</Link> | 
                    <Link to="/about">About</Link> | 
                    <Link to="/products">Products</Link>
                </nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/products" element={<Products />}>
                        <Route path="electronics" element={<Electronics />} />
                        <Route path="fashion" element={<Fashion />} />
                    </Route>
                </Routes>
            </div>
        </Router>
    );
};

export default Q20;