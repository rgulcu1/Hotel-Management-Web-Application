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


$(".deleteRestaurant").click(function() {
    var index = $(this).closest('tr').index();
    var restaurantID = $("tr").find("td:eq(0)").eq(index).text().replace(/\s+/g, '');


    $.post("/hotel/" + hotelUrl + "/restaurants/delete", {
            restaurantID: restaurantID
        },
        function(data, status) {
            window.location.href = '/hotel/' + hotelUrl + '/restaurants';
        });
});