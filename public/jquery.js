$(document).ready(function () {
    //pop up form on new product page to add new category
    // $(".open").on("click", function () {
    //     console.log('hello');
    //     $(".popup-overlay, .popup-content").addClass("active");
    // });

    // //closign the pop up form for new category 
    // $(".remove").on("click", function () {
    //     //post request ajax call 
    //     // $.post("/admin/products/new/category", function(data){
    //     //     console.log(data);
    //     // })
    //     //ERROR: claism that it is due to 'slim' version which doesn't include ajax, but i tried multiple full version.  I susepct it's another reason 

    //     $(".popup-overlay, .popup-content").removeClass("active");
    // });

    // $('#image_form').on("submit", function (e) {
    //     e.preventDefault();
        
    //     $.post('/admin/products/new/images', $('#image_form').serialize(), function(data){
    //         console.log('it worked');
    //         console.log(data);
    //     })
    // });

    $("form#image_form").submit(function (e) {
        e.preventDefault();
        //grab all form data  
        var formData = new FormData($(this)[0]);

        console.log(formData);
        console.log('this ran');
  
        $.ajax({
            url: '/admin/products/new/images',
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (returndata) {
                //what to do after form has submitted 
                console.log(returndata);
                console.log(typeof returndata.files.upload)
                // if(typeof returndata.files.upload == array0)
                for(const data of returndata.files.upload){
                    $(".main_form > div:last-child").append(data);
                }
                
            },
            error: function () {
                alert("error in ajax form submission");
            }
        });
  
        return false;
    });

});


