import { NotFoundError, requireAuth } from '@xuefengxu/common'
import express, { Request, Response } from 'express'
import { News } from '../models/news'

const router = express.Router()

router.get('/api/query/news/latest', requireAuth, async (req: Request, res: Response) => {
    const news = await News.find().sort({ 'date': -1 }).limit(4)
    if (!news) {
        throw new NotFoundError()
    }
    // console.log(news)
    res.status(200).send(news)
})

export { router as getLatestNewsRouter }
