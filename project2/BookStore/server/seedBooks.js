const mongoose = require('mongoose');
const Book = require('./models/Seller/BookSchema');
const Seller = require('./models/Seller/SellerSchema');
require('dotenv').config();

const sampleBooks = [
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
  }
];

const seedBooks = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Find or create a seller
    let seller = await Seller.findOne({ email: 'kamal@bookstore.com' });
    if (!seller) {
      seller = new Seller({
        name: 'Kamal Book Store',
        email: 'kamal@bookstore.com',
        password: '$2a$10$hashedpassword', // You should hash this properly
        isApproved: true
      });
      await seller.save();
      console.log('Created seller: Kamal Book Store');
    }

    // Clear existing books
    await Book.deleteMany({});
    console.log('Cleared existing books');

    // Add seller info to books
    const booksWithSeller = sampleBooks.map(book => ({
      ...book,
      sellerId: seller._id,
      sellerName: seller.name,
      inventory: { quantity: 10, location: 'Warehouse' }
    }));

    // Insert books
    await Book.insertMany(booksWithSeller);
    console.log(`Inserted ${booksWithSeller.length} books successfully`);

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding books:', error);
    mongoose.connection.close();
  }
};

seedBooks();