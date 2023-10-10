const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    review : {
        type : String,
        required : true
    },
    reviewee :{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    reviewer : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    }
},{
    timestamps : true,
})

const Review = mongoose.model('Review',reviewSchema);


module.exports = Review;