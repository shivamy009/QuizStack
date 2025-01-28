import { generateToken } from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import Admin from "../models/adminModel.js";
// import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  // console.log(generateToken)
  const { firstName,lastName, email, password,role } = req.body;
  try {
    if (!firstName ||!lastName || !email || !password ||  !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const user = await User.findOne({ email });
    const admin = await Admin.findOne({ email });

    if (user || admin) return res.status(400).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let newUser;
    const profileImage = `https://robohash.org/${encodeURIComponent(firstName + lastName)}.png` ||  "https://via.placeholder.com/150";
    if(role==='admin'){
        newUser = new Admin({
         firstName,
         lastName,
         email,
         role,
         password: hashedPassword,
         profilePic: profileImage
       });
    }else{
        newUser = new User({
         firstName,
         lastName,
         email,
         role,
         password: hashedPassword,
         profilePic: profileImage
       });

    }

    if (newUser) {
      // generate jwt token here
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        role: newUser.role,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



export const login = async (req, res) => {
  const { email, password,role } = req.body;
  try {
    const user = await User.findOne({ email });
    const admin = await Admin.findOne({ email });
    
    if (role==='user' && !user) {
      return res.status(400).json({ message: "No user found with this email" });
    }

    if (role==='admin' && !admin) {
      return res.status(400).json({ message: "No admin found with this email" });
    }
   let isPasswordCorrect;
   if(user){
     isPasswordCorrect = await bcrypt.compare(password, user.password);
    }else{
       isPasswordCorrect = await bcrypt.compare(password, admin.password);
   }

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    
    if(user){

        generateToken(user._id, res);
    }else{
        generateToken(admin._id, res);

    }
    
    if(user){
        res.status(200).json({
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          profilePic: user.profilePic,
        });
    }else{
        res.status(200).json({
          _id: admin._id,
          firstName: admin.firstName,
          lastName: admin.lastName,
          email: admin.email,
          role: admin.role,
          profilePic: admin.profilePic,
        });

    }
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

