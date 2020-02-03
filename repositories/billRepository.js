var sql = require('mssql');




async function getBillsByHotel(hotelName) {
    return new Promise((resolve, reject) => {
        var request = new sql.Request();
        request.input('HotelName', sql.VarChar, hotelName);
        request.query('exec getBillsByHotel @hotelName=@HotelName', function(err, recordset) {
            if (err) reject(err)
            resolve(recordset);
        });
    });
}

async function insertBill(paymentID, billDesc) {
    var request = new sql.Request();
    request.input('PaymentID', sql.UniqueIdentifier, paymentID);
    request.input('BillDescription', sql.VarChar, billDesc);

    request.query("insert into Bill(BillNo,PaymentID,BillDescription)  values(default,@PaymentID,@BillDescription)", (err, result) => {
        if (err != null) console.log(err);
    });
}

async function deleteBill(billNo) {
    var request = new sql.Request();
    request.input('BillNo', sql.UniqueIdentifier, billNo);

    request.query("delete from Bill where BillNo=@BillNo", (err, result) => {
        if (err != null) console.log(err);
    });
}






module.exports = {
    getBillsByHotel,
    insertBill,
    deleteBill
}