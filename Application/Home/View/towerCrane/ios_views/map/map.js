import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import WView from '../common/WView';

export default class mapPage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <WView url='http://localhost:8888/tower_crane/index.php/home/towerCrane/map.html' />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:-20
    }
});

module.exports = mapPage;