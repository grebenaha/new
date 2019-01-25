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
    .virtual('url')
    .get(function () {
        return '/smsAdmin/sms/' + this._id;
    });

//Export model
module.exports = mongoose.model('all_messages', SmsSchema);