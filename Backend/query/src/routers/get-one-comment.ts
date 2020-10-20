import express, { Request, Response } from 'express'
import { NotFoundError, requireAuth, validateRequest } from '@xuefengxu/common'
import { Comment } from '../models/comment'

const router = express.Router()

router.get('/api/query/comments/:postId/:id', requireAuth, async (req: Request, res: Response) => {
    const comment = await Comment.findById(req.params.id)
    if (!comment) {
        throw new NotFoundError()
    }
    res.status(200).send(comment)
})

export { router as getOneCommentRouter }