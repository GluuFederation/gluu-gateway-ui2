module.exports = {
  friendlyName: "Without trailing slash",

  description: "",

  inputs: {
    str: {
      type: "string",
    },
  },

  exits: {
    success: {
      description: "All done.",
    },
  },

  fn: async function (inputs) {
    if (!inputs.str) return inputs.str;
    return inputs.str.replace(/\/$/, "");
  },
};
