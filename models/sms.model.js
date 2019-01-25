const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SmsSchema = new Schema(
    {
        updatedAt: {type: Date},
        createdAt: {type: Date},
        content: {type: String, required: true, max: 100},
        recipient: {type: String, required: true, max: 100},
    }
);

SmsSchema
    .virtual('/recipient')
    .get(function () {
        return this.recipient;
    });

SmsSchema
    .virtual('/content')
    .get(function () {
        return this.content;
    });

SmsSchema
    .virtual('/url')
    .get(function () {
        return '/sms/all/' + this._id;
    });

//Export model
module.exports = mongoose.model('all_messages', SmsSchema);