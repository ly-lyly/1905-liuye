! function() {
    $goodsbox = $('#shoppingCartContainerCNY');
    if (getcookie('cookiesid') && getcookie('cookienum')) {
        $goodsbox.show();
        let s = getcookie('cookiesid').split(',');
        let n = getcookie('cookienum').split(',');
        $.ajax({
            url: 'http://10.31.158.19/1905-liuye/yougou/php/goodlist.php',
            dataType: 'json'
        }).done(function(dataObj) {
            // console.log(dataObj);
            $.each(s, function(index, value) {
                const sid = value - 1;
                const num = n[index];
                let data = dataObj[sid];

                let $clonebox = $('.shopping_cart_tr').eq(0).clone(true, true);
                $clonebox.find('.col_1').find('img').attr('src', data.url);

                $clonebox.find('.col_1').find('img').attr('sid', data.id);

                $clonebox.find('.col_2').find('a').find('div').html(data.title);

                $clonebox.find('.col_2').find('a').attr('title', data.title);

                $clonebox.find('.col_4').html(data.price);

                // $clonebox.find('.b-props').find('div').html(data.size);

                $clonebox.find('.col_5').find('input').val(num);

                $clonebox.find('.col_6').find('strong').html((data.price * num).toFixed(2));
                $clonebox.css('display', 'block');
                $('.item-list').append($clonebox);
                priceall();
            });
        })
    } else {
        $goodsbox.hide();
    }

    // goodslist();
    // if (getcookie('cookiesid') && getcookie('cookienum')) {

    // $.each(s, function(i, value) {
    //     goodslist(s[i], n[i]);
    // });
    // }


    kong();

    function kong() {
        if (getcookie('cookiesid') && getcookie('cookienum')) {
            $('.cart_null_div').hide();
        } else {
            $('.cart_null_div').show();
        }
    }


    function priceall() {
        let $sum = 0;
        let $count = 0;
        $('.shopping_cart_tr:visible').each(function(index, element) {
            if ($(element).find('.ygChkbox input').prop('checked')) {
                $sum += parseInt($(element).find('.col_5').find('input').val());
                $count += parseFloat($(element).find('.col_6').find('strong').html());
            }
        });

        // $('.amount-sum').find('em').html($sum);
        $('.totalprice').html($count.toFixed(2));
    }


    $('.allsel').on('change', function() {
        $('.shopping_cart_tr:visible').find(':checkbox').prop('checked', $(this).prop('checked'));
        $('.allsel').prop('checked', $(this).prop('checked'));
        priceall();
    });

    let $inputs = $('.shopping_cart_tr:visible').find(':checkbox');
    $('.item-list').on('change', $inputs, function() {
        if ($('.shopping_cart_tr:visible').find('input:checkbox').length == $('.shopping_cart_tr:visible').find('input:checked').size()) {
            $('.allsel').prop('checked', true);
        } else {
            $('.allsel').prop('checked', false);
        }
        priceall();
    });


    $('.goodsPlus').on('click', function() {
        let $count = $(this).parents('.shopping_cart_tr').find('.col_5 input').val();
        $count++;
        if ($count >= 99) {
            $count = 99;
        }
        $(this).parents('.shopping_cart_tr').find('.col_5 input').val($count);
        $(this).parents('.shopping_cart_tr').find('.col_5').find('strong').html(singlegoodsprice($(this)));
        priceall();
        setcookie($(this));

    });


    $('.goodsSub').on('click', function() {
        let $count = $(this).parents('.shopping_cart_tr').find('.col_5 input').val();
        $count--;
        if ($count <= 1) {
            $count = 1;
        }
        $(this).parents('.shopping_cart_tr').find('.col_5 input').val($count);
        $(this).parents('.shopping_cart_tr').find('.col_5').find('strong').html(singlegoodsprice($(this)));
        priceall();
        setcookie($(this));
    });


    $('.col_5 input').on('input', function() {
        let $reg = /^\d+$/g;
        let $value = parseInt($(this).val());
        if ($reg.test($value)) {
            if ($value >= 99) {
                $(this).val(99);
            } else if ($value <= 0) {
                $(this).val(1);
            } else {
                $(this).val($value);
            }
        } else {
            $(this).val(1);
        }
        $(this).parents('.shopping_cart_tr').find('.col_5').find('strong').html(singlegoodsprice($(this)));
        priceall();
        setcookie($(this));
    });


    function singlegoodsprice(obj) {
        let $dj = parseFloat(obj.parents('.shopping_cart_tr').find('.col_6').find('strong').html());
        let $cnum = parseInt(obj.parents('.shopping_cart_tr').find('.col_5 input').val());
        return ($dj * $cnum).toFixed(2);
    }


    let arrsid = [];
    let arrnum = [];

    function cookietoarray() {
        if (getcookie('cookiesid') && getcookie('cookienum')) {
            arrsid = getcookie('cookiesid').split(',');
            arrnum = getcookie('cookienum').split(',');
        }
    }

    function setcookie(obj) {
        cookietoarray();
        var $index = obj.parents('.shopping_cart_tr').find('img').attr('sid');
        arrnum[$.inArray($index, arrsid)] = obj.parents('.shopping_cart_tr').find('.col_5 input').val();
        addcookie('cookienum', arrnum.toString(), 7);
    }


    function delgoodslist(sid, arrsid) {
        var $index = -1;
        $.each(arrsid, function(index, value) {
            if (sid == value) {
                $index = index;
            }
        });
        arrsid.splice($index, 1);
        arrnum.splice($index, 1);
        addcookie('cookiesid', arrsid.toString(), 7);
        addcookie('cookienum', arrnum.toString(), 7);
    }


    $('.item-list').on('click', '.col_7 .JsDel', function(ev) {
        cookietoarray(); //
        if (confirm('你确定要删除吗？')) {
            $(this).parents('.clearfix').remove();
        }

        delgoodslist($(this).parents('.clearfix').find('.col_1').find('img').attr('sid'), arrsid);
        var delsid = $(this).parents('.clearfix').find('.col_1').find('img').attr('sid');

        delcookie(delsid);
        if (!getcookie('cookienum')) {
            $goodsbox.hide();
            $('.cart_null_div').show();
        }
        priceall();
    });



    $('.operation a').on('click', function() {
        cookietoarray();
        if (confirm('你确定要全部删除吗？')) {
            $('.shopping_cart_tr:visible').each(function() {
                if ($(this).find('input:checkbox').is(':checked')) {
                    $(this).remove();
                    var delsid = $(this).parents('.clearfix').find('.col_1').find('img').attr('sid');
                    delgoodslist($(this).parents('.clearfix').find('img').attr('sid'), arrsid);
                    delcookie(delsid);
                }
            });
            if (!getcookie('cookienum')) {
                $goodsbox.hide();
                $('.cart_null_div').show();
            }
            priceall();
        }
    });


}();