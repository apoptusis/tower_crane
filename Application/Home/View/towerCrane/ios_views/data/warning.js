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
            <View style={{flex:1,backgroundColor: '#f3f4f9',}}>
                <NavigationBar
                    title={'报警统计'}
                    leftText={'返回'}
                    leftAction={ this._backToFront.bind(this) }
                />
                <View style={styles.container}>
                    <View style={styles.chartsContainer}>
                        <Text style={styles.chartsTitle}>报警次数统计</Text>
                        <WView
                            url='http://localhost:8888/tower_crane/Application/Home/View/towerCrane/ios_views/data/warning.html'
                            isScroll={false}
                            data={this.warningData}
                        />
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.containerTitle}> 统计 </Text>
                        <View style={styles.info}>
                            <View style={[styles.infoItem,{borderRightWidth:1}]}>
                                <Text style={styles.infoData}>{this.props.rotateWarningTime+this.props.windWarningTime+this.props.heightWarningTime+this.props.weightWarningTime+this.props.amplitudeWarningTime+this.props.forceWarningTime}次</Text>
                                <Text style={styles.infoTitle}>报警总数</Text>
                            </View>
                            <View style={styles.infoItem}>
                                <Text style={styles.infoData}>{this.props.during} h</Text>
                                <Text style={styles.infoTitle}>在线时长</Text>
                            </View>
                        </View>
                    </View>
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

    },
    chartsContainer: {
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
    containerTitle: {
        fontSize: 18,
        fontWeight: '400',
        color: '#666',
        marginTop: 10,
        marginLeft: 10,
    },
    infoContainer: {
        marginTop: 10,
        borderTopWidth: Util.pixel,
        borderBottomWidth: Util.pixel,
        borderColor: 'rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
    },
    info: {
        flexDirection: 'row',
    },
    infoItem: {
        marginTop: 10,
        marginBottom: 20,
        borderColor: '#3398DB',
        flex: 1,
    },
    infoData: {
        fontSize: 34,
        fontWeight: '300',
        color: '#333',
        textAlign: 'center',
    },
    infoTitle: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: '300',
        color: '#666',
        textAlign: 'center',
    },
});

module.exports = warning;