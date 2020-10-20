import { NotFoundError, requireAuth } from '@xuefengxu/common'
import express, { Request, Response } from 'express'
import { Post } from '../models/post'

const router = express.Router()

router.get('/api/query/posts/authorId/:authorId', requireAuth, async (req: Request, res: Response) => {
    const posts = await Post.find({ authorId: req.params.authorId }).sort({ 'date': -1 })
    if (!posts) {
        throw new NotFoundError()
    }
    // console.log(posts)
    res.status(200).send(posts)
})

router.get('/api/query/posts/authorEmail/:authorEmail', requireAuth, async (req: Request, res: Response) => {
    const posts = await Post.find({ authorEmail: req.params.authorEmail }).sort({ 'date': -1 })
    if (!posts) {
        throw new NotFoundError()
    }
    // console.log(posts)
    res.status(200).send(posts)
})

router.get('/api/query/posts/author/:author', requireAuth, async (req: Request, res: Response) => {
    const posts = await Post.find({ author: req.params.author }).sort({ 'date': -1 })
    if (!posts) {
        throw new NotFoundError()
    }
    // console.log(posts)
    res.status(200).send(posts)
})

export { router as getAuthorPostsRouter }
