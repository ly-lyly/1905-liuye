"use strict";!function(){if(getcookie("cookiesid")&&getcookie("cookienum")){var o=getcookie("cookiesid").split(","),n=getcookie("cookienum").split(",");$.each(o,function(i,t){!function(n,e){$.ajax({url:"http://10.31.158.19/1905-liuye/yougou/php/cartdata.php",dataType:"json"}).done(function(i){$.each(i,function(i,t){if(n==t.sid){var o=$(".goods-item:hidden").clone(!0,!0);o.find(".goods-pic").find("img").attr("src",t.url),o.find(".goods-pic").find("img").attr("sid",t.sid),o.find(".goods-d-info").find("a").html(t.titile),o.find(".b-price").find("strong").html(t.price),o.find(".quantity-form").find("input").val(e),o.find(".b-sum").find("strong").html((t.price*e).toFixed(2)),o.css("display","block"),$(".item-list").append(o),s()}})})}(o[i],n[i])})}function s(){var o=0,n=0;$(".goods-item:visible").each(function(i,t){$(t).find(".cart-checkbox input").prop("checked")&&(o+=parseInt($(t).find(".quantity-form").find("input").val()),n+=parseFloat($(t).find(".b-sum").find("strong").html()))}),$(".amount-sum").find("em").html(o),$(".totalprice").html("￥"+n.toFixed(2))}getcookie("cookiesid")&&getcookie("cookienum")?$(".empty-cart").hide():$(".empty-cart").show(),$(".allsel").on("change",function(){$(".goods-item:visible").find(":checkbox").prop("checked",$(this).prop("checked")),$(".allsel").prop("checked",$(this).prop("checked")),s()});var i=$(".goods-item:visible").find(":checkbox");function t(i){return(parseFloat(i.parents(".goods-item").find(".b-price").find("strong").html())*parseInt(i.parents(".goods-item").find(".quantity-form input").val())).toFixed(2)}$(".item-list").on("change",i,function(){$(".goods-item:visible").find("input:checkbox").length==$(".goods-item:visible").find("input:checked").size()?$(".allsel").prop("checked",!0):$(".allsel").prop("checked",!1),s()}),$(".quantity-add").on("click",function(){var i=$(this).parents(".goods-item").find(".quantity-form input").val();99<=++i&&(i=99),$(this).parents(".goods-item").find(".quantity-form input").val(i),$(this).parents(".goods-item").find(".b-sum").find("strong").html(t($(this))),s(),a($(this))}),$(".quantity-down").on("click",function(){var i=$(this).parents(".goods-item").find(".quantity-form input").val();--i<=1&&(i=1),$(this).parents(".goods-item").find(".quantity-form input").val(i),$(this).parents(".goods-item").find(".b-sum").find("strong").html(t($(this))),s(),a($(this))}),$(".quantity-form input").on("input",function(){var i=parseInt($(this).val());/^\d+$/g.test(i)?99<=i?$(this).val(99):i<=0?$(this).val(1):$(this).val(i):$(this).val(1),$(this).parents(".goods-item").find(".b-sum").find("strong").html(t($(this))),s(),a($(this))});var e=[],c=[];function d(){getcookie("cookiesid")&&getcookie("cookienum")&&(e=getcookie("cookiesid").split(","),c=getcookie("cookienum").split(","))}function a(i){d();var t=i.parents(".goods-item").find("img").attr("sid");c[$.inArray(t,e)]=i.parents(".goods-item").find(".quantity-form input").val(),addcookie("cookienum",c.toString(),7)}function r(o,i){var n=-1;$.each(i,function(i,t){o==t&&(n=i)}),i.splice(n,1),c.splice(n,1),addcookie("cookiesid",i.toString(),7),addcookie("cookienum",c.toString(),7)}$(".item-list").on("click",".b-action a",function(i){d(),confirm("你确定要删除吗？")&&$(this).first().parents(".goods-info").remove(),r($(this).first().parents(".goods-info").find("img").attr("sid"),e),s()}),$(".operation a:first").on("click",function(){d(),confirm("你确定要全部删除吗？")&&($(".goods-item:visible").each(function(){$(this).find("input:checkbox").is(":checked")&&($(this).remove(),r($(this).find("img").attr("sid"),e))}),s())})}();