import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    TouchableOpacity,
} from 'react-native';
import Util from '../common/util';
import TWebView from '../common/WView';

export default class list extends Component {
    constructor(props){
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            url : props.url,
            dataSource: ds.cloneWithRows([]),
        };
    }

    render(){
        return (
        <ListView
            enableEmptySections={true}
            dataSource={this.state.dataSource}
            renderRow={(rowData) => (
                <TouchableOpacity style={styles.item}
                                  onPress={this._showWebPage.bind(this, rowData.url ,  rowData.title)}
                >
                    <View>
                        <Image style={styles.image} source={{url:rowData.img}}/>
                    </View>
                    <View style={styles.text_wrapper}>
                        <Text style={styles.title} numberOfLines={1}>{rowData.title}</Text>
                        <Text style={styles.time}>{rowData.time}</Text>
                    </View>
                </TouchableOpacity>
            )}
        />
        );
    }

    componentDidMount(){
        let url = this.state.url;
        let that = this;
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        Util.get(url,function (data) {
            // console.log(data.status);
            if(data.status){
                let obj = data.data;
                that.setState({
                    dataSource: ds.cloneWithRows(obj),
                });
            } else {
                alert('数据读取失败')
            }
        },
        function (err) {
            alert(err);
        });
    }

    // 展示详情页
    _showWebPage(url,title){
        this.props.navigator.push({
            component: TWebView,
            title: title,
            passProps: {
                url: url,
            }
        });
    }
}

var styles = StyleSheet.create({
    item: {
        height: 78,
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomColor: '#ededed',
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
    },
    text_wrapper: {
        flex: 1,
        marginTop: 5,
    },
    time: {
        color:"#ddd",
        fontSize: 14,
        marginLeft: 8,
        marginTop: 15,
    }
});

module.exports = list;