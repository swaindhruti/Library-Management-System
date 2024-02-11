const express = require("express")
const adminMiddleware = require("../middleware/admin")
const router = express.Router()
const { Admin, Book } = require("../db/models")

router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    await Admin.create({
        username: username,
        password: password
    })

    res.json({
        msg: "Admin created successfully"
    })
})

router.post('/Books', adminMiddleware, async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;

    const new_Book = await Book.create({
        title: title,
        description: description,
        price: price
    })

    console.log(new_Book);

    res.json({
        msg: 'Book created successfully',
        BookId: new_Book._id
    })
})

router.get('/Books', adminMiddleware,async(req, res)=>{
    const response = await Book.find({})
    res.json({
        Books:response
    })
})

module.exports=router;