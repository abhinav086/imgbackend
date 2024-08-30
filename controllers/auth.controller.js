import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

// Signup
export const Signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the email is already in use
    const isEmail = await User.findOne({ email });
    if (isEmail) {
      return res.status(400).json({
        status: false,
        message: "Email already in use",
      });
    }

    // Hash the password before saving it
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({
      userCreated: true,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// Login
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        isAuthenticated: false,
        userExisted: false,
        message: "User does not exist",
      });
    }

    // Compare the password with the hashed password stored in the database
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        isAuthenticated: false,
        userExisted: true,
        message: "Incorrect password",
      });
    }

    // Create a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      isAuthenticated: true,
      userExisted: true,
      token,
      message: "Login successful",
    });
  } catch (error) {
    res.status(500).json({
      isAuthenticated: false,
      message: error.message,
    });
  }
};

// Save Data
export const SaveData = async (req, res) => {
  try {
    const { email, html, css, js, title, desc } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        DataSaved: false,
        message: "User not found",
      });
    }

    user.mycode.push({
      code: {
        title,
        desc,
        html,
        css,
        js,
      },
    });

    await user.save();
    res.status(200).json({
      DataSaved: true,
      message: "Data saved successfully",
    });
  } catch (error) {
    res.status(500).json({
      DataSaved: false,
      message: error.message,
    });
  }
};

// Get Data
export const GetData = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        isFetched: false,
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      isFetched: false,
      message: error.message,
    });
  }
};

// Get Card
export const GetCard = async (req, res) => {
  try {
    const { _id } = req.body;
    const user = await User.findOne({ "mycode._id": _id });

    if (!user) {
      return res.status(404).json({
        isFetched: false,
        message: "Code not found",
      });
    }

    const codeObject = user.mycode.id(_id);

    if (!codeObject) {
      return res.status(404).json({
        isFetched: false,
        message: "Code not found",
      });
    }

    res.status(200).json({
      isFetched: true,
      code: codeObject,
    });
  } catch (error) {
    res.status(500).json({
      isFetched: false,
      message: error.message,
    });
  }
};

// Get All Data
export const GetAllData = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      isFetched: false,
      message: error.message,
    });
  }
};
