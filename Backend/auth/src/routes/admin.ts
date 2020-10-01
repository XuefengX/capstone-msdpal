import express from 'express'
import { adminAuth } from '../middlewares/admin-auth'

const router = express.Router()

router.post('/api/admin/login', adminAuth, (req, res) => {
    console.log("Administrator logged in")
    res.status(200).send({ userStatus: "admin" })
})

export { router as adminRouter }