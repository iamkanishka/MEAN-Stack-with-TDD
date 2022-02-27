const { assert } = require("chai");
const request = require("supertest");
const server = require('../server');
const moment = require('moment');
const User = require('../Models/User');
const _ = require('underscore');

describe('API User', () => {
    let newUsers = [];
    const ROUTES = {
        registerUser: '/api/user/register/'
    };

    function createNewUser(counter = 0) {
        return {
            firstname: 'Court',
            lastname: 'Doe',
            email: `codingwithcourt-${moment().unix() + counter}@gmail.com`,
            password: 'password'
        };
    }

    describe('POST /api/user/register', () => {
        [
            createNewUser(1),
            createNewUser(2),
            createNewUser(3)
        ].forEach(
            (user) => {
                it('should create user when required fields are passed through the body', async () => {
                    // Initialize
                    let response, savedUser;
        
                    // Act (call your method)
                    try {
                        response = await request(server).post(ROUTES.registerUser).send(user);
                        savedUser = await User.findOne({ email: user.email });
                        newUsers.push(savedUser);
                    } catch(error) {
                        assert.throw(() => {}, error);
                    }
        
                    // Asserts/expected
                    assert.equal(response.statusCode, 200);
                    assert.deepEqual(_.pick(savedUser, ['email', 'password', 'firstname', 'lastname']), user);
                });
            }
        );

        [
            _.omit(createNewUser(), 'email'),
            _.omit(createNewUser(), 'password'),
            _.omit(createNewUser(), 'firstname'),
            _.omit(createNewUser(), 'lastname'),
            {},
            null,
            undefined
        ].forEach((badUser) => {
            it('should return status 500 when required user fields are missing', async () => {
                // Initialize
                let response;

                // Act (method call)
                response = await request(server).post(ROUTES.registerUser).send(badUser);

                // Assert/expected
                assert.equal(response.statusCode, 500);
                assert.equal(response.error.text, 'Something broke!');
            });
        })
    });

    afterEach(async () => {
        try {
            await User.deleteMany({ _id: { $in: _.pluck(newUsers, '_id') } });
        } catch(error) {
            // TODO: Log this
            console.error(error);
        }
    });
});