/**
 * Created by zhengnan on 2017/5/15.
 */


import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Image,
    TextInput,
    Platform
} from 'react-native';

import BaseComponent from '../../component/BaseComponent';
import AllNavigationView from  '../../component/AllNavigationView';
import *as fontAndColor from  '../../constant/fontAndColor';
import PlateModal from '../../publish/component/PlateModal';
import PixelUtil from  '../../utils/PixelUtil';
let Pixel = new  PixelUtil();

const background = require('../../../images/publish/background.png');
const preBg = require('../../../images/publish/car-plate-pre.png');
const proBg = require('../../../images/publish/car-plate.png');
const IS_ANDROID = Platform.OS === 'android';

export default class CarDischargeScene extends  BaseComponent{

    initFinish=()=>{

    };

    // 构造
    constructor(props) {

        super(props);

        this.initValue =['','','','','','',''];
        if(this.props.currentChecked.length>6){
            for(let i=0;i<7;i++){
                this.initValue[i] =this.props.currentChecked.charAt(i);
            }
        }
        if(this.initValue[0] === '') {
            this.initValue[0] = '京';
        }

        this.state = {
            city:this.initValue[0],
        }
    }

    render(){
        return(
            <View style={styles.rootContainer}>
                <Image style={{flex:1,alignItems:'center'}} source={background}>
                    <PlateModal onClose={this._onClose} ref={(modal) => {this.plateModal = modal}}/>
                    <View style={styles.plateContainer}>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={()=>{this._openModal()}}
                            style={styles.preContainer}>
                            <Image style={styles.preContainer} source={preBg}>
                                <Text style={styles.fontPre}>{this.state.city}</Text>
                            </Image>
                        </TouchableOpacity>

                        <Image style={styles.proContainer} source={proBg}>
                            <TextInput ref={(input)=>{this.firstInput = input}}
                                       style={IS_ANDROID ? styles.fontAndroidBold: styles.fontIOSBold} underlineColorAndroid='transparent'
                                       defaultValue={this.initValue[1]} maxLength={1} onChangeText={(text)=>this._onPlateChange(text,1)}/>
                            <TextInput ref={(input)=>{this.secondInput = input}}
                                       style={IS_ANDROID ? styles.fontAndroidBold: styles.fontIOSBold} underlineColorAndroid='transparent'
                                       defaultValue={this.initValue[2]} maxLength={1} onChangeText={(text)=>this._onPlateChange(text,2)}/>
                            <TextInput ref={(input)=>{this.threeInput = input}}
                                       style={IS_ANDROID ? styles.fontAndroidBold: styles.fontIOSBold} underlineColorAndroid='transparent'
                                       defaultValue={this.initValue[3]} maxLength={1} onChangeText={(text)=>this._onPlateChange(text,3)}/>
                            <TextInput ref={(input)=>{this.fourInput = input}}
                                       style={IS_ANDROID ? styles.fontAndroidBold: styles.fontIOSBold} underlineColorAndroid='transparent'
                                       defaultValue={this.initValue[4]} maxLength={1} onChangeText={(text)=>this._onPlateChange(text,4)}/>
                            <TextInput ref={(input)=>{this.fiveInput = input}}
                                       style={IS_ANDROID ? styles.fontAndroidBold: styles.fontIOSBold} underlineColorAndroid='transparent'
                                       defaultValue={this.initValue[5]} maxLength={1} onChangeText={(text)=>this._onPlateChange(text,5)}/>
                            <TextInput ref={(input)=>{this.sixInput = input}}
                                       style={IS_ANDROID ? styles.fontAndroidBold: styles.fontIOSBold} underlineColorAndroid='transparent'
                                       defaultValue={this.initValue[6]} maxLength={1} onChangeText={(text)=>this._onPlateChange(text,6)}/>
                        </Image>
                    </View>
                </Image>
                <AllNavigationView title="车牌号" backIconClick={this.backAction} />
            </View>
        )
    }

    _openModal = ()=>{
        this.plateModal.openModal();
    };
    _onClose =(city)=>{
        this.setState({
            city:city
        });
        this.initValue[0] = city;
    };

    backAction=()=>{
        let number ='';
        this.initValue.map((data,index)=>{
            if(data!='')
            {
                number+=data;
            }
        });
        if(number.length==7){

            this.props.checkedCarlicenseTagClick(number);
        }
        this.backPage();
    }

    _onPlateChange= (text,type) =>{

        this.initValue[type] = text;
        if(text.length !== 0){
            switch (type){
                case 1:
                    this.firstInput.setNativeProps({
                        text:text
                    });
                    this.secondInput.focus();
                    break;
                case 2:
                    this.secondInput.setNativeProps({
                        text:text
                    });
                    this.threeInput.focus();
                    break;
                case 3:
                    this.threeInput.setNativeProps({
                        text:text
                    });
                    this.fourInput.focus();
                    break;
                case 4:
                    this.fourInput.setNativeProps({
                        text:text
                    });
                    this.fiveInput.focus();
                    break;
                case 5:
                    this.fiveInput.setNativeProps({
                        text:text
                    });
                    this.sixInput.focus();
                    break;
                case 6:
                    this.sixInput.setNativeProps({
                        text:text
                    });
                    break;
            }
        }
    };


}

const styles = StyleSheet.create({
    rootContainer:{
        flex:1,
        backgroundColor:fontAndColor.COLORA3,
        paddingTop:Pixel.getTitlePixel(64),
    },plateContainer: {
        flexDirection: 'row',
        marginTop: Pixel.getPixel(207),
        alignItems:'center',
        width:Pixel.getPixel(320),
        justifyContent:'center',
    },
    preContainer: {
        height: Pixel.getPixel(44),
        width: Pixel.getPixel(44),
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)'
    },
    proContainer: {
        flex:1,
        height: Pixel.getPixel(44),
        width: Pixel.getPixel(264),
        marginLeft: Pixel.getPixel(12),
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)'
    },
    fontPre: {
        fontSize: Pixel.getFontPixel(20),
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign:'center'
    },
    fontAndroidBold: {
        height: Pixel.getPixel(44),
        width: Pixel.getPixel(44),
        fontSize: Pixel.getFontPixel(20),
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign:'left'
    },
    fontIOSBold: {
        height: Pixel.getPixel(44),
        width: Pixel.getPixel(44),
        fontSize: Pixel.getFontPixel(20),
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign:'center'
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
