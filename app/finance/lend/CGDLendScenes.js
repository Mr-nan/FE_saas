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
    archives_type:'1',
    use_time: '',
    isinvoice:'',
    isobd:'',
    loan_code:'',
    car_lists:''
}
const showData={
    maxMoney:'',
    rate:'',
    tempMin:'',
    tempMax:''
}
import BaseComponent from '../../component/BaseComponent';

import {LendDatePike, LendInputItem, LendItem, CGDCarItem, CommenButton,commnetStyle,} from './component/ComponentBlob'
import {width, adapeSize,PAGECOLOR,changeToMillion,getRowData,getSectionData,dateFormat,STATECODE} from './component/MethodComponent'
import CGDaddCarScenes from './CGDaddCarScenes';
import  AllNavigatior from '../../component/AllNavigationView'
import {ModalCGD} from './component/ModelComponent'
import DateTimePicker from 'react-native-modal-datetime-picker'
import {request} from '../../utils/RequestUtil'
import *as apis from '../../constant/appUrls'
import CGDAddCarScene from './CGDAddCarScene'
export  default  class CGDLendScenes extends BaseComponent {

    constructor(props) {
        super(props);
        // 初始状态
        const ds = new ListView.DataSource(
            {
                getRowData: getRowData,
                getSectionHeaderData: getSectionData,
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
            }
        );
        //
        this.state = {
            dataSource: ds.cloneWithRowsAndSections(this.titleNameBlob({},[])),
            isDateTimePickerVisible: false,
            renderPlaceholderOnly: STATECODE.loading
        }
    }


    initFinish() {
        this.getLendInfo();

    }
    getType=(state)=>{

        let  temp =Number.parseInt(state);

        return temp==1?'有':'无'
    }


    titleNameBlob = (jsonData, carData) => {

        let dataSource = {};
        let type=this.getType(this.props.isCarinvoice)+'手续'+this.getType(this.props.isOBD)+'OBD';

        dataSource['section1'] = [
            {title: '模式', value:type},
            {title: '借款额度', value: changeToMillion(jsonData.min_loanmny) + '-' + changeToMillion(jsonData.max_loanmny) + '万'},
            {title: '借款费率', value: jsonData.rate}
        ]
        dataSource['section2']=[
            {title: '用款金额', key: 'orderState'},
            {title: '用款时间', key: 'date'},
        ]

        if (carData.length > 0) {

            let tempCarDate = [];

            carData.map((item) => {

                tempCarDate.push(
                    {
                        auto_id: item.auto_id,
                        model_name: item.model_name,
                        state: item.status_str,
                        order: item.frame_number,
                        price: item.lend_mny,//放款额
                        plate_number: item.plate_number,//车牌号
                        loan_number: item.loan_number,
                    }
                )
            })
            dataSource['section3'] = [];
        }
        return dataSource;
    }


    getLendInfo=()=>{

            let maps = {
                api: apis.GET_APPLY_LOAN_DATA,
                apply_type:'5',
                archives_type:'1',
            };

            request(apis.FINANCE, 'Post', maps)
                .then((response) => {
                        let tempjson = response.mjson.data;
                            showData.tempMin=changeToMillion(tempjson.min_loanmny);
                        showData.tempMax=changeToMillion(tempjson.max_loanmny);

                        this.setState({
                            dataSource: this.state.dataSource.cloneWithRowsAndSections(this.titleNameBlob(tempjson, [])),
                            renderPlaceholderOnly: STATECODE.loadSuccess
                        })
                    },
                    (error) => {

                        this.setState({
                            renderPlaceholderOnly:STATECODE.loadError
                        })
                        if(error.mycode!= -300||error.mycode!= -500){
                            this.props.showToast(error.mjson.msg);

                        }else {

                            this.props.showToast('服务器连接有问题')
                        }
                    });


    }

    getCarListInfo=()=>{
        let maps = {
            api: apis.AUTOLIST,
        };
        request(apis.FINANCE, 'Post', maps)
            .then((response) => {
                    let tempjson = response.mjson.data;


                },
                (error) => {

                    this.setState({
                        renderPlaceholderOnly:STATECODE.loadError
                    })
                    if(error.mycode!= -300||error.mycode!= -500){
                        this.props.showToast(error.mjson.msg);

                    }else {

                        this.props.showToast('服务器连接有问题')
                    }
                });


    }

    //datePiker的方法
    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false })
    //datePiker的回调
    _handleDatePicked = (date) => {
        let tempdate=dateFormat(date,'yyyy-MM-dd')
        this.datePiker.changeText(tempdate);
        PostData.use_time=tempdate;
        this._hideDateTimePicker();
    }

    onPress = (changeText)=> {

        this.setState({ isDateTimePickerVisible: true });
    }


    renderRow = (rowData, sectionID, rowID, highLght) => {

        if (sectionID === 'section1') {

            return (<LendItem leftTitle={rowData.title} rightTitle={rowData.value}/>)
        } else if (sectionID === 'section2' && rowID === '0') {

            return <LendInputItem placeholder={'请输入借款金额'} title={rowData.title} onChangeText={(text)=>{PostData.loan_mny=text}}/>
        } else if (sectionID === 'section2' && rowID === '1') {

            return <LendDatePike ref={(piker)=>{this.datePiker =piker}} lefTitle={rowData.title} placeholder='请选择用款时间'
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
                backgroundColor: adjacentRowHighlighted ? PAGECOLOR.COLORA4 : '#CCCCCC'
            }}>
            </View>
        )
    }


    renderSectionHeader = (_, sectionId) => {

        if (sectionId !== 'section3') {

            return <View style={{height: adapeSize(15), backgroundColor: '#f0eff5'}}></View>
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

        if(this.state.renderPlaceholderOnly!==STATECODE.loadSuccess){
            return( <View style={styles.container}>
                {this.loadView()}
                <AllNavigatior title='采购融资' backIconClick={()=>{
                   this.backPage();
               }}/>

            </View>);
        }
        return (
            <View style={commnetStyle.container}>

               <View style={commnetStyle.ListWarp}>
                   <ListView
                       enableEmptySections={true}
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

                        this.navigatorParams.name = "CGDAddCarScene";
                        this.navigatorParams.component = CGDAddCarScene;
                        this.navigatorParams.params = {isOBD:this.props.isOBD,isCarinvoice:this.props.isCarinvoice};
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
            </View>

        )
    }


}


const styles = StyleSheet.create({
    container: {

        flex: 1,
        backgroundColor:PAGECOLOR.COLORA3,
    },
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