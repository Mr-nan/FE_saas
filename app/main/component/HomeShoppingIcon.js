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
    PanResponder,
    TouchableHighlight,
    Platform

} from 'react-native';

import {observable} from 'mobx';
import {observer} from 'mobx-react/native';
import  PixelUtil from '../../utils/PixelUtil';
var Pixel = new PixelUtil();
const {width, height} = Dimensions.get('window');
const IS_ANDROID = Platform.OS === 'android';


@observer
export default class HomeShoppingIcon extends Component{



     @observable originData = {};

      constructor(props) {
        super(props);
        this.width = width;
        this.height = height - Pixel.getBottomPixel(0);
          this.originData ={leftGap: this.width-Pixel.getPixel(50),topGap:height-Pixel.getPixel(150)};
      }


    setMove=(movex,movey)=>{

      if(movex>=this.width-Pixel.getPixel(50) || movey>=this.height-Pixel.getPixel(125) || movex<=0||movey<=0)
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
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
            onMoveShouldSetPanResponder: (evt, gestureState) =>
            Math.abs(gestureState.dx) > 50 && Math.abs(gestureState.dy) <= 50,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderMove: (evt, gestureState) => {

                this.setMove(gestureState.moveX-Pixel.getPixel(24),gestureState.moveY-Pixel.getPixel(24));
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onShouldBlockNativeResponder: (evt, gestureState) => {
                return false;
            },
            onPanResponderEnd:(evt, gestureState)=>{
                if(gestureState.moveX>width/2){
                    this.originData.leftGap= width-Pixel.getPixel(50);

                }else {
                    this.originData.leftGap= 0;
                }

                // if (gestureState.dx === 0 || gestureState.dy === 0) {
                //     this.props.click();
                // }


            }
        });

    }

    render(){
        return(
            <View style={{position:'absolute',left:this.originData.leftGap,top:this.originData.topGap}} {...this.panResponder.panHandlers}>
                {
                    IS_ANDROID ? (
                            <TouchableOpacity style={{
                                width: Pixel.getPixel(50),
                                height: Pixel.getPixel(50),
                                alignItems: 'center',
                                justifyContent: 'center'
                            }} onPress={this.props.click}>
                                <Image source={require('../../../images/mainImage/kefu.png')}/>
                            </TouchableOpacity>
                        ) : (
                            <TouchableHighlight style={{
                                width: Pixel.getPixel(50),
                                height: Pixel.getPixel(50),
                                alignItems: 'center',
                                justifyContent: 'center'
                            }} onPress={this.props.click} underlayColor={'transparent'}>
                                <Image source={require('../../../images/mainImage/kefu.png')}/>
                            </TouchableHighlight>
                        )
                }

            </View>
        )
    }
}

