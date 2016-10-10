var chai = require('chai'), should = chai.should(), expect = chai.expect;
var request = require('superagent');
var user = request.agent();

describe('Authentication', function() {

  it('errors if wrong user credentials', function(done) {
    this.timeout(5000);

    user
      .post('http://localhost:3000/api/taskUser/login?include=user')
      .send({ email: 'mischer86@gmail.com', password: '12' })
      .end(function(err, res) {
        should.exist(err);
        err.message.should.equal('Unauthorized');
        done();
      });
  });

  it('errors if bad user auth', function(done) {
    this.timeout(5000);
    user
      .post('http://localhost:3000/api/taskUser/login?include=user')
      .send({ email: 'mischer86@gmail.com', password: '1' })
      .end(function(err, res) {
        should.not.exist(err);
        should.exist(res);
        res.body.should.have.property('user');
        expect(res.body.user).to.include.property('firstname');
        res.body.user.firstname.should.equal('Mikhail');
        expect(res.body.user).to.include.property('lastname');
        res.body.user.lastname.should.equal('Kultiyasov');
        done();
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
