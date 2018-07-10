/**
 * Created by zhengnan on 2018/7/10.
 */

import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Modal,
    Text,
    Image,
    TouchableOpacity,

} from 'react-native';

import * as fontAndColor from '../../../constant/fontAndColor';
import  PixelUtil from '../../../utils/PixelUtil'
import  ZNTextInputView from './ZNTextInputView';
var Pixel = new PixelUtil();


export default class RefuseCauseShowView extends Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            modalVisible:false,
        };
      }

      setModalVisible=(visible)=>{
          this.setState({
              modalVisible:visible
          })
      }

      showModal=()=>{
          this.setModalVisible(true);
      }

      overModal=()=>{
          this.setModalVisible(false);
      }

    render(){
        return(
            <Modal transparent={true}
                   visible={this.state.modalVisible}
                   onRequestClose={()=>{this.setModalVisible(false)}}>
                <View style={styles.root}>
                        <View style={{width:Pixel.getPixel(280),height:Pixel.getPixel(230),backgroundColor:'white',alignItems:'center',justifyContent:'center',borderRadius:Pixel.getPixel(5)}}>
                            <View>
                                <ZNTextInputView style={{width:Pixel.getPixel(240),height:Pixel.getPixel(110)}}
                                                 placeholderText="请填写拒绝退款原因"
                                                 maxLine={36} />
                                <View style={{flexDirection:'row',justifyContent:'center'}}>
                                    <TouchableOpacity onPress={this.overModal}>
                                        <View style={{width:Pixel.getPixel(100),
                                            height:Pixel.getPixel(30),
                                            marginRight:Pixel.getPixel(20),backgroundColor:fontAndColor.COLORA2,borderRadius:Pixel.getPixel(2),
                                            alignItems:'center',justifyContent:'center'
                                        }}>
                                            <Text style={{color:'white', fontSize:fontAndColor.LITTLEFONT28}}>取消</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <View style={{width:Pixel.getPixel(100),
                                            height:Pixel.getPixel(30),
                                            backgroundColor:fontAndColor.COLORB0,
                                            borderRadius:Pixel.getPixel(2),
                                            alignItems:'center',justifyContent:'center'
                                        }}>
                                            <Text style={{color:'white', fontSize:fontAndColor.LITTLEFONT28}}>确定</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Image style={{left:Pixel.getPixel(60),top:-Pixel.getPixel(50),position: 'absolute',width:Pixel.getPixel(160),height:Pixel.getPixel(87)}}
                                   source={require('../../../../images/neworder/qianbi.png')}/>
                            <TouchableOpacity style={{top:Pixel.getPixel(10),right:0,position: 'absolute',
                                paddingHorizontal:Pixel.getPixel(15)
                            }}
                                              onPress={this.overModal}>
                            <Image source={require('../../../../images/carSourceImages/guanbi.png')}/>
                            </TouchableOpacity>
                        </View>
                        </View>
            </Modal>
        )


    }
}

const styles = StyleSheet.create({
    root:{
        flex:1,
        backgroundColor:'rgba(0,0,0,0.3)',
        alignItems:'center',
        paddingTop:Pixel.getTitlePixel(150)
    }
})