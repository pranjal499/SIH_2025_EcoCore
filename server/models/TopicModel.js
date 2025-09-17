import { Schema, model } from 'mongoose';

const topicSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    youtubeURL: {
        type: String,
        required: true,
    },
    module: {
        type: Schema.Types.ObjectId,
        required: true,
        ref:'Module'
        },
    videoNotes: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'videoNote'
    },
    questions: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Quiz"
    },],
});

const Topic = model('Topic', topicSchema);

export default Topic;