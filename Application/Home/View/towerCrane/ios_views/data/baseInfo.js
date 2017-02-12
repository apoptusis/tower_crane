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


export default class baseInfo extends Component {
    render() {
        return (
            <View>
                <NavigationBar
                    title={'基本信息'}
                    leftText={'返回'}
                    leftAction={ this._backToFront.bind(this) }
                />
                <Text>
                    {this.props.model}
                    {this.props.momentCurve}
                    {this.props.top2arm}
                    {this.props.armHeight}
                    {this.props.bottom2arm}
                    {this.props.lineDropHeight}
                    {this.props.liftArm}
                    {this.props.balanceArm}
                    {this.props.forcePro}
                    {this.props.rearPro}
                    {this.props.maxWeight}
                    {this.props.maxHeight}
                    {this.props.maxForce}
                    {this.props.maxAmplitude}
                    {this.props.maxRotate}
                    {this.props.maxWind}
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

module.exports = baseInfo;