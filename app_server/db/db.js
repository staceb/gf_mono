var readLine = require("readline");
var Q = require('q');
var gracefulShutdown;
var mysql = require("mysql");

var config = require("../../config.js");

var pool = mysql.createPool({
    host     : config.host,
    user     : config.user,
    password : config.dbPass,
    database: config.database,
    connectionLimit : config.connectionLimit,
    debug: config.debug
});


module.exports.getConnection = function (){

    var deferred = Q.defer();

    pool.getConnection(function (err, conn) {

        if (err) {

            deferred.reject(err);
        }
        else {

            deferred.resolve(conn);
        }

    });

    return deferred.promise;

}

pool.on('connection', function (connection) {
    console.log('MySQL connected:'+connection.threadId);
});

pool.on('remove', function (id) {

   console.log('[DB] Lost connection to database host', id);
   setTimeout(function() {
   console.log('[DB] Re-adding host', id);
   cluster.add(id, hosts[id]);
}, 20000);


});


pool.on('enqueue', function () {
    console.log('Waiting for available connection slot');
});

//for listening for termination on Windows machine:
if (process.platform === "win32") {

    var rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on("SIGINT", function () {
        process.emit("SIGINT");
    });
}

gracefulShutdown = function (msg, callback) {

    pool.end(function () {
        console.log('MySQL disconnected through ' + msg);
        callback();
    });

};


// For nodemon restarts
process.once('SIGUSR2', function () {
    gracefulShutdown('nodemon restart', function () {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', function () {
    gracefulShutdown('app termination', function () {
        process.exit(0);
    });
});
// For Heroku app termination
process.on('SIGTERM', function () {
    gracefulShutdown('Heroku app shutdown', function () {
        process.exit(0);
    });
});
