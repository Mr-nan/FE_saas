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

import *as fontAndColor from '../../constant/fontAndColor';

export default class CarInfoNavigationView extends Component{

    render(){

        const {backIconClick,storeIconClick,shareIconClick} = this.props;

        return(

            <View style={styles.content}>
                <TouchableOpacity style={{width:80}} onPress={backIconClick}>
                    <Image style={styles.backIcon}/>
                </TouchableOpacity>
                <Text style={styles.titleText}>车辆详情</Text>
                <View style={styles.imageFoot}>
                    <TouchableOpacity onPress={storeIconClick}>
                        <Image source={require('../../../images/carSourceImages/store.png')}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={shareIconClick}>
                        <Image style={{marginLeft:10}} source={require('../../../images/carSourceImages/share_nil.png')}></Image>
                    </TouchableOpacity>
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