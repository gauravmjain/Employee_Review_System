const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password :{
        type : String,
        required : true
    },
    isAdmin : {
        type : Boolean,
        default : false
    },
    name : {
        type : String,
        required : true
    },  
    toReview : [
        {
            type : mongoose.Schema.Types.ObjectId,
            req : 'Users'
        }
    ],
    revievs : [{
        type : mongoose.Schema.Types.ObjectId,
        req : 'Review'
    }]
},{
    timestamps : true
})

const User = mongoose.model ("User",userSchema);

module.exports = User;