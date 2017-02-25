/**
 * Created by Administrator on 2017/2/10.
 */
import React, {Component} from 'react';
import {
    View,
    Image,
    Text,
    TextInput,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    InteractionManager
} from 'react-native';

import * as fontAndColor from '../../constant/fontAndColor';
import AllNavigationView from '../../component/AllNavigationView';
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();

const {width, height} = Dimensions.get('window');
const background = require('../../../images/publish/background.png');

export default class AutoOther extends Component {

    constructor(props) {
        super(props);
        this.state = {
            renderPlaceholderOnly: true
        }
    }

    componentWillMount() {

    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: false});
        });
    }

    componentWillUnmount() {

    }

    _renderPlaceholderView = () => {
        return (<Image style={[styles.img,{height:height-this.props.barHeight}]} source={background}/>);
    };

    _onBack = () => {
        this.props.onBack();
    };

    _renderRihtFootView = () => {
        return (
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={()=>{this.props.publishData()}}>
                <Text style={styles.rightTitleText}>完成</Text>
            </TouchableOpacity>
        );
    };

    render() {
        if (this.state.renderPlaceholderOnly) {
            return this._renderPlaceholderView();
        }
        return (
            <View style={styles.container}>
                <Image style={[styles.img,{height:height-this.props.barHeight}]} source={background}>
                    <AllNavigationView
                        backIconClick={this._onBack}
                        title='其他信息'
                        wrapStyle={styles.wrapStyle}
                        renderRihtFootView={this._renderRihtFootView}/>
                    <View style={[styles.rectangleContainer,styles.firstMargin]}>
                        <Text style={[styles.fontMain,styles.leftText]}>销售价：</Text>
                        <TextInput style={[styles.fontMain,styles.leftInput,styles.fillSpace]}
                                   underlineColorAndroid='transparent'/>
                        <Text style={[styles.fontMain,styles.rightText]}>万元</Text>
                    </View>
                    <View style={[styles.rectangleContainer,styles.alignMargin]}>
                        <Text style={[styles.fontMain,styles.leftText]}>车况描述：</Text>
                        <TextInput style={[styles.fontMain,styles.leftInput,styles.fillSpace]}
                                   underlineColorAndroid='transparent'/>
                    </View>
                </Image>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: width,
        backgroundColor: 'transparent',
    },
    img: {
        width: width,
        backgroundColor: 'transparent',
        alignItems: 'center'
    },
    rectangleContainer: {
        width: Pixel.getPixel(317),
        height: Pixel.getPixel(44),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderColor: '#FFFFFF',
        borderWidth: 1,
        borderRadius: Pixel.getPixel(2)
    },
    fontMain: {
        fontSize: Pixel.getFontPixel(15),
        color: '#FFFFFF'
    },
    firstMargin: {
        marginTop: Pixel.getPixel(205)
    },
    alignMargin: {
        marginTop: Pixel.getPixel(40)
    },
    leftText: {
        marginLeft: Pixel.getPixel(10)
    },
    rightText: {
        marginRight: Pixel.getPixel(10)
    },
    leftInput: {
        marginLeft: Pixel.getPixel(20)
    },
    fillSpace: {
        flex: 1,
    },
    imgContainer: {
        width: Pixel.getPixel(9),
        height: Pixel.getPixel(15)
    },
    wrapStyle: {
        backgroundColor: 'transparent'
    },
    rightTitleText: {
        color: 'white',
        fontSize: Pixel.getFontPixel(fontAndColor.NAVIGATORFONT34),
        textAlign: 'right',
        backgroundColor: 'transparent'
    }
});
