"use strict";function addcookie(e,o,t){var i=new Date;i.setDate(i.getDate()+t),document.cookie=e+"="+o+";expires="+i}function getcookie(e){for(var o=document.cookie.split("; "),t=0;t<o.length;t++){var i=o[t].split("=");if(i[0]==e)return i[1]}}function delcookie(e){addcookie(e,"",-1)}