import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { User } from '../models/user'
import { BadRequestError, currentUser, NotAuthorizedError, requireAuth, validateRequest } from '@xuefengxu/common'
import jwt from 'jsonwebtoken'
const router = express.Router()

router.put('/api/users/update/:id', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Password must be between 4 and 20 characters'),
    body('uid')
        .not()
        .isEmpty()
        .withMessage('Uid cannot be empty'),
    body('username')
        .not()
        .isEmpty()
        .withMessage('Username cannot be empty'),
    body('firstName')
        .not()
        .isEmpty()
        .withMessage('First name cannot be empty'),
    body('lastName')
        .not()
        .isEmpty()
        .withMessage('Last name cannot be empty'),
    body('gradYear')
        .not()
        .isEmpty()
        .withMessage('Graduation year cannot be empty')
        .isNumeric()
        .withMessage('Grad year must be number')
], validateRequest, currentUser, requireAuth, async (req: Request, res: Response) => {
    const {
        email,
        password,
        uid,
        username,
        firstName,
        lastName,
        gradYear,
        placement,
        intro,
        avatar
    } = req.body
    const existingUser = await User.findById(req.params.id)
    if (req.currentUser!.id != req.params.id) {
        throw new NotAuthorizedError()
    }
    if (!existingUser) {
        throw new BadRequestError("Cannot find user")
    }

    existingUser.set({
        email: email,
        password: password,
        username: username,
        firstName: firstName,
        lastName: lastName,
        gradYear: gradYear,
        placement: placement,
        intro: intro,
        avatar: avatar,
        uid: uid
    })
    await existingUser.save()

    // generate JWT
    const userJwt = jwt.sign({
        id: existingUser.id,
        email: existingUser.email,
        username: existingUser.username
    }, process.env.JWT_KEY!)

    // store it in the cookie session
    req.session = {
        jwt: userJwt
    }
    // console.log(`Create a user ${email}`)
    res.status(200).send(existingUser)
})

export { router as updateRouter }