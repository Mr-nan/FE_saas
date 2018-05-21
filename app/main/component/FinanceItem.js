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
import  PixelUtil from '../../utils/PixelUtil'
import  * as fontAndColor from '../../constant/fontAndColor'
var Pixel = new PixelUtil();
import KurongDetaileScene from '../../finance/lend/KurongDetaileScene';
import ChedidaiDetaileScene from '../../finance/lend/ChedidaiDetaileScene';
import DDDetailScene from '../../finance/lend/DDDetailScene';
import DDApplyLendScene from '../../finance/lend/DDApplyLendScene';

import CGDDetailSence from '../../finance/lend/CGDDetailSence';
import SingDetaileSence from '../../finance/lend/SingDetaileSence';
export default class FinanceItem extends PureComponent {

    constructor(props) {
        super(props);
        this.data=this.props.data;
        this.state={data:this.data};
        this.content='';


    }

    componentWillMount() {

    }

    componentWillReceiveProps(props) {
        this.setState({data:props.data});
    }

    render() {
        let nextPage = '';
        if (this.state.data == '1') {
            return (<View/>);
        }
        switch (this.state.data.type) {
            case 1:
                nextPage = KurongDetaileScene;
                this.content = '库';
                this.typeColor={backgroundColor:fontAndColor.COLORB4};//库容
                break;
            case 2:
                nextPage = SingDetaileSence;
                this.content = '单';
                this.typeColor={backgroundColor:fontAndColor.COLORB0};//单车
                break;
            case 3:
                nextPage = KurongDetaileScene;
                this.content = '信';
                this.typeColor={backgroundColor:fontAndColor.COLORB1};//信贷
                break;
            case 4:
                nextPage = KurongDetaileScene;
                this.content = '库';
                this.typeColor={backgroundColor:fontAndColor.COLORB4};//库融
                break;
            case 5:
                if (this.state.data.product_type_change_status == 0) {     //采购
                    nextPage = CGDDetailSence;
                    this.content = '采';
                    this.typeColor={backgroundColor:fontAndColor.COLORB1};
                } else if (this.state.data.product_type_change_status == 1) {
                    nextPage = SingDetaileSence;
                    this.content = '单';
                    this.typeColor={backgroundColor:fontAndColor.COLORB1};
                } else {
                    nextPage = SingDetaileSence;
                    this.content = '单';
                    this.typeColor={backgroundColor:fontAndColor.COLORB1};
                }
                break;
            case 6:
                nextPage = DDDetailScene;
                this.content = '订';
                this.typeColor={backgroundColor:fontAndColor.COLORB4};//订单
                break;
        }

        return (
            <TouchableOpacity activeOpacity={0.8} onPress={()=>{
                this.props.itemClick(this.state.data,nextPage);
            }}>
            <View style={{backgroundColor:'#fff',width:width,height: Pixel.getPixel(130),
            marginBottom:Pixel.getPixel(10)}}>
                <View style={{width:Pixel.getPixel(345),height:Pixel.getPixel(44),flexDirection:'row',
                marginHorizontal:Pixel.getPixel(15)}}>
                    <View style={{flex:2,flexDirection: 'row',alignItems: 'center'}}>
                        {
                            this.content && (
                                <View style={[{width:Pixel.getPixel(16),height:Pixel.getPixel(16),
                                justifyContent:'center',alignItems: 'center',},this.typeColor]}>
                                <Text style={{fontSize: Pixel.getFontPixel(12),color: '#fff'}}>{this.content}</Text>
                            </View>)
                        }

                        <Text style={{fontSize: Pixel.getFontPixel(15),color: '#000',
                        marginLeft:Pixel.getPixel(8)}} numberOfLines={1}>{this.props.customerName}</Text>
                    </View>
                    <View style={{flex:1,flexDirection: 'row',alignItems: 'center',justifyContent:'flex-end'}}>
                        <Text style={{fontSize: Pixel.getFontPixel(12),color: '#999'}}>{this.state.data.loan_code}</Text>
                    </View>
                </View>
                <View style={{width:Pixel.getPixel(345),height:StyleSheet.hairlineWidth,backgroundColor:'#d8d8d8',
                marginHorizontal:Pixel.getPixel(15)}}></View>
                <View style={{width:Pixel.getPixel(345),height:Pixel.getPixel(84),flexDirection:'row',
                marginHorizontal:Pixel.getPixel(15)}}>
                    <View style={{flex:4,justifyContent:'center',alignItems:'center',alignItems: 'flex-start'}}>
                        <Text style={{fontSize: Pixel.getFontPixel(20),color: '#fa5741'}}>{this.state.data.loan_mny}
                        </Text>
                        <Text style={{fontSize: Pixel.getFontPixel(12),color: '#999',
                        marginTop:Pixel.getPixel(5)}}>借款金额</Text>
                    </View>
                    <View style={{flex:3,justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontSize: Pixel.getFontPixel(20),color: '#000'}}>{this.state.data.loan_life}
                        </Text>
                        <Text style={{fontSize: Pixel.getFontPixel(12),color: '#999',
                        marginTop:Pixel.getPixel(5)}}>借款期限</Text>
                    </View>
                    <View style={{flex:5,justifyContent:'center',alignItems:'flex-end'}}>
                        <View style={[{height:Pixel.getPixel(30),
                        justifyContent:'center',alignItems: 'center',borderWidth:StyleSheet.hairlineWidth,
                        borderRadius:3, width:Pixel.getPixel(100)
                        },this.state.data.status==6?{borderColor:'#999'}:{borderColor:'#fa5741'}]}>
                            <Text style={[{fontSize: Pixel.getFontPixel(15),},this.state.data.status==6?{color:'#999'}:{color:'#fa5741'}]}>{this.state.data.status_str}</Text>
                        </View>
                    </View>
                </View>
            </View>
            </TouchableOpacity>
        );
    }
}
