module.exports = {
  friendlyName: "Get minutes diff",

  description: "",

  inputs: {
    start: {
      type: "number",
    },
    end: {
      type: "number",
    },
  },

  exits: {
    success: {
      outputFriendlyName: "Minutes diff",
    },
  },

  fn: async function (inputs, exits) {
    var moment = require("moment");

    var duration = moment.duration(moment(inputs.start).diff(moment(inputs.end)));
    return duration.asMinutes();
  },
};
