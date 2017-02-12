import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
} from 'react-native';
import WView from '../common/WView';
import NavigationBar from '../common/navBar';

export default class mapPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tokenId: null,
        };
    }

    render() {
        return (
            <View style={{flex:1}}>
                <View style={styles.container}>
                    <WView
                        url='http://localhost:8888/tower_crane/index.php/home/towerCrane/map.html'
                        data={this.state.tokenId}
                    />
                </View>
            </View>
        );
    }

    componentDidMount(){
        var that = this;
        // 提取storage中的tokenId
        storage.load({
            key: 'storageData',
            autoSync: true,
            syncInBackground: true,
        }).then(ret => {
            that.setState({
                tokenId: JSON.parse(ret.tokenId),
            });
        });
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop: -20,
    }
});

module.exports = mapPage;