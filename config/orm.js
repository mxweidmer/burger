
var connection = require("./connection.js");

var orm = {
    selectAll: function (table, cb) {
        connection.query("SELECT * FROM ??;",
            [table],
            function (err, result) {
                if (err) throw err;
                cb(result);
            }
        )
    },
    insertOne: function (table, cols, vals, cb) {
        connection.query("INSERT INTO ?? (?) VALUES (?)",
            [table, cols, vals],
            function (err, result) {
                if (err) throw err;
                cb(result);
            });
    },
}