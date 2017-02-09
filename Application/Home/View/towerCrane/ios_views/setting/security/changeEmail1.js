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
import ChangeEmail2 from './changeEmail2'


var emailIcon = 'data:image/png;base64,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';

export default class changeEmail1 extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <View style={{flex:1}}>
                <NavigationBar
                    title={'设置邮箱'}
                    leftText={'返回'}
                    leftAction={ this._backToFront.bind(this) }
                />
                <View style={styles.container}>
                    <View style={styles.iconContainer}>
                        <Image
                            style={styles.emailIcon}
                            source={{uri: emailIcon}}
                        />
                    </View>
                    <View style={styles.emailTextContainer}>
                        <Text style={styles.emailText}>
                            {this.props.encryptEmail}
                        </Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <TouchableOpacity onPress={this._goPage.bind(this)}>
                                <Text style={styles.buttonText}>修改邮箱地址</Text>
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

    _goPage() {
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: '修改邮箱',
                component: ChangeEmail2,
                params: {
                    username: this.props.username,
                }
            })
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
    iconContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    emailIcon: {
        height: 100,
        width: 100,
    },
    emailTextContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    emailText: {
        fontSize: 24,
        fontWeight: '300',
        color: '#333',
        textAlign: 'center'
    },
    buttonContainer: {
        flex: 3,
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

module.exports = changeEmail1;
