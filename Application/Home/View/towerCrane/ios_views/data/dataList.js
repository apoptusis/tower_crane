import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    TouchableOpacity,
    TextInput,
    AlertIOS,
    AsyncStorage,
} from 'react-native';
import Util from '../common/util';
import SingleDataPage from './singleDataPage'
import NavigationBar from '../common/navBar';

var moreIcon = 'data:image/png;base64,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';

class DataListPage extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([]),
        };
        this._getDataList();
    }

    render(){
        return (
            <View style={styles.container}>
                <NavigationBar title={'我的设备'}/>
                <View style={{ flex: 1,}}>
                    <ListView
                        style={styles.list}
                        enableEmptySections={true}
                        dataSource={this.state.dataSource}
                        renderRow={(rowData) => (
                            <TouchableOpacity style={styles.container1} onPress={this._goSingleDataPage.bind(this,rowData.sim_num)}>
                                <View style={styles.itemContainer}>
                                    <View style={styles.leftInfo}>
                                        {
                                            (() => {
                                                if(rowData.type === '塔头式塔机'){
                                                    return <Image source={{url:"http://localhost:8888/tower_crane/Application/Home/View/towerCrane/images/crane1.png"}}
                                                                  style={styles.listImage}
                                                                  resizeMode='contain'/>
                                                }
                                            })()
                                        }
                                        {
                                            (() => {
                                                if(rowData.type === '平头式塔机'){
                                                    return <Image source={{url:"http://localhost:8888/tower_crane/Application/Home/View/towerCrane/images/crane2.png"}}
                                                                  style={styles.listImage}
                                                                  resizeMode='contain'/>
                                                }
                                            })()
                                        }
                                        {
                                            (() => {
                                                if(rowData.type === '动臂式塔机'){
                                                    return <Image source={{url:"http://localhost:8888/tower_crane/Application/Home/View/towerCrane/images/crane3.png"}}
                                                                  style={styles.listImage}
                                                                  resizeMode='contain'/>
                                                }
                                            })()
                                        }
                                    </View>
                                    <View style={styles.rightInfo}>
                                        <Text style={styles.title}>{rowData.model} / {rowData.type}</Text>
                                        <Text style={styles.simNum}>SIM卡号：{rowData.sim_num}</Text>
                                    </View>
                                    <View style={styles.moreIcon}>
                                        <Image source={{url:moreIcon}}
                                               style={styles.moreImage}
                                               resizeMode='contain'/>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
        );
    }

    // 实现页面转换并传递sim_num给下一个页面
    _goSingleDataPage(sim_num) {
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: '详情',
                component: SingleDataPage,
                params: {
                    sim_num: sim_num,
                }
            });
        }
    }

    // 通过storage中存储的用户信息,查询获得数据列表
    _getDataList() {
        let that = this;
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        // 提取storage中的信息
        storage.load({
            key: 'storageData',
            autoSync: true,
            syncInBackground: true,
        }).then(ret => {
            // post给服务器端查询数据
            let url = "http://localhost:8888/tower_crane/index.php/Home/towerCrane/dataList";
            let formData = new FormData();
            formData.append("tokenId",JSON.parse(ret.tokenId));
            Util.post(url, formData,
                function(responseJson) {
                    if(responseJson.status === 0) {
                        AlertIOS.alert('数据查询失败！', responseJson.message, [{text: '确认'}]);
                    }
                    if(responseJson.status === 1) {
                        that.setState({
                            dataSource: ds.cloneWithRows(responseJson.data),
                        });
                    }
                },
                function(){
                    AlertIOS.alert('查询失败！', '数据请求异常，请尝试重新登录', [{text: '确认'}]);
                })
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f4f9',
    },
    list: {
    },
    itemContainer: {
        flexDirection: 'row',
        height: 90,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
        marginBottom: 10,
    },
    leftInfo: {
        flex: 2,
        width: Util.size.width/5,
        borderRightWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    listImage: {
        width: 70,
        height: 70,
    },
    rightInfo: {
        flex: 5,
        justifyContent: 'center',
    },
    title: {
        marginLeft: 15,
        fontSize: 20,
        fontWeight: '300',
        color: '#333'
    },
    simNum: {
        marginTop: 10,
        marginLeft: 15,
        fontSize: 14,
        color: '#888'
    },
    moreIcon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    moreImage: {
        width: 20,
        height: 20,
    },
});

module.exports = DataListPage;