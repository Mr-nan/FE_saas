/**
 * Created by lhc on 2017/2/15.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    ListView,
    InteractionManager
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();
import * as fontAndColor from '../../constant/fontAndColor';
import BaseComponent from '../../component/BaseComponent';
import NavigationView from '../../component/AllNavigationView';
import WithdrawalsInput from './component/WithdrawalsInput';
import WithdrawalsDialog from './component/WithdrawalsDialog';
export  default class WithdrawalsScene extends BaseComponent {

    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            renderPlaceholderOnly: 'blank',
        };
    }

    initFinish = () => {
        this.setState({
            renderPlaceholderOnly: 'success'
        });
    }


    render() {
        if (this.state.renderPlaceholderOnly !== 'success') {
            return this._renderPlaceholderView();
        }
        return (
            <View style={{backgroundColor: fontAndColor.COLORA3, flex: 1}}>
                <View style={{backgroundColor: '#fff',width:width,height:Pixel.getPixel(44),justifyContent:'center',
                marginTop:Pixel.getTitlePixel(79)}}>
                    <Text style={{fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),color: '#000',
                    marginLeft:Pixel.getPixel(15)}}>银行卡号：6227 **** **** 588</Text>
                </View>
                <View style={{backgroundColor: '#fff',width:width,height:Pixel.getPixel(146),justifyContent:'center',
                marginTop:Pixel.getPixel(10),paddingLeft: Pixel.getPixel(15),paddingRight:Pixel.getPixel(15)}}>
                    <View style={{flex:1,justifyContent:'center'}}>
                        <Text style={{fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),color: '#000'}}>
                            提取金额(元)</Text>
                    </View>
                    <WithdrawalsInput/>
                    <View style={{backgroundColor: fontAndColor.COLORA3,width:width-Pixel.getPixel(30),height:Pixel.getPixel(1)}}></View>
                    <View style={{flex:1,flexDirection: 'row',alignItems: 'center'}}>
                        <Text style={{fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),color: fontAndColor.COLORA1}}>
                            可提现金额：</Text>
                        <Text style={{fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),color: '#000'}}>
                            {this.props.money}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={()=>{
                    this.refs.withdrawalsdialog.changeShowType(true,'','3');
                }} activeOpacity={0.8} style={{marginTop:Pixel.getPixel(28),marginLeft:Pixel.getPixel(15),marginRight:Pixel.getPixel(15),
                borderRadius: Pixel.getPixel(4),backgroundColor: fontAndColor.COLORB0,width:width-Pixel.getPixel(30),
                height:Pixel.getPixel(44),justifyContent:'center',alignItems: 'center'}}>
                    <Text style={{fontSize: Pixel.getPixel(15),color: '#fff'}}>
                        提现</Text>
                </TouchableOpacity>
                <WithdrawalsDialog ref="withdrawalsdialog" callBack={()=>{
                        this.props.callBack();
                        this.backPage();
                }}/>
                <NavigationView
                    title="提现"
                    backIconClick={this.backPage}
                />
            </View>
        );
    }

    _renderPlaceholderView() {
        return (
            <View style={{width: width, height: height,backgroundColor: fontAndColor.COLORA3}}>
                {this.loadView()}
                <NavigationView
                    title="提现"
                    backIconClick={this.backPage}
                />
            </View>
        );
    }


}
const styles = StyleSheet.create({

    image: {
        width: 43,
        height: 43,
    },
    Separator: {
        backgroundColor: fontAndColor.COLORA3,
        height: 1,

    },
    margin: {
        marginRight: Pixel.getPixel(15),
        marginLeft: Pixel.getPixel(15)

    },
    topViewStyle: {flex: 1, height: Pixel.getPixel(44), justifyContent: 'center'}
})