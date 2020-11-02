import express, { Request, Response } from 'express'
import { User } from '../models/user'
import { BadRequestError, currentUser, NotFoundError, requireAuth } from '@xuefengxu/common'

const router = express.Router()

router.get('/api/users/me', currentUser, requireAuth, async (req: Request, res: Response) => {
    const me = await User.findById(req.currentUser!.id)
    if (!me) {
        throw new BadRequestError("Cannot find user")
    }
    res.status(200).send(me)
})

export { router as getMeRouter }