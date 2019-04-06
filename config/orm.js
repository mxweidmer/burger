
var connection = require("./connection.js");

function objToSql(ob) {
    var arr = [];

    for (var key in ob) {
        var value = ob[key];
        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
}

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
        connection.query("INSERT INTO ?? (??) VALUES (??);",
            [table, cols.toString(), vals.toString()],
            function (err, result) {
                if (err) throw err;
                cb(result);
            });
    },
    updateOne: function (table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table;
        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    }
}

module.exports = orm;