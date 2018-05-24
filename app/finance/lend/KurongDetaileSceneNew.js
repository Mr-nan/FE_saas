/**
 * Created by lhc on 2017/2/17.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ListView,
    Text,
    TouchableOpacity,
    Image,
    PixelRatio
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
import {ModifyBorrowing, ModifyBorrowingNew, LendSuccessAlert, ModalAlert, MMSModalAlert} from './component/ModelComponent'
import  OrderCarDetailSceneNew from './OrderCarDetailSceneNew'
import  AllNavigationView from '../../component/AllNavigationView';
import BaseComponent from '../../component/BaseComponent';
import {request} from '../../utils/RequestUtil'
import *as apis from '../../constant/appUrls'
import ContractInfoScene from './ContractInfoScene';
import ContractInfoSceneChildren from './ContractInfoSceneChildren';
import RecognizedGains from '../../login/RecognizedGains';
var onePT = 1 / PixelRatio.get(); //一个像素
import  PixelUtil from '../../utils/PixelUtil';
let Pixel = new PixelUtil();

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


export  default  class KurongDetaileSceneNew extends BaseComponent {

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
            api: apis.GET_APPLY_INFO_NEW,
            payment_number: this.props.loanNumber,
        };
        request(apis.FINANCE, 'Post', maps)
            .then((response) => {
                this.tempjson = response.mjson.data
                this.stateCode =  this.tempjson.logic_status;
                this.minLend =  changeToMillion(this.tempjson.min_loanmny);
                this.maxLend = changeToMillion(this.tempjson.max_loanmny);
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRowsAndSections(this.titleNameBlob([ this.tempjson])),
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

    //取消借款  子单
    cancleLoadC = (imgSid,code) => {
        this.props.showModal(true);
        let maps = {
            api: apis.CANCEL_CHILD_LOAN,
            payment_number : this.props.loanNumber, //主单号
            loan_number :this.loan_number,
            img_sid : imgSid,
            img_code : code,
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

    //取消借款  主单
    cancleLoad = (imgSid,code) => {
        this.props.showModal(true);
        let maps = {
            api: apis.CANCEL_LOAN,
            loan_code: this.props.loanNumber,
            img_sid : imgSid,
            img_code : code,
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
            name: 'OrderCarDetailSceneNew',
            component: OrderCarDetailSceneNew,
            params: {
                rowData: rowData,
                type: '2'
            }
        }
        this.toNextPage(navigatorParams);
    }

    renderHeader = () => {
        return (
            <View style={{flexDirection:'column',backgroundColor:"#ffffff"}}>
                <View style={{flexDirection:'row',paddingLeft:adapeSize(15),paddingRight:adapeSize(15),paddingTop:adapeSize(10),paddingBottom:adapeSize(10),alignItems:'center'}}>
                    <Text style={{backgroundColor:Pixel.getProductColor(this.tempjson.product_type_code.product_code),color:'#ffffff',fontSize:adapeSize(12),borderRadius:adapeSize(1),height:adapeSize(16),width:Pixel.getPixel(22),textAlign:'center'}}>
                        {Pixel.getProductStr(this.tempjson.product_type_code.product_code)}
                    </Text>
                    <Text style={{flex:1,fontSize:adapeSize(14),marginLeft:adapeSize(5)}}>{ this.tempjson.payment_number}</Text>
                    <Text style={{fontSize:adapeSize(14),color:Pixel.getStatusColor(this.stateCode)[0]}}>{Pixel.getStatusStr(this.stateCode)}</Text>
                </View>
                <View style={{width:width,height:onePT,backgroundColor:'#D8D8D8'}}/>
                <View style={{flexDirection:'row',paddingLeft:adapeSize(15),paddingRight:adapeSize(15),paddingTop:adapeSize(10),paddingBottom:adapeSize(10)}}>
                    <View style={{flexDirection:'column',flex:1,alignItems:"flex-start"}}>
                        <Text style={{fontSize:adapeSize(20),color:"#FA5741"}}>{parseFloat(this.tempjson.loanmny) == '0'? '- -':parseFloat(this.tempjson.loanmny)}
                            {
                                parseFloat(this.tempjson.loanmny) != '0' && <Text style={{fontSize:adapeSize(12)}}>万</Text>
                            }
                        </Text>
                        <Text style={{fontSize:adapeSize(12),color:"#9E9E9E"}}>借款金额</Text>
                    </View>
                    <View style={{flexDirection:'column',flex:1,alignItems:"center"}}>
                        <Text style={{fontSize:adapeSize(20),color:"#000000"}}>{this.tempjson.loanperiod}<Text style={{fontSize:adapeSize(12)}}>天</Text></Text>
                        <Text style={{fontSize:adapeSize(12),color:"#9E9E9E"}}>借款期限</Text>
                    </View>
                    <View style={{flexDirection:'column',flex:1,alignItems:"flex-end"}}>
                        <Text style={{fontSize:adapeSize(20),color:"#000000"}}> {parseFloat(this.tempjson.rate)}<Text style={{fontSize:adapeSize(12)}}>%</Text></Text>
                        <Text style={{fontSize:adapeSize(12),color:"#9E9E9E"}}>综合费率</Text>
                    </View>
                </View>
                <View style={{width:width-adapeSize(10),height:onePT,backgroundColor:'#F0EFF5',marginLeft:adapeSize(5),marginRight:adapeSize(5)}}/>
                <View style={{flexDirection:'row',paddingLeft:adapeSize(15),paddingRight:adapeSize(15),paddingTop:adapeSize(10),paddingBottom:adapeSize(10)}}>
                    <Text style={{fontSize:adapeSize(13),color:"#9E9E9E"}}>{this.tempjson.paymenttype}</Text>
                </View>
            </View>
        )
    }

    renderRow = (rowData, sectionID, rowId, highlightRow) => {
        return <View style={{flexDirection:'column',backgroundColor:'#ffffff'}}>
            <View style={{flexDirection:"column",paddingLeft:adapeSize(15),paddingRight:adapeSize(15),paddingTop:adapeSize(15),paddingBottom:adapeSize(15)}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Text style={{fontSize:adapeSize(14),color:'#000000',width:adapeSize(130)}}>{rowData.loan_time}</Text>
                    <Text style={{fontSize:adapeSize(14),color:'#000000',width:adapeSize(130)}}>{this.stateCode == 0?rowData.loan_time:rowData.repayment_loan_time}</Text>
                    <Text style={{fontSize:adapeSize(14),color:'#000000'}}>{rowData.lending_methods}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:adapeSize(12),color:'#9E9E9E',width:adapeSize(130)}}>{'申请日期'}</Text>
                    <Text style={{fontSize:adapeSize(12),color:'#9E9E9E',width:adapeSize(130)}}>{this.stateCode == 0?'取消日期':'放款日期'}</Text>
                    <Text style={{fontSize:adapeSize(12),color:'#9E9E9E'}}>{'借款类型'}</Text>
                </View>
            </View>
            {
                this.stateCode == 70 &&
                    <View style={{flexDirection:"column",paddingTop:adapeSize(0),paddingBottom:adapeSize(15)}}>
                        <View style={{width:width,height:adapeSize(10),backgroundColor:'#f0eff5',marginBottom:adapeSize(15)}}/>
                        <View style={{flexDirection:'row',alignItems:'center',paddingLeft:adapeSize(10),paddingRight:adapeSize(10)}}>
                            <Text style={{fontSize:adapeSize(14),color:'#000000',width:adapeSize(130)}}>{rowData.channel_name}</Text>
                            <Text style={{fontSize:adapeSize(14),color:'#000000',width:adapeSize(130)}}>{rowData.lending_methods}</Text>
                        </View>
                        <View style={{flexDirection:'row',paddingLeft:adapeSize(10),paddingRight:adapeSize(10)}}>
                            <Text style={{fontSize:adapeSize(12),color:'#9E9E9E',width:adapeSize(130)}}>{'资金渠道'}</Text>
                            <Text style={{fontSize:adapeSize(12),color:'#9E9E9E',width:adapeSize(130)}}>{'放款方式'}</Text>
                        </View>
                    </View>
            }
            {
                this.stateCode == 80 &&
                    <View style={{flexDirection:"column",paddingTop:adapeSize(0),paddingBottom:adapeSize(15)}}>
                        <View style={{width:width,height:adapeSize(10),backgroundColor:'#f0eff5',marginBottom:adapeSize(15)}}/>
                        <View style={{flexDirection:'row',alignItems:'center',paddingLeft:adapeSize(10),paddingRight:adapeSize(10)}}>
                            <Text style={{fontSize:adapeSize(14),color:'#000000',width:adapeSize(130)}}>{rowData.channel_name}</Text>
                            <Text style={{fontSize:adapeSize(14),color:'#000000',width:adapeSize(130)}}>{rowData.lending_methods}</Text>
                            <Text style={{fontSize:adapeSize(14),color:'#000000',width:adapeSize(130)}}>{rowData.finish_time}</Text>
                        </View>
                        <View style={{flexDirection:'row',paddingLeft:adapeSize(10),paddingRight:adapeSize(10)}}>
                            <Text style={{fontSize:adapeSize(12),color:'#9E9E9E',width:adapeSize(130)}}>{'资金渠道'}</Text>
                            <Text style={{fontSize:adapeSize(12),color:'#9E9E9E',width:adapeSize(130)}}>{'放款方式'}</Text>
                            <Text style={{fontSize:adapeSize(12),color:'#9E9E9E',width:adapeSize(130)}}>{'结清日期'}</Text>
                        </View>
                    </View>
            }
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
            <View key={`${sectionID}-${rowId}`} style={{height:10, backgroundColor:PAGECOLOR.COLORA3}}></View>
        )
    }

    render() {
        if (this.state.renderPlaceholderOnly !== STATECODE.loadSuccess) {
            return (
                <View style={styles.container}>
                    {this.loadView()}
                    <AllNavigationView title='借款详情' backIconClick={()=> { this.backPage(); }}/>
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
                <ModifyBorrowingNew ref={(model)=>{this.modifyb=model}}
                                    onchangeText={(text)=>{controlCode.changeMoney=text}}
                                    minLend={this.minLend}
                                    maxLend={this.maxLend}
                                    confimClick={this.modifyLengNum}
                                    cancleClick={(callback)=>{callback(false)}}/>

                <LendSuccessAlert ref={(lend)=>{this.change=lend}}
                                  confimClick={()=>{
                                      this.props.backRefresh();
                                      this.getLendinfo();
                                  }}
                                  title='修改成功' subtitle='恭喜您修改借款成功'/>

                <ModalAlert title='' subtitle="您确定要取消借款吗？"
                            ref={(cancle)=>{this.canleAlert = cancle}}
                            confimClick={(setmodilVis)=>{
                                   setmodilVis(false)
                                   this.MMScanleAlert.setModelVisible(true);
                               }}
                            cancleClick={(setmodilVis)=>{setmodilVis(false)}}/>

                <MMSModalAlert ref={(cancle)=>{this.MMScanleAlert = cancle}}
                               confimClick={(setModelVis,imgSid,code)=>{
                                   setModelVis(false);
                                   if(this.cancleFlag =='取消主单'){
                                        this.cancleLoad(imgSid,code)
                                   } else {
                                        this.cancleLoadC(imgSid,code)
                                   }
                               }}
                               cancleClick={(setmodilVis)=>{setmodilVis(false)}}/>

                <LendSuccessAlert ref={(canleS)=>{this.successCancle=canleS}}
                                  confimClick={()=>{
                                      this.props.backRefresh();
                                      if(this.cancleFlag == '取消主单'){
                                        this.backPage()
                                      }else {
                                        this.getLendinfo()
                                      }
                                  }}
                                  title='取消成功' subtitle='取消借款成功'/>

                <AllNavigationView
                    title="借款详情"
                    backIconClick={this.backPage}/>
                <View style={{position: 'absolute',bottom: 0,justifyContent:'center',alignItems:'center',flexDirection:'row',width:width}}>
                    {
                        this.tempjson.is_cancel_loan == 1?
                            <TouchableOpacity  style={{height:40,flex:1,backgroundColor:'#90A1B5',justifyContent:'center',alignItems:'center'}}
                                               onPress={()=>{
                                               this.cancleFlag = '取消主单'
                                               this.canleAlert.setModelVisible(true);
                                           }}>
                                <Text style={{fontSize:adapeSize(15),color:'#ffffff'}}>取消借款</Text>
                            </TouchableOpacity>:null
                    }
                    {
                        this.stateCode == '10'?
                            <TouchableOpacity style={{height:40,flex:1,backgroundColor:'#05C5C2',justifyContent:'center',alignItems:'center'}}
                                              onPress={()=>{ this.modifyb.setModelVisible(true)  }}>
                                <Text style={{fontSize:adapeSize(15),color:'#ffffff'}}>修改借款金额</Text>
                            </TouchableOpacity>:null
                    }
                    {
                        this.stateCode == '40' || this.stateCode == '60' ||  this.stateCode == '70' || this.stateCode == '80'?
                            <TouchableOpacity style={{height:40,flex:1,backgroundColor:'#05C5C2',justifyContent:'center',alignItems:'center'}}
                                              onPress={()=>{
                                                  if(this.stateCode == '40'){
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
                                                  }else {
                                                      this.toNextPage({
                                                        name: 'ContractInfoScene',
                                                        component: ContractInfoScene,
                                                         params: {loan_code: this.props.loanNumber, showButton: false}
                                                    });
                                                  }
                                              }}>
                                <Text style={{fontSize:adapeSize(15),color:'#ffffff'}}>
                                    {this.stateCode == '40' ? "签署合同" : "查看合同"}
                                </Text>
                            </TouchableOpacity>:null
                    }
                    {
                        this.stateCode == '50'?
                            <TouchableOpacity style={{height:40,flex:1,backgroundColor:'#05C5C2',justifyContent:'center',alignItems:'center'}}
                                              onPress={()=>{
                                                    this.toNextPage({
                                                        name: 'RecognizedGains', component: RecognizedGains, params: {
                                                            loan_code: this.props.loanNumber, //主单号,
                                                            loan_number: "",
                                                            isShow: true,
                                                            callBack: () => {
                                                                this.setState({
                                                                    renderPlaceholderOnly: 'loading'
                                                                });
                                                                this.getLendinfo();
                                                            }
                                                        }
                                                    });
                                              }}>
                                <Text style={{fontSize:adapeSize(15),color:'#ffffff'}}>确认借据</Text>
                            </TouchableOpacity>:null
                    }
                </View>

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
        alignItems: 'center',
        borderRadius:adapeSize(3),
        marginLeft:adapeSize(10),
    }, canceledButton: {
        flex: 1,
        backgroundColor: PAGECOLOR.COLORA1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:adapeSize(3),
        marginLeft:adapeSize(10),
    }, controlButton: {
        flex: 1,
        backgroundColor: PAGECOLOR.COLORB0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:adapeSize(3),
        marginLeft:adapeSize(10),
    }, buttontextStyle: {
        fontSize: fontadapeSize(12),
        color: 'white',
        padding:adapeSize(5),
    }
});


