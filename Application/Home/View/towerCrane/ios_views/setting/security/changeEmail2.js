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
import Identify from './identify'


export default class changePassword extends Component {
    constructor(props){
        super(props);
        this.newEmail = '';
    }

    render() {
        return (
            <View style={{flex:1}}>
                <NavigationBar
                    title={'修改邮箱'}
                    leftText={'返回'}
                    leftAction={ this._backToFront.bind(this) }
                />
                <View style={styles.container}>
                    <View style={styles.inputContainer}>
                        <View style={styles.inputItem}>
                            <TextInput
                                style={styles.input}
                                placeholder="邮箱"
                                autoCapitalize="none"
                                selectionColor="#6a617c"
                                placeholderTextColor="#999"
                                clearButtonMode="while-editing"
                                onChangeText={(text) => {
                                    this.newEmail = text}}
                            />
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <TouchableOpacity onPress={this._sendIdentity.bind(this)}>
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

    // 向输入的新邮箱地址中发生验证码
    _sendIdentity() {
        let that = this;
        let formData = new FormData();
        formData.append("email",this.newEmail);
        formData.append("username",this.props.username);
        let url = "http://localhost:8888/tower_crane/index.php/Home/towerCrane/sendEmail";
        // 发送email地址和用户名,得到验证码
        Util.post(url, formData,
            function (responseJson) {
                if(responseJson.status === 0) {
                    AlertIOS.alert('发送失败！', responseJson.message, [{text: '确认'}]);
                }
                if(responseJson.status === 1) {
                    that.setState({
                        identifyNum : responseJson.data.identifyNum,
                    });
                    AlertIOS.alert('发送成功！', responseJson.message, [{text: '确认',onPress: ()=>{
                        // 跳转到验证页面
                        const { navigator } = that.props;
                        if(navigator) {
                            navigator.push({
                                name: '请输入验证码',
                                component: Identify,
                                params: {
                                    newEmail: that.newEmail,
                                    encryptEmail: that.newEmail.split("@")[0].replace(/.{4}$/, '****')+'@'+that.newEmail.split("@")[1],
                                    username: that.props.username,
                                    changeWhat: 'changeEmailDone',
                                }
                            })
                        }
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

module.exports = changePassword;
