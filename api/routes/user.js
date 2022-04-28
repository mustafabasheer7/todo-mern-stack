const router = require("express").Router();
const User = require("../models/User");
const { verifyJWTTokenAndAuth } = require("./jwtVerificationMethods");
const CryptoJS = require("crypto-js");

// UPDATE USER INFORMATION
router.put("/:id", verifyJWTTokenAndAuth, async (req, res) => {
  if (req.body.password) {
    // Encrypting password
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.CRYPTO_JS_PASSPHRASE
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(201).json({
      message: "User successfully updated",
      ...updatedUser._doc,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred and the user could not be updated",
      error: error.message,
    });
  }
});

// DELETE A USER
router.delete("/:id", verifyJWTTokenAndAuth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "User successfully deleted!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Cannot delete user!",
      error: error.message,
    });
  }
});

// GET A SPECIFIC USER
router.get("/:id", verifyJWTTokenAndAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...otherData } = user._doc;
    res.status(200).json({
      message: "User was successfully fetched!",
      ...otherData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Cannot find the user!",
      error: error.message,
    });
  }
});

module.exports = router;
