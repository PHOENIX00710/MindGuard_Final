import postModel from "../models/postSchema.js";

export const createPost = async (req, res, next) => {
    const userId = req.user._id
    const { content } = req.body;
    if (!(userId && content)) {
        return res.status(401).json({ message: "Missing fields" })
    }

    try {
        const newPost = new postModel({
            user: userId,
            content: content,
            author: req.user.name
        })

        await newPost.save()

        res.status(200).json({
            success: true,
            message: "New Post Created Successfully",
            newPost
        })
    }
    catch (error) {
        next()
    }
}

export const getAllPosts = async (req, res, next) => {
    const start = parseInt(req.query.start) || 0
    const limit = parseInt(req.query.limit) || 12
    try {
        const posts = await postModel.find({
            ...(req.query.userId && { user: req.query.userId })
        })
            .skip(start)
            .limit(limit)
            .sort({ updatedAt: -1 }) //-1 for descending

        res.json({
            success: true,
            posts
        })
    }
    catch (error) {
        next()
    }
}

export const getIndividualPost = async (req, res, next) => {
    const postID = req.params.postId
    try {
        const post = await postModel.findById(postID)
        let liked = post.likes.indexOf(req.user._id.toString()) !== -1;
        console.log(liked,req.user);
        res.status(200).json({
            success: true,
            liked,
            post
        })
    }
    catch (error) {
        next()
    }
}

export const deletePost = async (req, res, next) => {
    const postID = req.params.postId
    try {
        const post = await postModel.findByIdAndDelete(postID)
        res.status(200).json({
            success: true,
            post
        })
    }
    catch (error) {
        next()
    }
}

export const updatePost = async (req, res, next) => {
    const postID = req.params.postId
    const { content } = req.body
    try {
        const post = await postModel.findByIdAndUpdate(postID, {
            title: title,
            content: content
        })
        res.status(200).json({
            success: true,
            post
        })
    }
    catch (error) {
        next()
    }
}