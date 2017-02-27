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
} from './component/ComponentBlob'

import {width, adapeSize, fontadapeSize, PAGECOLOR,dateFormat} from './component/MethodComponent';
import BaseComponent from '../../component/BaseComponent';
import  AllNavigatior from '../../component/AllNavigationView'
import DateTimePicker from 'react-native-modal-datetime-picker'
import Picker from 'react-native-picker';


const PostData = {
    apply_type: '4',
    loan_mny: '',
    remark: '',
    use_time: '',
    loan_life:''
}

const imageSouce =require('../../../images/financeImages/dateIcon.png')

export default class KurongSence extends BaseComponent {
    state = {
        companyName: '',
        lendType: '',
        dateLimit: '',
        isDateTimePickerVisible: false,
    }
    dataSourceBlob = [
        {title: '借款主体', key: 'companyName'},
        {title: '借贷类型', key: 'lendType'},
        {title: '可借额度', key: 'dateLimit'},
        {title:'借款类型',key:'type'}
    ];
    dateBlob =['30天','60天','90天','180天'];


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
                        <View style={{marginBottom:10}}>
                            <LendDatePike onPress={()=>{
                                Picker.init({
                                    pickerData: this.dateBlob,
                                    selectedValue: [0],
                                    pickerConfirmBtnText:'确认',
                                    pickerCancelBtnText:'取消',
                                    onPickerConfirm: data => {
                                        console.log(data);
                                    },
                                    onPickerSelect: data => {
                                        console.log(data);
                                    }
                                });
                                Picker.show();
                            }} lefTitle="借款期限" placeholder="请选择借款期限" imageSouce={require('../../../images/financeImages/celljiantou.png')}/>


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
                <AllNavigatior title='库融借款' backIconClick={()=>{
                    this.backPage();
                }}/>

            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {

        flex: 1,
        backgroundColor:PAGECOLOR.COLORA3,
    },
    scroller: {

        marginTop: 64,
        backgroundColor: PAGECOLOR.COLORA3,

        marginBottom:adapeSize(70)
    },

    lendInfo: {
        paddingTop: adapeSize(15),
        backgroundColor: PAGECOLOR.COLORA3
    },
    input: {

        paddingBottom: adapeSize(10),
        backgroundColor: PAGECOLOR.COLORA3
    },
    buttonStyle: {


        height: adapeSize(44),
        backgroundColor: '#05c5c2',
        marginLeft: adapeSize(15),
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: adapeSize(10),
        width: width - adapeSize(30),
        borderRadius:5,
    },
    textStyle: {

        fontSize: fontadapeSize(15),
        color: '#FFFFFF'
    }
})

