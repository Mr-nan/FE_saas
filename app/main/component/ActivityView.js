/**
 * Created by zhengnan on 2018/8/22.
 *
 * 老带新活动弹出窗
 *
 */

import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Modal,
    Image,

} from  'react-native';

import {observable} from 'mobx';
import {observer} from 'mobx-react'
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();


@observer
export default class ActivityView extends Component{

      constructor(props) {
        super(props);
        this.state = {
            visible:false,
            contentData:{}
        };

      }

    render(){
        return(
            <Modal visible={this.state.visible} transparent={true} onChangeVisibleRows={()=>{this.setVisible(false)}}>
                <View style={styles.root}>
                    <View style={{alignItems:'center',paddingBottom:Pixel.getPixel(20)}}>
                        <Image source={{uri:this.state.contentData.img_url}} style={{justifyContent:'flex-end', alignItems:'center'}}>
                            <TouchableOpacity style={{height:Pixel.getPixel(45),width:Pixel.getPixel(250)}} activeOpacity={1} onPress={()=>{
                                this.props.click && this.props.click(this.state.contentData);
                                this.setState({visible:false});
                            }}/>
                        </Image>
                        <TouchableOpacity activeOpacity={1} onPress={()=>{this.setVisible(false)}}>
                            <Image source={require('../../../images/login/guanbi-xx.png')} style={{marginTop:Pixel.getPixel(30)}}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }

    setVisible=(contentData)=>{
        this.setState({
            contentData:contentData,
            visible:true,
        })
    }

}


const  styles = StyleSheet.create({
    root:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,0.6)',

    }
})
