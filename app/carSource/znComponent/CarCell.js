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

       this.props.onPress(this.props.carMainText);

    };

    dateReversal=(time)=>{

        const date = new Date();
        date.setTime(time);
        return(date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate());

    };

    render(){

        const {carCellData}= this.props;
        return(

            <TouchableOpacity onPress={this.cellClick}>
            <View style={[styles.container,styles.lineBottom]} >

                <View style={styles.imageView}>
                    <Image style={styles.image} source={{uri:carCellData.img}}/>
                </View>

                <View style={[styles.textContainer]}>

                    <View style={{backgroundColor:'white'}}>
                        <Text style={styles.mainText}>{'['+carCellData.city_name+']'+carCellData.brand_name+carCellData.model_name}</Text>

                    </View>
                    <View style={{backgroundColor:'white'}}>
                        <Text style={styles.subTitleText}>{this.dateReversal(carCellData.create_time+'000')+'/'+carCellData.mileage+'万公里'}</Text>
                    </View>

                </View>

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

        flex:1,
        justifyContent:'space-around',
        marginRight:15,
    },

    mainText:{

        color:fontAndColor.COLORA0,
        fontSize:fontAndColor.LITTLEFONT,
        backgroundColor:'white',
    },

    subTitleText:{

        color:fontAndColor.COLORA1,
        fontSize:fontAndColor.CONTENTFONT,
        backgroundColor:'white',

    },


});