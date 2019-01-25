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
    .virtual('/phone_number')
    .get(function () {
        return this.recipient;
    });

WhitelistsSchema
    .virtual('/content')
    .get(function () {
        return this.content;
    });

WhitelistsSchema
    .virtual('/url')
    .get(function () {
        return '/whitelists/all/' + this._id;
    });

//Export model
module.exports = mongoose.model('whitelists', WhitelistsSchema);