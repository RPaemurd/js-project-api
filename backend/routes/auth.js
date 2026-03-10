/* User logs in 
Server creates a token with user ID
Server sends back the token to frontend
Frontend saves the token (ex localStorage) 
At next request frontend sends token manually
Server verifies token, does not need to remember anything */

import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {

    const { email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Both email and password are required"});
    }

    const existingUser = await User.findOne({ email });
    if (existingUser){
        return res.status(400).json({ message: "Email is already used"});
    }

    const hadhedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        email: email, 
        password: hadhedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "New User was created"});
});

router.post("/login", async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Both email and password are required"});
    }

    const user = await User.findOne({ email });

    if (!user){
        return res.status(400).json({ message: "Wrong email or password"});
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch){
        return res.status(400).json({ message: "Wrong email or password"});
    }

    const token = jwt.sign(
        { userId: user._id },  // payload 
        process.env.JWT_SECRET,
        { expiresIn: '24h' }   
    );

    res.status(200).json({
        message: "Logged In",
        token: token
    });
});

export default router