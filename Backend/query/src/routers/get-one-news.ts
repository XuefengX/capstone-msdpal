import express, { Request, Response } from 'express'
import { NotFoundError, requireAuth, validateRequest } from '@xuefengxu/common'
import { News } from '../models/news'

const router = express.Router()

router.get('/api/query/news/id/:id', async (req: Request, res: Response) => {
    const news = await News.findById(req.params.id)
    if (!news) {
        throw new NotFoundError()
    }
    res.status(200).send(news)
})

export { router as getOneNewsRouter }