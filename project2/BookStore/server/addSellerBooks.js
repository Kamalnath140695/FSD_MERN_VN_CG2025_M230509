const mongoose = require('mongoose');
const Book = require('./models/Seller/BookSchema');
require('dotenv').config();

const sellerId = '695765c5f7441e17141c58b3';
const sellerName = 'kamalnath murugan';

const booksForSeller = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self Help",
    price: 399,
    description: "Build good habits and break bad ones.",
    itemImage: "https://m.media-amazon.com/images/I/51B7kuCk5jL._SY445_SX342_.jpg"
  },
  {
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    genre: "Finance",
    price: 349,
    description: "Learn how money works for the rich.",
    itemImage: "https://m.media-amazon.com/images/I/81BE7eeKzAL._SY522_.jpg"
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Fiction",
    price: 299,
    description: "A magical story of destiny and dreams.",
    itemImage: "https://m.media-amazon.com/images/I/71aFt4+OTOL._SY522_.jpg"
  },
  {
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    genre: "Motivation",
    price: 279,
    description: "Mindset secrets for wealth and success.",
    itemImage: "https://m.media-amazon.com/images/I/61y04z8SKEL._SY522_.jpg"
  },
  {
    title: "Ikigai",
    author: "Hector Garcia",
    genre: "Self Help",
    price: 320,
    description: "Discover your purpose in life.",
    itemImage: "https://m.media-amazon.com/images/I/814vxdN4bpL._SY522_.jpg"
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    genre: "Programming",
    price: 699,
    description: "Best practices for writing clean code.",
    itemImage: "https://m.media-amazon.com/images/I/41xShlnTZTL._SY445_SX342_.jpg"
  },
  {
    title: "You Don't Know JS",
    author: "Kyle Simpson",
    genre: "Programming",
    price: 499,
    description: "Deep understanding of JavaScript.",
    itemImage: "https://m.media-amazon.com/images/I/71T4+VbQCgL._SY522_.jpg"
  },
  {
    title: "The Psychology of Money",
    author: "Morgan Housel",
    genre: "Finance",
    price: 399,
    description: "How people think about money.",
    itemImage: "https://m.media-amazon.com/images/I/81cpDaCJJCL._SY522_.jpg"
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    genre: "Productivity",
    price: 360,
    description: "Focus deeply in a distracted world.",
    itemImage: "https://m.media-amazon.com/images/I/71YvdW6OmjL._SY522_.jpg"
  },
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    genre: "History",
    price: 550,
    description: "A brief history of humankind.",
    itemImage: "https://m.media-amazon.com/images/I/713jIoMO3UL._SY522_.jpg"
  },
  {
    title: "The Power of Habit",
    author: "Charles Duhigg",
    genre: "Self Help",
    price: 330,
    description: "Why habits exist and how to change them.",
    itemImage: "https://m.media-amazon.com/images/I/81YkqyaFVEL._SY522_.jpg"
  },
  {
    title: "Zero to One",
    author: "Peter Thiel",
    genre: "Startup",
    price: 370,
    description: "Building startups that create the future.",
    itemImage: "https://m.media-amazon.com/images/I/71m-Kq4XDtL._SY522_.jpg"
  },
  {
    title: "Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    genre: "Self Help",
    price: 350,
    description: "A different approach to happiness.",
    itemImage: "https://m.media-amazon.com/images/I/71QKQ9mwV7L._SY522_.jpg"
  },
  {
    title: "Harry Potter – Philosopher's Stone",
    author: "J.K. Rowling",
    genre: "Fantasy",
    price: 450,
    description: "The beginning of the magical journey.",
    itemImage: "https://m.media-amazon.com/images/I/81YOuOGFCJL._SY522_.jpg"
  },
  {
    title: "The Monk Who Sold His Ferrari",
    author: "Robin Sharma",
    genre: "Motivation",
    price: 299,
    description: "Success through spiritual wisdom.",
    itemImage: "https://m.media-amazon.com/images/I/81svE0KahnL._SY522_.jpg"
  },
  {
    title: "Wings of Fire",
    author: "A.P.J. Abdul Kalam",
    genre: "Biography",
    price: 280,
    description: "Journey of a visionary leader.",
    itemImage: "https://m.media-amazon.com/images/I/81YI6dNS2eL._SY522_.jpg"
  },
  {
    title: "Do Epic Shit",
    author: "Ankur Warikoo",
    genre: "Motivation",
    price: 299,
    description: "Practical life lessons.",
    itemImage: "https://m.media-amazon.com/images/I/71s0GuOBqzL._SY522_.jpg"
  },
  {
    title: "The 5 AM Club",
    author: "Robin Sharma",
    genre: "Productivity",
    price: 390,
    description: "Own your morning, elevate life.",
    itemImage: "https://m.media-amazon.com/images/I/71zytzrg6lL._SY522_.jpg"
  }
];

const addBooksToSeller = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing books for this seller
    await Book.deleteMany({ sellerId: sellerId });
    console.log('Cleared existing books for seller');

    // Add seller info to books
    const booksWithSeller = booksForSeller.map(book => ({
      ...book,
      sellerId: sellerId,
      sellerName: sellerName,
      inventory: { quantity: 10, location: 'Warehouse' }
    }));

    // Insert books
    await Book.insertMany(booksWithSeller);
    console.log(`Added ${booksWithSeller.length} books for seller: ${sellerName}`);

    mongoose.connection.close();
  } catch (error) {
    console.error('Error adding books:', error);
    mongoose.connection.close();
  }
};

addBooksToSeller();