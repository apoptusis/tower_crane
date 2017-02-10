import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
} from 'react-native';
import SearchBar from 'react-native-search-bar';

import Util from '../common/util';
import NavigationBar from '../common/navBar';
import Category from './category';
import Recommend from './recommend';
import TopSwiper from './topSwiper';
import List from './list';

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
        this.searchText = null;
    }

    render(){
        var what = 'page';
        return (
            <View style={{flex:1,backgroundColor: '#f3f4f9'}}>
                <NavigationBar title={'塔机资讯'}/>
                <SearchBar
                    ref='searchBar'
                    placeholder='搜索'
                    searchBarStyle="minimal"
                    showsCancelButton={true}
                    onChangeText={(text)=>{
                        this.searchText = text;
                    }}
                    onSearchButtonPress={this._goSearchList.bind(this)}
                />
                <ScrollView style={styles.container}>
                    <TopSwiper navigator={this.props.navigator}/>
                    <Hr/>
                    <Category navigator={this.props.navigator}/>
                    <Hr/>
                    <Recommend navigator={this.props.navigator}/>
                </ScrollView>
            </View>
        );
    }

    _goSearchList(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: '详情',
                component: List,
                params: {
                    searchText: this.searchText,
                    name: '搜索文章'
                }
            });
        }
    }
}

var styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#fff'
    },
    hr : {
        height: 10,
        marginTop:10,
        borderColor:"rgba(0,0,0,0.1)",
        borderWidth: Util.pixel,
        backgroundColor: '#f3f4f9',
    },
    searchContainer: {
    },
    search_input: {
        paddingLeft: 5,
        height: 40,
        borderColor: 'rgba(0,0,0,0.1)',
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 14,
    }
});

module.exports = ReadPage;