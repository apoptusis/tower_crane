import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import Util from '../common/util';
import List from './list';

export default class category extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: props.data,
            navigator: props.navigator,
        }
    }

    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    分类
                </Text>
                <View style={styles.row}>
                    <View style={styles.row_item}>
                        <TouchableOpacity style={styles.item} onPress={this._goToList.bind(this)}>
                            <Text style={styles.text}>
                                塔机修理
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.row_item}>
                        <TouchableOpacity style={styles.item} onPress={this._goToList.bind(this)}>
                            <Text style={styles.text}>
                                新闻快报
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.row_item}>
                        <TouchableOpacity style={styles.item} onPress={this._goToList.bind(this)}>
                            <Text style={styles.text}>
                                事故快报
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.row_item}>
                        <TouchableOpacity style={styles.item} onPress={this._goToList.bind(this)}>
                            <Text style={styles.text}>
                                其他
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    _goToList(name) {
        let type = this._getType(name);
        let url = 'http://localhost:3000/data/read?type=' + type;
        this.state.navigator.push({
            component: List,
            title: name,
            barTintColor: '#fff',
            passProps: {
                url: url
            }
        });
    }
}

var styles = StyleSheet.create({
    container: {
        marginLeft: 10,
        marginRight: 10,
    },
    title: {
        color: '#5e5e5e',
        marginTop: 10,
        marginBottom: 10,
        fontSize: 18,
    },
    row: {
        flexDirection: 'row',
        marginTop: 5
    },
    row_item: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        height: 80,
        width: (Util.size.width - 30) /2,
        borderColor: '#f1f1f1',
        borderWidth: 1,//Util.pixel,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#707070',
        fontSize: 18,
        fontWeight: '300',
    }
});

module.exports = category;