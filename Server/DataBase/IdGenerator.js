const repo = require('./mongoDBUserData');

exports.userId = async () => {
    let count = await repo.find().count();

    count  = String(count+1);

    return "UI-"+count;
}