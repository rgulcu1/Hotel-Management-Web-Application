var sql = require('mssql');

async function insertBookedRoom(bookingID, roomID, roomPrice) {
    var request = new sql.Request();
    request.input('BookingID', sql.UniqueIdentifier, bookingID);
    request.input('RoomID', sql.SmallInt, roomID);
    request.input('RoomPrice', sql.SmallMoney, roomPrice);

    request.query("insert into BookedRoom values(@BookingID,@RoomID,@RoomPrice)", (err, result) => {
        if (err != null) console.log(err);
    });
}

async function deleteBookedRoom(bookingID, roomID) {
    var request = new sql.Request();
    request.input('BookingID', sql.UniqueIdentifier, bookingID);
    request.input('RoomID', sql.SmallInt, roomID);

    request.query("delete from BookedRoom where (BookingID=@BookingID and RoomID=@RoomID)", (err, result) => {
        if (err != null) console.log(err);

    });
}

module.exports = {
    insertBookedRoom,
    deleteBookedRoom
}