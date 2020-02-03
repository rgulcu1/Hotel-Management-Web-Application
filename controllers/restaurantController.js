var hotelRepository = require('../repositories/hotelRepository');
var restaurantRepository = require('../repositories/restaurantRepository');

async function showRestaurants(request, response) {
    var url = request.url;
    url = url.substr(1, url.length - 13);
    var hotelName = url.replace("-", " ");

    try {
        var restaurants = await restaurantRepository.getRestaurantsByHotel(hotelName);
        response.render("restaurants", { restaurants: restaurants.recordset, hotelName: hotelName })
    } catch (e) {
        response.status(500).json({ message: "error", data: null, error: e });
    }
}

async function showAddView(request, response) {
    var url = request.url;
    url = url.substr(1, url.length - 17);
    var hotelName = url.replace("-", " ");

    try {

        response.render("addRestaurant", { hotelName: hotelName });
    } catch (e) {
        response.status(500).json({ message: "error", data: null, error: e });
    }
}


async function insertRestaurant(request, response) {

    var hotelName = request.body.hotelName;
    var restaurantType = request.body.restaurantType;
    var restaurantCapacity = request.body.restaurantCapacity;

    try {
        var hotelID = await hotelRepository.getHotelInfoByHotelName(hotelName);
        hotelID = hotelID.recordset[0].HotelID;

        await restaurantRepository.insertRestaurant(hotelID, restaurantType, restaurantCapacity);

        response.end();

    } catch (e) {
        response.status(500).json({ message: "error", data: null, error: e });
    }

}

async function deleteRestaurant(request, response) {
    var restaurantID = request.body.restaurantID;
    try {
        await restaurantRepository.deleteRestaurant(restaurantID);
        response.end();

    } catch (e) {
        response.status(500).json({ message: "error", data: null, error: e });
    }


}


module.exports = {
    showRestaurants,
    showAddView,
    insertRestaurant,
    deleteRestaurant
}