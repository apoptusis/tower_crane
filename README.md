# 塔机数据监控系统

## 1 项目介绍
> 本项目是基于React Native的一款APP。后端采用PHP的ThinkPHP框架做数据与逻辑的处理，前端采用网页（后台）和IOS APP（前台），数据库为MySQL。

### 1.1 基本流程思路：
1. 塔机上的安装了很多传感器，这些传感器采集塔机运行时的实时数据。
2. 采集到的数据传输给塔机上的主控平台（ARM9）。
3. 主控平台处理数据之后，再通过总线再传给DTU(Data Transfer unit)。
4. DTU使用HttpClient模式将数据发送给指定的服务器。
5. 服务器端将数据写入数据库。
6. 客户端读取数据库内容。

### 1.2  实现的功能
- **地图定位**：根据塔机上的GPRS模块发送的数据实现塔机在地图上的实时定位，通过手机上的GPS可以获取用户的地理位置信息，并实现用户当前位置到塔机当前位置的导航。
- **数据监控**：实时监控塔机的起重重量、起升高度、变幅幅度、起重力矩、回转角度、风速等数据。实时监控并统计塔机各关键位置的限位器报警情况。查询不同塔机的工作历史数据，包括：工况信息等数据，塔机累积工作时长，塔机锁机状态和塔机SIM卡服务状态并以图表的形式显示。查询塔机的基本参数数据，包括：塔机力矩特性曲线、起重臂臂长、平衡臂臂长、吊高高度、前桅距离，后桅距离、额定起重重量、额定起升高度、额定变幅幅度、额定起重力矩、额定回转角度、额定风速等。
- **文章推送**：后台可以编辑和推送文章供客户端阅读查询，文章的形式包括但不局限于：各塔机详细资料、公司新产品信息、塔机维护修理和保养资料、塔机事故新闻、广告等。
- **用户设置**：用户可以自行修改登录密码、用户名、邮箱、手机号等基本信息，同时可以展示授权状态、公司地址等详细信息。用户可以发送信息反馈给后台系统。

### 1.3 使用的库和第三方插件：

**APP：**

>react-native-percentage-circle

>react-native-pull

>react-native-search-bar

>react-native-splash-screen

>react-native-storage

>react-native-swiper

>react-native-vector-icons

>PHPMailer

>echarts

**后台：**

>PHPExcel

>Bootstrap

>Layer

>Uploadify

>Jquery

## 2 目录结构

```
├── Application  // 后台和APP主文件
│   ├── Admin        // 后台的Controller层和View层
│   ├── Common       // 前后台共用的Model层和公共函数
│   ├── Home         // 前台APP
│   │   ├── Controller      // APP的Controller
│   │   └── View/towerCrane // APP的View
│   │   │   ├──ios_views         // React-Native各模块组件
│   │   │   │   ├──common           // 共用方法
│   │   │   │   ├──data             // 数据展示模块
│   │   │   │   ├──map              // 地图定位模块
│   │   │   │   ├──read             // 资讯模块
│   │   │   │   ├──setting          // 设置模块
│   │   │   │   ├──indexPage.js     // 主页面
│   │   │   │   └──loginPage.js     // 登录页面
│   │   │   ├──index.ios.js      // ios端入口文件
│   │   │   ├──map.html          // 定位模块的webView页面
│   │   │   └──historyData.html  // 历史数据的WebView页面
│   └── Runtime	     // 运行时缓存
├── Image        // 项目效果演示的GIF
├── Public       // 后台使用到的JS文件、JS库、CSS文件和图片等
├── ThinkPHP     // ThinkPHP框架的文件，和PHP第三方库
├── Uploads      // 后台上传的Excel文件
├── index.php    // ThinkPHP入口文件
```

## 3 前台部分
### 3.1 功能演示
- 启动与启动

![启动](/Image/demo/1.gif)
![登录](/Image/demo/2.gif)

- 塔机定位和导航

![定位](./Image/demo/3.gif)

- 塔机数据展示

![历史和实时数据](/Image/demo/4.gif)
![数据统计](/Image/demo/5.gif)
![基础信息](/Image/demo/6.gif)

- 资讯页面

![文章搜索](/Image/demo/7.gif)
![文章详情](/Image/demo/8.gif)
![分类列表](/Image/demo/9.gif)

- 设置页面

![设置](/Image/demo/10.gif)
![修改密码](/Image/demo/11.gif)
![验证邮箱](/Image/demo/12.gif)
![修改密码](/Image/demo/13.gif)

### 3.2 代码总结

#### 1. 实现顶部导航

原本使用的是NavaigatorIOS组件来进行导航，如下：

```javascript
import { NavaigatorIOS } from 'react-native';
export default class read extends Component {
    render() {
        return (
            <NavigatorIOS
                initialRoute={{
                    component: readView,
                    title: '阅读',
                }}/>
        );
    }
}
```

但是在登录页面登录成功后，向下一个页面传递数据时，不知为什么页面无法跳转到主页（文档没看明白）。于是改用了官方更为推荐的Navaigator组件。

##### 1.1 初始化Navaigator

在index.ios.js中初始化一下，让进入APP时首先显示的是IndexPage这个组件：

