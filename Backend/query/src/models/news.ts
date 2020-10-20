import mongoose from 'mongoose'
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'

export interface NewsAttrs {
    title: string,
    contents: string,
    category: string,
    img: string
}

interface NewsDoc extends mongoose.Document {
    title: string,
    contents: string,
    category: string,
    img: string,
    date: Date
}

interface NewsModel extends mongoose.Model<NewsDoc> {
    build(attrs: NewsAttrs): NewsDoc
}

const newsSchema = new mongoose.Schema({
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
        }
    }
})

newsSchema.plugin(updateIfCurrentPlugin)

newsSchema.statics.build = (attrs: NewsAttrs) => {
    return new News(attrs)
}

const News = mongoose.model<NewsDoc, NewsModel>('News', newsSchema)

export { News }