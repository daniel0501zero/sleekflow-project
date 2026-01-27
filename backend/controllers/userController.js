import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();
export const registerUser = async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;
        console.log(req.body)
        if (!name || !email || !mobile || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already register" })
        }

        const hashed = await bcrypt.hash(password, 8);
        const user = new User({ name, email, mobile, password: hashed })
        await user.save();

        res.status(201).json({ message: "User Registered Successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error" })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not exists" })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" })
        }
        const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "Lax",
            maxAge: 1 * 15 * 60 * 1000
        })
        res.status(200).json({
            message: "Login Successful",
            token: token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error", error })
    }
}

export const getUserDetails = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Token missing" })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded)
        const user = await User.findOne({_id: decoded.userID})
        if (!user) {
            return res.status(404).json({ message: "User not Found" })
        }
        res.status(200).json({name: user.name, email: user.email, mobile: user.mobile, _id: user._id});
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server error", error })
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("token", "", {
            httpOnly: true,
            secure: true,
            sameSite: "Lax",
            expires: new Date(0)
        })

        res.status(200).json({ message: "Logout Successful" })
    } catch (error) {
        res.status(500).json({ message: "Logout Successful", error })
    }
}