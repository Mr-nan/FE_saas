/**
 * Created by lhc on 2017/2/20.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    Dimensions,
    TouchableOpacity,
} from 'react-native';

import BaseComponent from '../../component/BaseComponent';

import {LendDatePike, LendInputItem, LendItem, CGDCarItem, CommenButton } from './component/ComponentBlob'
import {width, adapeSize} from './component/MethodComponent'
import CGDaddCarScenes from './CGDaddCarScenes';
import  AllNavigatior from '../../component/AllNavigationView'
import {ModalCGD} from './component/ModelComponent'
import DateTimePicker from 'react-native-modal-datetime-picker'
export  default  class CGDLendScenes extends BaseComponent {
    initFinish = () => {

    }

    constructor(props) {
        super(props);
        // 初始状态
        const ds = new ListView.DataSource(
            {
                getRowData: this.getRowData,
                getSectionHeaderData: this.getSectionData,
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
            }
        );
        //
        this.state = {
            dataSource: ds.cloneWithRowsAndSections(this.titleNameBlob),
            isDateTimePickerVisible: false,
            infoSouce: {
                date: '',
                monney: '',
                dateLimit: '',
                rate: '',
                paybackType: '',
                orderState: '',
                payDate: '',
                allMoney: '',
                people: '',
                carSource: [{name: "奥迪A7进口豪华型", state: '未还清', order: '201230123012301203', price: '12万'}]
            },
        }
    }
    titleNameBlob = {

        '0': [
            {title: '借款类型', key: 'type'},
            {title: '借款额度', key: 'money'},
            {title: '借款费率', key: 'rate'}
        ],
        '1': [

            {title: '用款金额', key: 'orderState'},
            {title: '用款时间', key: 'date'},
        ]
        ,
        '2': [
            {carName: '放款日期', key: 'payDate', price: '12万'},
            {carName: '放款日期', key: 'payDate', price: '12万'},
            {carName: '放款日期', key: 'payDate', price: '12万'},
            {carName: '放款日期', key: 'payDate', price: '12万'}
        ],
    }

    //datePiker的方法
    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false })
    //datePiker的回调
    _handleDatePicked = (date) => {
        let tempdate=dateFormat(date,'yyyy-MM-dd')
        this._hideDateTimePicker();
    }

    onPress = (changeText)=> {
        this.setState({ isDateTimePickerVisible: true });
    }

    getSectionData = (dataBlob, sectionID) => {

        return dataBlob[sectionID];
    }
    getRowData = (datatBlob, sectionId, rowId) => {

        return datatBlob[sectionId][rowId];
    }

    renderRow = (rowData, sectionID, rowID, highLght) => {

        if (sectionID === '0' && rowID === '0') {
            return (<LendDatePike
                ref={(type)=>{this.lendType=type}}
                lefTitle={rowData.title}
                placeholder='提档后采购贷'
                imageSouce={require('../../../images/financeImages/celljiantou.png')}
                imageStyle={{width:adapeSize(18),height:adapeSize(18)}}
                onPress={() => {
                    this.cgdAlert.setModelVisible(true);
                }
                }
            />)
        } else if (sectionID === '0' && rowID !== '0') {

            return (<LendItem leftTitle={rowData.title}/>)
        } else if (sectionID === '1' && rowID === '0') {

            return <LendInputItem placeholder={'请输入借款金额'} title={rowData.title}/>
        } else if (sectionID === '1' && rowID === '1') {

            return <LendDatePike lefTitle={rowData.title} placeholder='请选择用款时间'
                                 imageSouce={require('../../../images/financeImages/dateIcon.png')} onPress={this.onPress}/>
        } else {
            return (
                <CGDCarItem/>
            )
        }
    }
    renderSeparator = (sectionID, rowId, adjacentRowHighlighted) => {

        return (
            <View key={`${sectionID}-${rowId}`} style={{
                height: adjacentRowHighlighted ? 2 : 1,
                backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC'
            }}>

            </View>
        )
    }


    renderSectionHeader = (_, sectionId) => {

        if (sectionId !== '2') {

            return <View style={{height: 10, backgroundColor: '#f0eff5'}}></View>
        }

        return (
            <View style={{
                backgroundColor: '#f0eff5',
                flexDirection: 'row',
                height: 30,
                alignItems: 'center',
                paddingLeft: 15
            }}>
                <Text>采购车辆</Text>
            </View>

        )
    }
    navigatorParams={
        name:'CGDaddCarScenes',
        component:CGDaddCarScenes,
        params:{}
    }

    render() {
        return (

            <View style={{flex: 1,backgroundColor:'white'}}>

                <ListView
                    style={{marginBottom: adapeSize(62),marginTop:64}}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    renderSectionHeader={this.renderSectionHeader}
                    renderSeparator={this.renderSeparator}

                />

                <View style={styles.handelWarper}>

                    <CommenButton textStyle={styles.textLeft} buttonStyle={styles.buttonStyleRight} onPress={() => {
                     this.toNextPage(this.navigatorParams)
                    }} title="添加车辆"/>
                    <CommenButton textStyle={{color: 'white'}} buttonStyle={styles.buttonStyleLeft} onPress={() => {

                    }} title="取消借款"/>
                </View>
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker}
                    titleIOS="请选择日期"
                    confirmTextIOS='确定'
                    cancelTextIOS='取消'
                />
                <AllNavigatior title='采购融资' backIconClick={()=>{
                    this.backPage();
                }}/>

                <ModalCGD ref={(cgdModal)=>{this.cgdAlert=cgdModal}} getValue={(seleveValue)=>{

                    let string='提档后采购贷';
                    if (seleveValue==='2'){

                        string='提档前采购贷'
                    }
                  this.lendType.setPlaceHodel(string);

                }}/>

            </View>

        )
    }


}


const styles = StyleSheet.create({

    handelWarper: {
        height: adapeSize(50),
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: adapeSize(16),
        width: width,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    buttonStyleRight: {

        height: adapeSize(44),
        marginLeft: adapeSize(15),
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginRight: 5,
        borderColor: '#05c5c2',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: 'white',
        marginTop:10,

    },
    buttonStyleLeft: {

        height: adapeSize(44),
        backgroundColor: '#05c5c2',
        marginRight: adapeSize(15),
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginLeft: 5,
        borderRadius: 5,
        marginTop:10,
    },

    textLeft: {

        color: '#05c5c2'

    }
})