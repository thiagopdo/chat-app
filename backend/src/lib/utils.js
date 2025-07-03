import jwt from "jsonwebtoken";

export function generateToken(userId, res) {
 const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
  expiresIn: "7d",
 });

 res.cookie("jwt", token, {
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  httpOnly: true, //prevent xss
  sameSite: "strict", //prevent csrf
  secure: process.env.NODE_ENV !== "development",
 });

 return token;
}
