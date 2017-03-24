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

const PostData = {
    apply_type: '5',
    loan_mny: '',
    archives_type:'2',
    remark: '',
    use_time: '',
    loan_life:''
}
import BaseComponent from '../../component/BaseComponent';

import {LendDatePike, LendInputItem, LendItem, CGDCarItem, CommenButton,commnetStyle,} from './component/ComponentBlob'
import {width, adapeSize,PAGECOLOR,changeToMillion} from './component/MethodComponent'
import CGDaddCarScenes from './CGDaddCarScenes';
import  AllNavigatior from '../../component/AllNavigationView'
import {ModalCGD} from './component/ModelComponent'
import DateTimePicker from 'react-native-modal-datetime-picker'
import {request} from '../../utils/RequestUtil'
import *as apis from '../../constant/appUrls'
export  default  class CGDLendScenes extends BaseComponent {

    initFinish() {

        this.getData();

    }
    getData = () => {
        let maps = {
            api: apis.GET_APPLY_LOAN_DATA,
            apply_type:PostData.apply_type,
            archives_type:PostData.archives_type,
        };
        request(apis.FINANCE, 'Post', maps)
            .then((response) => {

                    let tempjson =response.mjson.data
                    let tempDataSource={}
                     Object.assign(tempDataSource,this.titleNameBlob);
                       tempDataSource['0']=[
                           {title: '借款类型', value: ''},
                           {title: '借款额度', value: changeToMillion(tempjson.min_loanmny)+'-'+changeToMillion(tempjson.max_loanmny)+'万'},
                           {title: '借款费率', value: tempjson.rate}
                       ]
                       this.setState({

                        dataSource:this.state.dataSource.cloneWithRowsAndSections(tempDataSource)
                    })
                },
                (error) => {

                });


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
        }
    }
    titleNameBlob = {

        '0': [
            {title: '借款类型', value: ''},
            {title: '借款额度', value: '222'},
            {title: '借款费率', value: '333'}
        ],
        '1': [

            {title: '用款金额', key: 'orderState'},
            {title: '用款时间', key: 'date'},
        ]
        ,
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

            return (<LendItem leftTitle={rowData.title} rightTitle={rowData.value}/>)
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
                height: adjacentRowHighlighted ? 1 : 1,
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
            <View style={styles.section}>
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

            <View style={commnetStyle.container}>

               <View style={commnetStyle.ListWarp}>
                   <ListView
                       style={{flex:1}}
                       dataSource={this.state.dataSource}
                       renderRow={this.renderRow}
                       renderSectionHeader={this.renderSectionHeader}
                       renderSeparator={this.renderSeparator}
                   />
               </View>
                <View style={[commnetStyle.bottomWarp,{flexDirection:'row', justifyContent: 'flex-end',
                    alignItems: 'center'}]}>

                    <CommenButton textStyle={styles.textLeft} buttonStyle={styles.buttonStyleRight} onPress={() => {
                     this.toNextPage(this.navigatorParams)
                    }} title="添加车辆"/>
                    <CommenButton textStyle={{color: 'white'}} buttonStyle={styles.buttonStyleLeft} onPress={() => {

                    }} title="申请借款"/>
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
                    if (seleveValue==='1'){

                        string='提档前采购贷'
                    }
                  PostData.archives_type=seleveValue;
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

    },
    buttonStyleRight: {

        height: adapeSize(32),
        marginLeft: adapeSize(15),
        justifyContent: 'center',
        width:adapeSize(100),
        alignItems: 'center',
        marginRight: 5,
        borderColor: PAGECOLOR.COLORB0,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: 'white',
        width:adapeSize(100)
    },
    buttonStyleLeft: {

        height: adapeSize(32),
        backgroundColor: PAGECOLOR.COLORB0,
        marginRight: adapeSize(15),
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
        borderRadius: 5,
        width:adapeSize(100)
    },

    textLeft: {

        color: '#05c5c2'

    },
    section:{

        backgroundColor: '#f0eff5',
        flexDirection: 'row',
        height: 30,
        alignItems: 'center',
        paddingLeft: 15
    }


})