import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    PixelRatio,
} from 'react-native';

module.exports = {
    // Dimensions模块用于获取设备屏幕的宽高。
    size : {
        height : Dimensions.get('window').height,
        width : Dimensions.get('window').width,
    },

    // 获取最小线宽，PixelRatio.get()访问设备的像素密度
    pixel : 1 / PixelRatio.get(),

    // 远程获取页面数据，用fetch代替ajax
    get : function (url, successCallback, failCallback) {
        return fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                successCallback(responseJson);
            })
            .catch((error) => {
                failCallback(error);
            });
    },

    post : function (url, data, successCallback, failCallback) {
        var fetchOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data;boundary=6ff46e0b6b5148d984f148b6542e5a5d'
            },
            body:data
        };
        return fetch(url, fetchOptions)
            .then((response) => response.json())
            .then((responseJson) => {
                successCallback(responseJson);
            })
            .catch((error) => {
                failCallback(error);
            });
    },
};