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

export default class CarCell extends Component {

    cellClick=()=>{

        this.props.onPress&& this.props.onPress(this.props.carMainText);

    };
    render(){

        return(

            <TouchableOpacity onPress={this.cellClick}>
            <View style={[styles.container,styles.lineBottom]} >

                <View style={styles.imageView}>
                    <Image style={styles.image}/>
                </View>

                <View style={[styles.textContainer]}>
                    <View style={{backgroundColor:'white'}}>
                        <Text style={styles.mainText}>{this.props.carMainText}</Text>
                    </View>
                    <View style={{backgroundColor:'white'}}>
                        <Text style={styles.subTitleText}>{this.props.carSubText}</Text>
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
        height:110,
        backgroundColor:'white',

    },

    lineBottom:{

        borderBottomWidth:StyleSheet.hairlineWidth,
        borderColor:fontAndColor.COLORA4,

    },


    imageView:{

        width:147,
        justifyContent:'center',
        // backgroundColor:'blue'


    },
    image:{

        marginLeft:15,
        width:120,
        height:80,
        backgroundColor:'#FFF45C',

    },

    textContainer:{

        // backgroundColor:'#FF0067',
        flex:1,
        justifyContent:'space-around',
    },

    mainText:{

        color:fontAndColor.COLORA0,
        fontSize:fontAndColor.LITTLEFONT,
    },

    subTitleText:{

        color:fontAndColor.COLORA1,
        fontSize:fontAndColor.CONTENTFONT,
    },

    cellFoot:{

        paddingHorizontal:10,
        paddingVertical:5,
        borderColor:fontAndColor.COLORA2,
        borderWidth:StyleSheet.hairlineWidth,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:2,
        marginRight:15,
        bottom:15,
        right:15,
        position:'absolute',

    },
    cellFootText:{

        color:fontAndColor.COLORA2,
        fontSize:fontAndColor.LITTLEFONT,
    },


});