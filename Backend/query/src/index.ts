import mongoose from 'mongoose'
import { app } from './app'
import { natsWrapper } from './nats-wrapper'
import { PostCreatedListener } from './events/listeners/post-created-listener'
import { PostUpdatedListener } from './events/listeners/post-updated-listener'
import { PostDeletedListener } from './events/listeners/post-deleted-listener'
import { NewsCreatedListener } from './events/listeners/news-created-listener'
import { NewsDeletedListener } from './events/listeners/news-deleted-listener'
import { NewsUpdatedListener } from './events/listeners/news-updated-listener'
import { CommentCreatedListener } from './events/listeners/comment-created-listener'
import { CommentUpdatedListener } from './events/listeners/comment-updated-listener'
import { CommentDeletedListener } from './events/listeners/comment-deleted-listener'

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error("JWT key must be defined")
    }
    if (!process.env.ADMIN_KEY) {
        throw new Error("Admin key must be defined")
    }
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI must be defined")
    }
    if (!process.env.NATS_CLIENT_ID) {
        throw new Error('NATS_CLIENT_ID must be defined');
    }
    if (!process.env.NATS_URL) {
        throw new Error('NATS_URL must be defined');
    }
    if (!process.env.NATS_CLUSTER_ID) {
        throw new Error('NATS_CLUSTER_ID must be defined');
    }
    try {
        await natsWrapper.connect(
            process.env.NATS_CLUSTER_ID,
            process.env.NATS_CLIENT_ID,
            process.env.NATS_URL
        );

        natsWrapper.client.on('close', () => {
            console.log('NATS connection closed!');
            process.exit();
        });
        process.on('SIGINT', () => natsWrapper.client.close());
        process.on('SIGTERM', () => natsWrapper.client.close());

        new PostCreatedListener(natsWrapper.client).listen()
        new PostUpdatedListener(natsWrapper.client).listen()
        new PostDeletedListener(natsWrapper.client).listen()
        new NewsCreatedListener(natsWrapper.client).listen()
        new NewsDeletedListener(natsWrapper.client).listen()
        new NewsUpdatedListener(natsWrapper.client).listen()
        new CommentCreatedListener(natsWrapper.client).listen()
        new CommentUpdatedListener(natsWrapper.client).listen()
        new CommentDeletedListener(natsWrapper.client).listen()

        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log("Connected to MongoDB")
    } catch (err) {
        console.error(err)
    }
}

app.listen(3000, () => {
    console.log('Query service start running. Listen to port 3000')
})

start()