import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import NavigationBar from '../common/navBar';
import Util from '../common/util';
import Swiper from 'react-native-swiper';

export default class help extends Component {
    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'帮助中心'}
                    leftText={'设置'}
                    leftAction={ this._backToFront.bind(this) }
                />
                <Swiper style={styles.wrapper}
                        dot={<View style={{backgroundColor: 'rgba(0,0,0,0.1)', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
                        activeDot={<View style={{backgroundColor: '#008edb', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
                        paginationStyle={{
                            bottom: 70
                        }}
                        loop={false}>
                    <Image
                        resizeMode='cover'
                        style={styles.image}
                        source={{url:'http://localhost:8888/tower_crane/Application/Home/View/towerCrane/images/step1.png'}}/>
                    <Image
                        resizeMode='cover'
                        style={styles.image}
                        source={{url:'http://localhost:8888/tower_crane/Application/Home/View/towerCrane/images/step2.png'}}/>
                    <Image
                        resizeMode='cover'
                        style={styles.image}
                        source={{url:'http://localhost:8888/tower_crane/Application/Home/View/towerCrane/images/step3.png'}}/>
                    <Image
                        resizeMode='cover'
                        style={styles.image}
                        source={{url:'http://localhost:8888/tower_crane/Application/Home/View/towerCrane/images/step4.png'}}/>
                    <Image
                        resizeMode='cover'
                        style={styles.image}
                        source={{url:'http://localhost:8888/tower_crane/Application/Home/View/towerCrane/images/step5.png'}}/>
                    <Image
                        resizeMode='cover'
                        style={styles.image}
                        source={{url:'http://localhost:8888/tower_crane/Application/Home/View/towerCrane/images/step6.png'}}/>
                    <Image
                        resizeMode='cover'
                        style={styles.image}
                        source={{url:'http://localhost:8888/tower_crane/Application/Home/View/towerCrane/images/step7.png'}}/>
                    <Image
                        resizeMode='cover'
                        style={styles.image}
                        source={{url:'http://localhost:8888/tower_crane/Application/Home/View/towerCrane/images/step8.png'}}/>
                    <Image
                        resizeMode='cover'
                        style={styles.image}
                        source={{url:'http://localhost:8888/tower_crane/Application/Home/View/towerCrane/images/step9.png'}}/>
                    <Image
                        resizeMode='cover'
                        style={styles.image}
                        source={{url:'http://localhost:8888/tower_crane/Application/Home/View/towerCrane/images/step10.png'}}/>
                </Swiper>
            </View>
        );
    }
    _backToFront (){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }
}

const styles = StyleSheet.create({
    container: {
        height: Util.size.height,
        width: Util.size.width,
        backgroundColor: '#fff'
    },
    wrapper: {
    },
    image: {
        width: Util.size.width,
        height: Util.size.height-20,
        marginTop: -40,
    }
});

module.exports = help;