import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TabBarIOS,
    AsyncStorage,
} from 'react-native';

import loginPage from './loginPage'
import MapPage from './map/map';
import DataListPage from './data/dataList';
import ReadPage from './read/read';
import SettingPage from './setting/setting';

var mapIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAM20lEQVR4Xu1de6wcVRn/fWfvhQttrbxfvfPY3bbAhRYpCKHhHUAURR4qQsCk8n5EwGAUFDUBo5GAEBGsEgsE3yiRgK0SbCFBCi2EQnl1Z3fO3gvaIlAeLbXdOZ+Z7S225badnTO7e3Zm5t/9vu98v9/57ZmZM998Q8iPTDNAmUafg0cugIyLIBdALoCMM5Bx+PkKkAsg4wxkHH6+AuQCyDgDGYefrwC5ADLOQMbh5ytALoCMM5Bx+PkKkAsg4wxkHH6+AuQCyDgDGYefrwC5ADLOQMbhZ2IFmDo4uHeAvkNQ4CFmLgJirwC8kwAGBKsGU+E9Br9HrJazEC8L4KUG8Jzv+/9Ouz7SKoCCa7nHFYhPC4CTBFCMM5EBsFQAfyPwg56U8wFwnDgm+6RKAFMmTdonKPRfCsWzILBnosQr+EyYExDPllL+K9HYXQyWCgGUSqVBNBrXK8XnCSG2ayufCmtQwOwG8w/TIISeFoDjOAMF5muh6BoIDLR14j8a/AMC3zBx111/vHjx4nUdHjux4XpWAJMd5zDFfA9AUxJjI04gwvMciFnV4eqiOO7d9ulJAZQs5xuK+EYB6us2geH4Sqm1BUFXVaT8mQn5tJJDTwmgXC5vz+sacwCc1QrIjtmyuntgwoQLly5durZjY2oO1DMCmDp16oTGmjUPAnS0Jua2uitg7rqgcfrIyMgHbR0ooeA9IYCh3YbGr9px1bwCcERCuNschhcMrB5/ytI3lr7f5oG0wxsvgKGhoe3WvL/6YYCP10bbyQCMh726/zkAQSeHbXUs4wVQsqw5IPGVVoEZYc+406v7lxiRyxaSMFoAZdu+jEE/NZnAbebGdKFXr/1im3ZdMjBWAK7rTkcjWCiE2L5L3CQ17Gol6OBarfZKUgGTjGOkAGbMmNH/zooVT7MoTE8SbLdiMfBMVfqfNPF6wEgBhBs9IPyoXROmwCMC8Jjo3eYYSk0EiRIB+7RrTAJfXpHy9nbFjxvXOAGUSqXdVaPhCdD4uKDG8GMozGXB97EQj9RqteVjxXYcZ88+RScwgnNA4kQguQYaBLy1JmhMHhkZeStBXNqhjBOAa9u3CdAV2shGAxDofoL6zjIpX2olZtmyhgLgRkHi1Fb8tmbLoJursvb1pOIlEccoAYT/wEKAWhJP9hTwZkHRrMpw7S86RBVt+3RSdBcEPq4Tp3mmAb8fMFv1ev1t3VhJ+RslgLLjfJ8Z12uDIyzrYz7pFSlr2rEAlCaVyqoQzItbWbRpDvxtT8obk8griRgmCaBQsp1hAHvpAGOgFoBnJl2s0aw2InoComDp5AfgdU/6g80FwYDDGAEUbfvTBHpIhxMGVhXAh7Z6vo86ZnFS8UAqqIUAdojqM5YdEY6t+H5YY9j1wxgBuI5zt2Ccp8UI00VevTZbK8Y2nEuWewWIb9MZQxFm13z/Ip0YSfmaIgDh2s4KAewSHxgv8qQMN1vaXblbKNn2MwBNi51roFZ4I/U9Yvsn6GiEAIqDxUNIqKd1cJGiU3Wv+KOOX7bcLzDx76Paj2UnwPu361TVSl5mCMBxriTGLa0kvrFtuLNXk9Lu1IXVMTimb3hS9TUUxO5xc2bCJVXfvzOuf1J+RgigPOjcxwJnxwZFuNXz/Stj+8dwLFnWnSChcR7nez0p9a55YuS9uYsRAig5zhIwDoyNh3Ca5/sPxPaP4VhynC+B8dsYrk0XBi+sSnl4XP+k/MwQgO2s1rm1IhWUK8PDXlKkRIlTtqz9mcTSKLZj2YTPBirS17jojTvypn5dF8CUvafsGvSvfUMHzsD4cdt3uhJ32h57jFs1sINWzV9A2Mn3/ZU62HV9uy6Ayba9nwK9GBeIAjdqUvbH9dfxK9lOuJsXm8M+cDGp7eq4OGInH3fAzf3Wv+GDJ3XiedIvdOoOYEOeo+8orNHJmwMxrTpSfV4nhq5v1wXgDrpHCsGP6QCh/r7dK5WK1mmk1fHXv4ncN9Kq36b2PNOT8gm9GHreXRdAEptAStFRteHa43pUtOZdtKzjicQjrXltfgHGR1Sk/KdODF3frgvAdV1bKPZ1gDDjm9W637YSsrFyK1rOd4nwPZ28oQoHesPeC1oxNJ27LoAkrqZBeNzz/aM0uWjJveQ4T4FxaEtOmxn/N2js0u0Ssa4LIOTEtax3BYkJGmQygsIUb8SraMSI7Kq7BxAOpFi9V6vXPxZ50DYZGiGAomUtIBJ6/2BWP/fq9YvbxNMmYZN4dB0AT/jSn9mJfLc2hhECKA26N0GwVrFkuB8gVN8n2n1OLVnWDJB4CoDQmTwG3V6Vtct1YiTha4QAypb7RSb+nT4gXjQwfvzMdu0KjrakWahVCzAKksHnVKX8tT5mvQhGCGB9k6egrgdlvTeD7qrK2vlJxNo8RhJL/4aY1OgbrLxW0dxH0EdphABCGCXbfh6gA/QhNUWQdP09ubZ9a1LvKzDwYlX6Q0lg1Y1hkADcGwG+VhfQRv6/GbfmgwuWLF++SidmuVz+mFq37i4CnakTZ1NfvsmT8prk4sWPZIwAkngm8BEaCMuUostq9drf41BUsu2Tw4s1Atw4/lv26f4W8IenomSBaUWj0qDzeuIdPpvvfmJ+gejmibvtPHdbPf3CN5NXvvnmZwBcDcaRWojGdg7fC5jUgeLVSKkbswKE2ZYt5xYmtLO0620o/IMELwaLCgpYCWaCoolMajIUzQBwbBKvgW2JfQZuqUr/6kiz0wEjowQw+uLFkg7g7toQBD64IuWzXUtgs4GNEsD6uwF3EcDhPzGFBy/xpDSq6YVxAkhFX6AtSpeu8GTNqJ5HxgnAsqyd+kmEGyQ7pmwJWB0Q9ul2DeDmnBongOZpQLvm3kDpdPBhVSvojRSA4zj7FhhhoaiR+bVC8If326wOqNTrscvI44wZxcdYgl3b+asAPhUFhPE2rOZ59bqRWIwVQNl1T2TF84yf3AgJMosTqvWqVv1ghGFimRgrgBBN0XKeJcJBsZAZ40SLPVk7xJh0TN8H2Di/om2fQaA/mkpelLwYfEZVyj9Fse2GjdErQHgRWLLtJUk9Ju40waOPfcNH3O1uWhEbmukCgO5buLGZScKRcJbn+wlUOiWRzNgxjBdAWHtXGnRegMB+7aMh+cjhRyd96YdtZIzoBrYlhL0gAJQt90wm/kPy09TOiHy6J+Wf2zlCErF7QgDNOwLbfpJAhyUBut0xTGn+EAVnzwig7DhHM8OI3nrbItakPoDbzHVbBib9Xhp0HobAySbl9NFc6CFP1k4xO8f/Z9czK0DzNLC+U2dYTBH2AzDxCIjVtEq9HrvhRadB9ZQAQnJMflJIwB0V6V/a6UnUGa/nBNDsKVRYu6yddXuxCFVYWQi2m/zq66/+J5Z/l5x6TgDNU4HlfI0IP+kSZ2MOy4wrq3X/VpNyipJLTwog7NRZt/3nCNg/Csh224SbPo50DpqP+Y12j5V0/J4UQPNawLaPBejRpAmJE6+Xbvs2x9ezAhgVwT0AnRtn0pLzMaPla1w8PS2Acrm8G9Y1XmZg57gE6PiF3T7R37dvpzuU6eScqhUgBFO23fMZ3JVPszJhVtX3f5XkhHQ6Vk+vAKNkUclxFrTpPb6tzcejnvR764vmY6BJgwCaX/VCIQhfKdP6lk/Uf1/4baI+VtNerderUX1MtUuFAJqnAse5ihk3d4LoXr3nH4ub1AigWThiu48B3NbOW8zqsWq9fozJZV6t/AnSJAAUi8UpFDQfFrXltbLwy5/9zNPTsPRvEEmqBBCCKjrOxcS4o5V/QVRbAl1QkbVfRrXvBbvUCSAk3bWsB5L86HMYk4EHqtI/rRcmtZUcUymA0a+QhHcFWp+h3UBk+FWydUEwvdt9fVuZ2Ki2qRRACL5k28cBFDaH0uroCSAgwvEV318QldReskutAEZFcB1AN+hMCIGvq0j5A50YJvumWgDr3yxyHwQ47PoV42jW9302Lbd8ad8HGHOCw44jgsTTBaDUigIUuMJEh5rW0aMVDFFs074CNDlwXXeqaPCTkcvIlHonKIjDfd9/OQqJvWyTCQFsuChUiucKIbb6iTml1Foh6GRPSiOKTdotrswIICSy6DhfJsa9WykrVyCcbfoLnUmKIlMCCIkrW+65TDxnjNvDcPK/6vl++FtmjswJoHk6cJzPK6Xu2eg7RasZfF5VyvszM/OjQDMpgObpIHxw1FDfgsC4ALg+Cxd8mbwNzNo/ulW8mV0BWiUqrfa5ANI6sxFx5QKISFRazXIBpHVmI+LKBRCRqLSa5QJI68xGxJULICJRaTXLBZDWmY2IKxdARKLSapYLIK0zGxFXLoCIRKXVLBdAWmc2Iq5cABGJSqtZLoC0zmxEXLkAIhKVVrNcAGmd2Yi4cgFEJCqtZrkA0jqzEXH9Dy3C9q6VuzyHAAAAAElFTkSuQmCC';
var dataIcon = 'data:image/png;base64,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';
var articleIcon = 'data:image/png;base64,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';
var settingIcon = 'data:image/png;base64,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';

