import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
} from 'react-native';

export default class search extends Component {
    render(){
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder='搜索'
                    placeholderTextColor='#929292'
                    style={styles.search_input}
                />
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        marginTop: 20,
        paddingLeft: 10,
        paddingRight: 10,
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

module.exports = search;