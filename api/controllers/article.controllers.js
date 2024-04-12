import articleModel from "../models/articleSchema.js"
import savedArticleModel from "../models/savedArticleSchema.js";
import { generateError } from "../utils/customErrorGenerator.js";
import mongoose from 'mongoose';

export const getAllArticles = async (req, res, next) => {
    const start = parseInt(req.query.start) || 0;
    const limit = parseInt(req.query.limit) || 12;
    const sortDirection = req.query.sortBy === "asc" ? 1 : -1;

    // Starting with an empty match stage to apply conditional filtering
    let matchStage = {};

    if (req.query.category) {
        matchStage.category = req.query.category;
    }

    if (req.query.searchTerm) {
        matchStage.$or = [
            { title: { $regex: req.query.searchTerm, $options: "si" } },
            { overview: { $regex: req.query.searchTerm, $options: "si" } }
        ];
    }

    try {
        const articles = await articleModel.aggregate([
            { $match: matchStage },
            { $sample: { size: limit + start } },
            { $sort: { updatedAt: sortDirection } },
        ]).then(result => result.slice(start, start + limit)); // Manually apply 'skip' logic

        res.json({
            success: true,
            count: articles.length,
            data: articles
        });
    } catch (error) {
        res.json({
            success: false,
            message: error
        });
    }
}


export const getSavedArticles = async (req, res, next) => {
    try {
        const userId = req.user._id
        const articles = await savedArticleModel.find({
            user: userId
        })
        res.status(200).json(articles);
    }
    catch (error) {
        next()
    }

}

export const switchSavedStatus = async (req, res, next) => {
    try {
        const userId = req.user._id
        const articleId = req.params.articleId

        const article = await savedArticleModel.findOne({
            user: userId,
            article: articleId
        });

        if (article) {
            console.log(article);
            await savedArticleModel.findByIdAndDelete(article._id);
            return res.json({
                success: true,
                message: "Article Unsaved"
            })
        }
        else {
            const save = new savedArticleModel({
                user: userId,
                article: articleId,
            })

            await save.save()

            res.json({
                success: true,
                message: "Article Saved",
                save
            })
        }
    }
    catch (error) {
        next(generateError(error.errorCode, error.errorMessage))
    }
}

export const getArticle = async (req, res, next) => {
    const id = req.params.id;
    // Check if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid article ID format." });
    }
    try {
        const article = await articleModel.findById(id);
        if (!article) {
            return res.status(404).json({ success: false, message: "No Article Found" });
        }
        res.status(200).json({
            success: true,
            article
        });
    } catch (e) {
        console.error(e);
        next(e); // Make sure to pass the error to your error handling middleware
    }
}

