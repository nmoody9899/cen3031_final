const admin = require("../firebase");
const User = require("../models/user");

//check to see if token is valid
//this is middleware
exports.authCheck = async (req, res, next) => {
  //console.log(req.headers);//token
  //verify token with firebase to make sure token is valid

  try {
    //validate token using firebase-admin
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);
    //console.log('FIREBASE USER in server_auth_middlewares check', firebaseUser);
    //now make user available to controller (using req object property addition)
    req.user = firebaseUser;

    next();
  } catch (error) {
    //console.log(`server_auth_middlewares error: ${error}`);
    res.status(401).json({
      error: "Invalid or expired token",
    });
  }
};

exports.adminCheck = async (req, res, next) => {
  //get currently logged in user's email
  const { email } = req.user;

  const adminUser = await User.findOne({email: email}).exec();

  if(adminUser.role !== 'admin'){
    res.status(403).json({
      err: 'admin resource. access denied.',
    });

  }
  else{
    next();
  }
};