import React, {Component, PureComponent} from 'react';
import {
    AppRegistry,
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    PanResponder,
} from 'react-native';

let {height, width} = Dimensions.get('window');
import  PixelUtil from '../utils/PixelUtil'
var Pixel = new PixelUtil();
export default class CustomerServiceButton extends PureComponent {

    constructor(props) {
        super(props);
        this.oldTop = height-Pixel.getPixel(48)-Pixel.getPixel(100);
        this.oldLeft = width-Pixel.getPixel(48)-Pixel.getPixel(15);
        this.viewStyle = {
            style: {
                top: this.oldTop, left: this.oldLeft
            }
        }

        this.circle = (null : ?{setNativeProps(props: Object): void})

    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            // 要求成为响应者：
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

            onPanResponderGrant: (evt, gestureState) => {

            },
            onPanResponderMove: (e, gestureState) => {

                let locationX = gestureState.dx + this.oldLeft;
                let locationY = gestureState.dy + this.oldTop;
                if (locationX < 0) {
                    locationX = 0;
                }
                if ((locationX+this.layout.layout.width) > width) {
                    locationX = width-this.layout.layout.width;
                }
                if (locationY < 0) {
                    locationY = 0;
                }
                if ((locationY+this.layout.layout.height) > height) {
                    locationY = height-this.layout.layout.height;
                }
                this.viewStyle.style.left = locationX;
                this.viewStyle.style.top = locationY;
                this.circle && this.circle.setNativeProps(this.viewStyle);
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                this.oldTop += gestureState.dy;
                this.oldLeft += gestureState.dx;
            },
            onPanResponderTerminate: (evt, gestureState) => {

            },
            onShouldBlockNativeResponder: (evt, gestureState) => {

                return true;
            },
        });
    }

    render() {
        return (
            <Image source={require('../../images/mainImage/customerServiceButton.png')}
                   ref={(circle) => {this.circle = circle;
                }}  {...this._panResponder.panHandlers} style={styles.circle}
                  onLayout={({nativeEvent:e})=>{this.layout = e}}
            />

        );
    }
}
var styles = StyleSheet.create({
    circle: {
        position: 'absolute', height: Pixel.getPixel(48),
        width: Pixel.getPixel(48), top: height-Pixel.getPixel(48)-Pixel.getPixel(100),
        left: width-Pixel.getPixel(48)-Pixel.getPixel(15),
        resizeMode:'stretch'
    }
});