import express from 'express'
import { googleSignup, signin, signout, signup } from '../controllers/user.controller.js'

const router = express.Router()

router.post("/signin", signin)
router.post("/signup", signup)
router.post("/google", googleSignup)
router.get("/signout", signout)

export default router