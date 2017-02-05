//实例化地图类
var map = new AMap.Map('container',{
    zoom: 12,
    center: [latitude,longitude]
});

//创建点标记
var marker = new AMap.Marker({
    position: [latitude, longitude],
    map:map
});

//设定窗口信息
var infowindow = new AMap.InfoWindow({
    content: '<h6>塔机编号:1001</h6>' +
    '<div>' +
    '<p>起重重量：' +weight+'t</p>'+
    '<p>起升高度：' +height+'m</p>'+
    '<p>边幅幅度：' +amplitude+'m</p>'+
    '<p>旋转角度：' +rotate+'°</p>'+
    '<p>风速：' +wind+'m/s</p>'+
    '</div>',

    offset: new AMap.Pixel(0, -30),
    size:new AMap.Size(150,0)
});

//点击标记触发弹窗
var clickHandle = AMap.event.addListener(marker, 'click', function() {
    infowindow.open(map, marker.getPosition())
});

//添加控件
AMap.plugin(['AMap.ToolBar','AMap.Scale'],function(){
    var toolBar = new AMap.ToolBar();
    var scale = new AMap.Scale();
    map.addControl(toolBar);
    map.addControl(scale);
})