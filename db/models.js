const mongoose = require("mongoose");

// Establishes a connection to the MongoDB database using the provided URI.
mongoose.connect('MONGO_URI');

//Schema for an Admin document in the database.
const AdminSchema = new mongoose.Schema({
    username: String,
    password: String
})


// Schema for a User document in the database.
const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchasedCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
})

// Schema for a User document in the database.
const BookSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: String
})

// Mongoose model for Admin, Book and User documents
const Admin = mongoose.model('Admin', AdminSchema);
const Book = mongoose.model('Book', BookSchema);
const User = mongoose.model('User', UserSchema);

module.exports={
    Admin,
    Book,
    User
}