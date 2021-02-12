const User = require("../models/user");

exports.createOrUpdateUser = async (req, res) => {
  //destructure user object passed in req.user
  const { name, picture, email } = req.user;
  //if user already exists we update
  //if user does not exist we create in database
  //findOneAndUpdate({search criteria}, {what you are updating}, new: get recently updated info vice old info)

  /*
    OPTIONS /api/create-or-update-user 204 4.273 ms - 0
    (node:17146) DeprecationWarning: Mongoose:
    `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated.
     See: https://mongoosejs.com/docs/deprecations.html#findandmodify

    */

  const user = await User.findOneAndUpdate(
    { email: email },
    { name: email.split("@")[0], picture: picture },
    { returnOriginal: false }
  );

  if (user) {
    console.log("USER UPDATED", user);
    res.json(user); //user found so response has user
  } else {
    const newUser = await new User({
      email,
      name: email.split("@")[0],
      picture,
    }).save(); //create user and save in database
    console.log("USER CREATED", newUser);
    res.json(newUser);
  }
};
