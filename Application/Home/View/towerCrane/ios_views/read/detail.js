import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import WView from '../common/WView';
import NavigationBar from '../common/navBar'

export default class Detail extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'文章详情'}
                    leftText={'返回'}
                    leftAction={ this._backToFront.bind(this) }
                />
                <WView
                    url={this.props.url}
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

var styles = StyleSheet.create({
    container : {
        flex: 1
    },
});

module.exports = Detail;