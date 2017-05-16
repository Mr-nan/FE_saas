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
import CarlicenseTagScene from  './carPublish/CarlicenseTagScene';
import CarUpImageScene   from './CarUpImageScene';
import CityListScene from  './CityListScene';
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
            isShowTail:true,
            value:'选择'
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
            title:'分销批发价',
            subTitle:'针对同行的分销价格，合理定价可以更快售出',
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
            title:'低价',
            subTitle:'仅做内部销售参考',
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
            subTitle:'给本店高级客户的优惠价格，暂不对外展示',
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
            value:'0',
            isShowTail:false,
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



    updateUI=()=>{
        this.setState({
            titleData:titleData1,
        });
    }


    cellCilck=(cellTitle)=>{

        if(cellTitle=='登记人')
        {
           this.pushSelectRegisterPersonScene();

        }else if(cellTitle=='车牌号'){

            this.pushCarIicenseTagScene();

        }else if(cellTitle=='车辆所在地'){

            this.pushCityListScene();
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

    pushSelectRegisterPersonScene=()=>{
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
    selectPersonClick=(data)=>{
        selectPerson=data;
        titleData1[2][1].value = selectPerson;
        this.updateUI();
    }

    pushCarIicenseTagScene=()=>{
        let navigatorParams = {
            name: "CarlicenseTagScene",
            component: CarlicenseTagScene,
            params: {
                checkedCarlicenseTagClick:this._checkedCarlicenseTagClick,
                currentChecked:titleData1[0][2].value,
            }
        };
        this.toNextPage(navigatorParams);
    }

    _checkedCarlicenseTagClick=(title)=>{
            titleData1[0][2].value = title;
            this.updateUI();
    }
    pushCityListScene=()=>{
        let navigatorParams = {
            name: "CityListScene",
            component: CityListScene,
            params: {
                checkedCityClick:this.checkedCityClick,
            }
        };
        this.toNextPage(navigatorParams);
    }

    checkedCityClick=(city)=>{
            titleData1[2][0].value = city.city_name;
            this.updateUI();
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
        width:80,
        textAlign:'right',
        fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
    },
    textInputTitle:{
        color:fontAndColor.COLORA0,
        fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        marginLeft:Pixel.getPixel(5),
        textAlign:'right',
    }
});