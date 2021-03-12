const mongo = require('./mongoDBConnection');

const schema = new mongo.Schema({

    userId: String,
    name: String,
    password: String,
    email: String

});

const repo = mongo.model("Users", schema);

module.exports = repo;
