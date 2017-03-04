/**
 * Created by zhengnan on 17/2/8.
 */


import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';


import * as fontAndColor from '../../constant/fontAndColor';
import PixelUtil from '../../utils/PixelUtil';
var Pixel = new PixelUtil();

export default class CarCollectionItems extends Component {

    cellClick = (id) => {

        this.props.mOnPress(id);

    };

    dateReversal = (time) => {

        const date = new Date();
        date.setTime(time);
        return (date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate());

    };

    render() {

        let carCellData = this.props.items;
        return (

            <TouchableOpacity onPress={()=>{
                this.cellClick(carCellData.id);
            }}>
                <View style={[styles.container,styles.lineBottom]}>

                    <View style={styles.imageView}>
                        <Image style={styles.image}
                               source={{uri:'https://ss3.baidu.com/-fo3dSag_xI4khGko9WTAnF6hhy/baike/s%3D220/sign=7fa024e5f703738dda4a0b20831ab073/279759ee3d6d55fb745a2d636c224f4a21a4ddd3.jpg'}}/>
                    </View>

                    <View style={[styles.textContainer]}>

                        <View style={{backgroundColor:'#00000000'}}>
                            <Text
                                style={styles.mainText}>{carCellData.model_name}</Text>

                        </View>
                        <View style={{backgroundColor:'#00000000',justifyContent:'center'}}>
                            <Text
                                style={styles.subTitleText}>{this.dateReversal(carCellData.manufacture + '000') + '/' + carCellData.mileage + '万公里'}</Text>
                            <TouchableOpacity onPress={()=>{
                                    this.props.callBack(carCellData.id);
                            }} activeOpacity={0.8}
                                              style={{borderWidth:1,borderRadius:3,borderColor:fontAndColor.COLORA3,marginTop:Pixel.getPixel(5),width:Pixel.getPixel(58)}}>
                                <Text style={[styles.cellFootText,{margin:Pixel.getPixel(3)}]}>{this.props.from=='BrowsingHistoryScene'?'删除记录':'取消收藏'}</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </TouchableOpacity>

        )
    }

}


const styles = StyleSheet.create({

    container: {

        flex: 1,
        flexDirection: 'row',
        height: Pixel.getPixel(110),
        backgroundColor: 'white',

    },

    lineBottom: {

        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: fontAndColor.COLORA4,

    },


    imageView: {

        width: Pixel.getPixel(147),
        justifyContent: 'center',
        // backgroundColor:'blue'

    },
    image: {

        marginLeft: Pixel.getPixel(15),
        width: Pixel.getPixel(120),
        height: Pixel.getPixel(80),
        backgroundColor: '#FFF45C',

    },

    textContainer: {

        flex: 1,
        justifyContent: 'space-around',
        marginRight: Pixel.getPixel(15),
    },

    mainText: {

        color: fontAndColor.COLORA0,
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT),
        backgroundColor: 'white',
        height: Pixel.getPixel(33),
        backgroundColor: '#00000000'
    },

    subTitleText: {

        color: fontAndColor.COLORA1,
        fontSize: Pixel.getFontPixel(fontAndColor.CONTENTFONT),
        backgroundColor: '#00000000',

    },
    cellFoot: {

        paddingHorizontal: 10,
        paddingVertical: 5,
        borderColor: fontAndColor.COLORA2,
        borderWidth: StyleSheet.hairlineWidth,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2,
        marginRight: Pixel.getPixel(15),
        bottom: Pixel.getPixel(15),
        right: Pixel.getPixel(15),
        position: 'absolute',

    },
    cellFootText: {

        color: fontAndColor.COLORA2,
        fontSize: Pixel.getPixel(fontAndColor.CONTENTFONT24),
    },


});