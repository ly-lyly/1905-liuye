"use strict";!function(){if($goodsbox=$("#shoppingCartContainerCNY"),getcookie("cookiesid")&&getcookie("cookienum")){$goodsbox.show();var i=getcookie("cookiesid").split(","),r=getcookie("cookienum").split(",");$.ajax({url:"http://10.31.158.19/1905-liuye/yougou/php/goodlist.php",dataType:"json"}).done(function(s){$.each(i,function(i,t){var o=t-1,n=r[i],c=s[o],e=$(".shopping_cart_tr").eq(0).clone(!0,!0);e.find(".col_1").find("img").attr("src",c.url),e.find(".col_1").find("img").attr("sid",c.id),e.find(".col_2").find("a").find("div").html(c.title),e.find(".col_2").find("a").attr("title",c.title),e.find(".col_4").html(c.price),e.find(".col_5").find("input").val(n),e.find(".col_6").find("strong").html((c.price*n).toFixed(2)),e.css("display","block"),$(".item-list").append(e),a()})})}else $goodsbox.hide();function a(){var o=0;$(".shopping_cart_tr:visible").each(function(i,t){$(t).find(".ygChkbox input").prop("checked")&&(parseInt($(t).find(".col_5").find("input").val()),o+=parseFloat($(t).find(".col_6").find("strong").html()))}),$(".totalprice").html(o.toFixed(2))}getcookie("cookiesid")&&getcookie("cookienum")?$(".cart_null_div").hide():$(".cart_null_div").show(),$(".allsel").on("change",function(){$(".shopping_cart_tr:visible").find(":checkbox").prop("checked",$(this).prop("checked")),$(".allsel").prop("checked",$(this).prop("checked")),a()});var t=$(".shopping_cart_tr:visible").find(":checkbox");function o(i){return(parseFloat(i.parents(".shopping_cart_tr").find(".col_4").html())*parseInt(i.parents(".shopping_cart_tr").find(".col_5 input").val())).toFixed(2)}$(".item-list").on("change",t,function(){$(".shopping_cart_tr:visible").find("input:checkbox").length==$(".shopping_cart_tr:visible").find("input:checked").size()?$(".allsel").prop("checked",!0):$(".allsel").prop("checked",!1),a()}),$(".goodsPlus").on("click",function(){var i=$(this).parents(".shopping_cart_tr").find(".col_5 input").val();99<=++i&&(i=99),$(this).parents(".shopping_cart_tr").find(".col_5 input").val(i),$(this).parents(".shopping_cart_tr").find(".col_6").find("strong").html(o($(this))),a(),s($(this))}),$(".goodsSub").on("click",function(){var i=$(this).parents(".shopping_cart_tr").find(".col_5 input").val();--i<=1&&(i=1),$(this).parents(".shopping_cart_tr").find(".col_5 input").val(i),$(this).parents(".shopping_cart_tr").find(".col_6").find("strong").html(o($(this))),a(),s($(this))}),$(".col_5 input").on("input",function(){var i=parseInt($(this).val());/^\d+$/g.test(i)?99<=i?$(this).val(99):i<=0?$(this).val(1):$(this).val(i):$(this).val(1),$(this).parents(".shopping_cart_tr").find(".col_5").find("strong").html(o($(this))),a(),s($(this))});var n=[],c=[];function e(){getcookie("cookiesid")&&getcookie("cookienum")&&(n=getcookie("cookiesid").split(","),c=getcookie("cookienum").split(","))}function s(i){e();var t=i.parents(".shopping_cart_tr").find("img").attr("sid");c[$.inArray(t,n)]=i.parents(".shopping_cart_tr").find(".col_5 input").val(),addcookie("cookienum",c.toString(),7)}function l(o,i){var n=-1;$.each(i,function(i,t){o==t&&(n=i)}),i.splice(n,1),c.splice(n,1),addcookie("cookiesid",i.toString(),7),addcookie("cookienum",c.toString(),7)}$(".item-list").on("click",".col_7 .JsDel",function(i){e(),confirm("你确定要删除吗？")&&$(this).parents(".clearfix").remove(),l($(this).parents(".clearfix").find(".col_1").find("img").attr("sid"),n);var t=$(this).parents(".clearfix").find(".col_1").find("img").attr("sid");delcookie(t),getcookie("cookienum")||($goodsbox.hide(),$(".cart_null_div").show()),a()}),$(".operation a").on("click",function(){e(),confirm("你确定要全部删除吗？")&&($(".shopping_cart_tr:visible").each(function(){if($(this).find("input:checkbox").is(":checked")){$(this).remove();var i=$(this).parents(".clearfix").find(".col_1").find("img").attr("sid");l($(this).parents(".clearfix").find("img").attr("sid"),n),delcookie(i)}}),getcookie("cookienum")||($goodsbox.hide(),$(".cart_null_div").show()),a())})}();