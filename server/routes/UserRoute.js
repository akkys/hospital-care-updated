const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/UserModel");
const jwtAuth = require("../util.js");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    let { name, email, password, passwordCheck } = req.body;

    if (!name) return res.status(400).json({ msg: "Please enter name" });

    if (!email) return res.status(400).json({ msg: "Please enter email" });
    if (password.length < 5) {
      return res
        .status(400)
        .json({ msg: "Password length must be greater than 5 characters" });
    }
    if (password !== passwordCheck)
      return res.status(400).json({ msg: "Both password must be same." });

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res.status(400).json({
        msg:
          "The account with this Id is already existed. Please try something else",
      });

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: passwordHash,
      name,
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //Validation

    if (!email)
      return res.status(400).json({ msg: "Please enter registered email" });
    if (!password)
      return res.status(400).json({ msg: "Please enter valid password" });
    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

    // const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
    if (user) {
      res.json({
        id: user._id,
        email: user.email,
        name: user.name,
        token: jwtAuth.getToken(user),
      });
    } else {
      res.status(401).json({ msg: "Invalid Email or Password" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
