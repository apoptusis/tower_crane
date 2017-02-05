var latitude = {};
var longitude = {};
var postData = {};
var data = {};
var mapData = {};
postData['action'] = 'map';

//异步获取塔机群位置信息
$.post(url,postData,function (result) {
    var mapData = result['data'];
    // console.log(mapData);

    //实例化地图类
    var map = new AMap.Map('container',{
        zoom: 12,
        center: [mapData[0].latitude,mapData[0].longitude]  //中心点位固定1001号塔机，而不是按照更新时间最近来确定，可以进一步优化
    });
    //循环输出多个点标记和文字
    var infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});

    for(var k in mapData){
        var marker = new AMap.Marker({
            map: map,
            position: [mapData[k].latitude,mapData[k].longitude],
            offset: new AMap.Pixel(-12, -36)
        });
        marker.content =
            '<h6>塔机编号:'+mapData[k].crane_id+'</h6>' +
            '<div>' +
            '<p>起重重量：' +mapData[k].weight+'t</p>'+
            '<p>起升高度：' +mapData[k].height+'m</p>'+
            '<p>边幅幅度：' +mapData[k].amplitude+'m</p>'+
            '<p>旋转角度：' +mapData[k].rotate+'°</p>'+
            '<p>风速：' +mapData[k].wind+'m/s</p>'+
            '</div>';
        marker.on('click', markerClick);
    }

    function markerClick(e) {
        infoWindow.setContent(e.target.content);
        infoWindow.open(map, e.target.getPosition());
    }

    //添加控件
    AMap.plugin(['AMap.ToolBar','AMap.Scale'],function(){
        var toolBar = new AMap.ToolBar();
        var scale = new AMap.Scale();
        map.addControl(toolBar);
        map.addControl(scale);
    });

    //使地图自适应显示到合适的范围
    AMap.event.addDomListener(document.getElementById('setFitView'), 'click', function() {
        var newCenter = map.setFitView();
    });
    
},"JSON");
