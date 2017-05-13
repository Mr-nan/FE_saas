/**
 * Created by zhengnan on 2017/5/11.
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
import CarPublishSecondScene from './CarPublishSecondScene';
import *as fontAndColor from '../constant/fontAndColor';
import PixelUtil from '../utils/PixelUtil';

const Pixel = new  PixelUtil();
const sceneWidth = Dimensions.get('window').width;
let   currentCarType ='二手车';
const titleData1 = [
    [
        {
            title:'车辆类型',
            isShowTag:false,
            isShowTail:true,
            selectDict:{current:currentCarType,data:[{title:'二手车',value:1},{title:'新车',value:2},{title:'平行进口车',value:3}]},
        },
        {
            title:'车架号',
            isShowTag:true,
            value:'扫描',
            isShowTail:true,
        },
        {
            title:'车型',
            isShowTag:true,
            value:'请选择',
            isShowTail:true,
        },
        {
            title:'排量',
            isShowTag:true,
            isShowTail:false,
            tailView:()=>{
               return(
                   <TextInput style={styles.textInput} placeholder='请输入'/>
               )
            }
        },
        {
            title:'排放标准',
            isShowTag:true,
            value:'请选择',
            isShowTail:true,
        },
        {
            title:'车身颜色',
            isShowTag:true,
            value:'请选择',
            isShowTail:true,
        },
        {
            title:'内饰颜色',
            isShowTag:true,
            value:'请选择',
            isShowTail:true,
        },
    ],
    [   {
            title:'出厂日期',
            isShowTag:true,
            value:'请选择',
            isShowTail:true,
        },
        {
            title:'初登日期',
            isShowTag:true,
            value:'请选择',
            isShowTail:true,
        },

    ],
    [   {
            title:'标准配置',
            isShowTag:false,
            value:'查看',
            isShowTail:false,
    },
        {
            title:'配置改装说明',
            isShowTag:false,
            value:'请填写',
            isShowTail:false,
            tailView:()=>{
                return(
                    <TextInput style={styles.textInput} placeholder='请填写'/>
                )
            }

        },
    ]

];
const titleData2 = [
    [
        {
            title:'车辆类型',
            isShowTag:false,
            value:'扫描',
            isShowTail:true,
            selectDict:{current:currentCarType,data:[{title:'二手车',value:1},{title:'新车',value:2},{title:'平行进口车',value:3}]},
        },
        {
            title:'车架号',
            isShowTag:true,
            value:'扫描',
            isShowTail:true,
        },
        {
            title:'车型',
            isShowTag:true,
            value:'请选择',
            isShowTail:true,
        },
        {
            title:'排量',
            isShowTag:true,
            isShowTail:false,
            tailView:()=>{
                return(
                    <TextInput style={styles.textInput} placeholder='请输入'/>
                )
            }
        },
        {
            title:'排放标准',
            isShowTag:true,
            value:'请选择',
            isShowTail:true,
        },
        {
            title:'车身颜色',
            isShowTag:true,
            value:'请选择',
            isShowTail:true,
        },{
            title:'内饰颜色',
            isShowTag:true,
            value:'请选择',
            isShowTail:true,
        },
    ],
    [
        {
            title:'出厂日期',
            isShowTag:true,
            value:'请选择',
            isShowTail:true,
        },
    ],
    [
        {
            title:'标准配置',
            isShowTag:false,
            value:'查看',
            isShowTail:false,
    },
        {
            title:'配置改装说明',
            isShowTag:false,
            value:'请填写',
            isShowTail:false,
        },
    ]

];

export default class CarPublishFirstScene extends BaseComponent{

    initFinish=()=>{

    }
    // 构造
      constructor(props) {
        super(props);
        // 初始状态

        this.state = {
            titleData:titleData1,
        };
      }

    render(){
        return(
            <View style={styles.rootContainer}>
                <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={Pixel.getTitlePixel(-64)}>
                    <ScrollView style={{width:sceneWidth,height:Dimensions.get('window').height -Pixel.getTitlePixel(64)}}>
                        {
                            this.state.titleData.map((data,index)=>{
                                return(
                                    <View style={{marginTop:10,backgroundColor:'white'}} key={index}>
                                        {
                                            data.map((rowData,subIndex)=>{
                                               return( rowData.selectDict?(
                                                   <CellSelectView
                                                       currentTitle={rowData.selectDict.current}
                                                       cellData={rowData}
                                                       cellSelectAction={this.cellSelectAction} key={subIndex}/> ):(<CellView cellData={rowData} key={subIndex}/>))
                                            })
                                        }
                                    </View>
                                )
                            })
                        }
                        <View style={styles.footContainer}>
                            <TouchableOpacity onPress={this.footBtnClick}>
                                <View style={styles.footView}>
                                    <Text style={styles.footText}>下一步</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
                <AllNavigationView title="车辆基本信息" backIconClick={this.backPage}/>
            </View>
        )
    }

    cellSelectAction=(selectDict)=>{

        if(selectDict.value==1){
            this.setState({
                titleData:titleData1,
            })
        }else
        {
            this.setState({
               titleData:titleData2,
            })
        }

        currentCarType=selectDict.title;
    }

    footBtnClick=()=>{
        let navigatorParams = {
            name: "CarPublishSecondScene",
            component: CarPublishSecondScene,
            params: {
                carType:currentCarType,
            }
        }
        this.toNextPage(navigatorParams);
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
        alignItems:'center',
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
    }
});