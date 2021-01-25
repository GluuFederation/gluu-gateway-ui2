/**
 * SettingsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = _.merge(_.cloneDeep(require('../base/Controller')), {

    find : function(req,res) {

        sails.models.settings.find().limit(1)
            .exec(function(err,settings){

                if(err) return res.negotiate(err)
                // Store settings in memory
                sails.KONGA_CONFIG = settings[0].data || {}
                return res.json(settings[0] ? settings[0] : {})
            })
    }
});

