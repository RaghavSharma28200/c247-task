const User = require("../models/userModal");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const signup = async (req, res, next) => {
  try {
    const { email, password, passwordConfirm, username } = req.body;
    const isExist = await User.find({ email });
    if (isExist.length) {
      throw new Error("Email allready exist!", 409);
    }

    if (password !== passwordConfirm) {
      throw new Error("Password and Confirm Password does not match!", 403);
    }

    let userObj = {
      email: email.toLowerCase(),
      password: await bcrypt.hash(password, 12),
      username,
    };

    const newUser = await User.create(userObj);

    const token = signToken(newUser._id);

    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
      message: "account created!",
    });
  } catch (error) {
    res.status(error.status || 400).send({
      status: error.status || 400,
      message: error.message || "Some Error Occured",
    });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user === null) {
      throw new Error("User not exist!", 401);
    }
    const verify = await bcrypt.compare(password, user.password);
    if (!verify) {
      throw new Error("Invalid Email or Password", 401);
    }

    const token = signToken(user._id);

    res.status(200).send({
      status: 200,
      token,
      data: user,
      message: "Login successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(error.status || 400).send({
      status: error.status || 400,
      message: error.message || "Some Error Occured",
    });
  }
};

const protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      throw new Error("You are not logged in Please Login To get Access", 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      throw new Error(
        "The user belonging to this token does no longer exist",
        401
      );
    }

    req.user = currentUser;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      error.message = "Session Expired Please Login again!";
    }
    res.status(error.status || 400).send({
      status: error.status || 400,
      message: error.message || "Some Error Occured",
    });
  }
};

const getMyProfile = async (req, res, next) => {
  try {
    res.status(200).send({
      status: 200,
      message: "fetch successfully",
      data: req.user || {},
    });
  } catch (error) {
    res.status(error.status || 400).send({
      status: error.status || 400,
      message: error.message || "Some Error Occured",
    });
  }
};

module.exports = {
  signup,
  login,
  protect,
  getMyProfile
};
