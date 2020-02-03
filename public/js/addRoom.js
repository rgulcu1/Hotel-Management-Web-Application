var hotelUrl = (document.getElementById("hotelUrl").innerHTML).replace(/\s+/g, '');
var hotelName = hotelUrl.replace("-", " ");

var roomNumberText = (document.getElementById("roomNumberData").innerHTML).replace(/\s+/g, '');
roomNumberText = roomNumberText.substr(0, roomNumberText.length - 1);
var roomNumber = roomNumberText.split(',');



function check_required_inputs() {
    var check = true;
    $(".required").each(function() {
        if ($(this).val() == "") {
            alert('Please fill all the fields');
            check = false;
            return false;
        }
    });
    return check;
}

function calculateRoomNumber(roomFloor) {
    var sameFloor = [];
    for (var i = 0; i < roomNumber.length; i++) {
        roomNumber[i] = roomNumber[i] - (roomFloor * 100);
        if (roomNumber[i] < 100 && roomNumber[i] > 0) sameFloor.push(roomNumber[i]);
    }
    var maxNumber = 0;
    for (var i = 0; i < sameFloor.length; i++) {
        if (sameFloor[i] > maxNumber) maxNumber = sameFloor[i];
    }

    return ((roomFloor * 100) + (maxNumber + 1));
}

$("#roomSubmitBtn").click(function() {
    var roomFloor = $("#inputFloor").val();
    var check = check_required_inputs();
    if (check) {
        $.post("/hotel/" + hotelUrl + "/rooms/add", {
                hotelName: hotelName,
                inputRoomTypename: $("#inputRoomType").val(),
                inputRoomFloor: roomFloor,
                inputRoomNumber: calculateRoomNumber(roomFloor),
            },
            function(data, status) {
                window.location.href = '/hotel/' + hotelUrl + '/rooms';
            });
    }

});