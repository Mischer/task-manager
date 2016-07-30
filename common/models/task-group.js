module.exports = function(Taskgroup) {
  Taskgroup.beforeRemote('create', function(context, user, next) {
    context.args.data.simpleUserId = context.req.accessToken.userId;
    next();
  });
};
