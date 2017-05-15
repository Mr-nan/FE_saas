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
import CarUpImageScene   from './CarUpImageScene';
import *as fontAndColor from '../constant/fontAndColor';
import PixelUtil from '../utils/PixelUtil';

const Pixel = new  PixelUtil();
const sceneWidth = Dimensions.get('window').width;
let   currentCarType ='非运营';
let   selectPerson = '请选择';
let   titleData1 = [
    [
        {
            title:'使用性质',
            isShowTag:false,
            isShowTail:true,
            selectDict:{current:currentCarType,data:[{title:'营运',value:1},{title:'非运营',value:2}]},
        },
        {
            title:'过户次数',
            isShowTag:true,
            isShowTail:true,
            tailView:()=>{
                return(
                    <TextInput style={styles.textInput} placeholder='请输入'/>
                )
            }
        },
        {
            title:'车牌号',
            isShowTag:true,
            isShowTail:false,
            tailView:()=>{
                return(
                    <TextInput style={styles.textInput} placeholder='请输入'/>
                )
            }
        },
        {
            title:'表显里程',
            isShowTag:true,
            isShowTail:true,
            tailView:()=>{
                return(
                    <View style={{alignItems:'center', flexDirection:'row',justifyContent:'flex-end'}}>
                        <TextInput style={styles.textInput} placeholder='请输入'/>
                        <Text style={styles.textInputTitle}>万公里</Text>
                    </View>
                )
            }
        },

    ],
    [   {
        title:'参考价',
        isShowTag:false,
        value:'查看',
        isShowTail:true,
    },
        {
            title:'市场价',
            isShowTag:true,
            isShowTail:true,
            tailView:()=>{
              return(  <View style={{alignItems:'center', flexDirection:'row',justifyContent:'flex-end'}}>
                    <TextInput style={styles.textInput} placeholder='请输入'/>
                    <Text style={styles.textInputTitle}>万元</Text>
                </View>)
            }
        },
        {
            title:'底价',
            isShowTag:false,
            isShowTail:true,
            tailView:()=>{
              return(  <View style={{alignItems:'center', flexDirection:'row',justifyContent:'flex-end'}}>
                    <TextInput style={styles.textInput} placeholder='请输入'/>
                    <Text style={styles.textInputTitle}>万元</Text>
                </View>)
            }
        },
        {
            title:'会员价',
            isShowTag:false,
            isShowTail:true,
            tailView:()=>{
              return(  <View style={{alignItems:'center', flexDirection:'row',justifyContent:'flex-end'}}>
                    <TextInput style={styles.textInput} placeholder='请输入'/>
                    <Text style={styles.textInputTitle}>万元</Text>
                </View>)
            }
        },

    ],
    [   {
        title:'车辆所在地',
        isShowTag:true,
        value:'请选择',
        isShowTail:true,
    },{
        title:'登记人',
        isShowTag:true,
        value:selectPerson,
        isShowTail:true,
    },
        {
            title:'车况描述',
            isShowTag:false,
            isShowTail:false,
            tailView:()=>{
                return(
                    <TextInput style={styles.textInput} placeholder='请填写'/>
                )
            }

        },
    ]

];

