/**
 * Created by lhc on 2017/2/15.
 */
import React, {Component, PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    ListView
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import PixelUtil from '../../../utils/PixelUtil';
const Pixel = new PixelUtil();
import * as fontAndColor from '../../../constant/fontAndColor';
import BankSelectChildItem from "./BankSelectChildItem";
export  default class BankSelectItem extends PureComponent {

    constructor(props) {
        super(props);
        this.selectData=[{
            name:'恒丰账户',
            image:require('../../../../images/neworder/heng.png'),
            describe:'余额不足'
        },{
            name:'鼎诚代付',
            image:require('../../../../images/neworder/ding.png')
        },{
            name:'线下支付',
            image:require('../../../../images/neworder/xian.png')
        }];
        this.state={
            select:1
        }
    }

    render() {
        let itemList = [];
        for (let i = 0;i<this.selectData.length;i++){
            itemList.push(<BankSelectChildItem toPay={()=>{

            }} callBack={()=>{
                this.setState({select:i});
            }} key={i+'123'} data={this.selectData[i]} select={this.state.select==i}/>);
            if(i<this.selectData.length-1){
                itemList.push(<View key={i+'456'} style={{width:width-Pixel.getPixel(30),height:StyleSheet.hairlineWidth, backgroundColor:'#D8D8D8',
                marginLeft:Pixel.getPixel(15)}}></View>);
            }
        }
        return (
            <View style={{width:width, backgroundColor:'#fff'}}>
                {itemList}
            </View>
        );
    }

}
const styles = StyleSheet.create({
    parentView: {
        flex: 1,
        height: Pixel.getPixel(70),
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderColor: '#00000000'
    }
})