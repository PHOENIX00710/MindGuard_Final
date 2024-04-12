import jwt from "jsonwebtoken"
import userModel from '../models/userSchema.js'

const authenticate = async (req, res, next) => {
    try {
        console.log(req.cookies);
        const token = req.cookies.jwt;
        console.log(token)
        let userId = jwt.verify(token, process.env.JWT_KEY);
        const user = await userModel.findById(userId).select('-password')
        if (user) {
            req.user = user
            next()
        }
        else
            res.json({
                message: "Cookie not found"
            })
    }
    catch (error) {
        res.json({
            message: "Error in Authentication"
        })
    }
}

export default authenticate