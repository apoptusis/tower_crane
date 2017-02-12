import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
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
                <ScrollView style={styles.container}>
                    <View style={styles.infoContainer}>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoTitle}>塔机型号: </Text>
                            <Text style={styles.infoData}>{this.props.model}</Text>
                        </View>
                    </View>
                    <View style={styles.charts}>
                        <Text style={styles.chartsTitle}>力矩特性曲线</Text>
                        <WView
                            url='http://localhost:8888/tower_crane/Application/Home/View/towerCrane/ios_views/data/momentCurve.html'
                            isScroll={false}
                            data={this.props.momentCurve}
                        />
                    </View>
                    <View style={styles.infoContainer}>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoTitle}>塔臂高度</Text>
                            <Text style={styles.infoData}>{this.props.armHeight} m</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoTitle}>塔顶到塔臂距离</Text>
                            <Text style={styles.infoData}>{this.props.top2arm} m</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoTitle}>塔底到塔臂距离</Text>
                            <Text style={styles.infoData}>{this.props.bottom2arm} m</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoTitle}>吊绳高度</Text>
                            <Text style={styles.infoData}>{this.props.lineDropHeight} m</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoTitle}>起重臂长</Text>
                            <Text style={styles.infoData}>{this.props.liftArm} m</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoTitle}>平衡臂长</Text>
                            <Text style={styles.infoData}>{this.props.balanceArm} m</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoTitle}>前桅位置</Text>
                            <Text style={styles.infoData}>{this.props.forcePro} m</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoTitle}>后桅位置</Text>
                            <Text style={styles.infoData}>{this.props.rearPro} m</Text>
                        </View>
                    </View>
                    <View style={styles.infoContainer}>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoTitle}>额定重量</Text>
                            <Text style={styles.infoData}>{this.props.maxWeight} t</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoTitle}>最大高度</Text>
                            <Text style={styles.infoData}>{this.props.maxHeight} m</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoTitle}>额定力矩</Text>
                            <Text style={styles.infoData}>{this.props.maxForce} kNm</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoTitle}>额定幅度</Text>
                            <Text style={styles.infoData}>{this.props.maxAmplitude} m</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoTitle}>最大角度</Text>
                            <Text style={styles.infoData}>{this.props.maxRotate} °</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoTitle}>最大风速</Text>
                            <Text style={styles.infoData}>{this.props.maxWind} m/s</Text>
                        </View>
                    </View>
                </ScrollView>
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
        flex: 1,
        backgroundColor: '#f3f4f9',
    },
    charts: {
        marginTop: 10,
        height: Util.size.height/1.8,
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
    infoContainer: {
        marginTop: 10,
        borderTopWidth: Util.pixel,
        borderBottomWidth: Util.pixel,
        borderColor: 'rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
    },
    infoContainerTitle: {
        marginLeft: 10,
        fontSize: 18,
        fontWeight: '400',
        color: '#333',
    },
    infoItem: {
        height: 50,
        flexDirection: 'row',
        borderBottomWidth: Util.pixel,
        borderColor: 'rgba(0,0,0,0.1)',
        alignItems: 'center',
    },
    infoTitle: {
        flex:1,
        marginLeft: 10,
        fontSize: 18,
        fontWeight: '400',
        color: '#333',
    },
    infoData: {
        flex:1,
        marginRight: 20,
        fontSize: 18,
        fontWeight: '300',
        color: '#666',
        textAlign: 'right',
    }
});

module.exports = baseInfo;