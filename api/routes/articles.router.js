import express from 'express'
import { veryWellMindScraper } from '../scrapers/veryWellMind.js'
import { psychCentralScraper } from '../scrapers/psychCentralScraper.js'
import { getAllArticles, getArticle, getSavedArticles, switchSavedStatus } from '../controllers/article.controllers.js'
import authenticate from '../middleware/authentication.js'

const router = express.Router()
router.post("/veryWellMind", veryWellMindScraper)
router.post("/psychCentral", psychCentralScraper)
router.get("/getArticles",authenticate,getAllArticles)
router.put("/toggleSave/:articleId",authenticate,switchSavedStatus)
router.get("/getSavedArticles",authenticate,getSavedArticles)
router.get("/getArticle/:id",authenticate,getArticle)

export default router