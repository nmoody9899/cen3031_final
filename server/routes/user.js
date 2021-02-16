const express = require('express');

const router = express.Router();

//we have user in client, now we need to check on back
router.get("/user", (req, res) => {
  res.json({
    data: "hey you hit user API endpoint",
  });
});

//need to export from here to use in server.js
module.exports = router;