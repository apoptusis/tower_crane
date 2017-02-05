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
            update_time: null,
        };
        this.timer = null;
        this._getSinglePageData();
    }
    render() {
        return (
            <View style={{flex:1,}}>
                <NavigationBar
                    title={'实时数据'}
                    leftText={'设备'}
                    leftAction={ this._backToFront.bind(this) }
                />
                <ScrollView style={styles.container}>
                    <View style={styles.dashboard}>
                        <WView
                            url={'http://localhost:8888/tower_crane/index.php/home/towerCrane/realData.html'}
                            data={this.props.sim_num}
                        />
                    </View>
                    <View style={styles.dataContainer}>
                        <View style={styles.twoRow}>
                            <View style={styles.leftData}>
                                <Text style={styles.title}> 起重重量 </Text>
                                <Text style={styles.data}> {this.state.weight} t </Text>
                            </View>
                            <View style={styles.rightData}>
                                <Text style={styles.title}> 变幅幅度 </Text>
                                <Text style={styles.data}> {this.state.amplitude} m </Text>
                            </View>
                        </View>
                        <View style={styles.twoRow}>
                            <View style={styles.leftData}>
                                <Text style={styles.title}> 回转角度 </Text>
                                <Text style={styles.data}> {this.state.rotate} ° </Text>
                            </View>
                            <View style={styles.rightData}>
                                <Text style={styles.title}> 起升高度 </Text>
                                <Text style={styles.data}> {this.state.height} m </Text>
                            </View>
                        </View>
                        <View style={styles.oneRow}>
                            <Text style={styles.oneRowTitle}> 当前风速 </Text>
                            <Text style={styles.data}> {this.state.wind} m/s </Text>
                        </View>
                        <View style={styles.oneRow}>
                            <Text style={styles.oneRowTitle}> 更新时间 </Text>
                            <Text style={styles.data}>
                                {this.state.update_time}
                                </Text>
                        </View>
                        <View style={styles.button} >
                            <TouchableOpacity onPress={this._goHistoryDataPage.bind(this,this.props.sim_num)}>
                                <Text style={styles.buttonText}> 历史数据 </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
    _goHistoryDataPage(sim_num){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'model',
                component: historyDataPage,
                params: {
                    sim_num: sim_num,
                }
            })
        }
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
                        // 将数据发送给state
                        that.setState({
                            weight: responseJson.data.weight,
                            height: responseJson.data.height,
                            force: responseJson.data.force,
                            amplitude: responseJson.data.amplitude,
                            rotate: responseJson.data.rotate,
                            wind: responseJson.data.wind,
                            update_time: timeStr,
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
    dashboard:{
        height: Util.size.height / 2.2,
    },
    dataContainer: {
        flex: 1,
        marginTop: 10,
    },
    twoRow: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
    },
    oneRow: {
        flex: 1,
        borderTopWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
    },
    leftData: {
        width: Util.size.width / 2,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
    },
    rightData: {
        width: Util.size.width / 2,
        borderTopWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
    },
    title: {
        marginLeft: 10,
        marginTop: 10,
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
    },
    data: {
        marginTop: 10,
        fontSize: 27,
        fontWeight: '300',
        textAlign: 'center',
        color: '#888',
    },
    oneRowTitle: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center',
        color: '#333',
    },
    button: {
        flex: 1,
        borderTopWidth: 1,
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
    }
});

module.exports = SingleDataPage;