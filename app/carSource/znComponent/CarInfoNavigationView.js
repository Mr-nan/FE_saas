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
        return(
            <View style={styles.contaier}>
                <View style={styles.content}>
                    <Image style={styles.backIcon}/>
                    <View>
                        <Text style={styles.titleText}>车辆详情</Text>
                    </View>
                    <View style={styles.imageFoot}>
                        {/*<Image source={require('../../../images/carSourceImages/sort@2x.png')}></Image>*/}
                        <Image style={{marginLeft:5}} source={require('../../../images/carSourceImages/browse@2x.png')}></Image>
                    </View>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({

    container:{

        flex:1,
        height:64,
        backgroundColor:fontAndColor.COLORB0,

    },
    content:{

        marginTop:20,
        height:44,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    backIcon:{

        marginLeft:12,
        height:30,
        width:30,
        backgroundColor:'red',
    },
    titleText:{
        color:'white',
        fontSize:fontAndColor.BUTTONFONT,
    },
    imageFoot:{

        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginRight:12,

    },

})