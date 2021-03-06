const mongo = require('./mongoDBConnection');

const schema = new mongo.Schema({

    userId: String,
    name: String,
    password: String,
    email: String,
    account: { type: String, default: 'public' },
    friendRequests : [{
        type: String
    }]

});

const repo = mongo.model("Users", schema);

module.exports = repo;
