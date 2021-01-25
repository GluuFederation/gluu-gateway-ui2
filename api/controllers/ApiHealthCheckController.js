/**
 * ApiHealthCheckController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = _.merge(_.cloneDeep(require('../base/Controller')), {

    subscribeHealthChecks: function(req, res) {

        if (!req.isSocket) {
            sails.log.error(new Date(), "ApiHealthCheckController:subscribe failed")
            return res.badRequest('Only a client socket can subscribe.');
        }

        var roomName = 'api.health_checks';
        sails.sockets.join(req.socket, roomName);
        res.json({
            room: roomName
        });
    },

});

