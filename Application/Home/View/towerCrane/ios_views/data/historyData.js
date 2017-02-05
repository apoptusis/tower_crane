import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import WView from '../common/WView';
import NavigationBar from '../common/navBar';
import PercentageCircle from 'react-native-percentage-circle';

export default class historyDataPage extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    style={styles.navigationBar}
                    title={'历史数据'}
                    leftText={'实时'}
                    leftAction={ this._backToFront.bind(this) }
                />
                <WView url='http://localhost:8888/tower_crane/index.php/home/towerCrane/historyData.html'
                       data={this.props.sim_num}
                />
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
    },
});

module.exports = historyDataPage;