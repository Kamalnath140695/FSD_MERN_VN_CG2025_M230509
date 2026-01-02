import React from "react";
import bookstore from "../assets/bookstore.jpeg";
import science from "../assets/science.jpeg";
import biographies from "../assets/biographics.jpeg";
import childrenBooks from "../assets/children books.jpeg";

function Home() {
  return (
    <>
      <nav className="navbar">
        <img src={bookstore} alt="BookVerse Logo" className="logo" />
        <a href="/" className="logoname">
          BookVerse
        </a>

        <ul className="nav-links">
          <li className="red">
            <a href="/user">User</a>
          </li>
          <li className="green">
            <a href="/seller">Seller</a>
          </li>
          <li className="orange">
            <a href="/adminsignup">Admin</a>
          </li>
        </ul>
      </nav>

      <div className="shape">
        <h1>Your Gateway to Infinite Stories</h1>
        <h4>
          Discover captivating books, connect with passionate sellers, and fuel
          your love for reading — only at BookVerse.
        </h4>
        <button className="btm">Start Exploring</button>
      </div>

      <div className="shape1">
        <h1>Explore by Category</h1>

        <div className="categories-container">
          <div className="box1">
            <div className="img1">📚</div>
            <p className="text1">Fiction</p>
          </div>

          <div className="box1">
            <img src={science} alt="Science books" className="img1" />
            <p className="text1">Science</p>
          </div>

          <div className="box1">
            <img src={biographies} alt="Biography books" className="img1" />
            <p className="text1">Biographies</p>
          </div>

          <div className="box1">
            <img src={childrenBooks} alt="Children books" className="img1" />
            <p className="text1">Children's Books</p>
          </div>
        </div>

        <div className="btm3">
          <button className="btm2">Contact Us</button>
        </div>
      </div>
    </>
  );
}

export default Home;