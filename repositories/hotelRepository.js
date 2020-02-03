var sql = require('mssql');

async function getHotelInfoByHotelName(hotelName) {
    return new Promise((resolve, reject) => {
        var request = new sql.Request();
        request.input('HotelName', sql.VarChar, hotelName);
        request.query("select * from Hotel where HotelName=@HotelName", function(err, recordset) {
            if (err) reject(err)
            resolve(recordset);
        });
    });
}

//select BookingID,CustomerID,DateFrom,DateTo,TotalDay from Booking b inner join Hotel h on b.HotelID = h.HotelID where h.HotelName ='" + hotelName + "'
module.exports = {
    getHotelInfoByHotelName
}