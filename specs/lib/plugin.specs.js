var _                     = require('lodash');
var Q                     = require('q');
var chai                  = require('chai');
var mongoose              = require('mongoose');
var mongodbErrorConverter = require('../../lib/plugin');

var UserSchema = new mongoose.Schema({
    'username': String,
    'email': {
        'type': String,
        'unique': true
    }
});

var UserModel = mongoose.model('User', UserSchema);

describe('mongoose-mongodb-errors', function () {

    before(chai.should);

    it('adds a "post error" handler called "mongodbErrorHandler"', function () {
        chai.expect(UserSchema.s.hooks._posts['error:error']).to.not.be.true;
        UserSchema.plugin(mongodbErrorConverter);
        Array.isArray(UserSchema.s.hooks._posts['error:error']).should.be.true;
        UserSchema.s.hooks._posts['error:error'][0].name.should.eql('mongodbErrorHandler');
    });

    it('transforms a duplicate index error into a validation like error', function () {
        var docs = [
            { username: 'user1', email: 'user1@user1.com' },
            { username: 'user2', email: 'user1@user1.com' }
        ];

        return Q
                .ninvoke(UserModel, 'create', docs)
                .then(expectError('One of the fields is duplicated. It should have thrown an error.'))
                .catch(function (err) {
                    err.name.should.eql('ValidationError');
                });
    });

});


function expectError(message) {
    return function () {
        throw new Error('An error was expected. Hint: ' + message);
    };
}