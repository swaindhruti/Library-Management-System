const express = require("express")
const userMiddleware = require("../middleware/users")
const router = express.Router()
const { User, Book } = require("../db/models")

router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    await User.create({
        username: username,
        password: password
    })

    res.json({
        msg: "User created successfully"
    })
})

router.get('/Books', userMiddlewareMiddleware, async (req, res) => {
    const response = await Book.find({})
    res.json({
        Books: response
    })
})

router.post('/purchaseBook/:BookId', userMiddleware, async(req, res)=>{
    const BookId = req.params.BookId;
    const username = req.headers.username;

    try{
        await User.updateOne({
            username: username
        },{
            "$push":{
                purchasedBooks: BookId
            }
            
        })
    }catch(err){
        console.log(err)
    }

    res.json({
        message: "Purchase complete!"
    })
})

router.get('/purchasedBooks', userMiddleware, async ( req, res) =>{
    const user = await User.findOne({
        username: req.headers.username
    })

    console.log(user.purchasedBooks)
    const Books = await Book.find({
        _id:{
            "$in": user.purchasedBooks
        }
    })
    res.json({
        Books: Books
    })
})


module.exports = router;