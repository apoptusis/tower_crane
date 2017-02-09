import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import Swiper from 'react-native-swiper';
import Util from '../common/util';

export default class topSwiper extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <View style={styles.container}>
                <Swiper style={styles.wrapper}
                        height={240}
                        dot={<View style={{backgroundColor: 'rgba(0,0,0,0.2)', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                        activeDot={<View style={{backgroundColor: '#3ea8a0', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
                        paginationStyle={{bottom: -23, left: null, right: 10}}
                        onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
                        autoplay={true}
                        autoplayTimeout={5}
                        loop={true}
                >
                    <View
                        style={styles.slide}
                        title={<Text numberOfLines={1}>Aussie tourist dies at Bali hotel</Text>}>
                        <TouchableOpacity>
                            <Image
                                resizeMode='stretch'
                                style={styles.image}
                                source={{url:'http://img.hb.aicdn.com/f84f7b016afcb8023072d31214d5c39a5d4841f31b9e9-vkPRYz_fw658'}}/>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={styles.slide}
                        title={<Text numberOfLines={1}>Big lie behind Nine’s new show</Text>}>
                        <TouchableOpacity>
                            <Image
                                resizeMode='stretch'
                                style={styles.image}
                                source={{url:'http://img.mp.itc.cn/upload/20160831/e8d6f5904c2f458db41724bb2d5ca825_th.jpg'}} />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={styles.slide}
                        title={<Text numberOfLines={1}>Why Stone split from Garfield</Text>}>
                        <TouchableOpacity>
                            <Image
                                resizeMode='stretch'
                                style={styles.image}
                                source={{url:'http://image100.360doc.com/DownloadImg/2016/09/2622/81013355_12'}} />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={styles.slide}
                        title={<Text style={styles.text} numberOfLines={1}>Learn from Kim K to land that job</Text>}>
                        <TouchableOpacity>
                            <Image
                                resizeMode='stretch'
                                style={styles.image}
                                source={{url:'http://image100.360doc.com/DownloadImg/2016/09/2622/81013355_7'}} />
                        </TouchableOpacity>
                    </View>
                </Swiper>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        backgroundColor: '#ccc',
        marginBottom: 26,
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