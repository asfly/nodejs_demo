var Settings = require('./settings'),
    Db = require('mongodb').Db,
	MongoClient = require('mongodb').MongoClient;
	Server = require('mongodb').Server,
    Server_Config = new Server(Settings.HOST, Settings.PORT, {auto_reconnect: true, native_parser: true}),
    /*
    ReplSetServers = require('mongodb').ReplSetServers,
    ObjectID = require('mongodb').ObjectID,
    Binary = require('mongodb').Binary,
    GridStore = require('mongodb').GridStore,
    Grid = require('mongodb').Grid,
    Code = require('mongodb').Code,
    BSON = require('mongodb').pure().BSON,
    */
    assert = require('assert'),
    mongodb = new Db(Settings.DB,Server_Config,{ safe:true });
exports.db = mongodb;



