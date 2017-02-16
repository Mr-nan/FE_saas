import React from 'react';
import {
    AppRegistry,
    View,
    StyleSheet,
    PixelRatio
} from 'react-native';

import BaseComponent from '../component/BaseComponent';
import * as fontAndColor from '../constant/fontAndColor';
import AutoSearchInputText from '../component/AutoSearchInputText';
import MyButton from '../component/MyButton';
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var onePT = 1 / PixelRatio.get(); //一个像素
export default class MainScene extends BaseComponent {
    initFinish = () => {

    }

    buttonParams = {
        buttonType: MyButton.TEXTBUTTON,
        parentStyle: styles.loginBtnStyle,
        childStyle: styles.loginText,
        content: "确定",
        mOnPress: () => {

        },
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: fontAndColor.COLORB0,paddingTop:23}}>
                <MyButton {...this.buttonParams}/>
                <AutoSearchInputText
                    searchBtShow={true}
                    inputPlaceholder={"按车型信息搜索"}
                    searchType="carName"
                    parentStyle={styles.parentStyle}
                    childStyle={styles.childStyle}
                    resultStyle={styles.resultStyle}
                    inputTextStyle={styles.inputTextStyle}
                    itemStyle={styles.itemStyle}
                    submitEditing={(text)=>{

                    }}
                    btnStyle={styles.btnStyle}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    loginBtnStyle: {
        width: 100,
        height: 30,
        backgroundColor: "#00ff00",
        marginTop: 50
    },
    loginText: {
        fontSize: 16
    },
    inputTextStyle: {
        backgroundColor: "#ffffff"
    },
    parentStyle: {
        width: width, position: 'absolute', top: 23, left: 0
    },
    childStyle: {
        height:45
    },
    resultStyle: {
        borderColor: '#00000000',
        width: width
    },
    inputTextStyle: {
        backgroundColor:'#ffffff',
        paddingLeft:17+5
    },
    btnStyle: {
        width: 17,
        height: 17,
        position: 'absolute',
        top: 45 / 2 - 17 / 2,
        left: 5
    },
    itemStyle: {
        fontSize: 16,
        padding: 5,
        paddingTop: 10,
        paddingBottom: 10,
        borderWidth: onePT,
        borderColor: '#ddd',
        borderTopWidth: 0,
        backgroundColor: '#ffffff'
    }
});

