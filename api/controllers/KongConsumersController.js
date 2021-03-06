/**
 * KongConsumersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var Kong = require("../services/KongService");

var KongConsumersController = {

    apis: function (req, res) {
  
      var consumerId = req.param("id");
  
      // Fetch all acls of the specified consumer
      Kong.listAllCb(req, '/consumers/' + consumerId + '/acls', function (err, _acls) {
        if (err) return res.negotiate(err);
  
        // Make an array of group names
        var consumerGroups = _.map(_acls.data, function (item) {
          return item.group;
        });
  
        // Fetch all apis
        Kong.listAllCb(req, '/apis', function (err, data) {
          if (err) return res.negotiate(err);
  
          var apis = data.data;
  
          var apiPluginsFns = [];
  
          // Prepare api objects
          apis.forEach(function (api) {
            // Add consumer id
            api.consumer_id = consumerId;
  
            apiPluginsFns.push(function (cb) {
              return Kong.listAllCb(req, '/apis/' + api.id + '/plugins', cb);
            });
          });
  
  
          // Foreach api, fetch it's assigned plugins
          async.series(apiPluginsFns, function (err, data) {
            if (err) return res.negotiate(err);
  
            data.forEach(function (plugins, index) {
  
              // Separate acl plugins in an acl property
              var acl = _.find(plugins.data, function (item) {
                return item.name === "acl" && item.enabled === true;
              });
  
              if (acl) {
                apis[index].acl = acl;
              }
  
              // Add plugins to their respective api
              apis[index].plugins = plugins;
            });
  
  
            // Gather apis with no access control restrictions whatsoever
            var open = _.filter(apis, function (api) {
              return !api.acl;
            })
  
  
            // Gather apis with access control restrictions whitelisting at least one of the consumer's groups.
            var whitelisted = _.filter(apis, function (api) {
              return api.acl && _.intersection(api.acl.config.whitelist, consumerGroups).length > 0;
            });
  
            return res.json({
              total: open.length + whitelisted.length,
              data: open.concat(whitelisted)
            });
          });
        });
      });
  
    },
  
    services: function (req, res) {
  
      var consumerId = req.param("id");
  
      // Fetch all acls of the specified consumer
      Kong.listAllCb(req, '/consumers/' + consumerId + '/acls', function (err, _acls) {
        if (err) return res.negotiate(err);
  
        // Make an array of group names
        var consumerGroups = _.map(_acls.data, function (item) {
          return item.group;
        });
  
        // Fetch all services
        Kong.listAllCb(req, '/services', function (err, data) {
          if (err) return res.negotiate(err);
  
          var services = data.data;
  
          var servicePluginsFns = [];
  
          // Prepare service objects
          services.forEach(function (service) {
            // Add consumer id
            service.consumer_id = consumerId;
  
            servicePluginsFns.push(function (cb) {
              return Kong.listAllCb(req, '/services/' + service.id + '/plugins', cb);
            });
          });
  
  
          // Foreach service, fetch it's assigned plugins
          async.series(servicePluginsFns, function (err, data) {
            if (err) return res.negotiate(err);
  
            data.forEach(function (plugins, index) {
  
              // Separate acl plugins in an acl property
              var acl = _.find(plugins.data, function (item) {
                return item.name === "acl" && item.enabled === true;
              });
  
              if (acl) {
                services[index].acl = acl;
              }
  
              // Add plugins to their respective service
              services[index].plugins = plugins;
            });
  
  
            // Gather apis with no access control restrictions whatsoever
            var open = _.filter(services, function (service) {
              return !service.acl;
            });
  
  
            // Gather apis with access control restrictions whitelisting at least one of the consumer's groups.
            var whitelisted = _.filter(services, function (service) {
              return service.acl && _.intersection(service.acl.config.whitelist, consumerGroups).length > 0;
            });
  
  
            return res.json({
              total: open.length + whitelisted.length,
              data: open.concat(whitelisted)
            });
          });
        });
      });
    },
  
    routes: function (req, res) {
      var consumerId = req.param("id");
  
      // Fetch all acls of the specified consumer
      Kong.listAllCb(req, '/consumers/' + consumerId + '/acls', function (err, _acls) {
        if (err) return res.negotiate(err);
  
        // Make an array of group names
        var consumerGroups = _.map(_acls.data, function (item) {
          return item.group;
        });
  
        // Fetch all routes
        Kong.listAllCb(req, '/routes', function (err, data) {
          if (err) return res.negotiate(err);
  
          var routes = data.data;
  
          var routePluginsFns = [];
  
          // Prepare route objects
          routes.forEach(function (route) {
            // Add consumer id
            route.consumer_id = consumerId;
  
            routePluginsFns.push(function (cb) {
              return Kong.listAllCb(req, '/routes/' + route.id + '/plugins', cb);
            });
          });
  
  
          // Foreach route, fetch it's assigned plugins
          async.series(routePluginsFns, function (err, data) {
            if (err) return res.negotiate(err);
  
            data.forEach(function (plugins, index) {
  
              // Separate acl plugins in an acl property
              var acl = _.find(plugins.data, function (item) {
                return item.name === "acl" && item.enabled === true;
              });
  
              if (acl) {
                routes[index].acl = acl;
              }
  
              // Add plugins to their respective route
              routes[index].plugins = plugins;
            });
  
  
            // Gather apis with no access control restrictions whatsoever
            var open = _.filter(routes, function (route) {
              return !route.acl;
            });
  
  
            // Gather apis with access control restrictions whitelisting at least one of the consumer's groups.
            var whitelisted = _.filter(routes, function (route) {
              return route.acl && _.intersection(route.acl.config.whitelist, consumerGroups).length > 0;
            });
  
  
            return res.json({
              total: open.length + whitelisted.length,
              data: open.concat(whitelisted)
            });
          });
        });
      });
    }
  };
  module.exports = KongConsumersController;