let titleData2 = [
    [
        {
            title:'过户次数',
            isShowTag:true,
            value:'请选择',
            isShowTail:true,
        },
        {
            title:'车牌号',
            isShowTag:true,
            isShowTail:false,
            tailView:()=>{
                return(
                    <TextInput style={styles.textInput} placeholder='请输入'/>
                )
            }
        },
        {
            title:'表显里程',
            isShowTag:true,
            isShowTail:true,
            tailView:()=>{
                return(
                    <View style={{alignItems:'center', flexDirection:'row',justifyContent:'flex-end'}}>
                        <TextInput style={styles.textInput} placeholder='请输入'/>
                        <Text style={styles.textInputTitle}>万公里</Text>
                    </View>
                )
            }
        },

    ],
    [   {
        title:'参考价',
        isShowTag:false,
        value:'查看',
        isShowTail:true,
    },
        {
            title:'市场价',
            isShowTag:true,
            tailView:()=>{
                return(  <View style={{alignItems:'center', flexDirection:'row',justifyContent:'flex-end'}}>
                    <TextInput style={styles.textInput} placeholder='请输入'/>
                    <Text style={styles.textInputTitle}>万元</Text>
                </View>)
            }
        }, {
        title:'底价',
        isShowTag:false,
        tailView:()=>{
            return(  <View style={{alignItems:'center', flexDirection:'row',justifyContent:'flex-end'}}>
                <TextInput style={styles.textInput} placeholder='请输入'/>
                <Text style={styles.textInputTitle}>万元</Text>
            </View>)
        }
    }, {
        title:'会员价',
        isShowTag:false,
        tailView:()=>{
            return(  <View style={{alignItems:'center', flexDirection:'row',justifyContent:'flex-end'}}>
                <TextInput style={styles.textInput} placeholder='请输入'/>
                <Text style={styles.textInputTitle}>万元</Text>
            </View>)
        }
    },

    ],
    [   {
        title:'车辆所在地',
        isShowTag:true,
        value:'请选择',
        isShowTail:true,
    },
        {
            title:'车况描述',
            isShowTag:false,
            isShowTail:false,
            tailView:()=>{
                return(
                    <TextInput style={styles.textInput} placeholder='请填写'/>
                )
            }
        },
    ]

];

export default class CarPublishSecondScene extends BaseComponent{

    initFinish=()=>{

    }
    // 构造
    constructor(props) {
        super(props);
        // 初始状态

        this.state = {
            titleData:this.props.carType=='二手车'? titleData1 :titleData2,
        };
    }

    render(){
        return(
            <View style={styles.rootContainer}>
                <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={Pixel.getTitlePixel(-64)}>
                    <ScrollView style={{width:sceneWidth,height:Dimensions.get('window').height - Pixel.getTitlePixel(64)}}>
                        {
                            this.state.titleData.map((data,index)=>{
                                return(
                                    <View style={{marginTop:10,backgroundColor:'white'}} key={index}>
                                        {
                                            data.map((rowData,subIndex)=>{
                                                return( rowData.selectDict?
                                                        (
                                                    <TouchableOpacity
                                                        key={subIndex}
                                                        activeOpacity={1}
                                                        onPress={()=>this.cellCilck(rowData.title)}>
                                                        <CellSelectView
                                                            currentTitle={rowData.selectDict.current}
                                                            cellData={rowData}
                                                            cellSelectAction={this.cellSelectAction} />
                                                    </TouchableOpacity>):
                                                    (
                                                        <TouchableOpacity key={subIndex}
                                                                          activeOpacity={1}
                                                                          onPress={()=>this.cellCilck(rowData.title)}>
                                                        <CellView cellData={rowData}/>
                                                        </TouchableOpacity>)
                                                    )
                                            })
                                        }
                                    </View>
                                )
                            })
                        }
                        <View style={styles.footContainer}>
                            <TouchableOpacity onPress={this.nextAction}>
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

    }

    selectPersonClick=(data)=>{
        selectPerson=data;
        titleData1[2][1].value = selectPerson;
        this.updateUI();
    }

    updateUI=()=>{
        this.setState({
            titleData:titleData1,
        });
    }


    cellCilck=(cellTitle)=>{

        if(cellTitle=='登记人')
        {
            let navigatorParams = {
                name: "CarSelectRegisterPersonScene",
                component: CarSelectRegisterPersonScene,
                params: {
                    selectPersonClick:this.selectPersonClick,
                    currentPerson:selectPerson,
                }
            };
            this.toNextPage(navigatorParams);

        }
    }

    nextAction=()=>{
        let navigatorParams = {
            name: "CarUpImageScene",
            component: CarUpImageScene,
            params: {

            }
        };
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
    },
    textInputTitle:{
        color:fontAndColor.COLORA0,
        fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        marginLeft:Pixel.getPixel(5),
        textAlign:'right',
    }
});