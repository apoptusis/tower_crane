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
            <View style={{flex: 1}}>
                <NavigationBar
                    title={'基本信息'}
                    leftText={'返回'}
                    leftAction={ this._backToFront.bind(this) }
                />
                <View style={styles.container}>
                    <View style={styles.charts}>
                        <WView
                            url='http://localhost:8888/tower_crane/Application/Home/View/towerCrane/ios_views/data/momentCurve.html'
                            isScroll={false}
                            data={this.props.momentCurve}
                        />
                    </View>
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
        flex: 1
    },
    charts: {
        height: Util.size.height/2,
        borderTopWidth: Util.pixel,
        borderBottomWidth: Util.pixel,
        borderColor: 'rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
    },
});

module.exports = baseInfo;