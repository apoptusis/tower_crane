import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    AlertIOS,
} from 'react-native';
import NavigationBar from '../common/navBar';
import Util from '../common/util';

export default class feedback extends Component {
    constructor(props) {
        super(props);
        this.feedbackText = '';
    }

    render() {
        return (
            <View style={{flex:1}}>
                <NavigationBar
                    title={'意见反馈'}
                    leftText={'返回'}
                    leftAction={ this._backToFront.bind(this) }
                />
                <View style={styles.container}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="描述你的问题(240字以内)"
                            autoCapitalize="none"
                            selectionColor="#6a617c"
                            placeholderTextColor="#999"
                            clearButtonMode="while-editing"
                            multiline={true}
                            maxLength={240}
                            onChangeText={(text) => {
                                this.feedbackText = text}}
                        />
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity onPress={this._sendFeedback.bind(this)}>
                            <Text style={styles.buttonText}>提交</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    _backToFront (){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }

    _sendFeedback(){
        let that = this;
        let formData = new FormData();
        formData.append("username",this.props.username);
        formData.append("feedback",this.feedbackText);
        let url = "http://localhost:8888/tower_crane/index.php/Home/towerCrane/sendFeedback";
        Util.post(url, formData,
            function (responseJson) {
                if(responseJson.status === 0) {
                    AlertIOS.alert('提交失败！', responseJson.message, [{text: '确认'}]);
                }
                if(responseJson.status === 1) {
                    AlertIOS.alert('提交成功!', '谢谢你的反馈', [{text: '确认',onPress:()=>{
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
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
    },
    inputContainer: {
        borderColor:"rgba(0,0,0,0.2)",
        borderWidth: Util.pixel,
    },
    input: {
        height: 200,
        width: Util.size.width-20,
        fontSize: 16,
        color: '#888',
        fontWeight: '300',
        paddingLeft: 5,
        paddingRight: 5,
    },
    button: {
        marginTop: 10,
        height: 40,
        width: Util.size.width-20,
        backgroundColor: "#4a89dc",
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center',
        color: '#fff',
    },
});

module.exports = feedback;