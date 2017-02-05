import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    WebView,
    TouchableHighlight
} from 'react-native';

export default class WView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url : this.props.url,
            isError : false,
        };
        this.webView = null;
    }

    render(){
        return (
            <View style={styles.container}>
                {
                    //如果onError触发，则输出异常视图，否则输出WebView视图
                    this.state.isError ?
                        <View style={styles.textView}>
                            <Text style={styles.text}>
                                网络异常，请检查网络链接！
                            </Text>
                        </View>
                        :
                        <WebView
                            source={{url: this.state.url}}
                            ref={( webView ) => this.webView = webView}
                            startInLoadingState={true}
                            scrollEnabled = {true}
                            onError={() => {
                                this.setState({
                                    isError: true
                                });
                            }}
                            onLoad={() => {
                                // 将sim_num的值传给webView
                                this.webView.postMessage( this.props.data );
                            }}
                        />
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text:{
        fontSize:16,
        fontWeight:'300'
    },
    textView:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center'
    }
});

module.exports = WView;