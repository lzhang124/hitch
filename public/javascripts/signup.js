$(function(){    

    var phoneformat = /^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$/;
    var password = $("#password");
    var password2 = $("#password2");
    var phone = $("#phone");

    $("form").submit(function() {
        var isFormFilled = true;
        if (password2.val() !== password.val()) {
            password2.addClass("error");
            isFormFilled = false;
        };
        return isFormFilled;
    });

    password2.keyup(function() {
        if (password2.val() !== password.val()) {
            password2.removeClass("success").addClass("error");
        } else {
            password2.removeClass("error").addClass("success");
        }
    });

    password2.blur(function() {
        password2.removeClass("success");
    });
});
