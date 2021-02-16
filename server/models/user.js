const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        index: true,
    },
    role: {//admin or user(subscriber)
        type: String,
        default: 'subscriber',

    },
    cart: {
        type: Array,
        default: [],
    },
    address: String,
    //wishlist: [{type: ObjectId, ref: "Product"}],//Product model needed
},
{timestamps: true}
);//adding timestamps so that date/update date autopopulate

//mongoDB is schema-less but mongoose helps

module.exports = mongoose.model('User', userSchema);//export as User model