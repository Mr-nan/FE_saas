/**
 * Created by zhengnan on 17/2/8.
 */


import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native';


export default class CarCell extends Component {


    render(){

        return(

            <View style={[styles.container,styles.lineBottom]}>

                <View style={styles.imageView}>
                    <Image style={styles.image}/>
                </View>

                <View style={[styles.textContainer]}>

                    <View style={{backgroundColor:'white'}}>
                        <Text >{this.props.carMainText}</Text>

                    </View>
                    <View style={{backgroundColor:'white'}}>
                        <Text>{this.props.carSubText}</Text>
                    </View>

                </View>

            </View>

        )
    }


}
const styles = StyleSheet.create({

    container:{

        flex:1,
        flexDirection:'row',
        height:110,
        backgroundColor:'gray',

    },

    lineBottom:{

        borderBottomWidth:0.5,
        borderColor:'#fff',

    },


    imageView:{

        width:147,
        justifyContent:'center',
        backgroundColor:'blue'


    },
    image:{

        marginLeft:15,
        width:120,
        height:80,
        backgroundColor:'red',

    },

    textContainer:{

        backgroundColor:'#FF0067',
        flex:1,
        justifyContent:'space-around'
    }



});