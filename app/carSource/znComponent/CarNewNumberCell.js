/**
 * Created by zhengnan on 2017/11/8.
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    Dimensions,
} from 'react-native';

import * as fontAndColor from '../../constant/fontAndColor';
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();
const SceneWidth = Dimensions.get('window').width;

export default class CarNewNumberCell extends Component{
    render(){
        return(
            <View style={styles.cell}>
                <View style={styles.headView}>
                    <Text style={styles.headTitle}>{this.props.carData.model_name+'  '+this.props.carData.car_color.split("|")[0]}</Text>
                    <Text style={styles.headSubTitle}>{'VIN：'+'车架号'+' / '+'发动机号：'+''}</Text>
                    <Text style={styles.headSubTitle}>{'出厂日期：'+ this.props.carData.manufacture && this.dateReversal(this.props.carData.manufacture+'000',true)+' / '+'采购价：'+''}</Text>
                </View>
                <ScrollView style={styles.imgScrollView} horizontal={true} showsHorizontalScrollIndicator={false}>

                      <Image style={styles.imgView}/>
                      <Image style={styles.imgView}/>
                      <Image style={styles.imgView}/>
                      <Image style={styles.imgView}/>
                      <Image style={styles.imgView}/>
                </ScrollView>
                {
                    this.props.type ==1 ? (
                            <View style={styles.footView}>
                                <TouchableOpacity onPress={()=>{this.props.footBtnClick('编辑',this.props.carData)}}>
                                    <View style={styles.footBtn}>
                                        <Text style={styles.footBtnText}>编辑</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>{this.props.footBtnClick('出库',this.props.carData)}}>
                                    <View style={styles.footBtn}>
                                        <Text style={styles.footBtnText}>售出出库</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>):(<View style={{marginTop:Pixel.getPixel(10)}}/>)
                }

            </View>
        )
    }


    dateReversal = (time,isDay) => {

        const date = new Date();
        date.setTime(time);
        if(isDay){
            return (date.getFullYear() + '-' + (this.PrefixInteger(date.getMonth() + 1, 2))+'-'+(this.PrefixInteger(date.getDate(), 2)));

        }
        return (date.getFullYear() + '-' + (this.PrefixInteger(date.getMonth() + 1, 2)));

    };

    PrefixInteger = (num, length) => {

        return (Array(length).join('0') + num).slice(-length);

    }

}

const styles = StyleSheet.create({
   cell:{
       backgroundColor:'white',
       width:SceneWidth,
       paddingTop:Pixel.getPixel(10)
   },
    headView:{
        marginHorizontal:Pixel.getPixel(15),
        marginVertical:Pixel.getPixel(5),
    },
    headTitle:{
        fontSize:Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
        color:fontAndColor.COLORA0,
        marginBottom:Pixel.getPixel(10)
    },
    headSubTitle:{
        fontSize:Pixel.getFontPixel(fontAndColor.CONTENTFONT24),
        color:fontAndColor.COLORA1,
    },
    imgScrollView:{
        height:Pixel.getPixel(70),
        marginBottom:Pixel.getPixel(15),
        marginTop:Pixel.getPixel(5)
    },
    imgView:{
        marginLeft:Pixel.getPixel(15),
        width:Pixel.getPixel(70),
        height:Pixel.getPixel(70),
        backgroundColor:fontAndColor.COLORA3,
    },
    footView:{
        borderTopWidth:Pixel.getPixel(1),
        borderTopColor:fontAndColor.COLORA3,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-end',
        marginHorizontal:Pixel.getPixel(15),
        paddingVertical:Pixel.getFontPixel(10)


    },
    footBtn:{
        borderColor:fontAndColor.COLORB0,
        borderWidth:Pixel.getPixel(0.5),
        borderRadius:Pixel.getPixel(2),
        alignItems:'center',
        justifyContent:'center',
        paddingVertical:Pixel.getPixel(5),
        paddingHorizontal:Pixel.getPixel(10),
        backgroundColor:'white',
        marginLeft:Pixel.getPixel(15)
    },
    footBtnText:{
        color:fontAndColor.COLORB0,
        fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28)
    }
});