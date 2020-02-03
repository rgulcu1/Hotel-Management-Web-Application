var sql = require('mssql');



async function getAssignmentsByHotel(hotelName) {
    return new Promise((resolve, reject) => {
        var request = new sql.Request();
        request.input('HotelName', sql.VarChar, hotelName);
        request.query('exec getAssignmentsByHotel @hotelName=@HotelName', function(err, recordset) {
            if (err) reject(err)
            resolve(recordset);
        });
    });
}

async function insertJobAssignment(roomID, staffID) {
    var request = new sql.Request();
    request.input('RoomID', sql.SmallInt, roomID);
    request.input('StaffID', sql.SmallInt, staffID);

    request.query("insert into Jobassignment  values(@RoomID,@StaffID)", (err, result) => {
        if (err != null) console.log(err);
    });
}

async function deletejobAssignment(staffID, roomID) {
    var request = new sql.Request();
    request.input('StaffID', sql.SmallInt, staffID);
    request.input('RoomID', sql.SmallInt, roomID);

    request.query("delete from JobAssignment where (StaffID=@StaffID and RoomID=@RoomID)  ", (err, result) => {
        if (err != null) console.log(err);
    });
}




module.exports = {
    getAssignmentsByHotel,
    insertJobAssignment,
    deletejobAssignment
}