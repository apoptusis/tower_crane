import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import NavigationBar from '../common/navBar';
import WView from '../common/WView'
export default class help extends Component {
    render() {
        return (
            <View style={{flex:1}}>
                <NavigationBar
                    title={'服务条款'}
                    leftText={'设置'}
                    leftAction={ this._backToFront.bind(this) }
                />
                <WView
                    url='http://localhost:8888/tower_crane/Application/Home/View/towerCrane/ios_views/setting/terms.html'
                />
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

});

module.exports = help;