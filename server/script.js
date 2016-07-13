/**
 * Created by drmischer on 04.07.2016.
 */
var ds = app.dataSources.mongods;
task = ds.createModel('task', {
  _id: { type: ds.ObjectID, id: true }
});


Post.find({where: {and: [{title: 'first'},
    {description: 'ft'}]}},
  function (err, tasks) {
  console.log('TASKS' + tasks);
  });
