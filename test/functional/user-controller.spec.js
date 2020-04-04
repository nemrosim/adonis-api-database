const { test, trait } = use('Test/Suite')('User');
const User = use('App/Models/User');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

test('create new user', async ({ assert, client }) => {
    const EMAIL = 'test@gmail.com';
    const PASSWORD = '123';

    const user = await User.create({
        username: 'some',
        email: EMAIL,
        password: PASSWORD,
    });

    assert.equal(user.email, EMAIL);
    assert.equal(typeof user.password === 'string', true);

    const login = await client
        .post('api/v1/login')
        .send({
            email: EMAIL,
            password: PASSWORD,
        })
        .end(); // You must call "end" to execute HTTP client requests.

    login.assertStatus(200);
    const loginResponseJson = JSON.parse(login.text);

    assert.equal(loginResponseJson.type, 'bearer');
    assert.equal(Object.keys(loginResponseJson).length, 3);
    assert.equal(loginResponseJson.token.length, 117);
    assert.equal(loginResponseJson.refreshToken.length, 96);

    const response = await client
        .post('api/v1/users')
        .header('accept', 'application/json')
        .header('Authorization', `Bearer ${loginResponseJson.token}`)
        .send({
            username: 'someName',
            email: 'hello@gmail.com',
            password: '123',
        })
    // You must call "end" to execute HTTP client requests.
        .end();

    response.assertStatus(204);
});
