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
        this.state = {
            showWhat : 'page',
        };
    }

    render(){
        var what = 'page';
        return (
            <View style={{flex:1,backgroundColor: '#f3f4f9'}}>
                <NavigationBar title={'塔机资讯'}/>
                <SearchBar
                    ref='searchBar'
                    placeholder='搜索'
                    barTintColor=""
                    textFieldBackgroundColor=""
                    searchBarStyle="minimal"
                    showsCancelButton={true}
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


    componentDidMount() {
        // this.refs.searchBar.unFocus();
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