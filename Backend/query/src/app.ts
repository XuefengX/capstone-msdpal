import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import { errorHandler, currentUser } from '@xuefengxu/common'
import cookieSession from 'cookie-session';

import { getOnePostRouter } from './routers/get-one-post'

const app = express()
app.set('trust proxy', true);
app.use(json())
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test'
    })
);
app.use(currentUser)

app.use(getOnePostRouter)


app.use(errorHandler)

export { app }