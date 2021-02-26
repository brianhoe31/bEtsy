$(document).ready(function () {

    //change the thumbnails of the image 
    $(".preview_thumbnail img").on("click", function () {
        $(".preview_thumbnail img").removeClass("selected");
        $(this).addClass("selected");

        const img = $(this).attr('src');
        $(".main_thumbnail").attr('src', img);
    })

    $(".product_info button").on("click", function (e) {
        e.preventDefault();

        let value = parseInt($("select").val());

        let cart_val = parseInt($("span.cart").html());
        
        cart_val += value;
        $("span.cart").html(cart_val);

        //change the button to be greyed out and say 'added to cart' for 5 sec

    })

});