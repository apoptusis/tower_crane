import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    NavigatorIOS
} from 'react-native';

import Util from '../common/util';
import NavigationBar from '../common/navBar';
import Category from './category';
import Recommend from './recommend';
import Search from './search';
import TopSwiper from './topSwiper';

// 分割线Hr组件
class Hr extends Component {
    render() {
        return (
            <View style={styles.hr}></View>
        );
    }
}

class ReadPage extends Component {
    constructor() {
        super();
    }

    render(){
        return (
            <View style={styles.container}>
                <NavigationBar title={'塔机资讯'}/>
                <Search/>
                <Hr/>
                <ScrollView style={styles.container}>
                    <TopSwiper navigator={this.props.navigator}/>
                    <Hr/>
                    <Recommend name="年度推荐" navigator={this.props.navigator}/>
                    <Hr/>
                    <Category navigator={this.props.navigator}/>
                    <Hr/>
                    <Recommend name="年度大误" navigator={this.props.navigator}/>
                </ScrollView>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container : {
        flex: 1
    },
    hr : {
        marginTop:10,
        borderColor:"#f0f0f0",
        borderWidth: Util.pixel,
    }
});

module.exports = ReadPage;