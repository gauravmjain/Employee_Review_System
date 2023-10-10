const User = require("../models/users");
const Review = require("../models/reviews");
module.exports.create = async function(req,res){
    try{
        if(req.body.password != req.body.confirm_password){
            console.log("Error! Passwords are wrong")
            return res.redirect('back');
        }
        let user = await User.findOne({email: req.body.email});
        if(!user){
            await User.create(req.body);
            req.flash('success',"Account Created");
            return res.redirect('/');
        }   
        else{
            return res.redirect('back'); 
        }  

    }catch(err){
        return res.redirect('/users/sign-in');
    }
}

module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        if(req.xhr){
            return res.status(200).json({
                data :{},
                message : "sign in data"    
            })
        }
        return res.redirect("/users/profile")
    }

    return res.render('sign_up',{
        title : "My sign up page",
    })
}

module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        if(req.xhr){
            
            return res.status(200).json({
                data :{},
                message : "sign in data"    
            })
        }
        
        return res.redirect("/users/profile")
    }
    return res.redirect('/');
}

module.exports.createSession = async function(req,res){
    return res.redirect('/')
}

module.exports.destroySession = function(req,res,next){
    req.logout(function(err){
        if(err){return next(err);}
        return res.redirect('/');
    });
   
}

module.exports.review_page = async (req,res) => {
    try{
        
        let toReview = await User.find({'_id' : { $in : req.user.toReview} })
        let myReviews = await Review.find({'_id' : {$in : req.user.revievs}}).populate("reviewer")
        console.log((myReviews));
        return res.render('review_page',{
            title : "Review page",
            user : req.user,
            toReview : toReview,
            myReviews : myReviews
        })
    }
    catch(err){
        console.log("Error at user controller habit",err);
        return res.redirect('back');
    }
}
module.exports.changeStatus = async (req,res)=>{
   
    if(req.xhr && req.user && req.user.isAdmin){
        let user = await User.findById(req.body.id);
        if(user.id != req.user.id){
            if(user.isAdmin){
                await User.findByIdAndUpdate(user.id, {$set : {isAdmin : false}})
            }else{
                await User.findByIdAndUpdate(user.id, {$set : {isAdmin : true}})
            }
            user = await User.findById(req.body.id);
            return res.status(200).json({
                data :{user: user},
                message : "Change status  suuccefully"
            })
        }       
    }
    return res.redirect('back'); 
}



module.exports.destroyUser = async (req,res) =>{
    if(req.xhr && req.query && req.query.id){
        // console.log(req.user)
        if(req.query.id != req.user.id && req.user.isAdmin){
            let user = await User.findByIdAndDelete(req.query.id);
            await Review.deleteMany({"reviewee" : req.query.id});
            await Review.deleteMany({"reviewer" : req.query.id});
            return res.redirect('back');
            // return res.status(200).json({
            //     data : {
            //         user : "User is hear"
            //     },
            //     message : "User destroyed Successfully"
            // })
        } 

    }
    return res.redirect('back');
    
}