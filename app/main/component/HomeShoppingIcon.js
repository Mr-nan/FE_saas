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
        this.originData ={leftGap: width-Pixel.getPixel(62),topGap:height - Pixel.getPixel(105)};
      }


    setMove=(movex,movey)=>{

      if(movex>=width-Pixel.getPixel(62) || movey>=height-Pixel.getPixel(105) || movex<=0||movey<=0)
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

                this.setMove(gestureState.moveX-Pixel.getPixel(31),gestureState.moveY-Pixel.getPixel(31));
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onShouldBlockNativeResponder: (evt, gestureState) => {
                return true;
            },
            onPanResponderEnd:(evt, gestureState)=>{
                if(gestureState.moveX>width/2){
                    this.originData.leftGap= width-Pixel.getPixel(62);

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
            <View style={{position:'absolute',left:this.originData.leftGap,top:this.originData.topGap}} {...this.panResponder.panHandlers}>
                    <Image source={require('../../../images/carSourceImages/gouwucherukou.png')}/>
            </View>
        )
    }
}

