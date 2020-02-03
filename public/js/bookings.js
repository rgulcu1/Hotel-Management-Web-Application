var freeroomNumberText = (document.getElementById("avaliableRoomData").innerHTML);
var freeRoomNumber = Number(freeroomNumberText);

var hotelUrl = (document.getElementById("hotelUrl").innerHTML).replace(/\s+/g, '');
var hotelName = hotelUrl.replace("-", " ")

$("tr").hover(
    function() {
        var button = $(this).find(".rowButton");
        button.addClass("displayButton");
    },
    function() {
        $(".rowButton").removeClass("displayButton");
    }
);
$("#addBookingBtn").click(function() {
    if (freeRoomNumber > 0) {
        $("#addBookingLink").prop("href", "/hotel/" + hotelUrl + "/bookings/add");
    } else {
        alert("There are no free room on " + hotelName);
        $("#addBookingLink").prop("href", "");
    }
});

$(".deleteBooking").click(function() {
    var index = $(this).closest('tr').index();
    var bookingID = $("tr").find("td:eq(0)").eq(index).text().replace(/\s+/g, '');
    var roomNumbers = $("tr").find("td:eq(2)").eq(index).text();
    roomNumbers = $.trim(roomNumbers);
    roomNumbers = roomNumbers.split(' ');

    $.post("/hotel/" + hotelUrl + "/bookings/delete", {
            bookingID: bookingID,
            roomNumbers: roomNumbers,
            hotelName: hotelName
        },
        function(data, status) {
            window.location.href = '/hotel/' + hotelUrl + '/bookings';
        });
});