require(['effects'], function() {
    $('#indexFocusPic').switch({
        btns: '.indexfocusft span',
        pics: '.imgBox',
        activeClass: 'hover',
        etype: 'click',
        autoplay: 2000,
    });
    $('#loutinav').louti({
        stairs: 'ul li',
        activeClass: 'active'
    })
});
! function() {
    const goodlist = document.querySelector('.proList');
    ajax({
        url: 'http://10.31.158.19/1905-liuye/yougou/php/goodlist.php',
        dataType: 'json',
        success: function(piclist) {
            console.log(piclist.length)
            let htmlstr = '';
            for (let i = 0; i < piclist.length; i++) {
                htmlstr += `
                <li>
                <div class="srchlst-wrap">
                  <div class="hd goods-head">
                     <a href="http://10.31.158.19/1905-liuye/yougou/src/details.html?sid=${piclist[i].id}" target='_blank'>
                          <sup no="101086358" class="mark_small_101086358 salepic"></sup>
                          <img width="230" height="230" alt="${piclist[i].title}" class="lazy_loading" src="${piclist[i].url}" original="//i1.ygimg.cn/pics/bata/2019/101086358/101086358_01_mb.jpg?11" />
                      </a>
                  </div>
                  <div class="bd goods-desc">
                      <span class='nptt'>
                          <a target='_blank' href='http://10.31.158.19/1905-liuye/yougou/src/details.html' class="elli"  title="${piclist[i].title}">${piclist[i].title}</a>
                      </span>
                      <p class="price_sc price-wrap">
                          <em class="ygprc15 price_no101086358 cur-price">&yen;&nbsp;<i>${piclist[i].price}</i></em>
                          <del class="origin-price">&yen;&nbsp;<i>1099</i></del>
                      </p>
                      <em class="collect" id="101086358" url="http://10.31.158.19/1905-liuye/yougou/src/details.html" src="${piclist[i].url}" price="${piclist[i].price}"></em>
                  </div>
                </div>
              </li>
            `;
            }
            goodlist.innerHTML = htmlstr;
        }
    })
}();