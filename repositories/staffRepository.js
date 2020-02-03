var sql = require('mssql');

async function getStaffsByHotel(hotelName) {
    return new Promise((resolve, reject) => {
        var request = new sql.Request();
        request.input('HotelName', sql.VarChar, hotelName);
        request.query('exec getStaffInfoByHotel @hotelName=@HotelName', function(err, recordset) {
            if (err) reject(err)
            resolve(recordset);
        });
    });
}

async function getActiveStaffsByHotel(hotelName) {
    return new Promise((resolve, reject) => {
        var request = new sql.Request();
        request.input('HotelName', sql.VarChar, hotelName);
        request.query('exec getactiveStaffInfoByHotel @hotelName=@HotelName', function(err, recordset) {
            if (err) reject(err)
            resolve(recordset);
        });
    });
}

async function insertStaff(hotelID, staffPersonalInfoID, staffPositionID) {
    var request = new sql.Request();
    request.input('HotelID', sql.UniqueIdentifier, hotelID);
    request.input('StaffPersonalInfoID', sql.SmallInt, staffPersonalInfoID);
    request.input('StaffPositionID', sql.UniqueIdentifier, staffPositionID);

    request.query("insert into Staff  values(@HotelID,@StaffPersonalInfoID,@StaffPositionID,default)", (err, result) => {
        if (err != null) console.log(err);
    });
}

async function fireStaff(staffID) {
    var request = new sql.Request();
    request.input('StaffID', sql.SmallInt, staffID);


    request.query("exec fireStaff @staffID = @StaffID", (err, result) => {
        if (err != null) console.log(err);
    });
}





module.exports = {
    getStaffsByHotel,
    getActiveStaffsByHotel,
    insertStaff,
    fireStaff
}