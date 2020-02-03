var sql = require('mssql');




async function insertPayment(bookingID, paymentType) {
    return new Promise((resolve, reject) => {
        var request = new sql.Request();
        request.input('BookingID', sql.VarChar, bookingID);
        request.input('PaymentType', sql.VarChar, paymentType);
        request.query('insert into Payment output inserted.PaymentID  values(newid(),@BookingID,@PaymentType)', function(err, recordset) {
            if (err) reject(err)
            resolve(recordset);
        });
    });
}




module.exports = {
    insertPayment
}