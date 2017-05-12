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
export  default class AccountScene extends BaseComponent {

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
                <View style={{width:width,height:Pixel.getPixel(329),backgroundColor: '#fff',
                paddingLeft: Pixel.getPixel(15),paddingRight: Pixel.getPixel(15),marginTop:Pixel.getTitlePixel(79)}}>
                        <View style={{width:width-Pixel.getPixel(30),height:Pixel.getPixel(144),flexDirection: 'row',
                      }}>
                            <View style={{flex:1,paddingTop: Pixel.getPixel(35),alignItems: 'center'}}>
                                <Image style={{width:Pixel.getPixel(61),height:Pixel.getPixel(61)}}
                                source={require('../../../images/mainImage/guitai.png')}></Image>
                                <Text style={{color: '#000',fontSize: Pixel.getPixel(14),marginTop:Pixel.getPixel(5)}}>柜台办理</Text>
                            </View>
                            <View style={{flex:1,paddingTop: Pixel.getPixel(35),alignItems: 'center'}}>
                                <Image style={{width:Pixel.getPixel(61),height:Pixel.getPixel(61)}}
                                       source={require('../../../images/mainImage/wangyinzhuanzhang.png')}></Image>
                                <Text style={{color: '#000',fontSize: Pixel.getPixel(14),marginTop:Pixel.getPixel(5)}}>网银转账</Text>
                            </View>
                            <View style={{flex:1,paddingTop: Pixel.getPixel(35),alignItems: 'center'}}>
                                <Image style={{width:Pixel.getPixel(61),height:Pixel.getPixel(61)}}
                                       source={require('../../../images/mainImage/shoujiyinhang.png')}></Image>
                                <Text style={{color: '#000',fontSize: Pixel.getPixel(14),marginTop:Pixel.getPixel(5)}}>手机银行</Text>
                            </View>
                        </View>
                    <Text style={{color: fontAndColor.COLORA1,fontSize: Pixel.getPixel(14)}}>
                        您可以使用您的银行卡，通过线下转账（柜台、网银、手机银行）的方式将资金充值到您的恒丰银行账户下。</Text>
                    <View style={{width:width-Pixel.getPixel(30),height:Pixel.getPixel(120),marginTop:Pixel.getPixel(15),
                    borderRadius: Pixel.getPixel(4),backgroundColor:fontAndColor.COLORA3,justifyContent:'center',paddingLeft:
                    Pixel.getPixel(15)}}>
                        <Text style={{color: '#000',fontSize: Pixel.getPixel(14)}}>转账时填写的信息如下：</Text>
                        <Text style={{fontWeight: 'bold',color: '#000',fontSize: Pixel.getPixel(14),marginTop:Pixel.getPixel(7)}}>
                            收款人姓名：汪洋</Text>
                        <Text style={{fontWeight: 'bold',color: '#000',fontSize: Pixel.getPixel(14),marginTop:Pixel.getPixel(5)}}>
                            收款账号：4436745003680888</Text>
                        <Text style={{fontWeight: 'bold',color: '#000',fontSize: Pixel.getPixel(14),marginTop:Pixel.getPixel(5)}}>
                            收款银行：恒丰银行</Text>
                    </View>
                </View>
                <NavigationView
                    title="充值"
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
                    title="充值"
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