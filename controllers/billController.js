var billRepository = require('../repositories/billRepository');
var bookingRepository = require('../repositories/bookingRepository');
var hotelRepository = require('../repositories/hotelRepository');
var paymentRepository = require('../repositories/paymentRepository');
async function showBills(request, response) {
    var url = request.url;
    url = url.substr(1, url.length - 7);
    var hotelName = url.replace("-", " ");
    try {
        var bills = await billRepository.getBillsByHotel(hotelName);
        response.render("bills", { bills: bills.recordset, hotelName: hotelName })
    } catch (e) {
        response.status(500).json({ message: "error", data: null, error: e });
    }
}

async function showAddView(request, response) {
    var url = request.url;
    url = url.substr(1, url.length - 11);
    var hotelName = url.replace("-", " ");

    try {
        var bookings = await bookingRepository.getBookingsByHotel(hotelName);
        response.render("addBill", { bookings: bookings.recordset, hotelName: hotelName });
    } catch (e) {
        response.status(500).json({ message: "error", data: null, error: e });
    }
}


async function insertBill(request, response) {
    var bookingID = request.body.bookingID;
    var paymentType = request.body.paymentType;
    var billDescription = request.body.billDescription;

    try {

        var insertesPaymentID = await paymentRepository.insertPayment(bookingID, paymentType);
        insertesPaymentID = insertesPaymentID.recordset[0].PaymentID;

        await billRepository.insertBill(insertesPaymentID, billDescription);


        response.end();

    } catch (e) {
        response.status(500).json({ message: "error", data: null, error: e });
    }

}

async function deleteBill(request, response) {
    var BillNo = request.body.billNo;
    try {
        await billRepository.deleteBill(BillNo);
        response.end();

    } catch (e) {
        response.status(500).json({ message: "error", data: null, error: e });
    }


}


module.exports = {
    showBills,
    showAddView,
    insertBill,
    deleteBill
}