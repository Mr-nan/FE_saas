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
import TrustAccountContractScene from "../../accountManage/trustAccount/TrustAccountContractScene";
export  default class BankTextItem extends PureComponent {

    constructor(props) {
        super(props);
        this.consList = [];
        if(this.props.xintuo){
            this.consList = [{name:'《机动车车辆买卖合同协议》',value:''},
                {name:'、',value:''},
                {name:'《机动车车辆买卖合同补充协议》',value:''},
                {name:'和',value:''},
                {name:'《信托利益分配申请及代为支付指令函》',value:''},];
        }else{
            this.consList = [{name:'《机动车车辆买卖合同协议》',value:''}];
        }
    }


    render() {
        let itemList = [];
        for (let i = 0; i < this.consList.length; i++) {
            itemList.push(<Text key={i+'123'} onPress={()=>{
                if(this.consList[i].value!=''){
                    this.toNextPage({
                        name: 'TrustAccountContractScene',
                        component: TrustAccountContractScene,
                        params: {
                            title: '合同',
                            webUrl: this.consList[i].value
                        }
                    })
                }
            }} style={{fontSize:Pixel.getPixel(12),color:'#91A2B6'}}>
                {this.consList[i].name}
            </Text>);
        }
        return (
            <View style={{width:width,backgroundColor:'#00000000',paddingLeft:Pixel.getPixel(15),paddingRight:Pixel.getPixel(15)}}>
                <Text style={{fontSize:Pixel.getPixel(12),color:'#999',marginTop:Pixel.getPixel(20),marginBottom:Pixel.getPixel(33)}}>
                    付款即表示您已同意{itemList}
                </Text>
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