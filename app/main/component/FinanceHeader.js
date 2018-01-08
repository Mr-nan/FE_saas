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
            topWidth: new Animated.Value(Pixel.getPixel(330)),
            topHeight: new Animated.Value(Pixel.getPixel(170)),
            topLeft: new Animated.Value(Pixel.getPixel(22)),
            topTop: new Animated.Value(Pixel.getPixel(20)),
            bottomWidth: new Animated.Value(Pixel.getPixel(306)),
            bottomHeight: new Animated.Value(Pixel.getPixel(35)),
            bottomLeft: new Animated.Value(Pixel.getPixel(35)),
            bottomTop: new Animated.Value(Pixel.getPixel(176))
        };
    }

    componentWillMount() {

    }

    render() {
        console.log('123');
        console.log(this.state.topLeft);
        return (
            <View style={{backgroundColor:'#fff',width:width,height:Pixel.getTitlePixel(215)}}>
                <TouchableOpacity activeOpacity={1} onPress={()=>{
                    this.changeBottom(1);
                }}>
                    <Animated.Image style={{width:this.state.topWidth,
                    height:this.state.topHeight,resizeMode:'stretch',
                position: 'absolute',top:this.state.topTop,
                left:this.state.topLeft}}
                                    source={require('../../../images/financeImages/jinrongbeijingqian.png')}
                    >
                        <FinanceHeaderTop ref="tops" type={1}/>
                    </Animated.Image>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} onPress={()=>{
                    this.changeBottom(2);
                }}>
                    <Animated.Image style={{width:this.state.bottomWidth,
                    height:this.state.bottomHeight,resizeMode:'stretch',
                position: 'absolute',
                top:this.state.bottomTop,left:this.state.bottomLeft}}
                                    source={require('../../../images/financeImages/jinrongbeijinghou.png')}>
                        <FinanceHeaderTop ref="bottoms" type={2}/>
                    </Animated.Image>
                </TouchableOpacity>
            </View>
        );
    }

    changeBottom = (from) => {
        if (this.state.topWidth._value==306 && from == 1) {
            Animated.parallel([
                Animated.timing(          // Uses easing functions
                    this.state.topWidth,    // The value to drive
                    {
                        toValue: Pixel.getPixel(330),
                        duration: 800
                    },
                ), Animated.timing(          // Uses easing functions
                    this.state.topHeight,    // The value to drive
                    {
                        toValue: Pixel.getPixel(170),
                        duration: 820
                    },
                ), Animated.timing(          // Uses easing functions
                    this.state.topLeft,    // The value to drive
                    {
                        toValue: Pixel.getPixel(22),
                        duration: 800
                    },
                ), Animated.timing(          // Uses easing functions
                    this.state.topTop,    // The value to drive
                    {
                        toValue: Pixel.getPixel(20),
                        duration: 800
                    },
                ),
                Animated.timing(          // Uses easing functions
                    this.state.bottomWidth,    // The value to drive
                    {
                        toValue: Pixel.getPixel(306),
                        duration: 800
                    },
                ), Animated.timing(          // Uses easing functions
                    this.state.bottomHeight,    // The value to drive
                    {
                        toValue: Pixel.getPixel(35),
                        duration: 820
                    },
                ), Animated.timing(          // Uses easing functions
                    this.state.bottomLeft,    // The value to drive
                    {
                        toValue: Pixel.getPixel(35),
                        duration: 800
                    },
                ), Animated.timing(          // Uses easing functions
                    this.state.bottomTop,    // The value to drive
                    {
                        toValue: Pixel.getPixel(176),
                        duration: 800
                    },
                )
            ]).start();
            this.refs.tops.changeType(1);
            this.refs.bottoms.changeType(2);
        } else if (this.state.topWidth._value==330 && from == 2) {
            Animated.parallel([
                Animated.timing(          // Uses easing functions
                    this.state.topWidth,    // The value to drive
                    {
                        toValue: Pixel.getPixel(306),
                        duration: 800
                    },
                ), Animated.timing(          // Uses easing functions
                    this.state.topHeight,    // The value to drive
                    {
                        toValue: Pixel.getPixel(35),
                        duration: 820
                    },
                ), Animated.timing(          // Uses easing functions
                    this.state.topLeft,    // The value to drive
                    {
                        toValue: Pixel.getPixel(35),
                        duration: 800
                    },
                ), Animated.timing(          // Uses easing functions
                    this.state.topTop,    // The value to drive
                    {
                        toValue: Pixel.getPixel(176),
                        duration: 800
                    },
                ),
                Animated.timing(          // Uses easing functions
                    this.state.bottomWidth,    // The value to drive
                    {
                        toValue: Pixel.getPixel(330),
                        duration: 800
                    },
                ), Animated.timing(          // Uses easing functions
                    this.state.bottomHeight,    // The value to drive
                    {
                        toValue: Pixel.getPixel(170),
                        duration: 820
                    },
                ), Animated.timing(          // Uses easing functions
                    this.state.bottomLeft,    // The value to drive
                    {
                        toValue: Pixel.getPixel(22),
                        duration: 800
                    },
                ), Animated.timing(          // Uses easing functions
                    this.state.bottomTop,    // The value to drive
                    {
                        toValue: Pixel.getPixel(20),
                        duration: 800
                    },
                )
            ]).start();
            this.refs.tops.changeType(2);
            this.refs.bottoms.changeType(1);
        }
    }
}
