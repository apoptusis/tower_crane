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

export default class changePassword extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <View style={{flex:1}}>
                <NavigationBar
                    title={'修改账号密码'}
                    leftText={'1'}
                    leftAction={ this._backToFront.bind(this) }
                />
                <View style={styles.container}>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoText}>
                            设置密码后,使用「手机号+密码」或「邮箱+密码」的方式登录
                        </Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.inputItem}>
                            <TextInput
                                style={styles.input}
                                secureTextEntry={true}
                                placeholder="输入新密码"
                                autoCapitalize="none"
                                selectionColor="#6a617c"
                                placeholderTextColor="#999"
                                onChangeText={(text) => {
                                    this.identifyNumInput = text}}
                            />
                        </View>
                        <View style={styles.inputItem}>
                            <TextInput
                                style={styles.input}
                                secureTextEntry={true}
                                placeholder="再次输入新密码"
                                autoCapitalize="none"
                                selectionColor="#6a617c"
                                placeholderTextColor="#999"
                                onChangeText={(text) => {
                                    this.identifyNumInput = text}}
                            />
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <TouchableOpacity>
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
