const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SmsSchema = new Schema({
        recipient: {
            index: {
                unique: true
            },
            required: true,
            type: String
        },
    content: {
            type: String
    }
    }, { timestamps: true });

SmsSchema
    .virtual('url')
    .get(function () {
        return '/smsAdmin/sms/' + this._id;
    });

//Export model
module.exports = mongoose.model('all_messages', SmsSchema);