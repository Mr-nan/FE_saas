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

            <View style={{flex:1}}>
                <View style={styles.container}>
                    <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                        <SelectButton title="车型"/>
                        <SelectButton title="车龄"/>
                        <SelectButton title="里程"/>
                    </View>
                    <View style={{width:1,justifyContent:'center'}}>
                        <View style={{height:15,backgroundColor:'#C3C3C3'}}/>
                    </View>
                    <View style={{marginLeft:10,justifyContent:'center'}}>
                        <Text style={{color:'#FDB800'}}>282221</Text>
                    </View>
                    <View style={{ marginRight:15,justifyContent:'center'}}>
                        <Text>辆</Text>
                    </View>

                </View>
                <View style={{borderBottomWidth:2,borderColor:'#EAEAEA'}}/>
            </View>
        )
    }

}

class SelectButton extends  Component{

    btnClick = ()=>{

        alert(this.props.title);

    };
    render(){
        return(
            <TouchableOpacity onPress={this.btnClick}>
            <View style={{width:90,height:40,alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
                    <View>
                        <Text>{this.props.title}</Text>
                    </View>
                    <View style={{marginLeft:5}}>
                        <Image source={require('../../images/carSourceImages/btnIcon@2x.png')}></Image>
                    </View>
            </View>
            </TouchableOpacity>
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