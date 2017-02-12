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
                <Text>高度报警{this.props.heightWarningTime?this.props.heightWarningTime:0}</Text>
                <Text>重量报警{this.props.weightWarningTime?this.props.weightWarningTime:0}</Text>
                <Text>幅度报警{this.props.amplitudeWarningTime?this.props.amplitudeWarningTime:0}</Text>
                <Text>力矩报警{this.props.forceWarningTime?this.props.forceWarningTime:0}</Text>
                <Text>角度报警{this.props.rotateWarningTime?this.props.rotateWarningTime:0}</Text>
                <Text>风速报警{this.props.windWarningTime?this.props.windWarningTime:0}</Text>
                <Text>报警总数{this.props.rotateWarningTime+this.props.windWarningTime+this.props.heightWarningTime+this.props.weightWarningTime+this.props.amplitudeWarningTime+this.props.forceWarningTime}</Text>

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