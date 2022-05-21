const { Schema, model } = require("mongoose");
// const { moveMessagePortToContext } = require("worker_threads");
const moment = require('moment');
const reactionSchema = require('./Reaction')

// Thought Schema 
const ThoughtSchema = new Schema(
{
    thoughtText: {
        type: String,
        required: true, 
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format('MM DD, YYYY [a] hh:mm a'),
        
    },
    username: 
    {
        type: String,
        required: true
       },
    reactions: [
        reactionSchema
    ]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false,
    }
);

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;