import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import { errorHandler } from '@xuefengxu/common'
import cors from 'cors'

import cookieSession from 'cookie-session';
import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'
import { adminRouter } from './routes/admin'
import { generateCodeRouter } from './routes/admin-generator'
import { getCodeRouter } from './routes/admin-get-code'
import { getUserInfoRouter } from './routes/get-user'


const app = express()
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.set('trust proxy', true);
app.use(json())
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test',
        httpOnly: false
    })
);
app.use(adminRouter)
app.use(generateCodeRouter)
app.use(getCodeRouter)
app.use(getUserInfoRouter)
app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

app.use(errorHandler)

export { app }