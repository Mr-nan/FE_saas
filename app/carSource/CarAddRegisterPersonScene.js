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
    ScrollView,
    Platform
}   from 'react-native';

import BaseComponent from '../component/BaseComponent';
import AllNavigationView from '../component/AllNavigationView';
import {CellView,CellSelectView} from './znComponent/CarPublishCell';
import *as fontAndColor from '../constant/fontAndColor';
import PixelUtil from '../utils/PixelUtil';

import *as AppUrls from '../constant/appUrls';
import * as Net from '../utils/RequestUtil';

const Pixel = new  PixelUtil();
const sceneWidth = Dimensions.get('window').width;
const IS_ANDROID = Platform.OS === 'android';



export default class CarAddRegisterPersonScene extends BaseComponent{

    initFinish=()=>{

    }

    componentWillUnmount(){
        this.timer && clearTimeout(this.timer);
    }

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.personData={};
        this.titleData = [
            [
                {
                    title:'姓名',
                    isShowTag:true,
                    isShowTail:true,
                    tailView:()=>{
                        return(
                            <View>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder='请输入'
                                    onChangeText={(text)=>{
                                        this.personData['business_name'] = text;
                                    }}
                                />
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
                            <TextInput style={styles.textInput}
                                       placeholder='请输入'
                                       onChangeText={(text)=>{
                                           this.personData['phoneNumber'] = text;
                                       }}
                            />
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
                            <TextInput
                                style={styles.textInput}
                                placeholder='请输入'
                                onChangeText={(text)=>{
                                    this.personData['cardid'] = text;
                                }}
                            />
                        </View>
                    )
                }
            },{
                title:'与本公司合作年限',
                isShowTag:true,
                isShowTail:true,
                tailView:()=>{
                    return(
                        <View style={{alignItems:'center', flexDirection:'row',justifyContent:'flex-end'}}>
                        <TextInput
                            style={styles.textInput}
                            placeholder='请输入'
                            onChangeText={(text)=>{
                                this.personData['cooperation_year'] = text;
                            }}
                        />
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
                            <TextInput
                                style={styles.textInput}
                                placeholder='请输入'
                                onChangeText={(text)=>{
                                    this.personData['position'] = text;
                                }}
                            />
                        </View>
                    )
                }
            },
            ]

        ];

        this.state = {
            titleData:this.titleData,
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
                            <TouchableOpacity onPress={this.addPersonAction}>
                                <View style={styles.footView}>
                                    <Text style={styles.footText}>提交</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
                <AllNavigationView title="添加登记人" backIconClick={this.backPage}/>
            </View>
        )
    }


    addPersonAction=()=>{

        if(!this.personData.business_name||this.personData.business_name==''){
            this.showToast('请输入姓名');
            return;
        }if(!this.personData.phoneNumber||this.personData.phoneNumber==''){
            this.showToast('请输入手机号');
            return;
        }if(!this.personData.cardid||this.personData.cardid==''){
            this.showToast('请输入身份证号码');
            return;
        }if(!this.personData.cooperation_year||this.personData.cooperation_year==''){
            this.showToast('请输入合作年限');
            return;
        }if(!this.personData.position||this.personData.position==''){
            this.showToast('请输入职位');
            return;
        }

        this.props.showModal(true);
        this.personData['merge_id'] = this.props.shopID;
        Net.request(AppUrls.ADD_REGISTRANT,'post',this.personData).then((response) => {

            this.props.showModal(false);
            console.log(response);
            if(response.mycode==1){
                this.props.upDataAction();
                this.backPage();
            }else {
                this.showToast(response.mjson.msg);
            }

        }, (error) => {

            this.props.showModal(false);
            console.log(error);

            if(error.mycode === -300 || error.mycode === -500){
                this.showToast('网络连接失败');
            }else{
                this.showToast(error.mjson.msg);
            }
        });
    }

    showToast=(errorMsg)=>{
        if(IS_ANDROID === true){
            this.props.showToast(errorMsg);
        }else {
            this.timer = setTimeout(
                () => { this.props.showToast(errorMsg)},
                500
            );
        }
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
        height: 30,
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