var sql = require('mssql');

async function getPositions() {
    return new Promise((resolve, reject) => {
        var request = new sql.Request();
        request.query('select * from Position', function(err, recordset) {
            if (err) reject(err)
            resolve(recordset);
        });
    });
}

async function getPositionByName(positionName) {
    return new Promise((resolve, reject) => {
        var request = new sql.Request();
        request.input('PositionName', sql.VarChar, positionName);
        request.query('select * from Position where PositionName = @PositionName', function(err, recordset) {
            if (err) reject(err)
            resolve(recordset);
        });
    });
}


module.exports = {
    getPositions,
    getPositionByName
}