import React, {Component, PureComponent} from 'react';
import {
    AppRegistry,
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    Dimensions,
} from 'react-native';

let {height, width} = Dimensions.get('window');
import PixelUtil from '../../utils/PixelUtil'
import * as fontAndColor from '../../constant/fontAndColor'

var Pixel = new PixelUtil();
import HomeJobButton from './HomeJobButton';
import GetPermissionUtil from '../../utils/GetPermissionUtil';

const GetPermission = new GetPermissionUtil();
import Switch from '../../mine/accountManage/component/Switch';

let titleText = ['综合授信额度(万)', '贷款余额(万)', '可用额度(万)', '微众可用余额(万)'];
let newCarTitleText = ['新车订单额度(万)', '新车贷款余额(万)', '新车可用额度(万)'];
let mnyData={};
// multiple_credit_type	授信类型	string	1 综合授信 2 小额授信
// newcar_creditmny	新车授信额度	string	单位 元
// newcar_loanbalance	新车贷款余额	string	单位 元
// newcar_maxloanmny   新车可借额度
export default class FinanceHeaderTop extends PureComponent {

    constructor(props) {
        super(props);
        this.isOpen = true;
        this.type = this.props.type;//新车为2
        mnyData=this.props.allData;
        if(mnyData.multiple_credit_type==2){
            titleText[0]='小额授信额度(万)';
        }else if(mnyData.multiple_credit_type==1){
            titleText[0]='综合授信额度(万)';
        }

        this.allData = {
            credit_mny: this.type==1?mnyData.credit_mny / 10000:mnyData.newcar_creditmny/10000,//授信额度
            credit_maxloanmny: this.type==1?mnyData.credit_maxloanmny / 10000 : mnyData.newcar_maxloanmny/10000,//可用余额
            loan_balance_mny: this.type==1?mnyData.loan_balance_mny / 10000 : mnyData.newcar_loanbalance/10000,//贷款余额
            microchinese_mny: mnyData.microchinese_mny / 10000,//微众额度
            is_microchinese_mny:mnyData.is_microchinese_mny,//3审核通过，5关闭
            microchinese_mny:mnyData.is_microchinese_mny == 5 ?0 :mnyData.microchinese_mny/10000,//微众额度

        }

        let title = '';
        if (mnyData.is_microchinese_mny == 1) {
            title = '激活微众额度';
        } else if (mnyData.is_microchinese_mny == 2) {
            title = '待微众审核';
        } else if (mnyData.is_microchinese_mny == 4) {
            title = '微众审核未通过';
        }

        this.state = {
            type: this.type,
            allData: this.allData,
            titleText: this.type == 1 ? titleText : newCarTitleText,
            microchineseTitle:title,
        };
    }

    componentWillMount() {

    }

    changeType = (type) => {
        this.setState({type: type});
    }

