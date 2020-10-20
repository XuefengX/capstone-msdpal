import express, { Request, Response } from 'express'
import { NotFoundError, requireAuth, validateRequest } from '@xuefengxu/common'
import { Post, PostAttrs } from '../models/post'
import { Comment, CommentAttrs } from '../models/comment'

const router = express.Router()

router.get('/api/query/posts/id/:id', requireAuth, async (req: Request, res: Response) => {
    const post = await Post.findById(req.params.id)
    if (!post) {
        throw new NotFoundError()
    }

    const comments = await Comment.find({ postId: req.params.id }).sort({ 'date': -1 })
    const commentsMap: CommentAttrs[] = []
    comments.forEach(comment => {
        commentsMap.push(comment)
    })

    res.status(200).send({
        post: post,
        comments: commentsMap
    })
})

export { router as getOnePostRouter }