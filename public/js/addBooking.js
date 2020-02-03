var roomNumberText = (document.getElementById("roomNumberData").innerHTML).replace(/\s+/g, '');
roomNumberText = roomNumberText.substr(0, roomNumberText.length - 1);
var roomNumber = roomNumberText.split(',');

var hotelUrl = (document.getElementById("hotelUrl").innerHTML).replace(/\s+/g, '');
var hotelName = hotelUrl.replace("-", " ");


var selectDict = {};
var submitFlagForRoom = 1;
var submitFlagForDate = 1;

function ifRoomNumberExists(requestedRoomNumber) {
    for (var currentRoom in selectDict) {
        if (selectDict[currentRoom] == requestedRoomNumber) {
            return 1;
        }
    }
    return 0;
}

function getDateDiff() {
    var dateFrom = new Date($("#inputDateFrom").val());
    var dateTo = new Date($("#inputDateTo").val());
    var dateDiff = (dateTo - dateFrom) / (1000 * 60 * 60 * 24);

    return dateDiff;

}





function roomNumberSelectChange(selectObject) {

    if (!ifRoomNumberExists(selectObject.value)) {
        selectDict[selectObject.id] = selectObject.value;
        submitFlagForRoom = 1;
    } else {
        selectDict[selectObject.id] = -1;
        submitFlagForRoom = 0;
    }

    if (submitFlagForDate == 0 || submitFlagForRoom == 0) {
        document.getElementById("submitBtn").disabled = true;
        if (submitFlagForRoom == 0) {
            $("#roomErr").css("display", "inline");
        } else {
            $("#roomErr").css("display", "none");
        }
    } else {
        document.getElementById("submitBtn").disabled = false;
        $("#roomErr").css("display", "none");

    }
}



$("#inputDateTo").change(function() {
    if (getDateDiff() >= 0) {
        submitFlagForDate = 1;
    } else {
        submitFlagForDate = 0;
    }

    if (submitFlagForDate == 0 || submitFlagForRoom == 0) {
        document.getElementById("submitBtn").disabled = true;
        if (submitFlagForDate == 0) {
            $("#dateErr").css("display", "inline");
        } else {
            $("#dateErr").css("display", "none");
        }

    } else {
        document.getElementById("submitBtn").disabled = false;
        $("#dateErr").css("display", "none");

    }
});

$("#inputDateFrom").change(function() {
    if (getDateDiff() >= 0) {
        submitFlagForDate = 1;
    } else {
        submitFlagForDate = 0;
    }


    if (submitFlagForDate == 0 || submitFlagForRoom == 0) {
        document.getElementById("submitBtn").disabled = true;
        if (submitFlagForDate == 0) {
            $("#dateErr").css("display", "inline");
        } else {
            $("#dateErr").css("display", "none");
        }
    } else {
        document.getElementById("submitBtn").disabled = false;
        $("#dateErr").css("display", "none");
    }
});


$("#inputCustomer").change(function() {
    var index = $(this).prop('selectedIndex');
    $("#customerID option")[index - 1].selected = true;
});






$(document).ready(function() {
    $("#inputRoomCount").change(function() {

        var roomCount = $(this).children("option:selected").val();
        $('#rooms').empty();
        $('#roomsPrice').empty();
        for (var i = 0; i < roomCount; i++) {

            $('#rooms').append('<div class="form-group col-md-4 ">' +
                '<label for="inputRoomNumber' + (i + 1) + '">Select Room Number of Room' + (i + 1) + '</label>' +
                '<select onchange="roomNumberSelectChange(this)" name="inputRoomNumber" id="inputRoomNumber' + (i + 1) + '" class="form-control required" required>' +
                '<option disabled selected value style="display:none;">Select Room Number</option>' +
                '</select>' +
                '</div>');

            $('#roomsPrice').append('<div class="form-group col-md-4">' +
                '<label for="inputRoomPrice' + (i + 1) + '">Enter Room Price of Room' + (i + 1) + '</label>' +
                '<input type="number" min="1" max="999" name="inputRoomPrice" id="inputRoomPrice' + (i + 1) + '" class="form-control required" required>' +
                '</div>');
        }

        for (var i = 0; i < roomCount; i++) {
            addOptionsToSelectById("inputRoomNumber" + (i + 1));
        }
        selectDict = {};
        for (var i = 0; i < roomCount; i++) {

            var k = "inputRoomNumber" + (i + 1);
            selectDict[k] = "";
        }
    });




});

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

function addOptionsToSelectById(selectId) {
    var select = document.getElementById(selectId);

    for (var i = 0; i < roomNumber.length; i++) {
        var opt = document.createElement('option');
        opt.value = roomNumber[i];
        opt.innerHTML = roomNumber[i];
        select.appendChild(opt);
    }
}
inputRoomNumbers = [];
inputRoomPrices = [];
$("#bookingSubmitBtn").click(function() {
    var check = check_required_inputs();
    if (check) {
        fillRoomNumber();
        fillRoomPrice();
        $.post("/hotel/" + hotelUrl + "/bookings/add", {
                hotelName: hotelName,
                customerID: $("#customerID").val(),
                inputRoomCount: $("#inputRoomCount").val(),
                inputRoomNumber: inputRoomNumbers,
                inputRoomPrice: inputRoomPrices,
                inputDateFrom: $("#inputDateFrom").val(),
                inputDateTo: $("#inputDateTo").val(),
                inputDescription: $("#inputDescription").val()
            },
            function(data, status) {
                window.location.href = '/hotel/' + hotelUrl + '/bookings';
            });
    }

});

function fillRoomNumber() {
    var roomCount = $("#inputRoomCount").val();
    for (i = 0; i < roomCount; i++) {
        inputRoomNumbers.push($("#inputRoomNumber" + (i + 1)).val())
    }
}

function fillRoomPrice() {
    var roomCount = $("#inputRoomCount").val();
    for (i = 0; i < roomCount; i++) {
        inputRoomPrices.push($("#inputRoomPrice" + (i + 1)).val())
    }
}