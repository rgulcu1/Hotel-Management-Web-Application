var sql = require('mssql');


async function getRoomTypes() {
    return new Promise((resolve, reject) => {
        var request = new sql.Request();
        request.query('select * from RoomType', function(err, recordset) {
            if (err) reject(err)
            resolve(recordset);
        });
    });
}

async function getRoomTypeIDByRoomTypeName(roomTypeName) {
    return new Promise((resolve, reject) => {
        var request = new sql.Request();
        request.input('RoomTypeName', sql.VarChar, roomTypeName);
        request.query("select RoomTypeID from RoomType where RoomTypeName=@RoomTypeName", function(err, recordset) {
            if (err) reject(err)
            resolve(recordset);
        });
    });
}


module.exports = {
    getRoomTypes,
    getRoomTypeIDByRoomTypeName
}