;
! function($) {
    function setcookie(key, value, day) {
        let date = new Date();
        date.setDate(date.getDate() + day);
        document.cookie = key + '=' + encodeURI(value) + ';expires=' + date;
    }

    function getcookie(key) {
        let arr = decodeURI(document.cookie).split('; ');
        for (let i = 0; i < arr.length; i++) {
            let newarr = arr[i].split('=');
            if (newarr[0] === key) {
                return newarr[1];
            }
        }
    }

    function delcookie(key) {
        setcookie(key, '', -1);
    }
    let sid = location.search.substring(1).split('=')[1];
    $spic = $('.spic');
    $sf = $('.sf');
    $bpic = $('.bpic');
    $bf = $('.bf');

    $title = $('.title');
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
        $.each($ullist, function(index, value) {
            $lihtml += `<li class="hover">
            <img width="60" height="60" picBigUrl="${value}" picLargeUrl="//i1.ygimg.cn/pics/basto/2019/101198931/101198931_01_l.jpg?5" src="//i1.ygimg.cn/pics/basto/2019/101198931/101198931_01_t.jpg?5" loadflag="1"
                class="picSmallClass0" alt="${$title}" />
            <i class="icon"></i>
        </li>`
        })
        $ulpics.html($lihtml);

    });
    $spic.on('mouseover', function(ev) {
        $sf.css({
            visibility: 'visible',
            display: 'block'
        });
        $bf.css({
            visibility: 'visible',
            display: 'block'
        });
        $bili = $bpic.width() / $spic.width();
        $(document).on('mousemove', function(ev) {

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

            return false;
        })
        $(document).on('mouseout', function() {
            $spic.off('mouseover');
            $(document).off('mouseup');
            // $sf.css({
            //     visibility: 'hidden'
            // });
            // $bf.css({
            //     visibility: 'hidden'
            // })
        })
    })
}(jQuery)