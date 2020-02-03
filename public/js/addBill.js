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


$("#billSubmitBtn").click(function() {
    var check = check_required_inputs();
    if (check) {
        $.post("/hotel/" + hotelUrl + "/bills/add", {
                hotelName: hotelName,
                bookingID: $("#inputBookingID").val(),
                paymentType: $("#inputPaymentType").val(),
                billDescription: $("#inputBillDesc").val()
            },
            function(data, status) {
                window.location.href = '/hotel/' + hotelUrl + '/bills';
            });
    }

});