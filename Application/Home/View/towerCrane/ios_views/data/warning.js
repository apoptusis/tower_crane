import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import NavigationBar from '../common/navBar';
import WView from '../common/WView';
import Util from '../common/util';


export default class warning extends Component {
    render() {
        return (
            <View>
                <NavigationBar
                    title={'报警统计'}
                    leftText={'返回'}
                    leftAction={ this._backToFront.bind(this) }
                />
                <Text>
                    帮助
                </Text>
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

module.exports = warning;