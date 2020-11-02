import express from 'express'

const router = express.Router()

router.post('/api/admin/signout', (req, res) => {
    req.session = null
    res.status(200).send({})
})

export { router as adminSignoutRouter }