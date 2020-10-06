import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import { errorHandler, currentUser } from '@xuefengxu/common'
import cookieSession from 'cookie-session';

import { createPostsRouter } from './routes/new'
import { updateRouter } from './routes/update'
import { deleteRouter } from './routes/delete'

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

app.use(createPostsRouter)
app.use(updateRouter)
app.use(deleteRouter)

app.use(errorHandler)

export { app }