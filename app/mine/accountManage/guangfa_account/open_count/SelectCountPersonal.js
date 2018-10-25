/*
*
* created by marongting on 2018-10-16
*
* */

import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions, StatusBar

} from 'react-native';

const {width,height} = Dimensions.get('window');
import PixelUtil from '../../../../utils/PixelUtil';
const Pixel = new PixelUtil;
import * as fontColor from '../../../../constant/fontAndColor';
import BaseComponent from '../../../../component/BaseComponent';
import NavigationView from '../../../../component/AllNavigationView';
import GfOpenPersonalCountScene from './GfOpenPersonalCountScene';

export default class SelectCountPersonal extends BaseComponent{
    constructor(props){
        super(props);
        this.state = {
            renderPlaceholderOnly:'blank'
        }
    }

    initFinish (){
        this.setState({
            renderPlaceholderOnly:'success'
        })
    }
    _renderPlaceholderView() {
        return(
            <View style={{width:width,height:height,backgroundColor:fontColor.COLORA3}}>
                {this.loadView()}
                <NavigationView backIconClick={this.backPage} title='选择账户' wrapStyle={{backgroundColor:'white'}}
                                titleStyle={{color:fontColor.COLORD2}}/>
            </View>
        )
    }

    render() {
        if(this.state.renderPlaceholderOnly != 'success'){
            return  this._renderPlaceholderView();
        }
        return (
            <View style={{backgroundColor:fontColor.COLORD1,flex:1}}>
                <StatusBar barStyle="dark-content"/>
                <NavigationView backIconClick={this.backPage} title='选择账户' wrapStyle={{backgroundColor:'white'}}
                                titleStyle={{color:fontColor.COLORD2}} />
                <TouchableOpacity activeOpacity={0.8} onPress={()=>{
                    this.toNextPage({
                        name:'GfOpenPersonalCountScene',
                        component:GfOpenPersonalCountScene,
                        params:{callBack:()=>{this.props.callBack();
                            }}
                    })
                }} style={styles.openCountView} >
                    <View style={styles.header}>
                        <Image style={styles.icon} source={require('../../../../../images/mine/guangfa_account/xin-hong.png')}/>
                        <Text allowFontScaling={false} style={styles.text}>个人新开户</Text>
                    </View>
                    <Text allowFontScaling={false} style={styles.tip}>每个个人用户仅限开通1个个人账户,并将绑定个人银行卡</Text>
                </TouchableOpacity>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    openCountView:{
        width:Pixel.getPixel(345),
        height:Pixel.getPixel(91),
        backgroundColor:'white',
        marginLeft: Pixel.getPixel(15),
        marginTop: Pixel.getPixel(82),
        borderRadius:Pixel.getPixel(5),
        borderWidth:Pixel.getPixel(1),
        borderColor:'white',
        shadowOffset: {width:0,height:Pixel.getPixel(8)},
        shadowColor: 'rgb(157,161,179)',
        shadowRadius:Pixel.getPixel(18),
        shadowOpacity:0.1,
        // elevation: 10,
    },
    header:{
        width:width,
        height:Pixel.getPixel(38),
        flexDirection: 'row',
        marginLeft: Pixel.getPixel(24),
        justifyContent: 'flex-start',
        alignItems:'flex-end'

    },
    icon:{
        width:Pixel.getPixel(20),
        height:Pixel.getPixel(20),
    },
    text:{
        width:Pixel.getPixel(85),
        height:Pixel.getPixel(21),
        marginLeft:Pixel.getPixel(7),
        paddingTop:Pixel.getPixel(3),
        color:fontColor.COLORD2,
        fontSize:Pixel.getFontPixel(15),
    },
    tip:{
        height:Pixel.getPixel(17),
        marginLeft:Pixel.getPixel(24),
        marginTop: Pixel.getPixel(12),
        color:fontColor.COLORA1,
        fontSize:Pixel.getFontPixel(12),
    }
})

