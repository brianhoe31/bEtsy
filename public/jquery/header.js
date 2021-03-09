$(document).ready(function () {

    $.get("/cart_total", function(total){
        $(".cart").html(total.cart_total)
    })
    
});