/**
 * Created by user on 06/10/2017.
 */

'use strict'

var mysql = require("../../node_modules/sails-mysql/node_modules/mysql");
var dbConf = require("../../config/datastore");

module.exports = {
    run : function (next) {
        console.log("Using MySQL DB Adapter.");
        return this.create(next);
    },


    create : function(next) {

        var connection = mysql.createConnection({
            host     : dbConf.datastore.mysql.host,
            port     : dbConf.datastore.mysql.port,
            user     : dbConf.datastore.mysql.user,
            password : dbConf.datastore.mysql.password
        });

        console.log("Creating database `" + dbConf.datastore.postgres.database + "` if not exists.");

        connection.query('CREATE DATABASE IF NOT EXISTS ' + dbConf.datastore.postgres.database, function (error, results, fields) {
            if (error) {
                console.error(error);
                return next(error);
            }

            return next();
        });
    }
}
