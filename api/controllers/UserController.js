/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = _.merge(_.cloneDeep(require("../base/Controller")), {
  subscribe: function (req, res) {
    if (!req.isSocket) {
      sails.log.error(new Date(), "UserController:subscribe failed");
      return res.badRequest("Only a client socket can subscribe.");
    }

    var roomName = "user." + req.param("id") + ".updated";
    sails.sockets.join(req.socket, roomName);
    res.json({
      room: roomName,
    });
  },

  update: function (req, res) {
    console.log(req.body);

    var user = req.body;
    var passports = req.body.passports;

    // Delete unwanted properties
    delete user.passports;
    delete user.password_confirmation;

    sails.models.user
      .update({ id: req.param("id") }, user)
      .exec(function (err, updated) {
        if (err) return res.negotiate(err);

        var user = updated[0];

        if (user.node) {
          sails.models.kongnode
            .findOne({ id: user.node })
            .exec(function (err, node) {
              if (err) return res.negotiate(err);
              user.node = node;
              sails.sockets.blast("user." + user.id + ".updated", user);
            });
        } else {
          sails.sockets.blast("user." + user.id + ".updated", user);
        }

        if (!passports) return res.json(user);

        sails.models.passport
          .update({ user: req.param("id") }, { password: passports.password })
          .exec(function (err, updatedPassport) {
            if (err) return res.negotiate(err);
            return res.json(user);
          });
      });
  },
});
