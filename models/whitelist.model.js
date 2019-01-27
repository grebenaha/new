const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WhitelistsSchema = new Schema(
    {
        updatedAt: {type: Date},
        createdAt: {type: Date},
        content: {type: String, required: true, max: 100},
        recipient: {type: String, required: true, max: 100},
    }
);

WhitelistsSchema
    .virtual('url')
    .get(function () {
        return '/smsAdmin/whitelist/' + this._id;
    });

//Export model
module.exports = mongoose.model('whitelists', WhitelistsSchema);