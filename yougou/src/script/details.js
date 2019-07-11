;
! function($) {
    var sid = location.search.substring(1).split('=')[1];

    $spic = $('.spic');
    $sf = $('.sf');
    $bpic = $('.bpic');
    $bf = $('.bf');
    $pic = $('.jqzoom')

    $title = $('.pictitle');

    $baseUrl = '10.31.158.19';
    $.ajax({
        url: 'http://10.31.158.19/1905-liuye/yougou/php/goodlist.php',
        dataType: 'json'
    }).done(function(datapic) { //接口数组

        datapic = datapic[sid - 1]; //sid-1 为数组的索引
        $price = $('#yitianPrice').find('i');

        $spic.get(0).src = datapic.url;
        $bpic.get(0).src = datapic.url;
        $title.html(datapic.title);
        $price.html(datapic.price);

        $ulpics = $('.ulpics');

        $ullist = datapic.imgurls.split(',');

        $lihtml = '';
        $colorhtml = '';
        $.each($ullist, function(index, value) {
            $lihtml += `<li class="hover">
                            <img width="60 " height="60 " picBigUrl="${value}" picLargeUrl="${value}" src="${value}
                            " loadflag="1"
                                class="picSmallClass0 " alt="BASTO/百思图2019夏季专柜同款黑色细跟休闲女凉鞋MA9M8BK9 " />
                            <i class="icon "></i>
                        </li> `;
        });
        $ulpics.html($lihtml);
        $list = $('.hover');
        $list.hover(function() {
            $spic.get(0).src = $(this).find('img').attr('src');
            $bpic.get(0).src = $(this).find('img').attr('src');
        })
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
                // console.log($(ele).hasClass('select'));
                if ($(ele).hasClass('select')) {
                    $flag = true;
                    $sizebox.css({
                        display: 'none'
                    })
                }
            })
            // console.log($flag);
        if ($flag) {

            $num++;
            $number.val($num);
            // console.log($num);
            // console.log($number.val());
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
    //购物车的思路

    var arrsid = []; //商品的sid
    var arrnum = []; //商品的数量
    function cookietoarray() {
        if (getcookie('cookiesid') && getcookie('cookienum')) { //判断商品是第一次存还是多次存储
            arrsid = getcookie('cookiesid').split(','); //cookie商品的sid  
            arrnum = getcookie('cookienum').split(','); //cookie商品的num
        }
    }

    //2.有了上面的方法，可以点击加入购物车按钮判断商品是否是第一次还是多次。
    console.log(1111111, $('#number').val());

    $('.list a').on('click', function() { //点击加入购物车按钮。

        //判断当前的商品sid是否存在购物车(cookie)
        //判断当前的按钮对应的商品的sid和取出的cookie里面的sid进行比较

        //获取当前的按钮对应的商品的sid
        // var $sid = $(this).parents('.goodsPic').find('.spic').attr('sid');
        cookietoarray(); //获取已经存在的cookie值。

        if ($.inArray(sid, arrsid) != -1) { //商品存在，数量叠加 
            //先取出cookie中的对应的数量值+当前添加的数量值，添加到对应的cookie中。
            var num = parseInt(arrnum[$.inArray(sid, arrsid)]) + parseInt($('#number').val());
            arrnum[$.inArray(sid, arrsid)] = num;
            addcookie('cookienum', arrnum.toString(), 10); //数组存入cookie
            addcookie('cookiesid', arrsid.toString(), 10)

        } else { //不存在，第一次添加。将商品的id和数量存入数组，再存入cookie.
            arrsid.push(sid); //将当前的id存入数组
            addcookie('cookiesid', arrsid.toString(), 10); //数组存入cookie
            arrnum.push($('#number').val());
            addcookie('cookienum', arrnum.toString(), 10); //数组存入cookie
            console.log(1111111, $('#number').val());
        }
    });



}(jQuery)