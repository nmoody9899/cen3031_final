const express = require('express');

const router = express.Router();

//middlewares
const { authCheck } = require('../middlewares/auth');

//make sure to destructure here or the application crashes because it gets
//object instead of function in call to router.get which requires a callback function
//controller
const { createOrUpdateUser } = require('../controllers/auth');

//we have user in client, now we need to check on back
//moving anonymous function to controllers auth
//middleware used to check token validity
//Process: request to endpoint -> authCheck (middleware runs) -> createOrUpdateUser (controller runs)
router.post("/create-or-update-user", authCheck, createOrUpdateUser);

//need to export from here to use in server.js
module.exports = router;