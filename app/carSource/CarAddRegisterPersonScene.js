/**
 * Created by zhengnan on 2017/5/12.
 */
import React,    {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ListView,
    Image,
    TouchableOpacity,
    Dimensions,
    TextInput,
    KeyboardAvoidingView,
    ScrollView
}   from 'react-native';

import BaseComponent from '../component/BaseComponent';
import AllNavigationView from '../component/AllNavigationView';
import {CellView,CellSelectView} from './znComponent/CarPublishCell';
import CarSelectRegisterPersonScene from './CarSelectRegisterPersonScene';
import *as fontAndColor from '../constant/fontAndColor';
import PixelUtil from '../utils/PixelUtil';

const Pixel = new  PixelUtil();
const sceneWidth = Dimensions.get('window').width;

let   titleData = [
    [
        {
            title:'姓名',
            isShowTag:true,
            isShowTail:true,
            tailView:()=>{
                return(
                    <View>
                    <TextInput style={styles.textInput} placeholder='请输入'/>
                    </View>
                )
            }
        },{
            title:'手机号',
            isShowTag:true,
            isShowTail:true,
            tailView:()=>{
                return(
                    <View>
                    <TextInput style={styles.textInput} placeholder='请输入'/>
                    </View>
                )
            }
        },{
            title:'身份证号码',
            isShowTag:true,
            isShowTail:true,
            tailView:()=>{
                return(
                    <View>
                    <TextInput style={styles.textInput} placeholder='请输入'/>
                    </View>
                )
            }
        },{
            title:'与本公司合作年限',
            isShowTag:true,
            isShowTail:true,
            tailView:()=>{
            return(  <View style={{alignItems:'center', flexDirection:'row',justifyContent:'flex-end'}}>
                <TextInput style={styles.textInput} placeholder='请输入'/>
                <Text style={styles.textInputTitle}>年</Text>
            </View>)
        }
        },{
            title:'职位',
            isShowTag:true,
            isShowTail:true,
            tailView:()=>{
                return(
                    <View>
                    <TextInput style={styles.textInput} placeholder='请输入'/>
                    </View>
                )
            }
        },
    ]

];


export default class CarAddRegisterPersonScene extends BaseComponent{

    initFinish=()=>{

    }
    // 构造
    constructor(props) {
        super(props);
        // 初始状态

        this.state = {
            titleData:titleData,
        };
    }

    render(){
        return(
            <View style={styles.rootContainer}>
                <KeyboardAvoidingView  keyboardVerticalOffset={Pixel.getTitlePixel(-64)}>
                    <ScrollView style={{width:sceneWidth,height:Dimensions.get('window').height - Pixel.getTitlePixel(64)}}>
                        {
                            this.state.titleData.map((data,index)=>{
                                return(
                                    <View style={{marginTop:10,backgroundColor:'white'}} key={index}>
                                        {
                                            data.map((rowData,subIndex)=>{
                                                return(
                                                    <TouchableOpacity key={subIndex}
                                                                      activeOpacity={1}
                                                                      onPress={()=>this.cellCilck(rowData.title)}>
                                                        <CellView cellData={rowData}/>
                                                    </TouchableOpacity>
                                                )
                                            })
                                        }
                                    </View>
                                )
                            })
                        }
                        <View style={styles.footContainer}>
                            <Text style={{marginLeft:Pixel.getFontPixel(15),color:fontAndColor.COLORA1, fontSize:fontAndColor.LITTLEFONT28,marginBottom:Pixel.getPixel(17)}}>请确保您的企业信息填写正确</Text>
                            <TouchableOpacity >
                                <View style={styles.footView}>
                                    <Text style={styles.footText}>提交</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
                <AllNavigationView title="车辆基本信息" backIconClick={this.backPage}/>
            </View>
        )
    }



}



const styles = StyleSheet.create({
    rootContainer:{
        flex:1,
        backgroundColor:fontAndColor.COLORA3,
        paddingTop:Pixel.getTitlePixel(64),
    },
    footContainer:{
        justifyContent:'center',
        marginTop:Pixel.getPixel(20),
        marginBottom:Pixel.getPixel(20),
    },
    footView:{
        backgroundColor:fontAndColor.COLORB0,
        height:Pixel.getPixel(44),
        justifyContent:'center',
        alignItems:'center',
        width:sceneWidth-Pixel.getPixel(30),
        borderRadius:Pixel.getPixel(3),
        marginLeft:Pixel.getPixel(15),
    },
    footText:{
        textAlign:'center',
        color:'white',
        fontSize:fontAndColor.BUTTONFONT30
    },
    textInput:{
        height: 40,
        borderColor: fontAndColor.COLORA0,
        width:200,
        textAlign:'right',
        fontSize:fontAndColor.LITTLEFONT28,
    },
    textInputTitle:{
        color:fontAndColor.COLORA0,
        fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        marginLeft:Pixel.getPixel(5),
        textAlign:'right',
    }
});