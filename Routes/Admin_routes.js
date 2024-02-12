const express = require("express");
const adminMiddleware = require("../middleware/admin"); // Import adminAuth middleware
const router = express.Router();
const { Admin, Book } = require("../db/models"); // Import Admin and Book models

// POST route for Admin signup
router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Validate required fields
    if (!username || !password) {
        return res.status(400).json({ message: 'Missing required credentials (username and password)' });
    }

    // Creating new Admin
    try {
        await Admin.create({
          username: username,
          password: password
        });
        res.json({ msg: "Admin created successfully" });
      } catch (error) {
        console.error('Error creating admin:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
});


// POST route for creating a new Book (requires admin authentication)
router.post('/Books', adminMiddleware, async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;

    // Creating new Book
    try {
        const newBook = await Book.create({
          title: title,
          description: description,
          price: price
        });
        res.json({
          msg: 'Book created successfully',
          BookId: newBook._id
        });
      } catch (error) {
        console.error('Error creating book:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
});


// GET route for fetching all Books (requires admin authentication).
router.get('/Books', adminMiddleware,async(req, res)=>{

    // Show all available books
    try {
        const response = await Book.find({});
        res.json({ Books: response });
      } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
});

module.exports=router;