```javascript
// 引入Navaigator组件
import { Navaigator } from 'react-native';
export default class towerCrane extends Component {
    render() {
        let defaultName = '主页';
        let defaultComponent = indexPage;
        return (
            <Navigator
          		// 初始化了进入APP后第一个显示的页面
                initialRoute={{ name: defaultName, component: defaultComponent }}
          		// 页面跳转时候的动画
                configureScene={(route) => {
                    if(route.component === loginPage){
                        return Navigator.SceneConfigs.FadeAndroid;
                    }
                        return Navigator.SceneConfigs.PushFromRight;
                }}
  				// route中是之前传递的name和component
  				// navigator是一个Navigator的对象，它有push pop jump...等方法
                renderScene={(route, navigator) => {
                    let Component = route.component;
                    // 这里传递了navigator作为props
                    return <Component {...route.params} navigator={navigator} />
                }} />
        );
    }
}
```

##### 1.2 在其他的组件中使用

在其他的组件里就可以进行navigator的push或pop了：

```javascript
const { navigator } = this.props;
if(navigator) {
    navigator.push({
    	name: '登录页',
    	component: loginPage,
  	})
}
```

##### 1.3 封装NavigationBar组件

在common/navBar.js中封装了NavigationBar组件。

这个组件非常简单，就是一个蓝色的View，中间显示页面标题，左边一个小图片和文字，点击左边执行一个函数navigator.pop一下。

组件有三个属性：

```javascript
const {
  title,		// 显示在中间的页面标题
  leftText,		// 显示在左边返回小箭头旁的文字
  leftAction,	// 点击左边返回小箭头是执行的函数
} = this.props;
```

根据传入的不同属性渲染不同的View，其实也就两种情况，是否有返回按钮。

```javascript
return (
        <View style={styles.wrapper}>
    {
        (()=>{
            if (leftText && title) {
                return  <View style={styles.container}>
                            <TouchableOpacity
                                style={styles.iconContainer}
                                onPress={ ()=>{leftAction()} }>
                                <Text style={styles.arrowText}>
                                    &lt;
                                </Text>
                                <Text style={styles.leftText}>
                                    {leftText}
                                </Text>
                            </TouchableOpacity>
                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>
                                    {title}
                                </Text>
                            </View>
                        </View>
            }
        })()
    }
    {
        (()=>{
            if (title && !leftText) {
                return  <View style={styles.container}>
                            <View style={styles.singleTitleContainer}>
                                <Text style={styles.title}>
                                    {title}
                                </Text>
                            </View>
                        </View>
            }
        })()
    }
        </View>
    )
}
```

##### 1.5 使用NavigationBar组件

在其他组件中就可以使用NavigationBar了：

``` javascript
// 引入NavigationBar
import NavigationBar from '../common/navBar';

// 在需要的地方使用NavigationBar，一般是render的View最前面
export default class test extends Component {
  render() {
        return (
          	<View>
                <NavigationBar
                    title={'意见反馈'}
                    leftText={'返回'}
                    leftAction={ this._backToFront.bind(this) }
                />
                // 这里有一些其他的代码...
            </View>
		);
    }
// 点击返回到上一个页面
_backToFront (){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }
}
```

##### 1.6 总结

通过上面的方法，总体上算是实现了页面的顶部导航，但是依然存在着几个问题和**需要优化**的地方：

1. _backToFront 函数应该封装在NavigationBar里。

   开始以为使用NavigationBar时会需要不同的点击左侧按钮执行的函数，所以没有封装在NavigationBar，后来发现点击左侧时，只需要返回上一页面这一个功能。导致每个用到NavigationBar的组件里都有写了一遍_backToFront。

2. Navaigator页面跳转动画卡顿

   页面跳转的动画是Navigator.SceneConfigs.PushFromRight，在跳转的时候明显感觉到不如NavaigatorISO流畅。

3. 返回按钮动画优化

   一般的APP页面跳转时，页面的标题从右边进入，返回按钮位置不变、透明度不断增加，慢慢的显示出来。返回按钮不应该和标题一起从右边进入页面。

#### 2. 与后端的数据传递

##### 2.1 封装POST和GET方法

使用Fetch API发送网络请求：

```javascript
    // GET方法
    get : function (url, successCallback, failCallback) {
        return fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                successCallback(responseJson);
            })
            .catch((error) => {
                failCallback(error);
            });
    },
	// POST方法
    post : function (url, data, successCallback, failCallback) {
        var fetchOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data;boundary=6ff46e0b6b5148d984f148b6542e5a5d'
            },
            body:data
        };
        return fetch(url, fetchOptions)
            .then((response) => response.json())
            .then((responseJson) => {
                successCallback(responseJson);
            })
            .catch((error) => {
                failCallback(error);
            });
    },
```

##### 2.2 向后端发送数据

使用post方法向后端发送数据，并得到后端存储的数据。

```javascript
_getData() {
    let that = this;
  	// 实例化FormData对象
    let formData = new FormData();
  	// 要发送的数据
    formData.append("sim_num",this.props.sim_num);
  	// 发送的URL
    let url = "http://localhost:8888/tower_crane/index.php/Home/towerCrane/realData";
    // 调用post方法
    Util.post(url , formData,
              	// 发送成功回调
                function (responseJson) {
                    if(responseJson.status === 0) {   
                      	alert('发送失败');
                    }
                    if(responseJson.status === 1) {
                        // 将后端返回的数据保存到state中
                        that.setState({
                              weight: responseJson.data.weight
                          });
                    }
      			// 发送失败回调
                }, 
              function (err) {   
                  alert(err);                      
              }
    );
}
```

##### 2.3后端返回数据

后端写一个show方法，返回JSON格式的数据。

```php
function show($status,$message,$data=array()){
    $result = array(
        'status' => $status,
        'message' => $message,
        'data' => $data,
    );
    exit(json_encode($result));
}
```
