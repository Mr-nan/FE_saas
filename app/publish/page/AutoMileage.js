/**
 * Created by Administrator on 2017/2/10.
 */
import React,{ Component } from 'react';
import {
    Image,
    View,
    Text,
    Button,
    Platform,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    InteractionManager
}from 'react-native';

import Picker from 'react-native-wheel-picker';
let PickerItem = Picker.Item;

import SuccessModal from '../component/SuccessModal';
import * as fontAndColor from '../../constant/fontAndColor';
import AllNavigationView from '../../component/AllNavigationView';
import PixelUtil from '../../utils/PixelUtil';
const Pixel = new PixelUtil();

const { width,height } = Dimensions.get('window');
const background = require('../../../images/publish/background.png');
const preBg = require('../../../images/publish/car-mileage-pre.png');
const proBg = require('../../../images/publish/car-mileage-pro.png');
const IS_ANDROID = Platform.OS === 'android';

export default class AutoMileage extends Component{

    constructor(props){
        super(props);
        this.state = {
            selected1: 0,
            selected2: 0,
            selected3: 0,
            selected4: 0,
            selected5: 0,
            itemList: ['0', '1', '2', '3', '4', '5', '6', '7','8','9'],
            renderPlaceholderOnly: true
        };
    }

    componentWillMount(){

    }

    componentDidMount(){
        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: false});
        });
    }

    componentWillUnmount(){

    }

    onPickerSelect = (key,value) => {
        const newState = {};
        newState[key] = value;
        this.setState(newState);
    };

    _labelPress=(type)=>{
        this.type = type;
        this.setState({ isDateTimePickerVisible: true });
    };

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

    render(){
        if (this.state.renderPlaceholderOnly) {
            return this._renderPlaceholderView();
        }
        return(
            <View style={styles.container}>
                <Image style={[styles.imgContainer,{height:height-this.props.barHeight}]} source={background}>
                    <SuccessModal ref={(modal) => {this.successModal = modal}}/>
                    <AllNavigationView
                        backIconClick={this._onBack}
                        title='填写行驶里程'
                        wrapStyle={styles.wrapStyle}
                        renderRihtFootView={this._renderRihtFootView} />
                    <View style={styles.mileContainer}>
                        <Image style={styles.preContainer} source={preBg}>
                            <View style={styles.fillSpace}>
                                <Picker  style={[IS_ANDROID && styles.fillSpace]}
                                        selectedValue={this.state.selected1}
                                        itemStyle={{color:"#FFFFFF", fontSize:28,fontWeight:'bold'}}
                                        onValueChange={(index) => this.onPickerSelect('selected1',index)}>
                                    {this.state.itemList.map((value, i) => (
                                        <PickerItem label={value} value={i} key={"first"+value}/>
                                    ))}
                                </Picker>
                            </View>
                            <View style={styles.fillSpace}>
                                <Picker style={[IS_ANDROID && styles.fillSpace]}
                                        selectedValue={this.state.selected2}
                                        itemStyle={{color:"#FFFFFF", fontSize:26,fontWeight:'bold'}}
                                        onValueChange={(index) => this.onPickerSelect('selected2',index)}>
                                    {this.state.itemList.map((value, i) => (
                                        <PickerItem label={value} value={i} key={"second"+value}/>
                                    ))}
                                </Picker>
                            </View>
                            <View style={styles.fillSpace}>
                            <Picker style={[IS_ANDROID && styles.fillSpace]}
                                        selectedValue={this.state.selected3}
                                        itemStyle={{color:"#FFFFFF", fontSize:26,fontWeight:'bold'}}
                                        onValueChange={(index) => this.onPickerSelect('selected3',index)}>
                                    {this.state.itemList.map((value, i) => (
                                        <PickerItem label={value} value={i} key={"three"+value}/>
                                    ))}
                                </Picker>
                            </View>
                        </Image>
                        <Text style={[styles.fontBold,styles.dotSpace]}>.</Text>
                        <Image style={styles.proContainer} source={proBg}>
                            <View style={styles.fillSpace}>
                                <Picker style={[IS_ANDROID && styles.fillSpace]}
                                        selectedValue={this.state.selected4}
                                        itemStyle={{color:"#FFFFFF", fontSize:26,fontWeight:'bold'}}
                                        onValueChange={(index) => this.onPickerSelect('selected4',index)}>
                                    {this.state.itemList.map((value, i) => (
                                        <PickerItem label={value} value={i} key={"second"+value}/>
                                    ))}
                                </Picker>
                            </View>
                            <View style={styles.fillSpace}>
                                <Picker style={[IS_ANDROID && styles.fillSpace]}
                                        selectedValue={this.state.selected5}
                                        itemStyle={{color:"#FFFFFF", fontSize:26,fontWeight:'bold'}}
                                        onValueChange={(index) => this.onPickerSelect('selected5',index)}>
                                    {this.state.itemList.map((value, i) => (
                                        <PickerItem label={value} value={i} key={"three"+value}/>
                                    ))}
                                </Picker>
                            </View>
                        </Image>
                        <View style={styles.endContainer}>
                            <Text style={[styles.fontBold]}>万公里</Text>
                        </View>
                    </View>
                </Image>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container:{
        width:width,
        backgroundColor:'transparent'
    },
    imgContainer:{
        width: width,
        backgroundColor: 'transparent',
        alignItems:'center'
    },
    mileContainer:{
        flexDirection:'row',
        marginTop:207
    },
    fillSpace:{
        flex:1,
    },
    preContainer:{
        height:44,
        width:130,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        backgroundColor:'rgba(255,255,255,0.2)',
    },
    proContainer:{
        height:44,
        width:88,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        backgroundColor:'rgba(255,255,255,0.2)'
    },
    fontBold:{
        fontSize:23,
        fontWeight:'bold',
        color:'#FFFFFF'
    },
    dotSpace:{
        width:24,
        textAlign:'center',
        marginTop:6
    },
    endContainer:{
        marginLeft:9,
        justifyContent:'center'
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
