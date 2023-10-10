const User = require('../models/users');
const Review = require('../models/reviews');

module.exports.employee_list = async function(req,res){

    if(req.user.isAdmin){
        let allEmployee = await User.find({});
        return res.render("employee_list",{
            title : "Employee List",
            allEmployee : allEmployee,
            user : req.user,
        });

    }
    return res.redirect('back');
}

module.exports.setReviews = async (req,res) =>{
    if(req.user.isAdmin){
        let allEmployee = await User.find({});
        return res.render("assign_review",{
            title : "Assigh Review",
            allEmployee : allEmployee,
            user : req.user,
        });

    }
    return res.redirect('back');
}


module.exports.assignReview = async (req,res) =>{
    if(req.user && req.user.isAdmin && req.body.revievee != req.body.reviewer){
        await User.findByIdAndUpdate(req.body.reviewer,{$addToSet : {toReview : req.body.revievee}});
    }
    return res.redirect('back');
}


module.exports.receiveReview = async (req,res) =>{
    console.log(req.body);
    if(req.body.review){
        let review = await Review.create(req.body);
        await User.findByIdAndUpdate(req.body.reviewer, {$pull : {toReview :  req.body.reviewee}});
        await User.findByIdAndUpdate(req.body.reviewee,{$addToSet :{revievs: review.id}})
    }
    return res.redirect("back")
}

module.exports.allReviews = async (req,res) =>{

    let reviews = await Review.find({}).populate("reviewee").populate('reviewer');
    console.log(reviews)
    return res.render("all_reviews",{
        title : "All Reviews",
        allReviews : reviews
    })
}

module.exports.updateName = async (req,res) =>{
    let user = await User.findById(req.body.employee_id);

    if(req.user && req.user.isAdmin && user && user.name != req.body.name){
        await User.findByIdAndUpdate(req.body.employee_id,{$set : {name : req.body.name}})
    }
    return res.redirect('back');
}