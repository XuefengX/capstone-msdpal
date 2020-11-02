import express from 'express'
import { Invit } from '../models/invitations'
import { BadRequestError, adminAuth } from '@xuefengxu/common'

const router = express.Router()

router.post('/api/admin/get_user', adminAuth, async (req, res) => {
    const { uid } = req.body
    const existingUser = await Invit.findOne({ uid })
    if (!existingUser) {
        throw new BadRequestError("No invitation code found")
    }
    res.status(200).send({ existingUser })
})

export { router as getCodeRouter }