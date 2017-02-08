import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    AlertIOS,
    TextInput,
} from 'react-native';
import Util from '../../common/util'
import NavigationBar from '../../common/navBar'
import ChangePassword from './changePassword'

export default class identify extends Component {
    constructor(props){
        super(props);
        this.identifyNumInput = "";
    }

    render() {
        return (
            <View style={{flex: 1,}}>
                <NavigationBar
                    title={'请输入邮箱验证码'}
                    leftText={'验证'}
                    leftAction={ this._backToFront.bind(this) }
                />

                <View style={styles.container}>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoText}>
                            邮箱验证码已发送至{this.props.encryptEmail} 请注意查收
                        </Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="输入邮箱验证码"
                            autoCapitalize="none"
                            selectionColor="#6a617c"
                            placeholderTextColor="#6a617c"
                            keyboardType="number-pad"
                            clearButtonMode="while-editing"
                            onChangeText={(text) => {
                                this.identifyNumInput = text}}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <TouchableOpacity onPress={this._checkIdentifyNum.bind(this)}>
                                <Text style={styles.buttonText}>完成</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.reSendContainer}>
                        <TouchableOpacity onPress={this._resend.bind(this)}>
                            <Text style={styles.reSendText}>重新发送验证码</Text>
                        </TouchableOpacity>
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

    _checkIdentifyNum(){
        let that = this;
        let formData = new FormData();
        formData.append("username",this.props.username);
        formData.append("identifyNum",this.identifyNumInput);
        let url = "http://localhost:8888/tower_crane/index.php/Home/towerCrane/checkIdentifyNum";
        Util.post(url, formData,
            function (responseJson) {
                if(responseJson.status === 0) {
                    AlertIOS.alert('失败！', responseJson.message, [{text: '确认'}]);
                }
                if(responseJson.status === 1) {
                    AlertIOS.alert('成功！', responseJson.message, [{text: '确认'}]);
                    const { navigator } = that.props;
                    if(navigator) {
                        navigator.push({
                            name: '修改密码',
                            component: ChangePassword,
                            params: {
                                username: that.props.username,
                            }
                        })
                    }
                }
            },
            function (err) {
                alert(err);
            });
    }

    _resend() {
        let that = this;
        let formData = new FormData();
        formData.append("email",this.props.email);
        formData.append("username",this.props.username);
        let url = "http://localhost:8888/tower_crane/index.php/Home/towerCrane/sendEmail";
        // 发送email地址和用户名,得到验证码
        Util.post(url, formData,
            function (responseJson) {
                if(responseJson.status === 0) {
                    AlertIOS.alert('发送失败！', responseJson.message, [{text: '确认'}]);
                }
                if(responseJson.status === 1) {
                    AlertIOS.alert('发送成功！', responseJson.message, [{text: '确认'}]);
                    that.setState({
                        identifyNum : responseJson.data.identifyNum,
                    });
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
    infoContainer: {
        flex: 1,
    },
    inputContainer: {
        flex: 1.5,
        marginBottom: 30,
    },
    buttonContainer: {
        flex: 1.5,
    },
    reSendContainer: {
        flex: 10,
    },
    infoText: {
        color: '#444',
        textAlign: 'center',
    },
    input: {
        paddingLeft: 5,
        height: 40,
        width: Util.size.width-32,
        borderWidth: 1,
        borderRadius: 3,
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
    reSendText: {
        color: '#225599',
        fontSize: 16,
    }
});

module.exports = identify;