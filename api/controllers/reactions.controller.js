import commentModel from "../models/commentSchema.js"
import postModel from "../models/postSchema.js"
import { generateError } from "../utils/customErrorGenerator.js"
import { io } from '../socket/socket.js';
import { log } from "console";

export const toggleLikes = async (req, res, next) => {
    const postId = req.params.postId
    let userId = req.user._id
    try {
        const currPost = await postModel.findById(postId)
        if (!currPost)
            return next(404, "Post Not Found!!")

        //Checking whether the user has already upvoted or not  
        let likes = currPost.likes
        let index = likes.indexOf(userId);
        if (index === -1) {
            //User is up voting for first time  
            likes.push(userId)
        }
        else {
            //User has already up voted so we are down voting by removing 1 element starting at position index    
            likes.splice(index, 1);
        }
        try {
            const updatedPost = await postModel.findByIdAndUpdate(
                postId,
                { likes: likes },
                { new: true }
            )

            await updatedPost.save()
            io.emit("updatedPost",updatedPost)
            console.log(updatedPost)
            res.status(200).send(updatedPost);
        }
        catch (error) {
            next(generateError(error.errorCode, error.message))
        }
    }
    catch (error) {
        next(generateError(error.errorCode, error.message))
    }
}

export const addComment = async (req, res, next) => {
    const { text } = req.body
    const postId = req.params.postId
    const userId = req.user._id
    console.log(text, postId, userId);
    try {
        const newComment = new commentModel({
            user: userId,
            post: postId,
            text: text,
            author: req.user.name
        })

        await newComment.save()
        try {
            const currPost = await postModel.findById(postId)
            if (!currPost) {
                return next(generateError(404, "No such Post exists"))
            }
            currPost.comments.push(userId)

            await currPost.save()

            res.json({
                success: true,
                message: "Comment Added Successfully",
                newComment
            })
        }
        catch (error) {
            next(generateError(error.errorCode, error.message))
        }
    }
    catch (error) {
        next(generateError(error.errorCode, error.message))
    }
}

export const fetchComments = async (req, res, next) => {
    const postId = req.params.postId;
    try {
        const comments = await commentModel.find({ post: postId })
        res.json({
            success: true,
            comments
        })
    }
    catch (error) {
        next(generateError(error.errorCode, error.message))
    }
}

export const removeComment = async (req, res, next) => {
    const id = req.params.commentId
    try {
        await commentModel.findByIdAndDelete(id)
        res.json({ success: true, message: "Comment Deleted" })
    }
    catch (e) {
        next(generateError(error.errorCode, error.message))
    }
}

export const toggleUpvote = async (req, res, next) => {
    const commentId = req.params.commentId
    let userId = req.user._id
    try {
        const currComment = await commentModel.findById(commentId)
        if (!currComment)
            return next(404, "Comment Not Found!!")

        //Checking whether the user has already upvoted or not  
        let upvotes = currComment.upvotes
        let index = upvotes.indexOf(userId);
        if (index === -1) {
            //User is up voting for first time  
            upvotes.push(userId)
        }
        else {
            //User has already up voted so we are down voting by removing 1 element starting at position index    
            upvotes.splice(index, 1);
        }
        try {
            const updatedComment = await commentModel.findByIdAndUpdate(
                commentId,
                { upvotes: upvotes },
                { new: true }
            )
            await updatedComment.save()
            res.status(200).send(updatedComment);
        }
        catch (error) {
            console.log(error);
            next(generateError(error.errorCode, error.message))
        }
    }
    catch (error) {
        console.log(error);
        next(generateError(error.errorCode, error.message))
    }
}