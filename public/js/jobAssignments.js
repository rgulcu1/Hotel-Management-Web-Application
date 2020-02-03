var hotelUrl = (document.getElementById("hotelUrl").innerHTML).replace(/\s+/g, '');
var hotelName = hotelUrl.replace("-", " ");

$("tr").hover(
    function() {
        var button = $(this).find(".rowButton");
        button.addClass("displayButton");
    },
    function() {
        $(".rowButton").removeClass("displayButton");
    }
);


$(".deleteAssignment").click(function() {
    var index = $(this).closest('tr').index();
    var staffID = $("tr").find("td:eq(0)").eq(index).text().replace(/\s+/g, '');
    var roomID = $("tr").find("td:eq(1)").eq(index).text().replace(/\s+/g, '');


    $.post("/hotel/" + hotelUrl + "/jobAssignments/delete", {
            roomID: roomID,
            staffID: staffID
        },
        function(data, status) {
            window.location.href = '/hotel/' + hotelUrl + '/jobAssignments';
        });
});