import express, { Request, Response } from 'express'
import { validateRequest } from '@xuefengxu/common'
import { adminAuth } from '@xuefengxu/common'
import { body } from 'express-validator'
import { News } from '../models/news'
import { NewsCreatedPublisher } from '../events/publishers/news-created-publisher'
import { natsWrapper } from '../nats-wrapper'

const router = express.Router()

router.post('/api/news', adminAuth, [
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
    const {
        title,
        contents,
        category,
        img
    } = req.body

    const news = News.build({
        title: title,
        contents: contents,
        category: category,
        img: img
    })

    await news.save()
    new NewsCreatedPublisher(natsWrapper.client).publish({
        id: news.id,
        title: news.title,
        category: news.category,
        contents: news.contents,
        img: news.img,
        version: news.__v!
    })

    res.status(201).send(news)
})

export { router as createNewsRouter }