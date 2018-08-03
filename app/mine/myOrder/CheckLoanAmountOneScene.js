/**
 * Created by hanmeng on 2017/5/13.
 */

import React, {Component, PropTypes} from 'react'

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    TextInput,
    ListView
} from  'react-native'

const {width, height} = Dimensions.get('window');
import BaseComponent from "../../component/BaseComponent";
import NavigatorView from '../../component/AllNavigationView';
import * as fontAndColor from '../../constant/fontAndColor';
import PixelUtil from '../../utils/PixelUtil';
import * as AppUrls from "../../constant/appUrls";
import {request} from "../../utils/RequestUtil";
import ShowToast from "../../component/toast/ShowToast";
import StorageUtil from "../../utils/StorageUtil";
import * as StorageKeyNames from "../../constant/storageKeyNames";
import SelectLoanAmount from "../../carSource/znComponent/SelectLoanAmount";
import ChooseModal from "./component/ChooseModal";
import AddressManage from "./orderwuliu/AddressManage";
const Pixel = new PixelUtil();
let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
export default class CheckLoanAmountOneScene extends BaseComponent {

    constructor(props) {
        super(props);
        this.selectID = -1;
        this.state = {
            selectID: -1,
            dataSource: ds.cloneWithRows([]),
            maxLoanmny:'0',
        }
        this.number = this.props.amount === '请输入申请贷款金额' ? 0 : this.props.amount;
    }

    initFinish = () => {
        this.getCreditRequestType()
    };

    render() {
        return (
            <View style={styles.container}>
                <NavigatorView title='确认借款额度' backIconClick={this.backPage} />
                <ListView
                    style={{marginTop:Pixel.getTitlePixel(64),backgroundColor:'#f0eff5',paddingBottom:Pixel.getPixel(0),marginBottom:Pixel.getPixel(0)}}
                    dataSource={this.state.dataSource}
                    renderHeader={this._renderHeader}
                    renderRow={this._renderRow}
                    renderFooter={this.renderListFooter}
                    enableEmptySections={true}
                    renderSeparator={this._renderSeperator}/>
                <ChooseModal ref='chooseModal' title='提示'
                             negativeButtonStyle={styles.negativeButtonStyle}
                             negativeTextStyle={styles.negativeTextStyle} negativeText='取消'
                             positiveButtonStyle={styles.positiveButtonStyle}
                             positiveTextStyle={styles.positiveTextStyle} positiveText='确定'
                             buttonsMargin={Pixel.getPixel(20)}
                             positiveOperation={() => {
                             }}
                             content=''/>
            </View>
        )
    }

    _renderSeperator = (sectionID, rowID, adjacentRowHighlighted) => {
        return (
            <View key={`${sectionID}-${rowID}`} style={{backgroundColor: '#FFFFFF', height: Pixel.getPixel(1),width:width}}>
                <View style={{backgroundColor: fontAndColor.COLORA3, height: Pixel.getPixel(1),marginLeft:Pixel.getPixel(15),marginLeft:Pixel.getPixel(15),width:width-Pixel.getPixel(30)}}/>
            </View>
        )
    }
    _renderHeader = () => {
            return (
                <View style={{flexDirection:'column'}}>
                    <Text style={{color:'#999999',fontSize:Pixel.getFontPixel(15),paddingLeft:Pixel.getPixel(15),paddingTop:Pixel.getPixel(14),
                        paddingBottom:Pixel.getPixel(14),backgroundColor:'#ffffff'}}>{'采车监管方式'}</Text>
                    <View style={{backgroundColor: fontAndColor.COLORA3, height: Pixel.getPixel(1)}}/>
                </View>
            )
    }

