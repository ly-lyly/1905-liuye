"use strict";!function(e){var s=location.search.substring(1).split("=")[1];$spic=e(".spic"),$sf=e(".sf"),$bpic=e(".bpic"),$bf=e(".bf"),$pic=e(".jqzoom"),$title=e(".pictitle"),$baseUrl="10.31.158.19",e.ajax({url:"http://10.31.158.19/1905-liuye/yougou/php/goodlist.php",dataType:"json"}).done(function(i){i=i[s-1],$price=e("#yitianPrice").find("i"),$spic.get(0).src=i.url,$bpic.get(0).src=i.url,$title.html(i.title),$price.html(i.price),$ulpics=e(".ulpics"),$ullist=i.imgurls.split(","),$lihtml="",$colorhtml="",e.each($ullist,function(i,s){$lihtml+='<li class="hover">\n                            <img width="60 " height="60 " picBigUrl="'+s+'" picLargeUrl="'+s+'" src="'+s+'\n                            " loadflag="1"\n                                class="picSmallClass0 " alt="BASTO/百思图2019夏季专柜同款黑色细跟休闲女凉鞋MA9M8BK9 " />\n                            <i class="icon "></i>\n                        </li> '}),$ulpics.html($lihtml),$list=e(".hover"),$list.hover(function(){$spic.get(0).src=e(this).find("img").attr("src"),$bpic.get(0).src=e(this).find("img").attr("src")})}),$pic.on("mouseover",function(i){$sf.css({visibility:"visible"}),$bf.css({visibility:"visible",display:"block"}),$bili=$bpic.width()/$spic.width(),e(this).on("mousemove",function(i){$sf.width($spic.width()*$bf.width()/$bpic.width()),$sf.height($spic.height()*$bf.height()/$bpic.height());var s=i.pageX-$spic.offset().left-$sf.width()/2,e=i.pageY-$spic.offset().top-$sf.height()/2;s<0?s=0:s>=$spic.width()-$sf.width()&&(s=$spic.width()-$sf.width()),e<0?e=0:e>=$spic.height()-$sf.height()&&(e=$spic.height()-$sf.height()),$sf.css({left:s,top:e}),$bpic.css({left:-s*$bili,top:-e*$bili})})}),$pic.on("mouseout",function(){$sf.css({visibility:"hidden"}),$bf.css({visibility:"hidden"})}),$buttons=e(".buttons a"),$size=e(".size a"),$number=e("#number"),$num=1,$sizebox=e("#select_size"),$close=e("#select_size_close"),$size.on("click",function(){e(this).addClass("select").siblings().removeClass("select")}),$close.on("click",function(){$sizebox.css({display:"none"})});var t=!1;$buttons.eq(0).on("click",function(){$size.each(function(i,s){e(s).hasClass("select")&&(t=!0,$sizebox.css({display:"none"}))}),t?($num++,$number.val($num),3<$number.val()&&($number.val(3),alert("限购三双！"))):$sizebox.css({display:"block"})}),$buttons.eq(1).on("click",function(){$size.each(function(i,s){e(s).hasClass("select")&&(t=!0,$sizebox.css({display:"none"}))}),t?($num--,$number.val($num),$number.val()<1&&$number.val(1)):$sizebox.css({display:"block"})});var c=[],o=[];console.log(1111111,e("#number").val()),e(".list a").on("click",function(){if(getcookie("cookiesid")&&getcookie("cookienum")&&(c=getcookie("cookiesid").split(","),o=getcookie("cookienum").split(",")),-1!=e.inArray(s,c)){var i=parseInt(o[e.inArray(s,c)])+parseInt(e("#number").val());o[e.inArray(s,c)]=i,addcookie("cookienum",o.toString(),10),addcookie("cookiesid",c.toString(),10)}else c.push(s),addcookie("cookiesid",c.toString(),10),o.push(e("#number").val()),addcookie("cookienum",o.toString(),10),console.log(1111111,e("#number").val())})}(jQuery);