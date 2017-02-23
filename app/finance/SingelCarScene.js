/**
 * Created by lhc on 2017/2/15.
 */
//单车借款列表
//ok
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    KeyboardAvoidingView,

} from 'react-native';

import  {
    LendDatePike,
    LendInputItem,
    LendItem,
    LendRate,
    LendUseful,
    CommenButton,
    adapeSize,
    width,
    fontdapeSize,
    FEColor,
    dateFormat
} from './ComponentBlob'


//校验完成

import DateTimePicker from 'react-native-modal-datetime-picker'
const ColorFont =new FEColor();

let changeDate;

const imageSouce =require('../../images/financeImages/dateIcon.png')

export default class SingelCarSence extends Component {
    state = {
        companyName: '',
        lendType: '',
        dateLimit: '',
        isDateTimePickerVisible: false,
    }
    dataSourceBlob = [
        {title: '借款主体', key: 'companyName'},
        {title: '借款类型', key: 'lendType'},
        {title: '借款期限', key: 'dateLimit'},
    ];

    //datePiker的方法
    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false })

    //datePiker的回调
    _handleDatePicked = (date) => {

        changeDate(dateFormat(date,'yyyy-MM-dd'));

        this._hideDateTimePicker();
    }

//日历按钮事件
    onPress = (changeText)=> {
        changeDate=changeText;
        this.setState({ isDateTimePickerVisible: true });
    }
//申请借款
    onClickLend = ()=> {

        alert('申请借款')

    }

    render() {

        let itemBlob = [];
        this.dataSourceBlob.map((item)=> {

            itemBlob.push(<LendItem key={item.key} leftTitle={item.title} rightTitle={this.state[item.key]}/>)
        });

        return (
            <View style={styles.container}>
                <ScrollView style={styles.scroller}>
                    <KeyboardAvoidingView behavior={'position'} keyboardVerticalOffset={5}>
                        <View style={styles.lendInfo}>
                            {itemBlob}
                        </View>
                        <View style={styles.input}>
                            <LendInputItem title='金额' placeholder='请输入借款金额' unit='万'/>
                        </View>
                        <LendDatePike lefTitle={'用款时间'} placeholder={'选择用款时间'} imageSouce={imageSouce} onPress={this.onPress}/>
                        <LendUseful/>
                        <LendRate/>
                    </KeyboardAvoidingView>

                </ScrollView>
                <CommenButton
                    buttonStyle={styles.buttonStyle} textStyle={styles.textStyle} onPress={this.onClickLend}
                    title='申请借款'/>
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                    titleIOS="请选择日期"
                    confirmTextIOS='确定'
                    cancelTextIOS='取消'
                />

            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {

        flex: 1
    },
    scroller: {

        marginTop: 44,
        backgroundColor: ColorFont.COLORA3,
        paddingBottom:adapeSize(80)
    },

    lendInfo: {
        paddingTop: adapeSize(15),
        paddingBottom: adapeSize(10),
        backgroundColor: ColorFont.COLORA3
    },
    input: {

        paddingBottom: adapeSize(10),
        backgroundColor: ColorFont.COLORA3
    },
    buttonStyle: {


        height: adapeSize(44),
        backgroundColor: '#05c5c2',
        marginLeft: adapeSize(15),
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: adapeSize(16),
        width: width - adapeSize(30),
        borderRadius:5,
    },
    textStyle: {

        fontSize: fontdapeSize(15),
        color: '#FFFFFF'
    }
})

