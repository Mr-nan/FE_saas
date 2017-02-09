/**
 * Created by zhengnan on 17/2/9.
 */


import React,{Component} from 'react';
import {

    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity

} from 'react-native';

export default class carSourceSelectHeadView extends Component{

    render(){
        return(

            <View style={styles.container}>
                <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'space-between',backgroundColor:'#06C4C2'}}>
                    <SelectButton title="车型"/>
                    <SelectButton title="车龄"/>
                    <SelectButton title="里程"/>
                </View>
                <View style={{width:100,backgroundColor:'orange'}}>
                </View>
            </View>
        )
    }

}

class SelectButton extends  Component{

    render(){
        return(
            <View style={{width:100,height:40,backgroundColor:'red',alignItems:'center',justifyContent:'center'}}>
                <TouchableOpacity onPress={}>
                    <View>
                        <Text>{this.props.title}</Text>
                    </View>
                    <View>
                        <Image></Image>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

}

const  styles = StyleSheet.create({

    container:{

        flex:1,
        flexDirection:'row',
        height:40,

    },




});