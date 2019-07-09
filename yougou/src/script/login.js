;
(function($) {
    $submit = $('.nlog_submit');
    $username = $('.username');
    $password = $('#password_');
    $phpurl = 'http://10.31.158.19/1905-liuye/yougou/php/';
    $submit.on("click", function() {
        $.ajax({
            type: 'post',
            url: $phpurl + 'login.php',
            data: {
                username: $username.val(),
                password: $password.val()
            }
        }).done(function(d) {
            if (!d) {
                alert('用户名或密码错误');
                $password.val('');
            } else {
                location.href = 'shouye.html';
                localStorage.setItem('successname', $username.val());
            }
        })
    })
})(jQuery)