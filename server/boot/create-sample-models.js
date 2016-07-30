/**
 * Created by drmischer on 10.07.2016.
 */
var async = require('async');
module.exports = function (app) {
  //data sources
  var mongods = app.dataSources.mongods;
  //create all models
  async.parallel({
    //tasks: async.apply(createTasks),
    simpleusers: async.apply(createSimpleUsers),
    admins: async.apply(createAdmin),
    //taskgroups: async.apply(createTaskGroups)
  }, function (err, results) {
    if (err) throw err;
   /* createTasks(results.taskgroups, function (err) {
      console.log('> models created sucessfully');
    });*/
  });
  //create tasks
  function createTasks(taskgroups, cb) {
    mongods.automigrate('Task', function (err) {
      if (err) return cb(err);
      var task = app.models.Task;
      task.create([
        {title: 'Issue1', status: 'false', taskGroupIdd: taskgroups[0].id},
        {title: 'Issue2', status: 'false', taskGroupIdd: taskgroups[0].id},
        {title: 'Issue3', status: 'false', taskGroupIdd: taskgroups[1].id}
      ], cb);
    });
  }

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

  //create Admin
  function createAdmin(cb) {
    mongods.automigrate('Admin', function (err) {
      if (err) return cb(err);
      var admin = app.models.Admin;
      admin.create([
        {firstname: 'Vitaly', lastname: 'Rydvan', email: 'v.rydvan@gmail.com', password: '3'}
      ], cb);
    });
  }

  //create taskgroups
  function createTaskGroups(cb) {
    mongods.automigrate('Taskgroup', function (err) {
      if (err) return cb(err);
      var taskgroup = app.models.Taskgroup;
      taskgroup.create([
        {
          title: 'First group',
          status: 'false'
        },
        {
          title: 'Second group',
          status: 'false'
        }
      ], cb);
    });
  }

  //create Task and Task group relations
  /* function createTaskRelations(taskgroups, cb) {
   mongods.autoupdate('Task', function(err) {
   if (err) return cb(err);
   var task = app.models.Task;
   task.updateAll([
   {
   taskGroupIdd: taskgroups[0].id
   }
   ], cb);
   });
   }*/
};
