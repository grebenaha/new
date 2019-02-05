const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SmsSchema = new Schema({
    content: {
        required: true,
        type: String
    },
    recipient: {
        required: true,
        type: String
    }
}, { timestamps: true })

SmsSchema
    .virtual('url')
    .get(function () {
        return '/smsAdmin/daily_messages/' + this._id;
    });

//Export model
module.exports = mongoose.model('daily_messages', SmsSchema);