    renderListFooter = () => {
            return (<View>
                <View style={styles.inputBar}>
                    <View style={{flexDirection:'row',justifyContent:'center',paddingTop:Pixel.getPixel(20),paddingBottom:Pixel.getPixel(20),alignItems:'center'}}>
                        <Text style={{color:'#333333',fontSize:Pixel.getFontPixel(15),flex:1,padding:0}}>{"最大可借额度"}</Text>
                        <Text style={{color:'#FA5741',fontSize:Pixel.getFontPixel(15),padding:0,fontWeight: "bold" }}>{this.state.maxLoanmny}</Text>
                        <Text style={{color:'#FA5741',fontSize:Pixel.getFontPixel(14),padding:0}}>{'元'}</Text>
                    </View>
                    <View style={{justifyContent:'center'}}>
                    <TextInput
                        ref='amountInput'
                        value={this.state.number}
                        underlineColorAndroid='transparent'
                        onChangeText={this.setNumber}
                        keyboardType='numeric'
                        clearButtonMode="always"
                        style={{fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),borderWidth:Pixel.getPixel(1),borderColor:'#05C5C2',height:Pixel.getPixel(40),paddingLeft:Pixel.getPixel(5)}}
                        placeholder='请输入金额'/>
                        <Text style={{color:'#000000',fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),position: 'absolute',right:Pixel.getPixel(8),marginTop:Pixel.getPixel(10)}}>{'元'}</Text>
                    </View>
                </View>
                <View style={{backgroundColor:'#f0eff5',paddingTop:Pixel.getPixel(25)}}>
                    <TouchableOpacity
                        onPress={() => {
                            if (this.isNumberByHundred(this.number)) {
                                if (this.number > this.state.maxLoanmny) {
                                    this.props.showToast("不能超过最大贷款额度");
                                }else if(this.number < 30000){
                                    this.props.showToast("最低需借款3万元");
                                } else {
                                    this.refs.chooseModal.changeShowType(true, '取消', '确定', '提交借款额度后不可更改',
                                        () => {
                                            this.checkPrice(this.number);
                                        });

                                }
                            } else if (this.number == 0) {
                                this.props.showToast("金额不能为零");
                            } else {
                                this.props.showToast("请输入整百金额");
                            }
                        }}
                        activeOpacity={0.8}
                        style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#05C5C2', height:Pixel.getPixel(45),
                            marginLeft:Pixel.getPixel(15), marginRight:Pixel.getPixel(15),borderRadius:Pixel.getPixel(3)}}>
                        <Text allowFontScaling={false} style={{color:'#FFFFFF', fontSize: Pixel.getFontPixel(15)}}>确定</Text>
                    </TouchableOpacity>
                </View>
            </View>)
    }

    _renderRow = (rowData, selectionID, rowID) => {
        return (<SelectLoanAmount rowData={rowData} selectID={this.state.selectID }
                                  selectIdB={(id,credit_record_id,supervision_code)=>{
                                      this.setState({selectID: id +supervision_code});
                                      this.credit_id = credit_record_id;
                                      this.supervise_type = supervision_code;
                                      this.orderPaymentMaxLoanmny()
                                  }}
        />)
    }

    setNumber = (number) => {
        this.number = number;
        this.setState({
            number: number,
        });
    }

    orderPaymentMaxLoanmny = () => {
        StorageUtil.mGetItem(StorageKeyNames.LOAN_SUBJECT, (data) => {
            if (data.code == 1 && data.result != null) {
                let datas = JSON.parse(data.result);
                let maps = {
                    api: AppUrls.ORDER_PAYMENT_MAX_LOANMNY,
                    credit_id: this.credit_id,
                    loan_code: this.props.financeNo,
                    merge_id:datas.merge_id,
                };
                this.props.showModal(true);
                request(AppUrls.FINANCE, 'Post', maps)
                    .then((response) => {
                        this.props.showModal(false);
                        this.setState({
                            maxLoanmny:response.mjson.data.max_loanmny,
                        });
                    }, (error) => {
                        this.props.showModal(false);

                    });
            }
        });
    }

    /**
     * from @hanmeng
     *
     *
     **/
    isNumberByHundred = (number) => {
        let re = /^[0-9]*[0-9]$/i;
        if (re.test(number) && number % 100 == 0  && number != 0) {
            return true;
        } else {
            return false;
        }
    };

    /**
     * from @hanmeng
     *
     *
     **/
    renderRihtFootView = () => {
        return (
            <TouchableOpacity
                onPress={() => {
                    if (this.isNumberByHundred(this.number)) {
                        if (this.number > this.state.maxLoanmny) {
                            this.props.showToast("不能超过最大贷款额度");
                        } else {
                            this.props.updateAmount(this.number);
                            this.checkPrice(this.number);
                            this.backPage();
                        }
                    } else if (this.number == 0) {
                        this.props.showToast("金额不能为零");
                    } else {
                        this.props.showToast("请输入整百金额");
                    }
                }}
                activeOpacity={0.9}
            >
                <Text allowFontScaling={false}  style={{color: '#ffffff'}}>完成</Text>
            </TouchableOpacity>
        )
    }

    /**
     * from @huangning
     *
     *
     **/
    getCreditRequestType = () => {
        StorageUtil.mGetItem(StorageKeyNames.LOAN_SUBJECT, (data) => {
            if (data.code == 1 && data.result != null) {
                let datas = JSON.parse(data.result);
                let maps = {
                    // company_id: datas.company_base_id,
                    // order_id: this.props.orderId,
                    merge_id:datas.merge_id,
                };
                this.props.showModal(true);
                request(AppUrls.GETCREDITREQUESTTYPE, 'post', maps).then((response) => {
                this.props.showModal(false);
                // let data = JSON.parse(data.result);
                if (response.mjson.msg === 'ok' && response.mjson.code === 1) {
                this.setState({
                    dataSource: ds.cloneWithRows(response.mjson.data),
                });
                } else {
                    this.props.showToast(response.mjson.msg);
                }}, (error) => {
                    this.props.showToast(error.mjson.msg);
                });
            }
        });
    };

    /**
     * from @hanmeng
     **/
    checkPrice = (price) => {
        this.props.showModal(true);
        StorageUtil.mGetItem(StorageKeyNames.LOAN_SUBJECT, (data) => {
            if (data.code == 1 && data.result != null) {
                let datas = JSON.parse(data.result);
                let maps = {
                    company_id: datas.company_base_id,
                    order_id: this.props.orderId,
                    loan_amount: price,
                    finance_no: this.props.financeNo,
                    credit_id:this.credit_id ,
                    supervise_type:this.supervise_type,

                };
                let url = AppUrls.ORDER_LOAN_AMOUNT_CHECK;
                request(url, 'post', maps).then((response) => {
                    this.props.updateAmount(this.number);
                    if (response.mjson.msg === 'ok' && response.mjson.code === 1) {
                        this.props.showModal(false);
                        this.props.refreshLoanInfo(response.mjson.data,this.credit_id);
                        this.backPage();
                    } else {
                        this.props.showToast(response.mjson.msg);
                    }
                }, (error) => {
                    //this.props.showToast('车辆定价检查失败');
                    this.props.showToast(error.mjson.msg);
                });
            } else {
                this.props.showToast('车辆定价检查失败');
            }
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: fontAndColor.COLORA3
    },
    inputBar: {
        borderTopColor:'#f0eff5',
        borderTopWidth:Pixel.getPixel(10),
        backgroundColor: '#ffffff',
        flexDirection: 'column',
        paddingLeft:Pixel.getPixel(15),
        paddingRight:Pixel.getPixel(15),
        paddingBottom:Pixel.getPixel(15)

    },
    positiveTextStyle: {
        fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),
        color: '#ffffff'
    },
    positiveButtonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: Pixel.getPixel(15),
        backgroundColor: fontAndColor.COLORB0,
        width: Pixel.getPixel(100),
        height: Pixel.getPixel(32),
        borderRadius: 3,
        borderWidth: 1,
        borderColor: fontAndColor.COLORB0
    },
    negativeTextStyle: {
        fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),
        color: fontAndColor.COLORB0
    },
    negativeButtonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Pixel.getPixel(100),
        height: Pixel.getPixel(32),
        borderRadius: 3,
        borderWidth: 1,
        borderColor: fontAndColor.COLORB0
    }
});