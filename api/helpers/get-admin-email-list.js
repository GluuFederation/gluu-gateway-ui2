module.exports = {
  friendlyName: "Get admin email list",

  description: "",

  inputs: {},

  exits: {
    success: {
      outputFriendlyName: "Admin email list",
    },
  },

  fn: async function (inputs) {
    sails.models.user
      .find({
        admin: true,
      })
      .exec(function (err, admins) {
        if (err) return cb(err);
        if (!admins.length) return cb([]);
        return cb(
          null,
          admins.map(function (item) {
            return item.email;
          })
        );
      });
  },
};
