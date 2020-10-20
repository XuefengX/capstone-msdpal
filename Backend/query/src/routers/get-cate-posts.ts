import { NotFoundError, requireAuth } from '@xuefengxu/common'
import express, { Request, Response } from 'express'
import { Post } from '../models/post'

const router = express.Router()

router.get('/api/query/posts/category/:cate', requireAuth, async (req: Request, res: Response) => {
    const posts = await Post.find({ category: req.params.cate }).sort({ 'date': -1 })
    if (!posts) {
        throw new NotFoundError()
    }
    // console.log(posts)
    res.status(200).send(posts)
})

export { router as getCatePostsRouter }
