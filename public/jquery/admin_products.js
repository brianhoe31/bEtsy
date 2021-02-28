
$(document).ready(function () {

    /*product-index delete */

    //======= Pop-Up window to confirm Delete of Product ========//
    $(".delete_btn").on("click", function(e){
        e.preventDefault();

        $.get($(this)[0].href, function(returndata){
            $(".delete_form").html(returndata);
        });
    })    

    $(".cancel").on("click", function(e){
        e.preventDefault();

        $(".delete_form").hide();
    })

    $("form .delete").submit(function(e) {
        e.preventDefault();

        $.post($(this)[0].href, function(){
            window.location.href="/admin/products/";
        })
    })

    //======= Adding images on Add-Product Page ========//
    $("form#image_form").submit(function (e) {
        e.preventDefault();

        var formData = new FormData();
        var files = $('#file')[0].files;
        
        if(files.length > 0){
            for(var i=0; i<files.length; i++){
                formData.append('file', files[i]);
            }

            $.ajax({
                url: '/admin/products/new/images',
                type: 'POST',
                data: formData,
                contentType: false,
                processData: false,
                success: function (returndata) {
                    $(".pending_upload").html(returndata);

                },
                error: function () {
                    alert("error in ajax form submission");
                }
            });
        }
  
        return false;
    });

    //removing image that's queued up to upload
    $(".pending_upload a").on('click', function(e){
        e.preventDefault();

        $.post($(this)[0].href, function(returndata){
            $(".pending_upload").html(returndata);
        })
    })

});
