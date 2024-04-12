import puppeteer from "puppeteer";
import articleModel from "../models/articleSchema.js";

//10c0e938c951f8e5edd8d58b940ce52a7d91fdbd

export const veryWellMindScraper = async (req, res) => {
    const browser = await puppeteer.launch({ headless: true });

    const categories = ['anxiety-7508391', 'depression-4157261'];
    for (let category of categories) {
        const page = await browser.newPage(); // Ensure a new page is created for each category.
        await page.goto(`https://www.verywellmind.com/${category}`);
        try {
            let articles = await page.evaluate((category) => {
                return Array.from(document.querySelectorAll('.mntl-card-list-items'), (e) => {
                    const title = e.querySelector('.card__byline')?.getAttribute('data-byline') || 'No title';
                    const content = e.querySelector('.card__title-text')?.textContent || 'No content';
                    const link = e?.href || 'https://www.verywellmind.com/'; // Ensure you're selecting an anchor element for the link.
                    const img = e.querySelector('.card__img')?.getAttribute('data-src') || 'https://media.istockphoto.com/id/1337766466/photo/man-suffering-depression-and-feeling-negative-emotions.jpg?s=612x612&w=0&k=20&c=6XL3vxDQ-8v5zgVaGqvafNl8cFGT4SCm2lki4rXawYc=';
                    const categoryName = category.split('-')[0]; // Use a different variable name if needed.
                    return { title, content, link, img, category: categoryName };

                });
            }, category); // Pass the category variable correctly.
            articles = articles.filter(a => a.content != 'No content' || a.title != 'No title');
            for (let article of articles) {
                try {
                    const newArticle = new articleModel({
                        title: article.title.trim(),
                        overview: article.content.trim(),
                        link: article.link,
                        image: article.img,
                        category: article.category
                    })
                    await newArticle.save()
                    console.log(`Entry for ${article.title} added successfully`);
                }
                catch (error) {
                    console.log(error)
                    res.json(error).status(500)
                }
            }
            await page.close(); // Close the page after each iteration.
        }
        catch (e) {
            console.log(e);
        }
    }
    await browser.close(); // Close the browser after processing all categories.
    res.json({
        success: true,
        message: "Articles added"
    })
};

