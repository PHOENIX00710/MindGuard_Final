import express from 'express'
import authenticate from '../middleware/authentication.js'
import { createPost, deletePost, getAllPosts, getIndividualPost, updatePost } from '../controllers/post.controller.js'

const router=express.Router()

router.post("/createPost",authenticate,createPost)
router.get("/viewPost/:postId",authenticate,getIndividualPost)
router.get("/getAllPosts",getAllPosts)
router.delete("/removePost/:postId",authenticate,deletePost)
router.put('/updatePost/:postId',authenticate,updatePost)

export default router