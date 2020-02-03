var staffRepository = require('../repositories/staffRepository');
var hotelRepository = require('../repositories/hotelRepository');
var positionRepository = require('../repositories/positionRepository');
var personalInfoRepository = require('../repositories/personalInfoRepository');

async function showStaffs(request, response) {
    var url = request.url;
    url = url.substr(1, url.length - 8);
    var hotelName = url.replace("-", " ");
    try {
        var staffs = await staffRepository.getStaffsByHotel(hotelName);
        response.render("staffs", { staffs: staffs.recordset, hotelName: hotelName })
    } catch (e) {
        response.status(500).json({ message: "error", data: null, error: e });
    }
}

async function showAddView(request, response) {
    var url = request.url;
    url = url.substr(1, url.length - 12);
    var hotelName = url.replace("-", " ");


    try {
        var positions = await positionRepository.getPositions();
        response.render("addStaff", { positions: positions.recordset, hotelName: hotelName });
    } catch (e) {
        response.status(500).json({ message: "error", data: null, error: e });
    }
}

async function insertStaff(request, response) {

    var hotelName = request.body.hotelName;
    var positionName = request.body.positionName;
    var firstName = request.body.firstName;
    var lastName = request.body.lastName;
    var idNumber = request.body.idNumber;
    var gender = request.body.gender;
    var adress = request.body.adress;
    var city = request.body.city;
    var zipCode = request.body.zipCode;
    var country = request.body.country;
    var phoneNumber = request.body.phoneNumber;
    var mailAdress = request.body.mailAdress;

    try {

        var insertedPersonalInfoId = await personalInfoRepository.insertPersonalInfo(firstName, lastName, idNumber, gender, adress, city, zipCode, country, phoneNumber, mailAdress);
        insertedPersonalInfoId = insertedPersonalInfoId.recordset[0].PersonalInfoID;
        console.log("1");
        var hotelID = await hotelRepository.getHotelInfoByHotelName(hotelName);
        hotelID = hotelID.recordset[0].HotelID;
        console.log(positionName);
        var positionID = await positionRepository.getPositionByName(positionName);
        console.log("3");
        console.log(positionID.recordset);
        positionID = positionID.recordset[0].PositionID;
        console.log("3");
        await staffRepository.insertStaff(hotelID, insertedPersonalInfoId, positionID);
        console.log("4");
        response.end();

    } catch (e) {
        response.status(500).json({ message: "error", data: null, error: e });
    }

}

async function fireStaff(request, response) {
    var staffID = request.body.staffID;
    try {
        await staffRepository.fireStaff(staffID);
        response.end();

    } catch (e) {
        response.status(500).json({ message: "error", data: null, error: e });
    }


}





module.exports = {
    showStaffs,
    showAddView,
    insertStaff,
    fireStaff
}