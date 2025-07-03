import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";

export async function signup(req, res) {
 const { fullName, email, password } = req.body;
 console.log(fullName, email, password);
 try {
  if (!fullName || !email || !password) {
   return res.status(400).json({ message: "All fields are required" });
  }

  if (password.length < 6) {
   return res
    .status(400)
    .json({ message: "Password must be at least 6 characters long" });
  }
  const user = await User.findOne({ email });
  if (user) return res.status(400).json({ message: "User already exists" });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
   fullName,
   email,
   password: hashedPassword,
  });
  if (newUser) {
   //generate jwt token here if needed
   generateToken(newUser._id, res);
   await newUser.save();

   res.status(201).json({
    _id: newUser._id,
    fullName: newUser.fullName,
    email: newUser.email,
    profilePic: newUser.profilePic,
   });
  } else {
   return res.status(400).json({ message: "User creation failed" });
  }
 } catch (error) {
  console.log(`Error in signup: ${error.message}`);
  res.status(500).json({ message: "Internal server error" });
 }
}

export async function login(req, res) {
 const { email, password } = req.body;

 try {
  const user = await User.findOne({ email });
  if (!user) {
   return res.status(400).json({ message: "Invalid credentials" });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
   return res.status(400).json({ message: "Invalid credentials" });
  }

  generateToken(user._id, res);

  res.status(200).json({
   _id: user._id,
   fullName: user.fullName,
   email: user.email,
   profilePic: user.profilePic,
  });
 } catch (error) {
  console.log(`Error in login: ${error.message}`);
  res.status(500).json({ message: "Internal server error" });
 }
}

export function logout(_, res) {
 try {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "Logged out successfully" });
 } catch (error) {
  console.log(`Error in logout: ${error.message}`);
  res.status(500).json({ message: "Internal server error" });
 }
}

export async function updateProfile(req, res) {
 try {
  const { profilePic } = req.body;
  const userId = req.user._id;

  if (!profilePic) {
   return res.status(400).json({ message: "Profile picture is required" });
  }

  const uploadResponse = await cloudinary.uploader.upload(profilePic);
  const updateUser = await User.findByIdAndUpdate(
   userId,
   { profilePic: uploadResponse.secure_url },
   { new: true },
  );

  res.status(200).json(updateUser);
 } catch (error) {
  console.log(`Error in updateProfile: ${error.message}`);
  res.status(500).json({ message: "Internal server error" });
 }
}

export async function checkAuth(req, res) {
 try {
  res.status(200).json(req.user);
 } catch (error) {
  console.log(`Error in checkAuth: ${error.message}`);
  res.status(500).json({ message: "Internal server error" });
 }
}
