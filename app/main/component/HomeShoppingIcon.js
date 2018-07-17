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

import  PixelUtil from '../../utils/PixelUtil'
var Pixel = new PixelUtil();
const {width, height} = Dimensions.get('window');

export default class HomeShoppingIcon extends Component{

      constructor(props) {
        super(props);
        this.state = {
            leftGap: width-Pixel.getPixel(62),
            topGap:height - Pixel.getPixel(105),
        };
      }


    setMove=(movex,movey)=>{

      if(movex>=width-Pixel.getPixel(62) || movey>=height-Pixel.getPixel(105) || movex<=0||movey<=0)
      {
          return;
      }
      this.setState({
          leftGap:movex,
          topGap: movey,
      })
    }

    componentWillMount() {
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
            onPanResponderMove: (evt, gestureState) => {

                this.setMove(gestureState.moveX-Pixel.getPixel(31),gestureState.moveY-Pixel.getPixel(31));
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onShouldBlockNativeResponder: (evt, gestureState) => {
                return true;
            },
            onPanResponderEnd:(evt, gestureState)=>{

                if(gestureState.moveX>width/2){
                    this.setState({
                        leftGap:width-Pixel.getPixel(62),
                    })
                }else {
                    this.setState({
                        leftGap:0,
                    })
                }

            }

        })
    }

    render(){
        return(
            <View style={{position:'absolute',left:this.state.leftGap,top:this.state.topGap}} {...this.panResponder.panHandlers}>
                <TouchableOpacity onPress={this.props.click}>
                    <Image source={require('../../../images/carSourceImages/gouwucherukou.png')}/>
                </TouchableOpacity>
            </View>
        )
    }
}

