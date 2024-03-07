/* eslint-disable no-unused-vars */
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");
const JWT_SECRET_KEY = "DUNIYAMAIKYACHALRAHAHAIAJKAL";

// ROUTE 1: POST API to create a user api/auth/create-user
router.post(
  "/create-user",
  [
    body("name", "enter a valid name min 3 characters").isLength({ min: 3 }),
    body("email", "enter a valid email address").isEmail(),
    body("password", "enter a valid password min 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    // if there are error, return bad request
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array() });
    }

    // Check weather the user already exists
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({error: "user with same email already exists" });
      }
      const salt = bcrypt.genSaltSync(10);
      const secPass = bcrypt.hashSync(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET_KEY);
      //   res.json(user);
      let success = true;
      res.json({success, authtoken: authToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({error:"Internal server error occured"});
    }
  }
);


// ROUTE 2: POST API to login a user api/auth/login
router.post(
  "/login",
  [
    body("email", "enter a valid email address").isEmail(),
    body("password", "enter the password").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    // if there are error, return bad request
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { email, password } = req.body;
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "inccorect credentials" });
      }
      const passwordCompare = bcrypt.compareSync(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ error: "inccorect credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET_KEY);
      let success = true;
      res.json({success, authtoken: authToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({error:"Internal server error occured"});
    }
  }
);


// ROUTE 3: POST API to get user details api/auth/getuser
router.post("/getuser", fetchuser, async (req, res) => {
  const userId = req.user.id;
  try {
    let success = true;
    const user = User.findById(userId)
      .select('id name email date')
      .then((user) => {
        res.send(success,user);
      });
  } catch (error) {
    let success = false;
    console.error(error);
    res.status(500).json(success,"Internal server error occured");
  }
});
module.exports = router;
