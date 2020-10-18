import express, { Request, Response } from 'express'
import { requireAuth, validateRequest } from '@xuefengxu/common'

const router = express.Router()

router.get('/api/query/posts/:id', requireAuth, async (req: Request, res: Response) => {

    res.status(201).send({ 'id': req.params.id })
})

export { router as getOnePostRouter }