var bookingRepository = require('../repositories/bookingRepository');
var customerRepository = require('../repositories/customerRepository');
var roomRepository = require('../repositories/roomRepository');
var hotelRepository = require('../repositories/hotelRepository');
var bookedRoomRepository = require('../repositories/bookedRoomRepository');

async function showBookings(request, response) {
    var url = request.url;
    url = url.substr(1, url.length - 10);
    var hotelName = url.replace("-", " ");

    try {
        var bookings = await bookingRepository.getBookingsByHotel(hotelName);
        var freeRooms = await roomRepository.getAvailableRoomsByHotel(hotelName);
        console.log(bookings.recordset)
        response.render("bookings", { bookings: bookings.recordset, avaliableRooms: freeRooms.recordset, hotelName: hotelName })
    } catch (e) {
        response.status(500).json({ message: "error", data: null, error: e });
    }
}

async function showAddView(request, response) {
    var url = request.url;
    url = url.substr(1, url.length - 14);
    var hotelName = url.replace("-", " ");
    try {
        var customers = await customerRepository.getCustomersInfoByHotel(hotelName);
        var avaliableRooms = await roomRepository.getAvailableRoomsByHotel(hotelName);
        response.render("addBooking", { customers: customers.recordset, rooms: avaliableRooms.recordset, hotelName: hotelName });
    } catch (e) {
        console.log("sa");
        response.status(500).json({ message: "error", data: null, error: e });
    }
}

async function insertBooking(request, response) {

    var customerID = request.body.customerID;
    var roomCount = request.body.inputRoomCount;
    var roomNumbers = request.body.inputRoomNumber;
    var roomPrices = request.body.inputRoomPrice;
    var dateFrom = request.body.inputDateFrom;
    var dateTo = request.body.inputDateTo;
    var description = request.body.inputDescription;
    var hotelName = request.body.hotelName;
    var roomIDs = [];

    try {
        var hotelID = await hotelRepository.getHotelInfoByHotelName(hotelName);
        hotelID = hotelID.recordset[0].HotelID;
        for (i = 0; i < roomNumbers.length; i++) {
            var roomID = await roomRepository.getRoomIDByRoomNumber(hotelName, roomNumbers[i]);
            roomID = roomID.recordset[0].RoomID;
            roomIDs.push(roomID);
        }
        var insertedBookingID = await bookingRepository.insertBooking(hotelID, customerID, dateFrom, dateTo, roomCount, description);
        insertedBookingID = insertedBookingID.recordset[0].BookingID;

        for (i = 0; i < roomCount; i++) {
            await bookedRoomRepository.insertBookedRoom(insertedBookingID, roomIDs[i], roomPrices[i]);
        }

        response.end();

    } catch (e) {
        response.status(500).json({ message: "error", data: null, error: e });
    }

}

async function deleteBooking(request, response) {
    var bookingID = request.body.bookingID;
    var roomNumbers = request.body.roomNumbers;
    var hotelName = request.body.hotelName;
    var roomIDs = [];

    try {
        for (i = 0; i < roomNumbers.length; i++) {
            var roomID = await roomRepository.getRoomIDByRoomNumber(hotelName, roomNumbers[i]);
            roomID = roomID.recordset[0].RoomID;
            roomIDs.push(roomID);
        }
        for (i = 0; i < roomNumbers.length; i++) {
            await bookedRoomRepository.deleteBookedRoom(bookingID, roomIDs[i]);
        }

        await bookingRepository.deleteBooking(bookingID);
        response.end();

    } catch (e) {
        response.status(500).json({ message: "error", data: null, error: e });
    }


}





module.exports = {
    showBookings,
    showAddView,
    insertBooking,
    deleteBooking
}