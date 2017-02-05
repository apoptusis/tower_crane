$('.remember-me').on('mouseover', function(){
    layer.tips('1天之内免登陆', '.remember-me', {
        tips: [3, '#596782'],
        time: 1000,
    });
});

$('#button-submit').on('click', function(){
    var username = $('input[name="username"]').val();
    var password = $('input[name="password"]').val();
    var url = SCOPE.post_url;
    var jump = SCOPE.jump_url;
    if($("input[type='checkbox']").is(':checked')){
        var remember = $('input[name="remember"]').val();
    };
    var data = {'username':username,'password':password,'remember':remember};
    //执行异步请求
    // console.log(data);
    $.post(url,data,function (result){
        if(result.status == 0){
            return dialog.error(result.message);
        }
        if(result.status == 1){
            return dialog.success(result.message,jump);
        }
    },'JSON');
});