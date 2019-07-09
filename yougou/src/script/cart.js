! function() {
    function goodlist(id, count) {
        $.ajax({
            url: 'http://10.31.158.19/1905-liuye/yougou/php/goodlist.php',
            dataType: 'json'
        }).done(function(data) {
            $.each(data, function(index, value) {
                if (id === value.sid) {
                    var $clonebox = $('.shopping_cart_tr:hidden').clone(true, true);
                    $clonebox.find('.goods-pic').find('img').attr('src', value.url);
                    $clonebox.find('.goods-pic').find('img').attr('sid', value.sid);
                    $clonebox.find('')
                }
            })
        })
    }
}()