var customerRepository = require('../repositories/customerRepository');

async function showCustomers(request, response) {
    var url = request.url;
    url = url.substr(1, url.length - 11);
    var hotelName = url.replace("-", " ");

    try {
        var agents = await customerRepository.getAgentInfoByHotel(hotelName);
        var guests = await customerRepository.getGuestInfoByHotel(hotelName);
        response.render("customers", { agents: agents.recordset, guests: guests.recordset, hotelName: hotelName })
    } catch (e) {
        response.status(500).json({ message: "error", data: null, error: e });
    }
}



module.exports = {
    showCustomers
}