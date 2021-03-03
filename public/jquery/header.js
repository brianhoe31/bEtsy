$(document).ready(function () {

    console.log('this ran');
    $.get("/cart_total", function(total){
        console.log(total);
        $(".cart").html(total.cart_total)
    })
    
});