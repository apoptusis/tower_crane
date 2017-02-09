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
import WView from '../common/WView';

export default class recommend extends Component {
    constructor(props){
        super(props);
        this.state = {
            name : props.name,
            data : props.data,
        };
    }

    render(){
        var data = this.state.data;
        var view1 = [];
        var view2 = [];
        for (var i in data) {
            let item = (
                <TouchableOpacity style={styles.img_item}
                                  key={i}
                                  onPress={this._showWebPage.bind(this, data[i].url ,  data[i].title)}
                >
                    <Image style={[styles.img, styles.shadow]}
                           source={{url:data[i].img}}/>
                    <Text style={styles.descri}
                          numberOfLines={2}>
                        {data[i].title}
                    </Text>
                </TouchableOpacity>
            );

            if (i < 4) {
                view1.push(item);
            }else{
                view2.push(item);
            }
        }
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    {this.state.name}
                </Text>

                <View style={styles.img_view}>
                    {view1}
                </View>

                <View style={styles.img_view}>
                    {view2}
                </View>

            </View>
        );
    }

    // 展示详情页
    _showWebPage(url,title){
        this.props.navigator.push({
            component: WView,
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
    title: {
        color: '#5e5e5e',
        marginTop: 10,
        marginBottom: 10,
        fontSize: 18,
    },
    descri: {
        marginTop: 5,
        fontSize: 14,
        color: '#818181'
    },
    shadow: {
        shadowOpacity: 1,
        shadowColor: '#ccc',
        shadowOffset:{width: 1*Util.pixel, height: Util.pixel}
    },
    img_view: {
        flexDirection: "row",
    },
    img_item: {
        flex: 1,
        height: 160,
    },
    img: {
        height: 120,
        width: (Util.size.width - 40) / 4,
    },

});

module.exports = recommend;