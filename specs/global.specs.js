var mongoose = require('mongoose');
var Q        = require('q');

mongoose.Promise = Q.Promise;

before(function (done) {
    mongoose.connect('mongodb://localhost/mongoose-mongodb-errors-specs', done);
});

after(function (done) {
    mongoose.connection.db.dropDatabase(function () {
        mongoose.disconnect(done);
    });
});