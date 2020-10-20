import express, { Request, Response } from 'express'
import { News } from '../models/news'
import {
    requireAuth,
    NotAuthorizedError,
    NotFoundError
} from '@xuefengxu/common'
import { NewsDeletedPublisher } from '../events/publishers/news-deleted-publisher'
import { natsWrapper } from '../nats-wrapper'

const router = express.Router()

router.delete('/api/news/:id', requireAuth, async (req: Request, res: Response) => {
    const news = await News.findById(req.params.id)
    if (!news) {
        throw new NotFoundError()
    }
    await News.findByIdAndDelete(req.params.id)
    // if (await news.findById(req.params.id)) {
    //     console.log(`Unable to delete ${news}`)
    // }
    new NewsDeletedPublisher(natsWrapper.client).publish({
        id: req.params.id,
        version: news.__v!
    })
    res.status(200).send({})
})


export { router as NewsDeletedRouter }