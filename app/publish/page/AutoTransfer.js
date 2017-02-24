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
    Platform,
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

import Picker from 'react-native-wheel-picker';
let PickerItem = Picker.Item;

const IS_ANDROID = Platform.OS === 'android';

export default class AutoTransfer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected1: 0,
            itemList: ['0', '1', '2', '3', '4', '5', '6', '7','8','10','10以上'],
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

    onPickerSelect = (key,value) => {
        const newState = {};
        newState[key] = value;
        this.setState(newState);
    };

    _renderPlaceholderView = ()=>{
        return(<Image style={[styles.img,{height:height-this.props.barHeight}]} source={background} />);
    };

    _onBack = ()=>{
        this.props.onBack();
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
                            {/*<TextInput  style={styles.inputNum} underlineColorAndroid='transparent' defaultValue={'2'}/>*/}
                            <View style={styles.pickContainer}>
                                <Picker  style={[IS_ANDROID && styles.fillSpace]}
                                         selectedValue={this.state.selected1}
                                         itemStyle={{color:"#FFFFFF", fontSize:16,fontWeight:'bold'}}
                                         onValueChange={(index) => this.onPickerSelect('selected1',index)}>
                                    {this.state.itemList.map((value, i) => (
                                        <PickerItem label={value} value={i} key={"first"+value}/>
                                    ))}
                                </Picker>
                            </View>
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
        width: Pixel.getPixel(120),
        height: Pixel.getPixel(120),
        justifyContent: 'center',
        marginTop:Pixel.getPixel(225),
        alignItems:'center'
    },
    inputContainer:{
        flexDirection:'row',
        width:Pixel.getPixel(70),
        height:Pixel.getPixel(40)
    },
    pickContainer:{
        flex:1,
        height:Pixel.getPixel(40),
    },
    inputNum:{
        width:Pixel.getPixel(60),
        height:Pixel.getPixel(40),
        fontSize:Pixel.getFontPixel(38),
        padding:0,
        color:'#FFFFFF',
        textAlign:'right'
    },
    timeContainer:{
        justifyContent:'center',
    },
    fontTime:{
        fontSize:Pixel.getFontPixel(15),
        color:'#FFFFFF',
        marginLeft:Pixel.getFontPixel(3),
    },
    wrapStyle:{
        backgroundColor:'transparent'
    },
    rightTitleText: {
        color: 'white',
        fontSize: Pixel.getFontPixel(fontAndColor.NAVIGATORFONT34),
        textAlign: 'right',
        backgroundColor: 'transparent'
    },
    fillSpace:{
        flex:1,
    }
});