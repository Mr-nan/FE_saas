/**
 * Created by zhengnan on 17/2/8.
 */


import React,{Component} from 'react';
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

export default class CarCell extends Component {

    cellClick=()=>{

       this.props.onPress(this.props.carMainText);

    };

    dateReversal=(time)=>{

        const date = new Date();
        date.setTime(time);
        return(date.getFullYear()+"年"+(date.getMonth()+1)+"月");

    };

    render(){

        const {carCellData}= this.props;
        return(

            <TouchableOpacity onPress={this.cellClick}>
            <View style={[styles.container,styles.lineBottom]} >

                <View style={styles.imageView}>
                    <Image style={styles.image} source={carCellData.img?{uri:carCellData.img}:require('../../../images/carSourceImages/car_null_img.png')}/>
                </View>

                <View style={[styles.textContainer]}>

                    <View style={{backgroundColor:'white'}}>
                        <Text style={styles.mainText}>{'['+carCellData.city_name+']'+carCellData.brand_name+carCellData.model_name}</Text>

                    </View>
                    <View style={{backgroundColor:'white'}}>
                        <Text style={styles.subTitleText}>{this.dateReversal(carCellData.manufacture+'000')+'/'+carCellData.mileage+'万公里'}</Text>
                    </View>

                </View>
                {
                    this.props.showBtn &&
                    <View style={styles.cellFoot}>
                        <Text style={styles.cellFootText}>取消收藏</Text>
                    </View>
                }
            </View>
            </TouchableOpacity>

        )
    }

}


const styles = StyleSheet.create({

    container:{

        flex:1,
        flexDirection:'row',
        height:Pixel.getPixel(110),
        backgroundColor:'white',

    },

    lineBottom:{

        borderBottomWidth:StyleSheet.hairlineWidth,
        borderColor:fontAndColor.COLORA4,

    },


    imageView:{

        width:Pixel.getPixel(147),
        justifyContent:'center',
        // backgroundColor:'blue'

    },
    image:{

        marginLeft:Pixel.getPixel(15),
        width:Pixel.getPixel(120),
        height:Pixel.getPixel(80),
        backgroundColor:fontAndColor.COLORA4,
        resizeMode: 'stretch'

    },

    textContainer:{

        flex:1,
        justifyContent:'space-around',
        marginRight:Pixel.getPixel(15),
    },

    mainText:{

        color:fontAndColor.COLORA0,
        fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT),
        backgroundColor:'white',
    },

    subTitleText:{

        color:fontAndColor.COLORA1,
        fontSize:Pixel.getFontPixel(fontAndColor.CONTENTFONT),
        backgroundColor:'white',

    },
    cellFoot:{

        paddingHorizontal:10,
        paddingVertical:5,
        borderColor:fontAndColor.COLORA2,
        borderWidth:StyleSheet.hairlineWidth,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:2,
        marginRight:Pixel.getPixel(15),
        bottom:Pixel.getPixel(15),
        right:Pixel.getPixel(15),
        position:'absolute',

    },
    cellFootText:{

        color:fontAndColor.COLORA2,
        fontSize:fontAndColor.LITTLEFONT,
    },


});