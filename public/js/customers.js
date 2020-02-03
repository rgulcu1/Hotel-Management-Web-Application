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