import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import { errorHandler, currentUser } from '@xuefengxu/common'
import cookieSession from 'cookie-session';

import { getOnePostRouter } from './routers/get-one-post'
import { getAllPostsRouter } from './routers/get-all-posts';
import { getCatePostsRouter } from './routers/get-cate-posts';
import { getLatestPostsRouter } from './routers/get-latest-posts';
import { getAuthorPostsRouter } from './routers/get-author-posts'
import { getOneNewsRouter } from './routers/get-one-news';
import { getOneCommentRouter } from './routers/get-one-comment';
import { getAllCommentsRouter } from './routers/get-all-comments';
import { getAllNewsRouter } from './routers/get-all-news';
import { getLatestNewsRouter } from './routers/get-latest-news';

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
app.use(getAllPostsRouter)
app.use(getCatePostsRouter)
app.use(getLatestPostsRouter)
app.use(getAuthorPostsRouter)
app.use(getOneNewsRouter)
app.use(getOneCommentRouter)
app.use(getAllCommentsRouter)
app.use(getAllNewsRouter)
app.use(getLatestNewsRouter)

app.use(errorHandler)

export { app }