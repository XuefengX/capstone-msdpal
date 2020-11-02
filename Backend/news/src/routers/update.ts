import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import {
    validateRequest,
    NotFoundError,
    requireAuth,
    NotAuthorizedError
} from '@xuefengxu/common'
import { News } from '../models/news'
import { NewsUpdatedPublisher } from '../events/publishers/news-updated-publisher'
import { natsWrapper } from '../nats-wrapper'
import { adminAuth } from '@xuefengxu/common'

const router = express.Router()

router.put('/api/news/:id', adminAuth, [
    body('title')
        .not()
        .isEmpty()
        .withMessage('Title is required'),
    body('contents')
        .not()
        .isEmpty()
        .withMessage('Content is required'),
    body('category')
        .not()
        .isEmpty()
        .withMessage('Category is required')
], validateRequest, async (req: Request, res: Response) => {
    const news = await News.findById(req.params.id)
    if (!news) {
        throw new NotFoundError()
    }
    const {
        title,
        contents,
        category,
        img
    } = req.body
    news.set({
        title: title,
        contents: contents,
        category: category,
        img: img
    })
    await news.save()

    new NewsUpdatedPublisher(natsWrapper.client).publish({
        id: news.id,
        title: news.title,
        category: news.category,
        contents: news.contents,
        img: news.img,
        version: news.__v!
    })
    // console.log(`new newss: ${news}`)
    res.status(200).send(news)
})

export { router as updateNewsRouter }