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
            leftGap: 0,
            topGap:0,
        };
      }

    startAnimation =(movex,movey)=>{
        Animated.timing(
            this.state.rightGap,
            {
                toValue:-Pixel.getPixel(movex),
                duration:100,


            },
            this.state.bottomGap,
            {
                toValue:-Pixel.getPixel(movey),
                duration:100,


            }
        ).start();
    }

    setMove=(movex,movey)=>{

          console.log('=======',movex,'=======',movey);
      this.setState({
          leftGap:movex,
          topGap:movey,
      })
    }

    componentWillMount() {
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderMove: (evt, gestureState) => {

                this.setMove(gestureState.moveX,gestureState.moveY);
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onShouldBlockNativeResponder: (evt, gestureState) => {
                return true;
            },

        })
    }

    render(){
        return(
            <View style={{position:'absolute',left:this.state.leftGap,top:this.state.topGap}} {...this.panResponder}>
                    <Image source={require('../../../images/carSourceImages/gouwucherukou.png')}/>
            </View>
        )
    }
}

