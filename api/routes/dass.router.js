import express from 'express'
import { dassHanlder } from '../controllers/dass.controller.js'
import authenticate from '../middleware/authentication.js'

const router=express.Router()

router.post("/submitDASS",authenticate,dassHanlder)

export default router