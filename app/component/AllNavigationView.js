/**
 * Created by zhengnan on 17/2/14.
 */

import React,{Component} from 'react';

import {

    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,

} from 'react-native';

import *as fontAndColor from '../constant/fontAndColor';

export default class CarInfoNavigationView extends Component{

    render(){

        const {title,backIconClick,renderRihtFootView} = this.props;

        return(

            <View style={styles.content}>
                <TouchableOpacity style={{width:80}} onPress={backIconClick}>
                    <Image style={styles.backIcon}/>
                </TouchableOpacity>
                <Text style={styles.titleText}>{title}</Text>
                <View style={styles.imageFoot}>
                    {
                        renderRihtFootView&&renderRihtFootView()
                    }


                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({


    content:{

        flex:1,
        marginTop:20,
        height:44,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',

    },
    backIcon:{

        marginLeft:12,
        height:20,
        width:20,
        backgroundColor:'red',
    },

    titleText:{
        color:'white',
        fontSize:fontAndColor.BUTTONFONT,
        textAlign:'center',
        backgroundColor:'transparent',

    },
    imageFoot:{

        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        // backgroundColor:'red',
        width:80,


    },

})