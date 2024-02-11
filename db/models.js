const mongoose = require("mongoose");
const zod = require("zod")

mongoose.connect('mongodb://localhost:27017/backend_sys_OC/lib', function (err) {
    if (err) {
        console.log('Unable to connect to the server. Please start the server. Error:');
    } else {
        console.log('Connected to Server successfully!');
    }
});

const AdminSchema = new mongoose.Schema({
    username: zod.string().email({ message: 'Invalid email format' }),
    password: zod.string().min(8, { message: 'Password must be at least 8 characters long' })
})

const UserSchema = new mongoose.Schema({
    username: zod.string().email({ message: 'Invalid email format' }),
    password: zod.string().min(8, { message: 'Password must be at least 8 characters long' }),
    purchasedCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
})

const BookSchema = new mongoose.Schema({
    title: zod.string().min(2,{message: 'The title should contain 2 characters'}),
    description: zod.string().min(3,{message:'The description should contain 3 characters'}),
    price: zod.number().minValue(100,{message :'The minimum value of the bookk should be 100'})
})

const Admin = mongoose.model('Admin', AdminSchema);
const Book = mongoose.model('Book', BookSchema);
const User = mongoose.model('User', UserSchema);

module.exports={
    Admin,
    Book,
    User
}