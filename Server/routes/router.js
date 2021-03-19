const express = require("express");
const myController = require("./../Controller/controller");
const path = require('path');
const multer  = require('multer');
const Img = require('./../DataBase/mongoDBUserUploadImg');
const fs = require('fs');


const router = express.Router()

router.post('/',myController.userRegistration);
router.post('/login', myController.userLogin);
router.post('/home', (req, res) => {
  var new_img = new Img;
      new_img.userId = req.body.userId;
      new_img.userName = req.body.name;
      new_img.likes = []
      new_img.account = req.body.account;
      new_img.image = req.body.image

    new_img.save();
      res.status(201).json({"image": new_img});
    console.log('New image added to the db!');
  })

router.get('/imgs', myController.giveImgs);
router.post('/details', myController.userData);
router.post('/likes', myController.imgLikes);
router.put('/edit', myController.updateProfile);
router.post('/update', myController.giveImgsOne);
module.exports = router;