export default class indexPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'map',
            token: null,
            username: null,
        };
        // this._isLogin.bind(this);
    }

    render() {
        return (
            <TabBarIOS
                tintColor="#63a6a1"
                barTintColor="#fff"
            >
                <TabBarIOS.Item
                    title="定位"
                    icon={{url: mapIcon, scale:3.5}}
                    onPress={ () => {
                        this.setState({
                            selectedTab: 'map'
                        });
                    }}
                    selected={this.state.selectedTab === 'map'}
                >
                    {this._renderView('map')}
                </TabBarIOS.Item>

                <TabBarIOS.Item
                    title="数据"
                    icon={{url: dataIcon, scale:5}}
                    onPress={ () => {
                        this.setState({
                            selectedTab: 'data'
                        });
                    }}
                    selected={this.state.selectedTab === 'data'}
                >
                    {this._renderView('data')}
                </TabBarIOS.Item>

                <TabBarIOS.Item
                    title="资讯"
                    icon={{url: articleIcon, scale:5}}
                    onPress={ () => {
                        this.setState({
                            selectedTab: 'read'
                        });
                    }}
                    selected={this.state.selectedTab === 'read'}
                >
                    {this._renderView('read')}
                </TabBarIOS.Item>

                <TabBarIOS.Item
                    title="设置"
                    icon={{url: settingIcon, scale:5}}
                    onPress={ () => {
                        this.setState({
                            selectedTab: 'setting'
                        });
                    }}
                    selected={this.state.selectedTab === 'setting'}
                >
                    {this._renderView('setting')}
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }

    _renderView(name) {
        let view = null;
        switch (name){
            case 'map':
                view = <MapPage/>;
                break;
            case 'data':
                view = <DataListPage navigator={this.props.navigator}/>;
                break;
            case 'read':
                view = <ReadPage navigator={this.props.navigator}/>;
                break;
            case 'setting':
                view = <SettingPage navigator={this.props.navigator}/>;
                break;
            default :
                view = <MapPage/>;
                break;
        }
        return view;
    }

    componentDidMount() {
        storage.load({
            key: 'storageData',
            autoSync: true,
            syncInBackground: true,
        }).then(ret => {
            this.setState({
                username: ret.username,
                token: ret.tokenId,
            });
        }).catch(err => {
            // alert(err.message,err.name);
        }).then(()=>{
            if (!this.state.token){
                const { navigator } = this.props;
                if(navigator) {
                    navigator.push({
                        name: '登录页',
                        component: loginPage,
                    })
                }
            }
        }).done();
    }

}
module.exports = indexPage;