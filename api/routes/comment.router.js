import express from 'express'
import authenticate from '../middleware/authentication.js'
import { addComment, fetchComments, removeComment, toggleLikes, toggleUpvote } from '../controllers/reactions.controller.js'

const router = express.Router()

router.get("/getComments/:postId", authenticate, fetchComments)
router.put("/toggleLike/:postId", authenticate, toggleLikes)
router.post("/addComment/:postId", authenticate, addComment)
router.delete("/removeComment/:commentId", authenticate, removeComment)
router.put("/toggleUpvote/:commentId", authenticate, toggleUpvote)

export default router