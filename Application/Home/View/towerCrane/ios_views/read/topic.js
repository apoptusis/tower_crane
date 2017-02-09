import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import Util from '../common/util';
import TWebView from '../common/WView';

export default class topic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : props.data,
        };
    }

    render() {
        var views = [];
        var data = this.state.data;
        for (var i in data) {
            views.push(
                <TouchableOpacity style={styles.img_item}
                                  key={i}
                                  onPress={this._showWebPage.bind(this, data[i].url ,  data[i].title)}
                >
                    <Image style={styles.image}
                           source={{url:data[i].img}}
                           resizeMethod='auto'
                    />
                </TouchableOpacity>
            );
        }
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.text1}>
                        推荐专题
                    </Text>
                </View>

                <View style={styles.img_view}>
                    {views}
                </View>

                <View>
                    <Text style={styles.text2}>
                        查看更多同期专题 &gt;
                    </Text>
                </View>
            </View>
        );
    }

    // 展示详情页
    _showWebPage(url,title){
        this.props.navigator.push({
            component: TWebView,
            title: title,
            passProps: {
                url: url,
            }
        });
    }
}

var styles = StyleSheet.create({
    container: {
        marginLeft: 10,
        marginRight: 10,
    },
    text1: {
        color: '#5e5e5e',
        marginTop: 20,
        marginBottom: 10,
        fontSize: 18,
    },
    img_view: {
      flexDirection: 'row',
    },
    img_item: {
        flex: 1,
    },
    image: {
        height: 100,
        width:(Util.size.width - 30)/2,
        borderRadius:5,
    },
    text2: {
        color: '#5e5e5e',
        marginTop: 10,
        fontSize: 14,
        fontWeight : '300'
    },
});

module.exports = topic;