const express = require("express");
const myController = require("./../Controller/controller");
const path = require('path');
const multer  = require('multer');
const Img = require('./../DataBase/mongoDBUserUploadImg');
const fs = require('fs');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Controller/uploads')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' +file.originalname)
  }
})

const upload = multer({ storage: storage }).single('file')

const router = express.Router()

router.post('/',myController.userRegistration);
router.post('/login', myController.userLogin);
// router.post('/home', myController.userUploadImg);
router.post('/home', (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        res.sendStatus(500);
      }
      var new_img = new Img;
      console.log(req.body.userId)
      new_img.userId = req.body.userId;
      new_img.userName = req.body.name;
      new_img.likes = []
    new_img.image.data = fs.readFileSync(req.file.path)
    new_img.image.contentType = 'image/jpeg';
    new_img.save();
      res.status(201).json({"image": new_img});
    console.log('New image added to the db!');
    });
  }).get(function(req, res) {
   Img.find({},{userId:1, __v:0}).sort({createdAt: 'desc'});
   console.log("-----------")
    console.log(Img);
});

router.get('/imgs', myController.giveImgs);
router.post('/likes', myController.imgLikes);
router.put('/edit', myController.updateProfile);
router.post('/update', myController.giveImgsOne);
module.exports = router;