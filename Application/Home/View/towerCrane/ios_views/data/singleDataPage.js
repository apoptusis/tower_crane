import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
    AlertIOS,
} from 'react-native';
import WView from '../common/WView';
import Util from '../common/util';
import NavigationBar from '../common/navBar';
import PercentageCircle from '../common/circle';
import Warning from './warning';
import BaseInfo from './baseInfo';


var moreIcon = 'data:image/png;base64,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';

export default class SingleDataPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 实时数据
            weight: null,
            height: null,
            force: null,
            amplitude: null,
            rotate: null,
            wind: null,
            update_time: null,
            startTime: null,
            endTime: null,
            duration: null,
            simStatus: null,
            lockStatus: null,
            heightWarningTime: null,
            weightWarningTime: null,
            amplitudeWarningTime: null,
            forceWarningTime: null,
            rotateWarningTime: null,
            windWarningTime: null,
            // 基本数据
            model: null,
            top2arm: null,
            armHeight: null,
            bottom2arm: null,
            lineDropHeight: null,
            liftArm: null,
            balanceArm: null,
            forcePro: null,
            rearPro: null,
            momentCurve: null,
            maxWeight: null,
            maxHeight: null,
            maxForce: null,
            maxAmplitude: null,
            maxRotate: null,
            maxWind: null,
        };
        this.timer = null;
        this._getSinglePageData();
        this._getBaseInfo();
    }

    render() {
        return (
            <View style={{flex:1,backgroundColor: '#f3f4f9',}}>
                <NavigationBar
                    title={'实时数据'}
                    leftText={'设备'}
                    leftAction={ this._backToFront.bind(this) }
                />
                <ScrollView style={styles.container}>
                    <View>
                        <Text style={styles.updateTime}> 数据更新 ：{this.state.update_time} </Text>
                    </View>

                    <View style={styles.dashboard}>
                        <Text style={styles.containerTitle}> 历史数据 </Text>
                        <WView
                            url={'http://localhost:8888/tower_crane/index.php/home/towerCrane/historyData.html'}
                            data={this.props.sim_num}
                            isScroll={false}
                        />
                    </View>

                    <View style={styles.dataContainer}>
                        <Text style={styles.containerTitle}> 实时数据 </Text>
                        <View style={styles.dataItemContainer}>
                            <View style={styles.item}>
                                <PercentageCircle radius={50} percent={Math.floor(this.state.weight/this.state.maxWeight*100)} color={"#3ea8a0"}>
                                    <Text style={styles.data}>{this.state.weight} t</Text>
                                </PercentageCircle>
                                <Text style={styles.title}> 起重重量 </Text>
                            </View>
                            <View style={styles.item}>
                                <PercentageCircle radius={50} percent={Math.floor(this.state.amplitude/this.state.maxAmplitude*100)} color={"#3ea8a0"}>
                                    <Text style={styles.data}> {this.state.amplitude} m </Text>
                                </PercentageCircle>
                                <Text style={styles.title}> 变幅幅度 </Text>
                            </View>
                            <View style={styles.item}>
                                <PercentageCircle radius={50} percent={Math.floor(this.state.force/this.state.maxForce*100)} color={"#3ea8a0"}>
                                    <Text style={styles.data}> {this.state.force} kN·M </Text>
                                </PercentageCircle>
                                <Text style={styles.title}> 起重力矩 </Text>
                            </View>
                        </View>

                        <View style={styles.dataItemContainer}>
                            <View style={styles.item}>
                                <PercentageCircle radius={50} percent={Math.floor(Math.abs(this.state.rotate/this.state.maxRotate*100))} color={"#3ea8a0"}>
                                    <Text style={styles.data}> {this.state.rotate} ° </Text>
                                </PercentageCircle>
                                <Text style={styles.title}> 回转角度 </Text>
                            </View>
                            <View style={styles.item}>
                                <PercentageCircle radius={50} percent={Math.floor(this.state.height/this.state.maxHeight*100)} color={"#3ea8a0"}>
                                    <Text style={styles.data}> {this.state.height} m </Text>
                                </PercentageCircle>
                                <Text style={styles.title}> 起升高度 </Text>
                            </View>
                            <View style={styles.item}>
                                <PercentageCircle radius={50} percent={Math.floor((this.state.wind/this.state.maxWind)*100)} color={"#3ea8a0"}>
                                    <Text style={styles.data}> {this.state.wind} m/s </Text>
                                </PercentageCircle>
                                <Text style={styles.title}> 当前风速 </Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.infoContainer}>
                        <Text style={styles.containerTitle}> 统计 </Text>
                        <View style={styles.info}>
                            <View style={[styles.infoItem,{borderRightWidth:1}]}>
                                <Text style={styles.infoData}>{this.state.warningTime} 次</Text>
                                <Text style={styles.infoTitle}>报警次数</Text>
                            </View>
                            <View style={styles.infoItem}>
                                <Text style={styles.infoData}>{this.state.duration} h</Text>
                                <Text style={styles.infoTitle}>在线时长</Text>
                            </View>
                        </View>
                        <View style={styles.info}>
                            <View style={[styles.infoItem,{borderRightWidth:1}]}>
                                <Text style={styles.infoData}>{this.state.lockStatus}</Text>
                                <Text style={styles.infoTitle}>锁机状态</Text>
                            </View>
                            <View style={styles.infoItem}>
                                <Text style={styles.infoData}>{this.state.simStatus}</Text>
                                <Text style={styles.infoTitle}>SIM卡状态</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.linkContainer}>
                        <TouchableOpacity
                            style={styles.linkItem}
                            onPress={this._goWarningPage.bind(this)}>
                            <Text style={styles.linkText}>报警统计</Text>
                            <Image
                                style={styles.moreIcon}
                                source={{uri: moreIcon}}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.linkContainer,{marginBottom:10}]}>
                        <TouchableOpacity
                            style={styles.linkItem}
                            onPress={this._goBaseInfoPage.bind(this)}>
                            <Text style={styles.linkText}>基础信息</Text>
                            <Image
                                style={styles.moreIcon}
                                source={{uri: moreIcon}}
                            />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }

    _backToFront (){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
            // 返回上一页面时，清除定时器
            clearInterval(this.timer);
        }
    }

    _goWarningPage() {
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: '报警消息',
                component: Warning,
                params: {
                    heightWarningTime: this.state.heightWarningTime,
                    weightWarningTime: this.state.weightWarningTime,
                    amplitudeWarningTime: this.state.amplitudeWarningTime,
                    forceWarningTime: this.state.forceWarningTime,
                    rotateWarningTime: this.state.rotateWarningTime,
                    windWarningTime: this.state.windWarningTime,
                }
            })
        }
    }

    _goBaseInfoPage() {
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: '基础信息',
                component: BaseInfo,
                params: {
                    model: this.state.model,
                    top2arm: this.state.top2arm,
                    armHeight: this.state.armHeight,
                    bottom2arm: this.state.bottom2arm,
                    lineDropHeight: this.state.lineDropHeight,
                    liftArm: this.state.liftArm,
                    balanceArm: this.state.balanceArm,
                    forcePro: this.state.forcePro,
                    rearPro: this.state.rearPro,
                    momentCurve: this.state.momentCurve,
                    maxWeight: this.state.maxWeight,
                    maxHeight: this.state.maxHeight,
                    maxForce: this.state.maxForce,
                    maxAmplitude: this.state.maxAmplitude,
                    maxRotate: this.state.maxRotate,
                    maxWind: this.state.maxWind,
                }
            })
        }
    }

    // 查询塔机基础信息
    _getBaseInfo() {
        let sim_num = this.props.sim_num;
        let that = this;
        let formData = new FormData();
        formData.append("sim_num", sim_num);
        let url = "http://localhost:8888/tower_crane/index.php/Home/towerCrane/baseInfo";
        Util.post(url, formData,
            function (responseJson) {
                if (responseJson.status === 0) {
                    AlertIOS.alert('查询失败！', responseJson.message, [{text: '确认'}]);
                }
                if (responseJson.status === 1) {
                    that.setState({
                        model: responseJson.data.model,
                        top2arm: responseJson.data.top2arm,
                        armHeight: responseJson.data.armheight,
                        bottom2arm: responseJson.data.bottom2arm,
                        lineDropHeight: responseJson.data.linedropheight,
                        liftArm: responseJson.data.liftarm,
                        balanceArm: responseJson.data.balancearm,
                        forcePro: responseJson.data.forcepro,
                        rearPro: responseJson.data.rearpro,
                        momentCurve: responseJson.data.moment_curve,
                        maxWeight: responseJson.data.maxweight,
                        maxHeight: responseJson.data.maxheight,
                        maxForce: responseJson.data.maxforce,
                        maxAmplitude: responseJson.data.maxamplitude,
                        maxRotate: responseJson.data.maxrotate,
                        maxWind: responseJson.data.maxwind,
                    });
                }
            }, function () {
                AlertIOS.alert('查询失败！', '数据请求异常，请尝试重新登录', [{text: '确认'}]);
            });
    }

    // 查询塔机实时数据
    _getSinglePageData() {
        // 获取从dataList传递过来的参数: sim_num
        let sim_num = this.props.sim_num;
        // 保存上下文
        let that = this;
        let formData = new FormData();
        formData.append("sim_num",sim_num);
        let url = "http://localhost:8888/tower_crane/index.php/Home/towerCrane/realData";
        // 查询数据函数
        function getDataByPost(url,formData) {
            // 向后端发起post请求
            Util.post(url , formData,
                function (responseJson) {
                    if(responseJson.status === 0) {
                        AlertIOS.alert('查询失败！', responseJson.message, [{text: '确认'}]);
                    }
                    if(responseJson.status === 1) {
                        // 转换一下时间格式,unix时间戳*1000,使用getFullYear
                        var time = new Date(responseJson.data.update_time*1000);
                        var timeStr = time.getFullYear()+'年'+(time.getMonth()+1)+'月'+time.getDate()+'日 '+time.getHours()+':'+time.getMinutes();
                        var startTime = new Date(responseJson.data.startTime*1000);
                        var startTimeStr = startTime.getHours()+':'+startTime.getMinutes()+':'+startTime.getSeconds();

                        // 将数据发送给state
                        that.setState({
                            weight: responseJson.data.weight,
                            height: responseJson.data.height,
                            force: responseJson.data.force,
                            amplitude: responseJson.data.amplitude,
                            rotate: responseJson.data.rotate,
                            wind: responseJson.data.wind,
                            heightWarningTime: responseJson.data.heightWarningTime,
                            weightWarningTime: responseJson.data.weightWarningTime,
                            amplitudeWarningTime: responseJson.data.amplitudeWarningTime,
                            forceWarningTime: responseJson.data.forceWarningTime,
                            rotateWarningTime: responseJson.data.rotateWarningTime,
                            windWarningTime: responseJson.data.windWarningTime,
                            startTime: startTimeStr,
                            endTime: timeStr,
                            duration: (responseJson.data.duration/3600).toFixed(2),
                            update_time: timeStr,
                            simStatus: responseJson.data.sim_status.replace(1,'正常').replace(0,'停机'),
                            lockStatus: responseJson.data.lock_status.replace(0,'解锁').replace(1,'1级').replace(2,'2级').replace(3,'3级'),
                        });
                    }
                }, function () {
                    AlertIOS.alert('查询失败！', '数据请求异常，请尝试重新登录', [{text: '确认'}]);
                });
        }
        // 调用查询数据函数
        getDataByPost(url,formData);

        // 轮询新数据
        // TODO:可以使用WebSocket
        this.timer = setInterval(function(){
            getDataByPost(url,formData);
        },10000);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerTitle: {
        fontSize: 18,
        fontWeight: '400',
        color: '#666',
        marginTop: 10,
        marginLeft: 10,
    },
    updateTime: {
        marginTop: -40,
        flex: 1,
        borderTopWidth: Util.pixel,
        fontSize: 16,
        fontWeight: '300',
        color: '#888',
        textAlign: 'center',
        paddingBottom: 10,
        paddingTop: 10,
    },
    dashboard:{
        height: Util.size.height/2.2,
        borderTopWidth: Util.pixel,
        borderBottomWidth: Util.pixel,
        borderColor: 'rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
    },
    dataContainer: {
        borderTopWidth: Util.pixel,
        borderBottomWidth: Util.pixel,
        borderColor: 'rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
        marginTop: 10,
    },
    dataItemContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    item: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 15,
        marginBottom: 15,
    },
    title: {
        flex: 2,
        fontSize: 18,
        fontWeight: '300',
        color: '#333',
        textAlign: 'center',
        marginTop: 5,
    },
    data: {
        fontWeight: '300',
        color: '#666',
    },
    percent: {
        flex: 1,
        fontSize: 18,
        fontWeight: '300',
        color: '#888',
        textAlign: 'right',
    },
    infoContainer: {
        borderTopWidth: Util.pixel,
        borderBottomWidth: Util.pixel,
        borderColor: 'rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
        marginTop: 10,
    },
    info: {
        flexDirection: 'row',
    },
    infoItem: {
        marginTop: 10,
        marginBottom: 20,
        borderColor: '#3ea8a0',
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
    linkContainer: {
        borderTopWidth: Util.pixel,
        borderBottomWidth: Util.pixel,
        borderColor: 'rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
        marginTop: 10,
    },
    linkItem: {
        height: 50,
        borderBottomWidth: Util.pixel,
        borderColor: 'rgba(0,0,0,0.1)',
        flexDirection: 'row',
        alignItems: 'center',
    },
    linkText: {
        flex: 15,
        marginLeft: 20,
        fontSize: 18,
        fontWeight: '300',
        color: '#333',
    },
    moreIcon: {
        marginRight: 10,
        flex: 1,
        width: 15,
        height: 15,
    },
});

module.exports = SingleDataPage;