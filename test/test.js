var should = require('chai').should(),
  supertest = require('supertest'),
  api = supertest('http://localhost:3000');

var request = require('superagent');
var user = request.agent();

describe('Authentication', function() {

/*  it('errors if wrong basic auth', function(done) {
    api.get('/#/main/my-groups')
      .auth('incorrect', 'credentials')
      .expect(200, done)
  });*/

  it('errors if bad x-api-key header', function(done) {
    this.timeout(5000);

    user
      .post('http://localhost:3000/api/taskUser/login?include=user')
      .send({ email: 'mischer86@gmail.com', password: '1' })
      .end(function(err, res) {
        done();
        // user1 will manage its own cookies
        // res.redirects contains an Array of redirects
        console.log(err);
        console.log(res);

      });
  });

});


/*describe('/#/main/my-groups', function() {

  it('returns my groups as JSON', function(done) {
    api.get('/#/main/my-groups')
      .set('x-api-key', '123myapikey')
      .auth('correct', 'credentials')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.have.property('posts').and.be.instanceof(Array);
        done();
      });
  });

});*/
