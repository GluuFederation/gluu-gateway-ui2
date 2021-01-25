/**
 * KongPluginsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var KongPluginService = require("../services/KongPluginService");

module.exports = {
  list: function (req, res) {
    return KongPluginService.richList(req, res);
  },
};
