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
    constructor(props){
        super(props);
        this.warningData = [
            this.props.weightWarningTime,
            this.props.amplitudeWarningTime,
            this.props.forceWarningTime,
            this.props.heightWarningTime,
            this.props.rotateWarningTime,
            this.props.windWarningTime,
        ];
    }
    render() {
        return (
            <View>
                <NavigationBar
                    title={'报警统计'}
                    leftText={'返回'}
                    leftAction={ this._backToFront.bind(this) }
                />
                <View style={styles.charts}>
                    <Text style={styles.chartsTitle}>报警次数统计</Text>
                    <WView
                        url='http://localhost:8888/tower_crane/Application/Home/View/towerCrane/ios_views/data/warning.html'
                        isScroll={false}
                        data={this.warningData}
                    />
                </View>
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
    charts: {
        marginTop: 10,
        height: Util.size.height/2,
        borderTopWidth: Util.pixel,
        borderBottomWidth: Util.pixel,
        borderColor: 'rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
    },
    chartsTitle: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: '400',
        color: '#333',
        textAlign: 'center',
    },
});

module.exports = warning;