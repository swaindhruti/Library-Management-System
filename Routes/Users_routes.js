const express = require("express");
const userMiddleware = require("../middleware/users"); // Import userAuth middleware
const router = express.Router();
const { User, Book } = require("../db/models"); // Import User and Book models

// POST route for User signup
router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Validate required fields
    if (!username || !password) {
        return res.status(400).json({ message: 'Missing required credentials (username and password)' });
    }

    // Creating new User
    try {
        await User.create({
          username: username,
          password: password
        });
        res.json({ msg: "User created successfully" });
      } catch (error) {
        console.error('Error creating user:', error);
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


// POST route for user to purchase a book (requires user authentication)
router.post('/purchaseBook/:BookId', userMiddleware, async (req, res) => {
    const bookId = req.params.BookId;
    const username = req.headers.username;

    // Push bookId of purchased books
    try {
      await User.updateOne({
        username: username
      }, {
        $push: {
          purchasedBooks: bookId
        }
      });
      res.json({ message: "Purchase complete!" });
    } catch (err) {
      console.error('Error updating user book purchase:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
});

// GET route for a user to retrieve their purchased books (requires user authentication)
router.get('/purchasedBooks', userMiddleware, async (req, res) => {
    const username = req.headers.username;

    // GET request to show all the purchased books
    try {
      const user = await User.findOne({ username: username });
      const purchasedBooks = await Book.find({
        _id: {
          $in: user.purchasedBooks
        }
      });
  
      res.json({ Books: purchasedBooks });
    } catch (error) {
      console.error('Error fetching purchased books:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;