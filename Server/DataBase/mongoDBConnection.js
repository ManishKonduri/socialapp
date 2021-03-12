const mongo = require('mongoose');

mongo.connect('mongodb://localhost:27017/reactdb', {

    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,

});

module.exports = mongo;