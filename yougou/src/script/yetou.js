;
! function() {
    $name = $('.item-frist');
    // console.log($name);
    $name.find('a').eq(0).html('你好!');
    $name.find('a').eq(1).html(getcookie('username'));
}