/**
 * Created by zhengnan on 2018/7/17.
 */

import React,{Component} from 'react';
import {
    Image,
    TouchableOpacity,
    View,
    StyleSheet,
    Dimensions,
    Animated,
    PanResponder
} from 'react-native';

import {observable} from 'mobx';
import {observer} from 'mobx-react/native';
import  PixelUtil from '../../utils/PixelUtil';
var Pixel = new PixelUtil();
const {width, height} = Dimensions.get('window');


@observer
export default class HomeShoppingIcon extends Component{



     @observable originData = {};

      constructor(props) {
        super(props);
        this.width = width;
        this.height = height - Pixel.getBottomPixel(0);
          this.originData ={leftGap: this.width-Pixel.getPixel(48),topGap:this.height - Pixel.getPixel(105)};
      }


    setMove=(movex,movey)=>{

      if(movex>=this.width-Pixel.getPixel(48) || movey>=this.height-Pixel.getPixel(105) || movex<=0||movey<=0)
      {
          return;
      }
      this.originData={
          leftGap:movex,
          topGap: movey,
      }


    }

    componentWillMount() {
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => false,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
            onMoveShouldSetPanResponder: (evt, gestureState) => {

                return true;
            },
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderMove: (evt, gestureState) => {

                this.setMove(gestureState.moveX-Pixel.getPixel(24),gestureState.moveY-Pixel.getPixel(24));
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onShouldBlockNativeResponder: (evt, gestureState) => {
                return true;
            },
            onPanResponderEnd:(evt, gestureState)=>{
                if(gestureState.moveX>width/2){
                    this.originData.leftGap= width-Pixel.getPixel(48);

                }else {
                    this.originData.leftGap= 0;
                }

                if (gestureState.dx === 0 || gestureState.dy === 0) {
                    this.props.click();
                }


            }
        });

    }

    render(){
        return(
            <TouchableOpacity style={{position:'absolute',left:this.originData.leftGap,top:this.originData.topGap}}
                              onPress={this.props.click}>
                    <Image source={require('../../../images/mainImage/kefu.png')}/>
            </TouchableOpacity>
        )
    }
}

