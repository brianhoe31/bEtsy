$(document).ready(function () {

    //change the thumbnails of the image 
    $(".preview_thumbnail img").on("click", function () {
        $(".preview_thumbnail img").removeClass("selected");
        $(this).addClass("selected");

        const img = $(this).attr('src');
        $(".main_thumbnail").attr('src', img);
    })

    //get the quantity of item added to cart and update cart & cart icon
    $(".product_info form").submit(function (e) {
        e.preventDefault();

        const quantity = $(this).find( "select[name='quantity']" ).val();

        $.post($(this)[0].href, {quantity: quantity}).done(function(total){
            $(".cart").html(total.cart_total);
        })
    })

});