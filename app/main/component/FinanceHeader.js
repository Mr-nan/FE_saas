import React, {Component, PureComponent} from 'react';
import {
    AppRegistry,
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    Animated
} from 'react-native';

let {height, width} = Dimensions.get('window');
import  PixelUtil from '../../utils/PixelUtil'
import  * as fontAndColor from '../../constant/fontAndColor'
import FinanceHeaderTop from './FinanceHeaderTop';
import FinanceHeaderBottom from './FinanceHeaderBottom';
var Pixel = new PixelUtil();
export default class FinanceHeader extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            scale1: new Animated.Value(1),
            scale2: new Animated.Value(1),
            scale3: new Animated.Value(1),
            scale4: new Animated.Value(1),
        };
    }

    componentWillMount() {

    }

    render() {
        console.log('123');
        let topView = {};
        let bottomView = {};
        return (
            <View style={{backgroundColor:'#fff',width:width,height:Pixel.getTitlePixel(215)}}>
                <TouchableOpacity activeOpacity={1} onPress={()=>{
                    this.changeBottom(1);
                }}>
                    <Animated.Image style={{width:Pixel.getPixel(330),
                    height:Pixel.getPixel(170),resizeMode:'stretch',
                position: 'absolute',
                transform:[{scaleY: this.state.scale4},{
                    scaleX: this.state.scale3
                },{
                    translateX: this.state.scale1.interpolate({
                 inputRange: [1, 1.0785],
                 outputRange: [Pixel.getPixel(22), Pixel.getPixel(22)]  // 0 : 150, 0.5 : 75, 1 : 0
                })
                },{
                    translateY: this.state.scale1.interpolate({
                 inputRange: [1, 1.0785],
                 outputRange: [Pixel.getPixel(20), Pixel.getPixel(525)]  // 0 : 150, 0.5 : 75, 1 : 0
                })
                }]}}
                                    source={require('../../../images/financeImages/jinrongbeijingqian.png')}
                    ><FinanceHeaderTop ref="tops" type={1}/></Animated.Image>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} onPress={()=>{
                    this.changeBottom(2);
                }}>
                    <Animated.Image style={{width:Pixel.getPixel(306),
                    height:Pixel.getPixel(35),resizeMode:'stretch',
                position: 'absolute',
                transform:[{scaleY: this.state.scale2},{
                    scaleX: this.state.scale1
                },{
                    translateX: this.state.scale1.interpolate({
                 inputRange: [1, 1.0785],
                 outputRange: [Pixel.getPixel(35), Pixel.getPixel(31)]  // 0 : 150, 0.5 : 75, 1 : 0
                })
                },{
                    translateY: this.state.scale1.interpolate({
                 inputRange: [1, 1.0785],
                 outputRange: [Pixel.getPixel(176), Pixel.getPixel(18)]  // 0 : 150, 0.5 : 75, 1 : 0
                })
                }]}} source={require('../../../images/financeImages/jinrongbeijinghou.png')}>
                        <FinanceHeaderTop ref="bottoms" type={2}/>
                    </Animated.Image>
                </TouchableOpacity>
            </View>
        );
    }

    changeBottom = (from) => {
        if (this.state.scale1._value == 1.0785 && from == 1) {
            Animated.parallel([
                Animated.timing(          // Uses easing functions
                    this.state.scale1,    // The value to drive
                    {
                        toValue: 1,
                        duration: 800
                    },
                ), Animated.timing(          // Uses easing functions
                    this.state.scale2,    // The value to drive
                    {
                        toValue: 1,
                        duration: 800
                    },
                ), Animated.timing(          // Uses easing functions
                    this.state.scale3,    // The value to drive
                    {
                        toValue: 1,
                        duration: 800
                    },
                ), Animated.timing(          // Uses easing functions
                    this.state.scale4,    // The value to drive
                    {
                        toValue: 1,
                        duration: 820
                    },
                )
            ]).start();
            this.refs.tops.changeType(1);
            this.refs.bottoms.changeType(2);
        } else if (this.state.scale1._value == 1 && from == 2) {
            Animated.parallel([
                Animated.timing(          // Uses easing functions
                    this.state.scale1,    // The value to drive
                    {
                        toValue: 1.0785,
                        duration: 800
                    },
                ), Animated.timing(          // Uses easing functions
                    this.state.scale2,    // The value to drive
                    {
                        toValue: 4.86,
                        duration: 820
                    },
                ), Animated.timing(          // Uses easing functions
                    this.state.scale3,    // The value to drive
                    {
                        toValue: 0.93,
                        duration: 800
                    },
                ), Animated.timing(          // Uses easing functions
                    this.state.scale4,    // The value to drive
                    {
                        toValue: 0.21,
                        duration: 800
                    },
                )
            ]).start();
            this.refs.tops.changeType(2);
            this.refs.bottoms.changeType(1);
        }
    }
}
