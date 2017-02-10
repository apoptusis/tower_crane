import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    TouchableOpacity,
    AlertIOS,
} from 'react-native';
import Util from '../common/util';
import Detail from './detail';
import NavigationBar from '../common/navBar';


export default class list extends Component {
    constructor(props){
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([]),
        };
        this._getListData();
    }

    render(){
        return (
            <View style={{flex:1}}>
                <NavigationBar
                    title={this.props.name}
                    leftText={'返回'}
                    leftAction={ this._backToFront.bind(this) }
                />
                <ListView
                    enableEmptySections={true}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => (
                        <TouchableOpacity style={styles.item}
                                          onPress={this._showWebPage.bind(this, rowData.page_url)}
                        >
                            <View>
                                <Image style={styles.image} source={{url:rowData.img_url}}/>
                            </View>
                            <View style={styles.text_wrapper}>
                                <Text style={styles.title} numberOfLines={1}>{rowData.title}</Text>
                                <Text style={styles.time}>{rowData.update_time}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        );
    }

    _getListData(){
        let that = this;
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        let url;
        if(this.props.searchText){
            url = "http://localhost:8888/tower_crane/index.php/Home/towerCrane/getArticle?search=" + this.props.searchText;
        }else{
            url = "http://localhost:8888/tower_crane/index.php/Home/towerCrane/getArticle?type=" + this.props.type;
        }
        Util.get(url,function(responseJson) {
            if(responseJson.status === 0) {
                AlertIOS.alert('Oops！', responseJson.message, [{text: '确认',onPress: ()=>{that._backToFront ()}}]);
            }
            if(responseJson.status === 1){
                that.setState({
                    dataSource: ds.cloneWithRows(responseJson.data),
                });
            }
        },
        function (err) {
            alert(err);
        });
    }

    // 展示详情页
    _showWebPage(url){
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: '详情',
                component: Detail,
                params: {
                    url: url,
                }
            });
        }
    }

    _backToFront (){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }
}

var styles = StyleSheet.create({
    item: {
        height: 78,
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomColor: 'rgba(0,0,0,0.1)',
        borderBottomWidth: Util.pixel,
        flexDirection: 'row',
    },
    image:{
        marginTop: 10,
        height: 60,
        width: 60,
        borderRadius: 3,
    },
    title: {
        marginTop: 10,
        marginLeft: 8,
        fontSize: 16,
        color:"#333",
    },
    text_wrapper: {
        flex: 1,
        marginTop: 5,
    },
    time: {
        color:"#666",
        fontSize: 14,
        marginLeft: 8,
        marginTop: 15,
    }
});

module.exports = list;