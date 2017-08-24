import React, {Component} from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    Dimensions,
    BackAndroid,
    NativeModules,
} from 'react-native'

import ImageSource from "../../publish/component/ImageSource";
import * as fontAndClolr from '../../constant/fontAndColor';
import ImagePicker from "react-native-image-picker";
import BaseComponent from '../../component/BaseComponent';
import NavigationBar from "../../component/NavigationBar";
import PixelUtil from "../../utils/PixelUtil";
import StoreageUtil from '../../utils/StorageUtil';
import * as StoreageKeyNames from '../../constant/storageKeyNames';
import {request} from "../../utils/RequestUtil";
import * as Urls from '../../constant/appUrls';
import * as ImageUpload from "../../utils/ImageUpload";


const photo = require('../../../images/add_photo.png');  // 加号

let screen_width = Dimensions.get('window').width;

let Pixel = new PixelUtil();


let datas = [
    {
        value:'车况不可接受',
        tag:0
    },
    {
        value:'临时加价',
        tag:1
    },
    {
        value:'车辆不可迁入落户地',
        tag:2
    },
    {
        value:'对方态度恶略',
        tag:3
    },    {
        value:'其他',
        tag:4
    },
]


export default class CancelOrderReason extends BaseComponent{

    constructor(){
        super()
        this.state ={
            text:'',
            pictures:[
                {
                    image:photo,
                }

            ]



        }
    }

    componentDidMount(){

        try {
            BackAndroid.addEventListener('hardwareBackPress', this.handleBack);
        } catch (e) {


        } finally {


        }



    }


    handleBack = () => {
        this.backPage();
        return true;
    }
    backPage=()=>{
        const navigator = this.props.navigator;
        if (navigator) {
            navigator.pop();
        }
    }


    render(){

        return(

            <View  style = {{flex:1, backgroundColor:fontAndClolr.COLORA3}}>

                <NavigationBar
                    centerText={'原因描述'}
                    rightText={''}
                    leftImageCallBack={this.backPage}
                />

                <ScrollView
                    showsVerticalScrollIndicator = {false}
                    style = {styles.style_scrollview_container}>

                    {   // 取消原因选项
                        datas.map((data, index)=>{
                            return(
                                    <TouchableOpacity
                                        key = {index}
                                        onPress={()=>{
                                            console.log(data.value)
                                        }}
                                        activeOpacity={1}
                                    >
                                        <View style = {styles.style_select_item}>
                                        <Image style={{marginLeft:15}} source={require('../../../images/unchecked.png')}/>
                                        <Text  style={{marginLeft:20}}>{data.value}</Text>
                                        </View>

                                    </TouchableOpacity>

                            )
                        })
                    }

                    <View  style={{marginTop:15, backgroundColor:'white',}}>
                        <TextInput
                            fontSize={fontAndClolr.BUTTONFONT30}
                            style = {styles.style_text_input}
                            maxLength = {100}
                            multiline = {true}
                            onChangeText = {this._onChangeText}
                            placeholder = '其他原因描述，不超过100个字符'

                        />
                        <Text  style = {styles.style_text_number} >{this.state.text.length+'/'+100}</Text>
                    </View>


                    <View style = {{marginTop:15, backgroundColor:'white'}}>

                        <Text style = {styles.style_upload_text_label}>{'上传照片'}</Text>
                        <View style = {{flexDirection:'row', marginVertical:Pixel.getPixel(15), marginHorizontal:Pixel.getPixel(5)}} >
                            {
                                this.state.pictures.map((picture, index)=>{
                                    return(
                                        <Image style = {styles.style_photo} source = {picture.image}/>
                                    )
                                })
                            }
                        </View>


                    </View>


                    <TouchableOpacity  style = {styles.style_commite_container}>

                        <Text style = {{color:'white'}}>{'提交'}</Text>


                    </TouchableOpacity>

                </ScrollView>
            </View>
        )

    }


    _onChangeText = (text)=>{
        this.setState({
            text:text,
        })
        // console.log(text);
    }


}


const styles = StyleSheet.create({

    style_scrollview_container:{
        paddingTop:Pixel.getPixel(20),
        flex:1
    },


    style_select_item:{
        width:screen_width,
        height:Pixel.getPixel(50),
        flexDirection:'row',
        backgroundColor:'white',
        alignItems:'center',
    },


    style_text_input:{
        marginTop:Pixel.getPixel(10),
        paddingHorizontal:Pixel.getPixel(10),
        width:screen_width,
        height:Pixel.getPixel(110),

    },


    style_text_number:{
        marginTop:Pixel.getPixel(10),
        height:Pixel.getPixel(20),
        textAlign:'right',
        marginRight:Pixel.getPixel(5)
    },

    style_upload_text_label:{
        fontSize:Pixel.getPixel(15),
        marginLeft:Pixel.getPixel(15),
        marginTop:15,

    },

    style_photo:{
        width:Pixel.getPixel(80),
        height:Pixel.getPixel(60),
        marginHorizontal:10,
        resizeMode:'contain',
    },

    style_commite_container:{
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:Pixel.getPixel(15),
        marginVertical:Pixel.getPixel(30),
        backgroundColor:fontAndClolr.COLORB0,
        height:Pixel.getPixel(44),
        borderRadius:Pixel.getPixel(3),
    }

})
