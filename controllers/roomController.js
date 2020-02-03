var roomRepository = require('../repositories/roomRepository');
var roomTypeRepository = require('../repositories/roomTypeRepository');
var hotelRepository = require('../repositories/hotelRepository');

async function showRooms(request, response) {
    var url = request.url;
    url = url.substr(1, url.length - 7);
    var hotelName = url.replace("-", " ");
    try {
        var rooms = await roomRepository.getRoomsByHotel(hotelName);
        response.render("rooms", { rooms: rooms.recordset, hotelName: hotelName })
    } catch (e) {
        response.status(500).json({ message: "error", data: null, error: e });
    }
}

async function showAddView(request, response) {
    var url = request.url;
    url = url.substr(1, url.length - 11);
    var hotelName = url.replace("-", " ");

    try {
        var rooms = await roomRepository.getRoomsByHotel(hotelName);
        var roomTypes = await roomTypeRepository.getRoomTypes();
        response.render("addRoom", { rooms: rooms.recordset, roomTypes: roomTypes.recordset, hotelName: hotelName });
    } catch (e) {
        response.status(500).json({ message: "error", data: null, error: e });
    }
}


async function insertRoom(request, response) {
    var hotelName = request.body.hotelName;
    var roomTypeName = request.body.inputRoomTypename;
    var roomFloor = request.body.inputRoomFloor;
    var roomNumber = request.body.inputRoomNumber;

    try {
        var hotelID = await hotelRepository.getHotelInfoByHotelName(hotelName);
        hotelID = hotelID.recordset[0].HotelID;

        var roomTypeID = await roomTypeRepository.getRoomTypeIDByRoomTypeName(roomTypeName);
        roomTypeID = roomTypeID.recordset[0].RoomTypeID;

        await roomRepository.insertRoom(hotelID, roomTypeID, roomNumber, roomFloor);

        response.end();

    } catch (e) {
        response.status(500).json({ message: "error", data: null, error: e });
    }

}

async function deleteRoom(request, response) {
    var roomID = request.body.roomID;
    try {
        await roomRepository.deleteRoom(roomID);
        response.end();

    } catch (e) {
        response.status(500).json({ message: "error", data: null, error: e });
    }


}


module.exports = {
    showRooms,
    showAddView,
    insertRoom,
    deleteRoom
}