/**
 * Created by zhengnan on 2017/7/27.
 */

import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
} from 'react-native';

import *as fontAndColor from  '../../../constant/fontAndColor';
import PixelUtil from  '../../../utils/PixelUtil';
let Pixel = new  PixelUtil();

export default class CarBuyCell extends  Component{
    render(){
        return(
            <View style={styles.rootContainer}>
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>2013款牧马人3.6L自动两门Rubicon十周年纪念版</Text>
                </View>
                <View style={styles.contentView}>
                    <View style={styles.contentSubView}>
                        <Text style={styles.subTitleText}>VIN:</Text>
                        <Text style={styles.subTitleText}>1200299919992222</Text>
                    </View>
                    <View style={styles.contentSubView}>
                        <Text style={styles.subTitleText}>验车时间:</Text>
                        <Text style={styles.subTitleText}>2017-07-17</Text>
                    </View>
                    <View style={styles.contentSubView}>
                        <Text style={styles.subTitleText}>客户信息:</Text>
                        <Text style={styles.subTitleText}>郑南 18690700551</Text>
                    </View>
                </View>
                {
                     this.props.btnTitle &&
                     (<View style={styles.footView}>
                         <TouchableOpacity onPress={this.props.cellBtnClick}>
                             <View style={styles.footBtn}>
                                 <Text style={styles.footBtnText}>{this.props.btnTitle}</Text>
                             </View>
                         </TouchableOpacity>
                     </View>)
                }

            </View>
        )
    }
}

const styles = StyleSheet.create({
    rootContainer:{
        flex:1,
        backgroundColor:fontAndColor.COLORA3,
        paddingBottom:Pixel.getPixel(10),
    },
    titleView:{
        height:Pixel.getPixel(44),
        justifyContent:'center',
        backgroundColor:'white',
        paddingLeft:Pixel.getPixel(15),
    },
    titleText:{
        color:fontAndColor.COLORA0,
        fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
    },
    contentView:{
        // borderBottomWidth:Pixel.getPixel(1),
        borderTopWidth:Pixel.getPixel(1),
        // borderBottomColor:fontAndColor.COLORA4,
        borderTopColor:fontAndColor.COLORA4,
        backgroundColor:'white',
        paddingHorizontal:Pixel.getPixel(15),
        paddingTop:Pixel.getPixel(15),
        paddingBottom:Pixel.getPixel(10),
    },
    contentSubView:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginBottom:Pixel.getPixel(10),
    },
    subTitleText:{
        color:fontAndColor.COLORA1,
        fontSize:Pixel.getFontPixel(fontAndColor.CONTENTFONT24) ,
    },
    footView:{
        borderTopWidth:Pixel.getPixel(1),
        borderTopColor:fontAndColor.COLORA4,
        height:Pixel.getPixel(44),
        justifyContent:'center',
        alignItems:'flex-end',
        paddingRight:Pixel.getPixel(15),
        backgroundColor:'white'
    },
    footBtn:{
        height:Pixel.getPixel(27),
        width:Pixel.getPixel(65),
        borderColor:fontAndColor.COLORB0,
        borderWidth:Pixel.getPixel(0.5),
        borderRadius:Pixel.getPixel(2),
        justifyContent:'center',
        alignItems:'center',
    },
    footBtnText:{
        color:fontAndColor.COLORB0,
        fontSize:Pixel.getFontPixel(fontAndColor.CONTENTFONT24) ,
    },
});