import mongoose from 'mongoose';

const { Schema } = mongoose;

const PlatformSchema = new Schema({
    hashtags: {
        type: [String],
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    platforms: {
        x: PlatformSchema,
        instagram: PlatformSchema,
        linkedin: PlatformSchema,
        facebook: PlatformSchema
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Post', PostSchema);