import User from "../models/userSchema.js"
import bcrypt from "bcryptjs"
import { genTokenAndSetCookie } from "../utils/generateToken.js"
import { generateError } from "../utils/customErrorGenerator.js"

export const signup = async (req, res, next) => {
    try {
        let { name, email, password, confirmPassword } = req.body
        const userEmail = await User.findOne({ email }).select("-password")
        if (userEmail) {
            genTokenAndSetCookie(userEmail._id, res)
            return res.status(200).json({ message: "Account already exists", userEmail })
        }
        if (!password) {
            password = Math.random().toString(36).slice(-8)
        }
        if (confirmPassword) {
            if (password !== confirmPassword) {
                return next(generateError(400, 'Passwords do not match'))
            }
        }
        //HASH password here
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        })
        if (newUser) {
            //Generate JWT token
            genTokenAndSetCookie(newUser._id, res)
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                status: "User Created Successful"
            })
        }
        else
            next(generateError(400, "Failed to create a new user"))

    }
    catch (err) {
        next()
    }
}

export const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")
        if (!user || !isPasswordCorrect) {
            return next(generateError(400, "Invalid username or password"))
        }
        genTokenAndSetCookie(user._id, res)
        delete user.password
        res.status(200).json({ user, message: "Logged In Successfully!" })
    }
    catch (err) {
        next()
    }
}

export const signout = async (req, res, next) => {
    try {
        res
            .status(200)
            .cookie("jwt", "", { maxAge: 0 })
            .json({ message: 'Logged out successfully' })
    }
    catch (err) {
        next()
    }
}

export const googleSignup = async (req, res, next) => {
    const { name, email } = req.body;
    console.log(name, email);
    if (!name || !email || email === '' || name === '') {
        return (
            next(generateError(401, 'Error in entered data'))
        )
    }
    const password = Math.random().toString(36).slice(-8)
    const hashedPassword = await bcrypt.hash(password, 10)

    const userExists = await User.findOne({ email });
    if (userExists) {
        console.log(userExists);
        genTokenAndSetCookie(userExists._id, res)
        delete userExists.password
        res.status(200).json({ user: userExists, message: "Logged In Successfully!" })
        return
    }

    try {
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        })
        await newUser.save()
        console.log(newUser);
        genTokenAndSetCookie(newUser._id, res)
        delete newUser.password
        res.status(200).json({ user: newUser, message: "Logged In Successfully!" })
    }
    catch (e) {
        console.log(e);
        return next(generateError(402, "Error in Sign Up!!"))
    }

}
