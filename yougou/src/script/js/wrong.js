//将模态框的表单信息传给后端
var $btn=$('#btn');
var $content=$('#wrongcontent');
var $where=$('#wrongwhere');
var $idea=$('#idea');
var $table=$('#table1');
var $tablebody=$('#table1 tbody');

$btn.on('click',function(){
	$.ajax({
		url:'http://10.31.165.15/js1803/jingdong/php/add.php',
		data:{
			content:$content.val(),
			where:$where.val(),
			idea:$idea.val()
		}
	}).done(function(){
		location.reload();
	})
});


//获取后端传输的数据接口，渲染到前端页面
$.ajax({
	url:'http://10.31.165.15/js1803/jingdong/php/getdata.php',
	dataType:'json'
}).done(function(data){
	var $wronghtml='';
	$.each(data,function(index,value1){
		$wronghtml+='<tr index="'+value1.sid+'">';
		$.each(value1,function(index,value2){
			$wronghtml+='<td>'+value2+'</td>';
		})
		$wronghtml+='<td><button class="btn btn-danger btn-xs">删除</button></td>';
		$wronghtml+='</tr>';
	});
	$tablebody.html($wronghtml);
});

//删除易错内容
$table.on('click','button',function(){
	$.ajax({
		url:'http://10.31.165.15/js1803/jingdong/php/del.php',
		data:{
			id:$(this).parents('tr').attr('index')
		}
	});
	if(confirm('你确定要删除吗?')){
		$(this).parents('tr').remove();//从tbody里面删除tr
	}
});
