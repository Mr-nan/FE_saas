/**
 * Created by lhc on 2017/2/15.
 */
import React, {Component,PureComponent} from 'react';
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
import PixelUtil from '../../../utils/PixelUtil';
const Pixel = new PixelUtil();
import * as fontAndColor from '../../../constant/fontAndColor';
import NavigationView from '../../../component/AllNavigationView';
let list = [];
export class listValue {
    constructor(key, imageFile, click) {

        this.key = key;
        this.imageFile = imageFile;
        this.click = click;
    }
}
export  default class AccountTitle extends PureComponent {

    constructor(props) {
        super(props);
        list = [];
        list.push(new listValue('转账',require('../../../../images/mainImage/Transfer.png'),this.props.transfer));
        list.push(new listValue('银行卡',require('../../../../images/mainImage/bankCard.png'),this.props.bankCard));
        list.push(new listValue('账户流水',require('../../../../images/mainImage/flow.png'),this.props.flow));
        list.push(new listValue('修改交易密码',require('../../../../images/mainImage/changePwd.png'),this.props.changePwd));
        list.push(new listValue('重置交易密码',require('../../../../images/mainImage/resetPwd.png'),this.props.resetPwd));
        list.push(new listValue('修改手机号码',require('../../../../images/mainImage/changePhone.png'),this.props.changePhone));
        list.push(new listValue('账户设置',require('../../../../images/mainImage/accountSetting.png'),this.props.accountSetting));
    }


    render() {
        let itemList = [];
        itemList.push(<View key={'top'} style={{width:width,height:Pixel.getPixel(30),backgroundColor:fontAndColor.COLORA3,
        justifyContent:'center'}}>
            <Text style={{color:fontAndColor.COLORA1,fontSize: Pixel.getPixel(fontAndColor.CONTENTFONT24),
            marginLeft:Pixel.getPixel(15)}}>账户功能</Text>
        </View>);
        for(let i = 0;i<list.length;i++){
            itemList.push(<TouchableOpacity onPress={()=>{
                list[i].click();
            }} activeOpacity={0.8} key={i+'11'} style={{width:width,height:Pixel.getPixel(44),backgroundColor:'#fff',
            marginTop:Pixel.getPixel(1),flexDirection: 'row'}}>
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Image style={{width:Pixel.getPixel(24),height:Pixel.getPixel(24)}}
                    source={list[i].imageFile}/>
                </View>
                <View style={{flex:4,justifyContent:'center'}}>
                    <Text style={{fontSize: Pixel.getFontPixel(14),color: '#000'}}>{list[i].key}</Text>
                </View>
                <View style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
                    <Image style={{width:Pixel.getPixel(14),height:Pixel.getPixel(14),marginRight:Pixel.getPixel(15)}}
                           source={require('../../../../images/mainImage/celljiantou.png')}/>
                </View>
            </TouchableOpacity>);
        }
        itemList.push(<View key={'end'} style={{width:width,height:Pixel.getPixel(30),backgroundColor:fontAndColor.COLORA3,
        flexDirection: 'row'}}>
            <View style={{flex:1,justifyContent:'center'}}>
                <Text style={{color:fontAndColor.COLORA1,fontSize: Pixel.getPixel(fontAndColor.CONTENTFONT24),
            marginLeft:Pixel.getPixel(15)}}>最近流水</Text>
            </View>
            <TouchableOpacity onPress={()=>{
                    this.props.moreFlow();
            }} activeOpacity={0.9} style={{flex:1,flexDirection: 'row',justifyContent:'flex-end',alignItems:'center'}}>

                <Text style={{color:fontAndColor.COLORA2,fontSize: Pixel.getPixel(fontAndColor.CONTENTFONT24)}}>更多 </Text>
                <Image style={{width:Pixel.getPixel(14),height:Pixel.getPixel(14),marginRight:Pixel.getPixel(15)}}
                       source={require('../../../../images/mainImage/celljiantou.png')}/>
            </TouchableOpacity>
        </View>);
        return (
            <View style={{width:width,height:Pixel.getPixel(514),backgroundColor:fontAndColor.COLORA3}}>
                <View style={{width:width,height:Pixel.getPixel(140),backgroundColor:fontAndColor.COLORB0}}>
                    <View style={{width:width,height:Pixel.getPixel(35),backgroundColor:'rgba(105,105,105,0.1)',
                justifyContent:'center'}}>
                        <Text style={{marginLeft:Pixel.getPixel(20),color: '#fff',
                     fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}}>
                            账户号码：4367450036808888
                        </Text>
                    </View>
                    <View style={{width:width,height:Pixel.getPixel(105),flexDirection:'row'}}>
                        <View style={{flex:1,justifyContent:'center',alignItems: 'center'}}>
                            <Text style={{color: '#fff',fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24)}}>
                                账户总额(万)
                            </Text>
                            <Text style={{fontWeight: 'bold',color: '#fff',fontSize: Pixel.getFontPixel(32),}}>
                                150
                            </Text>
                        </View>
                        <TouchableOpacity onPress={()=>{
                               this.props.frozen();
                        }} activeOpacity={0.8} style={{flex:1,justifyContent:'center',alignItems: 'center'}}>
                            <Text style={{color: '#fff',fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24)}}>
                                冻结金额(万)
                            </Text>
                            <Text style={{fontWeight: 'bold',color: '#fff',fontSize: Pixel.getFontPixel(32),}}>
                                13
                            </Text>
                        </TouchableOpacity>
                        <View style={{flex:1,justifyContent:'center',alignItems: 'center'}}>
                            <Text style={{color: '#fff',fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT24)}}>
                                可用余额(万)
                            </Text>
                            <Text style={{fontWeight: 'bold',color: '#fff',fontSize: Pixel.getFontPixel(32),}}>
                                25
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{width:width,height:Pixel.getPixel(374),backgroundColor:fontAndColor.COLORA3}}>
                    {itemList}
                </View>
            </View>

        );
    }


    _renderPlaceholderView() {
        return (
            <View style={{width: width, height: height,backgroundColor: fontAndColor.COLORA3}}>
                {this.loadView()}
                <NavigationView
                    title="账户管理"
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
        height: Pixel.getPixel(10),

    },
    margin: {
        marginRight: Pixel.getPixel(15),
        marginLeft: Pixel.getPixel(15)

    },
    topViewStyle: {flex: 1, height: Pixel.getPixel(44), justifyContent: 'center'}
})