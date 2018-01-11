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
            topTop: new Animated.Value(Pixel.getTitlePixel(40)),
            bottomWidth: new Animated.Value(Pixel.getPixel(306)),
            bottomHeight: new Animated.Value(Pixel.getPixel(35)),
            bottomLeft: new Animated.Value(Pixel.getPixel(35)),
            bottomTop: new Animated.Value(Pixel.getTitlePixel(196))
        };
    }

    componentWillMount() {

    }

    render() {
        console.log('123');
        console.log(this.state.topLeft);
        return (
            <View style={{backgroundColor:'#fff',width:width,height:Pixel.getTitlePixel(235)}}>
                <Animated.Image style={{width:this.state.topWidth,
                    height:this.state.topHeight,resizeMode:'stretch',
                position: 'absolute',top:this.state.topTop,
                left:this.state.topLeft}}
                                source={require('../../../images/financeImages/jinrongbeijingqian.png')}
                >
                    <FinanceHeaderTop onPress={()=>{
                            this.changeBottom(1);
                        }}  ref="tops" type={1}/>
                </Animated.Image>
                    <Animated.Image style={{width:this.state.bottomWidth,
                    height:this.state.bottomHeight,resizeMode:'stretch',
                position: 'absolute',
                top:this.state.bottomTop,left:this.state.bottomLeft}}
                                    source={require('../../../images/financeImages/jinrongbeijinghou.png')}>
                        <FinanceHeaderTop onPress={()=>{
                            this.changeBottom(2);
                        }} ref="bottoms" type={2}/>
                    </Animated.Image>
            </View>
        );
    }

    changeBottom = (from) => {
        console.log(this.state.topWidth._value+'------------'+from);
        if (this.state.topWidth._value == Pixel.getPixel(306) && from == 1) {
            console.log('aaaa');
            Animated.parallel([
                Animated.timing(          // Uses easing functions
                    this.state.topWidth,    // The value to drive
                    {
                        toValue: Pixel.getPixel(330),
                        duration: 700
                    },
                ), Animated.timing(          // Uses easing functions
                    this.state.topHeight,    // The value to drive
                    {
                        toValue: Pixel.getPixel(170),
                        duration: 720
                    },
                ), Animated.timing(          // Uses easing functions
                    this.state.topLeft,    // The value to drive
                    {
                        toValue: Pixel.getPixel(22),
                        duration: 700
                    },
                ), Animated.timing(          // Uses easing functions
                    this.state.topTop,    // The value to drive
                    {
                        toValue: Pixel.getTitlePixel(40),
                        duration: 700
                    },
                ),
                Animated.timing(          // Uses easing functions
                    this.state.bottomWidth,    // The value to drive
                    {
                        toValue: Pixel.getPixel(306),
                        duration: 700
                    },
                ), Animated.timing(          // Uses easing functions
                    this.state.bottomHeight,    // The value to drive
                    {
                        toValue: Pixel.getPixel(35),
                        duration: 720
                    },
                ), Animated.timing(          // Uses easing functions
                    this.state.bottomLeft,    // The value to drive
                    {
                        toValue: Pixel.getPixel(35),
                        duration: 700
                    },
                ), Animated.timing(          // Uses easing functions
                    this.state.bottomTop,    // The value to drive
                    {
                        toValue: Pixel.getTitlePixel(196),
                        duration: 700
                    },
                )
            ]).start();
            this.refs.tops.changeType(1);
            this.refs.bottoms.changeType(2);
        } else if (this.state.topWidth._value == Pixel.getPixel(330) && from == 2) {
            console.log('bbb');
            Animated.parallel([
                Animated.timing(          // Uses easing functions
                    this.state.topWidth,    // The value to drive
                    {
                        toValue: Pixel.getPixel(306),
                        duration: 700
                    },
                ), Animated.timing(          // Uses easing functions
                    this.state.topHeight,    // The value to drive
                    {
                        toValue: Pixel.getPixel(35),
                        duration: 720
                    },
                ), Animated.timing(          // Uses easing functions
                    this.state.topLeft,    // The value to drive
                    {
                        toValue: Pixel.getPixel(35),
                        duration: 700
                    },
                ), Animated.timing(          // Uses easing functions
                    this.state.topTop,    // The value to drive
                    {
                        toValue: Pixel.getTitlePixel(196),
                        duration: 700
                    },
                ),
                Animated.timing(          // Uses easing functions
                    this.state.bottomWidth,    // The value to drive
                    {
                        toValue: Pixel.getPixel(330),
                        duration: 700
                    },
                ), Animated.timing(          // Uses easing functions
                    this.state.bottomHeight,    // The value to drive
                    {
                        toValue: Pixel.getPixel(170),
                        duration: 720
                    },
                ), Animated.timing(          // Uses easing functions
                    this.state.bottomLeft,    // The value to drive
                    {
                        toValue: Pixel.getPixel(22),
                        duration: 700
                    },
                ), Animated.timing(          // Uses easing functions
                    this.state.bottomTop,    // The value to drive
                    {
                        toValue: Pixel.getTitlePixel(40),
                        duration: 700
                    },
                )
            ]).start();
            this.refs.tops.changeType(2);
            this.refs.bottoms.changeType(1);
        }
    }
}
