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

export default class changePassword extends Component {
    constructor(props){
        super(props);
        this.newPhone = '';
        this.newPhoneConfirm = '';
    }

    render() {
        return (
            <View style={{flex:1}}>
                <NavigationBar
                    title={'修改手机号'}
                    leftText={'返回'}
                    leftAction={ this._backToFront.bind(this) }
                />
                <View style={styles.container}>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoText}>
                            设置手机号与密码后,使用「手机号+密码」或「用户名+密码」的方式登录
                        </Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.inputItem}>
                            <TextInput
                                style={styles.input}
                                placeholder="输入新的手机号码"
                                autoCapitalize="none"
                                selectionColor="#6a617c"
                                placeholderTextColor="#999"
                                clearButtonMode="while-editing"
                                onChangeText={(text) => {
                                    this.newPhone = text}}
                            />
                        </View>
                        <View style={styles.inputItem}>
                            <TextInput
                                style={styles.input}
                                placeholder="再次输入新的手机号码"
                                autoCapitalize="none"
                                selectionColor="#6a617c"
                                placeholderTextColor="#999"
                                clearButtonMode="while-editing"
                                onChangeText={(text) => {
                                    this.newPhoneConfirm = text}}
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
        formData.append("newPhone",this.newPhone);
        formData.append("newPhoneConfirm",this.newPhoneConfirm);
        let url = "http://localhost:8888/tower_crane/index.php/Home/towerCrane/changePhone";
        Util.post(url, formData,
            function (responseJson) {
                if(responseJson.status === 0) {
                    AlertIOS.alert('修改失败！', responseJson.message, [{text: '确认'}]);
                }
                if(responseJson.status === 1) {
                    AlertIOS.alert('修改成功!', responseJson.message, [{text: '确认',onPress:()=>{
                        const { navigator } = that.props;
                        if(navigator) {
                            const { navigator } = that.props;
                            if(navigator) {
                                navigator.popToTop();
                            }
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
