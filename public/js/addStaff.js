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


$("#staffSubmitBtn").click(function() {
    var check = check_required_inputs();
    if (check) {
        $.post("/hotel/" + hotelUrl + "/staffs/add", {
                hotelName: hotelName,
                positionName: $("#inputPosition").val(),
                firstName: $("#inputFirstName").val(),
                lastName: $("#inputLastName").val(),
                idNumber: $("#inputID").val(),
                gender: $("#inputGender").val(),
                adress: $("#inputAdress").val(),
                city: $("#inputCity").val(),
                zipCode: $("#inputZipCode").val(),
                country: $("#inputCountry").val(),
                phoneNumber: $("#inputPhoneNumber").val(),
                mailAdress: $("#inputMailAdress").val(),
            },
            function(data, status) {
                window.location.href = '/hotel/' + hotelUrl + '/staffs';
            });
    }

});