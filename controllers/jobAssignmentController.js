var jobAssignmentRepository = require('../repositories/jobAssignmentRepository');
var staffRepository = require('../repositories/staffRepository');
var roomRepository = require('../repositories/roomRepository');
var hotelRepository = require('../repositories/hotelRepository');

async function showAssignments(request, response) {
    var url = request.url;
    url = url.substr(1, url.length - 16);
    var hotelName = url.replace("-", " ");
    try {
        var assignments = await jobAssignmentRepository.getAssignmentsByHotel(hotelName);
        response.render("jobAssignments", { assignments: assignments.recordset, hotelName: hotelName })
    } catch (e) {
        response.status(500).json({ message: "error", data: null, error: e });
    }
}

async function showAddView(request, response) {
    var url = request.url;
    url = url.substr(1, url.length - 20);
    var hotelName = url.replace("-", " ");

    try {
        var staffs = await staffRepository.getActiveStaffsByHotel(hotelName);
        var rooms = await roomRepository.getRoomsByHotel(hotelName);
        response.render("addJobAssignment", { staffs: staffs.recordset, rooms: rooms.recordset, hotelName: hotelName });
    } catch (e) {
        response.status(500).json({ message: "error", data: null, error: e });
    }
}


async function insertJobAssignment(request, response) {
    var roomID = request.body.inputRoomID;
    var staffID = request.body.inputStaffID;

    try {

        await jobAssignmentRepository.insertJobAssignment(roomID, staffID);

        response.end();

    } catch (e) {
        response.status(500).json({ message: "error", data: null, error: e });
    }

}

async function deleteJobAssignment(request, response) {
    var staffID = request.body.staffID;
    var roomID = request.body.roomID;
    try {
        await jobAssignmentRepository.deletejobAssignment(staffID, roomID);
        response.end();

    } catch (e) {
        response.status(500).json({ message: "error", data: null, error: e });
    }


}


module.exports = {
    showAssignments,
    showAddView,
    insertJobAssignment,
    deleteJobAssignment
}