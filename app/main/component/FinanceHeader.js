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
import PixelUtil from '../../utils/PixelUtil'
import * as fontAndColor from '../../constant/fontAndColor'
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
            topTop: new Animated.Value(Pixel.getPixel(5)),
            bottomWidth: new Animated.Value(Pixel.getPixel(306)),
            bottomHeight: new Animated.Value(Pixel.getPixel(35)),
            bottomLeft: new Animated.Value(Pixel.getPixel(35)),
            bottomTop: new Animated.Value(Pixel.getPixel(161))
        };
    }


    render() {
        return (
            <View style={{backgroundColor: 'white', width: width, height: Pixel.getPixel(215)}}>
                <Animated.Image style={{
                    width: this.state.topWidth,
                    height: this.state.topHeight, resizeMode: 'stretch',
                    position: 'absolute', top: this.state.topTop,
                    left: this.state.topLeft
                }}
                                source={require('../../../images/financeImages/jinrongbeijingqian3.png')}
                >
                    <FinanceHeaderTop onPress={() => {
                        this.changeBottom(1);
                    }}
                                      ref="tops"
                                      type={1}
                                      allData={this.props.allData1}
                                      depositPop={()=>{this.props.depositPop()}}
                                      creditPop={()=>{this.props.creditPop()}}
                                      balancePop={()=>{this.props.balancePop()}}
                                      weizongPop={()=>{this.props.weizongPop()}}
                    />
                </Animated.Image>
                {global.ISCOMPANY!==0&&<Animated.Image style={{
                    width: this.state.bottomWidth,
                    height: this.state.bottomHeight, resizeMode: 'stretch',
                    position: 'absolute',
                    top: this.state.bottomTop, left: this.state.bottomLeft
                }}
                                source={require('../../../images/financeImages/jinrongbeijinghou3.png')}>
                    <FinanceHeaderTop onPress={() => {
                        this.changeBottom(2);}}
                                      ref="bottoms" type={2}
                                      allData={this.props.allData1}
                                      depositPop={()=>{this.props.depositPop()}}
                                      creditPop={()=>{this.props.creditPop()}}
                                      balancePop={()=>{this.props.balancePop()}}
                                      weizongPop={()=>{this.props.weizongPop()}}
                    />
                </Animated.Image>}
            </View>
        );
    }

    changeBottom = (from) => {
        if (this.state.topWidth._value == Pixel.getPixel(306) && from == 1) {
            Animated.parallel([
                Animated.timing(          // Uses easing functions
                    this.state.topWidth,    // The value to drive
                    {
                        toValue: Pixel.getPixel(330),
                        duration: 600
                    },
                ), Animated.timing(          // Uses easing functions
                    this.state.topHeight,    // The value to drive
                    {
                        toValue: Pixel.getPixel(170),
                        duration: 620
                    },
                ), Animated.timing(          // Uses easing functions
                    this.state.topLeft,    // The value to drive
                    {
                        toValue: Pixel.getPixel(22),
                        duration: 600
                    },
                ), Animated.timing(          // Uses easing functions
                    this.state.topTop,    // The value to drive
                    {
                        toValue: Pixel.getPixel(5),
                        duration: 600
                    },
                ),
                Animated.timing(          // Uses easing functions
                    this.state.bottomWidth,    // The value to drive
                    {
                        toValue: Pixel.getPixel(306),
                        duration: 600
                    },
                ), Animated.timing(          // Uses easing functions
                    this.state.bottomHeight,    // The value to drive
                    {
                        toValue: Pixel.getPixel(35),
                        duration: 620
                    },
                ), Animated.timing(          // Uses easing functions
                    this.state.bottomLeft,    // The value to drive
                    {
                        toValue: Pixel.getPixel(35),
                        duration: 600
                    },
                ), Animated.timing(          // Uses easing functions
                    this.state.bottomTop,    // The value to drive
                    {
                        toValue: Pixel.getPixel(161),
                        duration: 600
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
                        duration: 600
                    },
                ), Animated.timing(          // Uses easing functions
                    this.state.topHeight,    // The value to drive
                    {
                        toValue: Pixel.getPixel(35),
                        duration: 620
                    },
                ), Animated.timing(          // Uses easing functions
                    this.state.topLeft,    // The value to drive
                    {
                        toValue: Pixel.getPixel(35),
                        duration: 600
                    },
                ), Animated.timing(          // Uses easing functions
                    this.state.topTop,    // The value to drive
                    {
                        toValue: Pixel.getPixel(161),
                        duration: 600
                    },
                ),
                Animated.timing(          // Uses easing functions
                    this.state.bottomWidth,    // The value to drive
                    {
                        toValue: Pixel.getPixel(330),
                        duration: 600
                    },
                ), Animated.timing(          // Uses easing functions
                    this.state.bottomHeight,    // The value to drive
                    {
                        toValue: Pixel.getPixel(170),
                        duration: 620
                    },
                ), Animated.timing(          // Uses easing functions
                    this.state.bottomLeft,    // The value to drive
                    {
                        toValue: Pixel.getPixel(22),
                        duration: 600
                    },
                ), Animated.timing(          // Uses easing functions
                    this.state.bottomTop,    // The value to drive
                    {
                        toValue: Pixel.getPixel(5),
                        duration: 600
                    },
                )
            ]).start();
            this.refs.tops.changeType(2);
            this.refs.bottoms.changeType(1);
        }
    }
}
