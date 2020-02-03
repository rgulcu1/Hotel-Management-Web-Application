var sql = require('mssql');

async function getBookingsByHotel(hotelName) {
    return new Promise((resolve, reject) => {
        var request = new sql.Request();
        request.input('HotelName', sql.VarChar, hotelName);
        request.query("exec getBookingsByHotel @hotelName='" + hotelName + "'", function(err, recordset) {
            if (err) reject(err)
            resolve(recordset);
        });
    });
}

async function insertBooking(hotelID, customerID, dateFrom, dateTo, bookedRoomCount, bookingDescription) {
    return new Promise((resolve, reject) => {
        var request = new sql.Request();
        request.input('HotelID', sql.UniqueIdentifier, hotelID);
        request.input('CustomerID', sql.UniqueIdentifier, customerID);
        request.input('DateFrom', sql.Date, dateFrom);
        request.input('DateTo', sql.Date, dateTo);
        request.input('BookedRoomCount', sql.TinyInt, bookedRoomCount);
        request.input('BookingDescription', sql.VarChar, bookingDescription);

        request.query("insert into Booking output inserted.BookingID values(newid(),@HotelID,@CustomerID,@DateFrom,@DateTo,@BookedRoomCount,@BookingDescription)", (err, result) => {
            if (err != null) console.log(err);
            resolve(result);

        });
    });
}

async function deleteBooking(bookingID) {
    var request = new sql.Request();
    request.input('BookingID', sql.UniqueIdentifier, bookingID);

    request.query("delete from Booking where BookingID=@BookingID", (err, result) => {
        if (err != null) console.log(err);
    });
}

module.exports = {
    getBookingsByHotel,
    insertBooking,
    deleteBooking
}