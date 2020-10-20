import mongoose from 'mongoose'
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'

interface CommentAttrs {
    postId: string,
    contents: string,
    author: string,
    authorId: string,
    authorEmail: string,
    img: string
}

interface CommentDoc extends mongoose.Document {
    postId: string,
    contents: string,
    author: string,
    authorId: string,
    authorEmail: string,
    img: string
}

interface CommentModel extends mongoose.Model<CommentDoc> {
    build(attrs: CommentAttrs): CommentDoc
}

const commentSchema = new mongoose.Schema({
    postId: {
        type: String,
        required: true
    },
    contents: {
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

commentSchema.plugin(updateIfCurrentPlugin)

commentSchema.statics.build = (attrs: CommentAttrs) => {
    return new Comment(attrs)
}

const Comment = mongoose.model<CommentDoc, CommentModel>('Comment', commentSchema)

export { Comment }