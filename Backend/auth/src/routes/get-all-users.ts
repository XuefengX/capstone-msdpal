import express, { Request, Response } from 'express'
import { User } from '../models/user'
import { BadRequestError, currentUser, requireAuth } from '@xuefengxu/common'

const router = express.Router()

router.get('/api/users/all', currentUser, requireAuth, async (req: Request, res: Response) => {
    const users = await User.find({})
    if (!users) {
        throw new BadRequestError('Cannot get user list')
    }
    res.status(200).send(users)
})

export { router as getAllUsersRouter }