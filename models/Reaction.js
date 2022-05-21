const { Schema, model } = require("mongoose");
// const { moveMessagePortToContext } = require("worker_threads");
const moment = require('moment');

// Reaction Schema - Subdocument of Thought Schema
const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format('MM DD, YYYY [a] hh:mm a'),
        }
    
    });

    // const Reaction = model('Reaction', ReactionSchema);

    module.exports = ReactionSchema;