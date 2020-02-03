var sql = require('mssql');

async function getRestaurantsByHotel(hotelName) {
    return new Promise((resolve, reject) => {
        var request = new sql.Request();
        request.input('HotelName', sql.VarChar, hotelName);
        request.query('exec getRestaurantsByHotel @hotelName = @HotelName', function(err, recordset) {
            if (err) reject(err)
            resolve(recordset);
        });
    });
}

async function insertRestaurant(hotelID, restaurantType, restaurantCapacity) {
    var request = new sql.Request();
    request.input('HotelID', sql.UniqueIdentifier, hotelID);
    request.input('RestaurantType', sql.VarChar, restaurantType);
    request.input('RestaurantCapacity', sql.SmallInt, restaurantCapacity);

    request.query("insert into Restaurant  values(default,@HotelID,@RestaurantType,@RestaurantCapacity)", (err, result) => {
        if (err != null) console.log(err);
    });
}

async function deleteRestaurant(restaurantID) {
    var request = new sql.Request();
    request.input('RestaurantID', sql.UniqueIdentifier, restaurantID);

    request.query("delete from Restaurant where RestaurantID=@RestaurantID", (err, result) => {
        if (err != null) console.log(err);
    });
}


module.exports = {
    getRestaurantsByHotel,
    insertRestaurant,
    deleteRestaurant
}