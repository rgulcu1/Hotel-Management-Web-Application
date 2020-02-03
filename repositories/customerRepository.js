var sql = require('mssql');


async function getCustomersInfoByHotel(hotelName) {
    return new Promise((resolve, reject) => {
        var request = new sql.Request();
        var sqlQuery = 'exec getCustomerInfoByHotelName @hotelName = "' + hotelName + '"';
        request.query(sqlQuery, function(err, recordset) {
            if (err) reject(err)
            resolve(recordset);
        });
    });
}


async function getAgentInfoByHotel(hotelName) {
    return new Promise((resolve, reject) => {
        var request = new sql.Request();
        var sqlQuery = 'exec getAgentInfoByHotelName @hotelName = "' + hotelName + '"';
        request.query(sqlQuery, function(err, recordset) {
            if (err) reject(err)
            resolve(recordset);
        });
    });
}


async function getGuestInfoByHotel(hotelName) {
    return new Promise((resolve, reject) => {
        var request = new sql.Request();
        var sqlQuery = 'exec getGuestInfoByHotelName @hotelName = "' + hotelName + '"';
        request.query(sqlQuery, function(err, recordset) {
            if (err) reject(err)
            resolve(recordset);
        });
    });
}




module.exports = {
    getCustomersInfoByHotel,
    getAgentInfoByHotel,
    getGuestInfoByHotel
}