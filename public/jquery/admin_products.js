
$(document).ready(function () {

    /*product-index delete */
    $("form.delete").hide();

    $(".delete_btn").on("click", function(){
        $("form").show();
    })    

    $(".cancel").on("click", function(e){
        e.preventDefault();

        $("form.delete").hide();
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

    //submit new product form 
    $("form#main_form").submit(function(e){
        e.preventDefault()

        $.ajax({
          url: '/admin/products/new',
          type:'POST',
          data: $("form#main_form").serialize()
        }).done(returndata => {
            console.log(returndata);
            $(".new_product .error").html(returndata);
            // window.location.href="/admin/products/";
        })
    })

});
