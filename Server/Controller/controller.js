const repo = require('./../DataBase/mongoDBUserData');
const repo1 = require('./../DataBase/mongoDBUserUploadImg');
const util = require('./../DataBase/IdGenerator');

exports.userRegistration = async (req, res) => {
    try {
        let userId = await util.userId();
        const userRegistrationData = {
            userId : userId,
            name: req.body.name,
            password: req.body.pwd,
            email: req.body.email,
            account: "public",
            friendRequests : []            
        }
        const entry = await repo.create(userRegistrationData);
        res.status(201).json({"userId": userId})
    }
    catch(err) {
        console.log(err)
    }
}

exports.userData = async (req, res) => {
    try {
        let userId = req.body.userId;
        const user = await repo.find({ userId: userId},{password:0});
        // console.log(user)
        if(user.length > 0) {
            res.status(201).json({"userData": user})
        }
        else {
            res.status(400).json({"message": "Incorrect Email or Password"});
        }
    }
    catch (err) {
        res.status(402).json({"message": "Server Error, try after sometime"})
    }
}

exports.userLogin = async (req, res) => {
    try {
        let email = req.body.email;
        let pwd = req.body.pwd;
        pwd = pwd.toString();
        const user = await repo.find({ email: email, password: pwd });
        // console.log(user)
        if(user.length > 0) {
            res.status(201).json({"userId": user[0].userId, "name": user[0].name})
        }
        else {
            res.status(400).json({"message": "Incorrect Email or Password"});
        }
    }
    catch (err) {
        res.status(402).json({"message": "Server Error, try after sometime"})
    }
}

exports.giveImgs = async (req, res) => {
    try {
        const images = await repo1.find({}).sort({createdAt: 'desc'});
        res.status(201).json({"Images": images})
    }
    catch (err) {
        console.log(err)
    }
}

exports.giveImgsOne = async (req, res) => {
    try {
        const image = await repo1.find({userId: req.body.id}).sort({createdAt: -1}).limit(1)
        res.status(201).json({"Image": image})
    }
    catch (err) {
        console.log(err)
    }
}

exports.imgLikes = async (req, res) => {
    try {
        let likeList = req.body.likes;
        const likes = await repo1.updateOne({_id: req.body.id}, {
            likes: likeList
        });
        if(likes.ok == 1) {
            
            res.status(201).json({"Likes": likes});
        }
        else {
            res.status(401).json({"Error": "Like failed"})
        }

    }
    catch(err) {
        console.log(err)
    }
}

exports.updateProfile = async (req, res) => {
    try {
       
        const updatedProfile = await repo.updateMany({userId: req.body.id}, {
            name: req.body.name,
            email: req.body.email,
            account: req.body.account
        });
        const updatePosts = await repo1.updateMany({userId: req.body.id}, {
            userName: req.body.name,
            account: req.body.account
        });
        if(updatedProfile.ok == 1) { 
            res.status(201).json({"updatedProfile": updatedProfile});
        }
        else {
            res.status(401).json({"Error": "Update Failed"})
        }

    }
    catch(err) {
        console.log(err)
    }
}

exports.updateFriendRequests = async (req, res) => {
    try {

        const updatedProfile = await repo.updateMany({name: req.body.to},{ $addToSet: { friendRequests: req.body.from  } } );
        if(updatedProfile.ok == 1) { 
            res.status(201).json({"updatedProfile": updatedProfile});
        }
        else {
            res.status(401).json({"Error": "Update Failed"})
        }

    }
    catch(err) {
        console.log(err)
    }
}












// exports.userUploadImg = async (req, res) => {
//     try {
//         console.log(req.body.image)
        
//         const uploadImg = {
//             userId : req.body.userId,
//             image: {
//                 data: req.body.image,
//                 contentType: 'image/png'
//             }
//         }
//         console.log(uploadImg);
//         let data = await repo1.create(uploadImg);
//         console.log(data)
//         if(data) {
//             res.status(201).send("Successfully Uploaded");
//         }
//         else {
//             res.status(400).send("Failed to Upload");
//         }
//     }
//     catch (err) {
//         res.status(402).json({"message": "Server Error, try after sometime"})
//         console.log(err)
//     }
// }