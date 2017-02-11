import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';
var backIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAEWUlEQVR4Xu3dy2oUURDG8S8+iPgAuhZ8BsG1S0HBCxKv60SX8YauvCC+g+AbKIigb+DCdxDcGekhw0zGdJ/Tc6qhq+qfbTJ1+tT3m+pLxrgjvlJ3YCf17tm8AJAcAQAAkLwDybfPBABA8g4k3z4TAADJO5B8+0wAACTvQPLtMwEAkLwDybfPBABA8g4k3z4TYDoApyT9na68TWUA2PRxvcoVSfuSTkv6IWlX0mf7ZWwqAsCmj8sqDyUdbJT8I+mcpJ+2S9lUA4BNH7sqJ4W/rP5Y0p7dUnaVAGDTy6HwuxVeSrpjs5RtFQC097MUfrfCRUmf2peyrwCAtp7WhP9G0g1Jh21LTfNqAGzf15rw30m6PufbQQBsByBE+N3WATAeQJjwAZA8fACMAxDqnb/cOqeAOgQhw2cC1IX/QNKTwo/O/mq/7/iZAMPJhg6fCZA8fAD0Awj/zucisC38t0ePd2f/gY/SZQ7XAMc7VPPODxM+p4Dk4QNgBSDdO59rAMJfdCD7NUDadz4TQEoffuYJcF/S08ItUqirfR4FrzpA+Gsasl0DEP7GKMgEoCb87gOcN+f8Gb7Sk72x388CgPB7ZGQAQPgDYyE6AMIvnBMiAyD8iguCqAAIvyL8qA+CCL8y/IgACH9E+NEA3JP0rLD/dPf5JQ9RrgEIv5R04OcAhL9l+BFOATXhv5Z0K9Pj3TEePJ8CCH9M0sFOAYRvEL7XUwDhG4XvEQDhG4bvDQDhG4fvCQDhTxC+FwCEP1H4HgDclfS8sH/u8xuAzPk5wAVJXwi/Id2Kl84ZwIvC39flnV8RcOlH5gygG/3dKaDv64OkqzziLUU8/P05Azgv6WtheyBoy3/2/zj0tqRXIGhMeeDlc54Ay8MGwXT5z34CgGDC8D08B1jfPpNgAgweTgEgmCD4ZUlvALrjZhIYgvAIAAQAWHSASWAAwesE4O7AIHxvdwF9W2YSNGDwPgGYBA3hR5kAIGhAEGUCgGBLBNEAcHcwEkJEACAYgSAqABBUIogMAAQVCKIDAEEBQQYAIBhAkAUACHoQZAIAghMQZAMAgg0EGQGAYA1BVgAgOEKQGQAI+F/DFm+D1J8nyD4B0v8WEQCrC6KUkwAAx2+L0iEAwP8PR1IhAMDJj0jTIABA/y9KUiAAwPCvS8MjAED5QxOhEQCgDCD0wyIA1AEIiwAA9QBCIgDAOADhEABgPIBQCACwHYAwCACwPYBaBO8lXZN02LbUNK8GQHtfa54TXJL0sX0p+woAsOlpCUH31053bZayrQIAu34OIdiX9MhuKbtKALDrZd81wW9JZyX9sl3KphoAbPq4XuWypD1JZyR9P/qT99/sl7GpCACbPrqtAgC30dkcOABs+ui2CgDcRmdz4ACw6aPbKgBwG53NgQPApo9uqwDAbXQ2Bw4Amz66rQIAt9HZHDgAbProtgoA3EZnc+AAsOmj2yoAcBudzYEDwKaPbqsAwG10Ngf+D0d/G5C2/+3WAAAAAElFTkSuQmCC';

export default class navBar extends Component {
    render() {
        const {title,leftText,leftAction,} = this.props;
        return (
            <View style={styles.wrapper}>
        {
            (()=>{
                if (leftText && title) {
                    return  <View style={styles.container}>
                                <TouchableOpacity
                                    style={styles.iconContainer}
                                    onPress={ ()=>{leftAction()} }>
                                    <Text style={styles.arrowText}>
                                        &lt;
                                    </Text>
                                    <Text style={styles.leftText}>
                                        {leftText}
                                    </Text>
                                </TouchableOpacity>
                                <View style={styles.titleContainer}>
                                    <Text style={styles.title}>
                                        {title}
                                    </Text>
                                </View>
                            </View>
                }
            })()
        }
        {
            (()=>{
                if (title && !leftText) {
                    return  <View style={styles.container}>
                                <View style={styles.singleTitleContainer}>
                                    <Text style={styles.title}>
                                        {title}
                                    </Text>
                                </View>
                            </View>
                }
            })()
        }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: "#4a89dc",
    },
    container: {
        marginTop:16,
        height: 40,
        backgroundColor: "#4a89dc",
        alignItems: 'center',
    },
    iconContainer: {
        top: 10,
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        alignItems: 'center',
    },
    arrowText: {
        top: -2,
        marginLeft: 10,
        marginRight: 5,
        fontSize: 28,
        fontWeight: '400',
        color: '#fff',
    },
    leftText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#fff',
    },
    titleContainer: {
        flex: 1,
        top: -10,
    },
    title: {
        fontSize: 18,
        fontWeight: '500',
        color: '#fff',
    },
    singleTitleContainer: {
        flex: 1,
        top: 10,
    },
});

module.exports = navBar;