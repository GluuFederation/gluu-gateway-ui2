module.exports = {
  friendlyName: "Validate password",

  description: "",

  inputs: {},

  exits: {
    success: {
      description: "All done.",
    },
  },

  fn: async function (inputs) {
    validatePassword: function validatePassword(password, next) {
      bcrypt.compare(password, this.password, next);
    }
  },
};
