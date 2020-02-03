var sql = require('mssql');


async function getAllRooms() {
    return new Promise((resolve, reject) => {
        var request = new sql.Request();
        request.query('select * from Room', function(err, recordset) {
            if (err) reject(err)
            resolve(recordset);
        });
    });
}

async function getRoomsByHotel(hotelName) {
    return new Promise((resolve, reject) => {
        var request = new sql.Request();
        request.input('HotelName', sql.VarChar, hotelName);
        request.query('exec getAllRoomsByHotel @hotelName=@HotelName', function(err, recordset) {
            if (err) reject(err)
            resolve(recordset);
        });
    });
}

async function getAvailableRoomsByHotel(hotelName) {
    return new Promise((resolve, reject) => {
        var request = new sql.Request();
        request.input('HotelName', sql.VarChar, hotelName);
        var sqlQuery = 'exec getAvailableRoomsByHotelName @hotelName = @HotelName';
        request.query(sqlQuery, function(err, recordset) {
            if (err) reject(err)
            resolve(recordset);
        });
    });
}

async function getRoomIDByRoomNumber(hotelName, roomNumber) {
    return new Promise((resolve, reject) => {
        var request = new sql.Request();
        request.input('HotelName', sql.VarChar, hotelName);
        request.input('RoomNumber', sql.SmallInt, roomNumber);
        var sqlQuery = 'exec getRoomIDByRoomNumber @hotelName=@HotelName , @roomNumber=@RoomNumber';
        request.query(sqlQuery, function(err, recordset) {
            if (err) reject(err)
            resolve(recordset);
        });
    });
}

async function insertRoom(hotelID, roomTypeID, roomNumber, roomFloor) {
    var request = new sql.Request();
    request.input('HotelID', sql.UniqueIdentifier, hotelID);
    request.input('RoomTypeID', sql.UniqueIdentifier, roomTypeID);
    request.input('RoomNumber', sql.SmallInt, roomNumber);
    request.input('RoomFloor', sql.TinyInt, roomFloor);

    request.query("insert into Room  values(@HotelID,@RoomTypeID,@RoomNumber,@RoomFloor,0)", (err, result) => {
        if (err != null) console.log(err);
    });
}

async function deleteRoom(roomID) {
    var request = new sql.Request();
    request.input('RoomID', sql.SmallInt, roomID);

    request.query("delete from Room where RoomID=@RoomID", (err, result) => {
        if (err != null) console.log(err);
    });
}


module.exports = {
    getAllRooms,
    getAvailableRoomsByHotel,
    getRoomIDByRoomNumber,
    getRoomsByHotel,
    insertRoom,
    deleteRoom
}