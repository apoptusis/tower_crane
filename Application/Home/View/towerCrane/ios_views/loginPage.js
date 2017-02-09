import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    AlertIOS,
    Image,
    AsyncStorage,
} from 'react-native';
import Util from './common/util'
import indexPage from './indexPage'
import Storage from 'react-native-storage';

var img1 = 'data:image/png;base64,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';
var img2 = 'data:image/png;base64,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';
var img3 = 'data:image/png;base64,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';

// 初始化Storage
var storage = new Storage({
    size: 1000,                         // 最大容量
    storageBackend: AsyncStorage,       // 存储引擎
    defaultExpires: 1000 * 3600 * 24,   // 数据过期时间
    enableCache: true,                  // 读写时在内存中缓存数据
});
// 指定为全局变量
global.storage = storage;

export default class loginPage extends Component {
    constructor(props){
        super(props);
        this.username = "";
        this.password = "";
    }
    render() {
        return(
            <View style={styles.wrapper}>
                <Image
                    style={styles.loginIcon}
                    source={{url:img1}}
                />
                <View style={styles.container}>
                    <View>
                        <Image
                            style={styles.inputIcon}
                            source={{url:img2}}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="输入用户名或手机号"
                            autoCapitalize="none"
                            autoCorrect={false}
                            selectionColor="#6a617c"
                            placeholderTextColor="#6a617c"
                            clearButtonMode="while-editing"
                            onChangeText={(text) => {
                                this.username = text}}
                        />
                    </View>
                    <View>
                        <Image
                            style={styles.inputIcon}
                            source={{url:img3}}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="输入登录密码"
                            secureTextEntry={true}
                            autoCapitalize="none"
                            selectionColor="#6a617c"
                            placeholderTextColor="#6a617c"
                            clearButtonMode="while-editing"
                            onChangeText={(text) => {
                                this.password = text}}
                        />
                    </View>
                    <View>
                        <TouchableOpacity onPress={this._checkLogin.bind(this)}
                                          style={styles.button}>
                            <Text style={styles.buttonText}>
                                登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Image source={{url:'http://localhost:8888/tower_crane/Application/Home/View/towerCrane/images/bg.jpg'}}
                       style={styles.backgroundImage}
                       resizeMode='contain'/>
            </View>
        );
    }
    _checkLogin() {
        // 创建表单对象
        let that = this;
        let formData = new FormData();
        formData.append("username",this.username);
        formData.append("password",this.password);
        let url = "http://localhost:8888/tower_crane/index.php/Home/towerCrane/login";
        // POST给后端，返回status，message，data
        Util.post(url,formData,
            function(responseJson) {
                if(responseJson.status === 0){
                    AlertIOS.alert('登录失败', responseJson.message, [{text: '确认'}]);
                }
                if(responseJson.status === 1){
                    storage.save({
                        key: 'storageData',
                        rawData: {
                            tokenId: JSON.stringify(responseJson.data.token),
                            username: JSON.stringify(responseJson.data.username),
                        },
                    });
                    // 跳转到首页
                    const { navigator } = that.props;
                    if(navigator) {
                        navigator.push({
                            name: '主页',
                            component: indexPage,
                            // params: {
                            //     username: responseJson.data.username,
                            // }
                        })
                    }
                }
            },
            function(err){
                AlertIOS.alert('网络异常', err, [{text: '确认'}])
            });
    };
}

const styles = StyleSheet.create({
    wrapper: {
        flex:1,
        backgroundColor: '#ffeed6',
    },
    backgroundImage: {
        zIndex: 1000,
        flex: 1.2,
    },
    loginIcon: {
        zIndex: 1000,
        // top: 50,
        top: Util.size.height/20,
        left: Util.size.width/2 - 50,
        width: 100,
        height: 100,
    },
    container: {
        flex: 1,
        zIndex: 100,
        height: Util.size.height/2,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: 'rgba(96,96,96,0.2)',
    },
    inputIcon: {
        width: 25,
        height: 25,
        top: 33,
        left: 10,
        zIndex : 100,
    },
    input: {
        marginBottom: -10,
        paddingLeft: 45,
        paddingTop: 5,
        height: 40,
        width: Util.size.width/1.2,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 3,
        backgroundColor: '#fff'
    },
    button: {
        marginTop: 40,
        height: 40,
        width: Util.size.width/1.2,
        borderRadius: 3,
        backgroundColor: "#76a4a1",
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 40,
    },
});

module.exports = loginPage;