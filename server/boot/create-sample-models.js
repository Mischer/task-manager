/**
 * Created by drmischer on 10.07.2016.
 */
var async = require('async');
module.exports = function (app) {
  //data sources
  var mongods = app.dataSources.mongods;
  //create all models
  async.parallel({
    simpleusers: async.apply(createSimpleUsers),
  }, function (err, results) {
    if (err) throw err;

  });

  //create simpleUsers
  function createSimpleUsers(cb) {
    mongods.automigrate('Simpleuser', function (err) {
      if (err) return cb(err);
      var simpleUser = app.models.Simpleuser;
      simpleUser.create([
        {firstname: 'Mikhail', lastname: 'Kultiyasov', email: 'mischer86@gmail.com', password: '1'},
        {firstname: 'Maxim', lastname: 'Sharai', email: 'sharai.maxim@gmail.com', password: '2'}
      ], cb);
    });
  }

};
