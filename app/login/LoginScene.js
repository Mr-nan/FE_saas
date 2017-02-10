import React, {Component} from "react";
import {AppRegistry, View, Text, TouchableOpacity, ListView, StyleSheet, Image, PixelRatio} from "react-native";
import BaseComponent from "../component/BaseComponent";
//import SGListView from 'react-native-sglistview';
import LoginInputText from "./LoginInputText";
import LoginAutoSearchInputText from "./LoginAutoSearchInputText";

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var onePT = 1 / PixelRatio.get(); //一个像素


export default class LoginScene extends BaseComponent {

    static defaultProps = {
        saveData: ["aaaaaa", "bbbbbbb", "cccccccccc"],
    };

    constructor(props) {
        super(props);
        //初始化方法
        this.state = {
            show: false,
            value: ""
        }
    }

    initFinish = () => {

    }

    onPress = () => {
    }

    render() {
        let views = [];
        for (let x in this.props.saveData) {
            views.push(
                <Text
                    key={x}
                    style={styles.item}
                    onPress={this.hide.bind(this, this.state.value ? this.state.value : this.props.saveData[x])}
                    numberOfLines={1}
                >
                    {this.state.value ? this.state.value : this.props.saveData[x]}
                </Text>
            );
        }
        return (
            <View style={styles.container}>
                <Image source={require('./../../images/test.jpg')} style={styles.iconStyle}/>
                <View>
                    <LoginAutoSearchInputText
                        ref="logininput"
                        searchBtShow={true}
                        inputPlaceholder={"请输入用户名"}
                        callBackSearchResult={(isShow) => {
                            if (isShow) {
                                this.setState({
                                    show: true
                                });
                            } else {
                                this.setState({
                                    show: false
                                });
                            }
                        }}/>

                    <LoginInputText
                        textPlaceholder={'请输入密码'}
                        rightIcon={false}
                        viewStytle={styles.itemStyel}/>

                    <LoginInputText
                        textPlaceholder={'请输入验证码'}
                        viewStytle={styles.itemStyel}
                        rightIconUri={require('./../../images/test.jpg')}/>

                    <LoginInputText
                        textPlaceholder={'请输入短信验证码'}
                        viewStytle={styles.itemStyel}
                        rightIconUri={require('./../../images/test.jpg')}/>

                    <View style={styles.loginBtnStyle}>
                        <Text style={{color: 'white', fontSize: 16}}>登录</Text>
                    </View>

                    <View style={styles.settingStyle}>
                        <Text style={styles.bottomTestSytle}>登录遇到问题></Text>
                        <Text style={styles.bottomTestSytle}>修改地址></Text>
                    </View>
                    {/* //结果列表*/}
                    {
                        this.state.show ?
                            <View style={[styles.result]}>
                                {views}
                            </View>
                            :
                            null
                    }
                </View>
            </View>
        );

    }

    //隐藏
    hide(val) {
        this.refs.logininput.setValue(val);
        this.setState({
            show: false,
            value: val
        });
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FEFDFB'
    },
    iconStyle: {
        height: 220,
        resizeMode: 'cover'
    },
    loginBtnStyle: {
        height: 38,
        width: width * 0.9,
        backgroundColor: '#C39849',
        marginTop: 8,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    settingStyle: {
        flexDirection: 'column',
        width: width * 0.9,
        alignItems: 'center'
    },
    itemStyel: {
        width: width * 0.9,
        marginTop: 2,
        marginBottom: 2,
        paddingBottom: 1,

    },
    bottomTestSytle: {
        fontSize: 12,
        color: '#B6CAD5'
    },
    result: {
        borderColor: '#ccc',
        borderTopWidth: onePT,
        position: 'absolute',
        backgroundColor: "#000000",
        width: width * 0.9-30,
        top:45,
        left:30,

    },
    item: {
        fontSize: 16,
        padding: 5,
        paddingTop: 10,
        paddingBottom: 10,
        borderWidth: onePT,
        borderColor: '#ddd',
        borderTopWidth: 0,
        backgroundColor: "#ffffff",
    }
});