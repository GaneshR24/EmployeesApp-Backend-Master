const express = require("express");
const router = express.Router();

//Importing controller
const {register, signin, signout} = require("../controllers/auth.controller");

router.post('/register', register );

router.post('/signin', signin);

router.get('/signout', signout);

module.exports = router;