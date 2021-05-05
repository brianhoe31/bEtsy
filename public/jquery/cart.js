$(document).ready(function () {

    //======= Shopping Cart - same as billing checkbox greying out inputs========//
    $(".same_as_ship").click(function(event){
        if($('.same_as_ship').is(':checked')){
            $('.billing_input').prop("disabled", true); 
        } else {
            $('.billing_input').prop("disabled", false); // Element(s) are now enabled.
        }
    });

});