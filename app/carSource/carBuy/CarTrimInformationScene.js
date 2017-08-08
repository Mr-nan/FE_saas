/**
 * Created by zhengnan on 2017/7/28.
 */

import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity,
    Text,
    TextInput,
    Dimensions,
    Image,
    KeyboardAvoidingView,
} from 'react-native';

import BaseComponent from '../../component/BaseComponent';
import AllNavigationView from  '../../component/AllNavigationView';
import {CellView, CellSelectView} from '../znComponent/CarPublishCell';
import CarTrimCostView from './View/CarTrimCostView';
import *as fontAndColor from  '../../constant/fontAndColor';
import PixelUtil from  '../../utils/PixelUtil';

import CarlicenseTagScene from "../carPublish/CarlicenseTagScene";
import CarAddTrimCostScene from "./CarAddTrimCostScene";
let Pixel = new  PixelUtil();
const sceneWidth = Dimensions.get('window').width;



export default class CarTrimInformationScene extends BaseComponent{

    render(){
        return(
            <View style={styles.rootContaier}>
                <KeyboardAvoidingView behavior={'position'} keyboardVerticalOffset={-Pixel.getPixel(200)}>
                    <ScrollView keyboardDismissMode={'on-drag'}>
                        {
                            this.state.titleData.map((data, index) => {
                                return (
                                    <View style={{marginTop:10,backgroundColor:'white',marginBottom:10}} key={index}>
                                        {
                                            data.map((rowData, subIndex) => {
                                                return ( rowData.selectDict ?
                                                        (
                                                            <TouchableOpacity
                                                                key={subIndex}
                                                                activeOpacity={1}
                                                                onPress={()=>this.cellCilck(rowData.title)}>
                                                                <CellSelectView
                                                                    currentTitle={rowData.selectDict.current}
                                                                    cellData={rowData}
                                                                    cellSelectAction={this.cellSelectAction}/>
                                                            </TouchableOpacity>) :
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
                        <CarTrimCostView ref={(ref)=>{this.CarTrimCostView = ref}} costObject={this.costObject} addClick={this.addClick}  moverClick={this.moverCostAction} alterClilk={this.alterClilk}/>
                        <View style={{flexDirection:'row',backgroundColor:'white',paddingHorizontal:Pixel.getPixel(15),paddingVertical:Pixel.getPixel(10),
                            alignItems:'center',justifyContent:'space-between'
                        }}>
                            <Text style={{color:fontAndColor.COLORA0, fontSize:Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}}>备注</Text>
                            <TextInput
                                style={[styles.textInput,{width:sceneWidth-Pixel.getPixel(130),height:Pixel.getPixel(60)}]}
                                placeholder='请填写'
                                maxLength={200}
                                underlineColorAndroid='transparent'
                                placeholderTextColor={fontAndColor.COLORA4}
                                placheolderFontSize={Pixel.getFontPixel(fontAndColor.LITTLEFONT28)}
                            />
                        </View>
                        <View style={styles.footContainer}>
                            <TouchableOpacity onPress={this.footBtnClick}>
                                <View style={styles.footView}>
                                    <Text allowFontScaling={false}  style={styles.footText}>提交</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
                <AllNavigationView title="填写整备信息" backIconClick={this.backPage}/>
            </View>
        )
    }


    footBtnClick=()=>{
        this.toNextPage({
            name:'CarInitialTaskUpImagScene',
            component: CarInitialTaskUpImagScene,
            params: {

            }
        })
    }

    /**
     * 添加整备费明细
     */
    addClick=()=>{
        this.toNextPage({
            name:'CarAddTrimCostScene',
            component: CarAddTrimCostScene,
            params: {
                setCostAction:this.setCostAction,
            }
        })
    }

    /**
     * 获取添加整备费用明细
     * @param costObject
     */
    setCostAction =(costObject)=>{
        this.costObject.sumNumber+=costObject.price;
        this.costObject.array.push(costObject);
        this.CarTrimCostView.setCostObject(this.costObject);
    }

    /**
     * 移除整备费用明细
     * @param costObject
     */
    moverCostAction =(costObject,index)=>{
        this.costObject.sumNumber-=costObject.price;
        this.costObject.array.splice(index,1);
        this.CarTrimCostView.setCostObject(this.costObject);
    }

    /**
     * from zn
     * 修改整备费用明细
     * @param costObject
     * @param index
     */
    alterClilk=(costObject,index)=>{
        this.toNextPage({
            name:'CarAddTrimCostScene',
            component: CarAddTrimCostScene,
            params: {
                setCostAction:this.setCostAction,
                costObject:costObject,
                alterIndex:index,
                alterCostAction:this.alterCostAction,
            }
        })
    }

    /**
     * from zn
     * 修改整备费用明细
     * @param costObject
     * @param index
     */
    alterCostAction=(costObject,index)=>{
        this.costObject.array[index] = costObject;
        let sumNumber = 0;
        for (let item of this.costObject.array){
            sumNumber+=item.price;
        }
        this.costObject.sumNumber=sumNumber;

    }

    // 构造
    constructor(props) {
        super(props);
        this.titleData1=[
            [
                {
                    title:'车架号',
                    isShowTag:false,
                    value:' ',
                    isShowTail:false,


                },
                {
                    title:'车型',
                    isShowTag:false,
                    value:' ',
                    isShowTail:false,
                },

            ],
            [
                {
                    title:'原车牌号',
                    isShowTag:false,
                    value:' ',
                    isShowTail:false,

                },
                {
                    title:'评估图片',
                    isShowTag:false,
                    value:'点击查看',
                    isShowTail:true,

                },
                {
                    title:'评估备注',
                    isShowTag:false,
                    value:' ',
                    isShowTail:false,

                },

            ],
            [
                {
                    title:'过户后车牌号',
                    isShowTag:false,
                    value:'请输入',
                    isShowTail:true,
                },

            ],
        ];

        this.costObject={
            sumNumber:3000,
            array:[
                {
                    typeTitle:'机械维修',
                    content:'当为true时，如果文本被按下，则没有任何视觉效果。默认情况下，文本被按下时会有一个灰色的、椭圆形的高光。',
                    price:1000,
                }, {
                    typeTitle:'机械维修',
                    content:'当为true时，如果文本被按下，则没有任何视觉效果。默认情况下，文本被按下时会有一个灰色的、椭圆形的高光。',
                    price:1000,
                }, {
                    typeTitle:'机械维修',
                    content:'当为true时，如果文本被按下，则没有任何视觉效果。默认情况下，文本被按下时会有一个灰色的、椭圆形的高光。',
                    price:1000,
                }
            ]
        };
        this.state = {
            titleData:this.titleData1,
        };
    }


    /**
     *  form @ZN
     * @param title
     * 点击对应标题
     */
    cellCilck=(title)=>{

        if(title == '过户后车牌号'){
            this.pushCarIicenseTagScene();
        }
    }


    /**
     * from @zn
     *
     * 跳转车牌号页面
     **/
    pushCarIicenseTagScene = () => {
        let navigatorParams = {
            name: "CarlicenseTagScene",
            component: CarlicenseTagScene,
            params: {
                checkedCarlicenseTagClick: this._checkedCarlicenseTagClick,
                currentChecked: this.titleData1[2][0].value,

            }
        };
        this.toNextPage(navigatorParams);
    }

    /**
     * from @zn
     *
     * 保存车牌号信息
     **/
    _checkedCarlicenseTagClick = (title) => {
        this.titleData1[2][0].value = title;
        this.upTitleData();
    }


    upTitleData=()=>{

        // this.setState({
        //     titleData:this.titleData1,
        // });
    };

    /**
     * 开始加载
     * @private
     */
    _showLoading = () => {
        this.props.showModal(true);
    };

    /**
     * 关闭加载
     * @private
     */
    _closeLoading = () => {
        this.props.showModal(false);
    };

}

const styles = StyleSheet.create({
    rootContaier:{
        backgroundColor:fontAndColor.COLORA3,
        flex:1,
        paddingTop:Pixel.getTitlePixel(64),
    },
    scanImage: {
        height: Pixel.getPixel(18),
        width: Pixel.getPixel(18),
        marginLeft: Pixel.getPixel(8)
    },
    textInput: {
        height: Pixel.getPixel(30),
        borderColor: fontAndColor.COLORA0,
        width: Pixel.getPixel(160),
        textAlign: 'right',
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,

    },
    textInputTitle: {
        color: fontAndColor.COLORA0,
        fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
        marginLeft: Pixel.getPixel(5),
        textAlign: 'right',
    },
    footContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Pixel.getPixel(20),
    },
    footView: {
        backgroundColor: fontAndColor.COLORB0,
        height: Pixel.getPixel(44),
        justifyContent: 'center',
        alignItems: 'center',
        width: sceneWidth - Pixel.getPixel(30),
        borderRadius: Pixel.getPixel(3),
        marginBottom: Pixel.getPixel(20),

    },
    footText: {
        textAlign: 'center',
        color: 'white',
        fontSize: fontAndColor.BUTTONFONT30
    },
});
