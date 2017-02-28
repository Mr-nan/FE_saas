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
import {width, adapeSize, fontadapeSize, PAGECOLOR,dateFormat,changeToMillion} from './component/MethodComponent';
import BaseComponent from '../../component/BaseComponent';
import  AllNavigatior from '../../component/AllNavigationView'
//校验完成
import DateTimePicker from 'react-native-modal-datetime-picker'
import {request} from '../../utils/RequestUtil'
import *as apis from '../../constant/appUrls'

const PostData={
    apply_type:'2',
    loan_mny:'',
    remark:'',
    use_time:''
}

let changeDate;

const imageSouce =require('../../../images/financeImages/dateIcon.png')

export default class SingelCarSence extends BaseComponent {

    initFinish() {

       this.getData();

    }

    getData = () => {
        let maps = {
            api: apis.get_apply_loan_data,
            apply_type:PostData.apply_type
        };
        request(apis.FINANCE, 'Post', maps)
            .then((response) => {

                let tempjson =response.mjson.data

                this.setState({
                    companyName:'北京大会上白有限公司',
                    lendType:tempjson.product_type,
                    dateLimit:tempjson.loan_life,
                    maxMoney:changeToMillion(tempjson.min_loanmny)+'-'+changeToMillion(tempjson.max_loanmny)+'万',
                    rate:tempjson.rate,
                })
                },
                (error) => {
                    this.props.showToast(error);
                });
    }



    state = {
        companyName: '',
        lendType: '',
        dateLimit: '',
        maxMoney:'',
        rate:'',
        isDateTimePickerVisible: false,
    }

    dataSourceBlob = [
        {title: '借款主体', key: 'companyName'},
        {title: '借款类型', key: 'lendType'},
        {title: '可借额度', key: 'dateLimit'},
        {title: '借款额度', key: 'maxMoney'}
    ];
    //datePiker的方法
    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false })
    //datePiker的回调
    _handleDatePicked = (date) => {
        let tempdate=dateFormat(date,'yyyy-MM-dd')
        changeDate(tempdate);
        PostData.use_time=tempdate;
        this._hideDateTimePicker();
    }
//日历按钮事件
    onPress = (changeText)=> {
        changeDate=changeText;
        this.setState({ isDateTimePickerVisible: true });
    }
//申请借款
    onClickLend = ()=> {

        for(temp in PostData){

           if(PostData[temp]===''){
              break;
           }
        }
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
                            <LendInputItem endEit={(event)=>{
                                PostData.loan_mny=event.nativeEvent.text;
                            }} title='金额' placeholder='请输入借款金额' unit='万'/>
                        </View>
                        <LendDatePike lefTitle={'用款时间'} placeholder={'选择用款时间'} imageSouce={imageSouce} onPress={this.onPress}/>
                        <LendUseful onEndEidt={(event)=>{PostData.remark =event.nativeEvent.text}}/>
                        <LendRate rate={this.state.rate}/>
                    </KeyboardAvoidingView>
                </ScrollView>
                <CommenButton
                    buttonStyle={styles.buttonStyle} textStyle={styles.textStyle} onPress={this.onClickLend} title='申请借款'/>
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                    titleIOS="请选择日期"
                    confirmTextIOS='确定'
                    cancelTextIOS='取消'
                />
                <AllNavigatior title='单车借款' backIconClick={()=>{
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
        paddingBottom:adapeSize(80)
    },

    lendInfo: {
        paddingTop: adapeSize(15),
        paddingBottom: adapeSize(10),
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
        bottom: adapeSize(16),
        width: width - adapeSize(30),
        borderRadius:5,
    },
    textStyle: {

        fontSize: fontadapeSize(15),
        color: '#FFFFFF'
    }
})

