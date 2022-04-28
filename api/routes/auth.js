const User = require("../models/User");
const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// REGISTER NEW USER
router.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    const { username, email, password } = req.body;

    // Encrypting password
    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      process.env.CRYPTO_JS_PASSPHRASE
    ).toString();

    const user = new User({
      username,
      email,
      password: encryptedPassword,
    });

    try {
      // Check if the user entered a valid email
      if (!errors.isEmpty() && errors.errors[0].param === "email") {
        return res.status(400).json({
          message: "Invalid email address. Please try again.",
        });
      }
      // Check if the user entered a valid password
      if (!errors.isEmpty() && errors.errors[0].param === "password") {
        return res
          .status(400)
          .json({ message: "Password must be longer than 6 characters." });
      }

      // Saving the user in db
      const newUser = await user.save();
      res.status(201).json({
        message: "User successfully created",
        ...newUser._doc,
      });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred and the user could not be created",
        error: error.message,
      });
    }
  }
);

// LOGIN
router.post("/login", async (req, res) => {
  const { username, password: enteredPassword } = req.body;

  try {
    // Finding user in db
    const user = await User.findOne({ username });

    // Check if user is in db
    if (!user) {
      res.status(401).json({
        message: "User not found",
      });
    }

    // Decrypting password
    const decryptedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.CRYPTO_JS_PASSPHRASE
    ).toString(CryptoJS.enc.Utf8);

    // Check if password is correct
    if (decryptedPassword !== enteredPassword) {
      res.status(401).json({
        message: "Incorrect credentials",
      });
    }

    // Creating JWT token
    const JWTtoken = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Hiding password from user
    const { password, ...otherData } = user._doc;

    res.status(201).json({
      message: "Login is successful",
      ...otherData,
      token: JWTtoken,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred and we cannot log you in!",
      error: error.message,
    });
  }
});

module.exports = router;
