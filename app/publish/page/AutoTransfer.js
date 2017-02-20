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

const { width,height } = Dimensions.get('window');
const background = require('../../../images/publish/background.png');
const transferNum = require('../../../images/publish/transfer-num.png');

export default class AutoTransfer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            renderPlaceholderOnly: true
        };
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

    _renderPlaceholderView = ()=>{
        return(<Image style={[styles.img,{height:height-this.props.barHeight}]} source={background} />);
    };

    _onBack = ()=>{

    };

    _renderRihtFootView = ()=>{
        return(
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={()=>{}}>
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
                        title='选择过户次数'
                        wrapStyle={styles.wrapStyle}
                        renderRihtFootView={this._renderRihtFootView} />
                    <Image style={styles.imgContainer} source={transferNum}>
                        <View style={styles.inputContainer}>
                            <TextInput  style={styles.inputNum} underlineColorAndroid='transparent' defaultValue={'2'}/>
                            <View style={styles.timeContainer}>
                                <Text style={styles.fontTime}>次</Text>
                            </View>
                        </View>
                    </Image>
                </Image>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width:width,
        backgroundColor: 'transparent'
    },
    img: {
        width:width,
        backgroundColor: 'transparent',
        alignItems: 'center',
    },
    imgContainer: {
        width: 120,
        height: 120,
        justifyContent: 'center',
        marginTop:225
    },
    inputContainer:{
        flexDirection:'row'
    },
    inputNum:{
        width:60,
        height:60,
        fontSize:38,
        padding:0,
        color:'#FFFFFF',
        textAlign:'right'
    },
    timeContainer:{
        justifyContent:'flex-end'
    },
    fontTime:{
        fontSize:15,
        color:'#FFFFFF',
        marginLeft:7,
        marginBottom:12
    },
    wrapStyle:{
        backgroundColor:'transparent'
    },
    rightTitleText: {
        color: 'white',
        fontSize: Pixel.getFontPixel(fontAndColor.NAVIGATORFONT34),
        textAlign: 'right',
        backgroundColor: 'transparent'
    }

});