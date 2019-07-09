;
(function($) {
    $username = $('#reg_mobile_');
    $errortips = $('#reg_mobile_tip');
    $password = $('#reg_password_');
    $email = $('.email')
    $reg_password_tip1 = $('#reg_password_tip1');
    $reg_password2 = $('#reg_password2');
    $reg_password_tip2 = $('#reg_password_tip2');
    $submit = $('#reg_buton');
    $checked = $('#rules');
    $ruleTips = $('#ruleTips');
    $usernameflag = true;
    $phpurl = 'http://10.31.158.19/1905-liuye/yougou/php/';

    $username.eq(0).on('blur', function() {
        $.ajax({
            type: 'post',
            url: $phpurl + 'reg.php',
            data: {
                mobile: this.value
            },
            success: function(d) {
                if (!d) {
                    $errortips.html('√');
                    $errortips.css("color", "green");
                    $usernameflag = true;
                } else {
                    $errortips.html('该用户名已存在');
                    $errortips.css("color", "red");
                    $usernameflag = false;
                }
                return false;
            }
        })
    });

})(jQuery)