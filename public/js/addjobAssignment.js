var hotelUrl = (document.getElementById("hotelUrl").innerHTML).replace(/\s+/g, '');
var hotelName = hotelUrl.replace("-", " ");





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



$("#assignSubmitBtn").click(function() {
    var check = check_required_inputs();
    if (check) {
        $.post("/hotel/" + hotelUrl + "/jobAssignments/add", {
                hotelName: hotelName,
                inputRoomID: $("#inputRoomID").val(),
                inputStaffID: $("#inputStaffID").val()
            },
            function(data, status) {
                window.location.href = '/hotel/' + hotelUrl + '/jobAssignments';
            });
    }

});

$("#inputRoomNumber").change(function() {
    var index = $(this).prop('selectedIndex');
    $("#inputRoomID option")[index].selected = true;
});

$("#inputStaff").change(function() {
    var index = $(this).prop('selectedIndex');
    $("#inputStaffID option")[index].selected = true;
});