import { NotFoundError, requireAuth } from '@xuefengxu/common'
import express, { Request, Response } from 'express'
import { Post } from '../models/post'

const router = express.Router()

router.get('/api/query/posts/latest/:num', requireAuth, async (req: Request, res: Response) => {
    const posts = await Post.find().sort({ 'date': -1 }).limit(Number(req.params.num))
    if (!posts) {
        throw new NotFoundError()
    }
    // console.log(posts)
    res.status(200).send(posts)
})

export { router as getLatestPostsRouter }
