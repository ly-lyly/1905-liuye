;
! function($) {
    var sid = location.search.substring(1).split('=')[1];

    $spic = $('.spic');
    $sf = $('.sf');
    $bpic = $('.bpic');
    $bf = $('.bf');
    $pic = $('.jqzoom')

    $title = $('.pictitle');
    $price = $('price');
    $baseUrl = '10.31.158.19';
    $.ajax({
        url: 'http://10.31.158.19/1905-liuye/yougou/php/details.php',
        data: {
            id: sid
        },
        dataType: 'json'
    }).done(function(datapic) {
        console.log(datapic);
        $spic.get(0).src = datapic.url;
        $bpic.get(0).src = datapic.url;
        $title.html(datapic.title);
        $price.html(datapic.price);
        $ulpics = $('.ulpics')
        $ullist = datapic.imgurls.split(',');
        $lihtml = '';
        $goodprice = $('.price');
        $goodprice.html($price);
        $.each($ullist, function(index, value) {
            $lihtml += `<li class="hover">
            <img width="60" height="60" picBigUrl="${value}" picLargeUrl="//i1.ygimg.cn/pics/basto/2019/101198931/101198931_01_l.jpg?5" src="//i1.ygimg.cn/pics/basto/2019/101198931/101198931_01_t.jpg?5" loadflag="1"
                class="picSmallClass0" alt="${$title}" />
            <i class="icon"></i>
        </li>`
        })
        $ulpics.html($lihtml);


    });
    $pic.on('mouseover', function(ev) {
        $sf.css({
            visibility: 'visible'

        });
        $bf.css({
            visibility: 'visible',
            display: 'block'

        });
        $bili = $bpic.width() / $spic.width();
        $(this).on('mousemove', function(ev) {

            $sf.width($spic.width() * $bf.width() / $bpic.width());
            $sf.height($spic.height() * $bf.height() / $bpic.height());
            let l = ev.pageX - $spic.offset().left - $sf.width() / 2;
            let t = ev.pageY - $spic.offset().top - $sf.height() / 2;
            if (l < 0) {
                l = 0;
            } else if (l >= $spic.width() - $sf.width()) {
                l = $spic.width() - $sf.width();
            }
            if (t < 0) {
                t = 0
            } else if (t >= $spic.height() - $sf.height()) {
                t = $spic.height() - $sf.height();
            }
            $sf.css({
                left: l,
                top: t
            });
            $bpic.css({
                left: -l * $bili,
                top: -t * $bili
            });
            // console.log($bpic.offset().top);
            // console.log($bpic.offset().left);

        })

    })
    $pic.on('mouseout', function() {
        // $spic.off('mouseover');
        // $(document).off('mouseup');
        $sf.css({
            visibility: 'hidden'
        });
        $bf.css({
            visibility: 'hidden'
        })
    });
    $buttons = $('.buttons a');
    $size = $('.size a');
    $number = $('#number');
    $num = 1;
    $sizebox = $('#select_size');
    $close = $('#select_size_close');
    $size.on('click', function() {
        $(this).addClass('select').siblings().removeClass('select');
    });
    $close.on("click", function() {
        $sizebox.css({
            display: 'none'
        })
    });
    let $flag = false;
    $buttons.eq(0).on('click', function() {


        $size.each(function(index, ele) {
            console.log($(ele).hasClass('select'));
            if ($(ele).hasClass('select')) {
                $flag = true;
                $sizebox.css({
                    display: 'none'
                })
            }
        })
        console.log($flag);
        if ($flag) {

            $num++;
            $number.val($num);
            console.log($num);
            console.log($number.val());
            if ($number.val() > 3) {
                $number.val(3);
                alert('限购三双！');
            }

        } else {
            $sizebox.css({
                display: 'block'
            })
        }

    });
    $buttons.eq(1).on('click', function() {

        $size.each(function(index, ele) {
            // console.log($(ele).hasClass('select'));
            if ($(ele).hasClass('select')) {
                $flag = true;
                $sizebox.css({
                    display: 'none'
                })
            }
        })

        if ($flag) {

            $num--;
            $number.val($num);
            // console.log($num);
            // console.log($number.val());

            if ($number.val() < 1) {
                $number.val(1);
            }

        } else {
            $sizebox.css({
                display: 'block'
            });

        }
    });
    // 购物车操作
    $shoppingcart = $('#addShoppingCart');
    $alertbox = $('#add_to_car');
    let arrsid = []; //商品编号
    let arrnum = []; //商品数量
    //如果cookie存在，获取cookie的值，并转换成数组
    function cookievalue() {
        if ($.cookie('cookiesid') && $.cookie('cookienum')) {
            arrsid = $.cookie('cookiesid').split(',');
            arrnum = $.cookie('cookienum').split(',');
        }
    }

    // $number = $('#number');
    $shoppingcart.on('click', function() {
        //确定按钮是第一次还是多次。
        //先获取cookie的值,而且是一个数组。
        cookievalue();
        //当前按钮对应得sid，如果当前按钮对应得sid存在arrsid中，存在
        var sid = $spic.getAttribute('sid'); //当前页面的sid
        if (arrsid.indexOf(sid) === -1) {
            arrsid.push(sid);
            arrnum.push($number.val());
            $.cookie('cookiesid', arrsid.toString(), 10);
            $.cookie('cookienum', arrnum.toString(), 10);
        } else {
            let sum = Number(arrnum[arrsid.indexOf(sid)]) + Number($number.val()); //获取累加的值
            arrnum[arrsid.indexOf(sid)] = sum;
            $.cookie('cookienum', arrnum.toString(), 10);
        }
    });

    console.log($.cookie(123))
}(jQuery)