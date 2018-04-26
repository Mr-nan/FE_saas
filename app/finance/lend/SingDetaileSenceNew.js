/**
 * Created by lhc on 2017/2/17.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ListView,
    Text,
    TouchableOpacity
} from 'react-native';

import {
    CommnetListItem,
    LendCarItemCell,
    CommenButtonNew,
    CommenButton,
    commnetStyle,
    ComentImageButton
} from './component/ComponentBlob'
import {
    width,
    height,
    fontadapeSize,
    adapeSize,
    STATECODE,
    PAGECOLOR,
    getRowData,
    getSectionData,
    changeToMillion
} from './component/MethodComponent'
import {ModifyBorrowing, LendSuccessAlert, ModalAlert} from './component/ModelComponent'
import  OrderCarDetailScene from './OrderCarDetailScene'
import  AllNavigationView from '../../component/AllNavigationView';
import BaseComponent from '../../component/BaseComponent';
import {request} from '../../utils/RequestUtil'
import *as apis from '../../constant/appUrls'
import ContractInfoScene from './ContractInfoScene';
import RecognizedGains from '../../login/RecognizedGains';


const controlCode = {
    stateCode: '',
    extendCode: '',
    lendType: '',
    maxLend: '',
    minLend: '',
    changeMoney: '',
    loan_code: '',
    is_microchinese_contract: ''
}


export  default  class SingDetaileSenceNew extends BaseComponent {

    // 构造
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
        )
        this.state = {
            dataSource: ds.cloneWithRowsAndSections(this.titleNameBlob({}, [])),
            renderPlaceholderOnly: STATECODE.loading
        }
    }

    initFinish() {
        this.getLendinfo();
    }

    //借款信息
    getLendinfo = () => {
        let maps = {
            api: apis.GET_APPLY_INFO,
            loan_code: this.props.loanNumber
        };
        request(apis.FINANCE, 'Post', maps)
            .then((response) => {
                    // this.tempjson = response.mjson.data
                    this.tempjson = {
                        "token": "",
                        "code": 1,
                        "msg": "ok",
                        "data": {
                            "request": {
                                "device_code": "dycd_platform_finance_pc",
                                "user_ip": "1"
                            },
                            "response": {
                                "payment_number": "201709250019",
                                "product_type_code": {
                                    "product_type": "库存融资",
                                    "product_code": 4
                                },
                                "merge_id": "2789",
                                "loanperiod": "30",
                                "loanmny": "3",
                                "loanperiod_type": "天",
                                "rate": "22",
                                "payment_bankaccount": "6211 1111 1111 1111 111",
                                "payment_bankusername": "王芳",
                                "payment_bankname": "招商",
                                "payment_branch": "北京",
                                "paymenttype": "随借随还",
                                "loan_time": "1970-01-01",
                                "loantype": "131",
                                "trenchtype": "1961",
                                "lending_methods": "账户体系放款",
                                "cancle_time": "1970-01-01",
                                "logic_status": "70",
                                "is_cancel_loan": 0,
                                "is_sign_contract": 0,
                                "is_confirm_iou": 0,
                                "account": {
                                    "payment_bankaccount": "85121001012280150600000027",
                                    "payment_bankusername": "桃树",
                                    "payment_bankname": "恒丰银行股份有限公司北京分行长安街支行",
                                    "payment_branch": "恒丰银行股份有限公司重庆永川支行"
                                },
                                "finish_time": "1970-01-01"
                            }
                        }
                    }

                    let code =  this.tempjson.data.response.logic_status;
                    // controlCode.stateCode =  this.tempjson.data.response.logic_status;
                    // controlCode.extendCode = this.tempjson.is_extend;  查看合同
                    // controlCode.lendType = this.tempjson.type;
                    // controlCode.minLend = changeToMillion(this.tempjson.min_loanmny);
                    // controlCode.loan_code = this.tempjson.loan_code;
                    // controlCode.is_microchinese_contract = this.tempjson.is_microchinese_contract;
                    // let Maxmum = parseFloat(this.tempjson.max_loanmny) + parseFloat(this.tempjson.payment_loanmny)
                    // controlCode.maxLend = changeToMillion(Maxmum)
                    if (code != 10 && code != 20 && code != 0) {
                        this.getOrderCarInfo()
                    } else {
                        this.setState({
                            dataSource: this.state.dataSource.cloneWithRowsAndSections([]),
                            renderPlaceholderOnly: STATECODE.loadSuccess
                        })
                    }
                }, (error) => {
                    this.setState({
                        renderPlaceholderOnly: STATECODE.loadError
                    })
                    if (error.mycode == -300 || error.mycode == -500) {
                        this.props.showToast('服务器连接有问题')
                    } else {
                        this.props.showToast(error.mjson.msg);
                    }
                });
    }

    //车辆信息
    getOrderCarInfo = () => {
        let maps = {
            api: apis.GET_APPLY_CARLIST,
            loan_code: this.props.loanNumber
        }
        request(apis.FINANCE, 'Post', maps)
            .then((response) => {
                    // let tempCarJson = response.mjson.data.list
                    let xxx = {
                        "token": "",
                        "code": 1,
                        "msg": "ok",
                        "data": {
                            "request": {
                                "device_code": "dycd_platform_finance_pc",
                                "user_ip": "1",
                                "payment_number": 201710180010
                            },
                            "response": [
                                {
                                    "model_name": "2017款 宝马5系 535Li 行政型 豪华设计套装",
                                    "frame_number": "43434343233346666",
                                    "loan_number": "20171018001002",
                                    "loan_mny": "17000.00",
                                    "loan_time": "2017-09-01",
                                    "assess_time": "2017-10-18",
                                    "assess_user_name": "admin",
                                    "plate_number": "0",
                                    "hq_assess_mny": 3.5,
                                    "storage": "工行烫晚祁有限公司",
                                    "lending_methods": "线下放款",
                                    "channel_name": null,
                                    "finish_time": null,
                                    "child_loan_status": 30,
                                    "child_loan_status_str": "渠道审核中",
                                    "is_confirm_iou": 1,
                                    "is_sign_contract": 1,
                                    "is_cancel_loan": 1
                                },
                                {
                                    "model_name": "2017款 奥迪A6L TFSI 技术型",
                                    "frame_number": "34343434444555555",
                                    "loan_number": "20171018001001",
                                    "loan_mny": "24000.00",
                                    "loan_time": "2017-09-01",
                                    "assess_time": "2017-10-18",
                                    "assess_user_name": "admin",
                                    "plate_number": "0",
                                    "hq_assess_mny": 3,
                                    "storage": "工行烫晚祁有限公司",
                                    "lending_methods": "线下放款",
                                    "channel_name": null,
                                    "finish_time": null,
                                    "child_loan_status": 30,
                                    "child_loan_status_str": "渠道审核中",
                                    "is_confirm_iou": 1,
                                    "is_sign_contract": 1,
                                    "is_cancel_loan": 1
                                },
                                {
                                    "model_name": "2017款 宝马5系 535Li 行政型 豪华设计套装",
                                    "frame_number": "43434343233346666",
                                    "loan_number": "20171018001002",
                                    "loan_mny": "17000.00",
                                    "loan_time": "2017-09-01",
                                    "assess_time": "2017-10-18",
                                    "assess_user_name": "admin",
                                    "plate_number": "0",
                                    "hq_assess_mny": 3.5,
                                    "storage": "工行烫晚祁有限公司",
                                    "lending_methods": "线下放款",
                                    "channel_name": null,
                                    "finish_time": null,
                                    "child_loan_status": 30,
                                    "child_loan_status_str": "渠道审核中",
                                    "is_confirm_iou": 1,
                                    "is_sign_contract": 1,
                                    "is_cancel_loan": 1
                                },

                            ]
                        }
                    }
                    let tempCarJson = xxx.data.response

                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRowsAndSections(this.titleNameBlob(tempCarJson)),
                        renderPlaceholderOnly: STATECODE.loadSuccess
                    })
                }, (error) => {
                    this.setState({
                        renderPlaceholderOnly: STATECODE.loadError
                    })
                    if (error.mycode == -300 || error.mycode == -500) {
                        this.props.showToast('服务器连接有问题')
                    } else {
                        this.props.showToast(error.mjson.msg);
                    }
                });
    }

    // 数据初始化方法
    titleNameBlob = ( carData) => {
        let dataSource = {};
        if (carData.length > 0) {
            let tempCarDate = [];
            carData.map((item) => {
                tempCarDate.push(item)
            })
            dataSource['section2'] = tempCarDate;
        }
        return dataSource;
    }


    getControlTitleblob = (stateCode) => {
        if (stateCode !== '') {
            let tempTitle = []
            if (stateCode == '10') {
                tempTitle = ['评估监管中']
            } else if (stateCode == '20') {
                tempTitle = ['审核中']
            } else if (stateCode == '30') {
                // tempTitle = ['渠道审核中']
                tempTitle = ['取消借款']
            }else if (stateCode == '40') {
                // tempTitle = ['待签合同']
                tempTitle = ['取消借款','待签合同']
            }else if (stateCode == '50') {
                // tempTitle = ['待确认借据']
                tempTitle = ['确认借据']
            }else if (stateCode == '60') {
                // tempTitle = ['处理中']
                tempTitle = ['查看合同']
            }else if (stateCode == '70') {
                // tempTitle = ['已放款']
                tempTitle = ['查看合同']
            }else if (stateCode == '80') {
                // tempTitle = ['已还清']
                tempTitle = ['查看合同']
            }else if (stateCode == '21') {
                // tempTitle = ['审核未通过']
            }else if (stateCode == '0') {
                // tempTitle = ['已取消']
            }
            return tempTitle;
        }
    }

    getButtonStyleWithTitle = (title) => {

        switch (title) {

            case '取消借款':
                return styles.cancelButton
            case '签署合同':
                return styles.controlButton
            case '查看合同':
                return styles.cancelButton
            case '已取消借款':
                return styles.canceledButton
            case '签署微单合同':
                return styles.controlButton
            case '资金方签署中':
                return styles.cancelButton
            default:
                return styles.cancelButton
        }

    }

    //取消借款
    cancleLoad = (setModelVis) => {
        setModelVis(false);
        this.props.showModal(true);
        let maps = {
            api: apis.CANCEL_LOAN,
            loan_code: this.props.loanNumber
        }
        request(apis.FINANCE, 'Post', maps)
            .then((response) => {
                    this.props.showModal(false);
                    this.successCancle.setModelVisible(true)
                }, (error) => {
                    this.props.showModal(false);
                    if (error.mycode == -300 || error.mycode == -500) {
                        this.props.showToast('服务器连接有问题')
                    } else {
                        this.props.showToast(error.mjson.msg);
                    }
                });
    }

    controsButtonClick = (title) => {

        if (title === '取消借款') {
            this.canleAlert.setModelVisible(true);
        } else if (title === '签署合同') {
            this.toNextPage({
                name: 'ContractInfoScene',
                component: ContractInfoScene,
                params: {
                    loan_code: this.props.loanNumber, showButton: true, callbackfresh: () => {
                        this.initFinish();
                        this.props.backRefresh();
                    }
                }
            });
        } else if (title === '查看合同') {
            this.toNextPage({
                name: 'ContractInfoScene',
                component: ContractInfoScene,
                params: {loan_code: this.props.loanNumber, showButton: false}
            });
        } else if (title === '资金方签署中') {
            this.toNextPage({
                name: 'ContractInfoScene',
                component: ContractInfoScene,
                params: {loan_code: this.props.loanNumber, showButton: false}
            });
        } else if (title === "签署微单合同") {
            this.toNextPage({
                name: 'RecognizedGains', component: RecognizedGains, params: {
                    loan_code: controlCode.loan_code,
                    loan_number: '',
                    isShow: true,
                    callBack: () => {
                        this.setState({
                            renderPlaceholderOnly: 'loading'
                        });
                        this.getLendinfo();
                    }
                }
            });
        }
    }

    modifyLengNum = (callback) => {
        if (controlCode.changeMoney !== '') {
            let maps = {
                api: apis.SET_APPLY_MNY,
                loan_code: this.props.loanNumber,
                loan_mny: controlCode.changeMoney,
            };
            callback(false);
            this.props.showModal(true);
            request(apis.FINANCE, 'Post', maps)
                .then((response) => {
                        this.props.showModal(false);
                        this.change.setModelVisible(true)
                    }, (error) => {
                        this.props.showModal(false);
                        if (error.mycode != -300 || error.mycode != -500) {

                            this.props.showToast(error.mjson.msg);
                        } else {

                            this.props.showToast('服务器连接有问题')
                        }
                    });

        } else {
            this.props.showToast('请输入借款金额')
        }
    }

    getCarInfo = (rowData) => {
        let navigatorParams = {
            name: 'OrderCarDetailScene',
            component: OrderCarDetailScene,
            params: {
                auto_id: rowData.auto_id,
                type: '2'
            }
        }
        this.toNextPage(navigatorParams);
    }

    renderHeader = () => {
        return (
            <View style={{flexDirection:'column',backgroundColor:"#ffffff"}}>
                <View style={{flexDirection:'row'}}>
                    <Text style={{flex:1}}>{this.tempjson.data.response.payment_number}</Text>
                    <Text style={{}}>{this.tempjson.data.response.paymenttype}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <View style={{flexDirection:'column',flex:1,alignItems:"center"}}>
                        <Text>{this.tempjson.data.response.loanmny + '万元'}</Text>
                        <Text>借款金额</Text>
                    </View>
                    <View style={{flexDirection:'column',flex:1,alignItems:"center"}}>
                        <Text> {this.tempjson.data.response.rate +"%"}</Text>
                        <Text>综合费率</Text>
                    </View>
                    <View style={{flexDirection:'column',flex:1,alignItems:"center"}}>
                        <Text>{this.tempjson.data.response.loanperiod +'天'}</Text>
                        <Text>借款期限</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={{flex:1}}>申请日期</Text>
                    <Text>{this.tempjson.data.response.loan_time}</Text>
                </View>
                <Text style={{}}>{'资金渠道正在对您的借款进行审核，请耐心等待。'}</Text>
            </View>
        )
    }

    renderRow = (rowData, sectionID, rowId, highlightRow) => {
        let tempButtons = [];
        let tempButtonTitles = this.getControlTitleblob(rowData.child_loan_status);
        tempButtonTitles.map((item) => {
                tempButtons.push(<CommenButtonNew buttonStyle={this.getButtonStyleWithTitle(item)}
                                               textStyle={styles.buttontextStyle}
                                               onPress={()=>{this.controsButtonClick(item)}}
                                               title={item}
                                               key={item}
                />)
            }
        )
        return <View style={{flexDirection:'column',backgroundColor:'#ffffff'}}>
                <View style={{flexDirection:'row'}}>
                    <Text style={{flex:1}}>{rowData.model_name}</Text>
                    <Text>{rowData.frame_number}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={{flex:1}}>{rowData.loan_number}</Text>
                    <Text>{rowData.child_loan_status_str}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={{flex:1}}>{'合同放款额度'}</Text>
                    <Text>{rowData.loan_mny}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={{flex:1}}>{'放款日期'}</Text>
                    <Text>{rowData.assess_time}</Text>
                </View>
                <View style={[{flexDirection: 'row',justifyContent: 'flex-end',alignItems: 'center',paddingTop:10,paddingBottom:10}]}>
                        {tempButtons}
                </View>
        </View>
    }

    renderFooter = () => {
        return (
            <View style={{flexDirection:'column',height:40}}>

            </View>
        )
    }

    renderSectionHeader = (sectionData, sectionID) => {
        return (
            <View style={[sectionID != 'section1' && {backgroundColor:PAGECOLOR.COLORA3, height: 10}]}></View>
        )
    }

    renderSeparator = (sectionID, rowId, adjacentRowHighlighted) => {
        return (
            <View key={`${sectionID}-${rowId}`}
                  style={{height:10, backgroundColor:PAGECOLOR.COLORA3}}></View>
        )
    }

    render() {
        if (this.state.renderPlaceholderOnly !== STATECODE.loadSuccess) {
            return (
                <View style={styles.container}>
                    {this.loadView()}
                    <AllNavigationView title='借款详情' backIconClick={()=> {
                        this.backPage();
                    }}/>
                </View>);
        }

        return (
            <View style={commnetStyle.container}>
                <ListView
                    removeClippedSubviews={false}
                    style={[commnetStyle.ListWarp,{bottom: 0}]}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    renderHeader={this.renderHeader}
                    renderSectionHeader={this.renderSectionHeader}
                    renderSeparator={this.renderSeparator}
                    renderFooter={this.renderFooter}
                />
                <ModifyBorrowing ref={(model)=>{this.modifyb=model}}
                                 onchangeText={(text)=>{controlCode.changeMoney=text}}
                                 minLend={controlCode.minLend}
                                 maxLend={controlCode.maxLend}
                                 confimClick={this.modifyLengNum}
                                 cancleClick={(callback)=>{callback(false)}}/>

                <LendSuccessAlert ref={(lend)=>{this.change=lend}} confimClick={()=>{
                    this.props.backRefresh();
                    this.backPage()}} title='修改成功' subtitle='恭喜您修改借款成功'/>
                <ModalAlert title='取消借款' subtitle="您确定要取消借款吗" ref={(cancle)=>{this.canleAlert=cancle}}
                            confimClick={this.cancleLoad} cancleClick={(setmodilVis)=>{setmodilVis(false)}}/>
                <LendSuccessAlert ref={(canleS)=>{this.successCancle=canleS}} confimClick={()=>{
                    this.props.backRefresh();
                    this.backPage()}} title='取消成功' subtitle='取消借款成功'/>
                <AllNavigationView
                    title="借款详情"
                    backIconClick={this.backPage}
                    renderRihtFootView={()=>{
                        if(controlCode.stateCode==='1'){
                            return (<ComentImageButton btnStyle={styles.imageButton} ImgSource={require('../../../images/financeImages/modif.png')}
                                                       onPress={()=>{this.modifyb.setModelVisible(true)}}/>)
                        }else {
                            return null;
                        }}}/>

                    {
                        this.tempjson.data.response.logic_status == 10?
                            <TouchableOpacity  style={{height:40,width:width,position: 'absolute',bottom: 0,justifyContent:'center',alignItems:'center',backgroundColor:'#05c5c2'}}
                                           onPress={()=>{alert("取消借款")}}>
                                <Text style={{}}>取消借款</Text>
                            </TouchableOpacity>:null
                    }
                    {
                        this.tempjson.data.response.is_sign_contract == 1?
                            <TouchableOpacity style={{height:40,width:width,position: 'absolute',bottom: 0,justifyContent:'center',alignItems:'center',backgroundColor:'#05c5c2'}}
                                              onPress={()=>{alert("批量签署")}}>
                                <Text style={{}}>批量签署</Text>
                            </TouchableOpacity>:null
                    }

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: PAGECOLOR.COLORA3
    }, buttonStyle: {
        height: adapeSize(44),
        backgroundColor: '#05c5c2',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: adapeSize(1),
        width: width,
    }, textStyle: {
        fontSize: fontadapeSize(15),
        color: '#FFFFFF'
    }, imageButton: {
        width: 25,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10
    }, cancelButton: {
        flex: 1,
        backgroundColor: PAGECOLOR.COLORA2,
        justifyContent: 'center',
        alignItems: 'center'
    }, canceledButton: {
        flex: 1,
        backgroundColor: PAGECOLOR.COLORA1,
        justifyContent: 'center',
        alignItems: 'center'
    }, controlButton: {
        flex: 1,
        backgroundColor: PAGECOLOR.COLORB0,
        justifyContent: 'center',
        alignItems: 'center'
    }, buttontextStyle: {
        fontSize: fontadapeSize(15),
        color: 'white',
    }
});


