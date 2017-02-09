import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    AlertIOS,
} from 'react-native';
import Swiper from 'react-native-swiper';
import Util from '../common/util';
import Detail from './detail';

export default class topSwiper extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: null,
        };
        this._getData();
    }

    render(){
        var data = this.state.data;
        var view = [];
        for (var i in data) {
            i = JSON.parse(i);// 不写这个JSON解析错误
            let item = (
                <View
                    key={i}
                    style={styles.slide}
                    title={<Text numberOfLines={1} style={styles.text}>
                            {data[i].title}
                        </Text>}>
                    <TouchableOpacity
                        onPress={this._goWebPage.bind(this,data[i].page_url)}
                        activeOpacity={0.8}>
                        <Image
                            resizeMode='stretch'
                            style={styles.image}
                            source={{url:data[i].img_url}}/>
                    </TouchableOpacity>
                </View>
            );
            view.push(item);
        }


        return (
            <View style={styles.container}>
                <Swiper style={styles.wrapper}
                        height={240}
                        dot={<View style={{backgroundColor: 'rgba(0,0,0,0.2)', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                        activeDot={<View style={{backgroundColor: '#3ea8a0', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                        paginationStyle={{bottom: -23, left: null, right: 10}}
                        onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
                        autoplay={true}
                        autoplayTimeout={10}
                        loop={true}>
                    {view}
                </Swiper>
            </View>
        );
    }

    _goWebPage(url){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: '详情',
                component: Detail,
                params: {
                    url: url,
                }
            });
        }
    }

    _getData() {
        let that = this;
        let url = "http://localhost:8888/tower_crane/index.php/Home/towerCrane/getArticle?type=topSwiper";
        Util.get(url,
            function(responseJson) {
                if(responseJson.status === 0) {
                    AlertIOS.alert('数据查询失败！', responseJson.message, [{text: '确认'}]);
                }
                if(responseJson.status === 1) {
                    that.setState({
                        data: responseJson.data,
                    });
                }
            },
            function(err){
                alert(err);
            });
    }
}

var styles = StyleSheet.create({
    container: {
        backgroundColor: '#ccc',
        marginBottom: 20,
        marginTop: -20,
    },
    wrapper: {

    },
    slide: {
        flex: 1,
    },
    image: {
        width: Util.size.width,
        height: 240,
    },
    text: {
        color: '#333',
        fontSize: 14,
        fontWeight: '300',
    }
});

module.exports = topSwiper;