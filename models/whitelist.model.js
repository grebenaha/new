const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WhitelistsSchema = new Schema({
    recipient: {
        index: {
            unique: true
        },
        required: true,
        type: String
    }
}, { timestamps: true })

WhitelistsSchema
    .virtual('url')
    .get(function () {
        return '/smsAdmin/whitelist/' + this._id;
    });

//Export model
module.exports = mongoose.model('whitelists', WhitelistsSchema);