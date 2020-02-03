function showHotelPanel(request, response) {
    var hotelName = request.url.substr(1, request.url.length);
    response.render("hotel", { hotelName: hotelName });
}



module.exports = {
    showHotelPanel
}