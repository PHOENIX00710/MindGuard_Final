import jwt from 'jsonwebtoken'

export const genTokenAndSetCookie = (id, res) => {
    // To convert Mongo Object ID to string
    if (id.toString() === "" || id.toString() === null)
        return "Error in token generation"
    try {
        const token = jwt.sign(id.toString(), process.env.JWT_KEY)
        console.log(token);
        res
            .cookie("jwt", token, {
                secure: true, // Only send cookie over HTTPS
                httpOnly: true, // The cookie cannot be accessed by client-side JS
                sameSite: 'None' // Essential for cross-site usage
            })
        return
    } catch (error) {
        return "Error"
    }
}