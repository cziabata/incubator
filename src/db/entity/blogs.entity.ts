import mongoose from 'mongoose'
import { IBlogView } from '../../@types/blogs'

export const BlogSchema = new mongoose.Schema<IBlogView>({
    id: { type: String, require: true },
    name: { type: String, require: true },
    description: { type: String, require: true },
    websiteUrl: { type: String, require: true },
    isMembership: { type: Boolean, require: true },
    createdAt: { type: String, require: true, default: new Date().toISOString() },
})
export const BlogModel = mongoose.model<IBlogView>('blogs', BlogSchema)