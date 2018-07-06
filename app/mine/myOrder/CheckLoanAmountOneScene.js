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
const Pixel = new PixelUtil();
let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
export default class CheckLoanAmountOneScene extends BaseComponent {

    constructor(props) {
        super(props);
        this.selectID = -1;
        this.state = {
            dataSource: ds.cloneWithRows(['aaaa','bbbbb','ccccc']),
        }
        this.number = this.props.amount === '请输入申请贷款金额' ? 0 : this.props.amount;
    }

    initFinish = () => {
        this.setState({
            dataSource: ds.cloneWithRows(['xxxx','bbbbb','ccccc','ddddddd','eeeeeeee']),
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <NavigatorView title='确认借款额度' backIconClick={this.backPage} renderRihtFootView={this.renderRihtFootView}/>
                <ListView
                    removeClippedSubviews={false}
                    style={{marginTop:Pixel.getPixel(45),backgroundColor:'#f0eff5',paddingBottom:Pixel.getPixel(0),marginBottom:Pixel.getPixel(0)}}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    renderSeparator={this._renderSeperator}
                    showsVerticalScrollIndicator={false}/>
            </View>
        )
    }

    _renderSeperator = (sectionID, rowID, adjacentRowHighlighted) => {
        return (
            <View key={`${sectionID}-${rowID}`}
                style={{backgroundColor: fontAndColor.COLORA3, height: Pixel.getPixel(1)}}/>
        )
    }

    _renderRow = (rowData, selectionID, rowID) => {
        if(rowID == 0){
            return (
                <Text style={{color:'#999999',fontSize:Pixel.getFontPixel(15),paddingLeft:Pixel.getPixel(15),paddingTop:Pixel.getPixel(14), paddingBottom:Pixel.getPixel(14),backgroundColor:'#ffffff'}}>{'采车监管方式'}</Text>
            )
        } else if(rowData == "ddddddd"){
            return (
                <View style={styles.inputBar}>
                    <View style={{flexDirection:'row',justifyContent:'center',paddingTop:Pixel.getPixel(20),paddingBottom:Pixel.getPixel(20)}}>
                        <Text style={{color:'#333333',fontSize:Pixel.getFontPixel(15),flex:1}}>{"最大可借额度"}</Text>
                        <Text style={{color:'#FA5741',fontSize:Pixel.getFontPixel(15)}}>{"xxxx"}</Text>
                    </View>
                    <TextInput
                        ref='amountInput'
                        defaultValue={this.number + ''}
                        underlineColorAndroid='transparent'
                        onChangeText={this.setNumber}
                        keyboardType='numeric'
                        clearButtonMode="always"
                        style={{fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),borderWidth:Pixel.getPixel(1),borderColor:'#05C5C2',height:Pixel.getPixel(40)}}
                        placeholder='请输入金额'/>
                </View>
            )
        } else if(rowData == 'eeeeeeee'){
            return(
                <View style={{backgroundColor:'#f0eff5',paddingTop:Pixel.getPixel(25)}}>
                    <TouchableOpacity
                        onPress={() => {   // 充值

                        }}
                        activeOpacity={0.8}
                        style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#05C5C2', height:Pixel.getPixel(45),
                            marginLeft:Pixel.getPixel(15), marginRight:Pixel.getPixel(15),borderRadius:Pixel.getPixel(3)}}>
                        <Text allowFontScaling={false}
                              style={{color:'#FFFFFF', fontSize: Pixel.getFontPixel(15)}}>确定</Text>
                    </TouchableOpacity>
                </View>
            )
        } else  {
            return (
                <View style={{flexDirection:'row',paddingBottom:Pixel.getPixel(19),paddingLeft:Pixel.getPixel(15),alignItems:'center',paddingRight:Pixel.getPixel(15),paddingTop:Pixel.getPixel(17),backgroundColor:'#ffffff'}}>
                    <View style={{flex:1}}>
                        <Text style={{color:'#333333',fontSize:Pixel.getFontPixel(14)}}>{rowData}</Text>
                        <Text style={{color:'#999999',fontSize:Pixel.getFontPixel(12)}}>{rowData}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            if(this.selectID == rowID){
                                this.selectID = -1
                            }else {
                                this.selectID = rowID
                            }
                        }}>
                        {
                            this.selectID == rowID?
                                <Image source={require('../../../images/mainImage/agreed_sign.png')}/> :
                                <Image source={require('../../../images/mainImage/un_agreed_sign.png')}/>
                        }
                    </TouchableOpacity>
                </View>
            )
        }
    }

    setNumber = (number) => {
        this.number = number;
        /*        this.setState({
         number: number,
         });*/
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
                        if (this.number > this.props.maxLoanmny) {
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
     * from @hanmeng
     *
     *
     **/
    checkPrice = (price) => {
        this.props.showModal(true);
        StorageUtil.mGetItem(StorageKeyNames.LOAN_SUBJECT, (data) => {
            if (data.code == 1 && data.result != null) {
                let datas = JSON.parse(data.result);
                let maps = {
                    company_id: datas.company_base_id,
                    //car_id: this.props.carId,
                    order_id: this.props.orderId,
                    loan_amount: price,
                    finance_no: this.props.financeNo
                };
                let url = AppUrls.ORDER_LOAN_AMOUNT_CHECK;
                request(url, 'post', maps).then((response) => {
                    if (response.mjson.msg === 'ok' && response.mjson.code === 1) {
                        this.props.showModal(false);
                        this.props.refreshLoanInfo(response.mjson.data);
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

    }
});