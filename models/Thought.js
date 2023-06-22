const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction.js');
const dateFormat = require('../utils/DateFormat.js');

const thoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            require: 'Leave a thought!',
            minLenght: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
        userName: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    },
);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.lenght;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;