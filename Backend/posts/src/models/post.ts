import mongoose from 'mongoose'
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'

interface PostAttrs {
    title: string,
    contents: string,
    category: string,
    author: string,
    authorId: string,
    authorEmail: string,
    img: string
}

interface PostDoc extends mongoose.Document {
    title: string,
    contents: string,
    category: string,
    author: string,
    authorId: string,
    authorEmail: string,
    img: string
}

interface PostModel extends mongoose.Model<PostDoc> {
    build(attrs: PostAttrs): PostDoc
}

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    contents: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    authorId: {
        type: String,
        required: true
    },
    authorEmail: {
        type: String,
        required: true
    },
    img: String,
    date: {
        type: Date,
        default: new Date()
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id
            delete ret.date
        }
    }
})

postSchema.plugin(updateIfCurrentPlugin)

postSchema.statics.build = (attrs: PostAttrs) => {
    return new Post(attrs)
}

const Post = mongoose.model<PostDoc, PostModel>('Post', postSchema)

export { Post }