    isEyeOpen = () => {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.setState({
                allData: this.allData
            });
        } else {
            this.setState({
                allData: {
                    credit_mny: '*******',
                    credit_maxloanmny: '*****',
                    loan_balance_mny: '*****',
                    microchinese_mny:'*****'
                }
            });
        }
    }

    render() {
        if (this.state.type == 1) {
            return (
                <View style={{alignItems: 'center', flex: 1}}>
                    <View style={{width:Pixel.getPixel(290), flexDirection: 'row',justifyContent:'space-between',paddingTop:Pixel.getPixel(12)}}>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => {this.isEyeOpen()}}>
                                <Image style={{width: Pixel.getPixel(18), height: Pixel.getPixel(12)}}
                                       source={require('../../../images/financeImages/kejian.png')}></Image>
                        </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8} style={{
                                width: Pixel.getPixel(54), height: Pixel.getPixel(17),
                                backgroundColor: 'rgba(255,255,255,0.4)', borderRadius: 10, justifyContent: 'center',
                                alignItems: 'center'
                            }} onPress={() => {this.props.depositPop()}}>
                                <Text style={{
                                    fontSize: Pixel.getFontPixel(12), color: '#fff',
                                    backgroundColor: '#00000000'
                                }}>保证金</Text>
                            </TouchableOpacity>
                    </View>
                    <View style={{height: Pixel.getPixel(72), alignItems: 'center'}}>
                        <Text
                            style={{
                                fontSize: Pixel.getPixel(12), color: '#fff',
                                backgroundColor: '#00000000'
                            }}>{this.state.titleText[0]}</Text>
                        <TouchableOpacity activeOpacity={0.8} style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }} onPress={() => {
                            this.props.creditPop()
                        }}>
                            <Text
                                style={{
                                    fontSize: Pixel.getPixel(32), color: '#fff', fontWeight: 'bold'
                                    , backgroundColor: '#00000000', marginTop: Pixel.getPixel(4)
                                }}> {this.state.allData.credit_mny}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: Pixel.getPixel(290), height: 1, backgroundColor: 'rgba(255,255,255,0.3)'}}>

                    </View>
                    <View style={{height: Pixel.getPixel(60), width: Pixel.getPixel(315), flexDirection: 'row'}}>
                        <View style={{flex: 1, alignItems: 'center', paddingTop: Pixel.getPixel(9)}}>
                            <Text style={{
                                fontSize: Pixel.getPixel(11), color: '#fff',
                                backgroundColor: '#00000000'
                            }}>{this.state.titleText[1]}</Text>
                            <Text style={{
                                fontSize: Pixel.getPixel(17), color: '#fff',
                                backgroundColor: '#00000000', fontWeight: 'bold', marginRight: Pixel.getPixel(4)
                            }}>{this.state.allData.loan_balance_mny}</Text>
                        </View>

                        <TouchableOpacity activeOpacity={0.8} style={{flex: 1}} onPress={() => {
                            this.props.balancePop()
                        }}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View style={{
                                    width: Pixel.getPixel(1), height: Pixel.getPixel(32),
                                    backgroundColor: 'rgba(255,255,255,0.3)', marginTop: Pixel.getPixel(9)
                                }}>

                                </View>
                                <View style={{flex: 1, alignItems: 'center', paddingTop: Pixel.getPixel(9)}}>
                                    <Text style={{
                                        fontSize: Pixel.getPixel(11), color: '#fff',
                                        backgroundColor: '#00000000'
                                    }}>{this.state.titleText[2]}</Text>

                                    <View activeOpacity={0.8} style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent:'center'
                                    }}>
                                        <Text style={{
                                            fontSize: Pixel.getPixel(17),
                                            color: '#fff',
                                            backgroundColor: '#00000000',
                                            fontWeight: 'bold',
                                            marginRight: Pixel.getPixel(4)
                                        }}>{this.state.allData.credit_maxloanmny}</Text>
                                    </View>
                                </View>

                            </View>
                        </TouchableOpacity>
                        {
                          this.state.microchineseTitle!='' &&(
                              <TouchableOpacity activeOpacity={0.8} style={{flex: 1, flexDirection:'row',backgroundColor:'#00000000'}} onPress={() => {
                              this.props.weizongPop();
                          }}>
                              <View style={{
                                  width: Pixel.getPixel(1), height: Pixel.getPixel(32),
                                  backgroundColor: 'rgba(255,255,255,0.3)', marginTop: Pixel.getPixel(9)
                              }}/>
                              <View activeOpacity={0.8} style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  justifyContent:'center',
                                  backgroundColor:'#00000000',
                                  flex:1,
                                  marginBottom:Pixel.getPixel(10)
                              }}>
                                  <Text style={{
                                      fontSize: Pixel.getPixel(11), color: '#fff', backgroundColor: '#00000000', marginRight: Pixel.getPixel(4)
                                  }}>{'激活微众额度'}</Text>
                                  <Image source={require('../../../images/financeImages/youjiantou.png')}/>
                              </View>
                          </TouchableOpacity>)
                        }
                    </View>
                </View>

            );
        } else {
            return (
                <TouchableOpacity onPress={() => {
                    this.props.onPress();
                }} activeOpacity={0.8} style={{flex: 1, alignItems: 'center'}}>
                    <Text style={{
                        fontSize: Pixel.getFontPixel(11), color: '#fff',
                        backgroundColor: '#00000000', marginTop: Pixel.getPixel(10)
                    }}>{this.type==1?  titleText[0]+mnyData.credit_mny / 10000: '新车订单额度 '+mnyData.newcar_creditmny/10000}万</Text>
                </TouchableOpacity>

            );
        }
    }
}