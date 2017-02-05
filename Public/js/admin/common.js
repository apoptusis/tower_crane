//异步处理表单提交的数据
$('#button-submit').on('click', function(){
    var data = $("#tower-form,#tower-form2").serializeArray();
    postData = {};
    $(data).each(function (i){
        postData[this.name] = this.value;
    });
    console.log(postData);
    url = SCOPE.post_url;
    jump = SCOPE.jump_url;
    $.post(url,postData,function (result) {
        if(result.status == 1){
            return dialog.success(result.message,jump);
        }else if (result.status == 0){
            return dialog.error(result.message);
        }
    },"JSON");
});

//删除按钮操作
$(".icon-remove").click(function(){
    var url = SCOPE.changeStatus_url;
    var id = $(this).attr('attr-id');

    data = {};
    data['id'] = id;
    data['status'] = -1;

    layer.open({
        type : 0,
        title : '是否删除？',
        btn : ['yes','no'],
        icon : 3,
        closeBtn : 2,
        content : '是否确定删除?',
        scrollbar : true,
        yes : function () {
            $.post(url,data,function (result) {
                if(result.status == 1){
                    return dialog.success(result.message,'');
                }else{
                    return dialog.error(result.message);
                }
            },"Json");
        }
    });
});


//添加和修改按钮操作
$("#button-add").click(function(){
    layer.msg('加载中', {icon: 16,time: 200});
    var url = SCOPE.add_url;
    window.location.href = url;
});

//取消按钮操作
    $("#button-cancel").click(function(){
    var url = SCOPE.jump_url;
    window.location.href = url;
});

//导出按钮操作
    $("#button-export").click(function(){
    layer.msg('加载中', {icon: 16,time: 200});
    var url = SCOPE.export_url;
    window.location.href = url;
});

//小提示//小提示//小提示//小提示//小提示//小提示//小提示//小提示

    $('#button-export').mouseover(function(){
    layer.tips('以Excel格式批量导出用户信息', '#button-export', {
        tips: [1, '#596782'],
        time: 2000,
    });
});

//导入按钮操作
    $('#button-import').mouseover(function(){
    layer.tips('请先上传文件', '#file_upload', {
        tips: [1, '#78BA32'],
        time: 2000,
    });
});

//选择文件操作
    $('#file_upload').mouseover(function(){
    layer.tips('只能上传后缀名为：xls、xlsx的Excel文件，上传格式请见帮助。', '#file_upload', {
        tips: [1, '#0FA6D8'],
        time: 5000,
    });
});

// 查看塔机详情提示
// layer.tips('点击此处查看塔机详情', '#detail_tip', {
//     tips: [4, '#3595CC'],
//     time: 4000
// });


