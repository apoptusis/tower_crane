import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    AlertIOS,
    TextInput,
    AsyncStorage,
} from 'react-native';
import Util from '../../common/util'
import NavigationBar from '../../common/navBar'
import loginPage from '../../loginPage'

export default class changeUsername extends Component {
    constructor(props){
        super(props);
        this.newUsername = '';
        this.newUsernameConfirm = '';
    }

    render() {
        return (
            <View style={{flex:1}}>
                <NavigationBar
                    title={'修改用户名'}
                    leftText={'返回'}
                    leftAction={ this._backToFront.bind(this) }
                />
                <View style={styles.container}>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoText}>
                            设置用户名与密码后,使用「手机号+密码」或「用户名+密码」的方式登录
                        </Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.inputItem}>
                            <TextInput
                                style={styles.input}
                                placeholder="输入新的用户名"
                                autoCapitalize="none"
                                selectionColor="#6a617c"
                                placeholderTextColor="#999"
                                clearButtonMode="while-editing"
                                onChangeText={(text) => {
                                    this.newUsername = text}}
                            />
                        </View>
                        <View style={styles.inputItem}>
                            <TextInput
                                style={styles.input}
                                placeholder="再次输入新的用户名"
                                autoCapitalize="none"
                                selectionColor="#6a617c"
                                placeholderTextColor="#999"
                                clearButtonMode="while-editing"
                                onChangeText={(text) => {
                                    this.newUsernameConfirm = text}}
                            />
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <TouchableOpacity onPress={this._changePhone.bind(this)}>
                                <Text style={styles.buttonText}>确定</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    _backToFront() {
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }

    _changePhone() {
        let that = this;
        let formData = new FormData();
        formData.append("username",this.props.username);
        formData.append("newUsername",this.newUsername);
        formData.append("newUsernameConfirm",this.newUsernameConfirm);
        let url = "http://localhost:8888/tower_crane/index.php/Home/towerCrane/changeUsername";
        Util.post(url, formData,
            function (responseJson) {
                if(responseJson.status === 0) {
                    AlertIOS.alert('修改失败！', responseJson.message, [{text: '确认'}]);
                }
                if(responseJson.status === 1) {
                    AlertIOS.alert(responseJson.message, '请重新登录', [{text: '确认',onPress:()=>{
                        // 清理掉storageData
                        storage.remove({
                            key: 'storageData'
                        }).
                        then(()=>{
                            // 跳转到登录页面
                            const { navigator } = that.props;
                            if(navigator) {
                                const { navigator } = that.props;
                                navigator.popToTop();
                                if(navigator) {
                                    navigator.push({
                                        name: '登录页',
                                        component: loginPage,
                                    })
                                }
                            }
                        });
                    },}]);
                }
            },
            function (err) {
                alert(err);
            });
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 10,
        alignItems: 'center',
    },
    infoText: {
        color: '#444',
        textAlign: 'left',
    },
    inputContainer: {
        marginTop: 10,
        marginBottom: 10,
    },
    inputItem: {
        borderBottomWidth: 1,
        marginBottom: 10,
    },
    input: {
        paddingLeft: 5,
        height: 40,
        width: Util.size.width-32,
        borderColor: 'rgba(0,0,0,0.1)',
    },
    button: {
        height: 40,
        width: Util.size.width-32,
        borderRadius: 3,
        backgroundColor: "#76a4a1",
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center',
        color: '#fff',
    },
});

module.exports = changeUsername;
