import { NotFoundError, requireAuth } from '@xuefengxu/common'
import express, { Request, Response } from 'express'
import { Comment } from '../models/comment'

const router = express.Router()

router.get('/api/query/comments/:postId', requireAuth, async (req: Request, res: Response) => {
    const comments = await Comment.find({ postId: req.params.postId }).sort({ 'date': -1 })
    if (!comments) {
        throw new NotFoundError()
    }
    // console.log(comments)
    res.status(200).send(comments)
})

export { router as getAllCommentsRouter }
