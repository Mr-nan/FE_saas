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
        this.buttonArray = [];
        return(
            <View style={styles.contaier} >
                {
                    this.props.titleArray.map((data,index)=>{

                        return(
                            <ZNButton ref={(ref)=>{ ref && this.buttonArray.push(ref)}}
                                      title={data}
                                      isSelect={index==this.props.defaultIndex?true:false}
                                      key={index} click={this.click}
                                      index={index}/>
                        )
                    })
                }
            </View>
        )
    }

    click=(title,index)=>{

        this.props.switchoverAction(title,index);

        for(let tmpBtn of this.buttonArray){

         tmpBtn && tmpBtn.setSelect();
      }
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
             this.props.click(this.props.title,this.props.index);
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
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        overflow:'hidden',
        paddingHorizontal:Pixel.getPixel(28),

    },
    text:{
        fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        color:fontAndColor.COLORB0,
        fontWeight:'bold'
    }

});
