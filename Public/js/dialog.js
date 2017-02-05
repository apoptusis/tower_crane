var dialog = {
    // 错误弹出层
    error : function(message) {
        // layer.config({skin:'layer-ext-moon',extend:'skin/moon/style.css'});
        layer.open({
            content : message,
            icon : 2,
            title : '错误提示',
        });
    },

    //成功弹出层
    success : function(message,url) {
        // layer.config({skin:'layer-ext-moon',extend:'skin/moon/style.css'});
        layer.open({
            content : message,
            icon : 1,
            yes : function(){
                location.href=url;
            },
        });
    },

    // 确认弹出层
    confirm : function(title,message,url) {
        // layer.config({skin:'layer-ext-moon',extend:'skin/moon/style.css'});
        layer.open({
            title : title,
            content : message,
            icon:3,
            btn : ['是','否'],
            yes : function(){
                location.href=url;
            },
        });
    },
}

