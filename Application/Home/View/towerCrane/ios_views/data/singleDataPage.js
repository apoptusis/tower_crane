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
import historyDataPage from './historyData'
import NavigationBar from '../common/navBar';
import PercentageCircle from '../common/circle';

// TODO:PercentageCircle组件似乎存在显示错误的问题
export default class SingleDataPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weight: null,
            height: null,
            force: null,
            amplitude: null,
            rotate: null,
            wind: null,
            warningTime:null,
            update_time: null,
            startTime: null,
            endTime: null,
            duration: null,
            maxweight: null,
            maxheight: null,
            maxforce: null,
            maxamplitude: null,
            maxrotate: null,
            maxwind: null,
        };
        this.timer = null;
        this._getSinglePageData();
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
                        />
                    </View>

                    <View style={styles.dataContainer}>
                        <Text style={styles.containerTitle}> 实时数据 </Text>
                        <View style={styles.dataItemContainer}>
                            <View style={styles.item}>
                                <PercentageCircle radius={50} percent={Math.floor(this.state.weight/this.state.maxweight*100)} color={"#3ea8a0"}>
                                    <Text style={styles.data}>{this.state.weight} t</Text>
                                </PercentageCircle>
                                <Text style={styles.title}> 起重重量 </Text>
                            </View>
                            <View style={styles.item}>
                                <PercentageCircle radius={50} percent={Math.floor(this.state.amplitude/this.state.maxamplitude*100)} color={"#3ea8a0"}>
                                    <Text style={styles.data}> {this.state.amplitude} m </Text>
                                </PercentageCircle>
                                <Text style={styles.title}> 变幅幅度 </Text>
                            </View>
                            <View style={styles.item}>
                                <PercentageCircle radius={50} percent={Math.floor(this.state.force/this.state.maxforce*100)} color={"#3ea8a0"}>
                                    <Text style={styles.data}> {this.state.force} N·M </Text>
                                </PercentageCircle>
                                <Text style={styles.title}> 起重力矩 </Text>
                            </View>
                        </View>

                        <View style={styles.dataItemContainer}>
                            <View style={styles.item}>
                                <PercentageCircle radius={50} percent={Math.floor(Math.abs(this.state.rotate/this.state.maxrotate*100))} color={"#3ea8a0"}>
                                    <Text style={styles.data}> {this.state.rotate} ° </Text>
                                </PercentageCircle>
                                <Text style={styles.title}> 回转角度 </Text>
                            </View>
                            <View style={styles.item}>
                                <PercentageCircle radius={50} percent={Math.floor(this.state.height/this.state.maxheight*100)} color={"#3ea8a0"}>
                                    <Text style={styles.data}> {this.state.height} m </Text>
                                </PercentageCircle>
                                <Text style={styles.title}> 起升高度 </Text>
                            </View>
                            <View style={styles.item}>
                                <PercentageCircle radius={50} percent={Math.floor((this.state.wind/this.state.maxwind)*100)} color={"#3ea8a0"}>
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

                        {/*<View style={styles.infoList}>*/}
                            {/*<View style={styles.infoListItem}>*/}
                                {/*<Text>重量报警</Text>*/}
                                {/*<Text>3</Text>*/}
                            {/*</View>*/}
                            {/*<View style={styles.infoListItem}>*/}
                                {/*<Text>幅度报警</Text>*/}
                                {/*<Text>3</Text>*/}
                            {/*</View>*/}
                            {/*<View style={styles.infoListItem}>*/}
                                {/*<Text>力矩报警</Text>*/}
                                {/*<Text>3</Text>*/}
                            {/*</View>*/}
                            {/*<View style={styles.infoListItem}>*/}
                                {/*<Text>高度报警</Text>*/}
                                {/*<Text>3</Text>*/}
                            {/*</View>*/}
                            {/*<View style={styles.infoListItem}>*/}
                                {/*<Text>角度报警</Text>*/}
                                {/*<Text>3</Text>*/}
                            {/*</View>*/}
                            {/*<View style={styles.infoListItem}>*/}
                                {/*<Text>风速报警</Text>*/}
                                {/*<Text>3</Text>*/}
                            {/*</View>*/}
                        {/*</View>*/}


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

    _getSinglePageData () {
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
                            warningTime: responseJson.data.warningTime,
                            startTime: startTimeStr,
                            endTime: timeStr,
                            duration: (responseJson.data.duration/3600).toFixed(2),
                            update_time: timeStr,
                            maxweight: responseJson.data.maxweight,
                            maxheight: responseJson.data.maxheight,
                            maxforce: responseJson.data.maxforce,
                            maxamplitude: responseJson.data.maxamplitude,
                            maxrotate: responseJson.data.maxrotate,
                            maxwind: responseJson.data.maxwind,
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
        color: '#3ea8a0',
        marginTop: 10,
        marginLeft: 10,
    },
    updateTime: {
        flex: 1,
        borderTopWidth: 1,
        fontSize: 16,
        fontWeight: '300',
        color: '#888',
        textAlign: 'center',
        paddingBottom: 10,
        paddingTop: 10,
    },
    dashboard:{
        height: Util.size.height/2.2,
        borderBottomWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
    },
    dataContainer: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
        marginTop: 15,
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
        // backgroundColor: 'red',
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
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
        marginTop: 15,
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
    button: {
        flex: 1,
        borderBottomWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
    },
    buttonText: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center',
        color: '#888',
    },
});

module.exports = SingleDataPage;