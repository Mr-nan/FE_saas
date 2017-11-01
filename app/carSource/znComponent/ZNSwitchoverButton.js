/**
 * Created by zhengnan on 2017/10/30.
 */


import  React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
} from 'react-native';

import * as fontAndColor    from '../../constant/fontAndColor';
import PixelUtil  from '../../utils/PixelUtil';
let Pixel = new PixelUtil();


 export default class  ZNSwitchoverButton extends  Component {

     // 构造
     constructor(props) {
         super(props);
         this.state = {};

     }

    render(){
        return(
            <View style={styles.contaier}>
                <ZNButton ref={(ref)=>{this.userCarBtn = ref}} title="二手车" isSelect={true} click={this.click}/>
                <ZNButton ref={(ref)=>{this.newCarBtn = ref}} title="新车"  isSelect={false} click={this.click}/>
            </View>
        )
    }

    click=(title)=>{

       this.userCarBtn.setSelect();
       this.newCarBtn.setSelect();
    }

}

class ZNButton extends  Component {

     // 构造
       constructor(props) {
         super(props);
         // 初始状态
         this.state = {
             isSelect:this.props.isSelect
         };
       }

       setSelect=()=>{
           this.setState({
               isSelect:!this.state.isSelect,
           })
       }

     render(){
         return(
             <TouchableOpacity style={[styles.textView,this.state.isSelect && { backgroundColor:fontAndColor.COLORB0}]}
                               onPress={this.click}>
                 <Text style={[styles.text,this.state.isSelect && {color:'white'}] }>{this.props.title}</Text>
             </TouchableOpacity>
         )
     }
     click=()=>{
         if(!this.state.isSelect){
             this.props.click(this.props.title);
         }

     }
}

const  styles = StyleSheet.create({
   contaier:{
       flexDirection:'row',
       borderWidth:Pixel.getPixel(1),
       borderColor:'white',
       borderRadius:Pixel.getPixel(4),
       overflow:'hidden',

   },
    textView:{
        height:Pixel.getPixel(28),
        width:Pixel.getPixel(64),
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        overflow:'hidden',

    },
    text:{
        fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        color:fontAndColor.COLORB0,
        fontWeight:'bold'
    }

});
