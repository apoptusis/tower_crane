import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    NavigatorIOS,
    Navigator,
    ScrollView,
    AlertIOS,
    AsyncStorage,
} from 'react-native';
import Help from './help';
import Security from './security';
import Terms from './terms';
import NavigationBar from '../common/navBar';
import loginPage from '../loginPage'

var img1 = 'data:image/png;base64,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';
var img2 = 'data:image/png;base64,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';
var img3 = 'data:image/png;base64,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';
var img4 = 'data:image/png;base64,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';

export default class settingPage extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <View style={{flex:1,backgroundColor: '#f3f4f9',}}>
                <NavigationBar title={'设置'}/>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.logoContainer}>
                            <Image source={{url:"http://localhost:8888/tower_crane/Application/Home/View/towerCrane/images/logo.png"}}
                                   style={styles.logoImage}
                                   resizeMode='contain'/>
                        </View>
                        <View style={{justifyContent:'center', alignItems: 'center',marginTop:10,marginBottom:20}}>
                            <Text style={styles.versionText}>版本号1.0.0</Text>
                        </View>
                        <View style={styles.itemContainer}>
                            <TouchableOpacity
                                onPress={this._goPage.bind(this,Security,'账户与安全')}>
                                <View style={[styles.item, {borderTopWidth:1}]}>
                                    <Image
                                        style={styles.img}
                                        source={{uri: img1}}
                                    />
                                    <Text style={styles.text}>账户安全</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={this._goPage.bind(this,Help,'帮助中心')}>
                                <View style={styles.item}>
                                    <Image
                                        style={styles.img}
                                        source={{uri: img2}}
                                    />
                                    <Text style={styles.text}>帮助中心</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={this._goPage.bind(this,Terms,'服务条款')}>
                                <View style={styles.item}>
                                    <Image
                                        style={styles.img}
                                        source={{uri: img3}}
                                    />
                                    <Text style={styles.text}>服务条款</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={this._showAbout.bind(this)}>
                                <View style={styles.item}>
                                    <Image
                                        style={styles.img}
                                        source={{uri: img4}}
                                    />
                                    <Text style={styles.text}>联系我们</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={this._logout.bind(this)}>
                                <View style={styles.logout}>
                                    <Text style={styles.logoutText}>退出登陆</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }

    _goPage(component,title) {
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'title',
                component: component,
            })
        }
    }

    // TODO:'联系我们'组件可以做成一个提交表单页面,用户提交文字和图片,存放在数据库中给后台查询
    _showAbout(){
        AlertIOS.alert('如有问题请致电', '18673241234', [{text: '确认'}]);
    }

    _logout(){
        // 清理掉token
        AsyncStorage.removeItem('tokenId');
        // 跳转到登录页面
        const { navigator } = this.props;
        if(navigator) {
            const { navigator } = this.props;
            if(navigator) {
                navigator.push({
                    name: '登录页',
                    component: loginPage,
                })
            }
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
    },
    logoContainer: {
        alignItems: 'center',
    },
    logoImage: {
        width: 100,
        height: 100,
        borderRadius:20,
    },
    versionText: {
        fontSize: 16,
        fontWeight: '300',
        color: '#666',
    },
    img: {
        width: 25,
        height: 25
    },
    itemContainer: {
        backgroundColor: '#fff',
    },
    item: {
        paddingLeft: 15,
        flexDirection: 'row',
        height: 50,
        borderBottomWidth:1,
        borderColor: 'rgba(0,0,0,0.1)',
        alignItems: 'center',
    },
    text: {
        marginLeft: 10,
        fontSize: 18,
        fontWeight: '300',
        color: '#333',
    },
    logout: {
        borderBottomWidth:1,
        height: 50,
        borderColor: '#efefef',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoutText: {
        fontSize: 18,
        fontWeight: '300',
        color: '#DC143C',
    }

});

module.exports = settingPage;